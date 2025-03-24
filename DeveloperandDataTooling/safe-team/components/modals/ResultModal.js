import { Button, GenericModal } from "../GnosisReact";

export function ResultModal({ open, onClose, content, buttonText, onClick }) {
  return (
    <GenericModal
      onClose={onClose}
      open={open}
      title="Result"
      body={
        <div
          style={{ display: "flex", flexDirection: "column", gap: "20px 0" }}
        >
          <p
            style={{
              whiteSpace: "initial",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            {content}
          </p>
          <Button
            size="md"
            variant="contained"
            onClick={() => {
              onClick();
              onClose();
            }}
          >
            {buttonText}
          </Button>
        </div>
      }
    />
  );
}
