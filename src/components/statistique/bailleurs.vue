<template>
    <div>
      <highcharts :options="chartOptions"></highcharts>
    </div>
  </template>
  
  <script>
  import Highcharts from 'highcharts';
  import HighchartsVue from 'highcharts-vue';
  
  export default {
    props: {
      bailleurs: {
        type: Array,
        required: true
      }
    },
    components: {
      highcharts: HighchartsVue.component
    },
    data() {
      return {
        chartOptions: {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
          },
          title: {
            text: null // Pas de titre
          },
          tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
          },
          accessibility: {
            point: {
              valueSuffix: '%'
            }
          },
          plotOptions: {
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                formatter: function () {
                  // Ajoute des espaces entre les chiffres
                  const formattedValue = Highcharts.numberFormat(this.y, 0, '.', ' ');
                  return `${this.point.name}: ${formattedValue} GNF`;
                },
                distance: 30, // Distance des étiquettes par rapport aux segments
                connectorWidth: 1, // Largeur de la ligne de connexion
                connectorColor: '#000' // Couleur de la ligne de connexion
              },
              showInLegend: true
            }
          },
          series: [{
            name: 'Budget',
            colorByPoint: true,
            data: this.getBudgetData()
          }]
        }
      };
    },
    methods: {
      getBudgetData() {
        const totalBudget = this.bailleurs.reduce((sum, bailleur) => sum + parseFloat(bailleur.Budget), 0);
        return this.bailleurs.map(bailleur => ({
          name: bailleur.CodeBailleur, // Nom du bailleur
          y: parseFloat(bailleur.Budget) // Budget
        }));
      },
      updateChartData() {
        this.chartOptions.series[0].data = this.getBudgetData();
      }
    },
    watch: {
      bailleurs: 'updateChartData'
    },
    mounted() {
      this.updateChartData();
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez vos styles ici */
  </style>
  