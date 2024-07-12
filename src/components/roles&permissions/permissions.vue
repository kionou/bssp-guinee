<template lang>
    <div>
        <div class="row">
                    <div class="col-xl-12">
                        <div class="card custom-card">
                            <div class="card-header justify-content-between">
                                <div class="card-title">
                                    Liste des permissions
                                </div>
                                <div class="d-flex flex-wrap">
                                    <div class="me-3 my-1">
                                        <input
                                        type="text"
                                        class="form-control bg-light border-0"
                                        placeholder="Recherchez..."
                                        aria-describedby="search-member"
                                        v-model="control"
                                        @input="filterByName"
                                    />
                                    </div>
                                    <div class="btn btn-icon btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#create-role">
                                    <i class="ri-add-line"> </i>
                                    </div>
                                  
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table text-nowrap table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">N</th>
                                                <th scope="col">Nom</th>
                                              
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    1
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center lh-1">
                                                        
                                                        <div>Super admin</div>
                                                    </div>
                                                </td>
                                                
                                             
                                               
                                                <td>
                                                    <div class="hstack gap-2 fs-1">
                                                      
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-info btn-wave waves-effect "><i class="ri-edit-line"></i></a>
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger btn-wave waves-effect waves-light"><i class="ri-delete-bin-line"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                          

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex flex-wrap align-items-center">
                                  
                                    <div class="ms-auto">
                                        <nav aria-label="Page navigation" class="pagination-style-4">
                                            <ul class="pagination mb-0">
                                                <li class="page-item disabled">
                                                    <a class="page-link" href="javascript:void(0);">
                                                        Prev
                                                    </a>
                                                </li>
                                                <li class="page-item active"><a class="page-link" href="javascript:void(0);">1</a></li>
                                                <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
                                                <li class="page-item">
                                                    <a class="page-link text-primary" href="javascript:void(0);">
                                                        next
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
        </div>

        <div
      class="modal fade effect-rotate-bottom"
      id="create-role"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="create-role"
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
              <b class="text-center"
                >Ajputer une permission</b
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
                        > Permissions <span class="text-danger">*</span></label
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
                <button class="" @click.prevent="submitClient('add_client')">
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
      id="update_client"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_client"
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
                >Modifier une permission</b
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
                        > Permission <span class="text-danger">*</span></label
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
                <button class="" @click.prevent="submitUpdate('update_client')">
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
      return Math.ceil(this.ClientOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.ClientOptions.slice(startIndex, endIndex);
    },
  
  },
  data(){
    return{
        loading: true,
      
      currentPage: 1,
      itemsPerPage: 10,
      totalPageArray: [],
      control: { name: '',},
      resultError: {},
      ToId:"",
      

      step1: {
        role:"",
       
       
      },
      step2: {
        role:"",
    
       
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
   
   
  },
  async mounted() {
    console.log("loggedInUser", this.loggedInUser);
    // await this.fetchClients();

  },
}
</script>
<style lang="css" scoped>
    
</style>