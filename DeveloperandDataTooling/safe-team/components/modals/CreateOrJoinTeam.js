import { Divider } from "@material-ui/core";
import { Button, GenericModal } from "../GnosisReact";

export function CreateOrJoinTeam({ onClose, open, onCreate, onJoin }) {
  return (
    <GenericModal
      onClose={onClose}
      open={open}
      title="Create or Join a Team"
      body={
        <div
          style={{ display: "flex", flexDirection: "column", gap: "20px 0" }}
        >
          <Button
            size="md"
            variant="contained"
            onClick={() => {
              onCreate();
              onClose();
            }}
          >
            Create Team
          </Button>
          <Divider />
          <Button
            size="md"
            variant="bordered"
            onClick={() => {
              onJoin();
              onClose();
            }}
          >
            Join Team
          </Button>
        </div>
      }
    />
  );
}
