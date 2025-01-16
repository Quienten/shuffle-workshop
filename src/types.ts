type Student = string;
type Group = Student[];

type StudentContextData = {
    students: Student[];
    groupAmount: number;
    preferredGroups: Group[];
};

export type { Student, Group, StudentContextData };