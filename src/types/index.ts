// src/types/index.ts
export enum Column {
    TODO = "Todo",
    IN_PROGRESS = "In Progress",
    DONE = "Done"
}

export enum Tag {
    FEATURE = "Feature",
    BUG = "Bug",
    DESIGN = "Design",
    HIGH_PRIORITY = "High Priority"
}

export enum Project {
    WEB = "Web Application",
    MOBILE = "Mobile Application"
}

export interface TaskCard {
    testId: string;  // Added testId field
    title: string;
    column: Column;
    tags: Tag[];
    project: Project;
}

export interface TestCredentials {
    email: string;
    password: string;
}