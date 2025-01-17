import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export function Item({ text }: { text: string }) {
  
    const style = {
      width: "100%",
      height: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      border: "1px solid black",
      margin: "10px 0",
    };
  
    return <div style={style}>{text}</div>;
  }

export function SortableItem({ id }: { id: string }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <Item text={id} />
        </div>
    );
}