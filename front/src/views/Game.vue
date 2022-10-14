<template>
  <h1>{{ id }}</h1>
</template>

<script>
export default {
  name: "Game",
  props: {
    id: Number,
  },
  data() {
    return {};
  },
  methods: {
    async get() {},
  },
  mounted() {
    this.get();
  },
};
</script>

<style>
</style>