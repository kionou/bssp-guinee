<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div
      class="d-md-flex pt-12  d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
    >
      <h1 class="page-title fw-semibold fs-18 mb-0">Infrastructures</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Infrastructures
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Page Header Close --> 
<!-- 
    <div class="contact-header mb-3 py-2 px-1">
        <div class="d-sm-flex d-block align-items-center justify-content-between">
          <div class="h5 fw-semibold mb-0"></div>
          <div class="d-flex mt-sm-0 mt-2 align-items-center">
            <div class="input-group">
              <input
                type="text"
                class="form-control bg-light border-0"
                placeholder="Recherchez..."
                aria-describedby="search-member"
                v-model="control"
                @input="filterByName"
              />
              <button class="btn btn-light" type="button" id="search-contact-member" >
              
                <i class="ri-search-line text-muted"></i>
              </button>
            </div>
  
            <div class="btn btn-icon btn-primary ms-2" @click="$router.push({ path: '/bspp/ajouter-projets' })">
              <i class="ri-add-line"> </i>
            </div>
          </div>
        </div>
      </div> -->
      <div class="row">
                    <div class="col-xl-12">
                        <div class="card custom-card">
                            <div class="card-header justify-content-between">
                                <div class="card-title">
                                    Liste des infrastructures
                                </div>
                                <div class="d-flex flex-wrap">
                                    <div class="me-3 my-1">
                                        <input
                                        type="text"
                                        class="form-control bg-light border-0"
                                        placeholder="Recherchez..."
                                        aria-describedby="search-member"
                                        v-model="control"
                                        @input="filterByName"
                                    />
                                    </div>
                                    <div class="btn btn-icon btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#create-infrastructure">
                                    <i class="ri-add-line"> </i>
                                    </div>
                                  
                                </div>
                            </div>
                            <div class="card-body">
                                <div style="overflow-x: scroll !important" class="table-responsive">
                                    <table class="table text-nowrap table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Code</th>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Date debut</th>
                                                <th scope="col">date fin</th>
                                                <th scope="col">Maitre ouvrage</th>
                                                <th scope="col">Etat</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center lh-1">
                                                        <div class="me-2">
                                                            <span class="avatar avatar-xs">
                                                                <img src="@/assets/img/logo_mobile.png" alt="">
                                                            </span>
                                                        </div>
                                                        <div>Ray Optics &amp; Optical Fibre Master Class</div>
                                                    </div>
                                                </td>
                                                <td class="text-warning">
                                                    29-05-2023
                                                </td>
                                                <td style="color:red">
                                                    29-05-2023
                                                </td>
                                                <td>
                                                    Ministère des Travaux Publics
                                                </td>
                                                <td>
                                                   mauvais
                                                </td>
                                               
                                                <td>
                                                    <div class="hstack gap-2 fs-1">
                                                        <router-link to="/bspp/detail-infrastructures"  class="btn btn-icon btn-sm btn-primary-light btn-wave waves-effect "><i class="ri-eye-line"></i></router-link> 
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-info btn-wave waves-effect "><i class="ri-edit-line"></i></a>
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger btn-wave waves-effect waves-light"><i class="ri-delete-bin-line"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    2
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center lh-1">
                                                        <div class="me-2">
                                                            <span class="avatar avatar-xs">
                                                                <img src="@/assets/img/logo_mobile.png" alt="">
                                                            </span>
                                                        </div>
                                                        <div>Master Linear Alzebra Medium Level</div>
                                                    </div>
                                                </td>
                                                <td class="text-warning">
                                                    11-06-2023
                                                </td>
                                                <td style="color:red">
                                                    11-06-2023
                                                </td>
                                                <td>
                                                    Bamba moussa
                                                </td>
                                                <td>
                                                    bon
                                                </td>
                                                <td>
                                                    <div class="hstack gap-2 fs-1">
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-info-light btn-wave waves-effect waves-light"><i class="ri-edit-line"></i></a>
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger-light btn-wave waves-effect waves-light"><i class="ri-delete-bin-line"></i></a>
                                                    </div>
                                                </td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex flex-wrap align-items-center">
                                  
                                    <div class="ms-auto">
                                        <nav aria-label="Page navigation" class="pagination-style-4">
                                            <ul class="pagination mb-0">
                                                <li class="page-item disabled">
                                                    <a class="page-link" href="javascript:void(0);">
                                                        Prev
                                                    </a>
                                                </li>
                                                <li class="page-item active"><a class="page-link" href="javascript:void(0);">1</a></li>
                                                <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
                                                <li class="page-item">
                                                    <a class="page-link text-primary" href="javascript:void(0);">
                                                        next
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>

            <!-- Start:: Create infrastructure -->
       <div class="modal fade" id="create-infrastructure" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered  modal-lg">
                        <div class="modal-content">
                            <div class="modal-header fs-15 " style="background-color: var(--primary-color); color:white">
                                <h6 class="modal-title text-white">Creer une infrastructure</h6>
                               
                            </div>
                            <div class="modal-body px-4">
                                <div class="row gy-3" style=" text-align: justify;">
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Code">Code<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.code" color="info" name="code" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.code.$error">{{ v$.step1.code.$errors[0].$message}}</small>
                                        <small v-if="resultError['code']"> {{ resultError["code"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Sigle">Sigle<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.sigle" color="info" name="sigle" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.sigle.$error">{{ v$.step1.sigle.$errors[0].$message}}</small>
                                        <small v-if="resultError['sigle']"> {{ resultError["sigle"] }} </small>
                                    </div>
                                    
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Nom">Nom<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.nom" color="info" name="nom" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.nom.$error">{{ v$.step1.nom.$errors[0].$message}}</small>
                                        <small v-if="resultError['nom']"> {{ resultError["nom"] }} </small>

                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                    <label for="date_start">Date de debut<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.date_start"   color="info" name="date_start" size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step1.date_start.$error">{{ v$.step1.date_start.$errors[0].$message}}</small>
                                        <small v-if="resultError['date_start']"> {{ resultError["date_start"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="date_end">Date fin<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.date_end"  :min="step1.date_end" color="info" name="date_end" size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step1.date_end.$error">{{ v$.step1.date_start.$errors[0].$message}}</small>
                                        <small v-if="resultError['date_end']"> {{ resultError["date_end"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Visibilite">Visibilite<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step1.visible" color="info" name="visible" size="sm" rounded-size="sm" :options="Options" />
                                        <small v-if="v$.step1.visible.$error">{{ v$.step1.visible.$errors[0].$message}}</small>
                                        <small v-if="resultError['visible']"> {{ resultError["visible"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Logo">Logo<span class="text-danger">*</span></label>
                                        <input type="file" class="form-control" id="contact-mail" @change="handleFileUploadLogo"  accept="image/*" >
                                        <small v-if="v$.step1.logo.$error">{{ v$.step1.logo.$errors[0].$message}}</small>
                                        <small v-if="resultError['logo']"> {{ resultError["logo"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="projet_id">liste des projets<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step1.projet_id" color="info" name="projet_id" size="sm" rounded-size="sm" :options="Options" search />
                                        <small v-if="v$.step1.projet_id.$error">{{ v$.step1.projet_id.$errors[0].$message}}</small>
                                        <small v-if="resultError['projet_id']"> {{ resultError["projet_id"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="infrastructure_id">type d'infrastructure<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step1.infrastructure_id" color="info" name="infrastructure_id" size="sm" rounded-size="sm" :options="Options" search />
                                        <small v-if="v$.step1.infrastructure_id.$error">{{ v$.step1.infrastructure_id.$errors[0].$message}}</small>
                                        <small v-if="resultError['infrastructure_id']"> {{ resultError["infrastructure_id"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="MaitreOuvrage">Maître d'ouvrage<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.MaitreOuvrage" color="info" name="MaitreOuvrage" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.MaitreOuvrage.$error">{{ v$.step1.MaitreOuvrage.$errors[0].$message}}</small>
                                        <small v-if="resultError['MaitreOuvrage']"> {{ resultError["MaitreOuvrage"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="EntrepriseResponsable">Entreprise Responsable<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.EntrepriseResponsable" color="info" name="EntrepriseResponsable" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.EntrepriseResponsable.$error">{{ v$.step1.EntrepriseResponsable.$errors[0].$message}}</small>
                                        <small v-if="resultError['EntrepriseResponsable']"> {{ resultError["EntrepriseResponsable"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Localité">Localité<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step1.LocaliteConcernees" color="info" name="LocaliteConcernees" size="sm" rounded-size="sm" :options="OptionsRegions" />
                                        <small v-if="v$.step1.LocaliteConcernees.$error">{{ v$.step1.LocaliteConcernees.$errors[0].$message}}</small>
                                        <small v-if="resultError['LocaliteConcernees']"> {{ resultError["LocaliteConcernees"] }} </small>

                                    </div>
                                    <div class="col-xl-12 text-center pt-1">
                                        <button type="button" class="btn btn-primary" @click="submitInfrastructure()">Valider</button>

                                    </div>
                                   
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger"
                                    data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
         </div>
                <!-- End:: Create infrastructure -->
    </div>
</template>
<script>
 import useVuelidate from "@vuelidate/core";
 import { require, lgmin, lgmax, ValidNumeri } from "@/functions/rules";
 import { useToast } from "vue-toastification";
 import Loading from '@/components/others/loading.vue';
 import axios from '@/lib/axiosConfig.js'
 import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
 import Swal from 'sweetalert2'
export default {
    name: "ComponentlisteInfra",
   setup() {
  const toast = useToast();
  return { toast }
},
   components: { Loading , MazPhoneNumberInput},
   computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
   
  
  },
   data() {
     return {
       
       loading: false,
       error: "",
       resultError: {}, 
       v$: useVuelidate(),
       step1: {
           code: "",
           sigle: "",
           nom: "",
           date_start:"",
           date_end: "",
           visible: "",
           logo: "",
           projet_id:"",
           infrastructure_id:"",
           MaitreOuvrage:"",
           EntrepriseResponsable:"",
           LocaliteConcernees:"",
               
     },
    
      
     };
   },
   validations: {
     step1: {
         code: {require},
           sigle: {require},
           nom: {require},
           date_start:{require},
           date_end: {require},
           visible: {require},
           logo: {require},
           projet_id:{require},
           infrastructure_id:{require},
           MaitreOuvrage:{require},
           EntrepriseResponsable:{require},
           LocaliteConcernees:{require},
              
         }
       },
         
   mounted() {
      
   }, 
   methods: {
    handleFileUploadLogo(event) {
    console.log("File input change");
    const file = event.target.files[0];
    console.log("handleFileUploadLogo Selected file:", file);
      this.step1.logo = file

  },
    async submitInfrastructure(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        const formData = new FormData();
        formData.append("FileNif",  this.step1.code);
        formData.append("FileNif",  this.step1.sigle);
        formData.append("FileNif",  this.step1.nom);

        formData.append("FileNif",  this.step1.date_start);
        formData.append("FileNif",  this.step1.date_end);
        formData.append("FileNif",  this.step1.visible);

        formData.append("FileNif",  this.step1.logo);
        formData.append("FileNif",  this.step1.projet_id);
        formData.append("FileNif",  this.step1.infrastructure_id);

        formData.append("FileNif",  this.step1.MaitreOuvrage);
        formData.append("FileNif",  this.step1.EntrepriseResponsable);
        formData.append("FileNif",  this.step1.LocaliteConcernees);

        formData.append("FileNif",  this.step1.TauxAvancementTech);
        formData.append("FileNif",  this.step1.TauxDecaissement);
        formData.append("FileNif",  this.step1.MontantDecaisse);

        formData.append("FileNif",  this.step1.Trimestre);
        formData.append("FileNif",  this.step1.DateSuiv);
        formData.append("FileNif",  this.step1.Difficultes);

 

        // try {
        //   const response = await axios.post("/clients", data, {
        //     headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,
           
        //   }
        //   });
        //   console.log("Réponse du téléversement :", response);
        //   if (response.data.status === "success") {
        //     this.closeModal(modalId);
        //     this.successmsg(
        //       "Client Created Successfully",
        //       " The new client has been successfully created!"
        //     );
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

    async formatValidationErrors(errors) {
     const formattedErrors = {};

     for (const field in errors) {
       const errorMessages = errors[field]; // Liste complète des messages d'erreur
      

       const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
       

       formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
     }

     this.resultError = formattedErrors; // Stockez les erreurs dans un objet

     // Maintenant, this.resultError est un objet où les clés sont les noms des champs
   
     for (let key in this.resultError) {
 if (this.resultError.hasOwnProperty(key)) {
   // Construire le message d'erreur avec le nom du champ (clé) et son message (valeur)
   let errorMessage = `${key}: ${this.resultError[key]}`;
   // Afficher le toast pour chaque erreur
   this.triggerToast(errorMessage);
 }
}
   },
   triggerToast(errorMessage) {
   this.toast.error(errorMessage, {
   position: "top-right",
   timeout: 5000,
   closeOnClick: true,
   pauseOnFocusLoss: true,
   pauseOnHover: true,
   draggable: true,
   draggablePercent: 0.6,
   showCloseButtonOnHover: false,
   hideProgressBar: true,
   closeButton: "button",
   icon: "mdi mdi-alert-circle-outline", // Modifier l'icône pour une icône d'erreur
   rtl: false,
   className: 'toast-error'
 });
},
   },
}
</script>
<style lang="css" scoped>
    
</style>