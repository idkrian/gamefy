<template>
  <div>
    <Navbar />
    <Poster />
    <GameCard />
  </div>
</template>

<script>
import GameCard from "./components/GameCard.vue";
import Navbar from "./components/Navbar.vue";
import Poster from "./components/Poster.vue";

export default {
  name: "App",
  components: {
    GameCard,
    Navbar,
    Poster,
  },
  data() {
    return {
      texto: null,
    };
  },
};
</script>

<style scoped>
</style>
