<template>
    <div class="flex items-center justify-between p-3 border rounded-xl mb-3 bg-white">
        <div class="flex items-center gap-4">
            <button @click="toggle" :class="[{ 'bg-black text-white': task.is_done }, 'w-6 h-6 rounded-full border flex items-center justify-center']">
                <span v-if="task.is_done">
                    <LucideCheck class="w-4 h-4" />
                </span>
            </button>
            <div :class="[{ 'line-through ': task.is_done }, 'cursor-pointer']" @click="edit = !edit">
                {{ task.statement }}
            </div>
        </div>
        <div class="flex items-center gap-3">
            <button @click="confirmDelete" title="Delete">
                <LucideTrash2 />
            </button>
        </div>
    </div>

    <div v-if="edit" class="mt-2">
        <input v-model="editText" class="w-full border p-2 rounded" />
        <div class="mt-2 text-right">
            <button @click="save" class="px-4 py-2 bg-black text-white rounded">Save</button>
            <button @click="cancel" class="ml-2 px-4 py-2 border rounded">Cancel</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue'
import type { Task } from '~/types/task'
import { useTaskStore } from '~/stores/useTaskStore'

const props = defineProps<{ task: Task }>()
const store = useTaskStore()
const edit = ref(false)
const editText = ref(props.task.statement)

async function toggle() {
    await store.toggle(props.task)
}

function confirmDelete() {
    if (confirm('Delete this task?')) store.remove(props.task.id)
}

async function save() {
    await store.updateStatement(props.task.id, editText.value)
    edit.value = false
}

function cancel() {
    editText.value = props.task.statement
    edit.value = false
}
</script>

<style scoped></style>