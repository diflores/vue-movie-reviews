<template>
  <div id="profile-container" v-if="isLoggedIn" >
  </div>
</template>
<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  },
};
</script>
<style>
#profile-container {
  height: 100%;
  width: 100%;
  color: var(--grey);
  padding: 2em;
}
</style>