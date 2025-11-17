<template>
    <aside class="fixed w-80 left-0 h-[calc(100%-80px)] border-r border-gray-200 px-4 py-6 bg-white lg:w-64 md:w-40 sm:w-32">
        <!-- Today Section -->
        <div class="mb-5">
            <div
                class="rounded-full w-full px-4 py-2 inline-block text-sm sm:text-xs cursor-pointer"
                :class="{ 'bg-black text-white': store.date === today, 'hover:text-black': store.date !== today }"
                @click="selectDate(today)"
            >
                Today
            </div>
        </div>

        <!-- Recent Days -->
        <div class="space-y-1 text-sm sm:text-xs">
            <div
                class="cursor-pointer rounded-full px-4 py-2"
                :class="{ 'bg-black text-white': store.date === yesterday, 'hover:text-black': store.date !== yesterday }"
                @click="selectDate(yesterday)"
            >
                Yesterday
            </div>
            <div
                v-for="(date, index) in recentDays"
                :key="index"
                class="cursor-pointer rounded-full px-4 py-2"
                :class="{ 'bg-black text-white': store.date === date.value, 'hover:text-black': store.date !== date.value }"
                @click="selectDate(date.value)"
            >
                {{ date.label }}
            </div>
        </div>

        <!-- Last Week Section -->
        <div class="mt-3 text-xs">Last week</div>
        <div class="mt-2 space-y-2 text-sm sm:text-xs">
            <div
                v-for="(date, index) in lastWeek"
                :key="index"
                class="cursor-pointer rounded-full px-4 py-2"
                :class="{ 'bg-black text-white': store.date === date.value, 'hover:text-black': store.date !== date.value }"
                @click="selectDate(date.value)"
            >
                {{ date.label }}
            </div>
        </div>

        <!-- 3rd Week Section -->
        <div class="mt-3 text-xs">3rd Week of {{ currentMonth }}</div>
        <div class="mt-2 space-y-2 text-sm sm:text-xs">
            <div
                v-for="(date, index) in thirdWeek"
                :key="index"
                class="cursor-pointer rounded-full px-4 py-2"
                :class="{ 'bg-black text-white': store.date === date.value, 'hover:text-black': store.date !== date.value }"
                @click="selectDate(date.value)"
            >
                {{ date.label }}
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '~/stores/useTaskStore'

// Access the task store
const store = useTaskStore()
console.log('DateSidebar store date:', store.date)

// Helper dates
const today: string = new Date().toISOString().split('T')[0]
const yesterday: string = new Date(Date.now() - 86400000).toISOString().split('T')[0]

// Generate dynamic dates for the current month
const currentMonth = new Date().toLocaleString('default', { month: 'long' })
const currentYear = new Date().getFullYear()

// Utility function to format dates
function formatDate(date: Date): string {
    return date.toISOString().split('T')[0]
}

function formatLabel(date: Date): string {
    return date.toLocaleDateString('default', { weekday: 'long', month: 'long', day: 'numeric' })
}

// Generate recent days (last 7 days)
const recentDays = computed(() => {
    const days = []
    for (let i = 2; i <= 7; i++) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        days.push({ value: formatDate(date), label: formatLabel(date) })
    }
    return days
})

// Generate last week dates
const lastWeek = computed(() => {
    const days = []
    const today = new Date()
    for (let i = 1; i <= 7; i++) {
        const date = new Date(today)
        date.setDate(today.getDate() - (7 + i))
        days.push({ value: formatDate(date), label: formatLabel(date) })
    }
    return days
})

// Generate 3rd week of the current month
const thirdWeek = computed(() => {
    const days = []
    const startOfMonth = new Date(currentYear, new Date().getMonth(), 1)
    const thirdWeekStart = new Date(startOfMonth)
    thirdWeekStart.setDate(15) // Start from the 15th of the month
    for (let i = 0; i < 7; i++) {
        const date = new Date(thirdWeekStart)
        date.setDate(thirdWeekStart.getDate() + i)
        days.push({ value: formatDate(date), label: formatLabel(date) })
    }
    return days
})

// Function to select a date and refresh tasks
const selectDate = (date: string) => {
    store.date = date // Update the selected date in the store
    store.fetch() // Fetch tasks for the selected date
}
</script>

<style scoped></style>