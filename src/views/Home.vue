<template>
  <div id="home-container">
    <h1 id="site-name">Movie Reviews</h1>
    <h2 id="site-slogan">Don’t waste your time with horrible movies, check our site first!</h2>
    <SearchBar />
  </div>
</template>
<script>
import SearchBar from "../components/SearchBar";
export default {
  components: {
    SearchBar
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Atma&family=Bangers&display=swap");
#home-container {
  background-color: #714dd2;
  height: 100%;
  width: 100%;
  position: absolute;
}
#site-name {
  font-family: "Bangers";
  font-size: 80pt;
  color: #ffffff;
  text-align: center;
  padding-top: 1em;
}
#site-slogan {
  font-family: "Atma";
  font-size: 20pt;
  color: #ffffff;
  text-align: center;
}
</style>