<template>
    <div>
      <highcharts :options="chartOptions" :height="200"></highcharts>
    </div>
  </template>
  
  <script>
  import { Chart } from 'highcharts-vue'
  import Highcharts from 'highcharts'
  import highchartsMore from 'highcharts/highcharts-more'
  import solidGauge from 'highcharts/modules/solid-gauge'
  
  highchartsMore(Highcharts)
  solidGauge(Highcharts)
  
  export default {
    components: {
      highcharts: Chart
    },
    data() {
      return {
        chartOptions: {
          chart: {
            type: 'solidgauge',
// Ajustez les espacements selon vos besoins
          },
          title: {
            text: 'Solid Gauge Example'
          },
          pane: {
            center: ['50%', '45%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
              backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
              innerRadius: '60%',
              outerRadius: '100%',
              shape: 'arc'
            }
          },
          yAxis: {
            min: 0,
            max: 100,
            stops: [
              [0.3, '#DF5353'], // red
              [0.7, '#DDDF0D'], // yellow
              [1.0, '#55BF3B']  // green
            ],
            lineWidth: 0,
            tickWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
              y: -70
            },
            labels: {
              y: 16
            }
          },
          series: [{
            name: 'Taux',
            data: [10], // exemple de valeur
            dataLabels: {
              format: '<div style="text-align:center"><span style="font-size:15px">{y}%</span><br/></div>'
            },
            tooltip: {
              valueSuffix: ' %'
            }
          }]
        }
      }
    }
  }
  </script>
  <style scoped lang="css">
  .highcharts-container , rect.highcharts-plot-border , rect.highcharts-background , rect.highcharts-plot-background{
    height: 200px !important;
    width: 100% !important;
  }
  .highcharts-container{
    height: 200px !important;
    width: 100% !important;
  }
  #highcharts-m20rfxt-99{
    height: 200px !important;


  }
  
  </style>
  