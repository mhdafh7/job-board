import { ColumnType } from "./enums";

export type JobType = {
  id?: string;
  column: ColumnType;
  candidateName: string;
  photo?: string;
  location: string;
  dateApplied: string;
};

export type DragItem = {
  index: number;
  id: JobType["id"];
  from: ColumnType;
};
