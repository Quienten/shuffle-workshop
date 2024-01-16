import './App.css'
import {useState} from "react";
import {presetGroup} from "./data/preset1.json"
import { students } from "./data/students.json"

function Shuffled({ shuffledGroups }) {
    return (
        <ul className="flex flex-wrap gap-8">
           {shuffledGroups.map((group, index) => {
               return <ul className="grid grid-rows-5 grid-flow-col gap-4">
                   <li className="font-bold text-xl" key={index}>{"Group " + (index+1)}</li>
                   {group.members.map((student, index2) => {
                       return <li key={index2} className="w-72 text-xl outline outline-1 outline-cyan-600">{student}</li>
                   })}
               </ul>
           })}
        </ul>
    )
}

function StudentList({ students, onRandomize }) {

    return (
        <>
            <ul className="grid grid-cols-4 gap-4">
                {students.map((student, i) => {
                    return <li
                        className="w-72 text-xl outline outline-1 outline-cyan-600"
                        key={i}
                    >
                        {student}
                    </li>
                })}
            </ul>
            <button className="mt-24 text-3xl font-bold outline outline-1 outline-white" onClick={onRandomize} onContextMenu={onRandomize}>Randomize</button>
        </>
    )
}

function App() {
    const [randomized, setRandomized] = useState(false)
    const [groups, setGroups] = useState(presetGroup)

    function generateRandomGroup() {
        let studentsLeft = students
        let groups = []
        let group = []
        while(studentsLeft.length > 0) {
            const index = Math.floor(Math.random()*studentsLeft.length)
            group.push(studentsLeft[index])
            studentsLeft.splice(index, 1)
            if(group.length === 4) {
                groups.push({"members": group})
                group = []
            }
        }
        if(group.length > 0) {
            groups.push({"members": group})
        }
        return groups;
    }

    const onRandomize = (e) => {
        if(e.type === "click") {
            console.log("Hi");
            // setGroups([{
            //     "members": [
            //         "Hi"
            //     ]
            // }])
            setGroups(generateRandomGroup())
        } else if(e.type === "contextmenu") {
            setGroups(presetGroup)
        }
        setRandomized(true)

    }

    return (
    <>
      <main>
          {randomized ? <Shuffled shuffledGroups={groups}/> : <StudentList students={students} onRandomize={onRandomize}/>}
      </main>
    </>
    )
}

export default App
