<template>
  <div id="navContainer">
    <router-link style="text-decoration: none; color: inherit; cursor: pointer" to="/">
      <h1>Gamefy</h1>
    </router-link>
    <div id="inputDiv">
      <input type="text" id="textInput" v-model="searchGame" @keyup="getGames()" tabindex="0" />
      <div v-if="openSearch" id="searchDiv">
        <div v-for="data in gameData" :key="data.id" style="display: flex; align-items: center; cursor: pointer">
          <router-link style="all: inherit" :to="{
            name: 'game',
            params: { id: data.id },
          }" @click="handleFocusOut">
            <img id="searchImg" :src="data.background_image" alt="" />
            <h4 style="margin-left: 2em">
              {{ data.name }}
            </h4>
          </router-link>
        </div>
      </div>
      <button id="searchButton">
        <i id="icon" style="color: black" class="fa-solid fa-magnifying-glass fa-lg"></i>
      </button>
    </div>
    <div id="signDiv">
      <h4 style="background-color: #05df06; color: black" id="signTitle">
        Entrar
      </h4>
      <button class="btn btn--primary mx-auto" @click="$refs.modalName.openModal()">Open modal</button>

      <modal ref="modalName">
        <template v-slot:header>
          <h1>Modal title</h1>
        </template>

        <template v-slot:body>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Nunc sed velit dignissim sodales ut eu sem integer vitae. Id aliquet lectus proin nibh
            nisl condimentum. Fringilla urna porttitor rhoncus dolor purus. Nam aliquam sem et tortor. Nisl vel pretium
            lectus quam id. Cras pulvinar mattis nunc sed. Quis ipsum suspendisse ultrices gravida dictum fusce ut
            placerat orci. Tristique magna sit amet purus. Fermentum et sollicitudin ac orci phasellus egestas tellus.
            Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Felis eget nunc lobortis mattis aliquam
            faucibus. Tincidunt eget nullam non nisi est sit amet facilisis. Mi in nulla posuere sollicitudin aliquam
            ultrices sagittis orci. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Eget nunc scelerisque
            viverra mauris in aliquam sem fringilla ut. Nec nam aliquam sem et tortor consequat id. Commodo nulla
            facilisi nullam vehicula ipsum a. Elementum tempus egestas sed sed. Faucibus purus in massa tempor nec
            feugiat nisl pretium fusce.</p>
          <p>Arcu cursus vitae congue mauris rhoncus aenean. Tempor id eu nisl nunc mi. Pharetra diam sit amet nisl
            suscipit adipiscing bibendum. Ut faucibus pulvinar elementum integer enim. Odio facilisis mauris sit amet
            massa vitae tortor condimentum lacinia. Eu non diam phasellus vestibulum lorem sed risus. Porttitor rhoncus
            dolor purus non enim praesent. Sit amet mauris commodo quis imperdiet. Lobortis feugiat vivamus at augue
            eget. Nibh tellus molestie nunc non blandit. Tellus mauris a diam maecenas sed enim ut. Tortor aliquam nulla
            facilisi cras fermentum odio eu feugiat pretium. Mattis aliquam faucibus purus in massa.</p>
        </template>

        <template v-slot:footer>
          <div class="d-flex align-items-center justify-content-between">
            <button class="btn btn--secondary" @click="$refs.modalName.closeModal()">Cancel</button>
            <button class="btn btn--primary" @click="$refs.modalName.closeModal()">Save</button>
          </div>
        </template>
      </modal>
      <h4 id="signTitle">Registrar</h4>
      <i id="cartIcon" class="fa-solid fa-cart-shopping"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Modal from './Modal.vue'

export default {
  name: "Navbar",
  components: {
    Modal
  },
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

<style lang="scss" scoped>
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

.btn {
  padding: 8px 16px;
  border-radius: 5px;

  &--primary {
    background-color: green;
    color: #fff;
  }

  &--secondary {
    background-color: #dddd;
    color: #000;
  }
}

// utilities
.overflow-hidden {
  overflow: hidden;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.justify-content-between {
  justify-content: space-between;
}

// reset
button {
  background: none;
  border: none;
  outline: inherit;
  cursor: pointer;
}
</style>