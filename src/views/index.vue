<template>
  <div class="title">
    <h1>CU Boulder Department of Geography Research</h1>
  </div>
  <h2> Click on the location point to view detailed information </h2>
  <olMap />
</template>

<script setup lang="ts">
  import olMap from '/@/views/map-view/index.vue';
</script>

<style lang="less" scoped>
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  h1 {
    position: absolute;
    display: flex;
    justify-content: center;
    top: 0.5em;
    font-size: 1.8em;
    font-family: Lora, serif;
    color: #cb914b;
    letter-spacing: 0.04em;
    padding: 10px 15px;
    background: rgb(233 236 220 / 60%);
    border: 1px solid #0d5310;
    border-radius: 3px;
    z-index: 800;
  }

  h2 {
    position: absolute;
    bottom: 1.5em;
    right: 1em;
    width: 12em;
    font-family: Lora, serif;
    letter-spacing: 0.04em;
    color: #4b89cbbc;
    font-size: 1em;
    line-height: 1.2em;
    z-index: 800;
  }
</style>
