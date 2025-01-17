import { Group, Student } from "./types"

const sortByLastName = (students: Student[]) => {
    return students.sort((a,b) => {
        const aWords = a.split(" ");
        a = aWords[aWords.length - 1];
        const bWords = b.split(" ");
        b = bWords[bWords.length - 1];
        if(a > b)
          return 1;
        else
          return -1;
    });
}

// This method takes a list of students and how many should be in each group and returns an array of Groups that are filled alphabetically by last name.
const initializePreferredGroups = (students: Student[], amountPerGroup: number) : Group[]=> {
    students = students.map(student => student.trim()) //Trim extra whitespace
    students = sortByLastName(students) //Sort by last name
    const amountOfGroups = Math.ceil(students.length / amountPerGroup) //Calculate how many groups are needed
    const result = [] as Group[]
    for(let i = 0; i < amountOfGroups; i++) {
        const group = [] as Group
        // Pop students from the list until the group is full or there are no more students
        while(group.length < amountPerGroup && students.length > 0) {
            group.push(students.pop()!)
        }
        // Add the group to the result
        result.push(group)
    }
    console.log(result)
    return result
}

export { initializePreferredGroups }