import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Home from './pages/Home'
import EditStudents from './pages/EditStudents'
import SetPreferredGroups from './pages/SetPreferredGroups'
import Randomizer from './pages/Randomizer'
import { createContext, useState } from 'react'
import { Group, Student } from './types'

const DEFAULT_APP_CONTEXT = {
    students: [] as Student[],
    setStudents: (_students: Student[]) => {},
    groupAmount: 4,
    setGroupAmount: (_amount: number) => {},
    preferredGroups: [] as Group[],
    setPreferredGroups: (_groups: Group[]) => {}
}

export const AppContext = createContext(DEFAULT_APP_CONTEXT);

function App() {
    const [students, setStudents] = useState(JSON.parse(localStorage.getItem("students") || "[]") as Student[]);
    const [groupAmount, setGroupAmount] = useState(localStorage.getItem("groupAmount") ? parseInt(localStorage.getItem("groupAmount") || "4") : 4);
    console.log(localStorage.getItem("preferredGroups"))
    const [preferredGroups, setPreferredGroups] = useState(JSON.parse(localStorage.getItem("preferredGroups") || "[]") as Group[]);

    return (
        <AppContext.Provider value = {
            {
                students,
                setStudents,
                groupAmount,
                setGroupAmount,
                preferredGroups,
                setPreferredGroups
            }
        }>
            <BrowserRouter>
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
