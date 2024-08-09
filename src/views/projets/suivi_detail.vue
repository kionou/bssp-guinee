<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="d-md-flex d-block pt-12  align-items-center justify-content-between my-4 page-header-breadcrumb">
      <h1 class="page-title fw-semibold fs-18 mb-0">Projet-suivi</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Projet-suivi
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="row align-items-center ">
      <div class="col-xl-3">
        <div class="card border border-primary custom-card mb-2">
          <div class="card-body">
            <p class="fs-16 fw-semibold mb-2 text-center lh-1 text-muted">Date du suivi: </p>
            <div class="text-center  mt-4 fs-20 fw-semibold" style="color:red">
              {{ formatDate(data.DateSuivi) }}
            </div>
  
          </div>
        </div>
      </div>
      <div class="col-xl-3">
        <div class="card border border-primary custom-card mb-2">
          <div class="card-body">
            <p class="fs-16 fw-semibold mb-2 lh-1 text-center text-muted">Niveau d'execution:
  
            </p>
            <div class=" text-center  mt-4 fs-20 fw-semibold text-warning">
              {{data.NiveauExecution}}%
            </div>
  
          </div>
        </div>
      </div>
  
      <div class="col-xl-3">
        <div class="card border border-primary custom-card mb-2">
          <div class="card-body">
            <p class="fs-16 fw-semibold mb-2 lh-1 text-center text-muted">Taux Avancement Physique:
  
            </p>
            <div class=" text-center mt-xxl-4 mt-xl-4 mt-lg-0 mt-md-0 mt-sm-0  fs-20 fw-semibold" style="color: var(--primary-rgb)">
              {{data.TauxAvancementPhysique}}%
  
            </div>
  
          </div>
        </div>
      </div>
  
      <div class="col-xl-3">
        <div class="card border border-primary custom-card mb-2">
          <div class="card-body d-flex justify-space-evenly">
            <p class="fs-16 fw-semibold mb-2 lh-1 text-muted">Etat du projet: </p>
            <div v-if="data.StatutProjet === 'TERMINER'" class="text-center chart-container"
              style="font-size:46px !important;padding-top:0px;">
              <i class="bi bi-check-circle-fill text-success"></i>
  
            </div>
  
            <div v-else-if="data.StatutProjet === 'DANGER'" class="text-center chart-container"
              style="font-size:46px !important;padding-top:0px;">
              <i class="bi bi-exclamation-diamond-fill text-danger"></i>
            </div>
  
            <div v-else-if="data.StatutProjet === 'EN COURS'" class="text-center chart-container"
              style="font-size:46px !important;padding-top:0px;">
              <i class="bi bi-exclamation-triangle text-warning"></i>
            </div>
  
            <div v-else class="text-center chart-container" style="font-size:46px !important;padding-top:0px;">
              <i class="bi bi-question-circle text-muted"></i>
            </div>
  
  
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
        <div class="mb-2 card rounded border border-primary custom-card p-2">
          <p class="fs-15 fw-semibold mb-1">Observations :</p>
          <p class="text-muted mb-0 " v-if="data.Observations === '' || data.Observations === null">
            Pas de description liée a ce suivi
          </p>
          <p class="text-muted mb-0 " v-else>
            {{data.Observations}}
          </p>
        </div>
      </div>
  
  
    </div>
    <div class="row">
      <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <div class="card custom-card">
        <div class="card-header justify-content-between">
          <div class="card-title">
            La liste des bailleurs  dans ce suivi
          </div>
  
        </div>
        <div class="card-body">
          <div class="row task-card">
            <div v-if="paginatedBailleurs.length === 0" class="noresul">
              <span class="fs-14"> Vous n'avez pas encore de bailleur qui a effectué des décaissements dans ce suivi !! </span>
            </div>
            <div class="table-responsive" v-else>
              <table class="table table-hover text-nowrap table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="row" class="ps-4 fw-semibold">
                      <span class="float-right">N°</span>
                    </th>
                    <th scope="col" class="text-left"> <span class="fw-semibold">Nom</span> </th>
                    <!-- <th scope="col"  class="text-center">  <span class="fw-semibold" >Budget</span></th> -->
                    <th scope="col" class="text-center">
                      <span class="fw-semibold">Montant Décaissé</span>
                    </th>
                    <!-- <th scope="col" class="text-center">
                                          <span class="fw-semibold">Taux de Décaissement</span>
                                        </th> -->
                    <!-- <th scope="col">Actions</th> -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item , index)  in paginatedBailleurs" :key="item.id">
                    <th style="width: 30px;" scope="row" class="ps-4 ">{{ (currentPageBailleurs - 1) * itemsPerPage +
                      index + 1 }}</th>
                    <td><span class="d-block fw-semibold mb-1 text-left"> {{item.CodeBailleur}}</span></td>
                    <!-- <td style="width: 180px;" class="text-center"><span class="d-block fw-semibold mb-1 "> {{ formatBudget(item.Budget) || 0 }} </span></td> -->
                    <td style="width: 180px;" class="text-center">
                      <span class="d-block fw-semibold mb-1">{{ formatBudget(item.MontantDecaisser) }}</span>
  
                    </td>
                    <!-- <td style="width: 130px;" class="text-center">
                                              <span class="d-block text-center text-danger fw-bold mb-1">
                                                {{ tauxDecaissement(item).toFixed(2) }}%
                                              </span>
                                              <div
                                                class="progress mt-1 border border-primary"
                                                role="progressbar"
                                                aria-valuenow="50"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                              >
                                                <div
                                                  class="progress-bar"
                                                  :class="getProgressClass(tauxDecaissement(item))"
                                                  :style="{ width: tauxDecaissement(item) + '%' }"
                                                ></div>
                                              </div>
                                            </td> -->
                    <!-- <td class="" style="width: 130px;">
                                          <div class="btn-list w-25 d-flex">
  
                                            <button class="btn btn-sm btn-icon btn-info btn-wave " data-bs-toggle="modal"
                                              data-bs-target="#update_objectif" @click="HandleIdUpdateObjectif(item.id)">
                                              <i class="ri-edit-line"></i>
                                            </button>
  
                                            <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDelete(item.id)">
                                              <i class="ri-delete-bin-line"></i>
                                            </button>
  
  
                                          </div>
                                        </td>
                   -->
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2"><strong>Total général</strong></td>
                    <td class="text-center"> <strong style="color:red;">{{ totalBudget }} GNF</strong></td>
                    <!-- <td  class="text-center"> <strong  style="color:red;">{{ totalMontantDecaisse }} GNF</strong></td>
            <td class="text-center">
              <span class="progress-text fw-bold text-danger ">{{ tauxDecaissementTotal }}%</span>
              <div class="progress mt-1 border border-primary" role="progressbar">
                <div
                  class="progress-bar"
                  :class="{
                    'bg-danger': tauxDecaissementTotal <= 30,
                    'bg-warning': tauxDecaissementTotal > 30 && tauxDecaissementTotal <= 75,
                    'bg-success': tauxDecaissementTotal > 75
                  }"
                  :style="{ width: tauxDecaissementTotal + '%' }"
                ></div>
              </div>
            </td> -->
                    <!-- <td></td> -->
                  </tr>
                </tfoot>
              </table>
            </div>
  
          </div>
          <div class="row">
            <div class="col-lg-12">
              <div class="container_pagination">
                <Pag :current-page="currentPageBailleurs" :total-pages="totalPagesBailleurs"
                  @page-change="updateCurrentPageBailleurs" />
              </div>
            </div>
          </div>
        </div>
  
      </div>
      </div>
      <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
        <div class="card custom-card">
        <div class="card-header justify-content-between">
          <div class="card-title">
            Les contrainte liées au suivi
          </div>
  
        </div>
        <div class="card-body">
          <div v-if="Array.isArray(ContrainteOptions) && ContrainteOptions.length === 0" class="noresul">
  <span> Aucune contrainte liée à ce suivi !! </span>
</div>
<div class="table-responsive" v-else>
  <table class="table  table-bordered border-primary table-striped">
    <thead>
      <tr>
        <th scope="col" class="text-dark fw-semibold">Type de contrainte</th>
        <th scope="col" class="text-dark fw-semibold">Description</th>
      </tr>
    </thead>
    <tbody>
  <!-- Lignes pour les contraintes administratives -->
  <tr v-if="hasAdministrativeConstraints">
    <td class="text-left" style="width: 150px;">
      <span class="fw-bolder fs-12 text-warning"> ADMINISTRATIVES</span>
    </td>
    <td>
      <ul class="p-0 m-0">
        <li v-for="(item, index) in filteredConstraints('ADMIN')" :key="item.id">
           <span class="fw-bolder">{{ index + 1 }}-)</span> {{ item.IntituleConstrainte }}
          <hr class="m-0">
        </li>
      </ul>
    </td>
  </tr>
  <!-- Lignes pour les contraintes techniques -->
  <tr v-if="hasTechnicalConstraints">
    <td class="text-left" style="width: 150px;">
      <span class="fw-bolder fs-12 text-primary"> TECHNIQUES</span>
    </td>
    <td>
      <ul class="p-0 m-0">
        <li v-for="(item, index) in filteredConstraints('TECH')" :key="item.id">
          <span class="fw-bolder">{{ index + 1 }}-)</span> {{ item.IntituleConstrainte }}
          <hr class="m-0">
        </li>
      </ul>
    </td>
  </tr>
</tbody>

  </table>
</div>


        </div>
  
<!--   
                                             <div class="card-body">
                                                  <div class="table-responsive">
                                                      <table class="table text-nowrap table-bordered border-primary">
                                                          <thead>
                                                              <tr>
                                                                  <th scope="col" class="text-dark fw-semibold">Contraintes</th>
                                                                  <th scope="col" class="text-dark fw-semibold">Description</th>
                                                                  
                                                              </tr>
                                                          </thead>
                                                          <tbody>
                                                              <tr>
                                                                  <th colspan="2" class=" text-dark fw-semibold ">
                                                                      Administratives
                                                                  </th>
                                                                 
                                                              </tr>
                                                           
                                                              <tr>
                                                              <td>
                                                              <span>$1,116.90</span>
                                                              </td>
                                                              <td>
                                                              <span>$1,116.90</span>
                                                              </td>
                                                          </tr>
  
                                                          <tr class="">
                                                                  <th colspan="2" class=" text-dark fw-semibold">
                                                                      Techniques
                                                                  </th>
                                                                 
                                                              </tr>
                                                           
                                                              <tr>
                                                              <td>
                                                              <span>$1,116.90</span>
                                                              </td>
                                                              <td>
                                                              <span>$1,116.90</span>
                                                              </td>
                                                          </tr>
                                                              
                                                          </tbody>
                                                      </table>
                                                  </div>
                                              </div>  -->
      </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "@/lib/axiosConfig";
import Loading from "@/components/others/loading.vue";
import Pag from "@/components/others/pagination.vue";


export default {
  props: ['id'],
  components: {
    Loading,Pag


  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    // Pour BailleursOptions
    totalPagesBailleurs() {
      return Math.ceil(this.filteredBailleurs.length / this.itemsPerPage);
    },
    paginatedBailleurs() {
      const startIndex = (this.currentPageBailleurs - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredBailleurs.slice(startIndex, endIndex);
    },
    filteredBailleurs() {
      if (!this.searchBailleur) {
        console.log('this.BailleursOptions', this.BailleursOptions);
        return this.BailleursOptions;
      }
      const searchValue = this.searchBailleur.toLowerCase();
      return this.BailleursOptions.filter((bailleur) => {
        const code = bailleur.CodeBailleur || "";
        return code.toLowerCase().includes(searchValue);
      });
    },
    totalBudget() {
      return this.BailleursOptions.reduce((total, bailleur) => {
        return total + parseFloat(bailleur.MontantDecaisser || 0);
      }, 0).toLocaleString(); // Formatage avec séparateurs de milliers
    },

    // Calcul du montant total décaissé
    totalMontantDecaisse() {
      return this.BailleursOptions.reduce((total, item) => {
        return total + parseFloat((item.decaissement && item.decaissement[0] && item.decaissement[0].montant_decaisser) || 0);
      }, 0).toLocaleString(); // Formatage avec séparateurs de milliers
    },

    // Calcul du taux de décaissement total en pourcentage
    tauxDecaissementTotal() {
      const totalBudgetValue = this.BailleursOptions.reduce((total, bailleur) => {
        return total + parseFloat(bailleur.Budget || 0);
      }, 0);
      const totalMontantDecaisseValue = this.BailleursOptions.reduce((total, item) => {
        return total + parseFloat((item.decaissement && item.decaissement[0] && item.decaissement[0].montant_decaisser) || 0);
      }, 0);
      if (totalBudgetValue === 0) return 0;
      return ((totalMontantDecaisseValue / totalBudgetValue) * 100).toFixed(2);
    },
    hasAdministrativeConstraints() {
      return this.ContrainteOptions.some(c => c.TypeConstrainte === 'ADMIN');
    },
    hasTechnicalConstraints() {
      return this.ContrainteOptions.some(c => c.TypeConstrainte === 'TECH');
    },

  },

  data() {
    return {
      loading: true,
      data: '',
      currentPageBailleurs: 1,
      currentPage: 1,
      itemsPerPage: 6,
      totalPageArray: [],
      BailleursOptions: [],
      // contraintes: [],
      ContrainteOptions:[],


    };
  },

  async mounted() {
    console.log("loggedInUser", this.loggedInUser);
    await this.fetchDetailProjet()


  },

  methods: {

    filteredConstraints(type) {
      return this.ContrainteOptions.filter(c => c.TypeConstrainte === type);
    },
    async fetchDetailProjet() {
      try {
        const response = await axios.get(`/projet-suivis/detail/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("usersOptions", response.data);
        if (response.data.status === "success") {
          this.data = response.data.data;
          this.BailleursOptions = this.data.bailleurs
          this.ContrainteOptions = this.data.contraintes

          console.log("usersOptions", this.data.contraintes);

          this.loading = false;
          localStorage.setItem('CodeProjet', this.data.CodeProjet);
          // localStorage.setItem('reload', 'true'); 
        }
      } catch (error) {
        console.log(
          "Erreur lors de la mise à jour des données MPME guinee :",
          error
        );
        if (error.response.data.status === "error") {
          console.log("aut", error.response.data.status === "error");

          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/"); //a revoir
          }
        } else {
          this.formatValidationErrors(error.response.data.errors);
          this.loading = false;
          return false;
        }
      }
    },
    getTypeContrainte(type) {
      if (type === 'ADMIN') {
        return ' ADMINISTRATIVES';
      } else if (type === 'TECH') {
        return ' TECHNIQUES';
      } else {
        return type;
      }
    },
    getClassForTypeContrainte(type) {
      if (type === 'ADMIN') {
        return 'admin-class';
      } else if (type === 'TECH') {
        return 'tech-class';
      } else {
        return 'default-class';
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
    },
    formatBudget(budget) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'GNF',
        minimumFractionDigits: 0
      }).format(budget);
    },
    tauxDecaissement(item) {
      const montantDecaisse = parseFloat(item.decaissement[0].montant_decaisser || 0);
      const budget = parseFloat(item.Budget || 0);
      return budget ? (montantDecaisse / budget) * 100 : 0;
    },
    getProgressClass(percentage) {
      if (percentage <= 30) {
        return 'bg-danger';
      } else if (percentage <= 75) {
        return 'bg-warning';
      } else {
        return 'bg-success';
      }
    },
    tauxDecaissement(item) {
      const montantDecaisse = item.decaissement && item.decaissement[0] && item.decaissement[0].montant_decaisser || 0;
      if (!item.Budget) return 0;
      return (parseFloat(montantDecaisse) / parseFloat(item.Budget)) * 100;
    },
    filterByName() {
      this.currentPage = 1; // Reset to the first page on search
    },
    updateCurrentPageBailleurs(pageNumber) {
      this.currentPageBailleurs = pageNumber;
      // window.scrollTo({
      //   top: 0,
      //   behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
      // });
    },


  },
};
</script>
<style lang="css" scoped>
.admin-class {
  color: orange;
}

.tech-class {
  color: green;
}

.default-class {
  color: black;
}

</style>