import { FaHome } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaDiceFive } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

export default function NavBar() {
    return (
        <nav className="flex justify-start bg-gray-900 p-4 mx-auto items-center">
            <a href="/shuffle-workshop/" className="text-white"><FaHome/></a>
            <a href="/shuffle-workshop/students" className="text-white"><PiStudentFill/> Edit Students</a>
            <a href="/shuffle-workshop/randomizer" className="text-white"><FaDiceFive/> Randomizer</a>
            <span className="text-white ml-auto mr-auto font-bold">Workshop Shuffler 3000</span>
            <a href="/shuffle-workshop/setpreferredgroups" className="text-white ml-auto mr-0"><IoIosSettings/></a>
        </nav>
    )
}