import React, { useEffect, useState } from "react";
import { Button, DataTable, Icon } from "../../components/GnosisReact";
import DashboardLayout from "../../components/layout/DashboardLayout";
import styles from "../../styles/Dashboard.module.css";
import { Polybase } from "@polybase/client";
import useAuthKit from "../../hooks/useAuthKit";
import useSafeWallet from "../../hooks/useSafeWallet";

const db = new Polybase({
  defaultNamespace:
    "pk/0x0a9f3867b6cd684ca2fbe94831396cbbfaf2a11d47f87ff8d49c6f5a58edf7e940cd0f4804294fa7b72b5a504711817f4a62681e6e9ff2be3f8a936bffdf312e/Safe4",
});

// TODO: #2 create the frontend for Team Management Dashboard @kunal528
const Dashboard = () => {
  const { safeAuth } = useAuthKit();
  const { create } = useSafeWallet();
  const [user, setUser] = useState();

  const [teamName, setTeamName] = React.useState("");
  const [members, setMembers] = React.useState([]);
  const [teamCode, setTeamCode] = React.useState("");
  const [isWalletCreated, setIsWalletCreated] = React.useState(false);
  async function getData() {
    if (safeAuth) {
      const response = await safeAuth.signIn();
      console.log("Testing10");
      console.log(response.eoa);
      const eoa = response.eoa;
      setUser(eoa);
      console.log("Testing11");
      let temp1 = await db.collection("User").record(eoa).get();
      let teamName = temp1.data.team;
      console.log("Team name", teamName);
      let temp2 = await db.collection("Team").record(teamName).get();
      setTeamCode(temp2.data.tcode);
      setIsWalletCreated(temp2.data.safew != teamName);
      let ppl = temp2.data.members;
      let i = 0;
      let len = ppl.length;
      console.log("Len", len);
      let d = [];
      while (i < len) {
        let member = ppl[i].id;
        const det = await db.collection("Details").record(member).get();
        d.push(det.data);
        i = i + 1;
      }
      console.log("d", d);
      // TODO: Fetch members from backend and display them in the table and team name @Maadhav
      setTeamName(teamName);
      setMembers(d);
    }
  }

  function onApprove(id) {
    db.collection("Details")
      .record(id)
      .call("changeStatus", ["Approved"])
      .then((_) => getData());
  }

  function onReject(id) {
    db.collection("Details")
      .record(id)
      .call("changeStatus", ["Disapproved"])
      .then((_) => getData());
  }

  function onRemove(id) {
    db.collection("Details")
      .record(id)
      .call("changeStatus", ["Removed"])
      .then((_) => getData());
  }

  const handleSubmit = async () => {
    // const provider = await safeAuth.getProvider();
    const teamMembers = members
      .filter((m) => m.status == "Approved")
      .map((m) => m.id);
    console.log(teamMembers);
    const safeAddress = await create(safeAuth, teamMembers);

    await db
      .collection("Team")
      .record(teamName)
      .call("addSafeW", [safeAddress]);
    getData();
  };

  useEffect(() => {
    getData();
  }, [safeAuth]);
  return (
    //TODO - add SAFE wallet. cant add new team members after this.
    <div className={styles.container}>
      <div className={styles.profile}>
        <div>
          <h1 style={{ margin: "0px 0px 20px 0px" }}>
            Welcome Team <span style={{ color: "#008c73" }}>{teamName}</span>!
          </h1>
          <h2>
            Team Code: <span style={{ color: "#008c73" }}>{teamCode}</span>
          </h2>
          <h3>Members: {members.length}</h3>
        </div>
        {!isWalletCreated &&
          members.find((m) => m.role == "Leader")?.id == user && (
            <Button size="md" variant="contained" onClick={handleSubmit}>
              Submit
            </Button>
          )}
      </div>
      <div className={styles.memberTableHeader}>
        <div style={{ width: "100px" }}>#</div>
        <div className={styles.divider} />
        <div style={{ flex: 1 }}>EOA</div>
        <div className={styles.divider} />
        <div style={{ width: "100px" }}>Status</div>
        <div className={styles.divider} />
        <div style={{ width: "100px" }}>Role</div>
        <div className={styles.divider} />
        <div style={{ width: "200px" }}>Actions</div>
      </div>
      {members.map((member, index) => (
        <div className={styles.memberTable} key={index}>
          <div style={{ width: "100px" }}>{index + 1}</div>
          <div className={styles.divider} />
          <div style={{ flex: 1 }}>{member.id}</div>
          <div className={styles.divider} />
          <div style={{ width: "100px" }}>{member.status}</div>
          <div className={styles.divider} />
          <div style={{ width: "100px" }}>{member.role}</div>
          <div className={styles.divider} />
          {members.find((m) => m.role == "Leader").id == user ? (
            <div style={{ width: "200px", display: "flex", gap: "0 10px" }}>
              {member.role != "Leader" && member.status == "Unapproved" && (
                <div
                  onClick={() => onApprove(member.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Icon type="circleCheck" size="md" color="primary" />
                </div>
              )}
              {member.role != "Leader" && member.status == "Unapproved" && (
                <div
                  onClick={() => onReject(member.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Icon type="circleCross" size="md" color="error" />
                </div>
              )}
              {member.role != "Leader" && member.status == "Approved" && (
                <div
                  onClick={() => onRemove(member.id)}
                  style={{ cursor: "pointer" }}
                >
                  <Icon type="delete" size="md" color="error" />
                </div>
              )}
            </div>
          ) : (
            <div style={{ width: "200px", display: "flex", gap: "0 10px" }} />
          )}
        </div>
      ))}
    </div>
  );
};

Dashboard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Dashboard;
