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
            data-bs-toggle="modal" data-bs-target="#add_suivi">
            <i class="ri-add-line"> </i>
          </button>
        </div>
      </div>
    </div>
    <div class="row task-card">
      <div v-if="paginatedItems.length === 0" class="noresul">
        <span> Vous n'avez pas encore de suivi, vous pouvez également en ajouter un !! </span>
      </div>
      <div  id="tasks-container" v-else>
                     
                <div class="row task-card">
                <div class="row">
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12" v-for="item  in paginatedItems" :key="item.id">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             
                                <p class="fw-semibold mb-3 d-flex align-items-center fs-16">
                                  <span class="avatar me-2 avatar-rounded border border-gray-800">
                                <img src="@/assets/img/logo_mobile.png" alt="img"> 
                                </span>
                                  Suivi du <b class="fs-16  ml-2" style="color:red;">  {{ formatDate(item.DateSuivi) }} </b> </p>
                                <p class="mb-2 fw-semibold">Taux Avancement Physique : <span class="fs-14 mb-1 text-warning fw-semibold">{{item.TauxAvancementPhysique}} %</span></p>
                                <p class="mb-2 fw-semibold">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >{{item.NiveauExecution}} %</span></p>
                                <p class="mb-0 fw-semibold">Statut du Projet  :<span  class="fs-14 mb-1 text-muted fw-semibold" 
                                    :class="getStatusClass(item.StatutProjet)" >{{item.StatutProjet}}</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list ">
                                    <!-- <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button> -->
                                    <router-link to="/bspp/suivi-projet" 
                                              class="btn btn-sm btn-icon btn-success btn-wave">
                                              <i class="ri-eye-line"></i>
                                            </router-link>
                                    <button class="btn btn-sm btn-icon btn-wave btn-info"><i class="ri-edit-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-danger me-0"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>

                    
                </div>
                
                
            </div>

            
                   </div> 
  
  
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="container_pagination">
          <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
        </div>
      </div>
    </div>

                <!--add suivi projet  -->
        <div
      class="modal fade effect-rotate-bottom"
      id="add_suivi"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_suivi"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg">
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
              <b class="text-center">Ajouter un suivi</b>
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
         
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Date <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="suivi.DateSuivi"
                        color="info"
                        name="DateSuivi"
                        size="sm"
                        rounded-size="sm"
                        type="date"
                      />
                      <small v-if="v$.suivi.DateSuivi.$error">{{
                        v$.suivi.DateSuivi.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['DateSuivi']">
                        {{ resultError["DateSuivi"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Niveau d'execution global<span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="suivi.NiveauExecutionGlobal"
                        color="info"
                        name="NiveauExecutionGlobal"
                        size="sm"
                        rounded-size="sm"
                        type="number"
                        min="0"
                        placeholder="10%"
                      />
                      <small v-if="v$.suivi.NiveauExecutionGlobal.$error">{{
                        v$.suivi.NiveauExecutionGlobal.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['NiveauExecutionGlobal']">
                        {{ resultError["NiveauExecutionGlobal"] }}
                      </small>
                    </div>
                  </div>
                                 
                </div>
            
                <div class="row mt-3 content-group">
                 
                <div class="col">
                    <div class="mb-3 position-relative">
                        <label for="password">Taux avancement physique </label>
                        <MazInput v-model="suivi.TauxAvancementPhysique"  name="TauxAvancementPhysique" color="info" placeholder="10%"  type="number"
                        min="0"  size="sm" rounded-size="sm" />
                        <small v-if="v$.suivi.TauxAvancementPhysique.$error">{{v$.suivi.TauxAvancementPhysique.$errors[0].$message}}</small>
                        <small v-if="resultError['TauxAvancementPhysique']">{{resultError['TauxAvancementPhysique']}}</small>
                    </div>
                </div>
                                                
                <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Statut du projet <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="suivi.StatutProjet"
                        type="text"
                        color="info"
                        name="StatutProjet"
                        size="sm"
                        rounded-size="sm"
                        :options="status"
                      />
                      <small v-if="v$.suivi.StatutProjet.$error">{{
                        v$.suivi.StatutProjet.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['StatutProjet']">
                        {{ resultError["StatutProjet"] }}
                      </small>
                    </div>
                  </div>                           
                </div>
                 <div class="row mt-3 content-group">
                 <div class="col">
           <div class="input-groupe">
             <label for="employment_date_begin">Observation </label>
             <MazTextarea v-model="suivi.Observations" type="date" color="info" name="Observations" size="sm" rounded-size="sm"  />
             <small v-if="v$.suivi.Observations.$error">{{v$.suivi.Observations.$errors[0].$message}}</small>
             <small v-if="resultError['Observations']">{{resultError['Observations']}}</small>
           </div>
         </div>
                     
              </div>
              <!-- contrainte -->
               <div style="position:relative">
                <p class="titre">Les Contraintes</p>
                <div class="btn-list" style="position:absolute ; right: 7px; top: 5px;" >
        <button class="btn btn-sm  btn-primary btn-wave" @click="AddformDataContraintes(index)"  >
                       <i class="ri-add-line"></i> contrainte
                      </button>
                </div>
                <div class="row align-items-center p-2  border-bottom " v-for="(contrainte, index) in suivi.Contraintes" :key="contrainte.id">
                  <div class="col-11">
                    <span class="nombre">
                            {{index + 1}}
                        </span>
                        <div class="row  content-group">
                          <div class="col   ">
                        <div class="input-groupe ">
                        <div >
                        <label for="userpassword">Type <span class="text-danger">*</span></label>
                        <MazSelect  v-model="contrainte.TypeConstrainte" type="text"  color="info" @click="clearError(index, 'TypeConstrainte')"  name="contrainte.TypeConstrainte" size="sm" rounded-size="sm" :options="contraintes" />
                        </div>
                        <small v-if="errors.suivi.Contraintes && errors.suivi.Contraintes[index] && errors.suivi.Contraintes[index].TypeConstrainte">{{ errors.suivi.Contraintes[index].TypeConstrainte }}</small>
                        <small v-if="resultError['Contraintes']"> {{ resultError["Contraintes"] }} </small>
                        </div>
                        </div>

                </div>

                <div class="row  content-group">
                          <div class="col   ">
                        <div class="input-groupe ">
                        <div >
                        <label for="userpassword">Description <span class="text-danger">*</span></label>
                        <MazTextarea
                        v-model="contrainte.IntituleConstrainte"
                          name="IntituleConstrainte"  listPosition="left" 
                          color="info"
                          @input="clearError(index, 'IntituleConstrainte')"
                          size="sm" rounded-size="sm" /> 
                        </div>
                        <small v-if="errors.suivi.Contraintes && errors.suivi.Contraintes[index] && errors.suivi.Contraintes[index].IntituleConstrainte">{{ errors.suivi.Contraintes[index].IntituleContrainte }}</small>
                        <small v-if="resultError['Contraintes']"> {{ resultError["Contraintes"] }} </small> 
                        </div>
                        </div>

                </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    
                      <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="deleteRowContraintes(index)"  style=" position:absolute !important ; top: 18px !important; background:red;">
                       <i class="ri-delete-bin-line"></i>
                      </button>
                  </div>

                </div> 
               </div>

               <!-- bailleurs -->
               <div style="position:relative">
                <p class="titre">Les Bailleurs</p>
                <div class="btn-list" style="position:absolute ; right: 7px; top: 5px;" >
              <button class="btn btn-sm  btn-primary btn-wave" @click="AddformDataBailleurs(index)"  >
                       <i class="ri-add-line"></i> bailleur
                      </button>
                </div>
                <div class="row align-items-center p-2  border-bottom " v-for="(bailleur, index) in suivi.Bailleurs" :key="bailleur.id">
                  <div class="col-11">
                    <span class="nombres">
                            {{index + 1}}
                        </span>
                        <div class="row  content-group">
                          <div class="col   ">
                        <div class="input-groupe ">
                        <div >
                        <label for="userpassword">Code Bailleur <span class="text-danger">*</span></label>
                        <MazSelect  v-model="bailleur.CodeBailleur" type="text"  color="info" @click="clearErrorBailleurs(index, 'CodeBailleur')"  name="bailleur.CodeBailleur" size="sm" rounded-size="sm" :options="formattedBailleursOptions" />
                        </div>
                        <small v-if="errors.suivi.Bailleurs && errors.suivi.Bailleurs[index] && errors.suivi.Bailleurs[index].CodeBailleur">{{ errors.suivi.Bailleurs[index].CodeBailleur }}</small>
                        <small v-if="resultError['Bailleurs']"> {{ resultError["Bailleurs"] }} </small>
                        </div>
                        </div>
                        <div class="col   ">
                        <div class="input-groupe ">
                        <div >
                        <label for="userpassword">Montant Decaisser <span class="text-danger">*</span></label>
                        <MazInput  v-model="bailleur.MontantDecaisser" type="text"  color="info" @input="clearErrorBailleurs(index, 'MontantDecaisser')"  name="bailleur.MontantDecaisser" size="sm" rounded-size="sm"  />
                        </div>
                        <small v-if="errors.suivi.Bailleurs && errors.suivi.Bailleurs[index] && errors.suivi.Bailleurs[index].MontantDecaisser">{{ errors.suivi.Bailleurs[index].MontantDecaisser }}</small>
                        <small v-if="resultError['Bailleurs']"> {{ resultError["Bailleurs"] }} </small>
                        </div>
                        </div>

                </div>

                
                  </div>
                  <div class="col-1" style="position: relative">
                    
                      <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="deleteRowBailleurs(index)"  style=" position:absolute !important ; top: 18px !important; background:red;">
                       <i class="ri-delete-bin-line"></i>
                      </button>
                  </div>

                </div> 

             
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitSuivi('add_suivi')">
                    Valider
                  </button>
                </div>
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
  props: {
  
    SuivisOptions: {
      type:Array ,
      required: true
    },
    BailleursOptions: {
      type: Array,
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
      totalPages() {
      return Math.ceil(this.filteredIndicateurs.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredIndicateurs.slice(startIndex, endIndex);
    },
    formattedBailleursOptions() {
      return this.BailleursOptions.map(bailleur => ({
        label: bailleur.CodeBailleur,
        value: bailleur.CodeBailleur
      }));
    },
    filteredIndicateurs() {
      if (!this.search) {
        return this.SuivisOptions;
      }
      const searchValue = this.search.toLowerCase();
      return this.SuivisOptions.filter((user) => {
        const Nom = user.TauxAvancementPhysique || "";
        const Prenoms = user.NiveauExecution || "";
        const Pseudo = user.TauxAvancementPhysique || "";
      
        return (
          Nom.toLowerCase().includes(searchValue) ||
          Prenoms.toLowerCase().includes(searchValue) ||
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
        data:this.SuivisOptions,
        currentPage: 1,
        itemsPerPage: 12,
        totalPageArray: [],
        errors: {
          suivi: { 
            Contraintes: [] ,
            Bailleurs: [] ,
       },
        },
        status: [
          { label: "DANGER", value: "DANGER" },
          { label: "EN COURS", value: 'EN COURS' },
          { label: "TERMINER", value: 'TERMINER' },
        ],
        contraintes: [
          { label: "Administratives", value: "ADMIN" },
          { label: "Techniques", value: 'TECH' },
        ],
      suivi: {
        DateSuivi: "",
        NiveauExecutionGlobal: "",
        StatutProjet: "",
        TauxAvancementPhysique: "",
        Observations:'',
        Contraintes:[{  IntituleConstrainte:null, TypeConstrainte:null}],
        Bailleurs:[{ CodeBailleur:'', MontantDecaisser:'',}],
        },
        indicateur:{
          CodeIndicateur:"",
          IntituleIndicateur: "",
          CibleFinProjet: "",
        },
      
        resultError: {},
  
        v$: useVuelidate(),
        error: "",
      };
    },
    validations: {
        suivi: {
        DateSuivi:{ require },
        NiveauExecutionGlobal:{ require },
        StatutProjet:{ require },
        TauxAvancementPhysique:{ require },
        Observations:{  },
        },
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
    SuivisOptions: {
      handler(newVal) {
       
        this.data = newVal;
      },
      immediate: true,
      deep: true
    }
  },
    async mounted() {
      
       this.Code = localStorage.getItem('CodeProjet');
      
    },
 
    methods: {
      successmsg:successmsg,
      AddformDataContraintes() {
       this.suivi.Contraintes.push({ IntituleConstrainte:'', TypeConstrainte:'',});
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

AddformDataBailleurs() {
       this.suivi.Bailleurs.push({CodeBailleur:'', MontantDecaisser:'',});
   },
   deleteRowBailleurs(index) {
  
   if(index !== 0){
     this.suivi.Bailleurs.splice(index, 1);
   }
  },
  clearErrorBailleurs(index, field) {   
     if (this.errors.suivi.Bailleurs[index]) {
       this.errors.suivi.Bailleurs[index][field] = null;
     }
   },
 
  validateStep2() {
    let isValid = true;
    this.errors.suivi = { Bailleurs: [] };
    this.suivi.Bailleurs.forEach((bailleur, index) => {
        const bailleurErrors = {};
        if (!bailleur.CodeBailleur) {
          bailleurErrors.CodeBailleur = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!bailleur.MontantDecaisser) {
          bailleurErrors.MontantDecaisser = 'Ce champs est obligatoire!';
            isValid = false;
        }
        
        this.errors.suivi.Bailleurs[index] = bailleurErrors;
    });
    return isValid;
},

      async submitSuivi(modalId) {
      this.v$.suivi.$touch();
         if (this.v$.$errors.length == 0) {
         
            this.loading = true
     const contraintes = this.suivi.Contraintes.every(item => 
      !item.IntituleConstrainte && !item.TypeConstrainte) ? [] : this.suivi.Contraintes;

    const bailleurs = this.suivi.Bailleurs.every(item => 
      !item.CodeBailleur && !item.MontantDecaisser) ? [] : this.suivi.Bailleurs;

    const dataToSend = {
        DateSuivi: this.suivi.DateSuivi,
        NiveauExecution: this.suivi.NiveauExecutionGlobal,
        StatutProjet: this.suivi.StatutProjet,
        TauxAvancementPhysique: this.suivi.TauxAvancementPhysique,
        Observations: this.suivi.Observations,
        CodeProjet: this.Code,
        contraintes: contraintes,
        bailleurs: bailleurs
    };
     


        try {
          const response = await axios.post("/projet-suivis", dataToSend, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
          }
          });
       
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
          "Suivi créé avec succès",
          "Le nouveau suivi a été créé avec succès !"
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
        this.loading = false;
        
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

    getStatusClass(status) {
      switch (status) {
        case 'DANGER':
          return 'text-danger'; // rouge
        case 'EN COURS':
          return 'text-warning'; // jaune
        case 'TERMINER':
          return 'text-success'; // vert
        default:
          return 'text-muted'; // couleur par défaut
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
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
      return this.SuivisOptions.slice(startIndex, endIndex);
    },
    
    },
}
</script>
<style lang="css" scoped>
    
</style>