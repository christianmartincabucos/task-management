export interface Task {
    id: number;
    statement: string;
    is_done: boolean;
    date: string; // YYYY-MM-DD
    priority?: number;
    order?: number;
}