<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="container-fluid">
            <div class="card">
                <div class="card-header bg-primary p-2">
                    <h2 class=" text-center text-uppercase fs-20"><b class="text-white">{{ data.NomProjet }} </b></h2>
                </div>
                <div class="card-body">
                    <div class="row align-items-center ">
                        <div class="col-xl-3">
                            <div class="card border border-primary custom-card mb-2" style="height:170px">
                                <div class="card-body">
                                    <p class="fs-16 fw-semibold mb-2  lh-1 text-muted">Les responsables: </p>
                                    <div class="  mt-1 fs-20 fw-semibold" style="color:red">
                                        <span class="mt-1 fs-14 fw-semibold lh-1 text-success "
                                            v-if="data.responsables?.length ===0">
                                            Aucun responsable rattaché à ce projet.
                                        </span>
                                        <span class="mt-1 fs-14 fw-semibold text-success responsables-text" v-else>
                                            <span class="mb-4 fs-14 fw-semibold text-success"
                                                v-html="formattedResponsables"></span>
                                        </span>
                                    </div>
    
                                </div>
                            </div>
                        </div>
                        <div class="col-xl-3">
                            <div class="card border border-primary custom-card mb-2 " style="height:170px">
                                <div class="card-body">
                                    <p class="fs-16 fw-semibold mb-2 lh-1  text-muted"> Zones d'intervention:
    
                                    </p>
                                    <div class="   mt-1 fs-14 fw-semibold text-warning">
                                        {{ formattedRegions }}
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                        <div class="col-xl-3">
                            <div class="card border border-primary custom-card mb-2" style="height:170px">
                                <div class="card-body">
                                    <p class="fs-16 fw-semibold m-0 lh-1 text-center text-muted">Durée du projet:
    
                                    </p>
                                    <div class=" text-center mt-xxl-1 mt-xl-1 mt-lg-0 mt-md-0 mt-sm-0  fs-20 fw-semibold"
                                        style="color: red">
                                        {{ tempsEcoule }}
    
                                    </div>
                                    <div class=" text-center mt-xxl-1 mt-xl-1 mt-lg-0 mt-md-0 mt-sm-0  fs-20 fw-semibold">
                                        ( {{ formatDate(data.DateDebut) }} - {{ formatDate(data.DateFin) }})
    
                                    </div>
    
                                </div>
                            </div>
                        </div>
    
                        <div class="col-xl-3">
                            <div class="card border border-primary custom-card mb-2" style="height:170px">
                                <div class="card-body">
                                    <p class="fs-18 fw-semibold m-0 lh-1 text-center text-muted">Budget (GNF):
    
                                    </p>
                                    <div class=" text-center mt-xxl-4 mt-xl-4 mt-lg-0 mt-md-0 mt-sm-0  fs-25 fw-semibold"
                                        style="color: red">
                                        {{ totalBudget || 0}}
    
                                    </div>
    
    
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div class="card">
                                <div class="card-header">
                                    <h6>Répartition des budgets par bailleur</h6>
                                </div>
                                <div class="card-body">
                                <Bailleurs :bailleurs="BailleursOptions"></Bailleurs>

                                </div>

                            </div>
                        </div>
                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                            <div class="card">
                                <div class="card-header">
                                    <h6>Répartition des budgets par bailleur</h6>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-6">
                                            <Taux></Taux>
                                        </div>
                                        <div class="col-6">
                                            <Taux></Taux>
                                        </div>
                                        <div class="col-6">
                                            <Taux></Taux>
                                        </div>
                                        <div class="col-6">
                                            <Taux></Taux>
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
</template>
<script>
import axios from "@/lib/axiosConfig";
import Loading from "@/components/others/loading.vue";
import Pag from "@/components/others/pagination.vue";
import Bailleurs from "@/components/statistique/bailleurs.vue";
import Taux from "@/components/statistique/taux.vue";

import useVuelidate from "@vuelidate/core";
import Objectif from '@/components/projets/objectif.vue'
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import Swal from "sweetalert2";
export default {
  props: ['id'],
  components: {
    Loading, Objectif, Pag , Bailleurs , Taux
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    formattedRegions() {
      if (!this.data || !this.data.regions) {
        return '';
      }
      return this.data.regions
        .map(region => region.region?.NomRegion)
        .filter(Boolean) // Filtre pour enlever les valeurs indéfinies ou nulles
        .join(', ');
    },
    formattedResponsables() {
      if (!this.data || !this.data.responsables) {
        return '';
      }
      return this.data.responsables
        .map(responsable => {
          const nom = responsable.user?.Nom || '';
          const prenoms = responsable.user?.Prenoms || '';
          return `${nom} ${prenoms}`;
        })
        .filter(name => name.trim() !== '') // Filtre pour enlever les noms vides
        .join(', '); // Using non-breaking space here
    },
    tempsEcoule() {
      const dateDebut = new Date(this.data.DateDebut);
      const dateFin = new Date(this.data.DateFin);

      let years = dateFin.getFullYear() - dateDebut.getFullYear();
      let months = dateFin.getMonth() - dateDebut.getMonth();
      let days = dateFin.getDate() - dateDebut.getDate();

      if (days < 0) {
        months -= 1;
        days += new Date(dateFin.getFullYear(), dateFin.getMonth(), 0).getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      if (years > 0) {
        return `${years} année${years > 1 ? 's' : ''} et ${months} mois`;
      } else {
        return `${months} mois et ${days} jour${days > 1 ? 's' : ''}`;
      }
    },
    totalBudget() {
      return this.BailleursOptions.reduce((total, bailleur) => {
        return total + parseFloat(bailleur.Budget || 0);
      }, 0).toLocaleString(); // Formatage avec séparateurs de milliers
    },


  },

  data() {
    return {
      loading: true,
      data: "",
      search: "",

      currentPage: 1,
      itemsPerPage: 6,
      totalPageArray: [],
      BailleursOptions: [],

      resultError: {},
      v$: useVuelidate(),
      error: "",
    };
  },
  async mounted() {
    console.log("loggedInUser", this.loggedInUser);
    await this.fetchDetailProjet();

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

          //   this.ObjectisOptions =  response.data.data.objectifs   
          //   this.SuivisOptions =  response.data.data.suivis
          this.BailleursOptions = response.data.data.bailleurs
          //   this.InfrastructuresOptions =  response.data.data.infrastructures

          console.log("usersOptions", this.data);

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
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
    },





  },

}
</script>
<style lang="css" scoped>
.responsables-text {
    line-height: 1.5;
    /* Adjust this value as needed */
}

</style>