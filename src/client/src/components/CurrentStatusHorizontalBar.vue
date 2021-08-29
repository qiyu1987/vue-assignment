<template>
  <div class="current-status-horizontal-bar">
    <h2 class="title">{{ title }}</h2>
    <b-progress :max="max" height="3rem">
      <b-progress-bar :value="value">
        <span class="bar-label">
          {{ label }}
        </span>
      </b-progress-bar>
    </b-progress>
  </div>
</template>

<script>
export default {
  name: "CurrentStatusHorizontalBar",
  props: {
    title: String,
    max: Number,
    value: Number,
    unit: String,
  },
  computed: {
    label() {
      return `${this.value?.toFixed(0)} ${this.unit}`;
    },
  },
};
</script>

<style lang="scss">
.current-status-horizontal-bar {
  margin-bottom: 1rem;
}
.title {
  text-align: left;
  margin-bottom: 1rem;
}
.bar-label {
  font-size: 20px;
}
</style>
