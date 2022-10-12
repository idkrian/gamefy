<template>
  <div id="navContainer">
    <h1>Gamefy</h1>
    <div id="inputDiv">
      <input type="text" id="textInput" />
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
        entrar
      </h4>
      <h4 id="signTitle">registrar</h4>
    </div>
    <i style="color: #05df06" class="fa-solid fa-cart-shopping"></i>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
#textInput {
  background-color: white;
  border: none;
  height: 20px;
  width: 300px;
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