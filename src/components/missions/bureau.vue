<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
    
    
        <div class="col-xl-12" data-aos="zoom-in">
            <div class="card custom-card">
                <div class="card-header justify-content-between">
                    <div class="card-title">
                        Liste des Bureaux de contrôle
                    </div>

                    <div class="d-flex mt-sm-0 mt-2 align-items-center">
                    <div class="input-group">
                        <input type="text" class="form-control bg-light border-0" placeholder="Recherchez..."
                            aria-describedby="search-member" v-model="search" @input="filterByName">
                        <button class="btn btn-light" type="button" id="search-contact-member"><i
                                class="ri-search-line text-muted"></i></button>
                    </div>
    
                    <button v-if="hasPermission(3)" class="btn btn-icon btn-primary ms-2" data-bs-placement="top"
                     v-tippy="{ content: 'Créer un nouvel élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                        data-bs-title="Add Contact" data-bs-toggle="modal" data-bs-target="#add_infrastructure">
                        <i class="ri-add-line">
                        </i></button>
                </div>
    
                </div>
                <div class="card-body">
                    <div style="overflow-x: scroll !important" class="table-responsive">
                        <table class="table text-nowrap table-hover border table-bordered table-striped">
                            <thead>
                                <tr>
    
                                    <th scope="col">Code</th>
                                    <th scope="col">Nom</th>
                                    <th scope="col">Description</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody v-if="paginatedItems.length === 0">
                                <tr>
                                    <td colspan="18">
                                        <div class="badge bg-warning-transparent" style="width: 100%; font-size: 14px">
                                            Pas de données !
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody v-else data-aos="fade-up" data-aos-duration="1000">
                                <tr v-for="(data , index)  in paginatedItems" :key="index">
                                    <th scope="row" class="ps-4" style="width: 60px;"> {{data.CodeMission }}</th>
    
    
                                    <td>
    
                                        <span class="">
                                            {{ data.NomMission }}
                                        </span>
    
                                    </td>
                                    <td>
    
                                        {{data.Description}}
                                    </td>
                                    <td style="width: 100px !important;">
                                        <div class="hstack gap-2 fs-15">
                                            <button v-if="hasPermission(2)"
                                             v-tippy="{ content: 'Modifier l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                                                class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-info"
                                                data-bs-toggle="modal" data-bs-target="#update_infrastructure"
                                                @click="HandleIdUpdate(data.id)"><i class="ri-edit-line"></i></button>
                                            <button v-if="hasPermission(4)"
                                              v-tippy="{ content: 'Supprimer l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                                                class="btn btn-icon btn-wave waves-effect btn-sm btn-danger"
                                                @click="HandleIdDelete(data.id)"><i class="ri-delete-bin-line"></i></button>
                                        </div>
                                    </td>
                                </tr>
    
    
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="container_pagination">
                                <Pag :current-page="currentPage" :total-pages="totalPages"
                                    @page-change="updateCurrentPage" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <!-- add indicateur -->
    
        <div class="modal fade effect-rotate-bottom " id="add_infrastructure" tabindex="-1" aria-hidden="true"
            data-bs-backdrop="static" ref="add_infrastructure">
            <div class="modal-dialog modal-dialog-centered  modal-lg">
                <div class="modal-content">
                    <div class="modal-header float-start text-center justify-content-center"
                        style="background-color: var(--primary-rgb); padding-bottom: 10px">
                        <h2 class="modal-title text-white text-center" id="mail-ComposeLabel"
                            style="font-size: 22px !important">
                            <b class="text-center">Ajouter des bureaux de contrôle </b>
                        </h2>
                    </div>
                    <div class="modal-body px-4">
                        <div class="row gy-2 justify-content-center" style="
                    border-width: 1px;
                    border-style: solid;
                    border-radius: 6px;
                    border-color: rgb(0, 77, 134);
                  ">
                            <div>
                                <div class="btn-list" style="position:absolute ; right: 7px; top: 5px;">
                                    <div class="bouttons">
                                        <div class="boutton" style=" width: 38px; z-index:1000"
                                            v-tippy="{ content: 'Ajouter un élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                                            @click="AddformDataInfrastructures"><i class="ri-add-line"></i></div>
                                    </div>
                                </div>
                                <div class="row align-items-center p-2  border-bottom "
                                    v-for="(infrastructure, index) in Infrastructures" :key="infrastructure.id">
                                    <div class="col-11">
                                        <span class="nombre">
                                            {{index + 1}}
                                        </span>
                                        <div class="row  content-group">
    
                                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                                <div class="input-groupe">
                                                    <label for="userpassword">Code de contrôle <span
                                                            class="text-danger">*</span></label>
                                                    <MazInput v-model="infrastructure.CodeMission" color="info"
                                                        name="CodeMission" size="sm" rounded-size="sm" type="text"
                                                        @input="clearErrorInfrastructures(index, 'CodeMission')" />
                                                    <small
                                                        v-if="errors.Infrastructures && errors.Infrastructures[index] && errors.Infrastructures[index].CodeMission">{{
                                                        errors.Infrastructures[index].CodeMission }}</small>
                                                    <small v-if="resultError['Infrastructures']"> {{
                                                        resultError["Infrastructures"] }} </small>
                                                </div>
                                            </div>
                                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                                <div class="input-groupe">
                                                    <label for="userpassword">Nom de contrôle <span
                                                            class="text-danger">*</span></label>
                                                    <MazInput v-model="infrastructure.NomMission" color="info"
                                                        name="NomMission" size="sm" rounded-size="sm"
                                                        @input="clearErrorInfrastructures(index, 'NomMission')" />
                                                    <small
                                                        v-if="errors.Infrastructures && errors.Infrastructures[index] && errors.Infrastructures[index].NomMission">{{
                                                        errors.Infrastructures[index].NomMission }}</small>
                                                    <small v-if="resultError['Infrastructures']"> {{
                                                        resultError["Infrastructures"] }} </small>
                                                </div>
                                            </div>
    
                                            <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                                <div class="input-groupe">
                                                    <label for="userpassword">Description de contrôle </label>
                                                    <textarea class="form-control"
                                                        style="border-radius:0 !important; border:1px solid #e5eaee !important"
                                                        id="text-area" v-model="infrastructure.Description"
                                                        rows="1"></textarea>
                                                    <small
                                                        v-if="errors.Infrastructures && errors.Infrastructures[index] && errors.Infrastructures[index].Description">{{
                                                        errors.Infrastructures[index].Description }}</small>
                                                    <small v-if="resultError['Infrastructures']"> {{
                                                        resultError["Infrastructures"] }} </small>
                                                </div>
                                            </div>
    
                                        </div>
                                    </div>
                                    <div class="col-1" style="position: relative">
    
                                        <button class="btn btn-sm btn-icon btn-danger btn-wave"

                                            @click="deleteRowInfrastructures(index)"
                                            v-tippy="{ content: 'Supprimer cet élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                                            style=" position:absolute !important ; top: 18px !important; background:red;">
                                            <i class="ri-delete-bin-line"></i>
                                        </button>
                                    </div>
    
                                </div>
    
                            </div>
                            <div class="row mb-3">
                                <div class="boutton">
                                    <button class="" @click.prevent="submitInfrastructure('add_infrastructure')">
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
    
    
        <div class="modal fade effect-rotate-bottom" id="update_infrastructure" tabindex="-1" aria-hidden="true"
            data-bs-backdrop="static" ref="update_infrastructure">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header float-start text-center justify-content-center"
                        style="background-color: var(--primary-rgb); padding-bottom: 10px">
                        <h2 class="modal-title text-white text-center" id="mail-ComposeLabel"
                            style="font-size: 22px !important">
                            <b class="text-center">Modifier un bureau de contrôle</b>
                        </h2>
                    </div>
                    <div class="modal-body px-4">
                        <div class="row gy-2 justify-content-center" style="
                      border-width: 1px;
                      border-style: solid;
                      border-radius: 6px;
                      border-color: rgb(0, 77, 134);
                    ">
                            <div>
    
                                <div class="row  content-group">
                                    <div class="col">
                                        <div class="input-groupe">
                                            <label for="userpassword">Code de contrôle
                                                <span class="text-danger">*</span></label>
                                            <MazInput v-model="step2.CodeMission" type="text" color="info"
                                                name="CodeMission" size="sm" rounded-size="sm" />
                                            <small v-if="v$.step2.CodeMission.$error">{{
                                                v$.step2.CodeMission.$errors[0].$message
                                                }}</small>
                                            <small v-if="resultError['CodeMission']">
                                                {{ resultError["CodeMission"] }}
                                            </small>
                                        </div>
                                    </div>
    
                                </div>
    
                                <div class="row mt-3 content-group">
                                    <div class="col">
                                        <div class="input-groupe">
                                            <label for="userpassword">Nom de contrôle
                                                <span class="text-danger">*</span></label>
                                            <MazInput v-model="step2.NomMission" type="text" color="info" name="NomMission"
                                                size="sm" rounded-size="sm" />
                                            <small v-if="v$.step2.NomMission.$error">{{
                                                v$.step2.NomMission.$errors[0].$message
                                                }}</small>
                                            <small v-if="resultError['NomMission']">
                                                {{ resultError["NomMission"] }}
                                            </small>
                                        </div>
                                    </div>
    
                                </div>
                                <div class="row mt-3 content-group">
                                    <div class="col">
                                        <div class="input-groupe">
                                            <label for="userpassword">Description de contrôle
                                            </label>
                                            <textarea class="form-control"
                                                style="border-radius:0 !important; border:1px solid #e5eaee !important"
                                                id="text-area" v-model="step2.Description" rows="2"></textarea>
                                            <small v-if="v$.step2.Description.$error">{{
                                                v$.step2.Description.$errors[0].$message
                                                }}</small>
                                            <small v-if="resultError['Description']">
                                                {{ resultError["Description"] }}
                                            </small>
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                            <div class="row mb-3">
                                <div class="boutton">
                                    <button class="" @click.prevent="submitUpdateInfrastructure('update_infrastructure')">
                                        Valider
                                    </button>
                                </div>
                            </div>
                        </div>
    
                        <br />
                        <div class="modal-footer">
                            <div class="btn-group ms-auto">
                                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    
    </div>
</template>
  <script>
import Pag from "@/components/others/pagination.vue";
import Loading from "@/components/others/loading.vue";
import axios from '@/lib/axiosConfig'
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js"
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import Swal from 'sweetalert2'
export default {
  components: {
    Loading,
    Pag,
    MazPhoneNumberInput
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.ClientOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.ClientOptions.slice(startIndex, endIndex);
    },

  },
  data() {
    return {
      loading: true,
      ClientOptions: [],
      data: [],
      currentPage: 1,
      itemsPerPage: 10,
      totalPageArray: [],
      search: "",
      resultError: {},
      ToId: "",
      choix: [
        { label: "Oui", value: true },
        { label: "Non", value: 'non' },
      ],
      errors: { Infrastructures: [], },
      Infrastructures: [
        {

          CodeMission: "",
          NomMission: "",
          Description: "",
          Statut : 1 
        }
      ],
      step2: {
        CodeMission: "",
        NomMission: "",
        Description: "",

      },
      v$: useVuelidate(),
      error: "",

    }
  },
  validations: {

    step2: {
      CodeMission: { require },
      NomMission: { require },
      Description: {},
    },


  },
  async mounted() {

    await this.fetchClients();

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
    AddformDataInfrastructures() {
      this.Infrastructures.push({ CodeMission: "", NomMission: "", Description: "",  Statut : 1 });
    },
    deleteRowInfrastructures(index) {

      if (index !== 0) {
        this.Infrastructures.splice(index, 1);
      }
    },
    clearErrorInfrastructures(index, field) {
      if (this.errors.Infrastructures[index]) {
        this.errors.Infrastructures[index][field] = null;
      }
    },
    validateInfrastructures() {
      let isValid = true;
      this.errors = { Infrastructures: [] };
      this.Infrastructures.forEach((infrastructure, index) => {
        const infrastructureErrors = {};

        if (!infrastructure.CodeMission) {
          infrastructureErrors.CodeMission = 'Ce champs est obligatoire!';
          isValid = false;
        }
        if (!infrastructure.NomMission) {
          infrastructureErrors.NomMission = 'Ce champs est obligatoire!';
          isValid = false;
        }

        this.errors.Infrastructures[index] = infrastructureErrors;
      });
      return isValid;
    },
    async submitInfrastructure(modalId) {

      if (this.validateInfrastructures()) {
        this.loading = true;
        const dataToSend = {
          missions: this.Infrastructures
        };


        try {
          const response = await axios.post("/missions", dataToSend, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,

            }
          });

          if (response.data.status === "success") {
            this.Infrastructures = [{ CodeMission: "", NomMission: "", Description: "", }];
            this.closeModal(modalId);
            this.successmsg(
              "Bureaux de contrôle créés avec succès",
              "Des nouveaux bureaux de contrôle ont été créés avec succès !"

            );
            await this.fetchClients()
            this.loading = false


          } else {
          }
        } catch (error) {


          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrorsMultiple(error.response.data.errors ,'Infrastructures');
          }
        }
      } else {

      }
    },


    async fetchClients() {
      try {
        const response = await axios.get('/missions',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );


        if (response.data.status === "success") {
          this.data = response.data.data.filter((i) => i.Statut == "1");
          this.ClientOptions = this.data

          this.loading = false
        }
      } catch (error) {

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


    async HandleIdUpdate(id) {
        this.step2= {
        CodeMission: "",
        NomMission: "",
        Description: "",

      },
      this.loading = true;

      try {
        const response = await axios.get(`/missions/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });


        if (response.data.status === "success") {

          let data = response.data.data

          this.step2.CodeMission = data.CodeMission,
            this.step2.NomMission = data.NomMission,
            this.step2.Description = data.Description,
            this.ToId = data.id
          this.loading = false;

        }
      } catch (error) {

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
    async submitUpdateInfrastructure(modalId) {

      this.v$.step2.$touch();


      if (this.v$.$errors.length == 0) {

        this.loading = true;
        let dataSend = {
          missions: [
            {

              CodeMission: this.step2.CodeMission,
              NomMission: this.step2.NomMission,
              Description: this.step2.Description,
              Statut : 1 ,
              id: this.ToId
            }
          ]
        }




        try {
          const response = await axios.put('/missions/update', dataSend, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,

            },
          });

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Données du bureau de contrôle mises à jour",
              "Les données du bureau de contrôle ont été mises à jour avec succès !"
            );
            await this.fetchClients();


          }
        } catch (error) {
          this.loading = false;
          

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

        this.loading = false;

      }
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
        const response = await axios.delete(`/missions/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,


          },


        });

        if (response.data.status === 'success') {
          this.loading = false
          this.successmsg(
            "Bureau de contrôle supprimé avec succès",
            "Le bureau de contrôle a été supprimé avec succès !"
          );
          await this.fetchClients();

        } else {

          this.loading = false
        }
      } catch (error) {
        this.loading = false;
      

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");  //a revoir
        }

      }

    },

    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.ClientOptions.slice(startIndex, endIndex);
    },

    filterByName() {
      this.currentPage = 1;
      if (this.search !== null) {
        const tt = this.search;
        const searchValue = tt.toLowerCase()
        this.ClientOptions = this.data.filter(user => {
          const Nom = user.CodeMission || '';
          const Descriptions = user.NomMission || '';

          return Nom.toLowerCase().includes(searchValue) || Descriptions.toLowerCase().includes(searchValue);
        });

      } else {
        this.ClientOptions = [...this.data];

      }

    },
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.ClientOptions.slice(startIndex, endIndex);
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
    async formatValidationErrorsMultiple(errors, entity) {
  const formattedErrors = {};
  formattedErrors[entity] = [];

  for (const field in errors) {
    const errorMessages = errors[field];

    const [_, index, fieldName] = field.match(new RegExp(`${entity.toLowerCase()}\\.(\\d+)\\.(\\w+)`));

 
    if (!formattedErrors[entity][index]) {
      formattedErrors[entity][index] = {};
    }


    formattedErrors[entity][index][fieldName] = errorMessages[0];
  }

  this.errors = formattedErrors;

 
},
async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; 
        const concatenatedError = errorMessages.join(", "); 
        formattedErrors[field] = concatenatedError; 
      }

      this.resultError = formattedErrors; 
    },
  }
}
  </script>
  <style lang="css">
.container_pagination {
    width: auto;
    text-align: end;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;
    box-shadow: rgba(99, 99, 99, 0.1) 0px 2px 8px 0px;
    margin: 5px;
    background-color: #fff;

}

.card.custom-card .card-footer {

    padding: 10px !important;
    text-align: center !important;
    background-color: #dbdfe1 !important;
}

.input-groupe input,
.form-select {
    width: 100%;
    border-radius: 0.1rem !important;
    border: 1px solid #17a4ba;
    outline: 0;
    padding: 8px;
    color: rgb(3, 3, 5);
}

.input-groupe input:focus {
    border-color: var(--color-primary);
}
</style>