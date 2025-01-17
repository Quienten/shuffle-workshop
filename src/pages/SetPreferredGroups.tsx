import { useContext } from "react";
import { AppContext } from "../App";
import StudentDnD from "../components/StudentDnD";
import { initializePreferredGroups } from "../utils";

export default function SetPreferredGroups() {
    const appContext = useContext(AppContext);

    function setGroupAmount(event: React.ChangeEvent<HTMLInputElement>) {
        const newValue = event.target.valueAsNumber;
        appContext.setGroupAmount(newValue);
        localStorage.setItem("groupAmount", newValue.toString());
        const newPreferredGroups = initializePreferredGroups(appContext.students, newValue)
        appContext.setPreferredGroups(newPreferredGroups);
        localStorage.setItem("preferredGroups", JSON.stringify(newPreferredGroups));
    }

    return (
        <div>
            <h1>Set Preferred Groups</h1>
            <p>Amount of students: {appContext.students.length}</p>
            <p>Students per group: </p>
            <input type="number" min="1" max="10" defaultValue={appContext.groupAmount} onChange={setGroupAmount}/>
            <p>Amount of groups: {Math.ceil(appContext.students.length / appContext.groupAmount)}</p>
            {Math.ceil(appContext.students.length / appContext.groupAmount) !== (appContext.students.length / appContext.groupAmount) && <>
                <p>Warning: The amount of groups is not a whole number. Some groups will have one more student than others.</p>
                <p>The extra group will have: {appContext.students.length % appContext.groupAmount} students.</p>
            </>}
            {/* <ul className="grid grid-cols-4 gap-4">
                {appContext.students.map((student, i) => {
                    return <li
                        className="w-72 text-xl outline outline-1 outline-cyan-600"
                        key={i}
                    >
                        {student}
                    </li>
                })}
            </ul> */}
            <StudentDnD />
        </div>
    )
}