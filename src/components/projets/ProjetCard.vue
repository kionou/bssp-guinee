<template >
  <div class="row">
    <div class="col-xl-6 col-xxl-4 col-lg-6 col-md-6 col-sm-12" v-for="projet  in data" :key="projet.id">
      <div class="card custom-card border border-warning" data-aos="zoom-in">
        <div class="card-header p-2 d-block">
          <div class="row">
            <div class=" col-xl-9  px-0 flex- text-center">
              <span class="fs-16 fw-bold text-uppercase">{{truncateText(projet.NomProjet, 55)}}</span>
            </div>
           
            <div class=" col-xl-3 px-0 text-sm-center">
                <a :href="`https://project-files.org/bspp/public/api/fiche-projet/${projet.id}`" target="_blank"  class="btn btn-sm btn-icon btn-info btn-wave" 
               v-tippy="{ content: 'Voir la fiche du projet',theme: 'custom',animation: 'shift-away'}">
               <i class="ri-file-list-line"></i>
              </a>
              <a :href="`https://project-files.org/bspp/public/api/fiche-synoptique/${projet.id}`" target="_blank"  class="btn btn-sm btn-icon btn-warning btn-wave ms-1" 
               v-tippy="{ content: 'Voir la fiche synoptique du projet',theme: 'custom',animation: 'shift-away'}">
               <i class="ri-file-text-line"></i>
              </a>

              <router-link :to="{ name: 'detail-projet', params: { id: projet.id }}" 
                class="btn btn-sm btn-icon btn-success btn-wave ms-1" v-tippy="{ content: 'Afficher les détails',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}">
                <i class="ri-eye-line"></i>
              </router-link>
              </div>
          
          </div>
        </div>
        <div class="row py-2">
          <div class="col-4">
            <div class=" text-center ">
              <div class="orders-delivery-address text-center">
                <p class="mb-1 ">Démarage</p>
                <p class=" mb-0 fs-16 fw-semibold" style="color:#000">
                  {{ getYear(projet.DateDebut)}}
                </p>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="orders-delivery-address text-center">
              <p class="mb-1 ">Clôture</p>
              <p class=" mb-0 fs-16 fw-semibold" style="color:#000">
                {{ getYear(projet.DateFin)}}
              </p>
            </div>
          </div>
          <div class="col-4">
            <div class="orders-delivery-address text-center">
              <p class="mb-1 ">Durée</p>
              <p class=" mb-0 fs-16 fw-semibold" style="color:black;">
                {{ formatDuration(projet.DateDebut, projet.DateFin) }}
              </p>
            </div>
  
          </div>
  
        </div>
        <div class="row py-2">
  
          <div class="col-3 text-center">
           
              <p class="mb-1">Bailleurs</p>
              <a href="#" class="mb-0 fw-semibold fs-20" style="color:#000;" @click="showBailleurModal(projet)"
                data-bs-toggle="tooltip" :title="'Cliquez pour voir les détails des bailleurs'">
                {{ projet.bailleurs.length }}
              </a>
           
          </div>
          <div class="col-4 justify-content-center text-center">
          
              <p title="Zones d'intervention" class="mb-1">Zones d'inter.</p>
              <a href="#" class="mb-0 fw-semibold fs-20" style="color:#000;" @click="showRegionModal(projet)"
                data-bs-toggle="tooltip" :title="'Cliquez pour voir les détails des régions'">
                {{ projet.regions.length }}
              </a>
           
          </div>
  
          <div class="col-5 justify-content-center text-center">
           
              <p title="Budget" class="mb-1">Budget(GNF)</p>
              <p class="text-dark mb-0">
                <span class=" fs-20">{{ formatBudget(projetBudget(projet)) }}</span>
  
              </p>
          
          </div>
  
        </div>
        <hr class="m-0">
        <div class=" p-0 py-1  d-flex justify-content-center">
          <div class="row bg-gray-200" style="width:98%">
            <div class="col-6 text-center">
            <span class=" fs-16 m-0">Décaissement Global (%):</span><br>
            <span class="fw-semibold " :style="{ color: getProgressColor(projetTauxDecaissement(projet)) }">{{
              projetTauxDecaissement(projet).toFixed(2) }}%</span>
            <div class="progress mb-1" role="progressbar" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-bar-striped" :class="getProgressClass(projetTauxDecaissement(projet))"
                :style="{ width: projetTauxDecaissement(projet) + '%' }" :aria-valuenow="projetTauxDecaissement(projet)">
              </div>
            </div>
  
          </div>
          <div class="col-6">
            <div class="mt-sm-0 mt-2 text-center">
  
              <span class=" fs-16">Exéc. Physique (%):</span> <br>
              <span class="fw-semibold "
                :style="{ color: getProgressColor(projet.suivis_dash?.TauxAvancementPhysique ?? 0) }">{{
                projet.suivis_dash?.TauxAvancementPhysique ?? 0
                }}%</span>
              <div class="progress mb-1" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progress-bar-striped"
                  :class="getProgressClass( projet.suivis_dash?.TauxAvancementPhysique)"
                  :style="{ width:  projet.suivis_dash?.TauxAvancementPhysique + '%' }"
                  :aria-valuenow=" projet.suivis_dash?.TauxAvancementPhysique ?? 0">
                </div>
              </div>
            </div>
          </div>
  
          <div class="col-4">
            <div class="mt-sm-0 mt-2 text-center">
  
              <span class=" fs-16">Exéc. Financière (%):</span> <br>
              <span class="fw-semibold "
                :style="{ color: getProgressColor(projet.suivis_dash?.TauxExecutionFinanciere ?? 0) }">{{
                projet.suivis_dash?.TauxExecutionFinanciere ?? 0
                }}%</span>
              <div class="progress mb-1" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar progress-bar-striped"
                  :class="getProgressClass( projet.suivis_dash?.TauxExecutionFinanciere)"
                  :style="{ width:  projet.suivis_dash?.TauxExecutionFinanciere + '%' }"
                  :aria-valuenow=" projet.suivis_dash?.TauxExecutionFinanciere ?? 0">
                </div>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="mt-sm-0 mt-2 text-center">
  
              <span class=" fs-16">Cons. Délai (%):</span> <br>
              <span class="fw-semibold " :style="{ color: getProgressColor(TauxConsommationDelai(projet)) }">{{
              TauxConsommationDelai(projet).toFixed(2) }}%</span>
            <div class="progress mb-1" role="progressbar" aria-valuemin="0" aria-valuemax="100">
              <div class="progress-bar progress-bar-striped" :class="getProgressClass(TauxConsommationDelai(projet))"
                :style="{ width: TauxConsommationDelai(projet) + '%' }" :aria-valuenow="TauxConsommationDelai(projet)">
              </div>
            </div>
            </div>
          </div>
          <div class="col-4">
            <div class="mt-sm-0 mt-2 text-center">
  
              <span class=" fs-16">Etat Projet</span> <br>
              <div class="fs-18">
                <b style="font-size:25px !important">
                  <i v-if="projetEtat(projet) == 2" class="ri-close-circle-fill text-warning" v-tippy="{ content: 'Risque  moderé',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"></i>

                  <i v-if="projetEtat(projet) == 1"
                    class="ri-error-warning-fill text-danger" v-tippy="{ content: 'Risque elevé',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"></i>
                  <i v-if="projetEtat(projet)== 3" class="ri-checkbox-circle-fill text-success" v-tippy="{ content: ' En bonne voie',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"></i>
                </b>
              </div>
  
            </div>
          </div>
          
          </div>
        
        </div>
      </div>
    </div>
  </div>
  <bailleur-modal v-if="showModal" :bailleurs="currentBailleurs" @close="hideBailleurModal" />
  <region-modal v-if="showRegionModals" :regions="currentRegions" @close="hideRegionModal" />
</template>
<script>
import BailleurModal from '@/components/projets/bailleurPopup.vue';
import RegionModal from '@/components/projets/regionsModal.vue';
export default {
  props: ['data'],
  components: {
    BailleurModal,
    RegionModal,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.projetssOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.projetssOptions.slice(startIndex, endIndex);
    },


  },
  data() {
    return {
      GlobalTaux: 0,
      showModal: false,
      currentBailleurs: [],
      showRegionModals: false,
      currentRegions: [],

    }
  },
  mounted() {

  },
  methods: {
    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },
    getRegionNames(regions) {
      return regions.map(region => region.region?.NomRegion).join(', ');
    },
    showBailleurModal(projet) {

      this.currentBailleurs = projet.bailleurs;
      this.showModal = true;
    },
    hideBailleurModal() {
      this.showModal = false;
      this.currentBailleurs = [];
    },
    showRegionModal(projet) {
      this.currentRegions = projet.regions;
      this.showRegionModals = true;
    },
    hideRegionModal() {
      this.showRegionModals = false;
      this.currentRegions = [];
    },
    truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength) + '...';
    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
    },

    getYear(date) {
      // const date = new Date(dateString);
      // const year = date.getFullYear();
      // return year;

      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = String(d.getFullYear())

      return `${day}/${month}/${year}`
    },
    calculateDuration(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let years = end.getFullYear() - start.getFullYear();
      let months = end.getMonth() - start.getMonth();
      let days = end.getDate() - start.getDate();

      if (days < 0) {
        months--;
        const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
        days += prevMonth.getDate();
      }

      if (months < 0) {
        years--;
        months += 12;
      }

      return { years, months };
    },
    projetEtat(projet) {
      // const totalBudget = this.projetBudget(projet);
      // const totalMontantDecaisse = projet.bailleurs.reduce((total, bailleur) => {
      //   return total + parseFloat((bailleur.decaissement && bailleur.decaissement[0] && bailleur.decaissement[0].montant_decaisser) || 0);
      // }, 0);

      // const TotalJours = Math.floor((new Date(projet.DateFin) - new Date(projet.DateDebut)) / (1000 * 60 * 60 * 24));
      // const TotalJoursNewDate = Math.floor((new Date() - new Date(projet.DateDebut)) / (1000 * 60 * 60 * 24));



      // const decaisse = parseFloat(totalMontantDecaisse);
      // const budget = parseFloat(totalBudget);
      // const physique = parseFloat(projet.suivis_dash?.TauxAvancementPhysique ?? 0);
      // const duree = parseFloat(((TotalJoursNewDate / TotalJours) * 100).toFixed(2) )   

          
      //     const Taux_Duree =  parseFloat(duree); // deja en %
      //     const Taux_Financiere = decaisse > 0 && budget > 0 ? ((decaisse / budget) * 100).toFixed(2) : 0
      //     const Taux_Physique =physique > 0 ? physique : 0;
         
      // let GlobalTaux = 0;
  
  // if (
  //       (Taux_Physique >= Taux_Duree && Taux_Physique >= Taux_Financiere) ||
  //       (Taux_Duree - Taux_Physique > 0 && Taux_Duree - Taux_Physique <= 10) ||
  //       ( Taux_Financiere - Taux_Physique  > 0 && Taux_Financiere - Taux_Physique <= 10) ||
  //       ( Taux_Financiere >= 100 && Taux_Financiere < 110)
  //   ) {
  //       GlobalTaux = 3;
  //        //color green step1 
  //   } else if (
  //       (Taux_Duree - Taux_Physique > 25 ) ||
  //      ( Taux_Financiere - Taux_Physique > 25 ) ||
  //       (  Taux_Financiere > 130)
  //   ) {
  //       GlobalTaux = 2; 
  //        // color orange warning step 2
  //   } else if (
  //   (  Taux_Duree - Taux_Physique > 10 &&  Taux_Duree - Taux_Physique <=  25) ||
  //       (Taux_Financiere - Taux_Physique > 10 && Taux_Financiere - Taux_Physique <= 25) ||
  //       (Taux_Financiere > 110 && Taux_Financiere <= 130)
  //   ) {
  //       GlobalTaux = 1;
  //        // color red danger step 3
  //   } else {
  //       GlobalTaux = '';
  //   }
     
  //     return GlobalTaux;



  const TotalJours = Math.floor((new Date(projet.DateFin) - new Date(projet.DateDebut)) / (1000 * 60 * 60 * 24 * 30));
  const TotalJoursNewDate = Math.floor((new Date() - new Date(projet.DateDebut)) / (1000 * 60 * 60 * 24 * 30));
  const duree = parseFloat(((TotalJoursNewDate / TotalJours) * 100).toFixed(2) )   

          
  const Taux_Duree =  parseFloat(duree); // deja en %
  const Taux_Financiere = parseFloat(projet?.suivis[0]?.TauxExecutionFinanciere) 
  const Taux_Physique = parseFloat(projet?.suivis[0]?.TauxAvancementPhysique)
 

  let GlobalTaux = 0;  
  
  if(Taux_Financiere == 0 && Taux_Physique == 0){
    GlobalTaux = 2; 
    // color orange warning step 2
  }else if ( (Taux_Financiere - Taux_Physique <= 15) && (Taux_Duree - Taux_Physique  <= 25) && ( Taux_Financiere  < 150)) {
        GlobalTaux = 3;
         //color green step1 
    } else if ((Taux_Financiere - Taux_Physique <= 25) && (Taux_Duree - Taux_Physique  <= 50) && ( Taux_Financiere  < 150) 
    ) {
        GlobalTaux = 2; 
         // color orange warning step 2
    } else  {
        GlobalTaux = 1;
         // color red danger step 3
    }
    return GlobalTaux;
    },

    TauxConsommationDelai(projet) {

  const TotalJours = Math.floor((new Date(projet.DateFin) - new Date(projet.DateDebut)) / (1000 * 60 * 60 * 24 * 30));
  const TotalJoursNewDate = Math.floor((new Date() - new Date(projet.DateDebut)) / (1000 * 60 * 60 * 24 * 30));
  const duree = parseFloat(((TotalJoursNewDate / TotalJours) * 100).toFixed(2) )   

          
  const Taux_Duree =  parseFloat(duree); // deja en %
  if(Taux_Duree > 0) return Taux_Duree;
  else return 0;
  
 
    },

    formatDuration(startDate, endDate) {
      const duration = this.calculateDuration(startDate, endDate);
      let durationString = '';

      if (duration.years > 0) {
        durationString += `${duration.years} an${duration.years > 1 ? 's' : ''}`;
      }

      if (duration.months > 0) {
        if (durationString) {
          durationString += ' ';
        }
        durationString += `${duration.months} mois`;
      }

      // Si ni années ni mois ne sont affichés, afficher "0 mois"
      if (!durationString) {
        durationString = '0 mois';
      }

      return durationString;
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
    formatBudget(value) {
      return parseFloat(value).toLocaleString(); // Formatage avec séparateurs de milliers
    },
    projetBudget(projet) {
      return projet.bailleurs.reduce((total, bailleur) => total + parseFloat(bailleur.Budget || 0), 0);
    },
    projetTauxDecaissement(projet) {

      const totalBudget = this.projetBudget(projet);
      const totalMontantDecaisse = projet.bailleurs.reduce((total, bailleur) => {
        return total + parseFloat((bailleur.decaissement && bailleur.decaissement[0] && bailleur.decaissement[0].montant_decaisser) || 0);
      }, 0);

      //   const TotalJours = Math.floor((new Date(projet.DateFin) - new Da te(projet.DateDebut))/(1000 * 60 * 60 * 24) )

      //   const TotalJoursNewDate = Math.floor((new Date() - new Date(projet.DateDebut)) /(1000 * 60 * 60 * 24) )

      //   const Taux_Duree = TotalJoursNewDate / TotalJours * 100
      //   const decaisse = parseFloat(totalMontantDecaisse)
      //   const budget = parseFloat(totalBudget)
      //   const physique = parseFloat(projet.suivis_sum_taux_avancement_physique )
      //   if( decaisse > 0 && budget > 0 )    this.GlobalTaux += (decaisse/ budget) * 100

      //   if(physique > 0)  this.GlobalTaux += physique
      //   if(Taux_Duree >  0) this.GlobalTaux += parseFloat(Taux_Duree)
      //   if(this.GlobalTaux > 0) this.GlobalTaux = (this.GlobalTaux / 200) * 100

      if (totalBudget === 0) return 0;
      return (totalMontantDecaisse / totalBudget) * 100;
    },
    getProgressClass(percentage) {
      if (percentage <= 30) {
        return 'bg-danger';
      } else if (percentage <= 75) {
        return 'bg-warning';
      } else {
        return 'bg-success';
      }
    }

  },

}
</script>
<style lang="css" scoped>

</style>