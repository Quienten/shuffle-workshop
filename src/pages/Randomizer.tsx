import {useContext, useState} from "react";
import {presetGroup} from "../data/preset1.json"
import { students } from "../data/students.json"
import { AppContext } from "../App";
import { generateRandomGroup } from "../utils";
import { Group } from "../types";

function Shuffled({ shuffledGroups }) {
    return (
        <ul className="flex flex-wrap gap-8">
           {shuffledGroups.map((group, index) => {
               return <ul className="grid grid-rows-5 grid-flow-col gap-4">
                   <li className="font-bold text-xl" key={index}>{"Group " + (index+1)}</li>
                   {group.map((student, index2) => {
                       return <li key={index2} className="w-72 text-xl outline outline-1 outline-cyan-600">{student}</li>
                   })}
               </ul>
           })}
        </ul>
    )
}

function StudentList() {
    const appContext = useContext(AppContext)
    return (
        <>
            <ul className="grid grid-cols-4 gap-4">
                {appContext.students.map((student, i) => {
                    return <li
                        className="w-72 text-xl outline outline-1 outline-cyan-600"
                        key={i}
                    >
                        {student}
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



    const onRandomize = (event) => {
        if(event.type === "click") {
            setGroups(generateRandomGroup(appContext.students, appContext.groupAmount))
        } else if(event.type === "contextmenu") {
            event.preventDefault()
            setGroups(appContext.preferredGroups)
        }
        setRandomized(true)
    }

    return (
    <>
      <main>
          {randomized ? <Shuffled shuffledGroups={groups}/> : <StudentList/>}
          <button className="mt-24 text-3xl font-bold outline outline-1 outline-white" onClick={onRandomize} onContextMenu={onRandomize}>Randomize</button>
      </main>
    </>
    )
}