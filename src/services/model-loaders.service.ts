import {
    IGroup,
    IGroupInResponse,
    IReport,
    IReportInResponse,
    ISpecialityInResponse,
    IStudentProfile,
    ISubjectInResponse,
    ITask,
    ITaskInResponse,
    ITeacherProfile,
    IUserProfile,
} from '@/models';
import {studentRoleName, teacherRoleName} from '@/configs/constants';

import {apiService} from './api.service';

export const loaders = {
    loadUserProfileById: async (userId: string) => {
        const user: IUserProfile = (await apiService.getUserProfileById(userId)).data;
        let student: IStudentProfile | undefined;
        let teacher: ITeacherProfile | undefined;

        if (user.roles.includes(studentRoleName)) {
            student = await loaders.loadStudentProfileById(userId);
        }
        if (user.roles.includes(teacherRoleName)) {
            teacher = await loaders.loadTeacherProfileById(userId);
        }

        return {
            ...user,
            studentProfile: student,
            teacherProfile: teacher,
        } as IUserProfile;
    },
    loadStudentProfileById: async (userId: string) => {
        const student = (await apiService.getStudentProfileById(userId)).data;
        const group = student.studentGroup !== null ? await loaders.loadGroupById(student.studentGroup) : undefined;

        return {
            ...student,
            studentGroup: group,
        } as IStudentProfile;
    },
    loadGroupById: async (groupId: string) => {
        const group = (await apiService.getGroupById(groupId)).data;
        const speciality = (await apiService.getSpecialityById(group.speciality)).data;

        return {
            ...group,
            speciality,
        } as IGroup;
    },
    loadTeacherProfileById: async (userId: string) => {
        const teacher = (await apiService.getTeacherProfileById(userId)).data;
        const subjects = (await apiService.getSubjects()).data;

        return {
            subjects: subjects.filter((subject: ISubjectInResponse) => teacher.subjects.includes(subject.id)),
        };
    },
    loadAllGroups: async () => {
        const specialities = (await apiService.getSpecialities()).data;
        const groups = (await apiService.getGroups()).data;

        return groups.map((group: IGroupInResponse) => {
            return {
                ...group,
                speciality: specialities.find(
                    (speciality: ISpecialityInResponse) => speciality.id === group.speciality,
                ),
            };
        }) as IGroup[];
    },
    loadAllTasks: async () => {
        const tasks = (await apiService.getTasks()).data;
        const groups = await loaders.loadAllGroups();
        const subjects = (await apiService.getSubjects()).data;

        return tasks.map((task: ITaskInResponse) => {
            return {
                ...task,
                subject: subjects.find((subject: ISubjectInResponse) => subject.id === task.subject),
                studentGroup: groups.find((group: IGroup) => group.id === task.studentGroup),
            };
        }) as ITask[];
    },
    loadTaskById: async (taskId: string) => {
        const task = (await apiService.getTaskById(taskId)).data;
        const studentGroup = await loaders.loadGroupById(task.studentGroup);
        const subject = (await apiService.getSubjectById(task.subject)).data;

        return {
            ...task,
            studentGroup,
            subject,
        } as ITask;
    },
    loadReportByTaskId: async (taskId: string) => {
        const report = (await apiService.getStudentReportForTask(taskId)).data;
        return _loadReportRelatedParts(report);
    },
    loadReportById: async (reportId) => {
        const report = (await apiService.getReportById(reportId)).data;
        return _loadReportRelatedParts(report);
    },
    loadAllReports: async () => {
        const reports = (await apiService.getReports()).data;
        return reports.map((report: IReportInResponse) => {
            return {
                ...report,
                task: {id: report.task} as unknown as ITask,
                student: {id: report.student} as unknown as IUserProfile,
                verifiedBy: {id: report.verifiedBy} as unknown as IUserProfile,
            };
        }) as IReport[];
    },
};

async function _loadReportRelatedParts(report: IReportInResponse) {
    let tutor: IUserProfile | null = null;
    if (report.verifiedBy) {
        tutor = await loaders.loadUserProfileById(report.verifiedBy);
    }
    return {
        ...report,
        verifiedBy: tutor,
        task: {id: report.task} as unknown as ITask,
        student: {id: report.student} as unknown as IUserProfile,
    } as IReport;
}
