<template>
        <div class="w-full max-w-3xl mx-auto">
            <div class="text-2xl text-center font-bold mb-6">What do you have in mind?</div>
        <div class="flex items-center">
            <textarea v-model="text" placeholder="Write the task you plan to do today here..." class="flex-1 border rounded-2xl p-5 h-28 resize-none"></textarea>
            <button @click="submit" class="ml-4 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center">↑</button>
        </div>
    </div>
</template>
    
    
<script setup lang="ts">
    import { ref } from 'vue'
    import { useTaskStore } from '~/stores/useTaskStore'
    const store = useTaskStore()
    const text = ref('')


    async function submit(){
    if(!text.value.trim()) return
    await store.add(text.value.trim())
    text.value = ''
    // fetch to keep order consistent
    await store.fetch()
    }
</script>


<style scoped></style>