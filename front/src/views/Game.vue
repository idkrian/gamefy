<template>
  <section id="detailContainer">
    <div v-if="gameData != null">
      <div>

        <div>
          <img id="img" :src="gameData.background_image">
        </div>
        <div id="gameTitle">
          <h1>{{gameData.name}}</h1>
        </div>

        <div id="descriptionDiv">

          <div id="resumeDiv">
            <h2>Descrição</h2>
            <h4>{{gameData.description_raw}}</h4>

          </div>

          <div>
            <div id="gamePrintsSection">
              <div id="gamePrintsDiv" v-for="img in gameImages">
                <img id="gamePrints" :src="img.image" alt="">
              </div>
            </div>
            <!-- <section>
              <div v-for="devs in gameData.developers">
                {{devs.name}}
              </div>
            </section> -->
          </div>
        </div>

      </div>

    </div>
  </section>

</template>

<script>
import axios from "axios";
export default {
  name: "Game",
  props: {
    id: String,
  },
  data() {
    return {
      gameData: null,
      gameImages: []
    };
  },
  methods: {
    async getGame() {
      const key = import.meta.env.VITE_API_KEY;
      await axios
        .get(`https://api.rawg.io/api/games/${this.id}?key=${key}`)
        .then(res => this.gameData = res.data)

      await axios
        .get(`https://api.rawg.io/api/games/${this.id}/screenshots?key=${key}&page_size=4`)
        .then(res => this.gameImages = res.data.results)


      console.log(this.gameData)
    },
  },
  mounted() {
    this.getGame();
  },
};
</script>

<style>
#gameTitle {
  display: flex;
  position: relative;
  top: -25em;
  justify-content: center;
}

#resumeDiv {
  min-width: 20em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

#descriptionDiv {
  position: relative;
  top: -20em;
  display: flex;
  justify-content: center;
  margin: 0 20em;
}

#gamePrintsSection {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#gamePrintsDiv {
  margin: 1em;
}

#gamePrints {
  width: 250px;
  height: 150px;

}

#detailContainer {
  display: flex;
}

#img {
  height: 1200px;
  width: 100%;
  object-fit: cover;
  -webkit-mask-image: -webkit-gradient(linear, left top, left bottom,
      from(rgba(0, 0, 0, 1)), to(rgba(0, 0, 0, 0)));
}
</style>