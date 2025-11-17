<template>
    <div class="app-frame flex flex-col">
        <Header />

        <div class="flex flex-1 overflow-hidden">
            <aside class="w-64 flex-shrink-0">
                <DateSidebar />
            </aside>

            <main class="flex-1 p-10 overflow-auto">
                <div class="max-w-3xl mx-auto">
                    <div v-if="store.tasks.length === 0" class="text-center py-20">
                        <TaskInput />
                    </div>

                    <div v-else>
                        <ul class="space-y-3">
                            <li
                                v-for="(task, index) in store.tasks"
                                :key="task.id"
                                :data-id="task.id"
                                draggable="true"
                                @dragstart="onDragStart(index)"
                                @dragover.prevent
                                @dragenter="onDragEnter(index)"
                                @dragend="onDragEnd"
                            >
                                <TaskItem :task="task" />
                            </li>
                        </ul>
                        <div class="fixed bottom-8 w-full max-w-3xl px-4">
                            <div class="flex items-center bg-white border rounded-2xl p-4">
                                <input v-model="newText" placeholder="What else do you need to do?" class="flex-1 bg-transparent outline-none" />
                                <button @click="add" class="w-12 h-12 rounded-full bg-black text-white">↑</button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { ref, watch, onMounted } from 'vue'
    import DateSidebar from '~/components/DateSidebar.vue'
    import Header from '~/components/Header.vue'
    import TaskInput from '~/components/TaskInput.vue'
    import TaskItem from '~/components/TaskItem.vue'
    import { useTaskStore } from '~/stores/useTaskStore'

    const store = useTaskStore()
    const newText = ref('')
    const draggedIndex = ref<number | null>(null)

    definePageMeta({
        ssr: false,
    });

    onMounted(() => {
        store.fetch()
    })


    function add() {
        if (!newText.value.trim()) return
        store.add(newText.value.trim())
        newText.value = ''
    }

    function onDragStart(index: number) {
        draggedIndex.value = index
    }

    function onDragEnter(index: number) {
        if (draggedIndex.value === null || draggedIndex.value === index) return

        // Reorder tasks in the array
        const draggedTask = store.tasks[draggedIndex.value]
        if (!draggedTask) return
        store.tasks.splice(draggedIndex.value, 1) // Remove the dragged task
        store.tasks.splice(index, 0, draggedTask) // Insert it at the new position

        draggedIndex.value = index // Update the dragged index
    }

    function onDragEnd() {
        draggedIndex.value = null

        // Save the new order to the backend
        store.saveOrder()
    }

    watch(() => store.date, () => store.fetch())
</script>