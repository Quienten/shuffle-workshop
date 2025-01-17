import { FaGithub } from "react-icons/fa";

export default function Home() {
    return (
        <main>
            <div className="mt-12 max-w-lg mx-auto px-4">
                <h1 className="text-2xl font-bold">Welcome to Workshop Shuffler 3000</h1>
                <p className="italic">
                    The ultimate platform for seamlessly shuffling groups in workshops, classrooms, or collaborative sessions!
                </p>
                <h1 className="text-xl font-bold mt-16">About</h1>
                <p className="">
                    The aim of this tool is to empower facilitators and students by creating dynamic, randomized groups that encourage fresh perspectives and new connections. Whether you're running a TCSS 390 workshop, a classroom, or any collaborative learning environment, this platform ensures <span className="text-indigo-300 italic">fair and efficient</span> group assignments every time.
                </p>
                <a href="https://github.com/Quienten/shuffle-workshop" className="flex mt-10"><FaGithub size={"1.5em"}/><span className="ml-3 text-blue-400">View Source Code</span></a>
                <a href="https://quienten.dev" className="flex mt-4"><span className="text-blue-400">Created by Quienten Miller</span></a>
            </div>
        </main>
    );
}