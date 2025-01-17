import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { AppContext } from '../../App';
import { useContext } from 'react';

export function Item({ text }: { text: string }) {
    return <div className="w-40 h-12 mb-2 bg-slate-600 flex items-center justify-center border border-gray-800 rounded-lg hover:cursor-move">{text}</div>;
}

export function SortableItem({ id }: { id: string }) {
    const appContext = useContext(AppContext)
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
        <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
            <Item text={appContext.onlyShowFirstName ? id.split(" ")[0] : id} />
        </div>
    );
}