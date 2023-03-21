import { Box, Typography, Stack, Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { ColumnType } from "../lib/enums";
import useColumnDrop from "../hooks/useColumnDrop";
import useColumnJobItems from "../hooks/useColumnJobs";
import Job from "./Job";
import { amber, blue, green, grey, orange, red } from "@mui/material/colors";
import { ModalContext } from "../context/ModalContext";
import { useContext } from "react";

const ColumnColorScheme: Record<ColumnType, string> = {
  Source: grey["300"],
  "In touch": amber["300"],
  Applied: blue["300"],
  Interview: orange["300"],
  Hired: green["300"],
  Rejected: red["300"],
};

function Column({ column }: { column: ColumnType }) {
  const { jobs, deleteJob, dropJobFrom, swapJobs } = useColumnJobItems(column);

  const { dropRef } = useColumnDrop(column, dropJobFrom);
  const { handleOpen, setColumnType } = useContext(ModalContext);

  // Job List
  const ColumnJobs = jobs.map((job, index) => (
    <Job
      key={job.id}
      job={job}
      index={index}
      onDropHover={swapJobs}
      onDelete={deleteJob}
    />
  ));

  return (
    <Box
      component="div"
      sx={{
        padding: "0.35rem",
        overflowY: "auto",
        borderRadius: "0.75rem",
        backgroundColor: grey["50"],
      }}
      height={{ sm: 300, md: "75vh" }}
      minWidth={300}
    >
      <Box
        component="span"
        sx={{
          backgroundColor: ColumnColorScheme[column],
          width: "100%",
          display: "block",
          paddingBlock: 1,
          borderRadius: "0.5rem",
        }}
      >
        <Typography variant="subtitle1" textAlign="center" fontWeight="bold">
          {column}
        </Typography>
      </Box>
      <Button
        onClick={() => {
          setColumnType(column);
          handleOpen();
        }}
        startIcon={<Add />}
        color="primary"
        variant="contained"
        sx={{ marginTop: "1rem", marginLeft: "0.25rem" }}
      >
        Add Job
      </Button>
      <Stack
        ref={dropRef}
        direction={{ xs: "row", md: "column" }}
        overflow="auto"
        sx={{
          marginTop: "1rem",
          padding: "0.25rem",
          borderRadius: "1rem",
          minHeight: "5rem",
        }}
        spacing={4}
      >
        {ColumnJobs}
      </Stack>
    </Box>
  );
}

export default Column;
