<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
  
 
    <div class="contact-header mb-3 py-2 px-1">
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
  
          <button class="btn btn-icon btn-primary ms-2" data-bs-placement="top" data-bs-title="Add Contact"
            data-bs-toggle="modal" data-bs-target="#create-infrastructure">
            <i class="ri-add-line"> </i>
          </button>
        </div>
      </div>
    </div>
      <div class="row task-card">
        <div v-if="paginatedItems.length === 0" class="noresul">
        <span> Vous n'avez pas encore d'infrastructure, vous pouvez également en ajouter une !! </span>
      </div>
      <div class="table-responsive" v-else>
                                    <table class="table text-nowrap table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Code</th>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Date début</th>
                                                <th scope="col">date fin</th>
                                                <th scope="col">Maître d'ouvrage</th>
                                                <th scope="col">Etat</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr v-for="item  in paginatedItems" :key="item.id">
                                                 <th style="width: 30px;" scope="row" class="ps-4">{{item.CodeInfrastructure}}</th>
                                                <td>
                                                    <div class="d-flex align-items-center lh-1">
                                                        <div class="me-2">
                                                            <span class="avatar avatar-xs">
                                                                <img src="@/assets/img/logo_mobile.png" alt="">
                                                            </span>
                                                        </div>
                                                        <div>{{ item.NomInfrastructure }}</div>
                                                    </div>
                                                </td>
                                                <td class="text-warning">
                                                    {{ formatDate(item.DateDebut)  }}
                                                </td>
                                                <td style="color:red">
                                                    {{ formatDate(item.DateFin)  }}
                                                </td>
                                                <td>
                                                    {{ item.MaitreOuvrage }}
                                                </td>
                                                <td>
                                                  
                                                    <div class="btn-list w-100 d-flex justify-content-center">
                                                        <div>
                                                            <div class="btn btn-sm  btn-success btn-wave" v-if="item.Visible === '1'"
                                                            >
                                                            <i class="ri-lock-unlock-line"></i> Actif
                                                            </div>
                                                            <button class="btn btn-sm  btn-warning btn-wave" v-if="item.Visible === '0'"
                                                            >
                                                            <i class="ri-lock-2-line"></i> Inactif
                                                            </button>
                                                        </div>
                                        
                                                        </div>
                                                </td>
                                               
                                                <td>
                                                    <div class="hstack gap-2 fs-1"> 
                                                        <router-link :to="{ name: 'detail_infrastructures', params: { id: item.id }}"   class="btn btn-sm btn-icon btn-primary btn-wave">
                                                            <i class="ri-eye-line"></i>
                                                        </router-link>
                                                        <button class="btn btn-sm btn-icon btn-info btn-wave " data-bs-toggle="modal"
                                                        data-bs-target="#update-infrastructure" @click="HandleIdUpdateInfra(item.id)">
                                                        <i class="ri-edit-line"></i>
                                                    </button>

                                                        <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDeleteInfrastructure(item.id)">
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

            <!-- Start:: Create infrastructure -->
       

         <div
      class="modal fade effect-rotate-bottom"
      id="create-infrastructure"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="create-infrastructure"
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
              <b class="text-center">Créer une infrastructure</b>
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
            <div  class="row">
                <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Code">Code<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.CodeInfrastructure" color="info" name="CodeInfrastructure" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.CodeInfrastructure.$error">{{ v$.step1.CodeInfrastructure.$errors[0].$message}}</small>
                                        <small v-if="resultError['CodeInfrastructure']"> {{ resultError["CodeInfrastructure"] }} </small>
                                    </div>
                                                               
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Nom">Nom<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.NomInfrastructure" color="info" name="NomInfrastructure" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.NomInfrastructure.$error">{{ v$.step1.NomInfrastructure.$errors[0].$message}}</small>
                                        <small v-if="resultError['NomInfrastructure']"> {{ resultError["NomInfrastructure"] }} </small>

                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Sigle">Trimestre<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step1.Trimestre" color="info" name="Trimestre" size="sm" rounded-size="sm" :options="trimestre" search />
                                        <small v-if="v$.step1.Trimestre.$error">{{ v$.step1.Trimestre.$errors[0].$message}}</small>
                                        <small v-if="resultError['Trimestre']"> {{ resultError["Trimestre"] }} </small>
                                    </div>
         
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                    <label for="date_start">Date de debut<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.DateDebut"   color="info" name="DateDebut" size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step1.DateDebut.$error">{{ v$.step1.DateDebut.$errors[0].$message}}</small>
                                        <small v-if="resultError['DateDebut']"> {{ resultError["DateDebut"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="date_end">Date fin<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.DateFin"  :min="step1.DateDebut" color="info" name="DateFin" size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step1.DateFin.$error">{{ v$.step1.date_start.$errors[0].$message}}</small>
                                        <small v-if="resultError['DateFin']"> {{ resultError["DateFin"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Logo">Logo<span class="text-danger">*</span></label>
                                        <input type="file" class="form-control" id="contact-mail" @change="handleFileUploadLogo"  accept="image/*" >
                                        <!-- <small v-if="v$.step1.Logo.$error">{{ v$.step1.Logo.$errors[0].$message}}</small> -->
                                        <small v-if="resultError['Logo']"> {{ resultError["Logo"] }} </small>
                                    </div>
                                   
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="infrastructure_id">type d'infrastructure<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step1.TypeInfrastructure" color="info" name="TypeInfrastructure" size="sm" rounded-size="sm" :options="TypesOptions" search />
                                        <small v-if="v$.step1.TypeInfrastructure.$error">{{ v$.step1.TypeInfrastructure.$errors[0].$message}}</small>
                                        <small v-if="resultError['TypeInfrastructure']"> {{ resultError["TypeInfrastructure"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="MaitreOuvrage">Maître d'ouvrage<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.MaitreOuvrage" color="info" name="MaitreOuvrage" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.MaitreOuvrage.$error">{{ v$.step1.MaitreOuvrage.$errors[0].$message}}</small>
                                        <small v-if="resultError['MaitreOuvrage']"> {{ resultError["MaitreOuvrage"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="EntrepriseResponsable">Entreprise Responsable<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.EntrepriseResponsable" color="info" name="EntrepriseResponsable" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.EntrepriseResponsable.$error">{{ v$.step1.EntrepriseResponsable.$errors[0].$message}}</small>
                                        <small v-if="resultError['EntrepriseResponsable']"> {{ resultError["EntrepriseResponsable"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Localité">Localité<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step1.LocalitesConcernees" color="info" name="LocalitesConcernees" size="sm" rounded-size="sm" :options="formattedRegionsOptions"  multiple />
                                        <small v-if="v$.step1.LocalitesConcernees.$error">{{ v$.step1.LocalitesConcernees.$errors[0].$message}}</small>
                                        <small v-if="resultError['LocalitesConcernees']"> {{ resultError["LocalitesConcernees"] }} </small>

                                    </div>
                                    
                                   
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="projet_id">Geo Infrastructure</label>
                                        <MazInput v-model="step1.GeoInfrastructure" color="info" name="GeoInfrastructure" size="sm" rounded-size="sm" placeholder="12.22 , -23.33"  />
                                        <small v-if="v$.step1.GeoInfrastructure.$error">{{ v$.step1.GeoInfrastructure.$errors[0].$message}}</small>
                                        <small v-if="resultError['GeoInfrastructure']"> {{ resultError["GeoInfrastructure"] }} </small>
                                    </div>

                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Visibilite">Visibilite<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step1.Visible" color="info" name="Visible" size="sm" rounded-size="sm" :options="choix" />
                                        <small v-if="v$.step1.Visible.$error">{{ v$.step1.Visible.$errors[0].$message}}</small>
                                        <small v-if="resultError['Visible']"> {{ resultError["Visible"] }} </small>
                                    </div>
  

         </div>
         
         <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitInfrastructure('create-infrastructure')">
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
                <!-- End:: Create infrastructure -->

                    <!-- Start:: update infrastructure -->
       

         <div
      class="modal fade effect-rotate-bottom"
      id="update-infrastructure"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update-infrastructure"
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
              <b class="text-center">Modifier une infrastructure</b>
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
            <div  class="row">
                <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Code">Code<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.CodeInfrastructure" color="info" name="CodeInfrastructure" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step2.CodeInfrastructure.$error">{{ v$.step2.CodeInfrastructure.$errors[0].$message}}</small>
                                        <small v-if="resultError['CodeInfrastructure']"> {{ resultError["CodeInfrastructure"] }} </small>
                                    </div>
                                                               
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Nom">Nom<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.NomInfrastructure" color="info" name="NomInfrastructure" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step2.NomInfrastructure.$error">{{ v$.step2.NomInfrastructure.$errors[0].$message}}</small>
                                        <small v-if="resultError['NomInfrastructure']"> {{ resultError["NomInfrastructure"] }} </small>

                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Sigle">Trimestre<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step2.Trimestre" color="info" name="Trimestre" size="sm" rounded-size="sm" :options="trimestre" search />
                                        <small v-if="v$.step2.Trimestre.$error">{{ v$.step2.Trimestre.$errors[0].$message}}</small>
                                        <small v-if="resultError['Trimestre']"> {{ resultError["Trimestre"] }} </small>
                                    </div>
         
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                    <label for="date_start">Date de debut<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.DateDebut"   color="info" name="DateDebut" size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step2.DateDebut.$error">{{ v$.step2.DateDebut.$errors[0].$message}}</small>
                                        <small v-if="resultError['DateDebut']"> {{ resultError["DateDebut"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="date_end">Date fin<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.DateFin"  :min="step2.DateDebut" color="info" name="DateFin" size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step2.DateFin.$error">{{ v$.step2.date_start.$errors[0].$message}}</small>
                                        <small v-if="resultError['DateFin']"> {{ resultError["DateFin"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Logo">Logo<span class="text-danger">*</span></label>
                                        <input type="file" class="form-control" id="contact-mail" @change="handleFileUploadLogo"  accept="image/*" >
                                        <!-- <small v-if="v$.step2.Logo.$error">{{ v$.step2.Logo.$errors[0].$message}}</small> -->
                                        <small v-if="resultError['Logo']"> {{ resultError["Logo"] }} </small>
                                    </div>
                                   
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="infrastructure_id">type d'infrastructure<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step2.TypeInfrastructure" color="info" name="TypeInfrastructure" size="sm" rounded-size="sm" :options="TypesOptions" search />
                                        <small v-if="v$.step2.TypeInfrastructure.$error">{{ v$.step2.TypeInfrastructure.$errors[0].$message}}</small>
                                        <small v-if="resultError['TypeInfrastructure']"> {{ resultError["TypeInfrastructure"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="MaitreOuvrage">Maître d'ouvrage<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.MaitreOuvrage" color="info" name="MaitreOuvrage" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step2.MaitreOuvrage.$error">{{ v$.step2.MaitreOuvrage.$errors[0].$message}}</small>
                                        <small v-if="resultError['MaitreOuvrage']"> {{ resultError["MaitreOuvrage"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="EntrepriseResponsable">Entreprise Responsable<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.EntrepriseResponsable" color="info" name="EntrepriseResponsable" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step2.EntrepriseResponsable.$error">{{ v$.step2.EntrepriseResponsable.$errors[0].$message}}</small>
                                        <small v-if="resultError['EntrepriseResponsable']"> {{ resultError["EntrepriseResponsable"] }} </small>
                                    </div>
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Localité">Localité<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step2.LocalitesConcernees" color="info" name="LocalitesConcernees" size="sm" rounded-size="sm" :options="formattedRegionsOptions"  multiple />
                                        <small v-if="v$.step2.LocalitesConcernees.$error">{{ v$.step2.LocalitesConcernees.$errors[0].$message}}</small>
                                        <small v-if="resultError['LocalitesConcernees']"> {{ resultError["LocalitesConcernees"] }} </small>

                                    </div>
                                    
                                   
                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="projet_id">Geo Infrastructure</label>
                                        <MazInput v-model="step2.GeoInfrastructure" color="info" name="GeoInfrastructure" size="sm" rounded-size="sm" placeholder="12.22 , -23.33"  />
                                        <small v-if="v$.step2.GeoInfrastructure.$error">{{ v$.step2.GeoInfrastructure.$errors[0].$message}}</small>
                                        <small v-if="resultError['GeoInfrastructure']"> {{ resultError["GeoInfrastructure"] }} </small>
                                    </div>

                                    <div class="col-xl-4 col-md-6 col-sm-12">
                                        <label for="Visibilite">Visibilite<span class="text-danger">*</span></label>
                                        <MazSelect v-model="step2.Visible" color="info" name="Visible" size="sm" rounded-size="sm" :options="choix" />
                                        <small v-if="v$.step2.Visible.$error">{{ v$.step2.Visible.$errors[0].$message}}</small>
                                        <small v-if="resultError['Visible']"> {{ resultError["Visible"] }} </small>
                                    </div>
  


         
         <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdateInfrastructure('update-infrastructure')">
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
                <!-- End:: update infrastructure -->
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
  import { mapGetters } from 'vuex';
export default {
    name: "ComponentlisteInfra",
    props:{
    data: {
      type:Object ,
      required: true
    },
    InfrastructuresOptions: {
      type:  Array,
      required: true
    },

  },
 
   components: { Loading , MazPhoneNumberInput ,Pag},
   computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    ...mapGetters('project', ['getCodeProjet']),
    codeProjet() {
      return this.getCodeProjet;
    },
    totalPages() {
      return Math.ceil(this.filteredIndicateurs.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredIndicateurs.slice(startIndex, endIndex);
    },
    filteredIndicateurs() {
      if (!this.search) {
        return this.InfrastructuresOptions;
      }
      const searchValue = this.search.toLowerCase();
      return this.InfrastructuresOptions.filter((user) => {
        const Nom = user.IntituleIndicateur || "";
        const Prenoms = user.CodeIndicateur || "";
        const Pseudo = user.CibleFinProjet || "";
        const Email = user.CodeProjet || "";
        return (
          Nom.toLowerCase().includes(searchValue) ||
          Prenoms.toLowerCase().includes(searchValue) ||
          Email.toLowerCase().includes(searchValue) ||
          Pseudo.toLowerCase().includes(searchValue)
        );
      });
    },
    formattedRegionsOptions() {
        if (!this.data || !this.data.regions) {
        return '';
      }
      return this.data.regions.map(item => ({
        label: item.region?.NomRegion,
        value: item.region?.CodeRegion
      }));
    },
    formattedGeoInfrastructure() {
      return this.step1.GeoInfrastructure.split(',').map(coord => coord.trim());
    },
    formattedGeoInfrastructureUpdate() {
  console.log(this.step2.GeoInfrastructure);
  
  let array;
  if (Array.isArray(this.step2.GeoInfrastructure) || this.step2.GeoInfrastructure instanceof Proxy) {
    array = Array.from(this.step2.GeoInfrastructure);
  } else if (typeof this.step2.GeoInfrastructure === 'string') {
    array = this.step2.GeoInfrastructure.split(',');
  } else {
    array = [];
  }
  
  return array.map(coord => parseFloat(coord).toFixed(2));
}
   
  
  },
   data() {
     return {
       
       loading: false,
       error: "",
       resultError: {}, 
       v$: useVuelidate(),
       Code:"",
        search: "",
        currentPage: 1,
        itemsPerPage: 12,
        totalPageArray: [],
        TypesOptions:[],
        choix: [
         { label: "Oui", value: true },
         { label: "Non", value: false },
       ],
       trimestre: [
         { label: "Trimestre 1", value: "T1" },
         { label: "Trimestre 2", value: "T2" },
         { label: "Trimestre 3", value: "T3" },
         { label: "Trimestre 4", value: "T4" },
       ],
     
       step1: {
           CodeInfrastructure: "",
           Trimestre: "",
           CodeProjet: "",
           Logo:"",
           NomInfrastructure: "",
           MaitreOuvrage: "",
           EntrepriseResponsable: "",
           DateDebut:"",
           DateFin:"",
           GeoInfrastructure:"",
           LocalitesConcernees:[],
           TypeInfrastructure:"",
           Visible:"",
               
     },
     step2: {
           CodeInfrastructure: "",
           Trimestre: "",
           CodeProjet: "",
           Logo:"",
           NomInfrastructure: "",
           MaitreOuvrage: "",
           EntrepriseResponsable: "",
           DateDebut:"",
           DateFin:"",
           GeoInfrastructure:"",
           LocalitesConcernees:[],
           TypeInfrastructure:"",
           Visible:"",
               
     },
    
      
     };
   },
   validations: {
     step1: {
           CodeInfrastructure: {require},
           Trimestre: {require},
           Logo:{},
           NomInfrastructure: {require},
           MaitreOuvrage: {require},
           EntrepriseResponsable: {require},
           DateDebut:{require},
           DateFin:{require},
           GeoInfrastructure:{},
           LocalitesConcernees:{require},
           TypeInfrastructure:{require},
           Visible:{require},
         },
         step2: {
           CodeInfrastructure: {require},
           Trimestre: {require},
           Logo:{},
           NomInfrastructure: {require},
           MaitreOuvrage: {require},
           EntrepriseResponsable: {require},
           DateDebut:{require},
           DateFin:{require},
           GeoInfrastructure:{},
           LocalitesConcernees:{require},
           TypeInfrastructure:{require},
           Visible:{require},
         }
       },
       watch: {
      codeProjet(newVal) {
         console.log("codeProjet has changed:", newVal);
         this.handleCodeProjetChange(newVal);
      }
   },
         
  async mounted() {
    console.log("loggedInUser", this.loggedInUser);
      //  this.Code = localStorage.getItem('CodeProjet');
      // console.log("CodeProjet from parent:", this.Code);
      console.log("CodeProjet from Vuex:", this.codeProjet);
    await this.fetchTypes();

   }, 
   methods: {
    successmsg:successmsg,
    handleCodeProjetChange(codeProjet) {
         // Logique pour gérer les changements de codeProjet
         console.log("Handling codeProjet change:", codeProjet);
         this.Code = codeProjet
         // Par exemple, mettre à jour les indicateurs ou autres données
      },
      async fetchTypes() {
      try {
        const response = await axios.get( '/infrastructures/types',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );

        console.log("responseclienteschools-level", response.data);
        if (response.data.status === "success") {
          const filteredOptions = response.data.data.filter(item => item.Visible === '1');
              this.TypesOptions = filteredOptions.map(item => ({
                label: item.Intitule,
                value: item.id,
        }))
          console.log("this.DaysOptions",  this.TypesOptions);
        
          this.loading =  false
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
    handleFileUploadLogo(event) {
    console.log("File input change");
    const file = event.target.files[0];
    console.log("handleFileUploadLogo Selected file:", file);
    // this.submitFile(file )
    this.step1.Logo = file

  },

 
async submitFile(file ){
  const formData = new FormData();
formData.append('Fichier',file);


try {
const response = await axios.post('/recruitment/insurance/uploads' , formData, {
     headers: { 
     
            'Content-Type': 'multipart/form-data'
    }});
  console.log('Réponse du téléversement :', response);
  if (response.data.status === "success") { 
        this.step1.Logo = response.data.data.url
       
       

       } else {

       }
 } catch (error) {
 console.log('response.login', error); 

 this.loading = false
 if (error.response.data.status === "error") {
 return this.error = error.response.data.message

 } else {
   this.formatValidationErrors(error.response.data.errors);
 }

  } 


},
    async submitInfrastructure(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
            CodeInfrastructure : this.step1.CodeInfrastructure,
            Trimestre : this.step1.Trimestre,
            CodeProjet : this.step1.CodeProjet,
            Logo : this.step1.Logo,
            NomInfrastructure : this.step1.NomInfrastructure,
            MaitreOuvrage : this.step1.MaitreOuvrage,
            EntrepriseResponsable : this.step1.EntrepriseResponsable,
            DateDebut : this.step1.DateDebut,
            DateFin : this.step1.DateFin,
            GeoInfrastructure : this.formattedGeoInfrastructure,
            LocalitesConcernees : this.step1.LocalitesConcernees,
            TypeInfrastructure : this.step1.TypeInfrastructure,
            Visible : this.step1.Visible,
            CodeProjet : this.Code,
        
        }
        console.log('data',data);
        //   const formData = new FormData();
        // formData.append("CodeInfrastructure",  this.step1.CodeInfrastructure);
        // formData.append("Trimestre",  this.step1.Trimestre);
        // formData.append("CodeProjet",  this.Code);

        // formData.append("Logo",  this.step1.Logo);
        // formData.append("NomInfrastructure",  this.step1.NomInfrastructure);
        // formData.append("MaitreOuvrage",  this.step1.MaitreOuvrage);

        // formData.append("EntrepriseResponsable",  this.step1.EntrepriseResponsable);
        // formData.append("DateDebut",  this.step1.DateDebut);
        // formData.append("DateFin",  this.step1.DateFin);

        // formData.append("GeoInfrastructure",  this.formattedGeoInfrastructure);
        // formData.append("LocalitesConcernees",  this.step1.LocalitesConcernees);
        // formData.append("TypeInfrastructure",  this.step1.TypeInfrastructure);

        // formData.append("Visible",  this.step1.Visible);

 
         try {
          const response = await axios.post("/infrastructures", data, {
            headers: { 
                Authorization: `Bearer ${this.loggedInUser.token}` ,
                
           
          }
          });
          console.log("Réponse du téléversement :", response);
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
                    "Infrastructure créée avec succès",
                    "La nouvelle infrastructure a été créée avec succès !"
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
    async HandleIdUpdateInfra(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/infrastructures/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response) {
          console.log("responsedata", response.data.data);
          let data = response.data.data;
            this.step2.CodeInfrastructure = data.CodeInfrastructure,
            this.step2.Trimestre = data.Trimestre,
            this.step2.Logo = data.Logo,
            this.step2.NomInfrastructure = data.NomInfrastructure,
            this.step2.MaitreOuvrage = data.MaitreOuvrage,
            this.step2.EntrepriseResponsable = data.EntrepriseResponsable,
            this.step2.DateDebut = data.DateDebut,
            this.step2.DateFin = data.DateFin,
            this.step2.TypeInfrastructure = parseInt(data.TypeInfrastructure) ,
            this.step2.Visible = (data.Visible === "1") ? true : false,
            this.Code = data.CodeProjet,
            this.ToId = data.id;
            if (data.LocalitesConcernees.includes("|")) {
      this.step2.LocalitesConcernees = data.LocalitesConcernees.split("|");
    } else if (data.LocalitesConcernees.includes(",")) {
      this.step2.LocalitesConcernees = JSON.parse(data.LocalitesConcernees);
    } else {
      this.step2.LocalitesConcernees = data.LocalitesConcernees.split(" ");
    }

    if (data.GeoInfrastructure.includes("|")) {
      this.step2.GeoInfrastructure = data.GeoInfrastructure.split("|");
    } else if (data.GeoInfrastructure.includes(",")) {
      this.step2.GeoInfrastructure = JSON.parse(data.GeoInfrastructure);
    } else {
      this.step2.GeoInfrastructure = data.GeoInfrastructure.split(" ");
    }
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

    async submitUpdateInfrastructure(modalId) {
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true
        const dataSend = {
        
        
                id:this.ToId,
                CodeInfrastructure : this.step2.CodeInfrastructure,
                Trimestre : this.step2.Trimestre,
                CodeProjet : this.step2.CodeProjet,
                Logo : this.step2.Logo,
                NomInfrastructure : this.step2.NomInfrastructure,
                MaitreOuvrage : this.step2.MaitreOuvrage,
                EntrepriseResponsable : this.step2.EntrepriseResponsable,
                DateDebut : this.step2.DateDebut,
                DateFin : this.step2.DateFin,
                GeoInfrastructure : this.formattedGeoInfrastructureUpdate,
                LocalitesConcernees : this.step2.LocalitesConcernees,
                TypeInfrastructure : this.step2.TypeInfrastructure,
                Visible : this.step2.Visible,
                CodeProjet: this.Code,
            
          

         
        }

        console.log(dataSend);
        try {
        const response = await axios.put('/infrastructures/update',dataSend, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
         
        });

        console.log("usersOptions", response.data);
        if (response.data.status === "success") {
          this.closeModal(modalId);
          this.successmsg(
            "Infrastructure mise à jour avec succès",
            "L'infrastructure a été mise à jour avec succès !"
        );

          this.loading = false;
          this.$emit('indicateur-updated');
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
        


      } else {
        console.log("cest pas bon ", this.v$.$errors);
        this.loading = false;
      }
    },
    async HandleIdDeleteInfrastructure(id) {
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
        this.ConfirmeDeleteInfrastructure(id);
      }
    },
    async ConfirmeDeleteInfrastructure(id) {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/infrastructures/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
                "Infrastructure supprimée avec succès",
                "L'infrastructure a été supprimée avec succès !"
            );

          this.loading = false;
          this.$emit('indicateur-updated');
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
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
    },

    async formatValidationErrors(errors) {
     const formattedErrors = {};

     for (const field in errors) {
       const errorMessages = errors[field]; // Liste complète des messages d'erreur
      

       const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
       

       formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
     }

     this.resultError = formattedErrors; // Stockez les erreurs dans un objet

     // Maintenant, this.resultError est un objet où les clés sont les noms des champs
   
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
filterByName() {
      this.currentPage = 1; // Reset to the first page on search
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
      return this.indicateursOptions.slice(startIndex, endIndex);
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
   },
}
</script>
<style lang="css" scoped>
    
</style>