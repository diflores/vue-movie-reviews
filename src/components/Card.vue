<template>
  <v-card class="mx-auto" max-width="350">
    <v-img
      :src="cardImage"
      height="180px"
      contain
    ></v-img>
    <v-card-title id="card-title">
      {{ cardTitle }}
    </v-card-title>
    <v-card-subtitle id="card-subtitle">
      {{ cardSubtitle }}
    </v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  props : {
    cardTitle: {
      type: String,
      required: true
    },
    cardSubtitle: {
      type: String,
    },
    cardImage: {
      type: String,
    },
  },
};
</script>
<style>
#card-title {
  color: var(--grey);
  font-weight: 400;
}
#card-subtitle {
  color: var(--grey);
  font-weight: 300;
}
</style>