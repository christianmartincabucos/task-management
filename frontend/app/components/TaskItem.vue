<template>
    <div
        class="flex items-center justify-between p-3 border rounded-xl mb-3 bg-white"
        ref="taskItemRef"
        @focusout="handleFocusOut"
    >
        <div class="w-full flex items-center gap-4">
            <!-- Toggle Task Completion -->
            <button
                @click="toggle"
                :class="[{ 'bg-black text-white': task.is_done }, 'w-6 h-6 rounded-full border flex items-center justify-center']"
                title="Mark as done"
            >
                <span v-if="task.is_done">
                    <LucideCheck class="w-4 h-4" />
                </span>
            </button>

            <!-- Task Statement -->
            <div
                v-if="editingTaskId !== task.id"
                :class="[{ 'line-through text-gray-400': task.is_done }, 'cursor-pointer']"
                @click="startEditing"
            >
                {{ task.statement }}
            </div>
            <input
                v-else
                ref="editInput"
                v-model="editText"
                class="w-full border p-2 rounded"
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
import { ref, defineProps, defineEmits, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { Task } from '~/types/task'
import { useTaskStore } from '~/stores/useTaskStore'

const props = defineProps<{ task: Task; editingTaskId: number | null }>()
const emit = defineEmits(['update:editingTaskId'])
const store = useTaskStore()
const editText = ref(props.task.statement)
const taskItemRef = ref<HTMLElement | null>(null)
const editInput = ref<HTMLInputElement | null>(null) // Reference to the input field

// Start editing the task
async function startEditing() {
    emit('update:editingTaskId', props.task.id)
    await nextTick()
    editInput.value?.focus()
}

// Toggle task completion
async function toggle() {
    await store.toggle(props.task) // Call the store method to toggle the task's completion status
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

// Handle focus out to trigger cancel
function handleFocusOut(event: FocusEvent) {
    const relatedTarget = event.relatedTarget as HTMLElement | null
    // Check if the clicked element is outside the task item
    if (!taskItemRef.value?.contains(relatedTarget)) {
        cancel()
    }
}
</script>

<style scoped></style>