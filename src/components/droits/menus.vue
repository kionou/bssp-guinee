<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="row">
      <div class="col-xl-12">
        <div class="card custom-card">
          <div class="card-header justify-content-between">
            <div class="card-title">
              Liste des permissions assignées
            </div>
            <div class="d-flex flex-wrap">
              <div class="me-3 my-1">
                <input type="text" class="form-control bg-light border-0" placeholder="Recherchez..."
                  aria-describedby="search-member" v-model="searchPermissions" @input="filterByName" />
              </div>
              <div class="btn btn-icon btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#create-permission">
                <i class="ri-add-line"> </i>
              </div>
  
            </div>
          </div>
          <div class="card-body">
            <div v-if="paginatedItems.length === 0" class="noresul">
              <span> Vous n'avez pas encore d'assignation, vous pouvez également en ajouter !! </span>
            </div>
  
            <div style="overflow-x: scroll !important" class="table-responsive" v-else>
              <table class="table text-nowrap table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col" class="text-center">N°</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Droits</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user , index) in paginatedItems" :key="user.id">
                    <th scope="row" class="ps-4" style="width: 60px;">  {{index + 1}}</th>
                    <td>
                      <div class="d-flex align-items-center lh-1">
  
                        <div>{{ user.name }}</div>
                      </div>
                    </td>
                    <td class="text-warning" >
                      <div class="btn  btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#detail_assignation"
                        @click="DetailPermission(user.id)">
                        detail
                      </div>
                    </td>
                    <td style="width: 120px;">
                      <div class="hstack gap-2 fs-1" >
  
                        <div class="btn btn-icon btn-sm btn-info btn-wave waves-effect " data-bs-toggle="modal"
                          data-bs-target="#update_role" @click="HandleIdUpdate(user.id)"><i class="ri-edit-line"></i>
                        </div>
                     
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
  
    <div class="modal fade effect-rotate-bottom" id="create-permission" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="create-permission">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Ajouter une assignation</b>
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
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"> Role <span class="text-danger">*</span></label>
                      <MazSelect v-model="step1.role" color="info" name="role" size="sm" rounded-size="sm" type="text"
                        :options="RoleSelect" />
                      <small v-if="v$.step1.role.$error">{{
                        v$.step1.role.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['role']">
                        {{ resultError["role"] }}
                      </small>
                    </div>
                  </div>
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"> Permissions <span class="text-danger">*</span></label>
  
                      <MazSelect v-model="step1.permission" color="info" name="permission" size="sm" rounded-size="sm"
                        type="text" :options="PermissionsOptions" multiple />
                      <small v-if="v$.step1.permission.$error">{{
                        v$.step1.permission.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['permission']">
                        {{ resultError["permission"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="SubmitRole('create-permission')">
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
  
  
    <div class="modal fade effect-rotate-bottom" id="update_role" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update_role">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier une permission</b>
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
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"> Role <span class="text-danger">*</span></label>
                      <MazInput v-model="step2.role" color="info" name="role" size="sm" rounded-size="sm" type="text" disabled />
                      <small v-if="v$.step2.role.$error">{{
                        v$.step2.role.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['role']">
                        {{ resultError["role"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"> Permissions <span class="text-danger">*</span></label>
  
                      <MazSelect v-model="step2.permission" color="info" name="permission" size="sm" rounded-size="sm"
                        type="text" :options="PermissionsOptions" multiple />
                      <small v-if="v$.step2.permission.$error">{{
                        v$.step2.permission.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['permission']">
                        {{ resultError["permission"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
  
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdate('update_role')">
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
  
    <div class="modal fade effect-rotate-bottom" id="detail_assignation" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="detail_assignation">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">detail des permissions</b>
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
                <div v-if="DetailRoles.length === 0" class="noresul">
              <span> Pas d'assignation !! </span>
            </div>
                <blockquote v-else class="blockquote custom-blockquote warning mt-2 text-center" v-for="detail  in DetailRoles" :key="detail.id">
                  <h6>{{  detail.name}}</h6>
                  <span class="quote-icon"><i class="ri-information-line"></i></span>
                </blockquote>
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
      return Math.ceil(this.RolesOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.RolesOptions.slice(startIndex, endIndex);
    },

  },
  data() {
    return {
      loading: true,
      RolesOptions: [],
      DetailRoles:[],
      RoleSelect: [],
      PermissionsOptions: [],
      datas: [],
      searchPermissions: "",
      currentPage: 1,
      itemsPerPage: 10,
      totalPageArray: [],
      resultError: {},
      ToId: "",
      step1: {
        role: "",
        permission: [],

      },
      step2: {
        role: "",
        permission: [],
      },
      v$: useVuelidate(),
      error: "",

    }
  },
  validations: {
    step1: {
      role: { require },
      permission: { require },

    },
    step2: {
      role: { require },
      permission: { require },

    },


  },
  async mounted() {
    console.log("loggedInUser", this.loggedInUser);
    await this.fetchRoles();
    await this.fetchPermissions();

  },
  methods: {
    successmsg: successmsg,
    async fetchRoles() {
      try {
        const response = await axios.get('/roles', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,

          },

        });
        console.log(response);
        this.datas = response.data.data
        this.RolesOptions = this.datas;
        this.RoleSelect = response.data.data.map(item => ({
          label: item.name,
          value: item.id,
        }));;
        console.log('this.RolesOptions', this.RolesOptions);

        this.loading = false;

      } catch (error) {
        console.error('errorqqqqq', error);

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
      }
    },
    async fetchPermissions() {
      try {
        const response = await axios.get('/permissions', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,

          },

        });
        console.log(response);
        this.data = response.data.data
        this.PermissionsOptions = response.data.data.data.map(item => ({
          label: item.name,
          value: item.id,
        }));;
        console.log('this.RolesOptions', this.RolesOptions);

        this.loading = false;

      } catch (error) {
        console.error('errorqqqqq', error);

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
      }
    },
    async SubmitRole(modalId) {

      this.v$.step1.$touch();
      console.log("bonjour");

      if (this.v$.$errors.length == 0) {
        console.log("bonjour");
        this.loading = true;
        const dataCath = {
          code: this.step1.role,
          permissions: this.step1.permission,

        }

        console.log(dataCath);

        try {
          const response = await axios.post("/roles/assign-permissions", dataCath, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg("Création d'assignation une permission", 'Votre assignation a été crée avec succès !')
            await this.fetchRoles()

          }
        } catch (error) {
          console.error("Erreur lors du téléversement :", error);
          if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
            this.$router.push("/");  //a revoir
          }
        }
      } else {
        console.log("cest pas bon ", this.v$.$errors);
      }
    },
    async DetailPermission(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        // console.log("response", response);
        if (response.data.status === "success") {
          console.log("responsedata", response.data.data.permissions);
           this.DetailRoles = response.data.data.permissions;

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
    async HandleIdUpdate(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        // console.log("response", response);
        if (response.data.status === "success") {
          console.log("responsedata", response.data.data);
          this.step2.role = response.data.data.name
         const permissionIds = response.data.data.permissions.map(permission => permission.id);
         this.step2.permission = permissionIds;
         this.ToId = response.data.data.id
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
    async submitUpdate(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        console.log("bonjour");
        this.loading = true;
        const dataCath = {
          code: this.ToId,
          permissions: this.step2.permission,

        }

        console.log(dataCath);

        try {
          const response = await axios.post("/roles/assign-permissions", dataCath, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg("Mise à jour  d'une assignation une permission", 'Votre assignation a été mise à jour  avec succès !')
            await this.fetchRoles()

          }
        } catch (error) {
          console.error("Erreur lors du téléversement :", error);
          if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
            this.$router.push("/");  //a revoir
          }
        }
      } else {
        console.log("cest pas bon ", this.v$.$errors);
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
        const response = await axios.delete(`/permissions/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Permission supprimé",
            "La permission a été supprimée avec succès."
          );
          await this.fetchRoles();
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
    filterByName() {
      this.currentPage = 1;
      if (this.searchPermissions !== null) {
        const tt = this.searchPermissions;
        const searchValue = tt.toLowerCase();
        this.RolesOptions = this.datas.filter((user) => {
          const Nom = user.name || "";

          return (
            Nom.toLowerCase().includes(searchValue)

          );
        });
      } else {
        this.RolesOptions = [...this.data];
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
      return this.RolesOptions.slice(startIndex, endIndex);
    },






  },
}
  </script>
  <style lang="css" scoped>

</style>