<template>
    <div>
      <div
        class="d-md-flex d-block pt-12 align-items-center justify-content-between my-4 page-header-breadcrumb"
      >
        <h1 class="page-title fw-semibold fs-18 mb-0">
          Detail infrastructure
        </h1>
        <div class="ms-md-1 ms-0">
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <a href="javascript:void(0);">BSPP</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Detail infrastructure
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="">
        <!-- Start::row-1 -->
        <div class="row">
          <div class="col-xl-12">
            <div class="pb-3">
              <div class="">
                <div
                  class="d-flex align-items-center justify-content-between flex-wrap gap-2"
                  style="border-bottom: 1px solid var(--secondary-rgb)"
                >
                  <div>
                    <ul class="nav nav-tabs nav-tabs-header mb-0" role="tablist">
                      <li class="nav-item" role="presentation">
                        <a
                          class="nav-link active"
                          data-bs-toggle="tab"
                          role="tab"
                          aria-current="page"
                          href="#infos"
                          aria-selected="true"
                          >Information</a
                        >
                      </li>
  
                      <li class="nav-item" role="presentation">
                        <a
                          class="nav-link"
                          data-bs-toggle="tab"
                          role="tab"
                          aria-current="page"
                          href="#suivi"
                          aria-selected="false"
                          tabindex="-1"
                        >
                          Suivi</a
                        >
                      </li>
                      
                      <li class="nav-item" role="presentation">
                        <a
                          class="nav-link"
                          data-bs-toggle="tab"
                          role="tab"
                          aria-current="page"
                          href="#paiement"
                          aria-selected="false"
                          tabindex="-1"
                        >
                          Paiement</a
                        >
                      </li>
                    </ul>
                  </div>
                  <div class="d-flex mt-sm-0 mt-2 align-items-center">
                    <div class="float-end w-20 ">
                    <a class="px-2 bg-primary text-white  fs-15 " @click="goBack" href="#"> &larr; Retour</a>
  
                  </div>
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
              <div
                class="tab-pane show active p-0 border-0"
                id="infos"
                role="tabpanel"
              >
                <Informations ref="acteursComponent" :infrastructure-data="InfrastructuresOptions"  @data-updated="handleDataUpdate"></Informations>
              </div>
              <div class="tab-pane p-0" id="suivi" role="tabpanel">
                <Suivis ref="etapesComponent" :infrastructure-data="InfrastructuresOptions"  @data-updated="handleDataUpdate"></Suivis>
              </div>
              <div class="tab-pane p-0" id="paiement" role="tabpanel">
                <Paiement ref="etapesComponent" :infrastructure-data="InfrastructuresOptions"  @data-updated="handleDataUpdate"></Paiement>
              </div>
            </div>
          </div>
        </div>
        <!-- End:: row-2 -->
  
       
      </div>
    </div>
  </template>
  <script>
  import Informations from "@/components/infrastructures/default.vue";
  import Suivis from "@/components/infrastructures/suivi-infrastructure.vue";
  import Paiement from "@/components/infrastructures/suivi-payement.vue";
  import axios from "@/lib/axiosConfig";
import Loading from '@/components/others/loading.vue';

  import { successmsg } from "@/lib/modal.js";
  
  export default {
  props: ['id'],
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
  },
    components: {
        Informations,
        Suivis,
        Paiement,
        Loading
    },
   
    data() {
      return {
      loading: true,
      InfrastructuresOptions:"",
      data:"",

       
      };
    },
    async mounted() {
    await this.fetchDetailInfra()

    },
    methods: {
      successmsg: successmsg,
      goBack() {
      this.$router.go(-1);
    },
    async handleDataUpdate(eventData = null) {
      // Rafraîchir les données du parent
      await this.fetchDetailInfra();
    },
      async fetchDetailInfra() {
      try {
        const response = await axios.get(`infrastructures/detail/${this.id}`, {
          headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            
          },
        });

    
        if (response.data.status === "success") {
          this.data = response.data.data;
          this.InfrastructuresOptions = this.data
         
         

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
     
     
    },
  };
  </script>
  <style lang="css" scoped></style>
  