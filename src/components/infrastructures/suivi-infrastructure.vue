<template >
    <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>

        
      <!-- Start::row-1 -->
      <div class="row">
        <div class="col-xl-12">
          <div class="card custom-card overflow-hidden">
  
            <div class="contact-header py-2 px-1">
              <div class="d-sm-flex d-block align-items-center justify-content-between">
  
                <div class="fs-16 fw-semibold mb-0 text-primary ">{{data.NomProjet}}</div>
                <div class="d-flex mt-sm-0 mt-2 align-items-center">
                  <div class="input-group">
                    <input type="text" class="form-control bg-light border-0" placeholder="Recherchez..."
                      aria-describedby="search-member" v-model="search" @input="filterByName" />
                    <button class="btn btn-light" type="button" id="search-contact-member">
                      <i class="ri-search-line text-muted"></i>
                    </button>
                  </div>
  
                  <button v-if="hasPermission(3)" class="btn  btn-primary ms-2" data-bs-placement="top"
                    v-tippy="{ content: 'Créer un nouvel élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                    data-bs-title="Add Contact" data-bs-toggle="modal" data-bs-target="#create-suivi">
                    <i class="ri-add-line"> suivi </i>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div v-if="paginatedItems.length === 0" class="noresul">
                <span> Vous n'avez pas encore de suivi, vous pouvez également en ajouter un !! </span>
              </div>
  
              <div style="overflow-x: scroll !important" class="table-responsive" v-else>
                <table class="table  table-bordered table-striped">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">N°</th>
                      <th scope="col">Date suivi</th>
                      <th scope="col" class="text-center">Niv. d'Avance.</th>
                      <th scope="col" class="text-center">Taux Exc. Fina.</th>
                      <th scope="col">Mont. Décaiss.</th>
                      <th scope="col" class="text-center">Taux Av. Tech.</th>
                      <th scope="col">Difficultes</th>
                      <th scope="col">Images</th>
                      <th scope="col">Videos</th>
                      <th scope="col" v-if="hasPermission(6)">Etat</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(suivi , index) in paginatedItems" :key="suivi.id">
                      <th scope="row" class="ps-4" style="width: 60px;"> {{index + 1}}</th>
                      <td>
                        <div class="d-flex align-items-center lh-1">
  
                          <div style="color:red ; width: 85px" >{{ formatDate(suivi.DateSuivi) }}</div>
                        </div>
                      </td>
                      <td  class="" v-html="suivi.NiveauAvancement"></td>
                      <td  class="text-center">{{suivi.TauxExecutionFinanciere}}</td>
                      <td class="text-center"  style="width: 100px;">{{ formatBudget(suivi.MontantDecaisser) }}</td>
                      <td style="width: 100px;" class="text-center">{{suivi.TauxAvancementTechnique}}</td>
                      <td v-html="suivi.Difficultes"></td>
                      <!-- <td>
                        {{suivi.Trimestre}}
                         
                      </td> -->
                      <td class="text-center"  style="width: 80px;">
                        <button v-if="suivi.Photos" @click="openGallery(suivi.Photos)" class="btn btn-primary btn-sm"
                         v-tippy="{ content: 'Afficher les images',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                        >
                          <i class="bi bi-card-image"></i>
                        </button>
                        <span v-else>Aucune image</span>
                      </td>
                      <td  style="width: 80px;">
                        <button v-if="suivi.videos" @click="openVideo(suivi.videos)"
                          v-tippy="{ content: 'Afficher les vidéos',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                          class="btn btn-primary btn-sm text-center">
                          <i class="bi bi-play-btn"></i>
                        </button>
                        <span v-else>Aucune vidéo</span>
                      </td>
                      <td style="width:125px" v-if="hasPermission(6)" >
                        <button class="btn " :class=" suivi?.Validated == '1' ? 'bg-success' : 'bg-danger'" :disabled="suivi?.Validated == '1'" style=" color:white" @click="validateSelection(suivi?.id)">
                        <i class="bi bi-check2-circle"></i>
                        {{ suivi?.Validated == '1' ? 'Valider' : 'Non Valider' }}
                      </button>
                      </td>
  
                      <td style="width: 80px;">
                        <div class="hstack gap-2 fs-1">
  
                          <div v-if="hasPermission(2)" class="btn btn-icon btn-sm btn-info btn-wave waves-effect "
                            v-tippy="{ content: 'Modifier l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                            data-bs-toggle="modal" data-bs-target="#update-suivi" @click="HandleIdUpdate(suivi.id)"><i
                              class="ri-edit-line"></i></div>
                          <a v-if="hasPermission(4)" aria-label="anchor" href="javascript:void(0);"
                            v-tippy="{ content: 'Supprimer l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                            class="btn btn-icon btn-sm btn-danger btn-wave waves-effect waves-light"><i
                              class="ri-delete-bin-line" @click="HandleIdDelete(suivi.id)"></i></a>
                        </div>
                      </td>
                    </tr>
  
  
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer">
              <div class="container_pagination">
                <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
              </div>
            </div>
          
          </div>
        </div>
      </div>
  
      <!--End::row-1 -->

          <!-- Start:: Create suivi -->
    <div class="modal fade effect-rotate-bottom" id="create-suivi" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="create-suivi">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Créer un suivi</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center" style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
              <div class="row">
                <div class="col-12">
  
                  <div class="card border border-primary mt-2 mb-0 custom-card">
                    <div class="card-body py-1">
                      <div class="card-text">
                        <p class="mb-0"><span class="fw-semibold fs-14">Nom projet : </span><span
                            class=" text-success fs-14 "> {{ data.projet?.NomProjet }}</span> </p>
                        <p class="mb-0"><span class="fw-semibold fs-14">Nom de l'infrastructure : </span> <span
                            class=" text-success fs-15 "> {{data.NomInfrastructure}}</span> </p>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
              <div class="row">
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Code">Date suivi<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.DateSuivi" color="info" name="DateSuivi" size="sm" rounded-size="sm"
                    type="date" />
                  <small v-if="v$.step1.DateSuivi.$error">{{ v$.step1.DateSuivi.$errors[0].$message}}</small>
                  <small v-if="resultError['DateSuivi']"> {{ resultError["DateSuivi"] }} </small>
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                    <div class="mb-3 position-relative">
                       <div class="input-groupe">
                        <label for="password">Taux d'exécution financière <span class="text-danger">*</span></label>
                        <MazInput v-model="step1.TauxExecutionFinanciere"  name="TauxExecutionFinanciere" color="info" placeholder="10"  type="number"
                        min="0" max="100"  size="sm" rounded-size="sm" />
                        <small v-if="v$.step1.TauxExecutionFinanciere.$error">{{v$.step1.TauxExecutionFinanciere.$errors[0].$message}}</small>
                        <small v-if="resultError['TauxExecutionFinanciere']">{{resultError['TauxAvancementPhysique']}}</small>
                       </div>
                    </div>
                </div> 
  
                
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Sigle">Montant décaissé<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.MontantDecaisser" color="info" name="MontantDecaisser" size="sm"
                    rounded-size="sm" type="number" />
                  <small v-if="v$.step1.MontantDecaisser.$error">{{
                    v$.step1.MontantDecaisser.$errors[0].$message}}</small>
                  <small v-if="resultError['MontantDecaisser']"> {{ resultError["MontantDecaisser"] }} </small>
                </div>
  
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_start">Taux d'avancement technique<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.TauxAvancementTechnique" color="info" name="TauxAvancementTechnique" size="sm"
                    rounded-size="sm" type="number" min="0" max="100" />
                  <small v-if="v$.step1.TauxAvancementTechnique.$error">{{
                    v$.step1.TauxAvancementTechnique.$errors[0].$message}}</small>
                  <small v-if="resultError['TauxAvancementTechnique']"> {{ resultError["TauxAvancementTechnique"] }}
                  </small>
                </div>
               
                
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_end">Images<span class="text-danger">*</span></label>
                  <input class="form-control" type="file" id="input-file" accept="image/*" multiple
                    @change="handleFileUploadImages">
                    <small class="fs-13">Formats autorisés : PNG, JPG, JPEG | Taille maximale : 2048 Mo</small>
                  <small v-if="v$.step1.images.$error">{{ v$.step1.images.$errors[0].$message}}</small>
                  <small v-if="resultError['images[]']"> {{ resultError["images[]"] }} </small>
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_end">Videos</label>
                  <input class="form-control" type="file" id="input-file" accept="video/*"
                    @change="handleFileUploadVideo">
                  <small class="fs-13">Taille d'importation maximale 10 megas</small>
                  <small v-if="v$.step1.videoss.$error">{{ v$.step1.videoss.$errors[0].$message}}</small>
                  <small v-if="resultError['videoss[]']"> {{ resultError["videoss[]"] }} </small>
                </div>
                <div class="col-12">
                  <label for="Nom">Niveau d'avancement<span class="text-danger">*</span></label>

                  <!-- <MazInput v-model="step1.NiveauAvancement" color="info" name="NiveauAvancement" size="sm"
                    rounded-size="sm" type="text" /> -->
                  <QuillEditor v-model="step1.NiveauAvancement" />
                  <small v-if="v$.step1.NiveauAvancement.$error">{{
                    v$.step1.NiveauAvancement.$errors[0].$message}}</small>
                  <small v-if="resultError['NiveauAvancement']"> {{ resultError["NiveauAvancement"] }} </small>
  
                </div>
  
                <div class="col-12">
                  <label for="infrastructure_id">Difficultes</label>
                  <QuillEditor v-model="step1.Difficultes" />
                  <!-- <MazTextarea v-model="step1.Difficultes" color="info" name="Difficultes" size="sm" rounded-size="sm" /> -->
                  <small v-if="v$.step1.Difficultes.$error">{{ v$.step1.Difficultes.$errors[0].$message}}</small>
                  <small v-if="resultError['Difficultes']"> {{ resultError["Difficultes"] }} </small>
                </div>
              </div>
  
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitSuivi('create-suivi')">
                    Valider
                  </button>
                </div>
              </div>
  
  
            </div>
  
            <br />
            <div class="modal-footer">
              <div class="btn-group ms-auto">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End:: Create suivi -->
  
    <!-- Start:: update suivi -->
    <div class="modal fade effect-rotate-bottom" id="update-suivi" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update-suivi">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier un suivi</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center" style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
              <div class="row">
                <div class="col-12">
  
  <div class="card border border-primary mt-2 mb-0 custom-card">
    <div class="card-body py-1">
      <div class="card-text">
        <p class="mb-0"><span class="fw-semibold fs-14">Nom projet : </span><span
            class=" text-success fs-14 "> {{ data.projet?.NomProjet }}</span> </p>
        <p class="mb-0"><span class="fw-semibold fs-14">Nom de l'infrastructure : </span> <span
            class=" text-success fs-15 "> {{data.NomInfrastructure}}</span> </p>
      </div>
    </div>
  </div>
</div>
  
              </div>
              <div class="row">
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Code">Date suivi<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.DateSuivi" color="info" name="DateSuivi" size="sm" rounded-size="sm"
                    type="date" />
                  <small v-if="v$.step2.DateSuivi.$error">{{ v$.step2.DateSuivi.$errors[0].$message}}</small>
                  <small v-if="resultError['DateSuivi']"> {{ resultError["DateSuivi"] }} </small>
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_start">Taux d'avancement technique<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.TauxAvancementTechnique" color="info" name="TauxAvancementTechnique" size="sm"
                    rounded-size="sm" type="number" min="0" max="100" />
                  <small v-if="v$.step2.TauxAvancementTechnique.$error">{{
                    v$.step2.TauxAvancementTechnique.$errors[0].$message}}</small>
                  <small v-if="resultError['TauxAvancementTechnique']"> {{ resultError["TauxAvancementTechnique"] }}
                  </small>
                </div>
  
             
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Sigle">Montant décaissé<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.MontantDecaisser" color="info" name="MontantDecaisser" size="sm"
                    rounded-size="sm" type="number" />
                  <small v-if="v$.step2.MontantDecaisser.$error">{{
                    v$.step2.MontantDecaisser.$errors[0].$message}}</small>
                  <small v-if="resultError['MontantDecaisser']"> {{ resultError["MontantDecaisser"] }} </small>
                </div>
  
              
                <div class="col-xl-6 col-md-6 col-sm-12">
                    <div class="mb-3 position-relative">
                       <div class="input-groupe">
                        <label for="password">Taux d'exécution financière <span class="text-danger">*</span></label>
                        <MazInput v-model="step2.TauxExecutionFinanciere"  name="TauxExecutionFinanciere" color="info" placeholder="10"  type="number"
                        min="0" max="100"  size="sm" rounded-size="sm" />
                        <small v-if="v$.step2.TauxExecutionFinanciere.$error">{{v$.step2.TauxExecutionFinanciere.$errors[0].$message}}</small>
                        <small v-if="resultError['TauxExecutionFinanciere']">{{resultError['TauxAvancementPhysique']}}</small>
                       </div>
                    </div>
                </div> 
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_end">Images<span class="text-danger">*</span></label>
                  <input class="form-control" type="file" id="input-file" accept="image/*" multiple
                    @change="handleFileUploadImagesUpdate">
                  <small v-if="v$.step2.images.$error">{{ v$.step2.images.$errors[0].$message}}</small>
                  <small v-if="resultError['images[]']"> {{ resultError["images[]"] }} </small>
                </div>
              
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_end">Videos</label>
                  <input class="form-control" type="file" id="input-file" accept="video/*"
                    @change="handleFileUploadVideo">
                  <small v-if="v$.step2.videoss.$error">{{ v$.step2.videoss.$errors[0].$message}}</small>
                  <small v-if="resultError['videoss[]']"> {{ resultError["videoss[]"] }} </small>
                </div>
                <div class="col-xl-12 col-md-12 col-sm-12 avancement">
                  <label for="Nom">Niveau d'avancement<span class="text-danger">*</span></label>
                  <div id="quillEditor"  class="quill-editor"></div>
                  <small v-if="v$.step2.NiveauAvancement.$error">{{
                    v$.step2.NiveauAvancement.$errors[0].$message}}</small>
                  <small v-if="resultError['NiveauAvancement']"> {{ resultError["NiveauAvancement"] }} </small>
  
                </div>
  
                <div class="col-12 difficulte">
                  <label for="infrastructure_id">Difficultes</label>
                  <div id="quillEditorDifficultes" class="quill-editor"></div>
                  <small v-if="v$.step2.Difficultes.$error">{{ v$.step2.Difficultes.$errors[0].$message}}</small>
                  <small v-if="resultError['Difficultes']"> {{ resultError["Difficultes"] }} </small>
                </div>
              </div>
  
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdateInfrastructureSuivi('update-suivi')">
                    Valider
                  </button>
                </div>
              </div>
  
  
            </div>
  
            <br />
            <div class="modal-footer">
              <div class="btn-group ms-auto">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End:: update suivi -->
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import Pag from "@/components/others/pagination.vue";
import { require, lgmin, lgmax, ValidNumeri, vlmin, vlmax } from "@/functions/rules";
import { useToast } from "vue-toastification";
import Loading from '@/components/others/loading.vue';
import axios from '@/lib/axiosConfig.js'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import Swal from 'sweetalert2'
import { successmsg } from "@/lib/modal.js"
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import QuillEditor from '@/components/projets/QuillEditor.vue';

export default {
    props: {
    infrastructureData: {
      type: Object,
      required: true,
    },
  },
  components: { Loading, MazPhoneNumberInput, Pag , QuillEditor},
    watch: {
        infrastructureData: {
      handler(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
         this.data = newVal
         this.SuiviOptions = newVal.suivis
         this.loading = false 
        }
      },
      immediate: false,
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.SuiviOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.SuiviOptions.slice(startIndex, endIndex);
    },



  },
  data() {
    return {
      loading: true,
      data: "",
      error: "",
      search: "",
      resultError: {},
      currentPage: 1,
      itemsPerPage: 12,
      totalPageArray: [],
      SuiviOptions: [],
      datas: [],
      ToId: "",
      quillEditorAvancement: null,
        quillEditorDifficultes: null,
      v$: useVuelidate(),
      trimestre: [
        { label: "Trimestre 1", value: "T1" },
        { label: "Trimestre 2", value: "T2" },
        { label: "Trimestre 3", value: "T3" },
        { label: "Trimestre 4", value: "T4" },
      ],
      step1: {
        DateSuivi: "",
        NiveauAvancement: "",
        MontantDecaisser: "",
        TauxAvancementTechnique: "",
        TauxExecutionFinanciere: "",
        Trimestre: ["T1"],
        images: [],
        videoss: "",
        Difficultes: "",

      },
      step2: {
        DateSuivi: "",
        NiveauAvancement: "",
        MontantDecaisser: "",
        TauxAvancementTechnique: "",
        TauxExecutionFinanciere: "",
        Trimestre: ["T1"],
        images: [],
        videoss: "",
        Difficultes: "",
        imagesUrls: [],
        

      },
    }
  },
  validations: {
    step1: {
      DateSuivi: { require },
      NiveauAvancement: { require },
      MontantDecaisser: { require },
      TauxAvancementTechnique: {
        require,
        ValidNumeri,
        vlmin: vlmin(0),
        vlmax: vlmax(100),
      },
      TauxExecutionFinanciere: {
        require,
        ValidNumeri,
        vlmin: vlmin(0),
        vlmax: vlmax(100),
      },
      Trimestre: {  },
      images: { require },
      videoss: {},
      Difficultes: {},

    },
    step2: {
      DateSuivi: { require },
      NiveauAvancement: { require },
      MontantDecaisser: { require },
      TauxAvancementTechnique: {
        require, ValidNumeri,
        vlmin: vlmin(0),
        vlmax: vlmax(100),
      },
      TauxExecutionFinanciere: {
        require,
        ValidNumeri,
        vlmin: vlmin(0),
        vlmax: vlmax(100),
      },
      Trimestre: {  },
      images: {},
      videoss: {},
      Difficultes: {},

    }
  },
  mounted() {
    var lightboxVideo = GLightbox({
      selector: '.glightbox'
    });
    lightboxVideo.on('slide_changed', ({ prev, current }) => {
     

      const { slideIndex, slideNode, slideConfig, player } = current;
    });
  },
  methods: {
    successmsg:successmsg,
    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },
    triggerFileInput(index) {
      document.getElementById(`input-file-${index}`).click();
    },
    openGallery(photos) {
      const images = photos.split('|').map(url => ({
        href: url,
        type: 'image'
      }));

      GLightbox({ elements: images }).open();
    },
    openVideo(videoUrl) {
      GLightbox({
        elements: [{
          'href': videoUrl,
          'type': 'video',
          'source': 'local', // ou 'youtube', 'vimeo', etc. selon la source de votre vidéo
          'width': '900px',
        }]
      }).open();
    },
    async submitSuivi(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
       

        const formData = new FormData();
        formData.append("DateSuivi", this.step1.DateSuivi);
        formData.append("NiveauAvancement", this.step1.NiveauAvancement);
        formData.append("MontantDecaisser", this.step1.MontantDecaisser);
        formData.append("CodeInfrastructure", this.data.CodeInfrastructure);

        formData.append("TauxAvancementTechnique", this.step1.TauxAvancementTechnique);
        formData.append("TauxExecutionFinanciere", this.step1.TauxExecutionFinanciere);
        formData.append("Difficultes", this.step1.Difficultes);
       
        if (this.step1.Trimestre && this.step1.Trimestre.length > 0) {
          for (let i = 0; i < this.step1.Trimestre.length; i++) {
           
            formData.append("Trimestre[]", this.step1.Trimestre[i]);
          }
        }
        if (this.step1.images && this.step1.images.length > 0) {
          for (let i = 0; i < this.step1.images.length; i++) {
            formData.append("images[]", this.step1.images[i]);
          }
        }
        if (this.step1.videoss) {
          formData.append("videoss[]", this.step1.videoss);
        }

        try {
          const response = await axios.post("/infrastructures/suivis", formData, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
              
              'Content-Type': 'multipart/form-data'
            }
          });

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.step1 = {
                DateSuivi: "",
                NiveauAvancement: "",
                MontantDecaisser: "",
                TauxAvancementTechnique: "",
                TauxExecutionFinanciere: "",
                // Trimestre: [],
                images: [],
                videoss: "",
                Difficultes: "",

              },
              this.v$.step1.$reset();
             this.successmsg(
              "Suivi créé avec succès",
              "Le nouveau suivi a été créé avec succès !"
            );
            this.$emit('data-updated', {action: 'suivi-created'});
            
          }
        } catch (error) {
          this.loading = false;
          if (error.response && error.response.data.status === "error") {
            this.error = error.response.data.message;
          } else if (error.response && error.response.data.errors) {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
        this.loading = false;
        
      }


    },
    async HandleIdUpdate(id) {
      this.loading = true;
      this.resetQuillEditors(); 
      try {
        const response = await axios.get(`/infrastructures/suivis/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            
          }
        });

        if (response.data.status === "success") {
          let data = response.data.data

          this.step2 = {
            DateSuivi: data.DateSuivi,
            MontantDecaisser: data.MontantDecaisser,
            TauxAvancementTechnique: data.TauxAvancementTechnique,
            TauxExecutionFinanciere: data.TauxExecutionFinanciere,
            videoss: data.videos,
            images: [],
            imagesUrls: data.Photos.split('|'),
          };

          this.ToId = data.id;
          await this.initQuillEditor(data?.NiveauAvancement)
          await this.initQuillEditorDifficultes(data?.Difficultes);
          this.loading = false;

        }
      } catch (error) {
        this.loading = false;
       
        if (error.response.data.status === "error") {
          this.loading = false;
          

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
    async submitUpdateInfrastructureSuivi(modalId) {
      console.log('this.step2.NiveauAvancement',this.step2.NiveauAvancement)
      console.log('this.step2.NiveauAvancement',this.step2.Difficultes)
      this.v$.step2.$touch();


      if (this.v$.$errors.length == 0) {

        this.loading = true;
        const formData = new FormData();
        formData.append("DateSuivi", this.step2.DateSuivi);
        formData.append("NiveauAvancement", this.step2.NiveauAvancement);
        formData.append("MontantDecaisser", this.step2.MontantDecaisser);
        formData.append("TauxAvancementTechnique", this.step2.TauxAvancementTechnique);
        formData.append("TauxExecutionFinanciere", this.step2.TauxExecutionFinanciere);
        formData.append("Difficultes", this.step2.Difficultes);
        formData.append("CodeInfrastructure", this.data.CodeInfrastructure);
        formData.append("Trimestre[]", ["T1"]);
        formData.append("id", this.ToId);
        if (this.step2.images.length > 0) {
          for (let i = 0; i < this.step2.images.length; i++) {
            formData.append("images[]", this.step2.images[i]);
          }
        }




        try {
          const response = await axios.post('/infrastructures/suivis', formData, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,
              

            },
          });
         
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Suivi mis à jour avec succès",
              "Le suivi a été mis à jour avec succès !"
            );
            this.$emit('data-updated', {action: 'suivi-update'});



          }
        } catch (error) {
          this.loading = false;
        console.log(error)

          if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
          else {
            this.formatValidationErrors(error.response.data.errors);
            this.loading = false;

          }
        }
      } else {
          console.log('this.v$.$errors',this.v$.$errors)
        this.loading = false;

      }
    },

    initQuillEditor(contenu) {
    const editorElement = document.getElementById("quillEditor");
    
    if (editorElement) {
      const quill = new Quill(editorElement, {
        theme: "snow",
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            [{ header: 1 }, { header: 2 }],
            [{ direction: "rtl" }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ["clean"],
          ],
        },
      });

      if (contenu) {
      quill.clipboard.dangerouslyPasteHTML(0, contenu);
      // Synchronisez IMMÉDIATEMENT avec le modèle step2
      this.step2.NiveauAvancement = quill.root.innerHTML;
    }
    
    quill.on("text-change", () => {
      this.step2.NiveauAvancement = quill.root.innerHTML;
      console.log('Mise à jour NiveauAvancement:', this.step2.NiveauAvancement);
    });
    }
  },
  initQuillEditorDifficultes(contenu) {
  const editorElement = document.getElementById("quillEditorDifficultes");


  if (editorElement) {
    const quill = new Quill(editorElement, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          [{ header: 1 }, { header: 2 }],
          [{ direction: "rtl" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ font: [] }],
          ["clean"],
        ],
      },
    });

   

    if (contenu) {
      quill.clipboard.dangerouslyPasteHTML(0, contenu);
      // Synchronisez IMMÉDIATEMENT avec le modèle step2
      this.step2.Difficultes = quill.root.innerHTML;
    }
    
    quill.on("text-change", () => {
      this.step2.Difficultes = quill.root.innerHTML;  
    });
  
  this.quillEditorDifficultes = quill;
  }
},
resetQuillEditors() {
  // Réinitialiser l'éditeur d'avancement

  if (this.quillEditorAvancement) {
    this.quillEditorAvancement.off("text-change");
    this.quillEditorAvancement = null;
  }
  
  // Réinitialiser l'éditeur de difficultés
 

  if (this.quillEditorDifficultes) {
    this.quillEditorDifficultes.off("text-change");
    this.quillEditorDifficultes = null;
  }
  
  const allEditors = document.querySelectorAll('.quill-editor');
  allEditors.forEach(editor => {
    if (editor.parentNode) {
      editor.parentNode.removeChild(editor);
    }
  });
  
  // Supprimer également tous les conteneurs de toolbar Quill
  const allToolbars = document.querySelectorAll('.ql-toolbar');
  allToolbars.forEach(toolbar => {
    if (toolbar.parentNode) {
      toolbar.parentNode.removeChild(toolbar);
    }
  });
  
  // Recréer les conteneurs proprement
  const editorContainer = document.querySelector(".avancement");
  const diffEditorContainer = document.querySelector(".difficulte");
  
  if (editorContainer) {
    const newEditor = document.createElement("div");
    newEditor.id = "quillEditor";
    newEditor.className = "quill-editor";
    editorContainer.appendChild(newEditor);
  }
  
  if (diffEditorContainer) {
    const newDiffEditor = document.createElement("div");
    newDiffEditor.id = "quillEditorDifficultes";
    newDiffEditor.className = "quill-editor";
    diffEditorContainer.appendChild(newDiffEditor);
  }
},

    async urlToFile(url, filename, mimeType) {
      try {
        const response = await fetch(url, { mode: 'no-cors' });

        if (!response.ok) {
          throw new Error(`Erreur lors du téléchargement de l'image : ${response.statusText}`);
        }

        const blob = await response.blob();

        return new File([blob], filename, { type: mimeType });
      } catch (error) {
        this.loading = false;
      
        return null;
      }
    },

    async convertUrlsToFiles(urls) {
      const files = [];

      for (let url of urls) {
        const filename = url.split('/').pop();
        const mimeType = url.includes('.png') ? 'image/png' : 'image/jpeg';

        const file = await this.urlToFile(url, filename, mimeType);

        if (file && file.size > 0) { // Vérifie que le fichier a bien été créé avec du contenu
          files.push(file);
        } else {
          this.loading = false;
         
        }
      }

      return files;
    },

    async convertUrlToFile(url) {
      return fetch(url, { mode: 'no-cors' })
        .then(response => response.blob())
        .then(blob => new File([blob], url.split('/').pop(), { type: blob.type }));
    },

    async HandleIdDelete(id) {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimez-le !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        this.ConfirmeDelete(id);
      }
    },
    async ConfirmeDelete(id) {
      this.loading = true

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/infrastructures/suivis/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            


          },


        });
       
        if (response.data.status === 'success') {
          this.loading = false
          this.successmsg(
            "Suivi d'infrastructure supprimé avec succès",
            "Le suivi d'infrastructure a été supprimé avec succès !"
          );
          this.$emit('data-updated', {action: 'suivi-delete'});


        } else {
       
          this.loading = false
        }
      } catch (error) {
      

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");  //a revoir
        }

      }

    },
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
    async validateSelection(id) {
     const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, validez !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
     });
  
     // Si l'utilisateur confirme la suppression
     if (result.isConfirmed) {
       this.validateSelection1(id);
     }
        },
        async  validateSelection1(id) {
        const data = {
          id:id
        }
    
      this.loading = true
         
         try {
           const response = await axios.put('/infrastructures/suivis/confirmer',data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,

              
            },
           
   
   
           });
       
           if (response.status === 200) {
             this.loading = false
             this.successmsg(
                  "Validation du suivi",
                  "Votre suivi  a été validé avec succès !"
              ); 
            this.$emit('data-updated', {action: 'suivi-update'});

              this.loading = false
              
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
         
              this.loading = false
              Swal.fire({
              icon: "error",
              title: "Suivi validé",
              text: "Ce suivi a été déjà valider merci.",
            
            });
            // this.handleErrors(error);
           
         }

    },

    closeModal(modalId) {
      let modalElement = this.$refs[modalId];
      modalElement.classList.remove("show");
      modalElement.style.display = "none";
      document.body.classList.remove("modal-open");
      let modalBackdrop = document.querySelector(".modal-backdrop");
      if (modalBackdrop) {
        modalBackdrop.parentNode.removeChild(modalBackdrop);
      }
    },
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.SuiviOptions.slice(startIndex, endIndex);
    },
    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur
        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet
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
    handleFileUploadImages(event) {
    
      const files = event.target.files;
    
      this.step1.images = [];

      // Ajouter chaque fichier au tableau
      for (let i = 0; i < files.length; i++) {
        this.step1.images.push(files[i]);
      }


  

    },
    handleFileUploadImagesUpdateNew(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.step2.imagesUrls.push(e.target.result);
          this.step2.images.push(files[i]);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    handleFileUploadImagesUpdate(event) {
     

   
      const files = event.target.files;
    
      this.step2.images = [];

      // Ajouter chaque fichier au tableau
      for (let i = 0; i < files.length; i++) {
        this.step2.images.push(files[i]);
      }


    

    },
    handleFileUploadVideo(event) {
    
      const file = event.target.files[0];
      this.step1.videoss = file

    },
  },
    
}
</script>
<style lang="css" scoped>
.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  position: relative;
  margin: 10px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid var(--primary-color);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.change-text {
  color: white;
  font-weight: bold;
}

.image-wrapper:hover .overlay {
  opacity: 1;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.add-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  cursor: pointer;
}

.plus-icon {
  font-size: 40px;
  color: #666;
}

.add-image:hover .plus-icon {
  color: #333;
}

.add-image .file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.quill-editor {
  height: auto;
  margin-bottom: 10px;
}

:deep(.ql-toolbar.ql-snow) {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px;
  border-radius: 4px 4px 0 0;
}

:deep(.ql-formats) {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 0 !important;
}
:deep(.ql-toolbar.ql-snow + .ql-container.ql-snow) {
  height: 150px;
  overflow:scroll;
}
:deep(.ql-toolbar button) {
  height: 28px;
  width: 28px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.ql-editor) {
  min-height: 150px;
}
    
</style>