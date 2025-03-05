<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div class="d-md-flex d-block pt-12  align-items-center justify-content-between my-4 page-header-breadcrumb">
      <h1 class="page-title fw-semibold fs-18 mb-0">Projets</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Projets
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Start::row-2 -->
    <div class="card p-2 ">
      <div class="float-end w-20 mb-2">
          <a class="px-2 bg-primary text-white  fs-15 "  @click="goBack" href="#">  &larr; Retour</a>
        </div>
      <div class="row mb-6">
        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
  
          <div class="card m-0">
            <div class="card-header">
              <div class="card-title">
                <h5 class="mb-0 fw-semibold fs-14">
                  Information sur le projet
                </h5>
              </div>
            </div>
            <div class="card-body p-0 candidate-edu-timeline">
              <div class="p-2 ">
                <div class="ms-4 ps-0">
                  <p><span class="fw-semibold fs-14">Nom projet : </span><span class=" text-success fs-15 fw-bolder" > {{ data.projet?.NomProjet }}</span> </p>
                  <div class="row">
                    <div class="col-6">
                  <p><span class="fw-semibold fs-14">Date debut : </span> <span class="fs-14 fw-semibold text-warning">{{ formatDate(data.projet?.DateDebut)}}</span> </p>

                    </div>
                    <div class="col-6">
                  <p><span class="fw-semibold fs-14">Date fin : </span><span class="fs-14 fw-semibold text-warning">{{ formatDate(data.projet?.DateFin)  }}</span></p>

                    </div>
                  </div>
  
                </div>
              </div>
            </div>
          </div>
  
        </div>
        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
          <div class="card m-0">
            <div class="card-header">
              <div class="card-title">
                <h5 class="mb-0 fw-semibold fs-14">
                  Information sur l'indicateur
                </h5>
              </div>
            </div>
            <div class="card-body p-0 candidate-edu-timeline">
              <div class="p-2">
                <div class="ms-4 ps-3">
                  <p><span class="fw-semibold fs-14 ">Code indicateur : </span> <span class="fw-bolder fs-15  text-success" > {{ data.CodeIndicateur }}</span></p>
                  <p><span class="fw-semibold fs-14">Nom indicateur : </span> <span class=" text-success fs-15 fw-bolder" > {{data.IntituleIndicateur}}</span> </p>
                  <p><span class="fw-semibold fs-14">Valeur cible : </span> <span class="fw-bolder" style="color: red">  {{ data.CibleFinProjet }} </span></p>
  
                </div>
              </div>
            </div>
          </div>
  
        </div>
  
  
      </div>
      <div class="card">
        <div class="card-header">
          <div class="card-title">
            <h5 class="mb-0 fw-semibold fs-14">
              Information sur le suivi indicateur
            </h5>
          </div>
  
        </div>
        <div class="contact-header my-2  py-2 px-1">
          <div class="d-sm-flex d-block align-items-center justify-content-between">
            <div class="h5 fw-semibold mb-0"></div>
            <div class="d-flex mt-sm-0 mt-2 align-items-center">
              <div class="input-group">
                <input type="text" class="form-control bg-light border-0" placeholder="Recherchez..."
                  aria-describedby="search-member" v-model="search" @input="filterByName">
                <button class="btn btn-light" type="button" id="search-contact-member"><i
                    class="ri-search-line text-muted"></i></button>
              </div>
  
              <button v-if="hasPermission(3)" class="btn btn-icon btn-primary ms-2" data-bs-placement="top" data-bs-title="Add Contact"
                data-bs-toggle="modal" data-bs-target="#add_indicateur_suivi">
                <i class="ri-add-line">
                </i></button>
            </div>
          </div>
        </div>
  
        <div class="card-body">
          <div v-if="paginatedItems.length === 0" class="noresul">
        <span> Vous n'avez pas encore de suivi indicateur, vous pouvez également en ajouter un !! </span>
      </div>
          <div style="overflow-x: scroll !important" class="table-responsive" v-else>
            <table class="table text-nowrap table-bordered">
              <thead>
                <tr>
                  <th scope="row" class="ps-4 fw-semibold">
                      <span class="float-left">N°</span>
                    </th>
  
                  <th scope="col" class="text-center"> <span class="fw-semibold" >Date du suivi</span></th>
                  <th scope="col" class="text-center"> <span class="fw-semibold" >Réalisation</span></th>
                  <th scope="col" class="text-center"> <span class="fw-semibold" >Observation</span></th>
                  <th scope="col" class="text-center" v-if="hasPermission(6)"> <span class="fw-semibold" >Etat</span></th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr  v-for="(item , index)  in paginatedItems" :key="item.id">
                  <td style="width: 30px;">
                    <span>
                      <th   scope="row" class="ps-4 ">{{ (currentPage - 1) * itemsPerPage + index + 1 }}</th>

                    </span>
                  </td>
  
                  <td style="width: 120px;" class="text-center">
                    <span class="d-block fw-bolder mb-1  text-warning"> {{ formatDate(item.DateSuivi) }} </span>
                  </td>
                  <td style="width: 100px;" class="text-center">
                    <span class="fw-semibold fs-14" style="color:red;">{{item.Realisation}}</span>
                  </td>
                  <td class="text-center">
                    <span class="fw-semibold fs-14">{{item.Observations}}</span>
                  </td>
                 
                  <td style="width: 80px;" v-if="hasPermission(6)">
                <div class="btn-list w-100 d-flex justify-content-center">
                  <div>
                    <div class="btn btn-sm  btn-success btn-wave" v-if="item.Accepted === '1' "
                      >
                      <i class="ri-lock-unlock-line"></i> Valider
                    </div>
                    <button class="btn btn-sm  btn-warning btn-wave" v-if="item.Accepted === '0'  && hasPermission(2)"
                      @click="HandleIdStatut(item.id)">
                      <i class="ri-lock-2-line"></i> Non valider
                    </button>
                  </div>
  
                </div>
              </td>
                  <td class="" style="width: 130px;">
                    <div class="btn-list w-25 d-flex">

                      <button v-if="hasPermission(2)" class="btn btn-sm btn-icon btn-info btn-wave " data-bs-toggle="modal"
                        data-bs-target="#update_indicateur_suivi" @click="HandleIdUpdateSuivie(item.id)">
                        <i class="ri-edit-line"></i>
                      </button>

                      <button v-if="hasPermission(4)" class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDelete(item.id)">
                        <i class="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </td>
                </tr>
               
  
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  
    <!-- End::row-2 -->
    <!--  add suivi indicateur -->
    <div class="modal fade effect-rotate-bottom " id="add_indicateur_suivi" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="add_indicateur_suivi">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Ajouter un suivi indicateur </b>
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
                <div class="row">
                  <div class="col-12">
                    <p class="mb-0"><span class="fw-semibold fs-14">Nom projet : </span><span class=" text-success fs-15 fw-bolder" > {{ data.projet?.NomProjet }}</span> </p>
                  </div>
                  <div class="col-12">
                    <p class="mb-0"><span class="fw-semibold fs-14">Nom indicateur : </span> <span class=" text-success fs-15 fw-bolder" > {{data.IntituleIndicateur}}</span> </p>
                  </div>

                </div>
                <small>{{error}}</small>
                <div class="row mt-3 content-group">
                  <div class="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Date <span class="text-danger">*</span></label>
                      <MazInput v-model="suiviIndicateur.DateSuivi" color="info" name="DateSuivi" size="sm"
                        rounded-size="sm" type="date" />
                      <small v-if="v$.suiviIndicateur.DateSuivi.$error">{{
                        v$.suiviIndicateur.DateSuivi.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['DateSuivi']">
                        {{ resultError["DateSuivi"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Realisation <span class="text-danger">*</span></label>
                      <MazInput v-model="suiviIndicateur.Realisation" type="number" color="info" name="Realisation"
                        size="sm" rounded-size="sm" />
                      <small v-if="v$.suiviIndicateur.Realisation.$error">{{
                        v$.suiviIndicateur.Realisation.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Realisation']">
                        {{ resultError["Realisation"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
                <div class="row mt-3 content-group">
                 
                  <div class="col-12">
                    <div class="input-groupe">
                      <label for="userpassword">Observation <span class="text-danger">*</span></label>
                      <MazTextarea v-model="suiviIndicateur.Observations" type="text" color="info" name="Observations"
                        size="sm" rounded-size="sm" />
                      <small v-if="v$.suiviIndicateur.Observations.$error">{{
                        v$.suiviIndicateur.Observations.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Observations']">
                        {{ resultError["Observations"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitSuiviIndicateur('add_indicateur_suivi')">
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

     <!-- update suivi indicateur -->
     <div class="modal fade effect-rotate-bottom " id="update_indicateur_suivi" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update_indicateur_suivi">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier un suivi indicateur </b>
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
                <div class="row">
                  <div class="col-12">
                    <p class="mb-0"><span class="fw-semibold fs-14">Nom projet : </span><span class=" text-success fs-15 fw-bolder" > {{ data.projet?.NomProjet }}</span> </p>
                  </div>
                  <div class="col-12">
                    <p class="mb-0"><span class="fw-semibold fs-14">Nom indicateur : </span> <span class=" text-success fs-15 fw-bolder" > {{data.IntituleIndicateur}}</span> </p>
                  </div>

                </div>
                <small>{{error}}</small>
                <div class="row mt-3 content-group">
                  <div class="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Date <span class="text-danger">*</span></label>
                      <MazInput v-model="suiviUpdate.DateSuivi" color="info" name="DateSuivi" size="sm"
                        rounded-size="sm" type="date" />
                      <small v-if="v$.suiviUpdate.DateSuivi.$error">{{
                        v$.suiviUpdate.DateSuivi.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['DateSuivi']">
                        {{ resultError["DateSuivi"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Realisation <span class="text-danger">*</span></label>
                      <MazInput v-model="suiviUpdate.Realisation" type="number" color="info" name="Realisation"
                        size="sm" rounded-size="sm" />
                      <small v-if="v$.suiviUpdate.Realisation.$error">{{
                        v$.suiviUpdate.Realisation.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Realisation']">
                        {{ resultError["Realisation"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
                <div class="row mt-3 content-group">
                 
                  <div class="col-12">
                    <div class="input-groupe">
                      <label for="userpassword">Observation <span class="text-danger">*</span></label>
                      <MazTextarea v-model="suiviUpdate.Observations" type="text" color="info" name="Observations"
                        size="sm" rounded-size="sm" />
                      <small v-if="v$.suiviUpdate.Observations.$error">{{
                        v$.suiviUpdate.Observations.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Observations']">
                        {{ resultError["Observations"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdateSuivi('update_indicateur_suivi')">
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
  </div>
</template>
<script>
import Pag from "@/components/others/pagination.vue";
import axios from "@/lib/axiosConfig";
import Loading from "@/components/others/loading.vue";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import Swal from "sweetalert2";
export default {
  props:['id'],
  components: {
    Loading, Pag,

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
      data:"",
      SuiviOptions:[],
      dataSuivi:[],
      search: "",
      currentPage: 1,
      itemsPerPage: 12,
      totalPageArray: [],

      suiviIndicateur: {
        DateSuivi: "",
        Realisation: "",
        Observations:"",
      },
      suiviUpdate: {
        DateSuivi: "",
        Realisation: "",
        Observations:"",
      },
      resultError: {},

      v$: useVuelidate(),
      error: "",
    };
  },
  validations: {

    suiviIndicateur: {
      DateSuivi: { require },
      Realisation: { require },
      Observations:{ require },
    },
    suiviUpdate: {
      DateSuivi: { require },
      Realisation: { require },
      Observations:{ require },
    },
  },
  async mounted() {
    console.log("loggedInUser", this.loggedInUser);
    await this.fetchIndicateurDetail()


  },
  methods: {
    successmsg: successmsg,
    goBack(){
      this.$router.go(-1)
    },
    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },
    handleCodeProjetChange(codeProjet) {
      // Logique pour gérer les changements de codeProjet
      console.log("Handling codeProjet change:", codeProjet);
      this.Code = codeProjet
      // Par exemple, mettre à jour les indicateurs ou autres données
    },




    async fetchIndicateurDetail() {
    

      try {
        const response = await axios.get(`/indicateurs/detail/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
         
        });

        console.log("usersOptionys", response.data.data);
        if (response.data.status === "success") {
          this.data = response.data.data;
          this.dataSuivi =  response.data.data.suivis
          this.SuiviOptions =  this.dataSuivi
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
    async submitIndicateur(modalId) {

      if (this.validateIndicateur()) {
        this.loading = true;

        this.Indicateurs.forEach(indicateur => {
          indicateur.CodeProjet = this.Code;
        });

        const dataToSend = {
          indicateurs: this.Indicateurs
        };
        console.log("data", dataToSend);


        try {
          const response = await axios.post("/indicateurs", dataToSend, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,

            }
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Indicateurs créés avec succès",
              "Les nouveaux indicateurs ont été créés avec succès !"
            );
            this.loading = false
            this.$emit('indicateur-updated');

          } else {
          }
        } catch (error) {
          console.log("response.login", error);

          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
        console.log("error", this.v$.$errors);
      }
    },
    async HandleIdUpdateSuivie(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/indicateurs/suivis/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response) {
          console.log("responsedata", response.data.data);
          let data = response.data.data;
          this.suiviUpdate.DateSuivi = data.DateSuivi,
            this.suiviUpdate.Realisation = data.Realisation,
            this.suiviUpdate.Observations = data.Observations,
            this.ToId = data.id;
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

    async submitUpdateSuivi(modalId) {
      this.v$.suiviUpdate.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true
        const dataSend = {
         
              id: this.ToId,
              CodeIndicateur: this.data.CodeIndicateur,
              DateSuivi: this.suiviUpdate.DateSuivi,
              Realisation: this.suiviUpdate.Realisation,
              Observations: this.suiviUpdate.Observations,
        }

        console.log(dataSend);
        try {
          const response = await axios.post('/indicateurs/suivis', dataSend, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          });

          console.log("usersOptions", response.data);
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Données du suivi indicateurs mises à jour",
              "Les données du suivi indicateurs ont été mises à jour avec succès !"
            );
            await this.fetchIndicateurDetail();
            this.loading = false;
          
          }
        } catch (error) {
          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }



      } else {
        console.log("cest pas bon ", this.v$.$errors);
        this.loading = false;
      }
    },
    async HandleIdDelete(id) {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        this.ConfirmeDelete(id);
      }
    },
    async ConfirmeDelete(id) {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/indicateurs/suivis/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Suivi indicateur supprimé",
            "Suivi indicateur a été supprimé avec succès."
          );
          await this.fetchIndicateurDetail();
          this.loading = false;
        } else {
          console.log("error", response.data);
          this.loading = false;
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);

        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },
    async submitSuiviIndicateur(modalId) {
      this.v$.suiviIndicateur.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          CodeIndicateur: this.data.CodeIndicateur,
          DateSuivi: this.suiviIndicateur.DateSuivi,
          Realisation: this.suiviIndicateur.Realisation,
          Observations: this.suiviIndicateur.Observations,
        }


        console.log("data", data);

        try {
          const response = await axios.post("/indicateurs/suivis", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` ,

          }
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Suivi indicateur créé avec succès",
              "un nouveaux indicateur a été créés avec succès !"
            );
            await this.fetchIndicateurDetail();
          } else {
          }
        } catch (error) {
          console.log("response.login", error);

          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
        console.log("error", this.v$.$errors);
      }
    },
    async HandleIdStatut(id) {
      this.loading = true;
      let data = {
        id:id
      }
      try {
        const response = await axios.put('/indicateurs/suivis/confirmer', data,{
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          
        });

        console.log("usersOptions", response.data);
        if (response.data.status === "success") {
          this.successmsg(
            "Données du suivi mises à jour",
            "Les données du suivi ont été mises à jour avec succès !"
          );
          await this.fetchIndicateurDetail();
          this.loading = false;
        }
      } catch (error) {
        if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
      }

    },

    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
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
    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur
        console.log(" errorMessages", errorMessages, typeof errorMessages);

        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
        console.log(
          " concatenatedError",
          concatenatedError,
          typeof concatenatedError
        );

        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet

      // Maintenant, this.resultError est un objet où les clés sont les noms des champs
      console.log("resultError", this.resultError);
    },

    filterByName() {
      this.currentPage = 1;
      if (this.search !== null) {
        const tt = this.search;
        const searchValue = tt.toLowerCase();
        this.SuiviOptions = this.dataSuivi.filter((user) => {
          const Nom = user.Observations || "";
          const Prenoms = user.DateSuivi || "";
          const Pseudo = user.Realisation || "";
          // const Email = user.email || "";
          return (
            Nom.toLowerCase().includes(searchValue) ||
            Prenoms.toLowerCase().includes(searchValue) ||
            Pseudo.toLowerCase().includes(searchValue)
          );
        });
      } else {
        this.SuiviOptions = [...this.dataSuivi];
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

  },
}
</script>
<style lang="css" scoped>

</style>