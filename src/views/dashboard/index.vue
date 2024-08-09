<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="d-md-flex d-block  pt-12 align-items-center justify-content-between my-4 page-header-breadcrumb">
      <h1 class="page-title fw-semibold fs-18 mb-0">Tableau de bord</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Tableau de bord
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Page Header Close -->


         <!-- Start::row-1 -->
         <div v-if="data.length === 0" class="noresul">
        <span> Vous n'avez pas encore de projet  !! </span>
      </div>
         <div class="row" v-else>
           
                    <div class="col-xl-6 col-xxl-4 col-lg-6 col-md-6 col-sm-12" v-for="projet  in data" :key="projet.id">
                        <div class="card custom-card border border-warning">
                            <div class="card-header p-2 d-block">
                                <div class="row">
                                    <div class=" col-10 flex-fill">
                                            <span class="fs-16 fw-bold text-uppercase">{{truncateText(projet.NomProjet, 60)}}</span>
                                    </div>
                                    <!-- <div class=" col-1 text-sm-center">
                                      <router-link :to="{ name: 'synthese-projet', params: { id: projet.id }}"   class="btn btn-sm btn-icon btn-info btn-wave">
                                        <i class="ri-line-chart-fill"></i>
                                    </router-link>
                                    </div> -->
                                    <div class=" col-1 p-0 text-sm-center">
                                      <router-link :to="{ name: 'detail-projet', params: { id: projet.id }}"   class="btn btn-sm btn-icon btn-success btn-wave">
                                        <i class="ri-eye-line"></i>
                                    </router-link>
                                    </div>
                                </div>
                            </div>
                            <div class="row py-2">
                                <div class="col-4">
                                    <div class=" text-center ">
                                        <div class="orders-delivery-address text-center">
                                        <p class="mb-1 ">Démarage</p>
                                        <p class="text-info mb-0 fs-14 fw-semibold">
                                            {{  getYear(projet.DateDebut)}}
                                        </p>
                                    </div>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="orders-delivery-address text-center">
                                        <p class="mb-1 ">Clôture</p>
                                        <p class="text-info mb-0 fs-14 fw-semibold">
                                            {{  getYear(projet.DateFin)}}
                                        </p>
                                    </div>
                                </div>
                                <div class="col-4">
                                    <div class="orders-delivery-address text-center">
                                        <p class="mb-1 ">Durée</p>
                                        <p class=" mb-0 fs-14 fw-semibold" style="color:red;">
                                            {{ formatDuration(projet.DateDebut, projet.DateFin) }}
                                        </p>
                                    </div>
                                    
                                </div>
                               
                            </div>
                            <div class="row py-2">
                              <!-- <div
                              class="col-4"
                              @mouseenter="showBailleurModal(projet)"
                              @mouseleave="hideBailleurModal"
                            >
                              <div class="orders-delivery-address text-center">
                                <p class="mb-1 ">Bailleurs</p>
                                <p class="mb-0 fw-semibold fs-14" style="color:#198754;">{{ projet.bailleurs.length }}</p>
                              </div>
                            </div> -->
                            <div class="col-4">
              <div class="orders-delivery-address text-center">
                <p class="mb-1">Bailleurs</p>
                <a href="#"
              class="mb-0 fw-semibold fs-14"
              style="color:#198754;"
              @click="showBailleurModal(projet)"
              data-bs-toggle="tooltip"
              :title="'Voir les détails des bailleurs'"
            >
              {{ projet.bailleurs.length }}
            </a>
              </div>
               </div>
                            <div class="col-4">
                              <div class="orders-delivery-address text-center">
                                <p class="mb-1">Région</p>
                                
                                <a href="#"
                                  class="mb-0 custom-tooltip"
                                 
                                  
                                   data-bs-placement="top"
                                  :data-bs-toggle="projet.regions.length > 0 ? 'tooltip' : ''"
                                  :title="projet.regions.length > 0 ? getRegionNames(projet.regions) : ''"
                                  
                                >
                                <span  class="mb-0 fw-semibold fs-14 "  style="color:#198754;">  {{ projet.regions.length }}</span>
                                 
                                </a>
                              </div>
                            </div>
                             
                                <div class="col-4">
                                    <div class="orders-delivery-address text-center">
                                        <p class="mb-1 fw-semibold fs-13 fs-sm-11">Budget(GNF)</p>
                                        <p class="text-muted mb-0">
                                          <span class="badge bg-secondary fs-16">{{ formatBudget(projetBudget(projet)) }}</span>
                                           
                                        </p>
                                    </div>
                                </div>
                               
                            </div>
                            <hr class="m-0">
                            <div class=" p-2 d-flex d-block  justify-content-between bg-gray-200">
                              <div class="col-5 text-center">
                                      <span class=" fs-16 m-0">Taux de Décaissement:</span><br>
                                      <span class="fw-semibold text-danger">{{ projetTauxDecaissement(projet).toFixed(2) }}%</span>
                                      <div class="progress mb-1" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                                      <div
                                        class="progress-bar progress-bar-striped"
                                        :class="getProgressClass(projetTauxDecaissement(projet))"
                                        :style="{ width: projetTauxDecaissement(projet) + '%' }"
                                        :aria-valuenow="projetTauxDecaissement(projet)"
                                        
                                      >
                                      </div>
                                    </div>
                                    
                                    </div>
                                <div class="col-5">
                                    <div class="mt-sm-0 mt-2 text-center">
                                    <span class=" fs-16">Avancement:</span> <br>
                                    <span class="fw-semibold text-danger">12,33 %</span>
                                    <div class="progress mt-1 border border-primary" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
                                    <div class="progress-bar bg-primary" style="width: 50%">
                                    </div>
                                </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 
                </div>
                <!--End::row-1 -->

                <bailleur-modal v-if="showModal" :bailleurs="currentBailleurs" @close="hideBailleurModal" />
                <!-- <region-modal v-if="showRegionModals" :regions="currentRegions" @close="hideRegionModal" /> -->
    </div>
</template>
<script>
 
  import Pag from "@/components/others/pagination.vue";
  import Loading from "@/components/others/loading.vue";
  import axios from "@/lib/axiosConfig";
  import useVuelidate from "@vuelidate/core";
  import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
  import { successmsg } from "@/lib/modal.js";
  import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
  import Swal from "sweetalert2";
  import BailleurModal from '@/components/projets/bailleurPopup.vue';
  import RegionModal from '@/components/projets/regionsModal.vue';
  export default {
    components: {
      Loading,
      Pag,
      MazPhoneNumberInput,
      BailleurModal,
      RegionModal,
 
    },
    computed: {
      loggedInUser() {
        return this.$store.getters["auth/myAuthenticatedUser"];
      },
      totalPages() {
      return Math.ceil(this.projetssOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.projetssOptions.slice(startIndex, endIndex);
    },

     
    },
    data() {
      return {
        loading: true,
        data: [],
        search: "",
        currentPage: 1,
        itemsPerPage: 12,
        totalPageArray: [],    
        resultError: {},
        showModal: false,
        currentBailleurs: [],
     
      };
    },
  
    async mounted() {
      console.log("loggedInUser", this.loggedInUser);
      await this.fetchProjets()
      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
     
      
     
    },
  
    methods: {
      successmsg: successmsg,
      getRegionNames(regions) {
    return regions.map(region => region.region?.NomRegion).join(', ');
  },
      showBailleurModal(projet) {
       
      this.currentBailleurs = projet.bailleurs;
      this.showModal = true;
    },
    hideBailleurModal() {
      this.showModal = false;
      this.currentBailleurs = [];
    },
 
      async fetchProjets() {
      try {
        const response = await axios.get('/projets', {
          headers: { Authorization: `Bearer ${this.loggedInUser.token}`, },
          param:{for_con_user:true}
        });
        console.log(response.data);
        this.data = response.data.data.slice(-3);
        
        this.loading = false;

      } catch (error) {
        console.error('errorqqqqq', error);

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");  //a revoir
        }
      }
    },
      truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength) + '...';
    },

      formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
    },
     
     getYear(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  return year;
},
calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();
  let days = end.getDate() - start.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months };
},

formatDuration(startDate, endDate) {
  const duration = this.calculateDuration(startDate, endDate);
  let durationString = '';

  if (duration.years > 0) {
    durationString += `${duration.years} an${duration.years > 1 ? 's' : ''}`;
  }

  if (duration.months > 0) {
    if (durationString) {
      durationString += ' ';
    }
    durationString += `${duration.months} mois`;
  }

  // Si ni années ni mois ne sont affichés, afficher "0 mois"
  if (!durationString) {
    durationString = '0 mois';
  }

  return durationString;
},
formatBudget(value) {
      return parseFloat(value).toLocaleString(); // Formatage avec séparateurs de milliers
    },
    projetBudget(projet) {
      return projet.bailleurs.reduce((total, bailleur) => total + parseFloat(bailleur.Budget || 0), 0);
    },
    projetTauxDecaissement(projet) {
      const totalBudget = this.projetBudget(projet);
      const totalMontantDecaisse = projet.bailleurs.reduce((total, bailleur) => {
        return total + parseFloat((bailleur.decaissement && bailleur.decaissement[0] && bailleur.decaissement[0].montant_decaisser) || 0);
      }, 0);
      // console.log('totalMontantDecaisse',totalMontantDecaisse);
      if (totalBudget === 0) return 0;
      return (totalMontantDecaisse / totalBudget) * 100;
    },
    getProgressClass(percentage) {
      if (percentage <= 30) {
        return 'bg-danger';
      } else if (percentage <= 75) {
        return 'bg-warning';
      } else {
        return 'bg-success';
      }
    }

  
  },
   
  };
  </script>
  <style lang="css" scoped>

.custom-tooltip .tooltip-inner {
  background-color: #ff5733; /* Changer la couleur de fond */
  color: #ffffff; /* Changer la couleur du texte */
}

.custom-tooltip .tooltip-arrow {
  border-top-color: #ff5733; /* Changer la couleur de la flèche */
}
</style>