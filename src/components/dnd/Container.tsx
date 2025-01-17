import { useDroppable } from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";

import { SortableItem } from "./SortableItem";
import { CONTAINER_COLORS } from "../../utils";



export default function Container({ index, text, id, items } : {index: number, text: string, id: string, items: string[]}) {

  const { setNodeRef } = useDroppable({
    id
  });

  return (
    <SortableContext
      id={id}
      items={items}
      strategy={rectSortingStrategy}
    >
      <div ref={setNodeRef} className="bg-slate-700 w-48 p-4 m-2 flex flex-col rounded-sm">
        <div className="flex justify-center items-center">
          <h2 className="text-white text-center text-lg font-bold mb-2 underline">{text}</h2>
          <div className={"ml-4 w-5 h-5 translate-x-1/2 -translate-y-1 " + CONTAINER_COLORS[index]}></div>
        </div>
        {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))}
      </div>
    </SortableContext>
  );
}
