<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="d-md-flex d-block  pt-12 align-items-center justify-content-between my-4 page-header-breadcrumb">
      <h1 class="page-title fw-semibold fs-18 mb-0">Tableau de bord</h1>
     
      <div class=" row  w-50">

        <div class="col-9">
          <div class=" position-relative">
           
            <MazSelect label="" multiple v-model="selectprojet" color="info" no-radius :options="ProjetsOptions" size="sm" search></MazSelect>
          </div>
        </div>
        <div class="col-3" >
           
            <button class="btn btn-primary" style="margin-top:0px !important" @click="handleProjetChange()">Valider</button>
           
        </div>
      </div>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Tableau de bord
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Page Header Close -->

    <!-- <div class=" row align-items-center">

        <div class="col-10">
          <div class="mb-3 position-relative">
            <label for="userpassword">Liste des projets</label>
            <MazSelect label="" multiple v-model="selectprojet" color="info" no-radius :options="ProjetsOptions" search></MazSelect>
          </div>
        </div>
        <div class="col-2" >
            <div class="boutton">
            <button class="" style="margin-top:12px !important" @click="handleProjetChange()">Valider</button>
            </div>
        </div>
      </div> -->
         <!-- Start::row-1 -->
         <div v-if="data.length === 0" class="noresul">
        <span> Vous n'avez pas encore de projet  !! </span>
      </div>
         <div class="" v-else >
          <ProjetCard :data="data"></ProjetCard>
           
                   
                 
                </div>
                <!--End::row-1 -->

                <bailleur-modal v-if="showModal" :bailleurs="currentBailleurs" @close="hideBailleurModal" />
                <region-modal v-if="showRegionModals" :regions="currentRegions" @close="hideRegionModal" />
    </div>
</template>
<script>
 
  import Pag from "@/components/others/pagination.vue";
  import Loading from "@/components/others/loading.vue";
  import axios from "@/lib/axiosConfig";
  import useVuelidate from "@vuelidate/core";
  import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
  import { successmsg } from "@/lib/modal.js";
  import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
  import Swal from "sweetalert2";
  import BailleurModal from '@/components/projets/bailleurPopup.vue';
  import RegionModal from '@/components/projets/regionsModal.vue';
 import ProjetCard from '@/components/projets/ProjetCard.vue';
  export default {
    components: {
      Loading,
      Pag,
      MazPhoneNumberInput,
      BailleurModal,
      RegionModal,
      ProjetCard
 
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
    connect() {
    if (!this.loggedInUser) {
      return null; // Retourne une valeur par défaut tant que `loggedInUser` n'est pas défini
    }
    return this.loggedInUser.user_role === 10 ? 0 : 1;
  }
     
    },
    watch: {
  loggedInUser(newUser) {
    if (newUser) {
      console.log('connect', this.connect, typeof(this.connect));
      this.fetchProjets(); // Appeler l'action lorsque `loggedInUser` est chargé
    }
  }
},
    data() {
      return {
        loading: true,
        data: [],
        search: "",
        currentPage: 1,
        itemsPerPage: 12,
        totalPageArray: [], 
        ProjetsOptions:[], 
        resultError: {},
        showModal: false,
        currentBailleurs: [],
        showRegionModals: false,
        currentRegions: [],
        selectprojet:[],
        GlobalTaux:0,
    
     
      };
    },
  
    async mounted() {
      console.log('projet',this.loggedInUser)
      console.log('connect', this.connect, typeof(this.connect));
       await this.fetchProjets()


      var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
  localStorage.removeItem('activeTab');
      
     
    },
  
    methods: {
      successmsg: successmsg,
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

 
      async fetchProjets() {
      try {
       
        const response = await axios.get('/projets', {
          headers: { Authorization: `Bearer ${this.loggedInUser.token}`, },
          params:{
            for_con_user:this.connect,
            visible: 1

           }
        });
        console.log('projet ',response)
        const ProjetsData =  response.data.data
        // this.selectprojet =[]
        // this.Allprojets = []
     const ProjetsOptions =   ProjetsData.map(projet => ({
            label: projet.Sigle,
            value: projet.Sigle,
          }));
          this.ProjetsOptions = ProjetsOptions
          this.Allprojets = ProjetsData
       
        this.selectprojet = ProjetsData.slice(-6).map(projet => projet.Sigle);
        this.data = ProjetsData.slice(-6); 

        this.loading = false;

      } catch (error) {
        console.error('errorqqqqq', error);

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");  //a revoir
        }
      }
    },
    handleProjetChange() {
  // Mettez à jour la liste des projets affichés en fonction des sigles sélectionnés
  this.data = this.Allprojets.filter(projet => 
    this.selectprojet.includes(projet.Sigle)
  );

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
    const day =String(d.getDate()).padStart(2 , '0')
    const month =String(d.getMonth() + 1).padStart(2 , '0')
    const year =String(d.getFullYear()) 
    
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

      const Difference = new Date(projet.DateFin) - new Date(projet.DateDebut)
      const TotalJours = Math.floor(Difference/(1000 * 60 * 60 * 24) )
      
      const DifferenceNewDate = new Date() - new Date(projet.DateDebut)
      const TotalJoursNewDate = Math.floor(DifferenceNewDate /(1000 * 60 * 60 * 24) )

      const Taux_Duree = TotalJoursNewDate / TotalJours * 100
      if( parseFloat(totalMontantDecaisse) > 0 && parseFloat(totalBudget)  >0) {
        this.GlobalTaux += parseFloat( ((parseFloat(totalMontantDecaisse )/ parseFloat(totalBudget)) * 100)) 
      }
      if(parseFloat(projet.suivis_sum_taux_avancement_physique )> 0){
        this.GlobalTaux += parseFloat(projet.suivis_sum_taux_avancement_physique) 
      }
      // if(Taux_Duree > 0){
      //   this.GlobalTaux += parseFloat(Taux_Duree) 

      // }
      if(this.GlobalTaux > 0){
       this.GlobalTaux = this.GlobalTaux / 200 * 100
      }

      // this.GlobalTaux += ( + projet.suivis_sum_taux_avancement_physique + Taux_Duree) / 300 * 100

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
   
  };
  </script>
  <style lang="css" scoped>

.custom-tooltip .tooltip-inner {
  background-color: #ff5733; /* Changer la couleur de fond */
  color: #ffffff; /* Changer la couleur du texte */
}

.custom-tooltip .tooltip-arrow {
  border-top-color: #ff5733; /* Changer la couleur de la flèche */
}
</style>