import { useState } from "react";
import { Button, GenericModal, TextFieldInput } from "../GnosisReact";
import useAuthKit from "../../hooks/useAuthKit";
import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "pk/0x0a9f3867b6cd684ca2fbe94831396cbbfaf2a11d47f87ff8d49c6f5a58edf7e940cd0f4804294fa7b72b5a504711817f4a62681e6e9ff2be3f8a936bffdf312e/Safe4",
});

export function JoinTeam({ open, onClose, onClick }) {
  const [code, setCode] = useState("");
  const { safeAuth } = useAuthKit();

  async function joining() {
    console.log("Here");
    if (safeAuth) {
      const response = await safeAuth.signIn();
      console.log("Testing1");
      console.log(response.eoa);
      const eoa = response.eoa;
      let team;
      try {
        team = await db.collection("Team").where("tcode", "==", code).get();
      } catch (e) {
        console.log("No team exists with given code.");
      }
      const deets = await db
        .collection("Details")
        .create([eoa, "Unapproved", "Member"]);
      console.log("Temp1", deets);
      console.log("Code:", code);
      try {
        await db
          .collection("Team")
          .record(team.data[0].data.name)
          .call("addMember", [db.collection("Details").record(eoa)]);
      } catch (e) {
        console.error(e);
        console.log("Unable to add member's deets");
      }
      console.log(team.data);
      let tn = team.data[0].data.name;
      // let teamToRemoveUserFrom
      // let temp = await db.collection('User').record(eoa).get()
      await db.collection("User").record(eoa).call("addTeam", [tn]);
      onClick(code);
      onClose();
    }
  }

  return (
    <GenericModal
      onClose={onClose}
      open={open}
      title="Join Team"
      body={
        <div
          style={{ display: "flex", flexDirection: "column", gap: "20px 0" }}
        >
          <TextFieldInput
            hiddenLabel
            placeholder="Enter your team code"
            onChange={(e) => setCode(e.currentTarget.value)}
          />
          <Button size="md" variant="contained" onClick={joining}>
            Join
          </Button>
        </div>
      }
    />
  );
}
