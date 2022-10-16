export interface ISubjectTeacher {
    [subjectName: string]: {teacherImgLink: string, teacherName: string}
};

export interface ITodayTimetable {
    firstPeriod: {
        subject: string,
        teacherImgLink: string,
        teacherName: string
    },
    secondPeriod: {
        subject: string,
        teacherImgLink: string,
        teacherName: string
    },
    thirdPeriod: {
        subject: string,
        teacherImgLink: string,
        teacherName: string
    },
    fourthPeriod: {
        subject: string,
        teacherImgLink: string,
        teacherName: string
    },
    fifthPeriod: {
        subject: string,
        teacherImgLink: string,
        teacherName: string
    },
    sixthPeriod: {
        subject: string,
        teacherImgLink: string,
        teacherName: string
    },
    seventhPeriod: {
        subject: string,
        teacherImgLink: string,
        teacherName: string
    },
    eigthPeriod: {
        subject: string,
        teacherImgLink: string,
        teacherName: string
    },
};