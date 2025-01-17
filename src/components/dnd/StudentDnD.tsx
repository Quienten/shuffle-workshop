import { useContext, useState } from 'react';
import { DragStartEvent, DragOverEvent, DragEndEvent, DragCancelEvent, UniqueIdentifier } from '@dnd-kit/core';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import {
    arrayMove,
    sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';

import { AppContext } from '../../App';
import Container from './Container';

// Watch out! the index of a group can be 0 which is falsy
export default function StudentDnD() {
    const appContext = useContext(AppContext)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    return (
        <main>
            <div className={"flex"}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragOver={handleDragOver}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >

                    {appContext.preferredGroups.map((group, groupIndex) => {
                        return (
                            <Container
                                index={groupIndex}
                                text={'Group ' + (groupIndex + 1)}
                                id={'group-' + groupIndex}
                                key={groupIndex}
                                items={group}
                            />
                        )
                    })}
                    {/* <DragOverlay>{activeId ? <Item text={activeId} /> : null}</DragOverlay> */}
                </DndContext >
            </div>
        </main>
    );

    function findContainer(id: string) {
        if (id.includes("group-")) {
            return parseInt(id.substring(6));
        }

        return appContext.preferredGroups.findIndex((group) => group.includes(id));
    }

    function handleDragStart(event: DragStartEvent) {
        const { active } = event;
        const { id } = active;

        setActiveId(id);
        //console.log(`Picked up draggable item ${id}.`);
    }

    function handleDragOver(event: DragOverEvent) {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over!;

        // Find the containers
        const activeContainer = findContainer(id as string);
        const overContainer = findContainer(overId as string);

        if (
            activeContainer === undefined ||
            overContainer === undefined ||
            activeContainer === overContainer
        ) {
            return;
        }
        
        const activeItems = appContext.preferredGroups[activeContainer]
        const overItems = appContext.preferredGroups[overContainer]

        const activeIndex = activeItems.indexOf(id as string);
        const overIndex = overItems.indexOf(overId as string);

        let newIndex;
        if (overId in appContext.preferredGroups) {
            // We're at the root droppable of a container
            newIndex = overItems.length + 1;
        } else {
            // const isBelowLastItem =
            //     over &&
            //     overIndex === overItems.length - 1 &&
            //     event.delta.y > over.rect.top + over.rect.height;

            // const modifier = isBelowLastItem ? 1 : 0;
            const modifier = 0;

            newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        const newPreferredGroups = appContext.preferredGroups.map(group => group.slice());
        newPreferredGroups[activeContainer].splice(activeIndex, 1);
        newPreferredGroups[overContainer].splice(newIndex, 0, id as string);
        appContext.setPreferredGroups(newPreferredGroups);
        localStorage.setItem("preferredGroups", JSON.stringify(newPreferredGroups));

        if (overId) {
            //console.log(`Draggable item ${id} was moved over droppable area ${overId}.`);
        } else {
            //console.log(`Draggable item ${id} is no longer over a droppable area.`);
        }
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over!;

        const activeContainer = findContainer(id as string);
        const overContainer = findContainer(overId as string);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = appContext.preferredGroups[activeContainer].indexOf(active.id as string);
        const overIndex = appContext.preferredGroups[overContainer].indexOf(overId as string);

        if (activeIndex !== overIndex) {
            const newPreferredGroups = appContext.preferredGroups.map(group => group.slice());
            newPreferredGroups[overContainer] = arrayMove(newPreferredGroups[overContainer], activeIndex, overIndex);
            appContext.setPreferredGroups(newPreferredGroups);
            localStorage.setItem("preferredGroups", JSON.stringify(newPreferredGroups));
        }

        setActiveId(null);

        if(overId) {
            //console.log(`Draggable item ${id} was dropped over droppable area ${overId}`);
        } else {
            //console.log(`Draggable item ${id} was dropped.`);
        }
    }

    function handleDragCancel(event: DragCancelEvent) {
        const { id } = event.active;
        setActiveId(null);
        //console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
    }
}