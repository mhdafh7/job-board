import { useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { ColumnType } from "../lib/enums";
import { JobType } from "../lib/types";
import useJobs from "./useJobs";

const MAX_JOBS_COLUMN = 100;

export function swap<T>(arr: T[], i: number, j: number): T[] {
  const copy = [...arr];
  const tmp = copy[i];
  copy[i] = copy[j];
  copy[j] = tmp;
  return copy;
}

function useColumnJobs(column: ColumnType) {
  const [jobs, setJobs] = useJobs();

  const columnJobs = jobs[column];

  const addJob = useCallback(
    ({ candidateName, dateApplied, location, photo, column }: JobType) => {
      setJobs((allJobs) => {
        const columnJobs = allJobs[column];

        if (columnJobs.length > MAX_JOBS_COLUMN) {
          return allJobs;
        }

        const newColumnJob: JobType = {
          id: uuidv4(),
          candidateName: candidateName,
          dateApplied: dateApplied,
          location: location,
          photo: photo,
          column: column,
        };

        return {
          ...allJobs,
          [column]: [newColumnJob, ...columnJobs],
        };
      });
    },
    [column, setJobs]
  );

  const deleteJob = useCallback(
    (id: JobType["id"]) => {
      setJobs((allJobs) => {
        const columnJobs = allJobs[column];
        return {
          ...allJobs,
          [column]: columnJobs.filter((job) => job.id !== id),
        };
      });
    },
    [column, setJobs]
  );


  const dropJobFrom = useCallback(
    (from: ColumnType, id: JobType["id"]) => {
      setJobs((allJobs) => {
        const fromColumnJobs = allJobs[from];
        const toColumnJobs = allJobs[column];
        const movingJob = fromColumnJobs.find((job) => job.id === id);

        console.log(`Moving job ${movingJob?.id} from ${from} to ${column}`);

        if (!movingJob) {
          return allJobs;
        }

        // remove the job from the original column and copy it within the destination column
        return {
          ...allJobs,
          [from]: fromColumnJobs.filter((job) => job.id !== id),
          [column]: [{ ...movingJob, column }, ...toColumnJobs],
        };
      });
    },
    [column, setJobs]
  );

  const swapJobs = useCallback(
    (i: number, j: number) => {
      setJobs((allJobs) => {
        const columnJobs = allJobs[column];
        return {
          ...allJobs,
          [column]: swap(columnJobs, i, j),
        };
      });
    },
    [column, setJobs]
  );

  return {
    jobs: columnJobs,
    addJob,
    dropJobFrom,
    deleteJob,
    swapJobs,
  };
}

export default useColumnJobs;
