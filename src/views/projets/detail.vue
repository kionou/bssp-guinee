<template >
    <div>
      <Loading v-if="loading" style="z-index: 99999"></Loading>
      <!-- Page Header -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
      >
        <h1 class="page-title fw-semibold fs-18 mb-0">Projet-detail</h1>
        <div class="ms-md-1 ms-0">
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <a href="javascript:void(0);">BSSP</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Projet-detail
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="container-xxl flex-grow-1">
       
        <nav
          class="nav nav-style-6 nav-pills mb-3 nav-justified d-sm-flex d-block"
          role="tablist"
        >
          <a
            class="nav-link active"
            data-bs-toggle="tab"
            role="tab"
            aria-current="page"
            href="#step1"
            aria-selected="false"
            >General</a
          >
          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#step2"
            aria-selected="true"
            >Suivi projet </a
          >
          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#step3"
            aria-selected="false"
            >Indicateurs
          </a>
         
         
        </nav>
  
        <!-- Navbar pills -->
        <div class="col-lg-12 col-12 mb-4">
          <div class="nav-align-top mb-4">
            <div class="tab-content">
              <div class="tab-pane fade show active " id="step1" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <General></General>
                  </div>
                </div>
              </div>
  
             
              <div class="tab-pane fade" id="step2" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <!-- <div class="rounded-lg mt-3">
                      <p class="max-w-2xl mb-1 text-center font-semibold text-gray-900" >
                        <div class="d-flex p-3 flex-wrap gap-2 align-items-center justify-content-between border-bottom">
                                <div>
                                    <h6 class="fw-semibold mb-0">Suivi projet</h6>
                                </div>
                                <div class="d-flex gap-2 w-50">
                                  <div class="input-group">
                                    <input type="text" class="form-control bg-light border-0" placeholder="Search Files" aria-describedby="button-addon2">
                                    <button class="btn btn-light" type="button" id="button-addon2"><i class="ri-search-line text-muted"></i></button>
                                </div>
                                   
                                    <button class=" w-50 btn btn-sm btn-primary d-flex align-items-center justify-content-center btn-wave waves-light"
                                        data-bs-toggle="modal" data-bs-target="#add_suivi">
                                        <i class="ri-add-circle-line align-middle me-1"></i>Ajouter un suivi
                                    </button>

                                </div>
                            </div>
                      </p>
                      <div class="-my-2 sm:-mx-6 lg:-mx-8">
                        <div
                          class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                        >
                          <div
                            class="overflow-hidden border-b border-gray-200 rounded-lg"
                          >
                          <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          N
        </th>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          Date
        </th>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          Niveau
        </th>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          Décaissement
        </th>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          Avancement physique
        </th>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          Contrainte
        </th>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          suivi bailleur
        </th>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          Statut
        </th>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          Observation
        </th>
        <th
          scope="col"
          class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
        >
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(day, index) in workDays"
        :key="day.id"
        :class="{'bg-gray-200': index % 2 === 1, 'bg-white': index % 2 === 0, 'border-t border-gray-300': true}"
      >
        <td class="px-1 py-1 text-sm font-normal text-center  whitespace-nowrap">
          {{ day.id }}
        </td>
        <td class="px-2 py-3 text-sm font-normal text-center  whitespace-nowrap" style="color:red;">
          {{ day.date }}
        </td>
        <td class="px-2 py-3 text-sm font-normal text-center  whitespace-nowrap">
          {{ day.niveau }}
        </td>
        <td class="px-2 py-3 text-sm font-normal text-center  whitespace-nowrap">
          {{ day.decaissement }}
        </td>
        <td class="px-2 py-3 text-sm font-normal text-center  whitespace-nowrap">
          {{ day.decaissement_phy }}
        </td>
        <td class="px-2 py-3 text-sm font-normal text-center  whitespace-nowrap">
          <button class="btn btn-sm btn-primary d-flex align-items-center justify-content-center btn-wave waves-light"
                data-bs-toggle="modal" data-bs-target="#add_contrainte">
                <i class="ri-add-circle-line align-middle me-1"></i>contrainte
            </button>
        </td>
        <td class="px-2 py-3 text-sm font-normal text-center  whitespace-nowrap">
          <button class="btn btn-sm btn-primary d-flex align-items-center justify-content-center btn-wave waves-light"
                data-bs-toggle="modal" data-bs-target="#add_bailleur">
                <i class="ri-add-circle-line align-middle me-1"></i>bailleur
            </button>
        </td>
        <td class="px-2 py-3 text-sm font-normal text-center  whitespace-nowrap">
          {{ day.statut }}
        </td>
        <td class="px-2 py-3 text-sm font-normal text-center  whitespace-nowrap">
          {{ day.observation }}
        </td>
        <td class="px-2 py-3 text-sm font-normal text-center  whitespace-nowrap">
          <div class="d-flex gap-2">
                                  
           
            
          
            
        </div>
        <div class="hstack gap-2 fs-15">
          <a href="javascript:void(0);" class="btn btn-icon btn-sm btn-info-transparent rounded-pill"><i class="ri-edit-line"></i></a>
          <a href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger-transparent rounded-pill"><i class="ri-delete-bin-line"></i></a>
          
      </div>
      </td>
      </tr>
    </tbody>
  </table>
                          </div>
                        </div>
                      </div>
                    </div> -->

                    <div  id="tasks-container">
                      <div class="d-flex p-3 flex-wrap gap-2 align-items-center justify-content-between border-bottom">
                                <div>
                                    <h6 class="fw-semibold mb-0">Suivi projet</h6>
                                </div>
                                <div class="d-flex gap-2 w-50">
                                  <div class="input-group">
                                    <input type="text" class="form-control bg-light border-0" placeholder="Search Files" aria-describedby="button-addon2">
                                    <button class="btn btn-light" type="button" id="button-addon2"><i class="ri-search-line text-muted"></i></button>
                                </div>
                                   
                                    <button class=" w-50 btn btn-sm btn-primary d-flex align-items-center justify-content-center btn-wave waves-light"
                                        data-bs-toggle="modal" data-bs-target="#add_suivi">
                                        <i class="ri-add-circle-line align-middle me-1"></i>Ajouter un suivi
                                    </button>

                                </div>
                            </div>
            <div class="row task-card">
                <div class="row">
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12">
                        <div class="card custom-card task-pending-card border border-dark ">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                             
                                <p class="fw-semibold mb-3 d-flex align-items-center fs-16">
                                  <span class="avatar me-2 avatar-rounded border border-gray-800">
                                <img src="@/assets/img/logo_mobile.png" alt="img">
                                </span>
                                  Suivi du <b class="fs-16  ml-2" style="color:red;"> 13,Nov 2022 </b> </p>
                                <p class="mb-2 fw-semibold">Temps ecoulé : <span class="fs-14 mb-1 text-muted fw-semibold">(1 mois et 7 jours)</span></p>
                                <p class="mb-2 fw-semibold">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >70%</span></p>
                                <p class="mb-0 fw-semibold">Statut du Projet  :<span class="fs-14 mb-1 text-muted fw-semibold">Bon</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list ">
                                    <!-- <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button> -->
                                    <router-link to="/bssp/suivi-projet" 
                                              class="btn btn-sm btn-icon btn-success btn-wave">
                                              <i class="ri-eye-line"></i>
                                            </router-link>
                                    <button class="btn btn-sm btn-icon btn-wave btn-primary-light"><i class="ri-edit-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-danger-light me-0"><i class="ri-delete-bin-line"></i></button>
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
                                
                              <p class="fw-semibold mb-3 d-flex align-items-center fs-16">
                                  <span class="avatar me-2 avatar-rounded border border-gray-800">
                                <img src="@/assets/img/logo_mobile.png" alt="img">
                                </span>
                                  Suivi du <b class="fs-16  ml-2" style="color:red;"> 13,Nov 2022 </b> </p>
                                <p class="mb-2 fw-semibold">Temps ecoulé : <span class="fs-14 mb-1 text-muted fw-semibold">(1 mois et 7 jours)</span></p>
                                <p class="mb-2 fw-semibold">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >70%</span></p>
                                <p class="mb-0 fw-semibold">Statut du Projet  :<span class="fs-14 mb-1 text-muted fw-semibold">Bon</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list ">
                                    <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-primary-light"><i class="ri-edit-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-danger-light me-0"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                    <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12 ">
                        <div class="card custom-card task-pending-card border border-dark">
                    <div class="card-body">
                        <div class="d-flex justify-content-between flex-wrap flex-column ">
                            <div>
                               
                              <p class="fw-semibold mb-3 d-flex align-items-center fs-16">
                                  <span class="avatar me-2 avatar-rounded border border-gray-800">
                                <img src="@/assets/img/logo_mobile.png" alt="img">
                                </span>
                                  Suivi du <b class="fs-16  ml-2" style="color:red;"> 13,Nov 2022 </b> </p>
                                <p class="mb-2 fw-semibold">Temps ecoulé : <span class="fs-14 mb-1 text-muted fw-semibold">(1 mois et 7 jours)</span></p>
                                <p class="mb-2 fw-semibold">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >70%</span></p>
                                <p class="mb-0 fw-semibold">Statut du Projet  :<span class="fs-14 mb-1 text-muted fw-semibold">Bon</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list ">
                                    <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-primary-light"><i class="ri-edit-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-danger-light me-0"><i class="ri-delete-bin-line"></i></button>
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
                               
                              <p class="fw-semibold mb-3 d-flex align-items-center fs-16">
                                  <span class="avatar me-2 avatar-rounded border border-gray-800">
                                <img src="@/assets/img/logo_mobile.png" alt="img">
                                </span>
                                  Suivi du <b class="fs-16  ml-2" style="color:red;"> 13,Nov 2022 </b> </p>
                                <p class="mb-2 fw-semibold">Temps ecoulé : <span class="fs-14 mb-1 text-muted fw-semibold">(1 mois et 7 jours)</span></p>
                                <p class="mb-2 fw-semibold">Niveau Execution Global : <span class="fs-14 mb-1 text-muted fw-semibold" >70%</span></p>
                                <p class="mb-0 fw-semibold">Statut du Projet  :<span class="fs-14 mb-1 text-muted fw-semibold">Bon</span></p>
                                
                            </div>
                            <hr>
                            <div>
                                <div class="btn-list ">
                                    <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-primary-light"><i class="ri-edit-line"></i></button>
                                    <button class="btn btn-sm btn-icon btn-wave btn-danger-light me-0"><i class="ri-delete-bin-line"></i></button>
                                </div>
                                
                            </div>
                        </div> 
                    </div>
                </div>
                    </div>
                </div>
                
                
            </div>

            
        </div>     
                  </div>
                </div>
              </div>
  
              <div class="tab-pane fade" id="step3" role="tabpanel">
                <div class="row ttb ">
                  <div class=" col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <div class="rounded-lg mt-3">
                      <div class="card custom-card">
                            <div class="card-header justify-content-between">
                                <div class="card-title">
                                    Liste indicateurs
                                </div>
                                <div class="d-flex">
                                    <div class="me-3">
                                        <input class="form-control form-control-sm" type="text" placeholder="Search Here" aria-label=".form-control-sm example">
                                    </div>
                                    <button type="button" class="btn btn-primary btn-sm mb-2" style="float: right;"  data-bs-toggle="modal" data-bs-target="#add_indicateur"><i class="ri-add-line me-1 align-middle fs-14 fw-semibold d-inline-block"></i>Indicateur</button>
                                   
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table text-nowrap table-hover border table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="row" class="ps-4">N</th>
                                                <th scope="col">Intitulé</th>
                                                <th scope="col">cible fin projet</th>
                                                <th scope="col">suivi indicateur</th>
                                                <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th scope="row" class="ps-4">1</th>
                                                <td>
                                                    Indicateur 1
                                                </td>
                                                <td>Manufacture</td>
                                                <td>
                                                    <button class="btn btn-sm btn-primary d-flex align-items-center justify-content-center btn-wave waves-light"
                                                            data-bs-toggle="modal" data-bs-target="#add_indicateur_suivi">
                                                            <i class="ri-add-circle-line align-middle me-1"></i>indicateur
                                                        </button>
                                                </td>
                                                
                                             
                                                <td>
                                                    <div class="hstack gap-2 fs-15">
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-success-light"><i class="ri-download-2-line"></i></a>
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-wave waves-effect waves-light btn-sm btn-primary-light"><i class="ri-edit-line"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div class="card-footer">
                                <div class="d-flex align-items-center">
                                   
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
                </div>
              </div>
             
            </div>
          </div>
        </div>

               
        <div
      class="modal fade effect-rotate-bottom"
      id="add_suivi"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_suivi"
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
              <b class="text-center">Ajouter un suivi</b>
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
                        >Date <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.client_name"
                        color="info"
                        name="client_name"
                        size="sm"
                        rounded-size="sm"
                        type="date"
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
                        >Niveau d'execution global<span class="text-danger">*</span></label
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
                        >Statut du projet <span class="text-danger">*</span></label
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
                

                </div>

                <div class="row mt-3 content-group">
                 
                <div class="col">
                    <div class="mb-3 position-relative">
                        <label for="password">Taux avancement physique </label>
                        <MazInput v-model="step1.password"  type="text" name="password" color="info" placeholder="Abc123@!"  size="sm" rounded-size="sm" />
                        <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small>
                        <small v-if="resultError['password']">{{resultError['password']}}</small>
                    </div>
                </div>
                                                
                                             
                <div class="col">
                    <div class="mb-3 position-relative">
                        <label for="password_confirmation">Taux de decaissement</label>
                        <MazInput v-model="step1.password_confirmation"  type="text" name="password_confirmation" color="info" placeholder="Abc123@!"   size="sm" rounded-size="sm"/>
                        <small v-if="v$.step1.password_confirmation.$error">{{v$.step1.password_confirmation.$errors[0].$message}}</small>
                        <small v-if="resultError['password_confirmation']">{{resultError['password_confirmation']}}</small>
                      
                    </div>
                </div>
                                                
                         
                </div>

              

                 <div class="row mt-3 content-group">
                 
                 <div class="col">
           <div class="input-groupe">
             <label for="employment_date_begin">Observation <span class="text-danger">*</span></label>
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

      <div
      class="modal fade effect-rotate-bottom "
      id="add_contrainte"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_contrainte"
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
              <b class="text-center">Ajouter une contrainte </b>
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
                        >code <span class="text-danger">*</span></label
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
 
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Intitulé <span class="text-danger">*</span></label
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
                

                </div>

                <div class="row mt-3 content-group">                            
                <div class="col">
                    <div class="mb-3 position-relative">
                        <label for="password_confirmation">Type</label>
                        <MazInput v-model="step1.password_confirmation"  type="text" name="password_confirmation" color="info" placeholder="Abc123@!"   size="sm" rounded-size="sm"/>
                        <small v-if="v$.step1.password_confirmation.$error">{{v$.step1.password_confirmation.$errors[0].$message}}</small>
                        <small v-if="resultError['password_confirmation']">{{resultError['password_confirmation']}}</small>
                      
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

      <div
      class="modal fade effect-rotate-bottom "
      id="add_bailleur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_bailleur"
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
              <b class="text-center">Ajouter un suivi bailleur </b>
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
                        >Nom bailleur <span class="text-danger">*</span></label
                      >
                      <MazSelect
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
 
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Montant decaissé <span class="text-danger">*</span></label
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

      <!-- contrainte -->

      <div
      class="modal fade effect-rotate-bottom "
      id="add_indicateur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_indicateur"
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
              <b class="text-center">Ajouter un indicateur </b>
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
                        >Intitulé <span class="text-danger">*</span></label
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
 
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Cible fin projet <span class="text-danger">*</span></label
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

      <div
      class="modal fade effect-rotate-bottom "
      id="add_indicateur_suivi"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_indicateur_suivi"
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
              <b class="text-center">Ajouter un suivi indicateur </b>
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
                        >Date <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.client_name"
                        color="info"
                        name="client_name"
                        size="sm"
                        rounded-size="sm"
                        type="date"
                      />
                      <small v-if="v$.step1.client_name.$error">{{
                        v$.step1.client_name.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['client_name']">
                        {{ resultError["client_name"] }}
                      </small>
                    </div>
                  </div>
 
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Realisation <span class="text-danger">*</span></label
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



    </div>
  </template>
  <script>
  import axios from "@/lib/axiosConfig";
  import Loading from "@/components/others/loading.vue";
  import General from "@/components/projets/general.vue"
  import useVuelidate from "@vuelidate/core";
  import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
  import { successmsg } from "@/lib/modal.js";
  import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
  import Swal from "sweetalert2";

  export default {
   
    components: {
      Loading,
      General
      
    },
    computed: {
      loggedInUser() {
        return this.$store.getters["auth/myAuthenticatedUser"];
      },
    },
  
    data() {
      return {
        loading: false,
        data: "",
        workDays: [
        { id: 1, date: '2023-06-01', niveau: 'Niveau 1', decaissement: 100, decaissement_phy: 100, statut: 'Validé', observation: 'RAS' },
        { id: 2, date: '2023-06-02', niveau: 'Niveau 2', decaissement: 200, decaissement_phy: 100, statut: 'En attente', observation: 'Vérifier' },
        { id: 3, date: '2023-06-03', niveau: 'Niveau 3', decaissement: 300, decaissement_phy: 100, statut: 'Rejeté', observation: 'Erreur' },
        { id: 3, date: '2023-06-03', niveau: 'Niveau 3', decaissement: 300, decaissement_phy: 100, statut: 'Rejeté', observation: 'Erreur' },
        // Ajoutez d'autres données fictives si nécessaire
      ],
      step1: {
          client_name: "",
          address: "",
          state: "",
          phone: "",
          password:'',
          password_confirmation:'',
        },
        resultError: {},
  
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
     
    
    },
  };
  </script>
  <style lang="css" scoped>
  .titres{

width: 22%;
display: flex;
justify-content: space-evenly;
align-items: flex-start;
}

.titres .nombre{

color:#fff;
background-color:var(--primary-color);
border-radius:50%;
padding: 1px 7px;
font-size: 13px;
z-index: 10; 
}
  </style>
  