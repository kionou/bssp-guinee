<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div
      class="d-md-flex  pt-12  d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
    >
      <h1 class="page-title fw-semibold fs-18 mb-0">Historiques</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Historiques
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Page Header Close -->

                               <div class="contact-header mb-3  py-2 px-1">
                                    <div class="d-sm-flex d-block align-items-center justify-content-between">
                                        <div class="h5 fw-semibold mb-0"></div>
                                        <div class="d-flex mt-sm-0 mt-2 align-items-center">
                                            <div class="input-group">
                                                <input type="text" class="form-control bg-light border-0" placeholder="Recherchez..." aria-describedby="search-member" v-model="search" @input="filterByName" >
                                                <button class="btn btn-light" type="button" id="search-contact-member"><i class="ri-search-line text-muted"></i></button>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div> 

                                
                              

                                <div class="col-xl-12"  data-aos="zoom-in">
                                <div class="card custom-card">
                                    <div class="card-header justify-content-between">
                                        <div class="card-title">
                                          Liste des historiques du système
                                        </div>
                                       
                                    </div>
                                    <div class="card-body">
                                        <div style="overflow-x: scroll !important" class="table-responsive">
                                            <table class="table table-hover border table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                       
                                                        <th scope="col">N° </th>
                                                        <th scope="col">Action</th>
                                                        <th scope="col">Description</th>
                                                        <th scope="col">Effectué par</th>
                                                        <th scope="col">Date & heure</th>
                                                        <th scope="col">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if="paginatedItems.length === 0" >
                                                <tr>
                                                  <td colspan="18">
                                                    <div
                                                      class="badge bg-warning-transparent"
                                                      style="width: 100%; font-size: 15px"
                                                    >
                                                      Pas de données
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                                <tbody v-else  data-aos="fade-up"
                                                data-aos-duration="1000">
                                                    <tr v-for="(data , index) in paginatedItems" :key="data.id">
                                                        <th  scope="row" class="p-0 text-center" style="width: 60px; padding:0 !important;">  {{index + 1}}</th>
                                                       
                                                        <td>  <span class="">{{ data.Action }}  </span> </td>
                                                        <td>  <span class="">{{ data.Description }}  </span> </td>
                                                        <td>  <span class="">{{ data.user?.Nom }} {{ data.user?.Prenoms }}   </span> </td>
                                                        <td>  <span class="">{{ formatCreatedAt(data.created_at)  }}  </span> </td>

                                                        
                                                        <td>
                                                            <div class="hstack gap-2 fs-15">
                                                       
                                                                <button v-if="hasPermission(4)"  class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-danger"  
                                                                     @click="HandleIdDelete(data.CodeRegions)"><i class="ri-delete-bin-line"></i></button>
                                                            </div>
                                                        </td>
                                                    </tr>

                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="card-footer">
                                        <div class="row">
              <div class="col-lg-12">
                <div class="container_pagination">
                  <Pag
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @page-change="updateCurrentPage"
                  />
                </div>
              </div>
                                      </div>
                                    </div>
                                </div>
                            </div>

                     
    </div>
</template>
<script>
import Pag from "@/components/others/pagination.vue";
import Loading from "@/components/others/loading.vue";
import axios from '@/lib/axiosConfig'
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import {successmsg} from "@/lib/modal.js"
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
  import Swal from 'sweetalert2'
  import moment from 'moment';
export default {
    components: {
    Loading,
    Pag, 
    MazPhoneNumberInput
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.ClientOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.ClientOptions.slice(startIndex, endIndex);
    },
  
  },
  data(){
    return{
        loading: true,
        ClientOptions: [],
        data:[],
      currentPage: 1,
      itemsPerPage: 10,
      totalPageArray: [],
      search: "",
      resultError: {},
      photo:"",
      ToId:"",

      v$: useVuelidate(),
      error: "",

    }
  },
 
  async mounted() {
   
    await this.fetchClients();

  },

  methods:{
    successmsg:successmsg,
    formatCreatedAt(createdAt) {
    return moment(createdAt).format('DD/MM/YY HH:mm:ss');
    },
    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.ClientOptions.slice(startIndex, endIndex);
    },
    async fetchClients() {
      try {
        const response = await axios.get('/historics', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, },
              params:{user:null}
  
          });

        if (response.data.status === "success") {
            this.data  = response.data.data.data ;
              this.ClientOptions = this.data

          
          this.loading =  false
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

 
 

    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.ClientOptions.slice(startIndex, endIndex);
    },
    async HandleIdDelete(id) {
     // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
     const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
     });

     // Si l'utilisateur confirme la suppression
     if (result.isConfirmed) {
       this.ConfirmeDelete(id);
     }
         },
         async ConfirmeDelete(id) {
          this.loading = true
         
         try {
           // Faites une requête pour supprimer l'élément avec l'ID itemId
           const response = await axios.delete(`/regions/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
   
             },
   
   
           });
           if (response.data.status === 'success') {
             this.loading = false
             this.successmsg(
              "Région supprimée",
              "La région a été supprimée avec succès."
            );
            await this.fetchClients();
   
           } else {
             this.loading = false
           }
         } catch (error) {
          
           if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
            }
           
         }
   
       },
    filterByName() {
this.currentPage = 1;
if (this.search !== null) {
   const tt = this.search;
  const  searchValue = tt.toLowerCase()
  this.ClientOptions =this.data.filter(user => {
    const Nom = user.user?.Nom || '';
    const CodeRegion = user.user?.Prenoms || '';
    const Action = user.Action || '';
    const date =  this.formatCreatedAt(user.created_at) || '';

    return Nom.toLowerCase().includes(searchValue) || CodeRegion.toLowerCase().includes(searchValue) || Action.toLowerCase().includes(searchValue)  || date.toLowerCase().includes(searchValue) ;
  });

} else {
this.ClientOptions = [...this.data];
 
}

},
closeModal(modalId) {
      let modalElement = this.$refs[modalId];
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      document.body.classList.remove("modal-open");
      let modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.parentNode.removeChild(modalBackdrop);
      }
    },
    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur

        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }
      this.resultError = formattedErrors; // Stockez les erreurs dans un objet

      // Maintenant, this.resultError est un objet où les clés sont les noms des champs
    },
  }
}
</script>
<style lang="css">
    .container_pagination {
    width: auto;
    text-align: end;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
    margin: 5px;
    background-color:#fff;

}
.card.custom-card .card-footer{

    padding:10px !important;
    text-align:center !important;
    background-color:#dbdfe1 !important;
}

.input-groupe input,
  .form-select {
    width: 100%;
    border-radius: 0.1rem !important;
    border: 1px solid #17a4ba;
    outline: 0;
    padding: 8px;
    color: rgb(3, 3, 5);
  }
  
  .input-groupe input:focus {
    border-color: var(--color-primary);
  }
</style>