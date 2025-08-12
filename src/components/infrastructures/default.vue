<template >
    <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>

        
      <!-- Start::row-1 -->
      <div class="">
        <div class="card-body">
          <div class="card m-0">
            <div class="card-header">
              <div class="row">
                <div class="col-12">
                  <h4 class="fw-semibold fs-20 mb-0 d-flex align-items-center "> {{data.NomInfrastructure}} <span
                      style="color:red"> ({{data.CodeInfrastructure}})</span> </h4>
                </div>
               
              </div>
  
  
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1"><i class="bi bi-person me-2 fs-14"></i>Maître d'ouvrage : <span
                      class="fw-semibold fs-16" data-bs-toggle="tooltip"
                      title="Current Salary">{{data.MaitreOuvrage}}</span> </div>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1"><i class="bi bi-geo-alt me-2 fs-14"></i>Localité : <span class="fw-semibold  fs-16"
                      data-bs-toggle="tooltip" title="Current Salary">{{data.LocalitesConcernees}}</span> </div>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1"><i class="bi bi-bricks me-2 fs-14"></i>Entreprise de travaux: <span
                      class="fw-semibold fs-16" data-bs-toggle="tooltip" title="Current Salary">
                      {{data.responsable?.NomMission}}</span> </div>
  
                </div>
              </div>
              <div class="row">
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Date début prévue : <span
                      class="fw-semibold text-warning fs-16" data-bs-toggle="tooltip"
                      title="Current Salary">{{formatDate(data.DateDebut) }}</span> </div>
  
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Date fin prévue : <span
                      class="fw-semibold text-warning fs-16" data-bs-toggle="tooltip"
                      title="Current Salary">{{formatDate(data.DateFin) }}</span> </div>
                </div>
  
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Durée prévue : <span
                      class="fw-semibold fs-16" data-bs-toggle="tooltip" title="Current Salary"
                      style="color:red">{{tempsEcoule(data.DateDebut , data.DateFin) }}</span> </div>
                </div>
  
              </div>
              <div class="row">
                <div class="col-xxl-7 col-xl-7 col-lg-7 col-md-6 col-sm-12">
                  <div class="mt-1 fs-17"><i class="bi bi-x-diamond me-2 fs-16"></i>Type d'infrastructure
                    : <span class="fw-semibold" data-bs-toggle="tooltip"
                      title="Current Salary">{{data.type?.Intitule}}</span> </div>
  
                </div>
               
                <div class="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-6">
                  <div class="mt-1 fs-17"><i class="bi bi-bank me-2 fs-16"></i>Coût infrastructure : <span
                      class="fw-semibold" data-bs-toggle="tooltip" title="Current Salary">
                      {{ formatBudget(data.Cost) ?? "-"
  
                      }}
                    </span> </div>
  
                </div>
                <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-6 col-sm-12">
                  <div class="mt-1 fs-16"><i class="bi bi-bullseye me-2 fs-16"></i>Bureau de contrôle :
                    <span
                      class="fw-semibold" data-bs-toggle="tooltip" title="Current Salary">
                      {{ data.bureau?.NomMission ?? "-" }} </span> 
                  </div>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div class="mt-1 fs-16"><i class="bi bi-eye me-2 fs-16"></i>Visibilité :
                    <span v-if="data.Visible ==='1'" class="fw-semibold badge rounded-pill bg-success"
                      data-bs-toggle="tooltip" title="Current Salary">Actif</span>
                    <span v-else class="fw-semibold badge rounded-pill bg-danger" data-bs-toggle="tooltip"
                      title="Current Salary">Inactif</span>
                  </div>
                </div>
              </div>
              <div class="card-titre mt-3 fw-semibold">
                Information sur le projet :
  
              </div>
              <hr class="m-0">
              <div class="row">
                <div class="col-12">
                  <p><span class=" fs-20">Nom projet : </span><span class="  fs-15 fw-bolder"> {{
                      data.projet?.NomProjet }}</span> </p>
  
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <p><span class=" fs-20">Date debut : </span> <span class="fs-15 fw-semibold text-warning">{{
                      formatDate(data.projet?.DateDebut)}}</span> </p>
  
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <p><span class=" fs-20">Date fin : </span><span class="fs-15 fw-semibold text-warning">{{
                      formatDate(data.projet?.DateFin)
                      }}</span></p>
  
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <p><span class=" fs-20">Durée : </span><span class="fs-15 fw-semibold" style="color:red">{{
                      tempsEcoule(data.projet?.DateDebut , data.projet?.DateFin) }}</span></p>
  
                </div>
              </div>
            </div>
            <div class="card-body">
            
            </div>
          </div>
         
        </div>
      </div>
  
      <!--End::row-1 -->

    
    </div>
</template>
<script>
import Loading from '@/components/others/loading.vue';

export default {
    props: {
    infrastructureData: {
      type: Object,
      required: true,
    },
  },
    components: { Loading},
    watch: {
        infrastructureData: {
      handler(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
         this.data = newVal
         this.loading = false
        }
      },
      immediate: false,
    },
  },
  data() {
    return {
        data:"",
        loading: true,
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
    },
    tempsEcoule(a, b) {
      const dateDebut = new Date(a);
      const dateFin = new Date(b);

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
    formatBudget(budget) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'GNF',
        minimumFractionDigits: 0
      }).format(budget);
    },
  },
    
}
</script>
<style lang="">
    
</style>