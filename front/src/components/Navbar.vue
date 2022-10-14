<template>
  <div id="navContainer">
    <router-link
      style="text-decoration: none; color: inherit; cursor: pointer"
      to="/"
    >
      <h1>Gamefy</h1>
    </router-link>
    <div id="inputDiv">
      <input
        type="text"
        id="textInput"
        v-model="searchGame"
        @keyup="getGames()"
        tabindex="0"
      />
      <div v-if="openSearch" id="searchDiv">
        <div
          v-for="data in gameData"
          :key="data.id"
          style="display: flex; align-items: center; cursor: pointer"
        >
          <router-link
            style="all: inherit"
            :to="{
              name: 'game',
              params: { id: data.id },
            }"
            @click="handleFocusOut"
          >
            <img id="searchImg" :src="data.background_image" alt="" />
            <h4 style="margin-left: 2em">
              {{ data.name }}
            </h4>
          </router-link>
        </div>
      </div>
      <button id="searchButton">
        <i
          id="icon"
          style="color: black"
          class="fa-solid fa-magnifying-glass fa-lg"
        ></i>
      </button>
    </div>
    <div id="signDiv">
      <h4 style="background-color: #05df06; color: black" id="signTitle">
        Entrar
      </h4>
      <h4 id="signTitle">Registrar</h4>
      <i id="cartIcon" class="fa-solid fa-cart-shopping"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      openSearch: false,
      searchGame: "",
      gameData: null,
    };
  },
  methods: {
    handleFocus() {
      this.openSearch = true;
    },
    handleFocusOut() {
      this.openSearch = false;
    },
    async getGames() {
      const key = import.meta.env.VITE_API_KEY;
      if (this.searchGame.length >= 2) {
        await axios
          .get(
            `https://api.rawg.io/api/games?key=${key}&search=${this.searchGame}`
          )
          .then((res) => (this.gameData = res.data.results))
          .then((this.openSearch = true));
      }
    },
  },
  mounted() {
    this.getGames();
  },
};
</script>

<style>
#searchImg {
  height: 100px;
  width: 80px;
  object-fit: cover;
}
#searchDiv {
  margin-top: 2em;
  display: flex;
  background-color: black;
  position: absolute;
  height: 20em;
  overflow-y: scroll;
  flex-direction: column;
}
#cartIcon {
  color: #05df06;
  align-items: center;
  display: flex;
  margin-left: 3em;
}
#signTitle {
  cursor: pointer;
}
#inputDiv {
  display: flex;
  width: 40%;
}
#textInput {
  background-color: white;
  border: none;
  height: 20px;
  width: 85%;
  color: black;
  padding: 5px;
  outline: none;
}
#signTitle {
  display: flex;
  justify-content: center;
  margin: 0.5em;
  width: 4em;
  padding: 0.1em;
}
#searchButton {
  height: 30px;
  width: 30px;
  background-color: #05df06;
  border: none;
  cursor: pointer;
}
#signDiv {
  display: flex;
}
#navContainer {
  display: flex;
  height: 4em;
  align-items: center;
  justify-content: space-evenly;
  background-color: black;
}
</style>