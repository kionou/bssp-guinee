<template >
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
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
                                <p class="mb-2 fw-semibold fs-16">Taux Avancement Physique : <span class="fs-14 mb-1 text-secondary fw-semibold">{{item.TauxAvancementPhysique}} %</span></p>
                                <p class="mb-2 fw-semibold fs-16">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >{{item.NiveauExecution}} %</span></p>
                                <p class="mb-0 fw-semibold fs-16">Statut du Projet  : <span  class="fs-14 mb-1 text-muted fw-semibold" 
                                    :class="getStatusClass(item.StatutProjet)" >{{item.StatutProjet}}</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list pull-right ">
                                    <!-- <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button> -->
                                    <router-link  :to="{ name: 'suivi-projet', params: { id: item.id }}" 
                                              class=" btn btn-sm btn-icon btn-success btn-wave">
                                              <i class="ri-eye-line"></i>
                                            </router-link>
                                    <!-- <button class="btn btn-sm btn-icon btn-wave btn-info"><i class="ri-edit-line"></i></button> -->
                                    <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDelete(item.id)">
                                    <i class="ri-delete-bin-line"></i>
                                </button>
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
            <div  >
            <div class="generastep" >
      <div class="stepper">
        <div class="stepper-progress">
          <div class="stepper-progress-bar" :style="'width:' + stepperProgress"></div>
        </div>
  
        <div
          class="stepper-item"
          :class="{ current: currentStep == item, success: currentStep > item }"
          v-for="item in 4"
          :key="item"
          @click="goToStep(item)"
        >
          <div class="stepper-item-counter">
            <img
              class="icon-success"
              src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png"
              alt=""
            />
            <span class="number">
              {{ item }}
            </span>
          </div>
          <span class="stepper-item-title"> Step {{ item }} </span>
        </div>
      </div>
    </div>
  
    <div class="error text-center" v-if="this.error">{{ error }} <br /></div>
    <div  class="container-fluid"  >
     
    
       
        <!-- Étape 1 -->
        <div v-if="currentStep === 1">
          <div class="form-container">
          
            <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Date du suivi <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.DateSuivi"
                        color="info"
                        name="DateSuivi"
                        size="sm"
                        rounded-size="sm"
                        type="date"
                      />
                      <small v-if="v$.step1.DateSuivi.$error">{{
                        v$.step1.DateSuivi.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['DateSuivi']">
                        {{ resultError["DateSuivi"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Niveau d'execution global<span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.NiveauExecutionGlobal"
                        color="info"
                        name="NiveauExecutionGlobal"
                        size="sm"
                        rounded-size="sm"
                        type="number"
                        min="0"
                        placeholder="10"
                      />
                      <small v-if="v$.step1.NiveauExecutionGlobal.$error">{{
                        v$.step1.NiveauExecutionGlobal.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['NiveauExecutionGlobal']">
                        {{ resultError["NiveauExecutionGlobal"] }}
                      </small>
                    </div>
                  </div>
                                 
                </div>
            
                <div class="row mt-3 content-group">
                 
                <div class="col col-md-6 col-sm-12">
                    <div class="mb-3 position-relative">
                        <label for="password">Taux avancement physique <span class="text-danger">*</span></label>
                        <MazInput v-model="step1.TauxAvancementPhysique"  name="TauxAvancementPhysique" color="info" placeholder="10"  type="number"
                        min="0"  size="sm" rounded-size="sm" />
                        <small v-if="v$.step1.TauxAvancementPhysique.$error">{{v$.step1.TauxAvancementPhysique.$errors[0].$message}}</small>
                        <small v-if="resultError['TauxAvancementPhysique']">{{resultError['TauxAvancementPhysique']}}</small>
                    </div>
                </div>
                                                
                <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Statut du projet <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step1.StatutProjet"
                        type="text"
                        color="info"
                        name="StatutProjet"
                        size="sm"
                        rounded-size="sm"
                        :options="status"
                      />
                      <small v-if="v$.step1.StatutProjet.$error">{{
                        v$.step1.StatutProjet.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['StatutProjet']">
                        {{ resultError["StatutProjet"] }}
                      </small>
                    </div>
                  </div>                           
                </div>
               
          </div>
          <div class="btnForm py-3 d-flex items-center justify-content-end">
            <button class="btnLogin" :disabled="isButtonDisabled" @click.prevent="nextStep('add_suivi')">
              Next
            </button>
          </div>
        </div>
  
        <!-- Étape 2 -->
        <div v-if="currentStep === 2">
            <div class="form-container">
            <!-- debut infos genral -->
              
              <!-- contrainte -->
              <div style="position:relative">
                <p class="titre">Les Contraintes</p>
                <div class="btn-list" style="position:absolute ; right: 7px; top: 5px;" >
        <button class="btn btn-sm  btn-primary btn-wave" @click="AddformDataContraintes(index)"  >
                       <i class="ri-add-line"></i> contrainte
                      </button>
                </div>
                <div class="row align-items-center p-2  border-bottom " v-for="(contrainte, index) in step2.Contraintes" :key="contrainte.id">
                  <div class="col-11">
                    <span class="nombre">
                            {{index + 1}}
                        </span>
                        <div class="row  content-group">
                          <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12   ">
                        <div class="input-groupe ">
                        <div >
                        <label for="userpassword">Type de contrainte <span class="text-danger">*</span></label>
                        <MazSelect  v-model="contrainte.TypeConstrainte" type="text"  color="info" @click="clearError(index, 'TypeConstrainte')"  name="contrainte.TypeConstrainte" size="sm" rounded-size="sm" :options="contraintes" />
                        </div>
                        <small v-if="errors.step2.Contraintes && errors.step2.Contraintes[index] && errors.step2.Contraintes[index].TypeConstrainte">{{ errors.step2.Contraintes[index].TypeConstrainte }}</small>
                        <small v-if="resultError['Contraintes']"> {{ resultError["Contraintes"] }} </small>
                        </div>
                        </div>
                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 ">
                        <div class="input-groupe ">
                        <div >
                        <label for="userpassword">Description de la contrainte <span class="text-danger">*</span></label>
                        <textarea class="form-control" id="text-area"  v-model="contrainte.IntituleConstrainte" rows="1"  @input="clearError(index, 'IntituleConstrainte')"></textarea>
                        <!-- <MazTextarea
                        v-model="contrainte.IntituleConstrainte"
                          name="IntituleConstrainte"  listPosition="left" 
                          color="info"
                          @input="clearError(index, 'IntituleConstrainte')"
                          rows="1"
                          size="sm" rounded-size="sm" />  -->
                        </div>
                        <small v-if="errors.step2.Contraintes && errors.step2.Contraintes[index] && errors.step2.Contraintes[index].IntituleConstrainte">{{ errors.step2.Contraintes[index].IntituleContrainte }}</small>
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
            <!-- fin infos genral -->

          </div>
          <div class="btnForm py-3 d-flex items-center justify-content-between">
            <button class="btnLogin" @click.prevent="prevStep">Previous</button>
            <button class="btnLogin" @click.prevent="nextStep('add_suivi')">Next</button>
          </div>
        </div>
  
        <!-- Étape 3 -->
        <div v-if="currentStep === 3">
            <div class="form-container">
            <!-- debut infos genral -->
           
               <!-- bailleurs -->
               <div style="position:relative">
                <p class="titre">Les Bailleurs</p>
                <div class="btn-list" style="position:absolute ; right: 7px; top: 5px;" >
              <button class="btn btn-sm  btn-primary btn-wave" @click="AddformDataBailleurs(index)"  >
                       <i class="ri-add-line"></i> bailleur
                      </button>
                </div>
                <div class="row align-items-center p-2  border-bottom " v-for="(bailleur, index) in step3.Bailleurs" :key="bailleur.id">
                  <div class="col-11">
                    <span class="nombres">
                            {{index + 1}}
                        </span>
                        <div class="row  content-group">
                          <div class="col   ">
                        <div class="input-groupe ">
                        <div >
                        <label for="userpassword">Nom du Bailleur </label>
                        <MazSelect  v-model="bailleur.CodeBailleur" type="text"  color="info" @click="clearErrorBailleurs(index, 'CodeBailleur')"  name="bailleur.CodeBailleur" size="sm" rounded-size="sm" :options="formattedBailleursOptions" />
                        </div>
                        <small v-if="errors.step3.Bailleurs && errors.step3.Bailleurs[index] && errors.step3.Bailleurs[index].CodeBailleur">{{ errors.step3.Bailleurs[index].CodeBailleur }}</small>
                        <small v-if="resultError['Bailleurs']"> {{ resultError["Bailleurs"] }} </small>
                        </div>
                        </div>
                        <div class="col   ">
                        <div class="input-groupe ">
                        <div >
                        <label for="userpassword">Montant décaissé pour ce suivi </label>
                        <MazInput  v-model="bailleur.MontantDecaisser" type="text"  color="info" @input="clearErrorBailleurs(index, 'MontantDecaisser')"  name="bailleur.MontantDecaisser" size="sm" rounded-size="sm"  />
                        </div>
                        <small v-if="errors.step3.Bailleurs && errors.step3.Bailleurs[index] && errors.step3.Bailleurs[index].MontantDecaisser">{{ errors.step3.Bailleurs[index].MontantDecaisser }}</small>
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

                <div class="btnForm py-3 d-flex items-center justify-content-between">
            <button class="btnLogin" @click.prevent="prevStep">Previous</button>
            <button class="btnLogin" @click.prevent="nextStep('add_suivi')">Next</button>
          </div>
             
               </div>
            <!-- fin infos genral -->

          </div>
  
          

         
        </div>

        <!-- Étape 3 -->
         <div v-if="currentStep === 4">
          <div class="form-container">
               <div class="row mt-3 content-group">
               <div class="col-12 col-md-12 col-sm-12">
         <div class="input-groupe">
           <label for="employment_date_begin">Observation <span class="text-danger">*</span></label>
           <MazTextarea v-model="step4.Observations" type="date" color="info" name="Observations" size="sm" rounded-size="sm"  />
           <small v-if="v$.step4.Observations.$error">{{v$.step4.Observations.$errors[0].$message}}</small>
           <small v-if="resultError['Observations']">{{resultError['Observations']}}</small>
         </div>
       </div>
                   
            </div>
        </div>
       
         <div class="btnForm py-3 d-flex items-center justify-content-between">
            <button class="btnLogin" @click.prevent="prevStep">Previous</button>
            <button class="btnLogin" @click.prevent="nextStep('add_suivi')">Finish</button>
          </div>
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
                  <div class="col col-md-6 col-sm-12">
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
                  <div class="col col-md-6 col-sm-12">
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
                  <div class="col col-md-6 col-sm-12">
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
  import { mapGetters } from 'vuex';
export default {
  props: {
   
    data: {
      type:Object ,
      required: true
    },
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
        currentStep: 1,
    
        currentPage: 1,
        itemsPerPage: 12,
        totalPageArray: [],
        errors: {
          step2: { 
            Contraintes: [] ,
          
       },
       step3: { 
           
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
      step1: {
        DateSuivi: "",
        NiveauExecutionGlobal: "",
        StatutProjet: "",
        TauxAvancementPhysique: "",
        },
        step2:{
          Contraintes:[{  IntituleConstrainte:null, TypeConstrainte:null}],
        },
        step3:{
        Bailleurs:[{ CodeBailleur:'', MontantDecaisser:'',}],

        },
        step4: { Observations:'',},
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
        step1: {
        DateSuivi:{ require },
        NiveauExecutionGlobal:{ require },
        StatutProjet:{ require },
        TauxAvancementPhysique:{ require },
        Observations:{  },
        },
        step4: {Observations:{ require },},
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
         console.log("codeProjet has changed:", newVal);
         this.handleCodeProjetChange(newVal);
      }
   },
    async mounted() {
       console.log("loggedInUser", this.loggedInUser);
       console.log("CodeProjet from Vuex:", this.codeProjet);
      
    },
 
    methods: {
      successmsg:successmsg,
      handleCodeProjetChange(codeProjet) {
         // Logique pour gérer les changements de codeProjet
         console.log("Handling codeProjet change:", codeProjet);
         this.Code = codeProjet
         // Par exemple, mettre à jour les indicateurs ou autres données
      },
      stepperProgress() {
        return (100 / 3) * (this.currentStep - 1) + "%";
      },
      prevStep() {
        if (this.currentStep > 1) {
          this.currentStep--;
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      },
  
      goToStep(step) {
    this.currentStep = step;
  },
      AddformDataContraintes() {
       this.step2.Contraintes.push({ IntituleConstrainte:'', TypeConstrainte:'',});
   },
   deleteRowContraintes(index) {
  
   if(index !== 0){
     this.step2.Contraintes.splice(index, 1);
   }
  },
  clearError(index, field) {   
     if (this.errors.step2.Contraintes[index]) {
       this.errors.step2.Contraintes[index][field] = null;
     }
   },
 
  validateStep1() {
    let isValid = true;
    this.errors.step2 = { Contraintes: [] };
    this.step2.Contraintes.forEach((contrainte, index) => {
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
        this.errors.step2.Contraintes[index] = contrainteErrors;
    });
    return isValid;
},

AddformDataBailleurs() {
       this.step3.Bailleurs.push({CodeBailleur:'', MontantDecaisser:'',});
   },
   deleteRowBailleurs(index) {
  
   if(index !== 0){
     this.step3.Bailleurs.splice(index, 1);
   }
  },
  clearErrorBailleurs(index, field) {   
     if (this.errors.step3.Bailleurs[index]) {
       this.errors.step3.Bailleurs[index][field] = null;
     }
   },
 
  validateStep2() {
    let isValid = true;
    this.errors.step3 = { Bailleurs: [] };
    this.step3.Bailleurs.forEach((bailleur, index) => {
        const bailleurErrors = {};
        if (!bailleur.CodeBailleur) {
          bailleurErrors.CodeBailleur = 'Ce champs est obligatoire!';
            isValid = false;
        }
        if (!bailleur.MontantDecaisser) {
          bailleurErrors.MontantDecaisser = 'Ce champs est obligatoire!';
            isValid = false;
        }
        
        this.errors.step3.Bailleurs[index] = bailleurErrors;
    });
    return isValid;
},

async nextStep(modalId) {   
        try {
      //     let isValid = false;

      //   if (this.currentStep === 2) {
      //   isValid = this.validateStep1();
      // } else if (this.currentStep === 3) {
      //   isValid = this.validateStep2();
     
      // } else {
      //   isValid = true; 
      // }
   
               
      if (this.currentStep === 1) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.currentStep++;
        window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
      } else {
        console.log("errroor1", this.v$.$errors);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
       
      }
       
          
    }
   else if (this.currentStep === 2) { 
        this.currentStep++;
        window.scrollTo({
            top: 0,
            behavior: "smooth",
          }); 
     
    }
   else if (this.currentStep === 3) {
    this.currentStep++;
        window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
     

     
         
    }
    else if (this.currentStep === 4) {
      this.v$.step4.$touch();
      if (this.v$.$errors.length == 0) {
        this. submitSuivi(modalId)
      } else {
        console.log("errroor1", this.v$.$errors);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
       
      }
       
          
    }

       
    } catch (error) {
        // Gérer les erreurs
        console.log("errroor222", this.v$.$errors);

        console.error("Une erreur s'est produite :", error);
        console.log("errroor222", this.v$.$errors);
        

        window.scrollTo({ top: 0, behavior: "smooth" });
         this.loading = false;
    }
      },

      async submitSuivi(modalId) {
     
         
            this.loading = true
     const contraintes = this.step2.Contraintes.every(item => 
      !item.IntituleConstrainte && !item.TypeConstrainte) ? [] : this.step2.Contraintes;

    const bailleurs = this.step3.Bailleurs.every(item => 
      !item.CodeBailleur && !item.MontantDecaisser) ? [] : this.step3.Bailleurs;

    const dataToSend = {
        DateSuivi: this.step1.DateSuivi,
        NiveauExecution: this.step1.NiveauExecutionGlobal,
        StatutProjet: this.step1.StatutProjet,
        TauxAvancementPhysique: this.step1.TauxAvancementPhysique,
        Observations: this.step4.Observations,
        CodeProjet: this.Code,
        contraintes: contraintes,
        bailleurs: bailleurs
    };
      console.log("data", dataToSend);


        try {
          const response = await axios.post("/projet-suivis", dataToSend, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
          }
          });
          console.log("Réponse du téléversement :", response);
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
          console.log("response.login", error);

          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
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

        console.log("response", response);
        if (response) {
          console.log("responsedata", response.data.data);
          let data = response.data.data;
            this.indicateur.CodeIndicateur = data.CodeIndicateur,
            this.indicateur.IntituleIndicateur = data.IntituleIndicateur,
            this.indicateur.CibleFinProjet = data.CibleFinProjet,
            this.ToId = data.id;
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

        console.log(dataSend);
        try {
        const response = await axios.put('/indicateurs/update',dataSend, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
         
        });

        console.log("usersOptions", response.data);
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
        


      } else {
        console.log("cest pas bon ", this.v$.$errors);
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
        const response = await axios.delete(`/projet-suivis/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Suivi projet supprimé",
            "Suivi projet  a été supprimé avec succès."
          );
          this.loading = false;
          this.$emit('indicateur-updated');
        } else {
          console.log("error", response.data);
          this.loading = false;
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);

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
  //   createSuivieData() {
  //   return {
     
     
   
  //      this.step2.Contraintes.every(item => 
  //     !item.IntituleConstrainte && !item.TypeConstrainte) ? [] : this.step2.Contraintes;

  //    this.step2.Bailleurs.every(item => 
  //     !item.CodeBailleur && !item.MontantDecaisser) ? [] : this.step2.Bailleurs;

   
  //       DateSuivi: this.step1.DateSuivi,
  //       NiveauExecution: this.step1.NiveauExecutionGlobal,
  //       StatutProjet: this.step1.StatutProjet,
  //       TauxAvancementPhysique: this.step1.TauxAvancementPhysique,
  //       Observations: this.step1.Observations,
  //       CodeProjet: this.Code,
  //       contraintes: contraintes,
  //       bailleurs: bailleurs
  
  //   };
  // },
    
    },
}
</script>
<style lang="css" scoped>
 .tx-green-1 {
    color: #75cc65;
    font-weight: 600;
  }
  
  .wrapper-stepper {
    background-color: #fff;
    padding: 60px;
    border-radius: 32px;
    box-shadow: rgba(0, 0, 0, 0.09);
  }
  
  .stepper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* width: 660px; */
    position: relative;
    z-index: 0;
    /* margin-bottom: 24px; */
  }
  
  .stepper-progress {
    position: absolute;
    background-color: #c5c5c5;
    height: 2px;
    z-index: -1;
    left: 0;
    right: 0;
    margin: 0 auto;
  }
  
  .stepper-progress-bar {
    position: absolute;
    left: 0;
    height: 100%;
    width: 0%;
    background-color: #47c00b;
    transition: all 500ms ease;
  }
  
  .stepper-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #c5c5c5;
    transition: all 500ms ease;
    cursor:pointer;
  }
  
  .stepper-item-counter {
    height: 35px;
    width: 35px;
    display: grid;
    place-items: center;
    background-color: #fff;
    border-radius: 100%;
    border: 2px solid #c5c5c5;
    position: relative;
  }
  
  .stepper-item-counter .icon-success {
    position: absolute;
    opacity: 0;
    transform: scale(0);
    width: 18px;
    transition: all 500ms ease;
  }
  
  .stepper-item-counter .number {
    font-size: 15px;
    transition: all 500ms ease;
  }
  
  .stepper-item-title {
    position: absolute;
    font-size: 15px;
    bottom: -39px;
    width: 71px;
    display: flex;
    justify-content: center;
  }
  
  .stepper-item.success .stepper-item-counter {
    border-color: #75cc65;
    background-color: #c8ebc1;
    color: #fff;
    font-weight: 600;
  }
  
  .stepper-item.success .stepper-item-counter .icon-success {
    opacity: 1;
    transform: scale(1);
  }
  
  .stepper-item.success .stepper-item-counter .number {
    opacity: 0;
    transform: scale(0);
  }
  
  .stepper-item.success .stepper-item-title {
    color: #75cc65;
  }
  
  .stepper-item.current .stepper-item-counter {
    border-color: #75cc65;
    background-color: #75cc65;
    color: #fff;
    font-weight: 600;
  }
  
  .stepper-item.current .stepper-item-title {
    color: #818181;
  }
  .signup a:hover {
    text-decoration: underline var(--primary-color);
  }
  
  .sign {
    display: block;
    width: 100%;
    background-color: var(--primary-color);
    padding: 0.75rem;
    text-align: center;
    color: black;
    border: none;
    border-radius: 0.375rem;
    font-weight: 600;
    margin-top: 50px;
  }
  
  .signup {
    text-align: center;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(156, 163, 175, 1);
  }
  
  
  .btnForm {
    max-width: 1140px;
    margin: 20px auto;
    background-color: white;
    padding: 1rem;
    color: black;
    border:1px solid var(--primary-color)
    /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); */
  }
  
  .btnLogin {
    padding: 1em 3em;
    font-size: 12px;
    font-weight: 500;
    color: #fff;
    background-color:var(--primary-color);
    border: none;
    border-radius: 45px;
  
    cursor: pointer;
    outline: none;
  }
  
  .btnLogin:hover {
    background-color: #fff;
    border: 1px solid var(--primary-color);
    color:#000;
  }
    
</style>