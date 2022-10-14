<template>
  <Poster />
  <container id="containerDiv">
    <div id="gameDiv" :key="data.id" v-for="data in datas">
      <div>
        <h3>{{ data.name }}</h3>
      </div>
      <img id="bgImg" :src="data.background_image" alt="" />
    </div>
  </container>
</template>

<script>
import axios from "axios";
import Poster from "./Poster.vue";
export default {
  name: "GameCard",
  components: {
    axios,
    Poster,
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

#containerDiv {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
}

#bgImg {
  height: 300px;
  width: 200px;
  object-fit: cover;
}
</style>