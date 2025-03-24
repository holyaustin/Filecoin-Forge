import { Divider } from "@mui/material";
import { OperationType } from "@safe-global/safe-core-sdk-types";
import React, { useEffect } from "react";
import {
  Button,
  Icon,
  GenericModal,
  TextFieldInput,
} from "../../components/GnosisReact";
import DashboardLayout from "../../components/layout/DashboardLayout";
import useRampKit from "../../hooks/useRampKit";
import useTransaction from "../../hooks/useTransaction";
import styles from "../../styles/Wallet.module.css";
import { Polybase } from "@polybase/client";
import useSuperfluid from "../../hooks/useSuperfluid";
import { ethers } from "ethers";

const db = new Polybase({
  defaultNamespace:
    "pk/0x0a9f3867b6cd684ca2fbe94831396cbbfaf2a11d47f87ff8d49c6f5a58edf7e940cd0f4804294fa7b72b5a504711817f4a62681e6e9ff2be3f8a936bffdf312e/Safe4",
});

const Wallet = () => {
  const { openStripe } = useRampKit();

  const [uiLoading, setUILoading] = React.useState(false);

  const {
    getPendingTransactions,
    approveTransaction,
    proposeTransaction,
    rejectTransaction,
    loading,
    getEthSigner,
    executeTransactionForEOA,
  } = useTransaction();

  const {
    init,
    createApproveTx,
    getUSDCBalance,
    getUSDCxBalance,
    sfLoaded,
    createTransferTx,
    createFlowTx,
    createWithdrawTx,
    getStream,
    createStopFlowTx,
    createUpdateFlowTx,
    calculateFlowRate,
  } = useSuperfluid();

  const [members, setMembers] = React.useState([]);

  const [pendingTransactions, setPendingTransactions] = React.useState([]);

  const [user, setUser] = React.useState("");

  const [balance, setBalance] = React.useState("");

  const stripeRootRef = React.useRef(null);

  const [safeAddress, setSafeAddress] = React.useState("");

  const [stream, setStream] = React.useState(null);

  const [showModal, setShowModal] = React.useState(false);

  const [days, setDays] = React.useState(0);

  const [userBalance, setUserBalance] = React.useState(0);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleAddFunds = async () => {
    await openStripe(safeAddress);
  };

  const handleSplitFunds = async () => {
    const safeTransactionData = [];
    for (let i = 0; i < members.length; i++) {
      const data = await createTransferTx(
        (balance / members.length).toString(),
        members[i]
      );
      safeTransactionData.push({
        to: data.to,
        data: data.data,
        value: "0",
        operation: OperationType.Call,
      });
    }
    await proposeTransaction(safeTransactionData);
    getTransactions();
  };

  const handleStreamFunds = async () => {
    const approveOperation = await createApproveTx(balance);
    await proposeTransaction({
      to: approveOperation.to,
      data: approveOperation.data,
      value: "0",
      operation: OperationType.Call,
    });
    const createStreamOperation = await createFlowTx(
      balance,
      safeAddress,
      members
    );
    await proposeTransaction({
      to: createStreamOperation.to,
      data: createStreamOperation.data,
      value: "0",
      operation: OperationType.Call,
    });
    getTransactions();
  };

  const handleStopStream = async () => {
    const stopStreamOperation = await createStopFlowTx(safeAddress, members);
    await proposeTransaction({
      to: stopStreamOperation.to,
      data: stopStreamOperation.data,
      value: "0",
      operation: OperationType.Call,
    });
    getTransactions();
  };

  const handleUpdateStream = async () => {
    const flowrate = calculateFlowRate(
      ethers.utils.parseUnits((balance / members.length).toString(), 18),
      days * 86400
    );

    const updateStreamOperation = await createUpdateFlowTx(
      safeAddress,
      members,
      flowrate
    );
    await proposeTransaction({
      to: updateStreamOperation.to,
      data: updateStreamOperation.data,
      value: "0",
      operation: OperationType.Call,
    });
    getTransactions();
    handleCloseModal();
  };

  const handleCollect = async () => {
    const userBalance = await getUSDCxBalance(user);
    const withdrawOperation = await createWithdrawTx(
      userBalance.availableBalance
    );
    // console.log(userBalance.availableBalance);
    // console.log(withdrawOperation.data);
    // console.log(withdrawOperation.to);
    // await executeTransactionForEOA(
    //   withdrawOperation.data,
    //   withdrawOperation.to
    // );
    getTransactions();
  };

  const getBalance = async () => {
    getUSDCBalance(safeAddress).then((balance) =>
      setBalance((balance / 10 ** 18).toFixed(2).toString())
    );
    getUSDCxBalance(safeAddress).then(console.log);
    getStream(safeAddress).then((stream) => {
      if (new Date(stream.timestamp).getTime() != 0) {
        setStream(stream);
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (stream) {
        getUSDCxBalance(safeAddress).then((balance) => {
          setBalance(
            (balance.availableBalance / 10 ** 18).toFixed(6).toString()
          );
        });
        if (user)
          getUSDCxBalance(user).then((balance) => {
            setUserBalance(
              (balance.availableBalance / 10 ** 18).toFixed(2).toString()
            );
          });
      } else {
        if (sfLoaded && safeAddress && user)
          getUSDCBalance(safeAddress).then((balance) =>
            setBalance((balance / 10 ** 18).toFixed(2).toString())
          );
        getUSDCxBalance(user).then((balance) => {
          if (balance)
            setUserBalance(
              (balance.availableBalance / 10 ** 18).toFixed(2).toString()
            );
        });
      }
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [stream, user, sfLoaded, safeAddress]);

  useEffect(() => {
    if (sfLoaded && safeAddress) getBalance();
  }, [sfLoaded, safeAddress]);

  async function getTransactions() {
    if (loading) return;
    const signer = await getEthSigner();
    const address = await signer.getAddress();
    await init(signer);
    let userData = await db.collection("User").record(address).get();
    let teamData = await db.collection("Team").record(userData.data.team).get();
    const safeAdd = teamData.data.safew;
    setSafeAddress(safeAdd);
    let i = 0;
    let len = teamData.data.members.length;
    console.log("Len", len);
    let d = [];
    while (i < len) {
      let member = teamData.data.members[i].id;
      const det = await db.collection("Details").record(member).get();
      d.push(det.data);
      i = i + 1;
    }
    const validMembers = d
      .filter((member) => member.status === "Approved")
      .map((member) => member.id);
    console.log("d", validMembers);
    setMembers(validMembers);

    console.log(safeAdd);

    setUser(address);
    const pdtxs = await getPendingTransactions(safeAdd);
    setPendingTransactions(pdtxs.results);
    console.log(pdtxs.results);
  }

  async function getData() {
    // TODO: Fetch Transaction from backend and display them in the table
    setUILoading(true);
    await getTransactions();
    setUILoading(false);
  }

  async function onTransactionApprove(hash) {
    await approveTransaction(hash);
    getData();
  }

  async function onTransactionReject(hash) {
    await rejectTransaction(hash);
    getData();
  }

  useEffect(() => {
    getData();
  }, [loading]);
  return (
    <div className={styles.container}>
      <div style={{ flex: 1 }}>
        <div className={styles.walletContainer}>
          <div className={styles.walletHeader}>Total Balance</div>

          <div className={styles.balance}>
            {"$ "}
            {balance}
          </div>
        </div>
        <div>
          <div className={styles.transaction}>Pending Transactions</div>
          <div className={styles.transactionHeader}>
            <div style={{ width: "100px" }}>Nonce</div>
            <div className={styles.tableDivider} />
            <div style={{ flex: 1 }}>Method</div>
            <div className={styles.tableDivider} />
            <div style={{ width: "200px" }}>Confirmations</div>
            <div className={styles.tableDivider} />
            <div style={{ width: "100px" }}>Actions</div>
          </div>
          {pendingTransactions.map((tx, index) => (
            <div className={styles.transactionMemberTable} key={index}>
              <div style={{ width: "100px" }}>{tx.nonce}</div>
              <div className={styles.tableDivider} />
              <div style={{ flex: 1 }}>{tx.dataDecoded?.method ?? "NA"}</div>
              <div className={styles.tableDivider} />
              <div style={{ width: "200px" }}>
                {tx.confirmations.length}
                {"/"}
                {tx.confirmationsRequired}
              </div>
              <div className={styles.tableDivider} />
              <div style={{ width: "100px", display: "flex", gap: "0 10px" }}>
                {tx.confirmations.find((c) => c.owner === user) ? (
                  <div onClick={() => onTransactionApprove(tx.safeTxHash)}>
                    <Icon
                      type="awaitingConfirmations"
                      size="md"
                      color="pending"
                      tooltip="Awaiting Confirmations"
                    />
                  </div>
                ) : (
                  <div
                    onClick={() => onTransactionApprove(tx.safeTxHash)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Icon
                      type="circleCheck"
                      size="md"
                      color="primary"
                      tooltip="Approve Transaction"
                    />
                  </div>
                )}
                {tx.confirmations.find((c) => c.owner === user) ? (
                  <></>
                ) : (
                  <div
                    onClick={() => onTransactionReject(tx.safeTxHash)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    <Icon
                      type="circleCross"
                      size="md"
                      color="error"
                      tooltip="Reject Transaction"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.divider} />

      <div style={{ display: "flex", flexDirection: "column", gap: "10px 0" }}>
        <Button size="lg" onClick={handleAddFunds}>
          Add
        </Button>
        <Divider />
        <Button size="lg" onClick={handleSplitFunds}>
          Split
        </Button>
        <Divider />
        <Button size="lg">Stake</Button>
        <Divider />
        <p
          style={{
            fontSize: "20px",
            textAlign: "center",
            margin: 0,
            marginTop: "40px",
            fontWeight: "bold",
          }}
        >
          Powered By
        </p>
        <div
          style={{
            backgroundImage: `url('https://app.superfluid.finance/gifs/stream-loop.gif')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% 100%",
          }}
        >
          <img
            src="https://strapi-website-assets.s3.eu-west-2.amazonaws.com/logo_f7186351bf.svg"
            alt="SUPERFLUID"
            style={{ width: "100%", height: "auto", padding: "0 40px" }}
          />
        </div>
        {stream != null ? (
          <>
            <Button
              size="lg"
              onClick={() => {
                setShowModal(true);
              }}
            >
              Update Stream
            </Button>
            <Divider />
            <Button size="lg" onClick={handleStopStream}>
              Stop Stream
            </Button>
          </>
        ) : (
          <Button size="lg" onClick={handleStreamFunds}>
            Start Stream
          </Button>
        )}

        {userBalance != null && parseFloat(userBalance) != 0 && (
          <>
            <Divider />
            <Button size="lg" onClick={handleCollect}>
              Collect ${userBalance}
            </Button>
          </>
        )}

        <div
          id="stripe-root"
          ref={stripeRootRef}
          style={{
            zIndex: 1000,
          }}
        ></div>
        {showModal && (
          <GenericModal
            onClose={handleCloseModal}
            title="Update Stream"
            body={
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px 0",
                }}
              >
                {/* <span className="close" onClick={handleCloseModal}>&times;</span> */}
                <TextFieldInput
                  hiddenLabel
                  placeholder="Enter the number of days you want to complete the stream in"
                  onChange={(e) => setDays(e.currentTarget.value)}
                />
                <Button
                  size="md"
                  variant="contained"
                  onClick={handleUpdateStream}
                >
                  Update Stream
                </Button>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

Wallet.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Wallet;
