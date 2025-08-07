<template>
  <div>
    <div
      class="d-md-flex d-block pt-12 align-items-center justify-content-between my-4 page-header-breadcrumb"
    >
      <h1 class="page-title fw-semibold fs-18 mb-0">
        Acteurs & Etapes de paiement
      </h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Acteurs & Etapes de paiement
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="">
      <!-- Start::row-1 -->
      <div class="row">
        <div class="col-xl-12">
          <div class="pb-3">
            <div class="">
              <div
                class="d-flex align-items-center justify-content-between flex-wrap gap-2"
                style="border-bottom: 1px solid var(--secondary-rgb)"
              >
                <div>
                  <ul class="nav nav-tabs nav-tabs-header mb-0" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link active"
                        data-bs-toggle="tab"
                        role="tab"
                        aria-current="page"
                        href="#roles"
                        aria-selected="true"
                        >Acteurs de paiement</a
                      >
                    </li>

                    <li class="nav-item" role="presentation">
                      <a
                        class="nav-link"
                        data-bs-toggle="tab"
                        role="tab"
                        aria-current="page"
                        href="#permissions"
                        aria-selected="false"
                        tabindex="-1"
                      >
                        Etapes de paiement</a
                      >
                    </li>
                  </ul>
                </div>
                <div class="d-flex mt-sm-0 mt-2 align-items-center">
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
                    data-bs-target="#add_modal"
                  >
                    <i class="ri-add-line"> </i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--End::row-1 -->

      <!-- Start:: row-2 -->
      <div class="row p-0">
        <div class="col-xl-12 p-0">
          <div class="tab-content">
            <div
              class="tab-pane show active p-0 border-0"
              id="roles"
              role="tabpanel"
            >
              <Acteurs ref="acteursComponent"></Acteurs>
            </div>
            <div class="tab-pane p-0" id="permissions" role="tabpanel">
              <Etapes ref="etapesComponent"></Etapes>
            </div>
          </div>
        </div>
      </div>
      <!-- End:: row-2 -->

      <!-- Modal d'ajout pour les deux composants -->
      <div
        class="modal fade effect-rotate-bottom"
        id="add_modal"
        tabindex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        ref="add_modal"
      >
        <div class="modal-dialog modal-dialog-centered modal-lg">
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
                  >Ajouter des acteurs et étapes de paiement
                </b>
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
                <div>
                  <div
                    class="btn-list"
                    style="position: absolute; right: 7px; top: 5px"
                  >
                    <div class="bouttons">
                      <div
                        class="boutton"
                        style="width: 38px; z-index: 1000"
                        v-tippy="{
                          content: 'Ajouter un élément',
                          theme: 'custom',
                          animation: 'shift-away',
                          backgroundColor: '#FF5733',
                        }"
                        @click="AddformDataEtapeActeur"
                      >
                        <i class="ri-add-line"></i>
                      </div>
                    </div>
                  </div>
                  <div
                    class="row align-items-center p-2 border-bottom"
                    v-for="(etapeActeur, index) in EtapeActeur"
                    :key="etapeActeur.id"
                  >
                    <div class="col-11">
                      <span class="nombre">
                        {{ index + 1 }}
                      </span>
                      <div class="row content-group">
                        <div
                          class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                        >
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Code <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="etapeActeur.Code"
                              color="info"
                              name="Code"
                              size="sm"
                              rounded-size="sm"
                              type="text"
                              @input="
                                clearErrorEtapeActeur(index, 'Code')
                              "
                            />
                            <small
                              v-if="
                                errors.EtapeActeur &&
                                errors.EtapeActeur[index] &&
                                errors.EtapeActeur[index].Code
                              "
                              >{{
                                errors.EtapeActeur[index].Code
                              }}</small
                            >
                            <small v-if="resultError['EtapeActeur']">
                              {{ resultError["EtapeActeur"] }}
                            </small>
                          </div>
                        </div>
                        <div
                          class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                        >
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Description <span class="text-danger">*</span>
                            </label>
                            <textarea
                              class="form-control"
                              style="
                                border-radius: 0 !important;
                                border: 1px solid #e5eaee !important;
                              "
                              id="text-area"
                              v-model="etapeActeur.Description"
                              rows="1"
                            ></textarea>
                            <small
                              v-if="
                                errors.EtapeActeur &&
                                errors.EtapeActeur[index] &&
                                errors.EtapeActeur[index].Description
                              "
                              >{{
                                errors.EtapeActeur[index].Description
                              }}</small
                            >
                            <small v-if="resultError['EtapeActeur']">
                              {{ resultError["EtapeActeur"] }}
                            </small>
                          </div>
                        </div>

                        <div
                          class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                        >
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Type de financement
                              <span class="text-danger">*</span></label
                            >
                            <MazSelect
                              v-model="etapeActeur.CodeTypeFinancement"
                              color="info"
                              name="Description"
                              size="sm"
                              rounded-size="sm"
                              :options="ModeFinancementOptions"
                              @input="
                                clearErrorEtapeActeur(index, 'Description')
                              "
                              multiple
                            />
                            <small
                              v-if="
                                errors.EtapeActeur &&
                                errors.EtapeActeur[index] &&
                                errors.EtapeActeur[index].Description
                              "
                              >{{ errors.EtapeActeur[index].Description }}</small
                            >
                            <small v-if="resultError['EtapeActeur']">
                              {{ resultError["EtapeActeur"] }}
                            </small>
                          </div>
                        </div>
                        <div
                          class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12 d-flex align-items-end"
                        >
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Cochez pour sélectionner "ACTEUR" ou "ETAPE"
                              <span class="text-danger">*</span></label
                            >
                            <div class="row align-items-center">
                              <div class="col-6 d-flex">
                                <strong class="text-center">ACTEUR</strong>
                                <input
                                  class=""
                                  type="checkbox"
                                  v-model="etapeActeur.isActeur"
                                  name="isActeur"
                                  size="sm"
                                  rounded-size="sm"
                                  @click="handleCheckboxChange(index)"
                                />
                              </div>
                              <div class="col-6 d-flex">
                                <strong class="text-center">ETAPE</strong>
                                <input
                                  class=""
                                  type="checkbox"
                                  v-model="etapeActeur.isEtape"
                                  name="isEtape"
                                  size="sm"
                                  rounded-size="sm"
                                  @click="handleCheckboxChange(index)"
                                />
                              </div>
                            </div>

                            <small
                              v-if="
                                errors.EtapeActeur &&
                                errors.EtapeActeur[index] &&
                                errors.EtapeActeur[index].isActeur
                              "
                              >{{ errors.EtapeActeur[index].isActeur }}</small
                            >
                            <small v-if="resultError['EtapeActeur']">
                              {{ resultError["EtapeActeur"] }}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-1" style="position: relative">
                      <button
                        class="btn btn-sm btn-icon btn-danger btn-wave"
                        @click="deleteRowEtapeActeur(index)"
                        v-tippy="{
                          content: 'Supprimer cet élément',
                          theme: 'custom',
                          animation: 'shift-away',
                          backgroundColor: '#FF5733',
                        }"
                        style="
                          position: absolute !important ;
                          top: 18px !important;
                          background: red;
                        "
                      >
                        <i class="ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="boutton">
                    <button
                      class=""
                      @click.prevent="submitEtapeActeur('add_modal')"
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
  </div>
</template>
<script>
import Acteurs from "@/components/paiement/acteurs.vue";
import Etapes from "@/components/paiement/etapes.vue";
import axios from "@/lib/axiosConfig";
import { successmsg } from "@/lib/modal.js";

export default {
  components: {
    Acteurs,
    Etapes,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },

    // 'Code', 'TypeParam', 'Description','CodeTypeFinancement'
  },
  data() {
    return {
      ModeFinancementOptions: [],
      resultError: {},
      errors: { EtapeActeur: [] },
      EtapeActeur: [
        {
          Code: "",
          CodeTypeFinancement: [],
          Description: "",
          isEtape: false,
          isActeur: true,
        },
      ],
    };
  },
  async mounted() {
    await this.fetchModeFinancement();
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
    handleCheckboxChange(index) {
      this.EtapeActeur[index].isActeur = !this.EtapeActeur[index].isActeur;
      this.EtapeActeur[index].isEtape = !this.EtapeActeur[index].isEtape;
    },
    AddformDataEtapeActeur() {
      this.EtapeActeur.push({
        Code: "",
        CodeTypeFinancement: [],
        Description: "",
        isActeur: true,
        isEtape: false,
      });
    },
    deleteRowEtapeActeur(index) {
      if (index !== 0) {
        this.EtapeActeur.splice(index, 1);
      }
    },
    clearErrorEtapeActeur(index, field) {
      if (this.errors.EtapeActeur[index]) {
        this.errors.EtapeActeur[index][field] = null;
      }
    },
    validateEtapeActeur() {
      let isValid = true;
      this.errors = { EtapeActeur: [] };
      this.EtapeActeur.forEach((infrastructure, index) => {
        const infrastructureErrors = {};

        if (!infrastructure.Code) {
          infrastructureErrors.Code = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!infrastructure.Description) {
          infrastructureErrors.Description = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!infrastructure.CodeTypeFinancement) {
          infrastructureErrors.CodeTypeFinancement = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!infrastructure.isActeur && !infrastructure.isEtape) {
          infrastructureErrors.isActeur = "Ce champs est obligatoire!";
          isValid = false;
        }

        this.errors.EtapeActeur[index] = infrastructureErrors;
      });
      return isValid;
    },
    async submitEtapeActeur(modalId) {
      if (this.validateEtapeActeur()) {
        const data = this.EtapeActeur.map((etapeActeur) => {
          const data = {
            Code: etapeActeur.Code,
            Description: etapeActeur.Description,
            CodeTypeFinancement: etapeActeur.CodeTypeFinancement,
            TypeParam: etapeActeur.isActeur ? "ACTEUR" : "ETAPE",
          };
          return data;
        });
        const dataToSend = {
          params: data,
        };
        try {
          const response = await axios.post("/acteurs-etapes", dataToSend, {
            headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              
            },
          });

          if (response.data.status === "success") {
            this.EtapeActeur = [
              {
                Code: "",
                CodeTypeFinancement: [],
                Description: "",
                isActeur: true,
                isEtape: false,
              },
            ];
            this.closeModal(modalId);
            this.successmsg(
              "Acteurs et étapes de paiement créés avec succès",
              "Des nouveaux acteurs et étapes de paiement ont été créés avec succès !"
            );

            // Rafraîchir les deux composants
            if (this.$refs.acteursComponent) {
              await this.$refs.acteursComponent.fetchActeurs();
            }
            if (this.$refs.etapesComponent) {
              await this.$refs.etapesComponent.fetchClients();
            }
          }
        } catch (error) {
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrorsMultiple(
              error.response.data.errors,
              "EtapeActeur"
            );
          }
        }
      }
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
          this.ModeFinancementOptions = [];

          response.data.data.map((item) => {
            this.ModeFinancementOptions.push({
              label: item.Code + "(" + item.Intitule + ")",
              value: item.Code,
            });
          });
        }
      } catch (error) {
        if (error.response.data.status === "error") {
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
        const [_, index, fieldName] = field.match(
          new RegExp(`${entity.toLowerCase()}\\.(\\d+)\\.(\\w+)`)
        );

        if (!formattedErrors[entity][index]) {
          formattedErrors[entity][index] = {};
        }

        formattedErrors[entity][index][fieldName] = errorMessages[0];
      }

      this.errors = formattedErrors;
    },
  },
};
</script>
<style lang="css" scoped></style>
