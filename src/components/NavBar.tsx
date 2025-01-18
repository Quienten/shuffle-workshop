import { FaHome } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { FaDiceFive } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import { Link } from "react-router";

export default function NavBar() {
    return (
        <nav className="flex justify-start bg-gray-900 p-4 mx-auto items-center">
            <Link to="/" className="text-white"><FaHome/></Link>
            <Link to="/students" className="text-white"><PiStudentFill/> Edit Students</Link>
            <Link to="/randomizer" className="text-white"><FaDiceFive/> Randomizer</Link>
            <span className="text-white ml-auto mr-auto font-bold">Workshop Shuffler 3000</span>
            <Link to="/setpreferredgroups" className="text-white ml-auto mr-0"><IoIosSettings/></Link>
        </nav>
    )
}