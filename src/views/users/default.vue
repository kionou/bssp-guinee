<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div class="d-md-flex pt-12  d-block align-items-center justify-content-between my-4 page-header-breadcrumb">
      <h1 class="page-title fw-semibold fs-18 mb-0">Utilisateurs</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Utilisateurs
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Page Header Close -->
    <div class="contact-header mb-3 py-2 px-1" >
      <div class="d-sm-flex d-block align-items-center justify-content-between">
        <div class="h5 fw-semibold mb-0"></div>
        <div class="d-flex mt-sm-0 mt-2 align-items-center">
          <div class="input-group">
            <input  class="form-control bg-light border-0" placeholder="Recherchez..."
              v-model="searchuser" @input="filterByName" autocomplete="off"  name="rech"/>
            <button class="btn btn-light" type="button" >
              <i class="ri-search-line text-muted"></i>
            </button>
          </div>
  
          <button v-if="hasPermission(3)" class="btn btn-icon btn-primary ms-2" data-bs-placement="top" data-bs-title="Add Contact"
            data-bs-toggle="modal" data-bs-target="#add_user">
            <i class="ri-add-line"> </i>
          </button>
        </div>
      </div>
    </div>
    <div class="row task-card" data-aos="zoom-in">
      <div v-if="paginatedItems.length === 0" class="noresul">
        <span> Vous n'avez pas encore d'utilisateur, vous pouvez également en ajouter un !! </span>
      </div>
      <div style="overflow-x: scroll !important" class="table-responsive" v-else>
        <table class="table  table-hover border table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Nom & Prenoms</th>
              <th scope="col">Coordonnees</th>
              <th scope="col">Role</th>
              <th scope="col">Region</th>
              <th scope="col">Projets</th>
              <th scope="col">Status</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody  data-aos="fade-up"
          data-aos-duration="1000">
            <tr v-for="user  in paginatedItems" :key="user.id">
              <td>
                <div class="d-flex align-items-center lh-1">
                  <div class="me-2">
                    <span class="avatar avatar-md avatar-rounded">
                      <img
                        v-if="!user.photo || !user.photo.startsWith('https')"
                        src="@/assets/img/client.png"
                        alt="Image par défaut"
                      />
                      <img
                        v-else
                        :src="user.photo"
                        alt="Image utilisateur"
                      />
                    </span>
                  </div>
                  <div>
                    <span class="d-block fw-semibold mb-1">{{user.Nom}} {{user.Prenoms}}</span>
                    <span class="text-warning fs-14">{{user.username}}</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="d-flex align-items-center lh-1">
  
                  <div>
                    <span class="d-block fw-semibold mb-1">{{user.email}}</span>
                    <span class="text-muted fs-14">{{user.Whatsapp}}</span>
                  </div>
                </div>
              </td>
              <td v-if="user.roles">
                {{user.roles[0]?.name}}
              </td>
              <td>
                {{user.region.NomRegion}}
              </td>
              <td>
        <div>
          <template v-for="(group, index) in formatProjectsInGroups(user)" :key="index">
            <div>
              <span v-for="(project, idx) in group" :key="idx">
                {{ project }}<span v-if="idx < group.length - 1">, </span>
              </span>
            </div>
            <!-- <br class="m-0" v-if="index < formatProjectsInGroups(user).length - 1"> -->
          </template>
        </div>
      </td>
  
              <td>
                <div class="btn-list w-100 d-flex justify-content-center" >
                  <div>
                    <div class="btn btn-sm  btn-success btn-wave" v-if="user.Statut === '1'"
                      @click="HandleIdStatut(user.id)">
                      <i class="ri-lock-unlock-line"></i> 
                    </div>
                    <button class="btn btn-sm  btn-warning btn-wave" v-if="user.Statut === '0'"
                      @click="HandleIdStatut(user.id)">
                      <i class="ri-lock-2-line"></i> 
                    </button>
                  </div>
  
                </div>
              </td>
              <td>
                <div class="btn-list w-100 d-flex justify-content-center" >
  
                  <button v-if="hasPermission(2)" class="btn btn-sm btn-icon btn-info btn-wave " data-bs-toggle="modal"
                    data-bs-target="#update_user" @click="HandleIdUpdate(user.id)">
                    <i class="ri-edit-line"></i>
                  </button>
  
                  <button  class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDelete(user.id)" v-if="user.roles[0]?.name ==='Administrateur' && hasPermission(5)" >
                    <i class="ri-delete-bin-line"></i>
                  </button>
                  <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDelete(user.id)" v-else-if="user.roles[0]?.name ==='Administrateur' &&  hasPermission(4) " disabled>
                    <i class="ri-delete-bin-line"></i>
                  </button>
                  <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDelete(user.id)" v-else-if="user.roles[0]?.name !=='Administrateur' && ( hasPermission(4)  ||  hasPermission(5))" >
                    <i class="ri-delete-bin-line"></i>
                  </button>

                  <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDelete(user.id)" v-else disabled>
                    <i class="ri-delete-bin-line"></i>
                  </button>
  
  
                </div>
              </td>
            </tr>
  
  
  
          </tbody>
        </table>
      </div>
  
  
    </div>
    <div class="row">
      <div class="col-lg-12">
        <div class="container_pagination">
          <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
        </div>
      </div>
    </div>
  
    <div class="modal fade effect-rotate-bottom" id="add_user" tabindex="-1" aria-hidden="true" data-bs-backdrop="static"
      ref="add_user">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Ajouter un utilisateur</b>
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
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Nom <span class="text-danger">*</span></label>
                      <MazInput v-model="step1.Nom" color="info" name="Nom" size="sm" rounded-size="sm" type="text" />
                      <small v-if="v$.step1.Nom.$error">{{
                        v$.step1.Nom.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Nom']">
                        {{ resultError["Nom"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Prenom<span class="text-danger">*</span></label>
                      <MazInput v-model="step1.Prenoms" color="info" name="Prenoms" size="sm" rounded-size="sm"
                        type="text" />
                      <small v-if="v$.step1.Prenoms.$error">{{
                        v$.step1.Prenoms.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Prenoms']">
                        {{ resultError["Prenoms"] }}
                      </small>
                    </div>
                  </div>
                  
  
  
                </div>
                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Pseudo<span class="text-danger">*</span></label>
                      <MazInput v-model="step1.username" color="info" name="username" size="sm" rounded-size="sm"
                        type="text" />
                      <small v-if="v$.step1.username.$error">{{
                        v$.step1.username.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['username']">
                        {{ resultError["username"] }}
                      </small>
                    </div>
                  </div>
  
  <div class="col col-md-6 col-sm-12">
    <div class="mb-3 position-relative">
      <label for="password">Role </label>
      <MazSelect v-model="step1.role" type="role" name="text" color="info" placeholder="Admin" size="sm"
        rounded-size="sm" :options="rolesOptions" search />
      <small v-if="v$.step1.role.$error">{{v$.step1.role.$errors[0].$message}}</small>
      <small v-if="resultError['role']">{{resultError['role']}}</small>
    </div>
  </div>
</div>
                
                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Adresse Email <span class="text-danger">*</span></label>
                      <MazInput v-model="step1.email" type="text" color="info" name="email" size="sm" rounded-size="sm" />
                      <small v-if="v$.step1.email.$error">{{
                        v$.step1.email.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['email']">
                        {{ resultError["email"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Télephone <span class="text-danger">*</span></label>
                      <MazPhoneNumberInput v-model="step1.Whatsapp" size="sm" rounded-size="sm" show-code-on-list
                        :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                        :success="results?.isValid" />
                      <small v-if="v$.step1.Whatsapp.$error">{{
                        v$.step1.Whatsapp.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Whatsapp']">
                        {{ resultError["Whatsapp"] }}
                      </small>
                    </div>
                  </div>
                </div>
  
                <div class="row mt-3 content-group">
  
                  <div class="col col-md-6 col-sm-12">
                    <div class="mb-3 position-relative">
                      <label for="password">liste des Projets </label>
                      <MazSelect v-model="step1.projets" type="text" name="text" color="info" placeholder="" size="sm"
                        rounded-size="sm" :options="projetssOptions"  multiple search/>
                      <small v-if="v$.step1.projets.$error">{{v$.step1.projets.$errors[0].$message}}</small>
                      <small v-if="resultError['projets']">{{resultError['projets']}}</small>
                    </div>
                  </div>
  
  
                  <div class="col col-md-6 col-sm-12">
                    <div class="mb-3 position-relative">
                      <label for="password_confirmation">Région</label>
                      <MazSelect v-model="step1.region" type="text" name="region" color="info" placeholder="Conakry"
                        size="sm" rounded-size="sm" :options="regionOptions" search />
                      <small v-if="v$.step1.region.$error">{{v$.step1.region.$errors[0].$message}}</small>
                      <small v-if="resultError['region']">{{resultError['region']}}</small>
  
                    </div>
                  </div>
  

                </div>
  
                <div class="row mt-3 content-group">
  
                  <div class="col col-md-6 col-sm-12">
                    <div class="mb-3 position-relative">
                      <label for="password">Mot de passe </label>
                      <MazInput v-model="step1.password" type="password" name="password" color="info"
                        placeholder="Abc123@!" size="sm" rounded-size="sm" autocomplete="new-password" />
                      <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small>
                      <small v-if="resultError['password']">{{resultError['password']}}</small>
                    </div>
                  </div>
  
  
                  <div class="col col-md-6 col-sm-12">
                    <div class="mb-3 position-relative">
                      <label for="region">Confirmer le mot de passe</label>
                      <MazInput v-model="step1.password_confirmation" type="password" name="password_confirmation"
                        color="info" placeholder="Abc123@!" size="sm" rounded-size="sm" />
                      <small
                        v-if="v$.step1.password_confirmation.$error">{{v$.step1.password_confirmation.$errors[0].$message}}</small>
                      <small v-if="resultError['password_confirmation']">{{resultError['password_confirmation']}}</small>
                      <small v-if="!validatePasswordsMatch()">Les mots de passe ne correspondent pas.</small>
                    </div>
                  </div>
  
  
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="SubmitUser('add_user')">
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
  
    <div class="modal fade effect-rotate-bottom" id="update_user" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update_user">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier un utilisateur</b>
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
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Nom <span class="text-danger">*</span></label>
                      <MazInput v-model="step2.Nom" color="info" name="Nom" size="sm" rounded-size="sm" type="text" />
                      <small v-if="v$.step2.Nom.$error">{{
                        v$.step2.Nom.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Nom']">
                        {{ resultError["Nom"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Prenom<span class="text-danger">*</span></label>
                      <MazInput v-model="step2.Prenoms" color="info" name="Prenoms" size="sm" rounded-size="sm"
                        type="text" />
                      <small v-if="v$.step2.Prenoms.$error">{{
                        v$.step2.Prenoms.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Prenoms']">
                        {{ resultError["Prenoms"] }}
                      </small>
                    </div>
                  </div>
                 
  
  
                </div>
                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Pseudo<span class="text-danger">*</span></label>
                      <MazInput v-model="step2.username" color="info" name="username" size="sm" rounded-size="sm"
                        type="text" />
                      <small v-if="v$.step2.username.$error">{{
                        v$.step2.username.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['username']">
                        {{ resultError["username"] }}
                      </small>
                    </div>
                  </div>
  <div class="col col-md-6 col-sm-12">
    <div class="mb-3 position-relative">
      <label for="password">Role </label>
      <MazSelect :disabled="step2.role  === 1" v-model="step2.role" type="role" name="text" color="info" placeholder="" size="sm"
        rounded-size="sm" :options="rolesOptions" search />
      <small v-if="v$.step2.role.$error">{{v$.step2.role.$errors[0].$message}}</small>
      <small v-if="resultError['role']">{{resultError['role']}}</small>
    </div>
  </div>


 

                </div>

                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Adresse Email <span class="text-danger">*</span></label>
                      <MazInput v-model="step2.email" type="text" color="info" name="email" size="sm" rounded-size="sm" />
                      <small v-if="v$.step2.email.$error">{{
                        v$.step2.email.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['email']">
                        {{ resultError["email"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Telephone <span class="text-danger">*</span></label>
                      <MazPhoneNumberInput v-model="step2.Whatsapp" size="sm" rounded-size="sm" show-code-on-list
                        :ignored-countries="['AC']" defaultCountryCode="GN" update="results = $event"
                        :success="results?.isValid" />
                      <small v-if="v$.step2.Whatsapp.$error">{{
                        v$.step2.Whatsapp.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Whatsapp']">
                        {{ resultError["Whatsapp"] }}
                      </small>
                    </div>
                  </div>
                </div>
              
                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="mb-3 position-relative">
                      <label for="password">Liste des projets </label>
                      <MazSelect v-model="step2.projets" type="text" name="projets" color="info" placeholder="projets" multiple
                        size="sm" rounded-size="sm" :options="projetssOptions" search />
                      <small v-if="v$.step2.projets.$error">{{v$.step2.projets.$errors[0].$message}}</small>
                      <small v-if="resultError['projets']">{{resultError['projets']}}</small>
                    </div>
                  </div>
  
  
                  <div class="col col-md-6 col-sm-12">
                    <div class="mb-3 position-relative">
                      <label for="password_confirmation">Region</label>
                      <MazSelect v-model="step2.region" type="text" name="region" color="info" placeholder="Conakry"
                        size="sm" rounded-size="sm" :options="regionOptions" search />
                      <small v-if="v$.step2.region.$error">{{v$.step2.region.$errors[0].$message}}</small>
                      <small v-if="resultError['region']">{{resultError['region']}}</small>
  
                    </div>
                  </div>
  
  
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdate('update_user')">
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

    <!-- update mot de passe user  -->

    <div class="modal fade effect-rotate-bottom" id="valider_update" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="valider_update">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Entrer votre mot de passe </b>
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
    <div class="mb-3 position-relative">
      <label for="password">Mot de passe </label>
      <MazInput v-model="verifier.password" type="password" name="password" color="info"
        placeholder="Abc123@!" size="sm" rounded-size="sm" />
      <small v-if="v$.verifier.password.$error">{{v$.verifier.password.$errors[0].$message}}</small>
      <small v-if="resultError['password']">{{resultError['password']}}</small>
    </div>
  </div>

</div>
  
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="ValiderUpdate('valider_update')">
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
      return Math.ceil(this.usersOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.usersOptions.slice(startIndex, endIndex);
    },

  },
  data() {
    return {
      loading: true,
      searchuser: null,
      data: [],
      regionOptions: [],
      projetssOptions:[],
      usersOptions: [],
      rolesOptions: [],
      currentPage: 1,
      itemsPerPage: 12,
      totalPageArray: [],
      control: { name: "" },
      resultError: {},
      profil: "",
      ToId: "",
      step1: {
        Nom: "",
        Prenoms: "",
        username: "",
        email: "",
        Whatsapp: '',
        region: '',
        role: '',
        projets:[],
        password: '',
        password_confirmation: '',
      },
      step2: {
        Nom: "",
        Prenoms: "",
        username: "",
        email: "",
        Whatsapp: '',
        region: '',
        role: '',
        projets: [],
      },
      verifier:{
        password:"",
      },

      v$: useVuelidate(),
      error: "",
    };
  },
  validations: {
    step1: {
      Nom: { require },
      Prenoms: { require },
      username: { require },
      email: { require },
      Whatsapp: { require },
      region: { require },
      role: { require },
      projets: { require },
      password: { require },
      password_confirmation: { require },

    },
    step2: {
      Nom: { require },
      Prenoms: { require },
      username: { require },
      email: { require },
      Whatsapp: { require },
      region: { require },
      role: { require },
      projets: {},
    },
    verifier:{
        password:{ require },
      },
  },

  async mounted() {

    await this.fetchUserAll()
    await this.fetchRegionOptions()
    await this.fetchRoles()
    await this.fetchProjets()

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
    validatePasswordsMatch() {
      return this.step1.password === this.step1.password_confirmation;
    },
    async fetchUserAll() {
      try {
        const response = await axios.get('/auth-users', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });


        if (response.data.status === "success") {
          this.data = response.data.data;
          this.usersOptions = this.data;

          this.loading = false;
        }
      } catch (error) {
      ;
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
    formatProjectsInGroups(user) {
    if (!user || !user.projects) {
      return [];
    }
    const projects = user.projects
      .map(projet => projet.projet?.Sigle)
      .filter(sigle => sigle); // Filtrer les valeurs falsy comme undefined ou null

    // Diviser en groupes de trois
    const groups = [];
    for (let i = 0; i < projects.length; i += 5) {
      groups.push(projects.slice(i, i + 5));
    }
    return groups;
  },
    async fetchRegionOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchRegionOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getRegionOptions2"])

        ); // Accéder aux options des pays via le getter
        const filteredOptions = options.filter(item => item.Statut === '1');

// Convertir les options filtrées en format attendu
          this.regionOptions = filteredOptions.map(item => ({
            label: item.NomRegion,
            value: item.CodeRegion,
          }));
     
       ;
        // Affecter les options à votre propriété sortedCountryOptions
        this.loading = false
      } catch (error) {
        
      }
    },
    async fetchRoles() {
      try {
        const response = await axios.get('/roles', {
          headers: { Authorization: `Bearer ${this.loggedInUser.token}`, },
        });
     
        this.rolesOptions = response.data.data.map(item => ({
          label: item.name,
          value: item.id,
        }));;;
        this.loading = false;

      } catch (error) {
        console.error('errorqqqqq', error);

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");  //a revoir
        }
      }
    },
    async fetchProjets() {
      try {
        const response = await axios.get('/projets', {
          headers: { Authorization: `Bearer ${this.loggedInUser.token}`, },
        });

        this.projetssOptions = response.data.data.map(item => ({
          label: item.Sigle,
          value: item.CodeProjet,
        }));
        this.loading = false;

      } catch (error) {
        console.error('errorqqqqq', error);

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");  //a revoir
        }
      }
    },
    async SubmitUser(modalId) {
      this.error = '',
        this.resultError = '',
        this.v$.step1.$touch()
      if (this.v$.$errors.length == 0) {
        this.loading = true
        let DataUser = {
          Nom: this.step1.Nom,
          Prenoms: this.step1.Prenoms,
          username: this.step1.username,
          email: this.step1.email,
          Whatsapp: this.step1.Whatsapp,
          region: this.step1.region,
          role: this.step1.role,
          projets: this.step1.projets,
          password: this.step1.password,
          password_confirmation: this.step1.password_confirmation,

        }
    
        try {

          const response = await axios.post('/register-new/user', DataUser, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },


          });
   
          if (response.data.status === "success") {
            await this.submitRole(response.data.data.id, this.step1.role,"add",modalId)

          } else {

          }



        } catch (error) {
       

          this.loading = false
          if (error.response.data.status === "error") {
            return this.error = error.response.data.message

          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {


      }
    },
   async submitRole(a,b,c,modalId){
    let DataUser ={
      code:b,
      user: a
    }

        try {

          const response = await axios.post('/user/assign-role', DataUser, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },


          });
   
          if (response.data.status === "success") {
            this.closeModal(modalId);
            if (c === "add") {
              this.successmsg("Création de l'utilisateur", 'Votre utilisateur a été crée avec succès !')
              await this.fetchUserAll()
            } else {
               this.successmsg(
               "Données de l'utilisateur mises à jour",
               "Les données de l'utilisateur ont été mises à jour avec succès !"
             );
             await this.fetchUserAll();
            }
         

          } else {

          }



        } catch (error) {
  

          this.loading = false
          if (error.response.data.status === "error") {
            return this.error = error.response.data.message

          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }

    },
    async HandleIdUpdate(id) {
      this.loading = true;

      try {
        const response = this.usersOptions.find(item => item.id === id);

     
        if (response) {
     
          let data = response;
          this.step2.Nom = data.Nom,
            this.step2.Prenoms = data.Prenoms,
            this.step2.username = data.username,
            this.step2.email = data.email,
            this.step2.Whatsapp = data.Whatsapp,
            this.step2.role = data.roles[0]?.id,
            this.step2.region = data.region.CodeRegion
            const projetsIds = data.projects.map(projet => projet.CodeProjet);
            this.step2.projets = projetsIds
            this.ToId = data.id;
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

    async submitUpdate(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        const data = {
          user:this.ToId,
          Nom: this.step2.Nom,
          Prenoms: this.step2.Prenoms,
          username: this.step2.username,
          email: this.step2.email,
          Whatsapp: this.step2.Whatsapp,
          region: this.step2.region,
          role: this.step2.role,
          projets: this.step2.projets,
        }

   
        this.currentData = data;
        this.closeModal(modalId);
        const modal = new bootstrap.Modal(this.$refs.valider_update);
        modal.show();
        


      } else {
   
        this.loading = false;
      }
    },
  async  ValiderUpdate(modalId ){
    this.v$.verifier.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true
        const data = {
        ...this.currentData,
        password: this.verifier.password,
      };


        try {
          const response = await axios.put(`system-user/modify`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`
            },
          });
       

        
          if (response.data.status === "success") {
            // this.closeModal(modalId);
            
            await this.submitRole(response.data.data.id, this.step2.role,'update',modalId)

          }
        } catch (error) {
        
          console.error("Erreur lors du téléversement :", error);

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
        const response = await axios.delete(`/system-user/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log('response',response)
    
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Utilisateur supprimé",
            "L'utilisateur  a été supprimé avec succès."
          );
          await this.fetchUserAll();
        } else {
      
                  Swal.fire({
              title: "Suppression impossible",
              text: response.data.message,
              icon: "question"
            });
          this.loading = false;
        }
      } catch (error) {
        console.log('errror',error)


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
    async HandleIdStatut(id) {
      this.loading = true;
      try {
        const response = await axios.get('/auth-user-statut', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params: {
            user: id
          }
        });

        if (response.data.status === "success") {
          this.successmsg(
            "Données de l'utilisateur mises à jour",
            "Les données de l'utilisateur ont été mises à jour avec succès !"
          );
          await this.fetchUserAll();
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
    filterByName() {
      this.currentPage = 1;
      if (this.searchuser !== null) {
        const tt = this.searchuser;
        const searchValue = tt.toLowerCase();
        this.usersOptions = this.data.filter((user) => {
          const Nom = user.Nom || "";
          const Prenoms = user.Prenoms || "";
          const Pseudo = user.username || "";
          // const Email = user.email || "";
          return (
            Nom.toLowerCase().includes(searchValue) ||
            Prenoms.toLowerCase().includes(searchValue) ||
            Pseudo.toLowerCase().includes(searchValue)
          );
        });
      } else {
        this.usersOptions = [...this.data];
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
    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur


        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
      

        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet 
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
      return this.usersOptions.slice(startIndex, endIndex);
    },
  },
};
</script>
<style lang="css" scoped>
.notificationCard {

  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

}

.bellIcon {
  width: 85px;
  margin: 10px 0px;
  border: 1px solid #d9dee3;
  padding: 1px;
}

.notificationHeading {
  color: black;
  font-weight: 600;
  /* font-size: 0.8em; */
  margin-bottom: 0.5rem !important;
}

.notificationPara {
  color: rgb(133, 133, 133);
  /* font-size: 0.6em; */
  font-weight: 600;
  text-align: center;
  margin-bottom: 0.5rem !important;
}

.buttonContainer {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.AllowBtn {
  width: 100px;
  height: 25px;
  background-color: #71dd37;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.card-footer {

  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
</style>
