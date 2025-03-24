import { ethers } from "ethers";
import {
  GelatoRelayAdapter,
  MetaTransactionOptions,
} from "@safe-global/relay-kit";
import Safe from "@safe-global/safe-core-sdk";
import SafeSignature from "@safe-global/safe-core-sdk/dist/src/utils/signatures/SafeSignature";
import EthersAdapter from "@safe-global/safe-ethers-lib";
import useAuthKit from "./useAuthKit";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import SafeServiceClient from "@safe-global/safe-service-client";
import { useEffect, useState } from "react";
import { GelatoRelay } from "@gelatonetwork/relay-sdk";

const useTransaction = () => {
  const { safeAuth, loading } = useAuthKit();

  const [safeAddress, setSafeAddress] = useState("");

  const relayAdapter = new GelatoRelayAdapter(
    process.env.NEXT_PUBLIC_GELATO_RELAY_API_KEY
  );

  const chainId = 5;
  const txServiceUrl = "https://safe-transaction-goerli.safe.global";
  const gasLimit = "3000000";

  const options = {
    gasLimit: ethers.BigNumber.from(gasLimit),
    isSponsored: true,
  };

  const getEthSigner = async () => {
    const eoaresp = await safeAuth.signIn();

    const ethProvider = new ethers.providers.Web3Provider(
      await safeAuth.getProvider()
    );

    const signer = ethProvider.getSigner();
    return signer;
  };

  const getPendingTransactions = async (safeAddress) => {
    setSafeAddress(safeAddress);
    const signer = await getEthSigner();

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter });
    return await safeService.getPendingTransactions(safeAddress);
  };

  const approveTransaction = async (hash) => {
    const signer = await getEthSigner();

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter });

    const safeSDK = await Safe.create({
      ethAdapter,
      safeAddress,
    });

    let signature = await safeSDK.signTransactionHash(hash);
    safeService.confirmTransaction(hash, signature.data).then(console.log);

    const pdtxs = await safeService.getPendingTransactions(safeAddress);
    console.log(
      pdtxs.results[0].confirmations.length,
      pdtxs.results[0].confirmationsRequired
    );
    if (
      pdtxs.results[0].confirmations.length >=
      pdtxs.results[0].confirmationsRequired
    ) {
      const safeRawTx = await safeService.getTransaction(hash);

      const signedSafeTx = await toSafeTransactionType(safeRawTx, safeSDK);

      console.log(signedSafeTx);
      const encodedTx = safeSDK
        .getContractManager()
        .safeContract.encode("execTransaction", [
          signedSafeTx.data.to,
          signedSafeTx.data.value,
          signedSafeTx.data.data,
          signedSafeTx.data.operation,
          signedSafeTx.data.safeTxGas,
          signedSafeTx.data.baseGas,
          signedSafeTx.data.gasPrice,
          signedSafeTx.data.gasToken,
          signedSafeTx.data.refundReceiver,
          signedSafeTx.encodedSignatures(),
        ]);
      console.log(encodedTx);
      const relayTransaction = {
        target: safeAddress,
        encodedTransaction: encodedTx,
        chainId,
        options,
      };

      console.log(relayTransaction);
      const response = await relayAdapter.relayTransaction(relayTransaction);

      console.log(
        `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
      );
    }
  };

  const rejectTransaction = async (hash) => {
    const signer = await getEthSigner();

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter });

    const safeSDK = await Safe.create({
      ethAdapter,
      safeAddress,
    });

    const tx = await safeService.getTransaction(hash);

    const safeTx = await safeSDK.createRejectionTransaction(tx.nonce);
    const signature = await safeSDK.signTransactionHash(safeTx.safeTxHash);
  };

  const proposeTransaction = async (safeTransactionData) => {
    const signer = await getEthSigner();

    const ethAdapter = new EthersAdapter({
      ethers,
      signerOrProvider: signer,
    });
    const safeService = new SafeServiceClient({ txServiceUrl, ethAdapter });

    const safeSDK = await Safe.create({
      ethAdapter,
      safeAddress,
    });

    safeService.getPendingTransactions(safeAddress).then((res) => {
      console.log(res);
    });
    const nonce = await safeService.getNextNonce(safeAddress);
    console.log(nonce);
    safeTransactionData.nonce = nonce;
    const safeTransaction = await safeSDK.createTransaction({
      safeTransactionData,
    });

    const safeTxHash = await safeSDK.getTransactionHash(safeTransaction);

    const signedSafeTx = await safeSDK.signTransactionHash(safeTxHash);

    console.log({
      safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: await signer.getAddress(),
      senderSignature: signedSafeTx.data,
      origin: "SafeTeam",
    });

    await safeService.proposeTransaction({
      safeAddress,
      safeTransactionData: safeTransaction.data,
      safeTxHash,
      senderAddress: await signer.getAddress(),
      senderSignature: signedSafeTx.data,
      origin: "SafeTeam",
    });
    console.log("Proposed");
    console.log("Re Signing to ensure it works");
    await approveTransaction(safeTxHash);
  };

  const toSafeTransactionType = async (serviceTransactionResponse, sdk) => {
    const safeTransactionData = {
      to: serviceTransactionResponse.to,
      value: serviceTransactionResponse.value,
      data: serviceTransactionResponse.data || "0x",
      operation: serviceTransactionResponse.operation,
      safeTxGas: serviceTransactionResponse.safeTxGas,
      baseGas: serviceTransactionResponse.baseGas,
      gasPrice: Number(serviceTransactionResponse.gasPrice),
      gasToken: serviceTransactionResponse.gasToken,
      refundReceiver: serviceTransactionResponse.refundReceiver,
      nonce: serviceTransactionResponse.nonce,
    };
    const safeTransaction = await sdk.createTransaction({
      safeTransactionData,
    });
    serviceTransactionResponse.confirmations?.map((confirmation) => {
      console.log(confirmation);
      const signature = new SafeSignature(
        confirmation.owner,
        confirmation.signature
      );
      safeTransaction.addSignature(signature);
    });
    return safeTransaction;
  };

  const executeTransactionForEOA = async (calldata, target) => {
    const relayTransaction = {
      target: target,
      encodedTransaction: calldata,
      chainId,
      options,
    };

    console.log(relayTransaction);
    const response = await relayAdapter.relayTransaction(relayTransaction);

    console.log(
      `Relay Transaction Task ID: https://relay.gelato.digital/tasks/status/${response.taskId}`
    );
  };
  return {
    proposeTransaction,
    getPendingTransactions,
    approveTransaction,
    rejectTransaction,
    getEthSigner,
    loading,
    executeTransactionForEOA,
  };
};

export default useTransaction;
