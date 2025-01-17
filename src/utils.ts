import { Group, Student } from "./types"

const sortByLastName = (students: Student[]) => {
    return students.sort((a, b) => {
        const aWords = a.split(" ");
        a = aWords[aWords.length - 1];
        const bWords = b.split(" ");
        b = bWords[bWords.length - 1];
        if (a > b)
            return 1;
        else
            return -1;
    });
}

// This method takes a list of students and how many should be in each group and returns an array of Groups that are filled alphabetically by last name.
export const initializePreferredGroups = (students: Student[], amountPerGroup: number): Group[] => {
    students = students.map(student => student.trim()) //Trim extra whitespace
    students = sortByLastName(students) //Sort by last name
    const amountOfGroups = Math.ceil(students.length / amountPerGroup) //Calculate how many groups are needed
    const result = [] as Group[]
    for (let i = 0; i < amountOfGroups; i++) {
        const group = [] as Group
        // Pop students from the list until the group is full or there are no more students
        while (group.length < amountPerGroup && students.length > 0) {
            group.push(students.pop()!)
        }
        // Add the group to the result
        result.push(group)
    }
    //console.log(result)
    return result
}

export function generateRandomGroup(students: Student[], amountPerGroup: number) {
    const studentsLeft = students.slice()
    const groups = [] as Group[]
    let group = []
    while (studentsLeft.length > 0) {
        const index = Math.floor(Math.random() * studentsLeft.length)
        group.push(studentsLeft[index])
        studentsLeft.splice(index, 1)
        if (group.length === amountPerGroup) {
            groups.push(group)
            group = []
        }
    }
    if (group.length > 0) {
        groups.push(group)
    }
    return groups;
}

export const parseTextbox = (text: string | undefined) => {
    if (!text) {
        return []
    }
    const delimeters = [",", ";", "\n"]
    let maxLengthDelimeter = "\n"
    let maxLengthDelimeterCount = 0
    for (const delimeter of delimeters) {
        if (text.split(delimeter).length > maxLengthDelimeterCount) {
            maxLengthDelimeter = delimeter
            maxLengthDelimeterCount = text.split(delimeter).length
        }
    }
    return text.split(maxLengthDelimeter).filter(student => student.trim() !== "")
}

export const CONTAINER_COLORS = [
    "bg-teal-600",
    "bg-red-500",
    "bg-green-600",
    "bg-blue-500",
    "bg-indigo-600",
    "bg-slate-500",
    "bg-yellow-600",
    "bg-purple-400",
    "bg-pink-400",
    "bg-orange-400",
]