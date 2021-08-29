<template>
  <div class="value-time-chart">
    <LineChart
      v-if="data.length > 0"
      class="line-chart"
      :chart-data="chartData"
      :options="options"
    />
  </div>
</template>

<script>
import LineChart from "./LineChart";

export default {
  name: "ValueTimeChart",
  components: { LineChart },
  props: {
    title: String,
    yLabel: String,
    data: Array,
  },
  computed: {
    chartData() {
      return {
        datasets: [
          {
            data: this.data,
            borderColor: "#3e95cd",
            fill: false,
          },
        ],
      };
    },
    options() {
      return {
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                unit: "minute",
              },
              scaleLabel: {
                display: true,
                labelString: "Time",
                fontSize: 24,
              },
            },
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: this.yLabel,
                fontSize: 24,
              },
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        title: {
          display: true,
          text: this.title,
          fontSize: 24,
        },
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
      };
    },
  },
};
</script>
<style lang="scss">
.value-time-chart {
  height: 30rem;
}
</style>
