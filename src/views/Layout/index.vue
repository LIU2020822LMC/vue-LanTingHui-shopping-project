<script setup lang="ts">
import { RouterView } from 'vue-router';
import LayoutNav from './components/LayoutNav.vue';
import LayoutHeader from './components/LayoutHeader.vue';
import LayoutFooter from './components/LayoutFooter.vue';
import LayoutFixed from './components/LayoutFixed.vue';
import { onMounted } from 'vue';
import { useCategoryStore } from '@/stores/categoryStore'

const getCategory = useCategoryStore()

onMounted(() => {
    getCategory.getCategory()
})

</script>

<template>
    <LayoutFixed />
    <LayoutNav />
    <LayoutHeader />
    <RouterView />
    <LayoutFooter />
</template>
