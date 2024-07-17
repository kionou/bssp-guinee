<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div
      class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
    >
      <h1 class="page-title fw-semibold fs-18 mb-0">Profil</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Profil
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Page Header Close -->
    <nav
          class="nav nav-style-6 nav-pills mb-3 nav-justified d-sm-flex d-block"
          role="tablist"
        >
          <a
            class="nav-link active"
            data-bs-toggle="tab"
            role="tab"
            aria-current="page"
            href="#generale"
            aria-selected="false"
            >General</a
          >
          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#password"
            aria-selected="true"
            >Mot de passe </a
          >
          
        </nav>
        <div class="tab-content">
              <div class="tab-pane active text-muted" id="generale" role="tabpanel">
              <General></General>
              </div>
              <div class="tab-pane text-muted" id="password" role="tabpanel">
                <Password></Password>
                
              </div>
              
          </div>
  </div>
     
  </template>
  
  <script>

  import Loading from '@/components/others/loading.vue';
  import General from '../../components/profil/general.vue';
  import Password from '../../components/profil/password.vue';
 
    
  export default {
    components: {
     
      Loading,
      General,
      Password,
     
    },
    data() {
      return {
        loading: false,
        data:""
      
       
      }
    },
    computed: {
      loggedInUser() {
        return this.$store.getters['auth/myAuthenticatedUser'];
      },
     
    },
    async mounted() {
      console.log("uusers", this.loggedInUser);
      
      
    },
    methods: {
     
    }
  }
  </script>
  
  <style lang="" scoped>
    /* Ajoutez vos styles ici si nécessaire */
  </style>
  