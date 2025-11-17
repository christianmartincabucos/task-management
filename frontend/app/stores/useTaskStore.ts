import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Task } from '~/types/task'
import { useApi } from '~/composables/useApi'

export const useTaskStore = defineStore('tasks', () => {
    const tasks = ref<Task[]>([])
    const date = ref<string>(new Date().toISOString().slice(0, 10))
    const search = ref<string>('')
    const api = useApi()


    const fetch = async () => {
        const response = await api.list(
            search.value ? undefined : date.value,
            search.value || undefined
        ) as { data: Task[] }
        tasks.value = response.data
    }

    const add = async (statement: string) => {
        const res = await api.create({ statement, date: date.value }) as { data: Task }
        tasks.value.push(res.data)
    }

    const toggle = async (t: Task) => {
        await api.update(t.id, { is_done: !t.is_done })
        t.is_done = !t.is_done
    }

    const remove = async (id: number) => {
        await api.remove(id)
        tasks.value = tasks.value.filter((t) => t.id !== id)
    }

    const updateStatement = async (id: number, statement: string) => {
        const res = await api.update(id, { statement }) as { data: Task }
        const idx = tasks.value.findIndex((t) => t.id === id)
        if (idx !== -1 && res.data) tasks.value[idx] = res.data
    }

    const saveOrder = async () => {
        await api.reorder(date.value, tasks.value.map((t) => t.id))
    }

    return {
        tasks,
        date,
        search,
        fetch,
        add,
        toggle,
        remove,
        updateStatement,
        saveOrder,
    }
})