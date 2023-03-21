import { useDrop } from "react-dnd";
import { ColumnType, ItemType } from "../lib/enums";
import { JobType, DragItem } from "../lib/types";

function useColumnDrop(
  column: ColumnType,
  handleDrop: (fromColumn: ColumnType, jobId: JobType["id"]) => void
) {
  const [{ isOver }, dropRef] = useDrop<DragItem, void, { isOver: boolean }>({
    accept: ItemType.JOB,
    drop: (dragItem) => {
      if (!dragItem || dragItem.from === column) {
        return;
      }

      handleDrop(dragItem.from, dragItem.id);
    },
  });

  return {
    dropRef,
  };
}

export default useColumnDrop;
