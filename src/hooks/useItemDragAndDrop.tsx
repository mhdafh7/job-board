import { useRef } from 'react';
import { useDrag, useDrop, XYCoord } from 'react-dnd';
import { ItemType } from '../lib/enums';
import { DragItem, JobType } from '../lib/types';


export function useItemDragAndDrop<T extends HTMLElement>(
  { job, index }: { job: JobType; index: number },
  handleDropHover: (i: number, j: number) => void,
) {
  const ref = useRef<T>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    item: { from: job.column, id: job.id, index },
    type: ItemType.JOB,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [_, drop] = useDrop<DragItem, void, unknown>({
    accept: ItemType.JOB,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      // the jobs are not on the same column
      if (item.from !== job.column) {
        return;
      }

      const draggedItemIndex = item.index;
      const hoveredItemIndex = index;

      // swapping the job with itself
      if (draggedItemIndex === hoveredItemIndex) {
        return;
      }

      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;

      // get mouse coordinatees
      const { x: mouseX, y: mouseY } = monitor.getClientOffset() as XYCoord;

      // get hover item rectangle
      const hoveredBoundingRect = ref.current.getBoundingClientRect();

      // Get hover item middle height position
      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;
      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) {
        return;
      }

      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) {
        return;
      }

      // actual action
      handleDropHover(draggedItemIndex, hoveredItemIndex);

      item.index = hoveredItemIndex;
    },
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
}
