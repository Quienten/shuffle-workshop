import { useContext, useRef } from "react";
import { AppContext } from "../App";
import { initializePreferredGroups, parseTextbox } from "../utils";
import { Student } from "../types";

export default function EditStudents() {
    const appContext = useContext(AppContext);
    
    const text = useRef<HTMLTextAreaElement>(null);

    const onSave = () => {
        const newStudents = parseTextbox(text.current?.value) as Student[]
        const newPreferredGroups = initializePreferredGroups(newStudents, appContext.groupAmount)
        localStorage.setItem("students", JSON.stringify(newStudents));
        localStorage.setItem("preferredGroups", JSON.stringify(newPreferredGroups));
        appContext.setStudents(newStudents);
        appContext.setPreferredGroups(newPreferredGroups)
    }


    return (
        <main>
            <div className="mt-12 max-w-lg mx-auto px-4 flex flex-col">
                <h1 className="text-xl font-bold mt-16">Edit Students</h1>
                <textarea ref={text} defaultValue={appContext.students} className="w-96 h-96 mt-3" />
                <button className="btn btn-blue mt-1" onClick={onSave}>Save</button>
            </div>
        </main>
    )
}