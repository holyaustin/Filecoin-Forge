import { useState } from "react";
import { Button, GenericModal, TextFieldInput } from "../GnosisReact";
import { Polybase } from "@polybase/client";
import useAuthKit from "../../hooks/useAuthKit";

const db = new Polybase({
  defaultNamespace: "pk/0x0a9f3867b6cd684ca2fbe94831396cbbfaf2a11d47f87ff8d49c6f5a58edf7e940cd0f4804294fa7b72b5a504711817f4a62681e6e9ff2be3f8a936bffdf312e/Safe4",
});

export function CreateTeam({ open, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const { safeAuth } = useAuthKit();

  async function addTeam() {
    if (safeAuth) {
      const response = await safeAuth.signIn();
      console.log("Testing1");
      console.log(response.eoa);
      const eoa = response.eoa;

      console.log("New Team created1");
      setName(name);
      console.log("Team:", name);
      let teamEntry;
      let code = Math.random().toString(36).substring(5);
      teamEntry = await db.collection("Team").create([name, code]); // okay?yes!
      console.log("New Team created2");

      await db.collection("Details").create([eoa, "Approved", "Leader"]);

      await db
        .collection("Team")
        .record(name)
        .call("addMember", [db.collection("Details").record(eoa)]);
      await db.collection("User").record(eoa).call("addTeam", [name]);
      console.log(teamEntry);
      onSubmit(name);
      onClose();
    }
  }

  return (
    <GenericModal
      onClose={onClose}
      open={open}
      title="Create Team"
      body={
        <div
          style={{ display: "flex", flexDirection: "column", gap: "20px 0" }}
        >
          <TextFieldInput
            hiddenLabel
            placeholder="Enter your team name"
            onChange={(e) => setName(e.currentTarget.value)}
          />
          <Button size="md" variant="contained" onClick={addTeam}>
            Create
          </Button>
        </div>
      }
    />
  );
}
