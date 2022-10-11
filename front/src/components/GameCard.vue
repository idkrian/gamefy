<template>
  <container id="container">
    <div id="gameDiv" :key="data.id" v-for="data in datas">
      <h2>{{ data.name }}</h2>
      <img id="bgImg" :src="data.background_image" alt="" />
    </div>
  </container>
</template>

<script>
import axios from "axios";

export default {
  name: "GameCard",
  components: {
    axios,
  },
  data() {
    return {
      gamecards: null,
      datas: null,
      names: null,
      background_images: null,
    };
  },
  methods: {
    async getData() {
      const key = import.meta.env.VITE_API_KEY;
      await axios
        .get(`https://api.rawg.io/api/games?key=${key}`)
        .then(
          (res) => (this.datas = JSON.parse(JSON.stringify(res.data.results)))
        );
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
#gameDiv {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1.5em;
}

#container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

#bgImg {
  height: 400px;
  width: 300px;
  object-fit: cover;
}
</style>