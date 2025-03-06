<template >
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
        <div class="row">
                    <div class="col-xl-12" data-aos="zoom-in">
                        <div class="card custom-card">
                            <div class="card-header justify-content-between">
                                <div class="card-title">
                                    Liste des rôles
                                </div>
                                <div class="d-flex flex-wrap">
                                    <div class="me-3 my-1">
                                        <input
                                        type="text"
                                        class="form-control bg-light border-0"
                                        placeholder="Recherchez..."
                                        aria-describedby="search-member"
                                        v-model="search"
                                        @input="filterByName"
                                    />
                                    </div>
                                    <div  v-if="hasPermission(3)" class="btn btn-icon btn-primary ms-2"
                                     v-tippy="{ content: 'Créer un nouvel élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                                     data-bs-toggle="modal" data-bs-target="#create-role">
                                    <i class="ri-add-line"> </i>
                                    </div>
                                  
                                </div>
                            </div>
                            <div class="card-body">
                              <div v-if="paginatedItems.length === 0" class="noresul">
                              <span> Vous n'avez pas encore de rôle, vous pouvez également en ajouter un !! </span>
                            </div>
    
                                <div style="overflow-x: scroll !important" class="table-responsive" v-else>
                                    <table class="table text-nowrap table-bordered table-striped">
                                        <thead>
                                            <tr>
                                                <th class="text-center" scope="col">N°</th>
                                                <th scope="col">Libelle</th>
                                                <th scope="col" class="text-center">Accèss</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody  data-aos="fade-up"
                                        data-aos-duration="1000">
                                            <tr v-for="(user , index) in paginatedItems" :key="user.id" >
                                              <th  scope="row" class="p-0 text-center" style="width: 60px; padding:0 !important;">  {{index + 1}}</th>
                                                <td>
                                                    <div class="d-flex align-items-center lh-1">
                                                        
                                                        <div>{{ user.name }}</div>
                                                    </div>
                                                </td>
                                                <td style="width: 180px;" class="text-center">
                                                    <div class="d-flex align-items-center lh-1 justify-content-center ">
                                                        
                                                        <a href="#"  style="color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1)) !important;  text-decoration: underline !important;"
                                                          v-tippy="{ content: 'Gérer les accès',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                                                          data-bs-toggle="modal" data-bs-target="#create-menu-permissions" @click="fetchDetailRoles(user.id)" >Gérer les accès</a>
                                                    </div>
                                                </td>
                                              
                                               
                                                <td style="width: 80px;">
                                                    <div class="hstack gap-2 fs-1">
                                                      
                                                        <div v-if="hasPermission(2)" :class="{ 'disabled': user.id === 1 }" class="btn btn-icon btn-sm btn-info btn-wave waves-effect "
                                                         v-tippy="{ content: 'Modifier l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                                                         data-bs-toggle="modal" data-bs-target="#update_role"  @click="HandleIdUpdate(user.id)"><i class="ri-edit-line"></i></div>
                                                        <a v-if="hasPermission(4)" :class="{ 'disabled': user.id === 1 }" aria-label="anchor" href="javascript:void(0);"
                                                          v-tippy="{ content: 'Supprimer l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}" 
                                                        class="btn btn-icon btn-sm btn-danger btn-wave waves-effect waves-light"><i class="ri-delete-bin-line" @click="HandleIdDelete(user.id)"></i></a>
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

                             <div class="modal fade effect-rotate-bottom" id="create-role" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" ref="create-role">
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
              <b class="text-center"
                >Ajouter un Rôle</b
              >
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center"
                style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
              <div >
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Rôle <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.role"
                        color="info"
                        name="role"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                 
                      <small v-if="v$.step1.role.$error">{{
                        v$.step1.role.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['role']">
                        {{ resultError["role"] }}
                      </small>
                    </div>
                  </div>
                
                </div>
              </div>
              <div class="row mb-3">
              <div class="boutton">
                <button class="" @click.prevent="SubmitRole('create-role')">
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

                               
                               <div
      class="modal fade effect-rotate-bottom"
      id="update_role"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_role"
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
              <b class="text-center"
                >Modifier un rôle</b
              >
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center"
                style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
              <div >
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Rôle <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step2.role"
                        color="info"
                        name="role"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        
                        
                      />
                      <small v-if="v$.step2.role.$error">{{
                        v$.step2.role.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['role']">
                        {{ resultError["role"] }}
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


                               <!-- les droits et permissions  -->
       <div class="modal fade effect-rotate-bottom" id="create-menu-permissions" tabindex="-1" aria-hidden="true" data-bs-backdrop="static" ref="create-menu-permissions">
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
                >Assigner les permissions et menus</b
              >
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center"
                style=" border-width: 1px; border-style: solid; border-radius: 6px; border-color: rgb(0, 77, 134);">
            
                <div class="row mb-3">
                  <div class="col-12">
                    <div class="row mb-3 align-items-center">
                      <div class="col-xxl-10 col-xl-10 col-lg-10 col-md-10 col-sm-12">
                        <div class="row  content-group">
                    <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Rôle <span class="text-danger">*</span></label
                      >
                   
                      <MazSelect v-model="step3.role" color="info" name="role" size="sm" rounded-size="sm" type="text"
                        :options="RoleOption" search  v-slot="{ option }" >
                    <div class="flex items-center" style=" padding-top: 0.5rem; padding-bottom: 0.5rem; width: 100%; gap: 1rem;"
                      @click="handleOptionClick(option)">
                      {{ option.label }}
                    </div>
                  </MazSelect>
                      <small v-if="v$.step3.role.$error">{{
                        v$.step3.role.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['role']">
                        {{ resultError["role"] }}
                      </small>
                    </div>
                  </div>

                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        > Permissions <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step3.permissions"
                        color="info"
                        name="role"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        :options="PermissionsOptions"
                        multiple
                        search
                        
                        
                      />
                      <small v-if="v$.step3.permissions.$error">{{
                        v$.step3.permissions.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['permissions']">
                        {{ resultError["permissions"] }}
                      </small>
                    </div>
                  </div>
                
                </div>
                      </div>
                      <div class="col-xxl-2 col-xl-2 col-lg-2 col-md-2 col-sm-12">
                            <div class="boutton">
                        <button  @click.prevent="SubmitPermissionRole('create-menu-permissions')">
                          Valider
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-12">
                    <div style="overflow-x: scroll !important" class="table-responsive">
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Menu</th>
                        <th scope="col">Descriptions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Ligne pour les menus principaux -->
                      <tr>
                        <td colspan="2" class="fw-bold bg-light">Menus principaux</td>
                      </tr>
                      
                      <!-- Boucle sur les menus principaux -->
                      <template v-for="menu in MenusOptions" :key="menu.id">
                        <tr>
                          <!-- Menu Parent -->
                          <td style="width: 220px !important">
                            <input 
                              type="checkbox" 
                              :id="'parent-' + menu.id" 
                              v-model="menu.checked" 
                              @change="toggleParent(menu)"
                              :disabled="step3.role === 1"
                            >
                            <label class="text-uppercase fw-semibold fs-14" :for="'parent-' + menu.id">{{ menu.label }}</label>
                          </td>
                          <td>{{ menu.description }}</td>
                        </tr>

                        <!-- Sous-menus -->
                        <tr v-for="child in menu.children" :key="child.id">
                          <td>
                            <div style="padding-left: 20px;">
                              <input 
                                type="checkbox" 
                                :id="'child-' + child.id" 
                                v-model="child.checked" 
                                @change="toggleChild(menu)"
                                :disabled="step3.role === 1"
                              >
                              <label :for="'child-' + child.id">{{ child.label }}</label>
                            </div>
                          </td>
                          <td>{{ child.description }}</td>
                        </tr>
                      </template>

                      <!-- Ligne pour les autres menus -->
                      <tr>
                        <td colspan="2" class="fw-bold bg-light">Autres menus</td>
                      </tr>

                      <!-- Boucle pour les autres menus -->
                      <!-- Ajouter ici la boucle pour les autres menus si nécessaire -->
                      <!-- Exemple : -->
                      
                      <template v-for="otherMenu in OtherMenuOptions " :key="otherMenu.id">
                        <tr >
                          <td style="width: 220px !important">
                            <input 
                              type="checkbox" 
                              :id="'other-' + otherMenu.id" 
                              v-model="otherMenu.checked"
                        
                              :disabled="step3.role === 1"
                            >
                            <label class="  fs-14" :for="'other-' + otherMenu.id">{{ otherMenu.label }}</label>
                          </td>
                          <td>{{ otherMenu.description }}</td>
                        </tr>
                      </template>
                      
                    </tbody>
                  </table>
                 </div>

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
import axios from '@/lib/axiosConfig'
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import {successmsg} from "@/lib/modal.js"
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
  data(){
    return{
        loading: true,
        RolesOptions: [],
        PermissionsOptions:[],
        RoleOption:[],
        MenusOptions:[],
        OtherMenuOptions:[],
        data:[],
        search:"",
      currentPage: 1,
      itemsPerPage: 10,
      totalPageArray: [],
      resultError: {},
      ToId:"",
      step1: {
        role:"",
       
      },
      step2: {
        role:"",
      },
      step3: {
        role:"",
        permissions:[],
      },
      v$: useVuelidate(),
      error: "",

    }
  },
  validations: {
    step1: {
        role:{require},

    },
    step2: {
        role:{require},
   
    },
    step3: {
        role:{require},
        permissions:{require},
      },
   
   
  },
  async mounted() {
    await this.fetchRoles();
    await this.fetchPermissions();
    await this.fetchMenus();
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
        async fetchRoles() {
            try {
              const response = await axios.get('/roles', {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
    
            });

               this.data = response.data.data
              this.RolesOptions =  this.data ;
               this.RoleOption = this.data.map(item => ({
                  label: item.name,
                  value: item.id,
                }));


              this.loading = false;
            
            } catch (error) {           
              if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
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
            }, });
            
             this.PermissionsOptions =  response.data.data.data.map(item => ({
                  label: item.name,
                  value: item.id,
                }));
             this.loading = false;
          
          } catch (error) {
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('user/clearLoggedInUser');
            this.$router.push("/");  //a revoir
          }
          }
        },
        async fetchMenus() {
          try {
            const response = await axios.get('/menus', {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, 
            }, });
         
            
            
            this.MenusOptions = response.data.data.filter(menu => menu.type === "1");
            this.OtherMenuOptions = response.data.data.filter(menu => menu.type === "0");

             
             this.loading = false;
          
          } catch (error) {
            if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('user/clearLoggedInUser');
            this.$router.push("/");  //a revoir
          }
          }
        },
        async fetchDetailRoles(id) {
          this.loading = true;
          await this.resetMenus();
          try {
            const response = await axios.get(`/roles/${id}`, {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`, 
              },
            });

            const dataRole = response.data.data;
            this.step3.role = dataRole.id;
            this.step3.permissions = dataRole.permissions.map(permission => permission.id);
            const roleMenus = dataRole.menus.map(menu => menu.menu.id);
          
            // Parcourir les MenusOptions et cocher les cases si elles existent dans roleMenus
            this.MenusOptions.forEach(menu => {
              if (roleMenus.includes(menu.id)) {
                menu.checked = true;
              }
              if (menu.children) {
                menu.children.forEach(child => {
                  if (roleMenus.includes(child.id)) {
                    child.checked = true;
                  }
                });
              }
            });

            // Parcourir les OtherMenuOptions (type 0) et cocher les cases si elles existent dans roleMenus
            this.OtherMenuOptions.forEach(menu => {
              if (roleMenus.includes(menu.id)) {
                menu.checked = true;
              }
            });

            this.loading = false;

          } catch (error) {
            if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('user/clearLoggedInUser');
              this.$router.push("/");  // à revoir
            }
          }
        },

       toggleParent(menu) {
      // Coche ou décoche tous les enfants lorsque le parent est coché/décoché
      if (menu.children) {
        menu.children.forEach(child => {
          child.checked = menu.checked;
        });
      }
       },
       toggleChild(menu) {
      // Si un enfant est coché, cochez le parent
      if (menu.children.some(child => child.checked)) {
        menu.checked = true;
      } else {
        menu.checked = false;
      }
       },
       async  resetMenus() {
        this.MenusOptions.forEach(menu => {
        menu.checked = false;
        if (menu.children) {
          menu.children.forEach(child => {
            child.checked = false;
          });
        }
  });

  this.OtherMenuOptions.forEach(menu => {
    menu.checked = false;
  });
       },
       collectCheckedMenuIds() {
    const selectedMenuIds = [];

    this.MenusOptions.forEach(menu => {
      if (menu.checked) {
        selectedMenuIds.push(menu.id);
      }
      if (menu.children) {
        menu.children.forEach(child => {
          if (child.checked) {
            selectedMenuIds.push(child.id);
          }
        });
      }
    });

    this.OtherMenuOptions.forEach(otherMenu => {
    if (otherMenu.checked) {
      selectedMenuIds.push(otherMenu.id);
    }
  });

    return selectedMenuIds;
     },


     async SubmitRole(modalId){
    
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
         this.loading = true;
        const dataCath = {
          name:this.step1.role,
         
        }
        try {
          const response = await axios.post("/roles", dataCath, {
            headers: {
              
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          });
          if (response.data.status === "success") {
           this.closeModal(modalId);
          this.successmsg("Création d'un rôle",'Votre rôle a été crée avec succès !')
          await this.fetchRoles()
            
          } 
        } catch (error) {
          if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('user/clearLoggedInUser');
          this.$router.push("/");  //a revoir
        }
        }
      } else {
      }
    },
    async SubmitPermissionRole(modalId){
    
    this.v$.step3.$touch();
    if (this.v$.$errors.length == 0) {
       this.loading = true;
      const dataCath = {
        code:this.step3.role,
        permissions:this.step3.permissions,
       
      }
      const selectedMenuIds = this.collectCheckedMenuIds();
    
      
      try {
        const response = await axios.post("/roles/assign-permissions", dataCath, {
          headers: {
            
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
      
        
        if (response.data.status === "success") {
          if (selectedMenuIds.length === 0) {
              this.closeModal(modalId);
              this.successmsg(
            "Données du rôle mises à jour",
            "Les données du rôle ont été mises à jour avec succès !"
          );
              await this.fetchRoles()
            
          } else {
            await this.SubmitMenusRole(modalId)
          }
        
          
        } 
      } catch (error) {
  
        
        if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('user/clearLoggedInUser');
        this.$router.push("/");  //a revoir
      }
      }
    } else {
    }
  },
  async SubmitMenusRole(modalId){
    
 
       this.loading = true;
      const selectedMenuIds = this.collectCheckedMenuIds();
      const dataCath = {
        role_id:this.step3.role,
        menus:selectedMenuIds,
       
      }
   
      
      try {
        const response = await axios.post("/menus/assign/menu-to-user", dataCath, {
          headers: {
            
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
   
        if (response.data.status === "success") {
       
              this.closeModal(modalId);
              this.successmsg(
            "Données du rôle mises à jour",
            "Les données du rôle ont été mises à jour avec succès !"
          );
              await this.fetchRoles()
        
        
          
        } 
      } catch (error) {

        if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('user/clearLoggedInUser');
        this.$router.push("/");  //a revoir
      }
      }
   
  },
    async HandleIdUpdate(id) {
      this.loading = true;

      try {
          const response = this.RolesOptions.find(item => item.id === id);
        if (response) {
          let data = response;
            this.step2.role = data.name,
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
        this.loading = true;
        const data = {
          name:this.step2.role,
         
        }
             
        try {
          const response = await axios.put(`roles/${this.ToId}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`
              
            },
          });
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
            "Données du rôle mises à jour",
            "Les données du rôle ont été mises à jour avec succès !"
          );
            await this.fetchRoles();
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
        const response = await axios.delete(`/roles/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
          "Rôle supprimé",
          "Le rôle a été supprimé avec succès."
        );
          await this.fetchRoles();
        } else {
          Swal.fire({
              title: "Suppression impossible",
              text: response.data.message,
              icon: "question"
            });
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
    async handleOptionClick(option) {
    
    await  this.fetchDetailRoles(option.value)
    },
    
     filterByName() {
      this.currentPage = 1;
      if (this.search !== null) {
        const tt = this.search;
        const searchValue = tt.toLowerCase();
        this.RolesOptions = this.data.filter((user) => {
          const Nom = user.name ||{require};
         
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
          return  this.RolesOptions.slice(startIndex, endIndex);
        },
      },
}
</script>
<style lang="css" scoped>
    
</style>