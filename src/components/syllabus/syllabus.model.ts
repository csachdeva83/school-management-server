type exams = 'UT1' | 'UT2' | 'MidTerm' | 'UT3' | 'UT4' | 'Preboard';

export type Syllabus = {
    [key in exams]: Array<object>;
};