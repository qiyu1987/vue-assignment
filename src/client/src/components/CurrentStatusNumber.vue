<template>
  <div class="current-status-number">
    <h2>{{ title }}</h2>
    <span>{{ `${value} ${unit}` }}</span>
  </div>
</template>

<script>
export default {
  name: "CurrentStatusNumber",
  props: {
    title: String,
    value: Number,
    unit: String,
  },
};
</script>

<style lang="scss">
.current-status-number {
  &:not(:last-child) {
    margin-right: 5rem;
  }
}
</style>
