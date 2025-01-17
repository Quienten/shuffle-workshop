import { MouseEventHandler, useContext, useState } from "react";
import { AppContext } from "../App";
import { generateRandomGroup } from "../utils";
import { Group } from "../types";

function Shuffled({ shuffledGroups }: { shuffledGroups: Group[] }) {
    return (
        <ul className="flex flex-wrap gap-8 items-stretch">
            {shuffledGroups.map((group, index) => {
                return (
                    <div key={index}>
                        <h1 className="font-bold text-xl">{"Group " + (index + 1)}</h1>
                        <ul className="flex flex-col gap-4 mt-4 justify-center align-middle items-stretch">
                            {group.map((student) => {
                                return <li key={student} className="w-48 text-xl outline outline-2 outline-cyan-600 text-center rounded-lg bg-gray-800 flex items-center justify-center p-1">{student}</li>
                            })}
                        </ul>
                    </div>
                )
            })}
        </ul>
    )
}

function StudentList() {
    const appContext = useContext(AppContext)
    return (
        <>
            <ul className="flex flex-wrap gap-4 mt-4 justify-center align-middle items-stretch">
                {appContext.students.map((student, i) => {
                    return <li
                        className="w-48 text-xl outline outline-2 outline-cyan-600 text-center rounded-lg bg-gray-800 flex items-center justify-center p-1"
                        key={i}
                    >
                        <span>
                            {appContext.onlyShowFirstName ? student.split(" ")[0] : student}
                        </span>
                    </li>
                })}
            </ul>
        </>
    )
}

export default function Randomizer() {
    const appContext = useContext(AppContext)
    const [randomized, setRandomized] = useState(false)
    const [groups, setGroups] = useState([] as Group[])



    const onRandomize: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (event.type === "click") {
            setGroups(generateRandomGroup(appContext.students, appContext.groupAmount))
        } else if (event.type === "contextmenu") {
            event.preventDefault()
            setGroups(appContext.preferredGroups)
        }
        setRandomized(true)
    }

    return (
        <>
            <main>
                <div className="mt-12 mx-auto px-4 flex flex-col items-center">
                    <h1 className="text-3xl font-bold">Randomizer</h1>
                    <div className="h-96 mt-4">
                        {randomized ? <Shuffled shuffledGroups={groups} /> : <StudentList />}
                    </div>
                    <button className="mt-24 text-3xl btn btn-blue" onClick={onRandomize} onContextMenu={onRandomize}>Randomize</button>
                </div>
            </main>
        </>
    )
}