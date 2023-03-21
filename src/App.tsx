import { Typography, Stack } from "@mui/material";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Column from "./components/Column";
import { ColumnType } from "./lib/enums";
import AddJobModal from "./components/AddJobModal";
import { useContext } from "react";
import { ModalContext } from "./context/ModalContext";

function App() {
  const { isModalOpen } = useContext(ModalContext);
  return (
    <>
      {isModalOpen && <AddJobModal />}
      <Stack
        spacing={12}
        sx={{
          alignItems: "start",
          paddingLeft: { xs: "1rem", md: "2.5rem" },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            textAlign: "left",
            marginTop: "1.5rem",
          }}
        >
          Jobs
        </Typography>
        <DndProvider backend={HTML5Backend}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1}
            sx={{ flexWrap: "nowrap", width: "100%", overflowX: "scroll" }}
          >
            <Column column={ColumnType.SOURCE} />
            <Column column={ColumnType.APPLIED} />
            <Column column={ColumnType.IN_TOUCH} />
            <Column column={ColumnType.INTERVIEW} />
            <Column column={ColumnType.HIRED} />
            <Column column={ColumnType.REJECTED} />
          </Stack>
        </DndProvider>
      </Stack>
    </>
  );
}

export default App;
