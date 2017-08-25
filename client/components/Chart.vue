<template>
  <div id="container" style="height: 400px; min-width: 310px" />
</template>

<script>
import Highcharts from 'highcharts/highstock';

require('highcharts/modules/no-data-to-display')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);
require('highcharts/modules/exporting')(Highcharts);

export default {
  data() {
    return {
      chart: null,
      options: {
        title: { text: 'Stock Chart' },
        tooltip: {
          formatter() {
            let s = '';
            this.points.sort((a, b) => {
              if (a.y < b.y) return 1;
              if (a.y > b.y) return -1;
              return 0;
            });
            for (let i = 0; i < this.points.length; i++) { // eslint-disable-line
              s += `<span style="color:${this.points[i].series.color}">\u25CF</span> ${this.points[i].series.name}: <b>${this.points[i].y}</b><br/>`;
            }
            return s;
          },
        },
      },
    };
  },
  mounted() {
    this.drawBoard();
  },
  watch: {
    data() {
      this.drawBoard();
    },
  },
  methods: {
    drawBoard() {
      this.chart = Highcharts.stockChart('container', Object.assign({ series: this.data }, this.options));
    },
  },
  computed: {
    data() {
      return this.$store.state.data;
    },
  },
};
</script>
