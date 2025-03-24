import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useSuperfluid = () => {
  const [sf, setSF] = useState();
  const [fUSDCx, setFUSDCx] = useState();
  const [signer, setSigner] = useState();
  const [sfLoaded, setSfLoaded] = useState(false);

  async function init(signer) {
    const provider = signer.provider;
    const chainId = await provider.getNetwork().then((res) => res.chainId);
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider,
    });

    const superSigner = sf.createSigner({ signer: signer });

    setFUSDCx(await sf.loadSuperToken("fUSDCx"));

    console.log("address", await signer.getAddress());

    setSigner(signer);
    setSF(sf);
    setSfLoaded(true);
    return { sf, superSigner };
  }

  const calculateFlowRate = (amount, seconds = 2592000) => {
    //seconds = 2592000
    let fr = amount / seconds;
    return Math.floor(fr);
  };

  const createApproveTx = async (amount) => {
    const fusdc = fUSDCx.underlyingToken.contract.connect(signer);
    return await fusdc.populateTransaction.approve(
      fUSDCx.address,
      ethers.utils.parseUnits(amount, 18)
    );
  };

  const createTransferTx = async (amount, to) => {
    const fusdc = fUSDCx.underlyingToken.contract.connect(signer);

    return await fusdc.populateTransaction.transfer(
      to,
      ethers.utils.parseUnits(amount, 18)
    );
  };

  const createFlowTx = async (amount, from, members) => {
    const txs = [
      fUSDCx.upgrade({
        amount: ethers.utils.parseUnits(amount, 18),
      }),
    ];

    for (let i = 0; i < members.length; i++) {
      txs.push(
        fUSDCx.createFlow({
          sender: from,
          receiver: members[i],
          flowRate: calculateFlowRate(
            ethers.utils.parseUnits((amount / members.length).toString(), 18)
          ),
        })
      );
    }

    const ops = await Promise.all(
      sf.batchCall(txs).getOperationStructArrayPromises
    );
    const host = sf.contracts.host.connect(signer);
    const calldata = await host.populateTransaction.batchCall(ops, {
      gasLimit: 2000000,
    });
    return calldata;
  };

  const createUpdateFlowTx = async (from, members, flowRate) => {
    const txs = [];

    for (let i = 0; i < members.length; i++) {
      const updateFlowOperation = fUSDCx.updateFlow({
        sender: from,
        receiver: members[i],
        flowRate: flowRate,
      });
      txs.push(updateFlowOperation);
    }

    const ops = await Promise.all(
      sf.batchCall(txs).getOperationStructArrayPromises
    );
    const host = sf.contracts.host.connect(signer);
    const calldata = await host.populateTransaction.batchCall(ops, {
      gasLimit: 2000000,
    });
    return calldata;
  };

  const createStopFlowTx = async (from, members) => {
    const txs = [];

    for (let i = 0; i < members.length; i++) {
      const deleteFlowOperation = fUSDCx.deleteFlow({
        sender: from,
        receiver: members[i],
      });
      txs.push(deleteFlowOperation);
    }
    const balance = await getUSDCxBalance(from);
    console.log(balance.availableBalance);
    const downgradeOperation = fUSDCx.downgrade({
      amount: balance.availableBalance,
    });

    txs.push(downgradeOperation);
    const ops = await Promise.all(
      sf.batchCall(txs).getOperationStructArrayPromises
    );
    const host = sf.contracts.host.connect(signer);
    const calldata = await host.populateTransaction.batchCall(ops, {
      gasLimit: 2000000,
    });
    return calldata;
  };

  const createWithdrawTx = async (amount) => {
    const downgradeOperation = fUSDCx.contract
      .connect(signer)
      .downgrade(amount);
    // const downgradeOperation = fUSDCx.downgrade({
    //   amount: amount,
    // });

    // return await downgradeOperation.populateTransactionPromise;
  };

  const getStream = async (safeAddress) => {
    const stream = await fUSDCx.getFlow({
      sender: safeAddress,
      receiver: await signer.getAddress(),
      providerOrSigner: signer,
    });
    return stream;
  };

  async function getUSDCBalance(address) {
    const fusdc = fUSDCx.underlyingToken.contract.connect(signer);
    return await fusdc.balanceOf(address);
  }

  async function getUSDCxBalance(safeAddress = undefined) {
    try {
      var balance = await fUSDCx.realtimeBalanceOf({
        providerOrSigner: signer,
        account: safeAddress ?? (await signer.getAddress()),
        timestamp: Math.floor(new Date().getTime() / 1000) - 180,
      });
    } catch (error) {}

    return balance;
  }

  return {
    init,
    calculateFlowRate,
    sfLoaded,
    getUSDCBalance,
    getUSDCxBalance,
    createTransferTx,
    createApproveTx,
    createFlowTx,
    createWithdrawTx,
    getStream,
    createUpdateFlowTx,
    createStopFlowTx,
  };
};

export default useSuperfluid;
