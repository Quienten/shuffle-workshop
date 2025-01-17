import { useContext, useRef } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router";
import { initializePreferredGroups } from "../utils";
import { Student } from "../types";

export default function EditStudents() {
    const appContext = useContext(AppContext);
    const navigate = useNavigate();
    
    const text = useRef<HTMLTextAreaElement>(null);

    const onSave = () => {
        const newStudents = text.current?.value.split("\n") || [] as Student[]
        const newPreferredGroups = initializePreferredGroups(newStudents, appContext.groupAmount)
        localStorage.setItem("students", JSON.stringify(newStudents));
        localStorage.setItem("preferredGroups", JSON.stringify(newPreferredGroups));
        appContext.setStudents(newStudents);
        appContext.setPreferredGroups(newPreferredGroups)
        navigate("/");
    }


    return (
        <div>
            <h1>Edit Students</h1>
            <textarea ref={text} defaultValue={appContext.students} className="w-96 h-96">

            </textarea>
            <button onClick={onSave}>Save</button>
        </div>
    )
}