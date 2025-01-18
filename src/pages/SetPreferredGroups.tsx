import { useContext } from "react";
import { AppContext } from "../App";
import StudentDnD from "../components/dnd/StudentDnD";
import { initializePreferredGroups } from "../utils";
import { MdOutlineWarning } from "react-icons/md";
import { Link } from "react-router";

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

    const updateSetOnlyShowFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        appContext.setOnlyShowFirstName(event.target.checked);
        localStorage.setItem("onlyShowFirstName", event.target.checked.toString());
    }

    return (
        <main>
            <div className="mt-12 max-w-lg mx-auto px-4">
                <h1 className="text-xl font-bold mt-16">Settings</h1>
                <div>
                    <div className="flex">
                        <p>Hide last names: </p>
                        <input type="checkbox" className="ml-2" defaultChecked={appContext.onlyShowFirstName} onChange={updateSetOnlyShowFirstName} />
                    </div>
                </div>
                <div className="h-64 mt-3">
                    <h1 className="text-xl font-bold mt-16">Set Preferred Groups</h1>
                    <p>When using the <Link className="text-blue-500" to="/randomizer">randomizer</Link>, right clicking the randomize button will force the preferred group below.</p>
                    <p className="mt-3">Amount of students: {appContext.students.length}</p>
                    <span>Students per group: </span>
                    <input type="number" min="1" max="10" defaultValue={appContext.groupAmount} onChange={setGroupAmount}/>
                    <p>Amount of groups: {Math.ceil(appContext.students.length / appContext.groupAmount)}</p>
                    {Math.ceil(appContext.students.length / appContext.groupAmount) !== (appContext.students.length / appContext.groupAmount) &&
                        <div className="bg-slate-800 p-2 rounded-lg">
                            <span className="flex">
                                <MdOutlineWarning className="text-yellow-300 mr-3" size="2.75em"/>
                                <p>The amount of students and groups does not divide evenly. The extra group will have: {appContext.students.length % appContext.groupAmount} student(s).</p>
                            </span>
                            <p></p>
                        </div>
                    }
                </div>
                <StudentDnD />
            </div>
        </main>
    )
}