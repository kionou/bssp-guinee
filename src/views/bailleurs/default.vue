<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div
      class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
    >
      <h1 class="page-title fw-semibold fs-18 mb-0">Bailleurs</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Bailleurs
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
                                                <input type="text" class="form-control bg-light border-0" placeholder="Recherchez..." aria-describedby="search-member" v-model="control.name" @input="filterByName" >
                                                <button class="btn btn-light" type="button" id="search-contact-member"><i class="ri-search-line text-muted"></i></button>
                                            </div>
                                           
                                            <button class="btn btn-icon btn-primary ms-2" 
                                             data-bs-placement="top"
                                              data-bs-title="Add Contact"
                                              data-bs-toggle="modal"
                                               data-bs-target="#add_client"
                                              >
                                                <i class="ri-add-line">
                                                    </i></button>
                                        </div>
                                    </div>
                                </div> 

                                
                              

                                <div class="col-xl-12">
                                <div class="card custom-card">
                                    <div class="card-header justify-content-between">
                                        <div class="card-title">
                                          Liste des Bailleurs 
                                        </div>
                                       
                                    </div>
                                    <div class="card-body">
                                        <div class="table-responsive">
                                            <table class="table text-nowrap table-hover border table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="row" class="ps-4">N°</th>
                                                        <th scope="col">Code </th>
                                                        <th scope="col">Nom</th>
                                                        <th scope="col">Etat</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody v-if="paginatedItems.length === 0" >
                                                <tr>
                                                  <td colspan="18">
                                                    <div
                                                      class="badge bg-info-transparent"
                                                      style="width: 100%; font-size: 25px"
                                                    >
                                                      No records found
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                                <tbody v-else>
                                                    <tr v-for="(data , index) in paginatedItems" :key="data.id">
                                                        <th scope="row" class="ps-4">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>
                                                        <td>
                                                        
                                                                <span class="">
                                                                  {{ data.duty_name }}
                                                                </span>
                                                         
                                                        </td>
                                                        <td>
                                                        
                                                        <span class="">
                                                          {{ data.duty_name }}
                                                        </span>
                                                 
                                                </td>
                                                        <td>
                                                           
                                                            <span  v-if="data.isActive === '1'" class="badge bg-success-transparent">Activer</span>
                                                            <span  v-else class="badge bg-danger-transparent">Desactiver</span>
                                                        </td>
                                                        <td>
                                                            <div class="hstack gap-2 fs-15">
                                                                <button  class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light"  data-bs-toggle="modal"  data-bs-target="#update_client" @click="HandleIdUpdate(data.id)"><i class="ri-edit-line"></i></button>
                                                                <button  class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-danger-light"  
                                                                     @click="HandleIdDelete(data.id)"><i class="ri-delete-bin-line"></i></button>
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

                                <div
      class="modal fade effect-rotate-bottom"
      id="add_client"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_client"
    >
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div
            class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px"
          >
            <h2
              class="modal-title text-white text-center"
              id="mail-ComposeLabel"
              style="font-size: 22px !important"
            >
              <b class="text-center"
                >Ajouter un bailleur</b
              >
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center"
                style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
              <div >
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Code <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.CodeBailleur"
                        color="info"
                        name="CodeBailleur"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                      <small v-if="v$.step1.CodeBailleur.$error">{{
                        v$.step1.CodeBailleur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['CodeBailleur']">
                        {{ resultError["CodeBailleur"] }}
                      </small>
                    </div>
                  </div>
                
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Nom
                        <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.NomBailleur"
                        type="text"
                        color="info"
                        name="NomBailleur"
                        size="sm"
                        rounded-size="sm"
                       
                      />
                      <small v-if="v$.step1.NomBailleur.$error">{{
                        v$.step1.NomBailleur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['NomBailleur']">
                        {{ resultError["NomBailleur"] }}
                      </small>
                    </div>
                  </div>
              
                </div>

                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Visible
                        <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step1.Visible"
                        type="text"
                        color="info"
                        name="Visible"
                        size="sm"
                        rounded-size="sm"
                         :options="choix"
                       
                      />
                      <small v-if="v$.step1.Visible.$error">{{
                        v$.step1.Visible.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['Visible']">
                        {{ resultError["Visible"] }}
                      </small>
                    </div>
                  </div>
              
                </div>
              

              
              </div>
              <div class="row mb-3">
              <div class="boutton">
                <button class="" @click.prevent="submitClient('add_client')">
                  Valider
                </button>
              </div>
            </div>
            </div>
         
            <br />
            <div class="modal-footer">
              <div class="btn-group ms-auto">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>
                               </div>

                               
                               <div
      class="modal fade effect-rotate-bottom"
      id="update_client"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_client"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div
            class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px"
          >
            <h2
              class="modal-title text-white text-center"
              id="mail-ComposeLabel"
              style="font-size: 22px !important"
            >
              <b class="text-center"
                >Modifier un bailleur</b
              >
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center"
                style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
              <div >
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Code <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.CodeBailleur"
                        color="info"
                        name="CodeBailleur"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                      <small v-if="v$.step2.CodeBailleur.$error">{{
                        v$.step2.CodeBailleur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['CodeBailleur']">
                        {{ resultError["CodeBailleur"] }}
                      </small>
                    </div>
                  </div>
                
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Nom
                        <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.NomBailleur"
                        type="text"
                        color="info"
                        name="NomBailleur"
                        size="sm"
                        rounded-size="sm"
                       
                      />
                      <small v-if="v$.step2.NomBailleur.$error">{{
                        v$.step2.NomBailleur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['NomBailleur']">
                        {{ resultError["NomBailleur"] }}
                      </small>
                    </div>
                  </div>
              
                </div>

                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Visible
                        <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step2.Visible"
                        type="text"
                        color="info"
                        name="Visible"
                        size="sm"
                        rounded-size="sm"
                        :options="choix"
                       
                      />
                      <small v-if="v$.step2.Visible.$error">{{
                        v$.step2.Visible.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['Visible']">
                        {{ resultError["Visible"] }}
                      </small>
                    </div>
                  </div>
              
                </div>
              </div>
              <div class="row mb-3">
              <div class="boutton">
                <button class="" @click.prevent="submitUpdate('update_client')">
                  Valider
                </button>
              </div>
            </div>
            </div>
         
            <br />
            <div class="modal-footer">
              <div class="btn-group ms-auto">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button>
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
      control: { name: '',},
      resultError: {},
      photo:"",
      ToId:"",
      choix: [
          { label: "Oui", value: true },
          { label: "Non", value: false },
        ],

      step1: {
        CodeBailleur:"",
        NomBailleur:"",
        Visible:"",
       
      },
      step2: {
        CodeBailleur:"",
        NomBailleur:"",
        Visible:"",
       
      },
      v$: useVuelidate(),
      error: "",

    }
  },
  validations: {
    step1: {
        CodeBailleur:{require},
        NomBailleur:{require},
        Visible:{require},
    },
    step2: {
        CodeBailleur:{require},
        NomBailleur:{require},
        Visible:{require},
    },
   
   
  },
  async mounted() {
    console.log("loggedInUser", this.loggedInUser);
    await this.fetchClients();

  },

  methods:{
    successmsg:successmsg,
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
        const response = await axios.get( '/duties-services',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );

        console.log("responseclienteschools-level", response.data);
        if (response.data.status === "success") {
            this.data  = response.data.data ;
              this.ClientOptions = this.data
          console.log("this.DaysOptions", this.ClientOptions);
          this.loading =  false
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

    handleFileUploadPhoto(event) {
    console.log("File input change");
    const file = event.target.files[0];
    console.log("handleFileUploadPhoto Selected file:", file);
    
    this.photo = file

  },
  async submitClient(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
       let data = {

            duty_name:this.step1.duty_name,
            descriptions:this.step2.descriptions
       }
       

        console.log("data",data );

        try {
          const response = await axios.post("/duties-services", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
          }
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
                "Duty Created Successfully",
                "The new duty has been successfully created!"
              );
            await this.fetchClients();
          } else {
          }
        } catch (error) {
          console.log("response.login", error);

          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
        console.log("error", this.v$.$errors);
      }
    },
  async  HandleIdUpdate(id){
    this.loading = true;

      try {
        const response = await axios.get(`/duties-services/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });

        // console.log("response", response);
        if (response.data.status === "success") {
          console.log("responsedata", response.data.data);
          let data =  response.data.data
          this.step2.duty_name = data.duty_name,
          this.step2.descriptions = data.descriptions,
        
          this.ToId = data.id
          this.loading = false;
        
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
    async  submitUpdate(modalId){
   
   this.v$.step2.$touch();

 
    if (this.v$.$errors.length == 0) {
    
       this.loading = true;
       let data = {

            duty_name:this.step2.duty_name,
            descriptions:this.step2.descriptions,
            id:this.ToId
            }


            console.log("data",data );
 
      try {
        const response = await axios.put(`/duties-services/${this.ToId}`,data, {
          headers: {
           
            Authorization: `Bearer ${this.loggedInUser.token}`,
          
          },
        });
        console.log("Réponse du téléversement :", response);
        if (response.data.status === "success") {
          this.closeModal(modalId);
          this.successmsg(
                  "Duty Data Updated",
                  "The duty's data has been successfully updated!"
                );
            await this.fetchClients();
         
          
        } 
      } catch (error) {
        console.error("Erreur lors du téléversement :", error);
       
        if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
     else{
       this.formatValidationErrors(error.response.data.errors);
       this.loading = false;

     }
      }
    } else {
      console.log("cest pas bon ", this.v$.$errors);
      this.loading = false;

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
           const response = await axios.delete(`/duties-services/${id}`, {
             headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               
   
             },
   
   
           });
           console.log('Réponse de suppression:', response);
           if (response.data.status === 'success') {
             this.loading = false
             this.successmsg(
              "Duty Deleted",
              "The duty has been successfully deleted."
            );
            await this.fetchClients();
   
           } else {
             console.log('error', response.data)
             this.loading = false
           }
         } catch (error) {
           console.error('Erreur lors de la suppression:', error);
          
           if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
            }
           
         }
   
       },
    filterByName() {
this.currentPage = 1;
if (this.control.name !== null) {
   const tt = this.control.name;
  const  searchValue = tt.toLowerCase()
  this.ClientOptions =this.data.filter(user => {
    const Nom = user.duty_name || '';
    const Descriptions = user.descriptions || '';
   
    return Nom.toLowerCase().includes(searchValue) || Descriptions.toLowerCase().includes(searchValue) ;
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
        console.log(" errorMessages", errorMessages, typeof errorMessages);

        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
        console.log(
          " concatenatedError",
          concatenatedError,
          typeof concatenatedError
        );

        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet

      // Maintenant, this.resultError est un objet où les clés sont les noms des champs
      console.log("resultError", this.resultError);
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