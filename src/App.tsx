import { BrowserRouter, Routes, Route } from 'react-router'
import Home from './pages/Home'
import EditStudents from './pages/EditStudents'
import SetPreferredGroups from './pages/SetPreferredGroups'
import Randomizer from './pages/Randomizer'
import { createContext, useState } from 'react'
import { Group, Student } from './types'
import NavBar from './components/NavBar'

const DEFAULT_APP_CONTEXT = {
    students: [] as Student[],
    setStudents: (_students: Student[]) => {},
    groupAmount: 4,
    setGroupAmount: (_amount: number) => {},
    preferredGroups: [] as Group[],
    setPreferredGroups: (_groups: Group[]) => {},
    onlyShowFirstName: false,
    setOnlyShowFirstName: (_onlyShowFirstName: boolean) => {}
}

export const AppContext = createContext(DEFAULT_APP_CONTEXT);

function App() {
    const [students, setStudents] = useState(JSON.parse(localStorage.getItem("students") || "[]") as Student[]);
    const [groupAmount, setGroupAmount] = useState(localStorage.getItem("groupAmount") ? parseInt(localStorage.getItem("groupAmount") || "4") : 4);
    const [preferredGroups, setPreferredGroups] = useState(JSON.parse(localStorage.getItem("preferredGroups") || "[]") as Group[]);
    const [onlyShowFirstName, setOnlyShowFirstName] = useState(JSON.parse(localStorage.getItem("onlyShowFirstName") || "false") as boolean);

    return (
        <AppContext.Provider value = {
            {
                students,
                setStudents,
                groupAmount,
                setGroupAmount,
                preferredGroups,
                setPreferredGroups,
                onlyShowFirstName,
                setOnlyShowFirstName
            }
        }>
            <BrowserRouter basename='/shuffle-workshop'>
                <NavBar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/students" element={<EditStudents />} />
                    <Route path="/setpreferredgroups" element={<SetPreferredGroups />} />
                    <Route path="/randomizer" element={<Randomizer />} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App
