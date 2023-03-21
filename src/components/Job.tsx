import { Delete } from "@mui/icons-material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import _ from "lodash";
import { memo } from "react";
import { useItemDragAndDrop } from "../hooks/useItemDragAndDrop";
import { JobType } from "../lib/types";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { Avatar, Box, Stack } from "@mui/material";

type JobProps = {
  index: number;
  job: JobType;
  onDelete: (id: JobType["id"]) => void;
  onDropHover: (i: number, j: number) => void;
};

function Job({
  index,
  job,
  onDropHover: handleDropHover,
  onDelete: handleDelete,
}: JobProps) {
  const { ref, isDragging } = useItemDragAndDrop<HTMLDivElement>(
    { job, index: index },
    handleDropHover
  );

  const handleDeleteClick = () => {
    handleDelete(job.id);
  };

  function stringToColor(string: string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }
  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  return (
    <Card
      sx={{
        minWidth: 275,
        cursor: "grab",
        position: "relative",
        border: job.column === "Rejected" ? `1px solid ${red[500]}` : "unset",
        borderRadius: "0.5rem",
        backgroundColor: "#fff",
      }}
      ref={ref}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Stack>
          <Typography sx={{ fontSize: 14 }} gutterBottom>
            {job.dateApplied}
          </Typography>
          <Typography variant="h5" component="div">
            {job.candidateName}
          </Typography>
          <Typography variant="body2">{job.location}</Typography>
        </Stack>
        {job.photo?.length !== 0 ? (
          <Avatar src={job.photo} alt={`Picture of ${job.candidateName}`} />
        ) : (
          <Avatar {...stringAvatar(job.candidateName)} />
        )}
      </CardContent>
      <CardActions>
        <IconButton
          size="small"
          aria-label="delete"
          onClick={handleDeleteClick}
          color="error"
        >
          <Delete />
        </IconButton>
      </CardActions>
    </Card>
  );
}
export default memo(Job, (prev, next) => {
  if (
    _.isEqual(prev.job, next.job) &&
    _.isEqual(prev.index, next.index) &&
    prev.onDelete === next.onDelete &&
    prev.onDropHover === next.onDropHover
  ) {
    return true;
  }

  return false;
});
