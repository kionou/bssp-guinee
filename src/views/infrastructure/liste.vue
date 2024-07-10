<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div
      class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
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
                                <div class="table-responsive">
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

            <!-- Start:: Create suivi -->
       <div class="modal fade" id="create-infrastructure" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered  modal-lg">
                        <div class="modal-content">
                            <div class="modal-header fs-15 " style="background-color: var(--primary-color); color:white">
                                <h6 class="modal-title text-white">Creer une infrastructure</h6>
                               
                            </div>
                            <div class="modal-body px-4">
                                <div class="row gy-3">
                                    <div class="col-xl-4">
                                        <label for="contact-mail" class="form-label">Code</label>
                                        <input type="text" class="form-control" id="contact-mail" v-model="step1.code" placeholder="00170">
                                        <small v-if="v$.step1.code.$error">{{ v$.step1.code.$errors[0].$message}}</small>
                                        <small v-if="resultError['code']"> {{ resultError["code"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">Sigle</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="infras1" v-model="step1.sigle">
                                        <small v-if="v$.step1.sigle.$error">{{ v$.step1.sigle.$errors[0].$message}}</small>
                                        <small v-if="resultError['sigle']"> {{ resultError["sigle"] }} </small>
                                    </div>
                                    
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">Nom</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="Infrastructure 1" v-model="step1.nom">
                                        <small v-if="v$.step1.nom.$error">{{ v$.step1.nom.$errors[0].$message}}</small>
                                        <small v-if="resultError['nom']"> {{ resultError["nom"] }} </small>

                                    </div>
                                    <div class="col-xl-4">
                                    <label for="contact-mail" class="form-label">Date de debut</label>
                                        <input type="date" class="form-control" id="contact-mail" v-model="step1.date_start" >
                                        <small v-if="v$.step1.date_start.$error">{{ v$.step1.date_start.$errors[0].$message}}</small>
                                        <small v-if="resultError['date_start']"> {{ resultError["date_start"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">Date fin</label>
                                        <input class="form-control" type="date" id="input-file" v-model="step1.date_end"  :min="step1.date_start">
                                        <small v-if="v$.step1.date_end.$error">{{ v$.step1.date_end.$errors[0].$message}}</small>
                                        <small v-if="resultError['date_end']"> {{ resultError["date_end"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">Visibilite</label>
                                        <select class="form-control" data-trigger name="choices-single-default" id="choices-single-default" v-model="step1.visible">
                                            <option value="etat"></option>
                                            <option value="Choice 1">Oui</option>
                                            <option value="Choice 2">Non</option>
                                        </select>
                                        <small v-if="v$.step1.visible.$error">{{ v$.step1.visible.$errors[0].$message}}</small>
                                        <small v-if="resultError['visible']"> {{ resultError["visible"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-mail" class="form-label">Logo</label>
                                        <input type="file" class="form-control" id="contact-mail" @change="handleFileUploadLogo"  accept="image/*" >
                                        <small v-if="v$.step1.logo.$error">{{ v$.step1.logo.$errors[0].$message}}</small>
                                        <small v-if="resultError['logo']"> {{ resultError["logo"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">projet</label>
                                        <select class="form-control" data-trigger name="choices-single-default" id="choices-single-default" v-model="step1.projet_id">
                                            <option value="etat"></option>
                                            <option value="Choice 1">Oui</option>
                                            <option value="Choice 2">Non</option>
                                        </select>
                                        <small v-if="v$.step1.projet_id.$error">{{ v$.step1.projet_id.$errors[0].$message}}</small>
                                        <small v-if="resultError['projet_id']"> {{ resultError["projet_id"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">type d'infrastructure</label>
                                        <select class="form-control" data-trigger name="choices-single-default" id="choices-single-default" v-model="step1.infrastructure_id">
                                            <option value="">selectionner le type</option>
                                            <option value="Choice 1">Oui</option>
                                            <option value="Choice 2">Non</option>
                                        </select>
                                        <small v-if="v$.step1.infrastructure_id.$error">{{ v$.step1.infrastructure_id.$errors[0].$message}}</small>
                                        <small v-if="resultError['infrastructure_id']"> {{ resultError["infrastructure_id"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-mail" class="form-label">Maitre d'ouvrage</label>
                                        <input type="text" class="form-control" id="contact-mail" placeholder="exemple" v-model="step1.MaitreOuvrage">
                                        <small v-if="v$.step1.MaitreOuvrage.$error">{{ v$.step1.MaitreOuvrage.$errors[0].$message}}</small>
                                        <small v-if="resultError['MaitreOuvrage']"> {{ resultError["MaitreOuvrage"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">Entreprise Responsable</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="exemple" v-model="step1.EntrepriseResponsable">
                                        <small v-if="v$.step1.EntrepriseResponsable.$error">{{ v$.step1.EntrepriseResponsable.$errors[0].$message}}</small>
                                        <small v-if="resultError['EntrepriseResponsable']"> {{ resultError["EntrepriseResponsable"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">Localites</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="exemple 1" v-model="step1.LocaliteConcernees">
                                        <small v-if="v$.step1.LocaliteConcernees.$error">{{ v$.step1.LocaliteConcernees.$errors[0].$message}}</small>
                                        <small v-if="resultError['LocaliteConcernees']"> {{ resultError["LocaliteConcernees"] }} </small>

                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-mail" class="form-label">Taux Avancement Technique</label>
                                        <input type="text" class="form-control" id="contact-mail" placeholder="exemple" v-model="step1.TauxAvancementTech">
                                        <small v-if="v$.step1.TauxAvancementTech.$error">{{ v$.step1.TauxAvancementTech.$errors[0].$message}}</small>
                                        <small v-if="resultError['TauxAvancementTech']"> {{ resultError["TauxAvancementTech"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">Taux Decaissement</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="exemple" v-model="step1.TauxDecaissement">
                                        <small v-if="v$.step1.TauxDecaissement.$error">{{ v$.step1.TauxDecaissement.$errors[0].$message}}</small>
                                        <small v-if="resultError['TauxDecaissement']"> {{ resultError["TauxDecaissement"] }} </small>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">Montant Decaisse</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="exemple 1" v-model="step1.MontantDecaisse">
                                        <small v-if="v$.step1.MontantDecaisse.$error">{{ v$.step1.MontantDecaisse.$errors[0].$message}}</small>
                                        <small v-if="resultError['MontantDecaisse']"> {{ resultError["MontantDecaisse"] }} </small>

                                    </div>
                                    <div class="col-xl-6">
                                        <label for="contact-mail" class="form-label">Trimestre</label>
                                        <input type="text" class="form-control" id="contact-mail" placeholder="exemple" v-model="step1.Trimestre">
                                        <small v-if="v$.step1.Trimestre.$error">{{ v$.step1.Trimestre.$errors[0].$message}}</small>
                                        <small v-if="resultError['Trimestre']"> {{ resultError["Trimestre"] }} </small>
                                    </div>
                                    <div class="col-xl-6">
                                        <label for="deal-title" class="form-label">Date suivi</label>
                                        <input class="form-control" type="date" id="input-file" placeholder="exemple" v-model="step1.DateSuiv">
                                        <small v-if="v$.step1.DateSuiv.$error">{{ v$.step1.DateSuiv.$errors[0].$message}}</small>
                                        <small v-if="resultError['DateSuiv']"> {{ resultError["DateSuiv"] }} </small>
                                    </div>
                                    <div class="col-xl-12">
                                        <label for="contact-lead-score" class="form-label">Difficultes</label>
                                        <textarea class="form-control" id="text-area" rows="3" v-model="step1.Difficultes"></textarea>
                                        <small v-if="v$.step1.Difficultes.$error">{{ v$.step1.Difficultes.$errors[0].$message}}</small>
                                        <small v-if="resultError['Difficultes']"> {{ resultError["Difficultes"] }} </small>

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
                <!-- End:: Create Contact -->
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
           TauxAvancementTech:"",
           TauxDecaissement:"",
           Trimestre:"",
           DateSuiv:"",
           Difficultes:"",       
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
           TauxAvancementTech:{require},
           TauxDecaissement:{require},
           MontantDecaisse:{require},
           Trimestre:{require},
           DateSuiv:{require},
           Difficultes:{require},     
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