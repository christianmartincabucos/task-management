<template>
	<header class="relative flex items-center justify-between px-8 py-4 border-b border-gray-200">
	            <div class="flex items-center gap-6">
	                <div class="w-8 h-8 bg-black rounded flex items-center justify-center text-white">TM</div>
	            </div>
	
	            <!-- Centered Search Input -->
	            <div class="absolute left-1/2 transform -translate-x-1/2 header-search flex justify-center items-center w-96 border rounded-full px-4 py-2 text-gray-400">
	                <LucideSearch class="w-4 h-4" />
	                <input v-model="store.search" placeholder="Search" class="ml-3 bg-transparent outline-none w-full" @input="onSearch" />
	            </div>
	
	            <div class="w-8 h-8 bg-gray-200 rounded-full"></div>
	        </header>
</template>

<script setup lang="ts">
defineProps<{
	onSearch: () => void;
	store: import("/Users/christianmartincabucos/Documents/go-team-task-app/task-management/frontend/node_modules/pinia/dist/pinia").Store<"tasks", Pick<{ tasks: globalThis.Ref<{ id: number; statement: string; is_done: boolean; date: string; priority?: number | undefined; order?: number | undefined; }[], import("/Users/christianmartincabucos/Documents/go-team-task-app/task-management/frontend/app/types/task").Task[] | { id: number; statement: string; is_done: boolean; date: string; priority?: number | undefined; order?: number | undefined; }[]>; date: globalThis.Ref<string, string>; search: globalThis.Ref<string, string>; fetch: () => Promise<void>; add: (statement: string) => Promise<void>; toggle: (t: import("/Users/christianmartincabucos/Documents/go-team-task-app/task-management/frontend/app/types/task").Task) => Promise<void>; remove: (id: number) => Promise<void>; updateStatement: (id: number, statement: string) => Promise<void>; saveOrder: () => Promise<void>; }, "tasks" | "date" | "search">, Pick<{ tasks: globalThis.Ref<{ id: number; statement: string; is_done: boolean; date: string; priority?: number | undefined; order?: number | undefined; }[], import("/Users/christianmartincabucos/Documents/go-team-task-app/task-management/frontend/app/types/task").Task[] | { id: number; statement: string; is_done: boolean; date: string; priority?: number | undefined; order?: number | undefined; }[]>; date: globalThis.Ref<string, string>; search: globalThis.Ref<string, string>; fetch: () => Promise<void>; add: (statement: string) => Promise<void>; toggle: (t: import("/Users/christianmartincabucos/Documents/go-team-task-app/task-management/frontend/app/types/task").Task) => Promise<void>; remove: (id: number) => Promise<void>; updateStatement: (id: number, statement: string) => Promise<void>; saveOrder: () => Promise<void>; }, never>, Pick<{ tasks: globalThis.Ref<{ id: number; statement: string; is_done: boolean; date: string; priority?: number | undefined; order?: number | undefined; }[], import("/Users/christianmartincabucos/Documents/go-team-task-app/task-management/frontend/app/types/task").Task[] | { id: number; statement: string; is_done: boolean; date: string; priority?: number | undefined; order?: number | undefined; }[]>; date: globalThis.Ref<string, string>; search: globalThis.Ref<string, string>; fetch: () => Promise<void>; add: (statement: string) => Promise<void>; toggle: (t: import("/Users/christianmartincabucos/Documents/go-team-task-app/task-management/frontend/app/types/task").Task) => Promise<void>; remove: (id: number) => Promise<void>; updateStatement: (id: number, statement: string) => Promise<void>; saveOrder: () => Promise<void>; }, "fetch" | "add" | "toggle" | "remove" | "updateStatement" | "saveOrder">>;
}>()
</script>
