<template >
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="contact-header mb-3 py-2 px-1">
      <div class="d-sm-flex d-block align-items-center justify-content-between">
        <div class="h5 fw-semibold mb-0"></div>
        <div class="d-flex mt-sm-0 mt-2 align-items-center">
          <div class="input-group">
            <input type="text" class="form-control bg-light border-0" placeholder="Recherchez..."
              aria-describedby="search-member" v-model="search" @input="filterByName" />
            <button class="btn btn-light" type="button" id="search-contact-member">
              <i class="ri-search-line text-muted"></i>
            </button>
          </div>
  
          <button class="btn btn-icon btn-primary ms-2" data-bs-placement="top" data-bs-title="Add Contact"
            data-bs-toggle="modal" data-bs-target="#add_indicateur">
            <i class="ri-add-line"> </i>
          </button>
        </div>
      </div>
    </div>
    <div class="row task-card">
        {{data.objectifs}}
      <div v-if="paginatedItems.length === 0" class="noresul">
        <span> Vous n'avez pas encore d'incateur, vous pouvez également en ajouter un !! </span>
      </div>
      <div style="overflow-x: scroll !important" class="table-responsive" v-else>
        <table class="table table-hover text-nowrap table-bordered ">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Intitule</th>
              <th scope="col">Cible Fin Projet</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item  in paginatedItems" :key="item.id">
              <td><span class="d-block fw-semibold mb-1"> {{item.CodeIndicateur}}</span></td>
              <td><span class="d-block fw-semibold mb-1"> {{item.IntituleIndicateur}}</span></td>
              <td><span class="d-block fw-semibold mb-1"> {{item.CibleFinProjet}}</span></td>
            
            
  
            
              <td>
                <div class="btn-list w-100 d-flex justify-content-center">
  
                  <button class="btn btn-sm btn-icon btn-info btn-wave " data-bs-toggle="modal"
                    data-bs-target="#update_indicateur" @click="HandleIdUpdateIndicateur(item.id)">
                    <i class="ri-edit-line"></i>
                  </button>
  
                  <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDelete(item.id)">
                    <i class="ri-delete-bin-line"></i>
                  </button>
  
  
                </div>
              </td>
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

           <!-- add indicateur -->

      <div
      class="modal fade effect-rotate-bottom "
      id="add_indicateur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_indicateur"
    >
      <div class="modal-dialog modal-dialog-centered  modal-lg">
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
              <b class="text-center">Ajouter un indicateur </b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div
              class="row gy-2 justify-content-center"
              style="
                border-width: 1px;
                border-style: solid;
                border-radius: 6px;
                border-color: rgb(0, 77, 134);
              "
            >
              <div>
                <div class="btn-list" style="position:absolute ; right: 7px; top: 5px;" >
          <div class="bouttons" >
        <div class="boutton" style=" width: 38px; z-index:1000" @click="AddformDataIndicateurs" ><i  class="ri-add-line"></i></div>
        </div>
          </div>
                <div class="row align-items-center p-2  border-bottom " v-for="(indicateur, index) in Indicateurs" :key="indicateur.id">
                  <div class="col-11">
                    <span class="nombre">
                            {{index + 1}}
                        </span>
                        <div class="row  content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Code <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="indicateur.CodeIndicateur"
                        color="info"
                        name="CodeIndicateur"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorIndicateurs(index, 'CodeIndicateur')"
                      />
                      <small v-if="errors.Indicateurs && errors.Indicateurs[index] && errors.Indicateurs[index].CodeIndicateur">{{ errors.Indicateurs[index].CodeIndicateur }}</small>
                      <small v-if="resultError['Indicateurs']"> {{ resultError["Indicateurs"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Intitulé <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="indicateur.IntituleIndicateur"
                        color="info"
                        name="IntituleIndicateur"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorIndicateurs(index, 'IntituleIndicateur')"

                      />
                      <small v-if="errors.Indicateurs && errors.Indicateurs[index] && errors.Indicateurs[index].IntituleIndicateur">{{ errors.Indicateurs[index].IntituleIndicateur }}</small>
                      <small v-if="resultError['Indicateurs']"> {{ resultError["Indicateurs"] }} </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Cible fin projet <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="indicateur.CibleFinProjet"
                        type="number"
                        min="0"
                        color="info"
                        name="CibleFinProjet"
                        size="sm"
                        rounded-size="sm"
                        @input="clearErrorIndicateurs(index, 'CibleFinProjet')"
                      />
                      <small v-if="errors.Indicateurs && errors.Indicateurs[index] && errors.Indicateurs[index].CibleFinProjet">{{ errors.Indicateurs[index].CibleFinProjet }}</small>
                      <small v-if="resultError['Indicateurs']"> {{ resultError["Indicateurs"] }} </small>
                    </div>
                  </div>
 
                </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    
                      <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="deleteRowIndicateurs(index)"  style=" position:absolute !important ; top: 18px !important; background:red;">
                       <i class="ri-delete-bin-line"></i>
                      </button>
                  </div>

                </div>
               
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitIndicateur('add_indicateur')">
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
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!-- update indicateur -->
      <div
      class="modal fade effect-rotate-bottom "
      id="update_indicateur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_indicateur"
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
              <b class="text-center">Modifier un  indicateur </b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div
              class="row gy-2 justify-content-center"
              style="
                border-width: 1px;
                border-style: solid;
                border-radius: 6px;
                border-color: rgb(0, 77, 134);
              "
            >
              <div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Code <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="indicateur.CodeIndicateur"
                        color="info"
                        name="CodeIndicateur"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                      />
                      <small v-if="v$.indicateur.CodeIndicateur.$error">{{
                        v$.indicateur.CodeIndicateur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['CodeIndicateur']">
                        {{ resultError["CodeIndicateur"] }}
                      </small>
                    </div>
                  </div>
 
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Intitulé <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="indicateur.IntituleIndicateur"
                        type="text"
                        color="info"
                        name="IntituleIndicateur"
                        size="sm"
                        rounded-size="sm"
                      />
                      <small v-if="v$.indicateur.IntituleIndicateur.$error">{{
                        v$.indicateur.IntituleIndicateur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['IntituleIndicateur']">
                        {{ resultError["IntituleIndicateur"] }}
                      </small>
                    </div>
                  </div>
                

                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Cible fin projet <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="indicateur.CibleFinProjet"
                        type="text"
                        color="info"
                        name="CibleFinProjet"
                        size="sm"
                        rounded-size="sm"
                      />
                      <small v-if="v$.indicateur.CibleFinProjet.$error">{{
                        v$.indicateur.CibleFinProjet.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['CibleFinProjet']">
                        {{ resultError["CibleFinProjet"] }}
                      </small>
                    </div>
                  </div>
                

                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdateIndicateur('update_indicateur')">
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
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!--  add suivi indicateur -->
      <div
      class="modal fade effect-rotate-bottom "
      id="add_indicateur_suivi"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_indicateur_suivi"
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
              <b class="text-center">Ajouter un suivi indicateur </b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div
              class="row gy-2 justify-content-center"
              style="
                border-width: 1px;
                border-style: solid;
                border-radius: 6px;
                border-color: rgb(0, 77, 134);
              "
            >
              <div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Date <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="suiviIndicateur.DateSuivi"
                        color="info"
                        name="DateSuivi"
                        size="sm"
                        rounded-size="sm"
                        type="date"
                      />
                      <small v-if="v$.suiviIndicateur.DateSuivi.$error">{{
                        v$.suiviIndicateur.DateSuivi.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['DateSuivi']">
                        {{ resultError["DateSuivi"] }}
                      </small>
                    </div>
                  </div>
 
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Realisation <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="suiviIndicateur.Realisation"
                        type="text"
                        color="info"
                        name="Realisation"
                        size="sm"
                        rounded-size="sm"
                      />
                      <small v-if="v$.suiviIndicateur.Realisation.$error">{{
                        v$.suiviIndicateur.Realisation.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['Realisation']">
                        {{ resultError["Realisation"] }}
                      </small>
                    </div>
                  </div>
                

                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitSuiviIndicateur('add_client')">
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
                  Fermer
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
  import axios from "@/lib/axiosConfig";
  import Loading from "@/components/others/loading.vue";
  import useVuelidate from "@vuelidate/core";
  import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
  import { successmsg } from "@/lib/modal.js";
  import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
  import Swal from "sweetalert2";
export default {
  props:['data'],
    components: {
      Loading, Pag,
        
    },
    computed: {
      loggedInUser() {
        return this.$store.getters["auth/myAuthenticatedUser"];
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
        return this.data.objectifs;
      }
      const searchValue = this.search.toLowerCase();
      return this.data.objectifs.filter((user) => {
        const Nom = user.Intitule || "";
       
        return (
          Nom.toLowerCase().includes(searchValue)
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
  
    async mounted() {
 
       this.Code = localStorage.getItem('CodeProjet');
      
    },
 
    methods: {
      successmsg:successmsg,
      AddformDataIndicateurs() {
     this.Indicateurs.push({ CodeIndicateur:'', IntituleIndicateur:'', CibleFinProjet:'',});
   },
   deleteRowIndicateurs(index) {
  
   if(index !== 0){
     this.Indicateurs.splice(index, 1);
   }
  },
  clearErrorIndicateurs(index, field) {   
     if (this.errors.Indicateurs[index]) {
       this.errors.Indicateurs[index][field] = null;
     }
   },
   validateIndicateur() {
    let isValid = true;
    this.errors = { Indicateurs: [] };
    this.Indicateurs.forEach((indicateur, index) => {
        const indicateurErrors = {};
        if (!indicateur.CodeIndicateur) {
            indicateurErrors.CodeIndicateur = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!indicateur.IntituleIndicateur) {
            indicateurErrors.IntituleIndicateur = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!indicateur.CibleFinProjet) {
            indicateurErrors.CibleFinProjet = 'Ce champs est obligatoire!';
            isValid = false;
        }
        this.errors.Indicateurs[index] = indicateurErrors;
    });
    return isValid;
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
          this.objectifsOptions =  this.data
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
    async submitIndicateur(modalId) {
      
      if (this.validateIndicateur()) {
        this.loading = true;
      
        this.Indicateurs.forEach(indicateur => {
      indicateur.CodeProjet = this.Code;
    });

    const dataToSend = {
             indicateurs: this.Indicateurs
        };


        try {
          const response = await axios.post("/indicateurs", dataToSend, {
            headers: { 
              Authorization: `Bearer ${this.loggedInUser.token}`,
              
           
          }
          });
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Indicateurs créés avec succès",
              "Les nouveaux indicateurs ont été créés avec succès !"
            );
            this.loading = false
            this.$emit('indicateur-updated');

          } else {
          }
        } catch (error) {

          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
      }
    },
    async HandleIdUpdateIndicateur(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/indicateurs/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            
          },
        });

        if (response) {
          let data = response.data.data;
            this.indicateur.CodeIndicateur = data.CodeIndicateur,
            this.indicateur.IntituleIndicateur = data.IntituleIndicateur,
            this.indicateur.CibleFinProjet = data.CibleFinProjet,
            this.ToId = data.id;
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

    async submitUpdateIndicateur(modalId) {
      this.v$.indicateur.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true
        const dataSend = {
          indicateurs:[
            {
                id:this.ToId,
                CodeIndicateur:this.indicateur.CodeIndicateur,
                IntituleIndicateur: this.indicateur.IntituleIndicateur,
                CibleFinProjet: this.indicateur.CibleFinProjet,
                CodeProjet: this.Code,
            }
          ]

         
        }

        try {
        const response = await axios.put('/indicateurs/update',dataSend, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            
          },
         
        });

        if (response.data.status === "success") {
          this.closeModal(modalId);
          this.successmsg(
            "Données d'indicateurs mises à jour",
            "Les données de l'indicateurs ont été mises à jour avec succès !"
          );
          this.loading = false;
          this.$emit('indicateur-updated');
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
        


      } else {
        this.loading = false;
      }
    },
    async HandleIdDelete(id) {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        this.ConfirmeDelete(id);
      }
    },
    async ConfirmeDelete(id) {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/indicateurs/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            
          },
        });
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Indicateur supprimé",
            "Indicateur  a été supprimé avec succès."
          );
          this.loading = false;
          this.$emit('indicateur-updated');
        } else {
          this.loading = false;
        }
      } catch (error) {

        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },


      AddformDataContraintes() {
       this.suivi.Contraintes.push({ Code:'', IntituleContrainte:'', Type:'',});
   },
   deleteRowContraintes(index) {
  
   if(index !== 0){
     this.suivi.Contraintes.splice(index, 1);
   }
  },
  clearError(index, field) {   
     if (this.errors.suivi.Contraintes[index]) {
       this.errors.suivi.Contraintes[index][field] = null;
     }
   },
 
  validateStep1() {
    let isValid = true;
    this.errors.suivi = { Contraintes: [] };
    this.suivi.Contraintes.forEach((contrainte, index) => {
        const contrainteErrors = {};
        if (!contrainte.Code) {
          contrainteErrors.Code = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!contrainte.IntituleContrainte) {
          contrainteErrors.IntituleContrainte = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!contrainte.Type) {
          contrainteErrors.Type = 'Ce champs est obligatoire!';
            isValid = false;
        }
        this.errors.suivi.Contraintes[index] = contrainteErrors;
    });
    return isValid;
},

      async submitSuivi(modalId) {
      this.v$.suivi.$touch();
      if (this.validateStep1() && this.v$.$errors.length == 0) {
        this.loading = true;
      
      
      } else {
      }
    },
    
    async submitSuiviIndicateur(modalId) {
      this.v$.suiviIndicateur.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
       let data = {

              DateSuivi:this.suiviIndicateur.DateSuivi,
              Realisation:this.suiviIndicateur.Realisation
       }
       


        // try {
        //   const response = await axios.post("/duties-services", data, {
        //     headers: { 
        //       // Authorization: `Bearer ${this.loggedInUser.token}`,
        //   }
        //   });
        //   if (response.data.status === "success") {
        //     this.closeModal(modalId);
        //     this.successmsg(
        //         "Duty Created Successfully",
        //         "The new duty has been successfully created!"
        //       );
        //     await this.fetchClients();
        //   } else {
        //   }
        // } catch (error) {

        //   this.loading = false;
        //   if (error.response.data.status === "error") {
        //     return (this.error = error.response.data.message);
        //   } else {
        //     this.formatValidationErrors(error.response.data.errors);
        //   }
        // }
      } else {
      }
    },
    triggerReload() {
      window.location.reload();
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
      return this.data.objectifs.slice(startIndex, endIndex);
    },
    
    },
}
</script>
<style lang="css" scoped>
    
</style>