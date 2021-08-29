<template>
  <div id="app">
    <div class="general-info-container">
      <Map v-if="gps" class="map" :gps="gps" />
      <div class="general-info-data">
        <CurrentStatusHorizontalBar
          title="Current Speed"
          :value="speed"
          :max="130"
          unit="km/h"
        />

        <CurrentStatusHorizontalBar
          title="State of Charge"
          :value="soc"
          :max="100"
          unit="%"
        />

        <div class="current-status-number-group">
          <CurrentStatusNumber title="Energy" :value="energy" unit="kW" />
          <CurrentStatusNumber title="Odometer" :value="odo" unit="km" />
        </div>
      </div>
    </div>

    <div class="charts-container">
      <ValueTimeChart
        title="Speed Profile"
        y-label="Speed (km/h)"
        :data="speedTimeData"
      />
      <ValueTimeChart
        title="State of Charge Profile"
        y-label="SoC (km/h)"
        :data="socTimeData"
      />
    </div>
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import CurrentStatusHorizontalBar from "./components/CurrentStatusHorizontalBar";
import CurrentStatusNumber from "./components/CurrentStatusNumber";
import ValueTimeChart from "./components/ValueTimeChart";

export default {
  name: "App",
  components: {
    Map,
    CurrentStatusHorizontalBar,
    CurrentStatusNumber,
    ValueTimeChart,
  },
  data() {
    return {
      connection: null,
      dataArray: [],
      currentData: null,
    };
  },
  computed: {
    gps() {
      return this.currentData?.gps;
    },
    speed() {
      return this.currentData?.speed;
    },
    soc() {
      return this.currentData?.soc;
    },
    energy() {
      return this.currentData?.energy;
    },
    odo() {
      return this.currentData?.odo;
    },
    speedTimeData() {
      return this.dataArray.map((data) => ({
        t: data?.time,
        y: data?.speed,
      }));
    },
    socTimeData() {
      return this.dataArray.map((data) => ({
        t: data?.time,
        y: data?.soc,
      }));
    },
  },
  created() {
    this.connection = new WebSocket("ws://localhost:3000/");

    this.connection.onopen = () => {
      console.log("connected to websocket");
    };

    this.connection.onmessage = (event) => {
      this.currentData = formatData(JSON.parse(event.data));
      this.dataArray.push(this.currentData);

      function formatData(data) {
        if (!data) return;
        let { time, speed, soc, energy, odo, gps } = data;
        time = Number(time);
        speed = Number(speed);
        soc = Number(soc);
        energy = Number(energy);
        odo = Number(odo);
        gps = gps.split("|").map((e) => Number(e));
        return { time, speed, soc, energy, odo, gps };
      }
    };

    this.connection.onerror = (error) => {
      console.log(`WebSocket error: ${error}`);
    };
  },
  watch: {
    currentData(value) {
      if (this.dataArray.length > 0 && value.time < this.dataArray[0].time) {
        this.dataArray = [];
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.general-info-container {
  display: flex;

  .map {
    margin-left: 5rem;
  }
  .general-info-data {
    margin-left: 5rem;
    padding-right: 3rem;
    flex: 1;
  }
}

.current-status-number-group {
  display: flex;
}

@media screen and (max-width: 1024px) {
  .general-info-container {
    .map,
    .general-info-data {
      margin-left: 3rem;
    }
  }
}

@media screen and (max-width: 600px) {
  .general-info-container {
    flex-direction: column;
    .map,
    .general-info-data {
      margin-left: 2rem;
    }
  }
}
</style>
