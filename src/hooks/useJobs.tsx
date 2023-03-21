import { useLocalStorage } from "usehooks-ts";

import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "../lib/enums";
import { JobType } from "../lib/types";

function useJobs() {
  return useLocalStorage<{
    [key in ColumnType]: JobType[];
  }>("jobs", {
    Source: [
      {
        id: uuidv4(),
        column: ColumnType.SOURCE,
        candidateName: "John Doe",
        dateApplied: "10/11/2022",
        location: "Delhi, India",
        photo: "",
      },
    ],
    Applied: [
      {
        id: uuidv4(),
        column: ColumnType.APPLIED,
        candidateName: "Ahmad Khan",
        dateApplied: "22/8/2022",
        location: "Noida, India",
        photo: "",
      },
    ],
    "In touch": [
      {
        id: uuidv4(),
        column: ColumnType.IN_TOUCH,
        candidateName: "Jason Bourne",
        dateApplied: "31/12/2022",
        location: "Chennai, India",
        photo: "",
      },
    ],
    Interview: [
      {
        id: uuidv4(),
        column: ColumnType.INTERVIEW,
        candidateName: "Bhavesh Patel",
        dateApplied: "15/10/2022",
        location: "Mussoorie, India",
        photo: "",
      },
    ],
    Hired: [
      {
        id: uuidv4(),
        column: ColumnType.HIRED,
        candidateName: "John Doe",
        dateApplied: "19/9/2022",
        location: "Kozhikode, India",
        photo: "",
      },
    ],
    Rejected: [
      {
        id: uuidv4(),
        column: ColumnType.REJECTED,
        candidateName: "Levi Ackerman",
        dateApplied: "31/12/2022",
        location: "Kolkata, India",
        photo: "",
      },
    ],
  });
}

export default useJobs;
