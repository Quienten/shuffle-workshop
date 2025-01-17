import React, { useContext, useState } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    closestCorners,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import { Item, SortableItem } from './SortableItem';
import { AppContext } from '../App';
import Container from './Container';

const wrapperStyle = {
    display: "flex",
    flexDirection: "row",
};

// Watch out! the index of a group can be 0 which is falsy
export default function StudentDnD() {
    const appContext = useContext(AppContext)
    //const [items, setItems] = useState([1, 2, 3]);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );


    return (
        <div style={wrapperStyle}>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={handleDragStart}
                onDragOver={handleDragOver}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
            >

                {appContext.preferredGroups.map((group, groupIndex) => {
                    return (
                        <Container
                            id={'group-' + groupIndex}
                            key={groupIndex}
                            items={group}
                        />
                    )
                })}
                <DragOverlay>{activeId ? <Item text={activeId} /> : null}</DragOverlay>
            </DndContext >
        </div>
    );

    function findContainer(id: string) {
        // if (id.includes("group")) {
        //     return id;
        // }

        // return appContext.preferredGroups.find((group) => group.includes(id));
        if (id.includes("group-")) {
            return parseInt(id.substring(6));
        }

        return appContext.preferredGroups.findIndex((group) => group.includes(id));
    }

    function handleDragStart(event) {
        const { active } = event;
        const { id } = active;

        setActiveId(id);
        console.log(`Picked up draggable item ${id}.`);
    }

    function handleDragOver(event) {
        const { active, over, draggingRect } = event;
        const { id } = active;
        const { id: overId } = over;

        // Find the containers
        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            activeContainer === undefined ||
            overContainer === undefined ||
            activeContainer === overContainer
        ) {
            return;
        }

        // setItems((prev) => {
        //     const activeItems = prev[activeContainer];
        //     const overItems = prev[overContainer];

        //     // Find the indexes for the items
        //     const activeIndex = activeItems.indexOf(id);
        //     const overIndex = overItems.indexOf(overId);

        //     let newIndex;
        //     if (overId in prev) {
        //         // We're at the root droppable of a container
        //         newIndex = overItems.length + 1;
        //     } else {
        //         const isBelowLastItem =
        //             over &&
        //             overIndex === overItems.length - 1 &&
        //             draggingRect.offsetTop > over.rect.offsetTop + over.rect.height;

        //         const modifier = isBelowLastItem ? 1 : 0;

        //         newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        //     }

        //     return {
        //         ...prev,
        //         [activeContainer]: [
        //             ...prev[activeContainer].filter((item) => item !== active.id),
        //         ],
        //         [overContainer]: [
        //             ...prev[overContainer].slice(0, newIndex),
        //             items[activeContainer][activeIndex],
        //             ...prev[overContainer].slice(newIndex, prev[overContainer].length),
        //         ],
        //     };
        // });
        const activeItems = appContext.preferredGroups[activeContainer]
        const overItems = appContext.preferredGroups[overContainer]

        const activeIndex = activeItems.indexOf(id);
        const overIndex = overItems.indexOf(overId);

        let newIndex;
        if (overId in appContext.preferredGroups) {
            // We're at the root droppable of a container
            newIndex = overItems.length + 1;
        } else {
            const isBelowLastItem =
                over &&
                overIndex === overItems.length - 1 &&
                draggingRect?.offsetTop > over.rect.offsetTop + over.rect.height;

            const modifier = isBelowLastItem ? 1 : 0;

            newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
        }

        const newPreferredGroups = appContext.preferredGroups.map(group => group.slice());
        newPreferredGroups[activeContainer].splice(activeIndex, 1);
        newPreferredGroups[overContainer].splice(newIndex, 0, id);
        appContext.setPreferredGroups(newPreferredGroups);

        if (overId) {
            console.log(
              `Draggable item ${id} was moved over droppable area ${overId}.`
            );
        } else {
            console.log(`Draggable item ${id} is no longer over a droppable area.`);
        }
    }

    function handleDragEnd(event) {
        const { active, over } = event;
        const { id } = active;
        const { id: overId } = over;

        const activeContainer = findContainer(id);
        const overContainer = findContainer(overId);

        if (
            !activeContainer ||
            !overContainer ||
            activeContainer !== overContainer
        ) {
            return;
        }

        const activeIndex = appContext.preferredGroups[activeContainer].indexOf(active.id);
        const overIndex = appContext.preferredGroups[overContainer].indexOf(overId);

        if (activeIndex !== overIndex) {
            // setItems((items) => ({
            //     ...items,
            //     [overContainer]: arrayMove(
            //         items[overContainer],
            //         activeIndex,
            //         overIndex
            //     ),
            // }));
            const newPreferredGroups = appContext.preferredGroups.map(group => group.slice());
            newPreferredGroups[overContainer] = arrayMove(newPreferredGroups[overContainer], activeIndex, overIndex);
            appContext.setPreferredGroups(newPreferredGroups);
        }

        setActiveId(null);

        if(overId) {
            console.log(
                `Draggable item ${id} was dropped over droppable area ${overId}`
              );
        } else {
            console.log(`Draggable item ${id} was dropped.`);
        }
    }

    function handleDragCancel(event) {
        const { id } = event.active;
        setActiveId(null);
        console.log(`Dragging was cancelled. Draggable item ${id} was dropped.`);
    }
}