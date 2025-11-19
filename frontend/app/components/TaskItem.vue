<template>
    <div class="flex items-center justify-between p-3 border rounded-xl mb-3 bg-white">
        <div class="w-full flex items-center gap-4">
            <!-- Toggle Task Completion -->
            <button @click="toggle" :class="[{ 'bg-black text-white': task.is_done }, 'w-6 h-6 rounded-full border flex items-center justify-center']">
                <span v-if="task.is_done">
                    <LucideCheck class="w-4 h-4" />
                </span>
            </button>

            <!-- Task Statement -->
            <div v-if="editingTaskId !== task.id" :class="[{ 'line-through ': task.is_done }, 'cursor-pointer']" @click="startEditing">
                {{ task.statement }}
            </div>
            <input
                v-else
                v-model="editText"
                class="w-full border p-2 rounded"
                @blur="save"
                @keyup.enter="save"
                @keyup.esc="cancel"
            />
        </div>

        <!-- Delete Button -->
        <div class="flex items-center gap-3">
            <button @click="confirmDelete" title="Delete">
                <LucideTrash2 />
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue'
import type { Task } from '~/types/task'
import { useTaskStore } from '~/stores/useTaskStore'

const props = defineProps<{ task: Task; editingTaskId: number | null }>()
const emit = defineEmits(['update:editingTaskId'])
const store = useTaskStore()
const editText = ref(props.task.statement)

// Start editing the task
function startEditing() {
    emit('update:editingTaskId', props.task.id)
}

// Toggle task completion
async function toggle() {
    await store.toggle(props.task)
}

// Confirm task deletion
function confirmDelete() {
    if (confirm('Delete this task?')) store.remove(props.task.id)
}

// Save the updated task statement
async function save() {
    if (editText.value.trim() !== props.task.statement) {
        await store.updateStatement(props.task.id, editText.value.trim())
    }
    emit('update:editingTaskId', null) // Reset editing state
}

// Cancel editing and revert changes
function cancel() {
    editText.value = props.task.statement
    emit('update:editingTaskId', null) // Reset editing state
}
</script>

<style scoped></style>