// test-data/test-data.ts
import { Column, Tag, Project, TaskCard } from '../src/types';

export const TEST_CREDENTIALS = {
    email: 'admin',
    password: 'password123'
};

export const BASE_URL = 'https://animated-gingersnap-8cf7f2.netlify.app/';

export interface TestCase extends TaskCard {
    testId: string;
}

export const TEST_CASES: TestCase[] = [
    {
        testId: 'TC1',
        title: "Implement user authentication",
        column: Column.TODO,
        tags: [Tag.FEATURE, Tag.HIGH_PRIORITY],
        project: Project.WEB
    },
    {
        testId: 'TC2',
        title: "Fix navigation bug",
        column: Column.TODO,
        tags: [Tag.BUG],
        project: Project.WEB
    },
    {
        testId: 'TC3',
        title: "Design system updates",
        column: Column.IN_PROGRESS,
        tags: [Tag.DESIGN],
        project: Project.WEB
    },
    {
        testId: 'TC4',
        title: "Push notification system",
        column: Column.TODO,
        tags: [Tag.FEATURE],
        project: Project.MOBILE
    },
    {
        testId: 'TC5',
        title: "Offline mode",
        column: Column.IN_PROGRESS,
        tags: [Tag.FEATURE, Tag.HIGH_PRIORITY],
        project: Project.MOBILE
    },
    {
        testId: 'TC6',
        title: "App icon design",
        column: Column.DONE,
        tags: [Tag.DESIGN],
        project: Project.MOBILE
    }
];