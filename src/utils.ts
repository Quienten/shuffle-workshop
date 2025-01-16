import { Group, Student } from "./types"

const sortByLastName = (students: Student[]) => {
    return students.sort((a,b) => {  
        if(a.split(" ")[1] > b.split(" ")[1])
          return 1;
        else
          return -1;
    });
}

const initializePreferredGroups = (students: Student[], amountPerGroup: number) => {
    students = sortByLastName(students)
    const amountOfGroups = Math.ceil(students.length / amountPerGroup)
    const result = [] as Group[]
    for(let i = 0; i < amountOfGroups; i++) {
        const group = [] as Group
        while(group.length < amountPerGroup && students.length > 0) {
            group.push(students.pop()!)
        }
        result.push(group)
    }
    return result
}

export { initializePreferredGroups }