export const adminRoleName = 'admin';
export const studentRoleName = 'student';
export const tutorRoleName = 'tutor';
export const teacherRoleName = 'teacher';

export const rolesRus = {
    student: 'студент',
    tutor: 'тьютор',
    teacher: 'преподаватель',
    admin: 'администратор',
};

export const statusRus = {
    N: 'не проверено',
    A: 'принято',
    D: 'сделано',
    F: 'исправить',
};


export function structKeys(s) {
    return Object.keys(s);
}

export function structValues(s) {
    return Object.values(s);
}

export function findKeyByValue(s, val) {
    return Object.entries(s).filter((v) => v[1] === val)[0][0];
}
