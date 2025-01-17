import { useContext } from "react";
import { AppContext } from "../App";

export default function Home() {
    const studentContext = useContext(AppContext);
    return (
        <div>
            <h1>Home</h1>
            <h2>{studentContext.groupAmount}</h2>
            <ul>
                <li><a href="/students">Edit Students</a></li>
                <li><a href="/setpreferredgroups">Edit Preferred Groups</a></li>
                <li><a href="/randomizer">Randomizer</a></li>
            </ul>
        </div>
    );
}