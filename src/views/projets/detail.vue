<template >
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
      <!-- Page Header -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
      >
        <h1 class="page-title fw-semibold fs-18 mb-0">Projet-detail</h1>
        <div class="ms-md-1 ms-0">
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <a href="javascript:void(0);">BSPP</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Projet-detail
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="container-xxl flex-grow-1">
       
        <nav
          class="nav nav-style-6 nav-pills mb-3 nav-justified d-sm-flex d-block"
          role="tablist"
        >
          <a
            class="nav-link active"
            data-bs-toggle="tab"
            role="tab"
            aria-current="page"
            href="#step1"
            aria-selected="false"
            >General</a
          >
          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#step2"
            aria-selected="true"
            >Suivi projet </a
          >
          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#step3"
            aria-selected="false"
            >Indicateurs
          </a>
         
         
        </nav>
  
        <!-- Navbar pills -->
        <div class="col-lg-12 col-12 mb-4">
          <div class="nav-align-top mb-4">
            <div class="tab-content">
              <div class="tab-pane fade show active " id="step1" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <General :data="data" ></General>
                  </div>
                </div>
              </div>
  
             
              <div class="tab-pane fade" id="step2" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                   

                    <div  id="tasks-container">
                      <div class="d-flex p-3 flex-wrap gap-2 align-items-center justify-content-between border-bottom">
                                <div>
                                    <h6 class="fw-semibold mb-0">Suivi projet</h6>
                                </div>
                                <div class="d-flex gap-2 w-50">
                                  <div class="input-group">
                                    <input type="text" class="form-control bg-light border-0" placeholder="Search Files" aria-describedby="button-addon2">
                                    <button class="btn btn-light" type="button" id="button-addon2"><i class="ri-search-line text-muted"></i></button>
                                </div>
                                   
                                    <button class=" w-50 btn btn-sm btn-primary d-flex align-items-center justify-content-center btn-wave waves-light"
                                        data-bs-toggle="modal" data-bs-target="#add_suivi">
                                        <i class="ri-add-circle-line align-middle me-1"></i>Ajouter un suivi
                                    </button>

                                </div>
                            </div>
            <div class="row task-card">
                <div class="row">
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             
                                <p class="fw-semibold mb-3 d-flex align-items-center fs-16">
                                  <span class="avatar me-2 avatar-rounded border border-gray-800">
                                <img src="@/assets/img/logo_mobile.png" alt="img">
                                </span>
                                  Suivi du <b class="fs-16  ml-2" style="color:red;"> 13,Nov 2022 </b> </p>
                                <p class="mb-2 fw-semibold">Temps ecoulé : <span class="fs-14 mb-1 text-muted fw-semibold">(1 mois et 7 jours)</span></p>
                                <p class="mb-2 fw-semibold">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >70%</span></p>
                                <p class="mb-0 fw-semibold">Statut du Projet  :<span class="fs-14 mb-1 text-muted fw-semibold">Bon</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list ">
                                    <!-- <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button> -->
                                    <router-link to="/bspp/suivi-projet" 
                                              class="btn btn-sm btn-icon btn-success btn-wave">
                                              <i class="ri-eye-line"></i>
                                            </router-link>
                                    <button class="btn btn-sm btn-icon btn-wave btn-primary-light"><i class="ri-edit-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-danger-light me-0"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                                
                              <p class="fw-semibold mb-3 d-flex align-items-center fs-16">
                                  <span class="avatar me-2 avatar-rounded border border-gray-800">
                                <img src="@/assets/img/logo_mobile.png" alt="img">
                                </span>
                                  Suivi du <b class="fs-16  ml-2" style="color:red;"> 13,Nov 2022 </b> </p>
                                <p class="mb-2 fw-semibold">Temps ecoulé : <span class="fs-14 mb-1 text-muted fw-semibold">(1 mois et 7 jours)</span></p>
                                <p class="mb-2 fw-semibold">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >70%</span></p>
                                <p class="mb-0 fw-semibold">Statut du Projet  :<span class="fs-14 mb-1 text-muted fw-semibold">Bon</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list ">
                                    <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-primary-light"><i class="ri-edit-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-danger-light me-0"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                        <div class="card custom-card task-pending-card border border-dark">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                               
                              <p class="fw-semibold mb-3 d-flex align-items-center fs-16">
                                  <span class="avatar me-2 avatar-rounded border border-gray-800">
                                <img src="@/assets/img/logo_mobile.png" alt="img">
                                </span>
                                  Suivi du <b class="fs-16  ml-2" style="color:red;"> 13,Nov 2022 </b> </p>
                                <p class="mb-2 fw-semibold">Temps ecoulé : <span class="fs-14 mb-1 text-muted fw-semibold">(1 mois et 7 jours)</span></p>
                                <p class="mb-2 fw-semibold">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >70%</span></p>
                                <p class="mb-0 fw-semibold">Statut du Projet  :<span class="fs-14 mb-1 text-muted fw-semibold">Bon</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list ">
                                    <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-primary-light"><i class="ri-edit-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-danger-light me-0"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                               
                              <p class="fw-semibold mb-3 d-flex align-items-center fs-16">
                                  <span class="avatar me-2 avatar-rounded border border-gray-800">
                                <img src="@/assets/img/logo_mobile.png" alt="img">
                                </span>
                                  Suivi du <b class="fs-16  ml-2" style="color:red;"> 13,Nov 2022 </b> </p>
                                <p class="mb-2 fw-semibold">Temps ecoulé : <span class="fs-14 mb-1 text-muted fw-semibold">(1 mois et 7 jours)</span></p>
                                <p class="mb-2 fw-semibold">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >70%</span></p>
                                <p class="mb-0 fw-semibold">Statut du Projet  :<span class="fs-14 mb-1 text-muted fw-semibold">Bon</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list ">
                                    <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-primary-light"><i class="ri-edit-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-danger-light me-0"><i class="ri-delete-bin-line"></i></button>
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
                </div>
              </div>
  
              <div class="tab-pane fade" id="step3" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <Indicateur  :indicateursOptions="indicateursOptions"  @indicateur-updated="handleIndicateurUpdated"  ></Indicateur>
                  </div>
                </div>
              </div>
             
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
              <div>
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
                        type="text"
                      />
                      <small v-if="v$.suivi.NiveauExecutionGlobal.$error">{{
                        v$.suivi.NiveauExecutionGlobal.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['NiveauExecutionGlobal']">
                        {{ resultError["NiveauExecutionGlobal"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Statut du projet <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="suivi.StatutProjet"
                        type="text"
                        color="info"
                        name="StatutProjet"
                        size="sm"
                        rounded-size="sm"
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
                    <div class="mb-3 position-relative">
                        <label for="password">Taux avancement physique </label>
                        <MazInput v-model="suivi.TauxAvancementPhysique"  type="text" name="TauxAvancementPhysique" color="info" placeholder="Abc123@!"  size="sm" rounded-size="sm" />
                        <small v-if="v$.suivi.TauxAvancementPhysique.$error">{{v$.suivi.TauxAvancementPhysique.$errors[0].$message}}</small>
                        <small v-if="resultError['TauxAvancementPhysique']">{{resultError['TauxAvancementPhysique']}}</small>
                    </div>
                </div>
                                                
                                             
                <div class="col">
                    <div class="mb-3 position-relative">
                        <label for="TauxDecaissement">Taux de decaissement</label>
                        <MazInput v-model="suivi.TauxDecaissement"  type="text" name="TauxDecaissement" color="info" placeholder="Abc123@!"   size="sm" rounded-size="sm"/>
                        <small v-if="v$.suivi.TauxDecaissement.$error">{{v$.suivi.TauxDecaissement.$errors[0].$message}}</small>
                        <small v-if="resultError['TauxDecaissement']">{{resultError['TauxDecaissement']}}</small>
                      
                    </div>
                </div>
                                                
                         
                </div>
                 <div class="row mt-3 content-group">
                 <div class="col">
           <div class="input-groupe">
             <label for="employment_date_begin">Observation <span class="text-danger">*</span></label>
             <MazTextarea v-model="suivi.Observations" type="date" color="info" name="Observations" size="sm" rounded-size="sm"  />
             <small v-if="v$.suivi.Observations.$error">{{v$.suivi.Observations.$errors[0].$message}}</small>
             <small v-if="resultError['Observations']">{{resultError['Observations']}}</small>
           </div>
         </div>
                     
              </div>
              <p class="titre">Les Contraintes</p>

<div class="row mb-3 mt-3 content-group">
  <div class="btn-list" style="position:absolute" >
<div class="bouttons" style="position:relative">
<div class="boutton"   style="max-width: 34px; width: 100%;padding: 6px; margin-top: 20px; display: flex;
      flex-direction: column;  align-items: center; justify-content: center; right: -47.5%; top: -16px; position: relative; z-index:1000" @click="AddformDataContraintes" ><i  class="ri-add-line"></i></div>
</div>
</div>
<div  v-for="(contrainte, index) in suivi.Contraintes" :key="contrainte.id">
  <div  class="row mb-3 mt-3 content-group" >
<div class="col">
<div class="input-groupe">
<label for="userpassword">Code <span class="text-danger">*</span></label>
<MazInput
 
v-model="contrainte.Code"
name="Code"  listPosition="left" 
color="info"
@input="clearError(index, 'Code')"
size="sm" rounded-size="sm" />  
</div>
<small v-if="errors.suivi.Contraintes && errors.suivi.Contraintes[index] && errors.suivi.Contraintes[index].Code">{{ errors.suivi.Contraintes[index].Code }}</small>
<small v-if="resultError['Contraintes']"> {{ resultError["Contraintes"] }} </small>
</div>

<div class="col   ">
<div class="input-groupe ">
<div >
<label for="userpassword">Type <span class="text-danger">*</span></label>
<MazSelect  v-model="contrainte.Type" type="text"  color="info" @click="clearErrorObjectifs(index, 'Type')"  name="contrainte.Type" size="sm" rounded-size="sm" />
</div>
<small v-if="errors.suivi.Contraintes && errors.suivi.Contraintes[index] && errors.suivi.Contraintes[index].Type">{{ errors.suivi.Contraintes[index].Type }}</small>
<small v-if="resultError['Contraintes']"> {{ resultError["Contraintes"] }} </small>
</div>
</div>
</div> 

<div  class="row mb-3 mt-3 content-group" >
<div class="col  d-flex align-items-center">
<div class="input-groupe w-100 me-2">
<label for="userpassword">Intitule Contrainte <span class="text-danger">*</span></label>
<MazTextarea
 
v-model="contrainte.IntituleContrainte"
name="IntituleContrainte"  listPosition="left" 
color="info"
@input="clearError(index, 'IntituleContrainte')"
size="sm" rounded-size="sm" /> 
<small v-if="errors.suivi.Contraintes && errors.suivi.Contraintes[index] && errors.suivi.Contraintes[index].IntituleContrainte">{{ errors.suivi.Contraintes[index].IntituleContrainte }}</small>
<small v-if="resultError['Contraintes']"> {{ resultError["Contraintes"] }} </small> 
</div>
<div class="btn-list mt-8">
<div class="bouttons" style="position:relative;">
<div class="boutton"   style=" padding:6px 10px !important ; background:red;margin-top:0 !important" @click="deleteRowContraintes(index)" ><i class="ri-delete-bin-line"></i></div>
</div>
<!-- <a aria-label="anchor"  @click="deleteRowDays(index)" href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a> -->
</div>

</div>


</div> 
<hr>
</div >
 


</div>

              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitSuivi('add_client')">
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



    </div>
  </template>
  <script>
  import axios from "@/lib/axiosConfig";
  import Loading from "@/components/others/loading.vue";
  import General from "@/components/projets/general.vue"
  import Indicateur from "@/components/projets/indicateur.vue"
  import useVuelidate from "@vuelidate/core";
  import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
  import { successmsg } from "@/lib/modal.js";
  import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
  import Swal from "sweetalert2";

  export default {
    props:['id'],
    components: {
      Loading,
      General,
      Indicateur
      
    },
    computed: {
      loggedInUser() {
        return this.$store.getters["auth/myAuthenticatedUser"];
      },
    },
  
    data() {
      return {
        loading: true,
        data:'',
        code:"",
        indicateursOptions:[],
        errors: {
          suivi: { 
            Contraintes: [] ,
       },
        },
      suivi: {
        DateSuivi: "",
        NiveauExecutionGlobal: "",
        StatutProjet: "",
        TauxAvancementPhysique: "",
        TauxDecaissement:'',
        Observations:'',
        Contraintes:[{ Code:'', IntituleContrainte:'', Type:''}],
        },
        indicateur: {
          Intitule: "",
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
      suivi: {
        DateSuivi:{ require },
        NiveauExecutionGlobal:{ require },
        StatutProjet:{ require },
        TauxAvancementPhysique:{ require },
        TauxDecaissement:{ require },
        Observations:{ require },
        },
        indicateur: {
          Intitule: { require },
          CibleFinProjet: { require },
 
      },
      suiviIndicateur: {
          DateSuivi: { require },
          Realisation: { require },
        },
    },
  
    async mounted() {
      console.log("loggedInUser", this.loggedInUser);
      await this.fetchDetailProjet()

      
    },
  
    methods: {

      async fetchDetailProjet() {
      try {
        const response = await axios.get(`projets/detail/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("usersOptions", response.data);
        if (response.data.status === "success") {
          this.data = response.data.data;
          this.code = this.data.CodeProjet
          await this.fetchIndicateur(this.code)
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
    async fetchIndicateur(Code) {
    
      try {
        const response = await axios.get('/indicateurs', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params:{projet:Code}
        });
        if (response.data.status === "success") {
          this.indicateursOptions = response.data.data 
          console.log('this.indicateursOptions',this.indicateursOptions);        }
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
    handleIndicateurUpdated() {
      this.fetchIndicateur(this.code);
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
        console.log("error", this.v$.$errors);
      }
    },
    async submitIndicateur(modalId) {
      this.v$.indicateur.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
       let data = {

              Intitule:this.indicateur.Intitule,
              CibleFinProjet:this.indicateur.CibleFinProjet
       }
       

        console.log("data",data );

        // try {
        //   const response = await axios.post("/duties-services", data, {
        //     headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
        //   }
        //   });
        //   console.log("Réponse du téléversement :", response);
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
        //   console.log("response.login", error);

        //   this.loading = false;
        //   if (error.response.data.status === "error") {
        //     return (this.error = error.response.data.message);
        //   } else {
        //     this.formatValidationErrors(error.response.data.errors);
        //   }
        // }
      } else {
        console.log("error", this.v$.$errors);
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
       

        console.log("data",data );

        // try {
        //   const response = await axios.post("/duties-services", data, {
        //     headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
        //   }
        //   });
        //   console.log("Réponse du téléversement :", response);
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
        //   console.log("response.login", error);

        //   this.loading = false;
        //   if (error.response.data.status === "error") {
        //     return (this.error = error.response.data.message);
        //   } else {
        //     this.formatValidationErrors(error.response.data.errors);
        //   }
        // }
      } else {
        console.log("error", this.v$.$errors);
      }
    },
    
    },
  };
  </script>
  <style lang="css" scoped>
  .titres{

width: 22%;
display: flex;
justify-content: space-evenly;
align-items: flex-start;
}

.titres .nombre{

color:#fff;
background-color:var(--primary-color);
border-radius:50%;
padding: 1px 7px;
font-size: 13px;
z-index: 10; 
}
  </style>
  