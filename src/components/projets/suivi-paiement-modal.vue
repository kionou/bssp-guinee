<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>

    <!-- Modal principal de suivi de paiement -->
    <div
      class="modal fade effect-rotate-bottom"
      id="view-payement"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="view-payement"
    >
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div
            class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px"
          >
            <h2
              class="modal-title text-white text-center"
              id="mail-ComposeLabel"
              style="font-size: 22px !important"
            >
              <b class="text-center"
                >Suivi de paiement - {{ infrastructureCode }}</b
              >
            </h2>
          </div>
          <div class="modal-body px-4">
            <!-- En-tête avec recherche et bouton d'ajout -->
            <div class="contact-header mb-3 py-2 px-1">
              <div
                class="d-sm-flex d-block align-items-center justify-content-between"
              >
                <div class="h5 fw-semibold mb-0"></div>
                <div class="d-flex mt-sm-0 mt-2 align-items-center">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      placeholder="Recherchez..."
                      aria-describedby="search-member"
                      v-model="searchSuivis"
                      @input="filterSuivis"
                    />
                    <button
                      class="btn btn-light"
                      type="button"
                      id="search-contact-member"
                    >
                      <i class="ri-search-line text-muted"></i>
                    </button>
                  </div>

                  <button
                    v-if="hasPermission(3)"
                    class="btn btn-icon btn-primary ms-2"
                    data-bs-placement="top"
                    v-tippy="{
                      content: 'Créer un nouvel élément',
                      theme: 'custom',
                      animation: 'shift-away',
                      backgroundColor: '#FF5733',
                    }"
                    data-bs-title="Add Contact"
                    data-bs-toggle="modal"
                    data-bs-target="#add_suivi_paiement"
                  >
                    <i class="ri-add-line"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- Table des paiements -->
            <div class="col-xl-12" data-aos="zoom-in">
              <div class="card custom-card">
                <div class="card-header justify-content-between">
                  <div class="card-title">Liste des paiements</div>
                </div>
                <div class="card-body">
                  <!-- Indicateur de chargement -->
                  <div v-if="loading" class="text-center py-4">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Chargement...</span>
                    </div>
                    <p class="mt-2 text-muted">Chargement des données...</p>
                  </div>

                  <!-- Table des données -->
                  <div
                    v-else
                    style="overflow-x: scroll !important"
                    class="table-responsive"
                  >
                    <table
                      class="table text-nowrap table-hover border table-bordered table-striped"
                    >
                      <thead>
                        <tr>
                          <th scope="col">Date d'émission</th>
                          <th scope="col">Délai requis</th>
                          <th scope="col">Financement</th>
                          <th scope="col">Acteurs</th>
                          <th scope="col">Étapes</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>
                      <tbody v-if="paginatedSuivis.length === 0">
                        <tr>
                          <td colspan="6">
                            <div
                              class="badge bg-warning-transparent"
                              style="width: 100%; font-size: 14px"
                            >
                              Pas de données !!
                            </div>
                          </td>
                        </tr>
                      </tbody>
                      <tbody v-else data-aos="fade-up" data-aos-duration="1000">
                        <tr v-for="suivi in paginatedSuivis" :key="suivi.id">
                          <td class="text-danger">{{ formatDate(suivi.DateEmission) }}</td>
                          <td>{{ suivi.Delay }} jours</td>
                          <td>
                            <span class="badge bg-primary-transparent">
                              {{ suivi.mode?.Intitule  }} ({{ suivi.mode?.Code}})
                            </span>
                          </td>
                          <td>
                            <span class="badge bg-info-transparent">
                              {{ formatArray(suivi.Acteurs)}}
                            </span>
                          </td>
                          <td>
                            <span class="badge bg-success-transparent">
                              {{ formatArray(suivi.Etapes) }}
                            </span>
                          </td>
                          <td style="width: 80px">
                            <div class="hstack gap-2 fs-15">
                              <!-- <button
                                v-if="hasPermission(2)"
                                class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-info"
                                v-tippy="{
                                  content: 'Modifier l\'élément sélectionné',
                                  theme: 'custom',
                                  animation: 'shift-away',
                                  backgroundColor: '#FF5733',
                                }"
                                data-bs-toggle="modal"
                                data-bs-target="#update_suivi_paiement"
                                @click="handleEditSuivi(suivi)"
                              >
                                <i class="ri-edit-line"></i>
                              </button> -->
                              <button
                                v-if="hasPermission(4)"
                                class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-danger"
                                v-tippy="{
                                  content: 'Supprimer cet élément',
                                  theme: 'custom',
                                  animation: 'shift-away',
                                  backgroundColor: '#FF5733',
                                }"
                                @click="handleDeleteSuivi(suivi.id)"
                              >
                                <i class="ri-delete-bin-line"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div
                  class="card-footer"
                  v-if="!loading && paginatedSuivis.length > 0"
                >
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="container_pagination">
                        <Pag
                          :current-page="currentPageSuivis"
                          :total-pages="totalPagesSuivis"
                          @page-change="updateCurrentPageSuivis"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <div class="btn-group ms-auto">
              <button
                type="button"
                class="btn btn-danger"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal d'ajout de suivi de paiement -->
    <div
      class="modal fade effect-rotate-bottom"
      id="add_suivi_paiement"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_suivi_paiement"
    >
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div
            class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px"
          >
            <h2
              class="modal-title text-white text-center"
              id="mail-ComposeLabel"
              style="font-size: 22px !important"
            >
              <b class="text-center">Ajouter un suivi de  paiement</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div
              class="row gy-2 justify-content-center"
              style="
                border-width: 1px;
                border-style: solid;
                border-radius: 6px;
                border-color: rgb(0, 77, 134);
              "
            >
              <div class="row">
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="DateEmission"
                      >Date d'émission <span class="text-danger">*</span></label
                    >
                    <MazInput
                      v-model="formData.DateEmission"
                      color="info"
                      name="DateEmission"
                      size="sm"
                      rounded-size="sm"
                      type="date"
                    />
                    <small v-if="v$.formData.DateEmission.$error">{{
                      v$.formData.DateEmission.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['DateEmission']">
                      {{ resultError["DateEmission"] }}
                    </small>
                  </div>
                </div>

                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="Delay"
                      >Délai requis <span class="text-danger">*</span></label
                    >
                    <MazInput
                      v-model="formData.Delay"
                      color="info"
                      name="Delay"
                      size="sm"
                      rounded-size="sm"
                      type="number"
                      placeholder="Nombre de jours"
                    />
                    <small v-if="v$.formData.Delay.$error">{{
                      v$.formData.Delay.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['Delay']">
                      {{ resultError["Delay"] }}
                    </small>
                  </div>
                </div>

                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="CodeTypeFinancement"
                      >Mode de financement
                      <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="formData.CodeTypeFinancement"
                      color="info"
                      name="CodeTypeFinancement"
                      size="sm"
                      rounded-size="sm"
                      :options="ModeFinancementOptions"
                      @change="onFinancementChange"
                    />
                    <small v-if="v$.formData.CodeTypeFinancement.$error">{{
                      v$.formData.CodeTypeFinancement.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['CodeTypeFinancement']">
                      {{ resultError["CodeTypeFinancement"] }}
                    </small>
                  </div>
                </div>

                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="Acteurs"
                      >Acteurs <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="formData.Acteurs"
                      color="info"
                      name="Acteurs"
                      size="sm"
                      rounded-size="sm"
                      :options="filteredActeursOptions"
                      multiple
                      :disabled="!formData.CodeTypeFinancement"
                    />
                    <small v-if="v$.formData.Acteurs.$error">{{
                      v$.formData.Acteurs.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['Acteurs']">
                      {{ resultError["Acteurs"] }}
                    </small>
                  </div>
                </div>

                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="Etapes"
                      >Étapes <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="formData.Etapes"
                      color="info"
                      name="Etapes"
                      size="sm"
                      rounded-size="sm"
                      :options="filteredEtapesOptions"
                      multiple
                      :disabled="!formData.CodeTypeFinancement"
                    />
                    <small v-if="v$.formData.Etapes.$error">{{
                      v$.formData.Etapes.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['Etapes']">
                      {{ resultError["Etapes"] }}
                    </small>
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="submitSuiviPaiement('add_suivi_paiement')"
                  >
                    Valider
                  </button>
                </div>
              </div>
            </div>

            <br />
            <div class="modal-footer">
              <div class="btn-group ms-auto">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de modification de suivi de paiement -->
    <div
      class="modal fade effect-rotate-bottom"
      id="update_suivi_paiement"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_suivi_paiement"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div
            class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px"
          >
            <h2
              class="modal-title text-white text-center"
              id="mail-ComposeLabel"
              style="font-size: 22px !important"
            >
              <b class="text-center">Modifier un suivi de  paiement</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div
              class="row gy-2 justify-content-center"
              style="
                border-width: 1px;
                border-style: solid;
                border-radius: 6px;
                border-color: rgb(0, 77, 134);
              "
            >
              <div class="row">
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="DateEmission"
                      >Date d'émission <span class="text-danger">*</span></label
                    >
                    <MazInput
                      v-model="editFormData.DateEmission"
                      color="info"
                      name="DateEmission"
                      size="sm"
                      rounded-size="sm"
                      type="date"
                    />
                    <small v-if="v$.editFormData.DateEmission.$error">{{
                      v$.editFormData.DateEmission.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['DateEmission']">
                      {{ resultError["DateEmission"] }}
                    </small>
                  </div>
                </div>

                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="Delay"
                      >Délai requis <span class="text-danger">*</span></label
                    >
                    <MazInput
                      v-model="editFormData.Delay"
                      color="info"
                      name="Delay"
                      size="sm"
                      rounded-size="sm"
                      type="number"
                      placeholder="Nombre de jours"
                    />
                    <small v-if="v$.editFormData.Delay.$error">{{
                      v$.editFormData.Delay.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['Delay']">
                      {{ resultError["Delay"] }}
                    </small>
                  </div>
                </div>

                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="CodeTypeFinancement"
                      >Mode de financement
                      <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="editFormData.CodeTypeFinancement"
                      color="info"
                      name="CodeTypeFinancement"
                      size="sm"
                      rounded-size="sm"
                      :options="ModeFinancementOptions"
                      @change="onEditFinancementChange"
                    />
                    <small v-if="v$.editFormData.CodeTypeFinancement.$error">{{
                      v$.editFormData.CodeTypeFinancement.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['CodeTypeFinancement']">
                      {{ resultError["CodeTypeFinancement"] }}
                    </small>
                  </div>
                </div>

                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="Acteurs"
                      >Acteurs <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="editFormData.Acteurs"
                      color="info"
                      name="Acteurs"
                      size="sm"
                      rounded-size="sm"
                      :options="filteredEditActeursOptions"
                      multiple
                      :disabled="!editFormData.CodeTypeFinancement"
                    />
                    <small v-if="v$.editFormData.Acteurs.$error">{{
                      v$.editFormData.Acteurs.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['Acteurs']">
                      {{ resultError["Acteurs"] }}
                    </small>
                  </div>
                </div>

                <div class="col-xl-12 col-md-12 col-sm-12">
                  <div class="input-groupe">
                    <label for="Etapes"
                      >Étapes <span class="text-danger">*</span></label
                    >
                    <MazSelect
                      v-model="editFormData.Etapes"
                      color="info"
                      name="Etapes"
                      size="sm"
                      rounded-size="sm"
                      :options="filteredEditEtapesOptions"
                      multiple
                      :disabled="!editFormData.CodeTypeFinancement"
                    />
                    <small v-if="v$.editFormData.Etapes.$error">{{
                      v$.editFormData.Etapes.$errors[0].$message
                    }}</small>
                    <small v-if="resultError['Etapes']">
                      {{ resultError["Etapes"] }}
                    </small>
                  </div>
                </div>
              </div>

              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="
                      submitUpdateSuiviPaiement('update_suivi_paiement')
                    "
                  >
                    Valider
                  </button>
                </div>
              </div>

              
            </div>

            <br />
            <div class="modal-footer">
              
              <div class="btn-group ms-auto">
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
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
import Loading from "@/components/others/loading.vue";
import Pag from "@/components/others/pagination.vue";
import { require } from "@/functions/rules";
import axios from "@/lib/axiosConfig";
import { successmsg } from "@/lib/modal.js";
import useVuelidate from "@vuelidate/core";
import Swal from "sweetalert2";

export default {
  name: "SuiviPaiementModal",
  components: { Loading, Pag },
  props: {
    infrastructureCode: {
      type: String,
      required: true,
    },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPagesSuivis() {
      const filtered = Array.isArray(this.filteredSuivis)
        ? this.filteredSuivis
        : [];
      return Math.ceil(filtered.length / this.itemsPerPage);
    },
    paginatedSuivis() {
      const filtered = Array.isArray(this.filteredSuivis)
        ? this.filteredSuivis
        : [];
      const startIndex = (this.currentPageSuivis - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return filtered.slice(startIndex, endIndex);
    },
    filteredSuivis() {
      if (!this.searchSuivis) {
        return Array.isArray(this.suivisPaiement) ? this.suivisPaiement : [];
      }
      const searchValue = this.searchSuivis.toLowerCase();
      const suivis = Array.isArray(this.suivisPaiement)
        ? this.suivisPaiement
        : [];
      return suivis.filter((suivi) => {
        const financement = suivi.CodeTypeFinancement || "";
        const acteurs = this.formatArray(suivi.Acteurs) || "";
        const etapes = this.formatArray(suivi.Etapes) || "";
        return (
          financement.toLowerCase().includes(searchValue) ||
          acteurs.toLowerCase().includes(searchValue) ||
          etapes.toLowerCase().includes(searchValue)
        );
      });
    },
    filteredActeursOptions() {
      if (!this.formData.CodeTypeFinancement) return [];
      return this.acteursPaiement
        .filter(
          (acteur) =>
            acteur.CodeTypeFinancement &&
            (Array.isArray(acteur.CodeTypeFinancement)
              ? acteur.CodeTypeFinancement.includes(
                  this.formData.CodeTypeFinancement
                )
              : acteur.CodeTypeFinancement ===
                this.formData.CodeTypeFinancement)
        )
        .map((acteur) => ({
          label: `${acteur.Code} - ${acteur.Description}`,
          value: acteur.Code,
        }));
    },
    filteredEtapesOptions() {
      if (!this.formData.CodeTypeFinancement) return [];
      return this.etapesPaiement
        .filter(
          (etape) =>
            etape.CodeTypeFinancement &&
            (Array.isArray(etape.CodeTypeFinancement)
              ? etape.CodeTypeFinancement.includes(
                  this.formData.CodeTypeFinancement
                )
              : etape.CodeTypeFinancement === this.formData.CodeTypeFinancement)
        )
        .map((etape) => ({
          label: `${etape.Code} - ${etape.Description}`,
          value: etape.Code,
        }));
    },
    filteredEditActeursOptions() {
      if (!this.editFormData.CodeTypeFinancement) return [];
      return this.acteursPaiement
        .filter(
          (acteur) =>
            acteur.CodeTypeFinancement &&
            (Array.isArray(acteur.CodeTypeFinancement)
              ? acteur.CodeTypeFinancement.includes(
                  this.editFormData.CodeTypeFinancement
                )
              : acteur.CodeTypeFinancement ===
                this.editFormData.CodeTypeFinancement)
        )
        .map((acteur) => ({
          label: `${acteur.Code} - ${acteur.Description}`,
          value: acteur.Code,
        }));
    },
    filteredEditEtapesOptions() {
      if (!this.editFormData.CodeTypeFinancement) return [];
      return this.etapesPaiement
        .filter(
          (etape) =>
            etape.CodeTypeFinancement &&
            (Array.isArray(etape.CodeTypeFinancement)
              ? etape.CodeTypeFinancement.includes(
                  this.editFormData.CodeTypeFinancement
                )
              : etape.CodeTypeFinancement ===
                this.editFormData.CodeTypeFinancement)
        )
        .map((etape) => ({
          label: `${etape.Code} - ${etape.Description}`,
          value: etape.Code,
        }));
    },
  },
  data() {
    return {
      loading: false,
      error: "",
      resultError: {},
      v$: useVuelidate(),

      // Données pour les acteurs et étapes
      acteursPaiement: [],
      etapesPaiement: [],
      ModeFinancementOptions: [],
      suivisPaiement: [],

      // Pagination
      currentPageSuivis: 1,
      itemsPerPage: 10,

      // Recherche
      searchSuivis: "",

      // Formulaire
      formData: {
        DateEmission: "",
        Delay: "",
        CodeTypeFinancement: "",
        Acteurs: [],
        Etapes: [],
      },
      editFormData: {
        DateEmission: "",
        Delay: "",
        CodeTypeFinancement: "",
        Acteurs: [],
        Etapes: [],
      },
      editingId: null,
    };
  },
  validations: {
    formData: {
      DateEmission: { require },
      Delay: { require },
      CodeTypeFinancement: { require },
      Acteurs: { require },
      Etapes: { require },
    },
    editFormData: {
      DateEmission: { require },
      Delay: { require },
      CodeTypeFinancement: { require },
      Acteurs: { require },
      Etapes: { require },
    },
  },
  watch: {
    infrastructureCode: {
      handler(newVal, oldVal) {
        if (newVal && newVal !== oldVal) {
          this.resetForm();
          // Ne plus appeler fetchSuivisPaiement ici, il sera appelé manuellement depuis le parent
          // this.fetchSuivisPaiement(newVal);
        }
      },
      immediate: false,
    },
  },
  async mounted() {
    await this.fetchModeFinancement();
    await this.fetchActeursEtapes();
    // Ne pas appeler fetchSuivisPaiement ici, il sera appelé par le watcher quand infrastructureCode change

    // Écouter les événements de fermeture des modals
    this.$nextTick(() => {
      const modal = document.getElementById("view-payement");
      if (modal) {
        modal.addEventListener("hidden.bs.modal", this.onModalHidden);
      }
    });
  },
  beforeUnmount() {
    // Nettoyer les événements
    const modal = document.getElementById("view-payement");
    if (modal) {
      modal.removeEventListener("hidden.bs.modal", this.onModalHidden);
    }
  },
  methods: {
    successmsg: successmsg,
    onModalHidden() {
      // Nettoyer les données quand le modal se ferme
      this.resetForm();
      this.searchSuivis = "";
      this.currentPageSuivis = 1;
      this.suivisPaiement = []; // Vider la liste des suivis
      this.loading = false; // Réinitialiser l'état de chargement
    },
    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },

    async fetchModeFinancement() {
      try {
        const response = await axios.get("/mode-financements", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: {
            statut: true,
          },
        });

        if (response.data.status === "success") {
          this.ModeFinancementOptions = response.data.data.map((item) => ({
            label: item.Code + "(" + item.Intitule + ")",
            value: item.Code,
          }));
        }
      } catch (error) {
        if (error.response?.data?.status === "error") {
          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/");
          }
        }
      }
    },

    async fetchActeursEtapes() {
      this.loading = true;
      try {
        // Récupérer les acteurs
        const responseActeurs = await axios.get("/acteurs-etapes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: {
            type: "ACTEUR",
          },
        });

        // Récupérer les étapes
        const responseEtapes = await axios.get("/acteurs-etapes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: {
            type: "ETAPE",
          },
        });

        if (responseActeurs.data.status === "success") {
          this.acteursPaiement = responseActeurs.data.data;
        }

        if (responseEtapes.data.status === "success") {
          this.etapesPaiement = responseEtapes.data.data;
        }

        this.loading = false;
      } catch (error) {
        this.loading = false;
        if (error.response?.data?.status === "error") {
          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/");
          }
        } else {
          this.formatValidationErrors(error.response?.data?.errors);
        }
      }
    },

    async fetchSuivisPaiement(code) {
      // Ne pas faire d'appel API si le code est vide
      if (!code || code.trim() === "") {
        this.suivisPaiement = [];
        return;
      }

      this.loading = true; // Démarrer le chargement

      try {
        const response = await axios.get("/payment-suivis", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: {
            code_infrastructure: code,
          },
        });

        if (response.data.status === "success") {
          // S'assurer que suivisPaiement est toujours un tableau
          const data = response.data?.data;
          if (Array.isArray(data)) {
            this.suivisPaiement = data;
          } else if (data && typeof data === "object") {
            // Si c'est un objet unique, le mettre dans un tableau
            this.suivisPaiement = [data];
          } else {
            this.suivisPaiement = [];
          }
        } else {
          this.suivisPaiement = [];
        }

        console.log(" this.suivisPaiement", this.suivisPaiement);
      } catch (error) {
        this.suivisPaiement = [];
        if (error.response?.data?.status === "error") {
          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/");
          }
        }
      } finally {
        this.loading = false; // Arrêter le chargement
      }
    },

    onFinancementChange() {
      // Réinitialiser les sélections quand le financement change
      this.formData.Acteurs = [];
      this.formData.Etapes = [];
    },

    onEditFinancementChange() {
      // Réinitialiser les sélections quand le financement change dans l'édition
      this.editFormData.Acteurs = [];
      this.editFormData.Etapes = [];
    },

    formatDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("fr-FR", options);
    },

    formatArray(array) {
      if (!array || array.length === 0) return "Aucun";
      if (Array.isArray(array)) {
        return array.join(", ");
      }
      return array;
    },

    filterSuivis() {
      this.currentPageSuivis = 1;
    },

    updateCurrentPageSuivis(pageNumber) {
      this.currentPageSuivis = pageNumber;
    },

    handleEditSuivi(suivi) {
      this.editingId = suivi.id;
      this.editFormData = {
        DateEmission: suivi.DateEmission,
        Delay: suivi.Delay,
        CodeTypeFinancement: suivi.CodeTypeFinancement,
        Acteurs: Array.isArray(suivi.Acteurs) ? suivi.Acteurs : [suivi.Acteurs],
        Etapes: Array.isArray(suivi.Etapes) ? suivi.Etapes : [suivi.Etapes],
      };
    },

    async handleDeleteSuivi(id) {
      const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous ne pourrez pas annuler cette action !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      });

      if (result.isConfirmed) {
        this.loading = true;
        try {
          const response = await axios.delete(`/payment-suivis/${id}`, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.data.status === "success") {
            this.successmsg(
              "Suivi supprimé avec succès",
              "Le suivi de paiement a été supprimé avec succès !"
            );
            await this.fetchSuivisPaiement( this.infrastructureCode);

          }
        } catch (error) {
          this.loading = false;
          if (error.response?.data?.status === "error") {
            if (
              error.response.data.message === "Vous n'êtes pas autorisé." ||
              error.response.status === 401
            ) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/");
            }
          } else {
            this.formatValidationErrors(error.response?.data?.errors);
          }
        }
      }
    },

    async submitSuiviPaiement(modalId) {
      this.v$.formData.$touch();
      if (this.v$.$errors.length === 0) {
        this.loading = true;

        const dataToSend = {
          SuiviPayment: [
            {
              CodeTypeFinancement: this.formData.CodeTypeFinancement,
              CodeInfrastructure: this.infrastructureCode,
              Delay: parseInt(this.formData.Delay),
              Etapes: this.formData.Etapes,
              Acteurs: this.formData.Acteurs,
              DateEmission: this.formData.DateEmission,
            },
          ],
        };

        try {
          const endpoint = "/payment-suivis";

          const method = "post";

          const response = await axios[method](endpoint, dataToSend, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.resetForm();
            this.successmsg(
              "Suivi créé avec succès",
              "Le nouveau suivi de paiement a été créé avec succès !"
            );
            await this.fetchSuivisPaiement( this.infrastructureCode);
          }
        } catch (error) {
          this.loading = false;
          if (error.response?.data?.status === "error") {
            if (
              error.response.data.message === "Vous n'êtes pas autorisé." ||
              error.response.status === 401
            ) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/");
            }
          } else {
            this.formatValidationErrors(error.response?.data?.errors);
          }
        }
      }
    },

    async submitUpdateSuiviPaiement(modalId) {
      this.v$.editFormData.$touch();
      if (this.v$.$errors.length === 0) {
        this.loading = true;

        const dataToSend = {
          SuiviPayment: [
            {
              id: this.editingId,
              CodeTypeFinancement: this.editFormData.CodeTypeFinancement,
              CodeInfrastructure: this.infrastructureCode,
              Delay: parseInt(this.editFormData.Delay),
              Etapes: this.editFormData.Etapes,
              Acteurs: this.editFormData.Acteurs,
              DateEmission: this.editFormData.DateEmission,
            },
          ],
        };

        try {
          const endpoint = `/payment-suivis/update/${this.editingId}`;

          const method = "put";

          const response = await axios[method](endpoint, dataToSend, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.resetForm();
            this.successmsg(
              "Suivi mis à jour avec succès",
              "Le suivi de paiement a été mis à jour avec succès !"
            );
            await this.fetchSuivisPaiement();
          }
        } catch (error) {
          this.loading = false;
          if (error.response?.data?.status === "error") {
            if (
              error.response.data.message === "Vous n'êtes pas autorisé." ||
              error.response.status === 401
            ) {
              await this.$store.dispatch("auth/clearMyAuthenticatedUser");
              this.$router.push("/");
            }
          } else {
            this.formatValidationErrors(error.response?.data?.errors);
          }
        }
      }
    },

    resetForm() {
      this.formData = {
        DateEmission: "",
        Delay: "",
        CodeTypeFinancement: "",
        Acteurs: [],
        Etapes: [],
      };
      this.editFormData = {
        DateEmission: "",
        Delay: "",
        CodeTypeFinancement: "",
        Acteurs: [],
        Etapes: [],
      };
      this.editingId = null;
      this.v$.formData.$reset();
      this.v$.editFormData.$reset();
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

    formatValidationErrors(errors) {
      const formattedErrors = {};
      for (const field in errors) {
        const errorMessages = errors[field];
        const concatenatedError = errorMessages.join(", ");
        formattedErrors[field] = concatenatedError;
      }
      this.resultError = formattedErrors;
    },
  },
};
</script>

<style lang="css" scoped>
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

.input-groupe {
  margin-bottom: 15px;
}

.input-groupe label {
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}


</style>
