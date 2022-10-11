<template>
  <div>
    <img :src="poster" id="poster" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Poster",
  data() {
    return {
      poster: null,
    };
  },
  methods: {
    async getPoster() {
      const key = import.meta.env.VITE_API_KEY;
      await axios
        .get(`https://api.rawg.io/api/games/4286?key=${key}`)
        .then(
          (res) =>
            (this.poster = JSON.parse(
              JSON.stringify(res.data.background_image)
            ))
        );
    },
  },
  mounted() {
    this.getPoster();
  },
};
</script>
<style>
#poster {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>