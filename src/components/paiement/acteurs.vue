<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>

    <div class="col-xl-12" data-aos="zoom-in">
      <div class="card custom-card">
        <div class="card-header justify-content-between">
          <div class="card-title">Liste des acteurs de paiement</div>

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
              <button
                class="btn btn-light"
                type="button"
                id="search-contact-member"
              >
                <i class="ri-search-line text-muted"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-body">
          <div style="overflow-x: scroll !important" class="table-responsive">
            <table
              class="table table-hover border table-bordered table-striped"
            >
              <thead>
                <tr>
                  <th scope="col">Code</th>
                  <th scope="col">Description</th>
                  <th scope="col">Type de financement</th>

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
              <tbody v-else data-aos="fade-up" data-aos-duration="1000">
                <tr v-for="(data, index) in paginatedItems" :key="index">
                  <th scope="row" class="ps-4" style="width: 60px">
                    {{ data.Code }}
                  </th>

                  <td>
                    <span class="">
                      {{ data.Description }}
                    </span>
                  </td>
                  <td>
                    {{ data?.modes?.map((mode) => mode.Intitule).join(",") }}
                  </td>
                  <td style="width: 100px !important">
                    <div class="hstack gap-2 fs-15">
                      <button
                        v-if="hasPermission(2)"
                        v-tippy="{
                          content: 'Modifier l\'élément sélectionné',
                          theme: 'custom',
                          animation: 'shift-away',
                          backgroundColor: '#FF5733',
                        }"
                        class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-info"
                        data-bs-toggle="modal"
                        data-bs-target="#update-acteur"
                        @click="HandleIdUpdate(data.id)"
                      >
                        <i class="ri-edit-line"></i>
                      </button>
                      <button
                        v-if="hasPermission(4)"
                        v-tippy="{
                          content: 'Supprimer l\'élément sélectionné',
                          theme: 'custom',
                          animation: 'shift-away',
                          backgroundColor: '#FF5733',
                        }"
                        class="btn btn-icon btn-wave waves-effect btn-sm btn-danger"
                        @click="HandleIdDelete(data.id)"
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

    <div
      class="modal fade effect-rotate-bottom"
      id="update-acteur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update-acteur"
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
              <b class="text-center">Modifier un acteur de paiement</b>
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
                <div class="row content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Code d'acteur
                        <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.Code"
                        type="text"
                        color="info"
                        name="Code"
                        size="sm"
                        rounded-size="sm"
                      />
                      <small v-if="v$.step2.Code.$error">{{
                        v$.step2.Code.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['Code']">
                        {{ resultError["Code"] }}
                      </small>
                    </div>
                  </div>
                </div>

             
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Description d'acteur </label>
                      <textarea
                        class="form-control"
                        style="
                          border-radius: 0 !important;
                          border: 1px solid #e5eaee !important;
                        "
                        id="text-area"
                        v-model="step2.Description"
                        rows="2"
                      ></textarea>
                      <small v-if="v$.step2.Description.$error">{{
                        v$.step2.Description.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['Description']">
                        {{ resultError["Description"] }}
                      </small>
                    </div>
                  </div>
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Type de financement
                        <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step2.CodeTypeFinancement"
                        type="text"
                        color="info"
                        name="CodeTypeFinancement"
                        size="sm"
                        rounded-size="sm"
                        :options="ModeFinancementOptions"
                        multiple
                        
                      />
                      <small v-if="v$.step2.CodeTypeFinancement.$error">{{
                        v$.step2.CodeTypeFinancement.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['CodeTypeFinancement']">
                        {{ resultError["CodeTypeFinancement"] }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="
                      submitUpdateActeurs('update-acteur')
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
import Loading from "@/components/others/loading.vue";
import Pag from "@/components/others/pagination.vue";
import { require } from "@/functions/rules";
import axios from "@/lib/axiosConfig";
import { successmsg } from "@/lib/modal.js";
import useVuelidate from "@vuelidate/core";
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
      return Math.ceil(this.ActeursOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.ActeursOptions.slice(startIndex, endIndex);
    },
    // ETAPE ACTEUR
  },
  data() {
    return {
      loading: true,
      ActeursOptions: [],
      ModeFinancementOptions:[],
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
      step2: {
        Code: "",
        CodeTypeFinancement: [],
        Description: "",
      },
      v$: useVuelidate(),
      error: "",
    };
  },
  validations: {
    step2: {
      Code: { require },
      CodeTypeFinancement: { require },
      Description: {require},
    },
  },
  async mounted() {
    await this.fetchActeurs();
    await this.fetchModeFinancement()
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

    async fetchActeurs() {
      try {
        const response = await axios.get("/acteurs-etapes", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: {
            type: "ACTEUR",
          },
        });

        if (response.data.status === "success") {
          this.data = response.data.data;
          this.ActeursOptions = this.data;

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


    async HandleIdUpdate(id) {
     
        (this.loading = true);

      try {
        const response = await axios.get(`/acteurs-etapes/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.data.status === "success") {
          let data = response.data.data[0];


          (this.step2.Code = data.Code),
            (this.step2.CodeTypeFinancement = data.CodeTypeFinancement),
            (this.step2.Description = data.Description),
            (this.ToId = data.id);
          this.loading = false;
          console.log('typeof',typeof(data.CodeTypeFinancement))
        }
      } catch (error) {
        this.loading = false
        console.log(error)
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
    async submitUpdateActeurs(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let dataSend = {
          params: [
            {
              Code: this.step2.Code,
              CodeTypeFinancement: this.step2.CodeTypeFinancement,
              Description: this.step2.Description,
              TypeParam: "ACTEUR",
              id:this.ToId
            },
          ],
        };

        try {
          const response = await axios.put("/acteurs-etapes", dataSend, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Données du acteur de paiement mises à jour",
              "Les données du acteur de paiement ont été mises à jour avec succès !"
            );
            await this.fetchActeurs();
          }
        } catch (error) {
          this.loading = false;

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
        const response = await axios.delete(`/acteurs-etapes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Acteur de paiement supprimé avec succès",
            "Le acteur de paiement a été supprimé avec succès !"
          );
          await this.fetchActeurs();
        } else {
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;

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
      return this.ActeursOptions.slice(startIndex, endIndex);
    },

    filterByName() {
      this.currentPage = 1;
      if (this.search !== null) {
        const tt = this.search;
        const searchValue = tt.toLowerCase();
        this.ActeursOptions = this.data.filter((acteur) => {
          const Nom = acteur.Code || "";
          const Descriptions = acteur.Description || "";
          // const Type = acteur.modes.map((item) => item.Intitule)

          return (
            Nom.toLowerCase().includes(searchValue) ||
            Descriptions.toLowerCase().includes(searchValue) 
            // Type.toLowerCase().includes(searchValue)
          );
        });
      } else {
        this.ActeursOptions = [...this.data];
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
      return this.ActeursOptions.slice(startIndex, endIndex);
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
        const errorMessages = errors[field];
        const concatenatedError = errorMessages.join(", ");
        formattedErrors[field] = concatenatedError;
      }

      this.resultError = formattedErrors;
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
