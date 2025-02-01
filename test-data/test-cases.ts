// test-data/test-cases.ts
import { Column, Tag, Project, TaskCard } from '../src/types';

export const TEST_CREDENTIALS = {
    email: 'admin',
    password: 'password123'
};

export const BASE_URL = 'https://animated-gingersnap-8cf7f2.netlify.app/';

export const TEST_CASES: TaskCard[] = [
    {
        id: "TC-001",
        title: "Implement user authentication",
        column: Column.TODO,
        tags: [Tag.FEATURE, Tag.HIGH_PRIORITY],
        project: Project.WEB
    },
    {
        id: "TC-002",
        title: "Fix navigation bug",
        column: Column.TODO,
        tags: [Tag.BUG],
        project: Project.WEB
    },
    {
        id: "TC-003",
        title: "Design system updates",
        column: Column.IN_PROGRESS,
        tags: [Tag.DESIGN],
        project: Project.WEB
    },
    {
        id: "TC-004",
        title: "Push notification system",
        column: Column.TODO,
        tags: [Tag.FEATURE],
        project: Project.MOBILE
    },
    {
        id: "TC-005",
        title: "Offline mode",
        column: Column.IN_PROGRESS,
        tags: [Tag.FEATURE, Tag.HIGH_PRIORITY],
        project: Project.MOBILE
    },
    {
        id: "TC-006",
        title: "App icon design",
        column: Column.DONE,
        tags: [Tag.DESIGN],
        project: Project.MOBILE
    }
];