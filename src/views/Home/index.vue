<script setup lang="ts">
import HomeBanner from './components/HomeBanner.vue';
import HomeCategory from './components/HomeCategory.vue';
import HomeHot from './components/HomeHot.vue';
import HomeNew from './components/HomeNew.vue';
import HomeProduct from './components/HomeProduct.vue';
import HomePanel from './components/HomePanel.vue';


</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />

  <HomePanel title="LMC" sub-title="lmc">
    <HomeNew />
  </HomePanel>
  <HomePanel title="WHS" sub-title="whs">
    <HomeProduct />
  </HomePanel>
</template>

<style >


</style>