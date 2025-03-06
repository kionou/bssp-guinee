<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div
      class="d-md-flex pt-12 d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
    >
      <h1 class="page-title fw-semibold fs-18 mb-0">Bailleurs</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Bailleurs</li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Page Header Close -->

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
              v-model="search"
              @input="filterByName"
            />
            <button class="btn btn-light" type="button" id="search-contact-member">
              <i class="ri-search-line text-muted"></i>
            </button>
          </div>

          <button
            v-if="hasPermission(3)"
            class="btn btn-icon btn-primary ms-2"
            data-bs-placement="top"
            data-bs-title="Add Contact"
            data-bs-toggle="modal"
            data-bs-target="#add_bailleur"
             v-tippy="{ content: 'Créer un nouvel élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
          >
            <i class="ri-add-line"> </i>
          </button>
        </div>
      </div>
    </div>

    <div class="col-xl-12" data-aos="zoom-in">
      <div class="card custom-card">
        <div class="card-header justify-content-between">
          <div class="card-title">Liste des Bailleurs</div>
        </div>
        <div class="card-body">
          <div style="overflow-x: scroll !important" class="table-responsive">
            <table
              class="table text-nowrap table-hover border table-bordered table-striped"
            >
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Nom</th>
                  <th scope="col">Etat</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody v-if="paginatedItems.length === 0">
                <tr>
                  <td colspan="18">
                    <div
                      class="badge bg-warning-transparent"
                      style="width: 100%; font-size: 14px"
                    >
                      Pas de données !
                    </div>
                  </td>
                </tr>
              </tbody>
              <tbody v-else ata-aos="fade-up" data-aos-duration="1000" d>
                <tr v-for="data in paginatedItems" :key="data.id">
                  <th scope="row" class="ps-4">{{ data.CodeBailleur }}</th>

                  <td>
                    <span class="">
                      {{ data.NomBailleur }}
                    </span>
                  </td>
                  <td>
                    <span v-if="data.Visible == '1'" class="badge bg-success"
                      >Activer</span
                    >
                    <span v-else class="badge bg-warning">Desactiver</span>
                  </td>
                  <td style="width:80px">
                    <div class="hstack gap-2 fs-15">
                      <button
                        v-if="hasPermission(2)"
                        class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-info"
                        data-bs-toggle="modal"
                        data-bs-target="#update_bailleur"
                        @click="HandleIdUpdate(data.id)"
                        v-tippy="{ content: 'Modifier l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                      >
                        <i class="ri-edit-line"></i>
                      </button>
                      <button
                        v-if="hasPermission(4)"
                        class="btn btn-icon btn-wave waves-effect btn-sm btn-danger"
                        @click="HandleIdDelete(data.id)"
                          v-tippy="{ content: 'Supprimer cet élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
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
        <div class="card-footer">
          <div class="row">
            <div class="col-lg-12">
              <div class="container_pagination">
                <Pag
                  :current-page="currentPage"
                  :total-pages="totalPages"
                  @page-change="updateCurrentPage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- add indicateur -->

    <div
      class="modal fade effect-rotate-bottom"
      id="add_bailleur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_bailleur"
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
              <b class="text-center">Ajouter un bailleur </b>
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
                <div class="btn-list" style="position: absolute; right: 7px; top: 5px">
                  <div class="bouttons">
                    <div
                      class="boutton"
                      style="width: 38px; z-index: 1000"
                      @click="AddformDataBailleurs"
                       v-tippy="{ content: 'Ajouter une autre ligne pour créer un nouveau élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                    >
                      <i class="ri-add-line"></i>
                    </div>
                  </div>
                </div>
                <div
                  class="row align-items-center p-2 border-bottom"
                  v-for="(bailleur, index) in Bailleurs"
                  :key="bailleur.id"
                >
                  <div class="col-11">
                    <span class="nombre">
                      {{ index + 1 }}
                    </span>
                    <div class="row content-group">
                      <div class="col">
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Code <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="bailleur.CodeBailleur"
                            color="info"
                            name="CodeBailleur"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            @input="clearErrorBailleurs(index, 'CodeBailleur')"
                          />
                          <small
                            v-if="
                              errors.Bailleurs &&
                              errors.Bailleurs[index] &&
                              errors.Bailleurs[index].CodeBailleur
                            "
                            >{{ errors.Bailleurs[index].CodeBailleur }}</small
                          >
                          <small v-if="resultError['Bailleurs']">
                            {{ resultError["Bailleurs"] }}
                          </small>
                        </div>
                      </div>
                      <div class="col">
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Nom <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="bailleur.NomBailleur"
                            color="info"
                            name="NomBailleur"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            @input="clearErrorBailleurs(index, 'NomBailleur')"
                          />
                          <small
                            v-if="
                              errors.Bailleurs &&
                              errors.Bailleurs[index] &&
                              errors.Bailleurs[index].NomBailleur
                            "
                            >{{ errors.Bailleurs[index].NomBailleur }}</small
                          >
                          <small v-if="resultError['Bailleurs']">
                            {{ resultError["Bailleurs"] }}
                          </small>
                        </div>
                      </div>
                      <div class="col">
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Visible <span class="text-danger">*</span></label
                          >
                          <MazSelect
                            v-model="bailleur.Visible"
                            color="info"
                            name="Visible"
                            size="sm"
                            rounded-size="sm"
                            :options="choix"
                            @click="clearErrorBailleurs(index, 'Visible')"
                          />
                          <small
                            v-if="
                              errors.Bailleurs &&
                              errors.Bailleurs[index] &&
                              errors.Bailleurs[index].Visible
                            "
                            >{{ errors.Bailleurs[index].Visible }}</small
                          >
                          <small v-if="resultError['Bailleurs']">
                            {{ resultError["Bailleurs"] }}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    <button
                      class="btn btn-sm btn-icon btn-danger btn-wave"
                      @click="deleteRowBailleurs(index)"
                      style="
                        position: absolute !important ;
                        top: 18px !important;
                        background: red;
                      "
                        v-tippy="{ content: 'Supprimer cet élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                    >
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitBailleur('add_bailleur')">
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

    <div
      class="modal fade effect-rotate-bottom"
      id="update_bailleur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_bailleur"
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
              <b class="text-center">Modifier un bailleur</b>
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
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">
                        Code <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.CodeBailleur"
                        color="info"
                        name="CodeBailleur"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                      />
                      <small v-if="v$.step2.CodeBailleur.$error">{{
                        v$.step2.CodeBailleur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['CodeBailleur']">
                        {{ resultError["CodeBailleur"] }}
                      </small>
                    </div>
                  </div>
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Nom <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.NomBailleur"
                        type="text"
                        color="info"
                        name="NomBailleur"
                        size="sm"
                        rounded-size="sm"
                      />
                      <small v-if="v$.step2.NomBailleur.$error">{{
                        v$.step2.NomBailleur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['NomBailleur']">
                        {{ resultError["NomBailleur"] }}
                      </small>
                    </div>
                  </div>
                </div>

                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Visible <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step2.Visibles"
                        type="text"
                        color="info"
                        name="Visibles"
                        size="sm"
                        rounded-size="sm"
                        :options="choix"
                      />
                      <small v-if="v$.step2.Visibles.$error">{{
                        v$.step2.Visibles.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['Visible']">
                        {{ resultError["Visible"] }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="submitUpdateBailleur('update_bailleur')"
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
import axios from "@/lib/axiosConfig";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import Swal from "sweetalert2";
export default {
  components: {
    Loading,
    Pag,
    MazPhoneNumberInput,
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
        { label: "Non", value: "non" },
      ],
      errors: { Bailleurs: [] },
      Bailleurs: [
        {
          CodeBailleur: "",
          NomBailleur: "",
          Visible: "",
        },
      ],
      step2: {
        CodeBailleur: "",
        NomBailleur: "",
        Visibles: "",
      },
      v$: useVuelidate(),
      error: "",
    };
  },
  validations: {
    step2: {
      CodeBailleur: { require },
      NomBailleur: { require },
      Visibles: { require },
    },
  },
  async mounted() {
    // console.log("loggedInUser", this.loggedInUser);
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
    AddformDataBailleurs() {
      this.Bailleurs.push({ CodeBailleur: "", NomBailleur: "", Visible: "" });
    },
    deleteRowBailleurs(index) {
      if (index !== 0) {
        this.Bailleurs.splice(index, 1);
      }
    },
    clearErrorBailleurs(index, field) {
      if (this.errors.Bailleurs[index]) {
        this.errors.Bailleurs[index][field] = null;
      }
    },
    validateBailleurs() {
      let isValid = true;
      this.errors = { Bailleurs: [] };
      this.Bailleurs.forEach((bailleur, index) => {
        const bailleurErrors = {};
        if (!bailleur.CodeBailleur) {
          bailleurErrors.CodeBailleur = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!bailleur.NomBailleur) {
          bailleurErrors.NomBailleur = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!bailleur.Visible) {
          bailleurErrors.Visible = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (bailleur.Visible === null || bailleur.Visible === undefined) {
          bailleurErrors.Visible = "Ce champ est obligatoire!";
          isValid = false;
        }
        this.errors.Bailleurs[index] = bailleurErrors;
      });
      return isValid;
    },
    async submitBailleur(modalId) {
      if (this.validateBailleurs()) {
        this.loading = true;
        this.Bailleurs.forEach((bailleur) => {
          if (bailleur.Visible === "non") {
            bailleur.Visible = false;
          }
        });

        const dataToSend = {
          bailleurs: this.Bailleurs,
        };

        try {
          const response = await axios.post("/bailleurs", dataToSend, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
          });

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Bailleurs créés avec succès",
              "Les nouveaux bailleurs ont été créés avec succès !"
            );
            await this.fetchClients();
            this.loading = false;
          } else {
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
      }
    },

    async fetchClients() {
      try {
        const response = await axios.get("/bailleurs", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.data.status === "success") {
          this.data = response.data.data;
          this.ClientOptions = this.data;
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

    async submitClient(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          CodeBailleur: this.step1.CodeBailleur,
          NomBailleur: this.step1.NomBailleur,
          Visible: this.step1.Visible,
        };

        try {
          const response = await axios.post("/duties-services", data, {
            headers: { Authorization: `Bearer ${this.loggedInUser.token}` },
          });

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Duty Created Successfully",
              "The new duty has been successfully created!"
            );
            await this.fetchClients();
          } else {
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
        // console.log("error", this.v$.$errors);
      }
    },
    async HandleIdUpdate(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/bailleurs/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.data.status === "success") {
          let data = response.data.data;
          (this.step2.CodeBailleur = data.CodeBailleur),
            (this.step2.NomBailleur = data.NomBailleur),
            (this.step2.Visibles = data.Visible === "1" ? true : "non"),
            (this.ToId = data.id);
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
    async submitUpdateBailleur(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let dataSend = {
          bailleurs: [
            {
              CodeBailleur: this.step2.CodeBailleur,
              NomBailleur: this.step2.NomBailleur,
              Visible: this.step2.Visibles === "non" ? false : this.step2.Visibles,
              id: this.ToId,
            },
          ],
        };

        try {
          const response = await axios.put("/bailleurs/update", dataSend, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Données du bailleur mises à jour",
              "Les données du bailleur ont été mises à jour avec succès !"
            );
            await this.fetchClients();
          }
        } catch (error) {
          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/"); //a revoir
          } else {
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
        title: "Êtes-vous sûr ?",
        text: "Vous ne pourrez pas annuler cette action !",
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
        const response = await axios.delete(`/bailleurs/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Données du bailleur supprimées",
            "Les données du bailleur ont été supprimées avec succès !"
          );
          await this.fetchClients();
        } else {
          this.loading = false;
        }
      } catch (error) {
        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
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
        const searchValue = tt.toLowerCase();
        this.ClientOptions = this.data.filter((user) => {
          const Nom = user.CodeBailleur || "";
          const Descriptions = user.NomBailleur || "";

          return (
            Nom.toLowerCase().includes(searchValue) ||
            Descriptions.toLowerCase().includes(searchValue)
          );
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
    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur

        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur

        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet
    },
  },
};
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
