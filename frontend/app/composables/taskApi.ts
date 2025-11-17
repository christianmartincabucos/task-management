import { ref } from 'vue';
import type { Task } from '~/types/task';

const db = ref<Task[]>([]);
let nextId = 4;

export function useTaskApi(base: string, authHeader: () => Record<string, string>) {
    const list = async (date?: string | null, search?: string | null) => {
        const params: any = {};
        if (date) params.date = date;
        if (search) params.search = search;

        try {
            return await $fetch(`${base}/api/tasks`, { method: 'GET', headers: authHeader(), params });
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Failed to fetch tasks. Please try again later.');
        }
    };

    const create = async (payload: { statement: string; date: string }) => {
        try {
            return await $fetch(`${base}/api/tasks`, {
                method: 'POST',
                headers: authHeader(),
                body: payload,
            });
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Failed to create task. Please try again later.');
        }
    };

    const update = async (id: number, payload: Partial<Task>) => {
        try {
            return await $fetch(`${base}/api/tasks/${id}`, {
                method: 'PATCH',
                headers: authHeader(),
                body: payload,
            });
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Failed to update task. Please try again later.');
        }
    };

    const remove = async (id: number) => {
        try {
            return await $fetch(`${base}/api/tasks/${id}`, {
                method: 'DELETE',
                headers: authHeader(),
            });
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Failed to delete task. Please try again later.');
        }
    };

    const reorder = async (date: string, ordered_ids: number[]) => {
        try {
            return await $fetch(`${base}/api/tasks/reorder`, {
                method: 'POST',
                headers: authHeader(),
                body: { date, ordered_ids },
            });
        } catch (error) {
            console.error('API Error:', error);
            throw new Error('Failed to reorder tasks. Please try again later.');
        }
    };

    return { list, create, update, remove, reorder };
}