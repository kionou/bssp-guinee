<template >
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
      <!-- Page Header -->
      <div
        class="d-md-flex d-block pt-12  align-items-center justify-content-between my-4 page-header-breadcrumb"
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
      <div class="">

        <!-- Start::row-1 -->
<div class="row ">
    <div class="col-xl-12">
        <div class="pb-3">
            <div class="">
                <div class="d-flex align-items-center  flex-wrap gap-2" style="border-bottom:1px solid var(--secondary-rgb);">
                  <!-- <button @click="goBack" class="btn btn-link text-success " style="text-decoration: none;">
                    &larr; Retour
                </button> -->
                    <div>
                        <ul class="nav nav-tabs nav-tabs-header mb-0" role="tablist">
                          <li class="nav-item" role="presentation">
                            <a class="nav-link bg-primary text-white m-0 "  @click="goBack" href="#">  &larr; Retour</a>

                          </li>
                            <li class="nav-item" role="presentation">
                                <a class="nav-link active m-0" data-bs-toggle="tab" role="tab" aria-current="page" href="#step1" aria-selected="true">General</a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#step2" aria-selected="false" tabindex="-1"> Infrastructures</a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#step3" aria-selected="false" tabindex="-1">Suivi projet</a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#step4" aria-selected="false" tabindex="-1">Suivi indicateurs</a>
                            </li>
                        </ul>
                    </div>
                   
                </div>
            </div>
        </div>
    </div>
</div>
<!--End::row-1 -->

<!-- Start:: row-2 -->
<div class="row p-0">
    <div class="col-xl-12 p-0">
        <div class="tab-content">
            <div class="tab-pane show active p-0 border-0" id="step1" role="tabpanel">
              <div class="card">
                <div class="card-body">
                  <General :data="data" :ObjectisOptions="ObjectisOptions" :BailleursOptions="BailleursOptions" :indicateursOptions="indicateursOptions" @indicateur-updated="handleIndicateurUpdated"  ></General>

                </div>
                 
                </div>
          
            </div>
            <div class="tab-pane p-0" id="step2" role="tabpanel">
              <div class="card">
                <div class="card-body">
              <Infrastructure :data="data" :InfrastructuresOptions="InfrastructuresOptions" :codeProjet="code"   @indicateur-updated="handleIndicateurUpdated"  ></Infrastructure>

                </div>
              </div>
            </div>

            <div class="tab-pane p-0" id="step3" role="tabpanel">
              <div class="card">
                <div class="card-body">
              <Suivi :data="data"  :SuivisOptions="SuivisOptions" :BailleursOptions="BailleursOptions"   @indicateur-updated="handleIndicateurUpdated"  ></Suivi>
                  
                </div>
              </div>
            </div>

            <div class="tab-pane p-0" id="step4" role="tabpanel">
              <div class="card">
                <div class="card-body">
              <Indicateur :data="data" :indicateursOptions="indicateursOptions" :codeProjet="code"   @indicateur-updated="handleIndicateurUpdated"  ></Indicateur>

                </div>
              </div>
            </div>
          
          
          



        </div>
    </div>
</div>
<!-- End:: row-2 -->
       
        <!-- <nav
          class="nav nav-style-6 nav-pills mb-3 nav-justified d-sm-flex d-block"
          role="tablist" style="border-bottom: 2px solid var(--secondary-rgb);"
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
            >Suivi indicateurs
          </a>
         
          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#step4"
            aria-selected="false"
            >Infrastructures
          </a>
        </nav> -->
  
        <!-- Navbar pills -->
        <!-- <div class="col-lg-12 col-12 mb-4">
          <div class="nav-align-top mb-4">
            <div class="tab-content">
              <div class="tab-pane fade show active " id="step1" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <General :data="data" :ObjectisOptions="ObjectisOptions" :BailleursOptions="BailleursOptions" :indicateursOptions="indicateursOptions" @indicateur-updated="handleIndicateurUpdated"  ></General>
                  </div>
                </div>
              </div>
  
             
              <div class="tab-pane fade" id="step2" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <Suivi :data="data"  :SuivisOptions="SuivisOptions" :BailleursOptions="BailleursOptions"   @indicateur-updated="handleIndicateurUpdated"  ></Suivi>
                       
                  </div>
                </div>
              </div>
  
              <div class="tab-pane fade" id="step3" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <Indicateur :data="data" :indicateursOptions="indicateursOptions" :codeProjet="code"   @indicateur-updated="handleIndicateurUpdated"  ></Indicateur>
                  </div>
                </div>
              </div>

              <div class="tab-pane fade" id="step4" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <Infrastructure :data="data" :indicateursOptions="indicateursOptions" :codeProjet="code"   @indicateur-updated="handleIndicateurUpdated"  ></Infrastructure>
                  </div>
                </div>
              </div>
             
            </div>
          </div>
        </div> -->

         
    

      </div>



    </div>
  </template>
  <script>
  import axios from "@/lib/axiosConfig";
  import Loading from "@/components/others/loading.vue";
  import General from "@/components/projets/general.vue"
  import Indicateur from "@/components/projets/indicateur.vue"
  import Suivi from "@/components/projets/suivie.vue"
  import Infrastructure from "@/components/projets/infrastructure.vue"
  import useVuelidate from "@vuelidate/core";
  import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
  import { successmsg } from "@/lib/modal.js";
  import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
  import Swal from "sweetalert2";
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props:['id'],
    components: {
      Loading,
      General,
      Indicateur,
      Suivi,
      Infrastructure
      
    },
    computed: {
      loggedInUser() {
        return this.$store.getters["auth/myAuthenticatedUser"];
      },
      ...mapGetters('project', ['getCodeProjet'])
    },
  
    data() {
      return {
        loading: true,
        data:'',
        code:null,
        indicateursOptions:[],
        ObjectisOptions:[],
        SuivisOptions:[],
        BailleursOptions:[],
        InfrastructuresOptions:[],
        
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
      ...mapActions('project', ['setCodeProjet']),

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
          this.setCodeProjet(this.data.CodeProjet);
          console.log("CodeProjet", this.code); 
          this.ObjectisOptions =  response.data.data.objectifs   
          this.SuivisOptions =  response.data.data.suivis
          this.BailleursOptions =  response.data.data.bailleurs
          this.InfrastructuresOptions =  response.data.data.infrastructures
          await this.fetchIndicateur(this.code)
          // await this.fetchObjectif(this.code)
        console.log("usersOptions", response.data.data.infrastructures);

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
    async fetchObjectif(Code) {
    
    try {
      const response = await axios.get('/projet-objectifs', {
        headers: {
          Authorization: `Bearer ${this.loggedInUser.token}`,
        },
        params:{projet:Code , statut:false}
      });
      console.log('this.indicateursOptions',response); 

      if (response.data.status === "success") {
        this.ObjectisOptions = response.data.data 
        console.log('this.indicateursOptions',this.ObjectisOptions); 
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
    handleIndicateurUpdated() {
      this.fetchIndicateur(this.code);
      this.fetchDetailProjet();
    },
    goBack() {
      // Votre logique de retour ici, par exemple :
      this.$router.go(-1);
    }

   
  
    
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



  </style>
  