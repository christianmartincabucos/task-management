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
	import { useTaskStore } from '~/stores/useTaskStore'
	import { LucideSearch } from 'lucide-vue-next'

	const store = useTaskStore()

	let debounceTimer: any
	function onSearch() {
		clearTimeout(debounceTimer)
		debounceTimer = setTimeout(() => store.fetch(), 250)
	}
</script>