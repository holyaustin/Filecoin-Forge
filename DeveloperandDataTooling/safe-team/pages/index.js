import styles from "../styles/Home.module.css";
import { useState } from "react";
import { Button } from "../components/GnosisReact";
import { CreateOrJoinTeam } from "../components/modals/CreateOrJoinTeam";
import { CreateTeam } from "../components/modals/CreateTeam";
import { JoinTeam } from "../components/modals/JoinTeam";
import { ResultModal } from "../components/modals/ResultModal";
import useAuthKit from "../hooks/useAuthKit";
import { Polybase } from "@polybase/client";
import { useSafeWallet } from "../hooks/useSafeWallet";

const db = new Polybase({
  defaultNamespace: "pk/0x0a9f3867b6cd684ca2fbe94831396cbbfaf2a11d47f87ff8d49c6f5a58edf7e940cd0f4804294fa7b72b5a504711817f4a62681e6e9ff2be3f8a936bffdf312e/Safe4",
});

export default function Home() {
  const [isCreateOrJoinOpen, setIsCreateOrJoinOpen] = useState(false);

  const [isCreateClicked, setIsCreateClicked] = useState(false);

  const [isJoinClicked, setIsJoinClicked] = useState(false);

  const [teamName, setTeamName] = useState("");

  const [teamCode, setTeamCode] = useState("");

  const [onCreate, setOnCreate] = useState(false);

  const [onJoin, setOnJoin] = useState(false);

  const { safeAuth } = useAuthKit();

  const handleRegister = async () => {
    if (safeAuth) {
      const response = await safeAuth.signIn();
      console.log(response.eoa);
      const eoa = response.eoa;
      let user;
      try {
        console.log("Hello1");
        user = await db.collection("User").record(eoa).get();
        console.log("User Already exists");
        setIsCreateOrJoinOpen(true);
      } catch (e) {
        // .create() accepts two params, address and name of user
        // populate these dynamically with address and name of user
        console.log("Hello2");
        user = await db.collection("User").create([eoa]);
        console.log("New User created");
        setIsCreateOrJoinOpen(true);
      }
      console.log("user is ", user);
      user = user.data;
    }
  };

  // async function addTeam() {
  //   console.log("New Team created1");
  //   setTeamName(teamName);
  //   console.log("team", teamName)
  //   setOnCreate(true);
  //   let teamEntry;
  //   let randomid = Math.random().toString(36).substring(7);
  //   teamEntry = await db
  //   .collection("Team")
  //   .create([randomid, teamName]);
  //   console.log("New Team created2");
  //   console.log(teamEntry)
  //   setIsCreateOrJoinOpen(true);

  // }

  return (
    <div className={styles.app}>
      <div className={styles.appTitle}>MARCH FOR</div>
      <div className={styles.appSubTitle}>
        ACCOUNT <br />
        ABSTRACTION
      </div>
      <p style={{ marginBottom: "50px" }}>HACKATHON</p>
      <Button size="lg" variant="bordered" onClick={handleRegister}>
        Sign Up / Sign In
      </Button>

      {isCreateOrJoinOpen && (
        <CreateOrJoinTeam
          open={isCreateOrJoinOpen}
          onClose={() => setIsCreateOrJoinOpen(false)}
          onCreate={() => setIsCreateClicked(true)}
          onJoin={() => setIsJoinClicked(true)}
        />
      )}

      {isCreateClicked && (
        <CreateTeam
          open={isCreateClicked}
          onClose={() => setIsCreateClicked(false)}
          onSubmit={(team) => {
            setTeamName(team);
            setOnCreate(true);
          }}
        />
      )}

      {isJoinClicked && (
        <JoinTeam
          open={isJoinClicked}
          onClose={() => setIsJoinClicked(false)}
          onClick={(code) => {
            setTeamCode(code);
            setOnJoin(true);
          }}
        />
      )}
      {onCreate && (
        <ResultModal
          open={onCreate}
          onClose={() => setOnCreate(false)}
          content={
            <span>
              <b
                style={{
                  color: "#008c73",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {teamName}
              </b>{" "}
              <br />
              You have successfully created your team.
            </span>
          }
          buttonText={"Go to Dashboard"}
          onClick={() => {
            var url = "/dashboard";
            var a = document.createElement("a");
            a.href = url;
            a.click();
          }}
        />
      )}
      {onJoin && (
        <ResultModal
          open={onJoin}
          onClose={() => setOnJoin(false)}
          content={
            <span>
              <b
                style={{
                  color: "#008c73",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Thank You{" "}
              </b>
              <br />
              Please wait for the Leader to Approve.
            </span>
          }
          buttonText={"Close"}
          onClick={() => {}}
        />
      )}
    </div>
  );
}
