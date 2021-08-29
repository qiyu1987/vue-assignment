<template>
  <GmapMap
    :center="center"
    :zoom="14"
    map-type-id="terrain"
    style="width: 300px; height: 300px"
  >
    <GmapMarker :position="center" />
  </GmapMap>
</template>

<script>
export default {
  name: "Map",
  props: {
    gps: Array,
  },
  computed: {
    center() {
      return this.gps && { lat: this.gps[0], lng: this.gps[1] };
    },
  },
};
</script>

<style scoped lang="scss"></style>
