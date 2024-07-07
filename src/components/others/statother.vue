<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
    <BRow>
      <BCol md="6" v-for="(statistics, index) in allStatistics" :key="index">
        <BCard class="card z-index-2">
          <div class="card-titre">
            <h6 class="mb-0 text-center">Statistiques par zone industrielle</h6>
            <ul class="list-unstyled hstack gap-1 mb-0 justify-content-end !important;">
              <li data-bs-toggle="tooltip" data-bs-placement="top" aria-label="View">
                <div  >
                  <div class="dropdowns" @click="switchChartType('camembert', 1, index)">
                  <div class="dropdown-toggles btn btn-sm btn-soft-primary" >
                    <i class="mdi mdi-dots-vertical"></i>
                  </div>
                  <!-- <ul class="dropdownss-menuss" v-show="isDropdownOpen[index]"  @click="toggleDropdown(index)">
                    <li @click="switchChartType('histogramme', 0, index)">Histogramme</li>
                    <li @click="switchChartType('camembert', 1 , index)">Camembert</li>
                    <li @click="switchChartType('courbe' , 2 ,index)">Courbe</li>
                  </ul> -->
                </div>
                </div>
                
              </li>
            </ul>
            <hr class="dark horizontal">
          </div>
          <div v-if="chartType === 'histogramme'" >
            <input type="hidden" name="" :value="loadChartData(statistics, index)">
            <highcharts v-for="(chartOption, chartIndex) in chartOptions" :key="chartIndex" :options="chartOption"></highcharts>
            <!-- Ajoutez ici les boutons spécifiques à l'histogramme -->
          </div>
          <div v-else-if="chartType === 'camembert'">
            <input type="hidden" name="" :value="loadChartData(statistics, index)">
            <highcharts v-for="(camembertOption, chartIndex) in camembertOptions" :key="chartIndex" :options="camembertOption"></highcharts>
            <!-- Ajoutez ici les boutons spécifiques au camembert -->
          </div>
        </BCard>
      </BCol>
    </BRow>
  </div>
</template>

<script>
import axios from '@/lib/axiosConfig';
import { Chart } from 'highcharts-vue';
import Loading from '@/components/others/loading.vue';


export default {
  components: {
    highcharts: Chart,
    Loading
  },
  computed: {
    loggedInUser() {
      return this.$store.getters['auth/myAuthenticatedUser'];
    },
  },
  data() {
    return {
      loading: true,
      IndicateursOptions:[],
      currentIndex:'',
      allStatistics:[],
      isDropdownOpen: [],
      chartType: 'histogramme', // Par défaut, afficher l'histogramme
      chartOptions: [],
      camembertOptions: []
    };
  },

  async mounted() {
    await this.fetchIndicateursOptions();
    await this.fetchStatistics();
    
  },
  methods: {
    removeDropdownElement() {
      const container = this.$refs.container;
      if (container) {
        const dropdownElement = container.querySelector('.dropdownss-menuss');
        if (dropdownElement) {
          dropdownElement.remove();
        }
      }
    },
    async fetchStatistics() {
      try {
        // Récupérer les IDs des 6 derniers indicateurs
        const lastIndicateurIds = this.IndicateursOptions.slice(0, 6).map(indicateur => indicateur.value);

        // Initialiser un tableau pour stocker les statistiques de chaque indicateur
        const statisticsPromises = lastIndicateurIds.map(async indicateurId => {
          const response = await axios.get(`/indicateurs/statistics/${indicateurId}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          return response.data.data;
        });

         this.allStatistics = await Promise.all(statisticsPromises);
        console.log('allStatistics',this.allStatistics);
     
        const newStatisticsCount = this.allStatistics.length - this.isDropdownOpen.length;
        console.log('allStatistics',newStatisticsCount);

      if (newStatisticsCount > 0) {
         this.isDropdownOpen.push(...Array(newStatisticsCount).fill(false));
        // this.chartType.push(...Array(newStatisticsCount).fill('histogramme'));
        // this.chartOptions.push(...Array(newStatisticsCount).fill([]));
        // this.camembertOptions.push(...Array(newStatisticsCount).fill([]));
      }
        // Réinitialiser les options de graphique
         this.chartOptions = [];
         this.camembertOptions = [];

        // Afficher les statistiques de chaque tableau
        // allStatistics.forEach((statistics, index) => {
        //   this.loadChartData(statistics, index);
        //   console.log('statistics',statistics);
        // });

        this.loading = false;
      } catch (error) {
        console.error(error);
      }
    },

    async fetchIndicateursOptions() {
      try {
        const response = await axios.get('/indicateurs', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        
        const indicateurs = response.data.data.filter(indicateur => indicateur.IsActive === "1"); // Filtrer les indicateurs actifs
        const derniersIndicateurs = indicateurs.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 6); // Trier par date de création et sélectionner les 6 derniers

        console.log(derniersIndicateurs); // Afficher les 6 derniers indicateurs

        this.IndicateursOptions = derniersIndicateurs.map(indicateur => ({
          label: indicateur.Description,
          value: indicateur.id,
        }));

        this.loading = false;
      } catch (error) {
        console.error('errorqqqqq', error);
      }
    },

    loadChartData(statisticsArray, index) {
  console.log('statistics',statisticsArray,index);

      // Initialiser les tableaux pour stocker les données des deux types de graphiques
      const chartData = [];
      const camembertData = [];
      // Parcourir chaque statistique dans le tableau
      statisticsArray.forEach(statistic => {
        const name = statistic.IntituleZone || statistic.NomSecteurActivite;
        const y = parseInt(statistic.nb);

        // Ajouter les données à la série pour le graphique en colonnes
        chartData.push({
          name: name,
          y: y
        });

        // Ajouter les données à la série pour le graphique en camembert
        camembertData.push({
          name: name,
          y: y
        });
      });

      // Mettre à jour les options de graphique en colonnes
      this.chartOptions[0]= {
        chart: {
          type: 'column'
        },
        title: {
          text: ''
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Unites Industrielles'
          }
        },
        plotOptions: {
          column: {
            depth: 25,
            dataLabels: {
              enabled: true,
              color: '#000',
              inside: false,
              format: '{point.y}',
            }
          }
        },
        series: [{
          name: 'Zone Industrielle',
          colorByPoint: true,
          data: chartData
        }]
      };

      // Mettre à jour les options de graphique en camembert
        this.camembertOptions[this.currentIndex] = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: null
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
              format: '{point.percentage:.1f}%',
              distance: -50
            },
            showInLegend: true
          }
        },
        series: [{
          name: 'Zone Industrielle',
          colorByPoint: true,
          data: camembertData
        }]
      };
     console.log(this.camembertOptions);

    },

    switchChartType(type , index , indexType) {
      console.log('type et index', type ,index)
      this.allStatistics.forEach((statistics, indexStat) => {
      this.chartType = type;
   if (indexType === indexStat) {
      console.log('indexStat' ,statistics)
      this.loadChartData(statistics, indexType)


    } else {
      this.isDropdownOpen = false;
    }
     });
      // this.isDropdownOpen[indexType] = false;
      this.currentIndex = index; 
    },

    toggleDropdown(index) {
      console.log('index' ,index)
      this.isDropdownOpen[index] = !this.isDropdownOpen[index];
      console.log('this.isDropdownOpen[index]', this.isDropdownOpen[index])
       // Recherche de l'index correspondant à l'identifiant unique
  //    this.allStatistics.forEach((statistics, indexStat) => {
  //   if (index === indexStat) {
  //     console.log('indexStat' ,indexStat)
  //     console.log('isDropdownOpen11' ,this.isDropdownOpen)

  //     this.isDropdownOpen = !this.isDropdownOpen;
  //     console.log('isDropdownOpen22' ,this.isDropdownOpen)


  //   } else {
  //     this.isDropdownOpen = false;
  //   }
  // });
   
    }
  },
};
</script>

<style lang="css" scoped>
/* Style pour le dropdown */
.dropdowns {
  position: relative;
  display: inline-block;
}

.dropdown-toggles {
  padding: 4px 9px;
  border-radius: 4px;
  cursor: pointer;
}

.dropdownss-menuss {
  position: absolute;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 5px 0;
  list-style: none;
  margin: 0;
  left: -91px;
  top: 101%;
  z-index: 1000;
 
}

.dropdownss-menuss li {
  padding: 8px 30px;
  cursor: pointer;
}

.dropdownss-menuss li:hover {
  background-color: #f0f0f0;
}
</style>