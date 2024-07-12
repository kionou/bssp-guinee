<template>
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
      <!-- Page Header -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
      >
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
                v-model="control"
                @input="filterByName"
              />
              <button class="btn btn-light" type="button" id="search-contact-member" >
              
                <i class="ri-search-line text-muted"></i>
              </button>
            </div>
  
            <div class="btn btn-icon btn-primary ms-2" @click="$router.push({ path: '/bspp/ajouter-projets' })">
              <i class="ri-add-line"> </i>
            </div>
          </div>
        </div>
      </div>
      <div class="row task-card">
                <div class="row">
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             <header>
                              <span class="carde-title " >TRAVAUX DE CONSTRUCTION DE LA ROUTE LE PRINCE KAGBELEN-KOURIAH  </span>
                             </header>
                                <div class="row align-items-center px-2">
                      
                                    <div class="date-box" >
                                <img  src="@/assets/img/projet1.jpg" alt="" > 
                                </div>
                                   
                                    </div>
                          
                                <p class="my-2 fw-semibold">Date debut : <span class="fs-14 mb-1 text-warning fw-semibold">20/03/2024</span></p>
                                <p class="mb-2 fw-semibold">Date fin : <span class="fs-14 mb-1  fw-semibold " style="color:red;" >20/03/2024</span></p>
                                <p class="mb-2 fw-semibold">Zones  :<span class="fs-14 mb-1 text-muted fw-semibold">Grand Conakry</span></p>
                                <p class="mb-2 fw-semibold">Budget  :<span class="fs-14 mb-1  fw-semibold" style="color:#05b305;">223 (M GNF)</span></p>
                                
                            </div>
                            <div>
                                <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                                <div class="btn-list">
                                    <router-link to="/bspp/detail-projet"
                                        
                                        class="btn btn-sm btn-icon btn-success btn-wave"
                                    >
                                        <i class="ri-eye-line"></i>
                                    </router-link>
                                
                                <button class="btn btn-sm btn-icon btn-primary btn-wave">
                                    <i class="ri-edit-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-delete-bin-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-shut-down-line"></i>
                                </button>
                                
                                </div>
                                </div>
                                    
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             
                                <div class="row align-items-center px-2">
                                    <div class="date-box" >
                                <img  src="@/assets/img/projet1.jpg" alt=""> 
                                </div>
                                    <span class="carde-title " >TRAVAUX DE CONSTRUCTION DE LA ROUTE LE PRINCE KAGBELEN-KOURIAH  </span>
                                    </div>
                          
                                <p class="my-2 fw-semibold">Date debut : <span class="fs-14 mb-1 text-primary fw-semibold">20/03/2024</span></p>
                                <p class="mb-2 fw-semibold">Date fin : <span class="fs-14 mb-1 text-muted fw-semibold" >20/03/2024</span></p>
                                <p class="mb-2 fw-semibold"> Zones  :<span class="fs-14 mb-1 text-muted fw-semibold">Grand Conakry</span></p>
                                <p class="mb-2 fw-semibold">  Budget  :<span class="fs-14 mb-1 text-muted fw-semibold">223 (M GNF)</span></p>
                                
                            </div>
                            <div>
                                <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                                <div class="btn-list">
                                    <router-link to="/bspp/detail-projet"
                                        
                                        class="btn btn-sm btn-icon btn-success btn-wave"
                                    >
                                        <i class="ri-eye-line"></i>
                                    </router-link>
                                
                                <button class="btn btn-sm btn-icon btn-primary btn-wave">
                                    <i class="ri-edit-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-delete-bin-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-shut-down-line"></i>
                                </button>
                                
                                </div>
                                </div>
                                    
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             
                                <div class="row align-items-center px-2">
                                    <div class="date-box" >
                                <img  src="@/assets/img/projet1.jpg" alt=""> 
                                </div>
                                    <span class="carde-title " >TRAVAUX DE CONSTRUCTION DE LA ROUTE LE PRINCE KAGBELEN-KOURIAH  </span>
                                    </div>
                          
                                <p class="my-2 fw-semibold">Date debut : <span class="fs-14 mb-1 text-primary fw-semibold">20/03/2024</span></p>
                                <p class="mb-2 fw-semibold">Date fin : <span class="fs-14 mb-1 text-muted fw-semibold" >20/03/2024</span></p>
                                <p class="mb-2 fw-semibold"> Zones  :<span class="fs-14 mb-1 text-muted fw-semibold">Grand Conakry</span></p>
                                <p class="mb-2 fw-semibold">  Budget  :<span class="fs-14 mb-1 text-muted fw-semibold">223 (M GNF)</span></p>
                                
                            </div>
                            <div>
                                <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                                <div class="btn-list">
                                    <router-link to="/bspp/detail-projet"
                                        
                                        class="btn btn-sm btn-icon btn-success btn-wave"
                                    >
                                        <i class="ri-eye-line"></i>
                                    </router-link>
                                
                                <button class="btn btn-sm btn-icon btn-primary btn-wave">
                                    <i class="ri-edit-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-delete-bin-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-shut-down-line"></i>
                                </button>
                                
                                </div>
                                </div>
                                    
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             
                                <div class="row align-items-center px-2">
                                    <div class="date-box" >
                                <img  src="@/assets/img/projet1.jpg" alt=""> 
                                </div>
                                    <span class="carde-title " >TRAVAUX DE CONSTRUCTION DE LA ROUTE LE PRINCE KAGBELEN-KOURIAH  </span>
                                    </div>
                          
                                <p class="my-2 fw-semibold">Date debut : <span class="fs-14 mb-1 text-primary fw-semibold">20/03/2024</span></p>
                                <p class="mb-2 fw-semibold">Date fin : <span class="fs-14 mb-1 text-muted fw-semibold" >20/03/2024</span></p>
                                <p class="mb-2 fw-semibold"> Zones  :<span class="fs-14 mb-1 text-muted fw-semibold">Grand Conakry</span></p>
                                <p class="mb-2 fw-semibold">  Budget  :<span class="fs-14 mb-1 text-muted fw-semibold">223 (M GNF)</span></p>
                                
                            </div>
                            <div>
                                <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                                <div class="btn-list">
                                    <router-link to="/bspp/detail-projet"
                                        
                                        class="btn btn-sm btn-icon btn-success btn-wave"
                                    >
                                        <i class="ri-eye-line"></i>
                                    </router-link>
                                
                                <button class="btn btn-sm btn-icon btn-primary btn-wave">
                                    <i class="ri-edit-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-delete-bin-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-shut-down-line"></i>
                                </button>
                                
                                </div>
                                </div>
                                    
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             
                                <div class="row align-items-center px-2">
                                    <div class="date-box" >
                                <img  src="@/assets/img/projet1.jpg" alt=""> 
                                </div>
                                    <span class="carde-title " >TRAVAUX DE CONSTRUCTION DE LA ROUTE LE PRINCE KAGBELEN-KOURIAH  </span>
                                    </div>
                          
                                <p class="my-2 fw-semibold">Date debut : <span class="fs-14 mb-1 text-primary fw-semibold">20/03/2024</span></p>
                                <p class="mb-2 fw-semibold">Date fin : <span class="fs-14 mb-1 text-muted fw-semibold" >20/03/2024</span></p>
                                <p class="mb-2 fw-semibold"> Zones  :<span class="fs-14 mb-1 text-muted fw-semibold">Grand Conakry</span></p>
                                <p class="mb-2 fw-semibold">  Budget  :<span class="fs-14 mb-1 text-muted fw-semibold">223 (M GNF)</span></p>
                                
                            </div>
                            <div>
                                <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                                <div class="btn-list">
                                    <router-link to="/bspp/detail-projet"
                                        
                                        class="btn btn-sm btn-icon btn-success btn-wave"
                                    >
                                        <i class="ri-eye-line"></i>
                                    </router-link>
                                
                                <button class="btn btn-sm btn-icon btn-primary btn-wave">
                                    <i class="ri-edit-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-delete-bin-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-shut-down-line"></i>
                                </button>
                                
                                </div>
                                </div>
                                    
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             
                                <div class="row align-items-center px-2">
                                    <div class="date-box" >
                                <img  src="@/assets/img/projet1.jpg" alt=""> 
                                </div>
                                    <span class="carde-title " >TRAVAUX DE CONSTRUCTION DE LA ROUTE LE PRINCE KAGBELEN-KOURIAH  </span>
                                    </div>
                          
                                <p class="my-2 fw-semibold">Date debut : <span class="fs-14 mb-1 text-primary fw-semibold">20/03/2024</span></p>
                                <p class="mb-2 fw-semibold">Date fin : <span class="fs-14 mb-1 text-muted fw-semibold" >20/03/2024</span></p>
                                <p class="mb-2 fw-semibold"> Zones  :<span class="fs-14 mb-1 text-muted fw-semibold">Grand Conakry</span></p>
                                <p class="mb-2 fw-semibold">  Budget  :<span class="fs-14 mb-1 text-muted fw-semibold">223 (M GNF)</span></p>
                                
                            </div>
                            <div>
                                <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                                <div class="btn-list">
                                    <router-link to="/bspp/detail-projet"
                                        
                                        class="btn btn-sm btn-icon btn-success btn-wave"
                                    >
                                        <i class="ri-eye-line"></i>
                                    </router-link>
                                
                                <button class="btn btn-sm btn-icon btn-primary btn-wave">
                                    <i class="ri-edit-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-delete-bin-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-shut-down-line"></i>
                                </button>
                                
                                </div>
                                </div>
                                    
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             
                                <div class="row align-items-center px-2">
                                    <div class="date-box" >
                                <img  src="@/assets/img/projet1.jpg" alt=""> 
                                </div>
                                    <span class="carde-title " >TRAVAUX DE CONSTRUCTION DE LA ROUTE LE PRINCE KAGBELEN-KOURIAH  </span>
                                    </div>
                          
                                <p class="my-2 fw-semibold">Date debut : <span class="fs-14 mb-1 text-primary fw-semibold">20/03/2024</span></p>
                                <p class="mb-2 fw-semibold">Date fin : <span class="fs-14 mb-1 text-muted fw-semibold" >20/03/2024</span></p>
                                <p class="mb-2 fw-semibold"> Zones  :<span class="fs-14 mb-1 text-muted fw-semibold">Grand Conakry</span></p>
                                <p class="mb-2 fw-semibold">  Budget  :<span class="fs-14 mb-1 text-muted fw-semibold">223 (M GNF)</span></p>
                                
                            </div>
                            <div>
                                <div class="w-100 d-flex justify-content-center" style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                                <div class="btn-list">
                                    <router-link to="/bspp/detail-projet"
                                        
                                        class="btn btn-sm btn-icon btn-success btn-wave"
                                    >
                                        <i class="ri-eye-line"></i>
                                    </router-link>
                                
                                <button class="btn btn-sm btn-icon btn-primary btn-wave">
                                    <i class="ri-edit-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-delete-bin-line"></i>
                                </button>

                                <button class="btn btn-sm btn-icon btn-danger btn-wave">
                                    <i class="ri-shut-down-line"></i>
                                </button>
                                
                                </div>
                                </div>
                                    
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>

                    
                    
                </div>
                
                
 </div>
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

          
        <div
      class="modal fade effect-rotate-bottom"
      id="add_client"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_client"
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
              <b class="text-center">Ajouter un projet</b>
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
                      <label for="userpassword"
                        >Code <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.client_name"
                        color="info"
                        name="client_name"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                      />
                      <small v-if="v$.step1.client_name.$error">{{
                        v$.step1.client_name.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['client_name']">
                        {{ resultError["client_name"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Sigle<span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.address"
                        color="info"
                        name="address"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                      />
                      <small v-if="v$.step1.address.$error">{{
                        v$.step1.address.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['address']">
                        {{ resultError["address"] }}
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
                        v-model="step1.state"
                        type="text"
                        color="info"
                        name="state"
                        size="sm"
                        rounded-size="sm"
                      />
                      <small v-if="v$.step1.state.$error">{{
                        v$.step1.state.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['state']">
                        {{ resultError["state"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Visible<span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step1.address"
                        color="info"
                        name="address"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                      />
                      <small v-if="v$.step1.address.$error">{{
                        v$.step1.address.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['address']">
                        {{ resultError["address"] }}
                      </small>
                    </div>
                  </div>

                </div>

                <div class="row mt-3 content-group">
                 
                <div class="col">
                    <div class="mb-3 position-relative">
                        <label for="password">Budget </label>
                        <MazInput v-model="step1.password"  type="text" name="password" color="info" placeholder="Abc123@!"  size="sm" rounded-size="sm" />
                        <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small>
                        <small v-if="resultError['password']">{{resultError['password']}}</small>
                    </div>
                </div>
                                                
                                             
                <div class="col">
                    <div class="mb-3 position-relative">
                        <label for="password_confirmation">Mode de financement</label>
                        <MazInput v-model="step1.password_confirmation"  type="text" name="password_confirmation" color="info" placeholder="Abc123@!"   size="sm" rounded-size="sm"/>
                        <small v-if="v$.step1.password_confirmation.$error">{{v$.step1.password_confirmation.$errors[0].$message}}</small>
                        <small v-if="resultError['password_confirmation']">{{resultError['password_confirmation']}}</small>
                      
                    </div>
                </div>
                                                
                         
                </div>

                <div class="row mt-3 content-group">
                 
                    <div class="col">
              <div class="input-groupe">
                <label for="employment_date_begin">Date debut <span class="text-danger">*</span></label>
                <MazInput v-model="step1.password_confirmatio1n" type="date" color="info" name="employment_date_begin" size="sm" rounded-size="sm"  />
              
              </div>
            </div>
            <div class="col">
              <div class="input-groupe">
                <label for="employment_date_end">Date fin <span class="text-danger">*</span></label>
                <MazInput v-model="step1.password_confirmation" type="date" :min="step1.password_confirmatio1n" color="info" name="employment_date_end" size="sm" rounded-size="sm" @input="clearErrorExp(index, 'employment_date_end')" />
             
              </div>
            </div>             
                 </div>

                 <div class="row mt-3 content-group">
                 
                 <div class="col">
           <div class="input-groupe">
             <label for="employment_date_begin">Description <span class="text-danger">*</span></label>
             <MazTextarea v-model="step1.password_confirmatio1n" type="date" color="info" name="employment_date_begin" size="sm" rounded-size="sm"  />
           
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
     
    },
    data() {
      return {
        loading: false,
        ClientOptions: [],
        data: [],
        currentPage: 1,
        itemsPerPage: 12,
        totalPageArray: [],
        control: { name: "" },
        resultError: {},
        profil: "",
        ToId: "",
        step1: {
          client_name: "",
          address: "",
          state: "",
          phone: "",
          password:'',
          password_confirmation:'',
        },
  
        v$: useVuelidate(),
        error: "",
      };
    },
    validations: {
      step1: {
        client_name: { require },
        address: { require },
        state: { require },
        phone: { require },
        password: {
              require,
              lgmin: lgmin(8),
              lgmax: lgmax(100),
         },
         password_confirmation: {
              require,
              lgmin: lgmin(8),
              lgmax: lgmax(100),
         },
        
      },
      step2: {
        client_name: { require },
        address: { require },
        state: { require },
        phone: { require },
      },
    },
   
    async mounted() {
      console.log("loggedInUser", this.loggedInUser);
     
    },
  
    methods: {
      successmsg: successmsg,
      validatePasswordsMatch() {
       return this.step1.password === this.step1.password_confirmation;
      },
      filterByName() {
        this.currentPage = 1;
        if (this.control.name !== null) {
          const tt = this.control.name;
          const searchValue = tt.toLowerCase();
          this.ClientOptions = this.data.filter((user) => {
            const Nom = user.client_name || "";
            const Address = user.address || "";
            const State = user.state || "";
            return (
              Nom.toLowerCase().includes(searchValue) ||
              Address.toLowerCase().includes(searchValue) ||
              State.toLowerCase().includes(searchValue)
            );
          });
        } else {
          this.ClientOptions = [...this.data];
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
    },
  };
  </script>
  <style lang="css" scoped>


 .texte {
margin-top: 10px;
}
.carde-title {
display: inline-block;
  font-size: 12px;
  font-weight: 700;
  transition: all 0.5s ease-in-out;
  top: -41px;
  right: 24px;
  width: 100%;
  
}

.carde-title:hover {
transform: translate3d(0px, 0px, 60px);
}



.date-box {

height: 80px;
width: 80Px;
border: 1px solid #fff;
padding:0 !important;
border-radius:50%;

}

.date-box img {
width: 100%;
height: 100%;
border-radius:50%;
}
  
  </style>
  