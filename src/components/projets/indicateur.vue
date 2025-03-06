<template >
    <div>
    <Loading v-if="loading" style="z-index: 999999"></Loading>
    <!-- <div class="card py-2 bg-primary" > 
      <h6 class="text-center text-danger m-0 text-white">{{data.NomProjet}}</h6>   
      </div> -->
        <div class="contact-header mb-3 py-2 px-1">
      <div class="d-sm-flex d-block align-items-center justify-content-between">
        <div class="fs-16 fw-semibold mb-0 text-primary ">{{data.NomProjet}}</div>
        <div class="d-flex mt-sm-0 mt-2 align-items-center">
          <div class="input-group">
            <input type="text" class="form-control bg-light border-0" placeholder="Recherchez..."
              aria-describedby="search-member" v-model="search" @input="filterByName" />
            <button class="btn btn-light" type="button" id="search-contact-member">
              <i class="ri-search-line text-muted"></i>
            </button>
          </div> 
        </div>
      </div>
    </div>
    <div class="row task-card">
      
      <div v-if="paginatedItems.length === 0" class="noresul">
        <span> Vous n'avez pas encore d'indicateur !! </span>
      </div>
      <div style="overflow-x: scroll !important" class="table-responsive" v-else>
        <table class="table table-hover text-nowrap table-bordered table-striped ">
          <thead>
            <tr class="text-center">
              <th scope="row" class="ps-4 fw-semibold">
                <span class="float-left fw-semibold">Code</span>
              </th>
              <th scope="col" > <span class="fw-semibold float-left" >Intitule</span> </th>
              <th scope="col text-center"> <span class="fw-semibold" >Valeur Cible</span>  </th>
              <th scope="col text-center"> <span class="fw-semibold" >Valeur réalisée</span>  </th>
              <th scope="col text-center"> <span class="fw-semibold" >suivre</span> </th>
              <th scope="col text-center"> <span class="fw-semibold" >Date suivi</span>  </th>

            </tr>
          </thead>
          <tbody>
            <tr v-for="item  in paginatedItems" :key="item.id">
              <th style="width: 30px;" scope="row" class="ps-4">{{item.CodeIndicateur}}</th>
              <td><span class="d-block fw-semibold mb-1 "> {{item.IntituleIndicateur}}</span></td>
              <td style="width: 150px;"><span class="d-block fw-semibold mb-1 text-center" style="color:red"> {{item.CibleFinProjet}}
              </span></td>
              <td style="width: 150px;"><span class="d-block fw-semibold mb-1 text-center text-primary"> {{item.progress[0]?.Realisation ?? "-"}}
              </span></td>
              <td class="text-center" style="width: 180px;" >
            <div v-if="item.progress.length === 0">
              <!-- <button class="btn btn-secondary btn-sm"></button> -->
                <router-link :to="{ name: 'suivi-indicateur', params: { id: item.id }}" class="text-white btn btn-secondary btn-sm"
                  v-tippy="{ content: 'Suivre cet indicateur',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}">
                  suivre
                </router-link>
              
            </div>
            <div v-else 
            v-tippy="{ content: 'Suivre cet indicateur',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"> >
              <!-- <span class="d-block text-center text-danger fw-bold mb-1">
                {{ realisationPercentage(item).toFixed(2) }}%
              </span> -->
              <span class="text-center fw-semibold" :style="{ color: getProgressColor(realisationPercentage(item)) }">
                  {{ realisationPercentage(item).toFixed(2) }}%
                </span>
              <div @click="handleProgressBarClick(item)" class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
              <div
                class="progress-bar progress-bar-striped"
                :class="getProgressClass(realisationPercentage(item))"
                :style="{ width: realisationPercentage(item) + '%' }"
                :aria-valuenow="realisationPercentage(item)"
                @click="handleProgressBarClick(item)"
                
              >
              </div>
            </div>
            </div>
          </td>
          <td style="width: 150px;"><span class="d-block fw-semibold mb-1 text-center " > {{item.progress[0]?.DateSuivi ?? "-"}}
          </span></td>
            </tr>
  
  
  
          </tbody>
        </table>
      </div>
  
  
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="container_pagination">
          <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
        </div>
      </div>
    </div>

       
   

     
    </div>
</template>
<script>
import Pag from "@/components/others/pagination.vue";
  import axios from "@/lib/axiosConfig";
  import Loading from "@/components/others/loading.vue";
  import useVuelidate from "@vuelidate/core";
  import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
  import { successmsg } from "@/lib/modal.js";
  import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
  import Swal from "sweetalert2";
  import { mapGetters } from 'vuex';
export default {
  props:{
    data: {
      type:Object ,
      required: true
    },
    indicateursOptions: {
      type:  Array,
      required: true
    },

  },
 
 
    components: {
      Loading, Pag,
        
    },
    computed: {
      loggedInUser() {
        return this.$store.getters["auth/myAuthenticatedUser"];
      },
      ...mapGetters('project', ['getCodeProjet']),
    codeProjet() {
      return this.getCodeProjet;
    },
      totalPages() {
      return Math.ceil(this.filteredIndicateurs.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredIndicateurs.slice(startIndex, endIndex);
    },
    filteredIndicateurs() {
      if (!this.search) {
        return this.indicateursOptions;
      }
      const searchValue = this.search.toLowerCase();
      return this.indicateursOptions.filter((user) => {
        const Nom = user.IntituleIndicateur || "";
        const Prenoms = user.CodeIndicateur || "";
        const Pseudo = user.CibleFinProjet || "";
        const Email = user.CodeProjet || "";
        return (
          Nom.toLowerCase().includes(searchValue) ||
          Prenoms.toLowerCase().includes(searchValue) ||
          Email.toLowerCase().includes(searchValue) ||
          Pseudo.toLowerCase().includes(searchValue)
        );
      });
    },
  },
  
    data() {
      return {
        loading: false,

        Code:"",
        search: "",
        currentPage: 1,
        itemsPerPage: 12,
        totalPageArray: [],
        errors: {Indicateurs: [] , },
        Indicateurs:[
        {
          CodeIndicateur:"",
          IntituleIndicateur: "",
          CibleFinProjet: "",
      }
        ],
        indicateur:{
          CodeIndicateur:"",
          IntituleIndicateur: "",
          CibleFinProjet: "",
        },
        suiviIndicateur: {
          DateSuivi: "",
          Realisation: "",
        },
        resultError: {},
  
        v$: useVuelidate(),
        error: "",
      };
    },
    validations: {
      indicateur:{
          CodeIndicateur:{ require },
          IntituleIndicateur: { require },
          CibleFinProjet: { require },
        },
      suiviIndicateur: {
          DateSuivi: { require },
          Realisation: { require },
        },
    },
   
    watch: {
      codeProjet(newVal) {
     
         this.handleCodeProjetChange(newVal);
      }
   },
    async mounted() {
     
      
    },
 
    methods: {
      successmsg:successmsg,
      handleCodeProjetChange(codeProjet) {
         // Logique pour gérer les changements de codeProjet
     
         this.Code = codeProjet
         // Par exemple, mettre à jour les indicateurs ou autres données
      },
   
 


      async fetchIndicateur() {
     
      try {
        const response = await axios.get('/indicateurs', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params:{projet:this.Code}
        });


        if (response.data.status === "success") {
          this.data = response.data.data;
          this.indicateursOptions =  this.data
     
          this.loading = false;
          
        }
      } catch (error) {
        
        if (error.response.data.status === "error") {

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
    realisationPercentage(item) {
      const totalRealisation = item.progress.reduce((sum, progress) => sum + parseFloat(progress.Realisation), 0);
      const cible = parseFloat(item.CibleFinProjet);
      return cible ? (totalRealisation / cible) * 100 : 0;
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
    getProgressColor(percentage) {
      if (percentage <= 30) {
        return 'red';
      } else if (percentage <= 75) {
        return 'orange';
      } else {
        return 'green';
      }
    },
  
    handleProgressBarClick(item) {
      this.$router.push({ name: 'suivi-indicateur', params: { id: item.id } });
    },
   
    filterByName() {
      this.currentPage = 1; // Reset to the first page on search
    },
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.indicateursOptions.slice(startIndex, endIndex);
    },
    
    },
}
</script>
<style lang="css" scoped>
    .progress-bar {
  transition: width 0.6s ease;
  cursor: pointer;
}
</style>