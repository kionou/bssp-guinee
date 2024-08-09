<template >
    <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>

        <!-- Start::app-content -->
    
        <div class="container-fluid">
    
            <!-- Page Header -->
            <div class="d-md-flex d-block pt-12  align-items-center justify-content-between my-4 page-header-breadcrumb">
                <h1 class="page-title fw-semibold fs-18 mb-0"> Details</h1>
                <div class="ms-md-1 ms-0">
                    <nav>
                        <ol class="breadcrumb mb-0">
                            <li class="breadcrumb-item"><a href="javascript:void(0);">BSPP</a></li>
                            <li class="breadcrumb-item active" aria-current="page"> Details</li>
                        </ol>
                    </nav>
                </div>
            </div>
            <!-- Page Header Close -->
    
    
            <!-- Start::row-1 -->
            <div class="card">
                <div class="card-body">
                    <div class="card m-0">
                        <div class="card-header">
                            <h4 class="fw-semibold fs-20 mb-0 d-flex align-items-center "> {{data.NomInfrastructure}} <span
                                    style="color:red"> ({{data.CodeInfrastructure}})</span> </h4>
    
                        </div>
                        <div class="card-body">
                            <div class="row">
                                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div class="mt-1"><i class="bi bi-person me-2 fs-14"></i>Maître d'ouvrage : <span
                                            class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                            title="Current Salary">{{data.MaitreOuvrage}}</span> </div>
                                </div>
                                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div class="mt-1"><i class="bi bi-geo-alt me-2 fs-14"></i>Localité : <span
                                            class="fw-semibold  fs-16" data-bs-toggle="tooltip"
                                            title="Current Salary">{{data.LocalitesConcernees}}</span> </div>
                                </div>
                                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div class="mt-1"><i class="bi bi-bricks me-2 fs-14"></i>Entreprise responsable: <span
                                            class="fw-semibold fs-16" data-bs-toggle="tooltip" title="Current Salary">
                                            {{data.EntrepriseResponsable}}</span> </div>
    
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-xxl-8 col-xl-8 col-lg-6 col-md-6 col-sm-6">
                                    <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Date début : <span
                                            class="fw-semibold text-warning fs-16" data-bs-toggle="tooltip"
                                            title="Current Salary">{{formatDate(data.DateDebut) }}</span> </div>
    
                                </div>
                                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Date fin : <span
                                            class="fw-semibold fs-16" data-bs-toggle="tooltip" title="Current Salary"
                                            style="color:red">{{formatDate(data.DateFin) }}</span> </div>
                                </div>
    
                            </div>
                            <div class="row">
                                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div class="mt-1 fs-17"><i class="bi bi-x-diamond me-2 fs-16"></i>Type d'infrastructure
                                        : <span class="fw-semibold" data-bs-toggle="tooltip"
                                            title="Current Salary">{{data.TypeInfrastructure}}</span> </div>
    
                                </div>
                                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div class="mt-1 fs-16"><i class="bi bi-eye me-2 fs-16"></i>Visibilité :
                                        <span v-if="data.Visible ==='1'" class="fw-semibold badge rounded-pill bg-success"
                                            data-bs-toggle="tooltip" title="Current Salary">Actif</span>
                                        <span v-else class="fw-semibold badge rounded-pill bg-danger"
                                            data-bs-toggle="tooltip" title="Current Salary">Inactif</span>
                                    </div>
                                </div>
                                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                                    <div class="mt-1 fs-17"><i class="bi bi-calendar3 me-2 fs-16"></i>Trimestre : <span
                                            class="fw-semibold" data-bs-toggle="tooltip"
                                            title="Current Salary">
                                            {{
                                              data.Trimestre === 'T1' ? 'Trimestre 1' :
                                              data.Trimestre === 'T2' ? 'Trimestre 2' :
                                              data.Trimestre === 'T3' ? 'Trimestre 3' :
                                              data.Trimestre === 'T4' ? 'Trimestre 4' :
                                              'Trimestre Inconnu'
                                            }}
                                          </span> </div>
    
                                </div>
                            </div>
                            <div class="card-titre mt-3 fw-semibold">
                                Information sur le projet :
    
                            </div>
                            <hr class="m-0">
                            <div class="row">
                                <div class="col-12">
                                    <p><span class=" fs-20">Nom projet : </span><span class="  fs-15 fw-bolder"> {{
                                            data.projet?.NomProjet }}</span> </p>
    
                                </div>
                                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                    <p><span class=" fs-20">Date debut : </span> <span
                                                    class="fs-15 fw-semibold text-warning">{{
                                                    formatDate(data.projet?.DateDebut)}}</span> </p>
    
                                </div>
                                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                    <p><span class=" fs-20">Date fin : </span><span
                                            class="fs-15 fw-semibold text-warning">{{ formatDate(data.projet?.DateFin)
                                            }}</span></p>
    
                                </div>
                                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                    <p><span class=" fs-20">Durée : </span><span
                                            class="fs-15 fw-semibold" style="color:red">{{ tempsEcoule }}</span></p>
    
                                </div>
                            </div>
                        </div>
                        <div class="card-body">
                            <!-- <div class="d-flex align-items-center w-100">
                                                    <span class="avatar avatar-xl avatar-rounded">
                                                        <img src="@/assets/img/logo_mobile.png" class="rounded-circle img-fluid" alt="">
                                                    </span>
                                                    <h4 class="fw-semibold fs-20 mb-0 d-flex align-items-center "> {{data.NomInfrastructure}}  <span style="color:red"> ({{data.CodeInfrastructure}})</span> </h4>
                                                </div>    -->
                        </div>
                    </div>
                    <!-- <div class="row">
                        <div class="col-xl-6 col-sm-12">
                            <div class="card ">
                                <div class="card-header">
                                    Autre information :
                                </div>
                                <div class="card-body">
    
                                    <div class="ms-3">
    
    
                                        <div class="mt-1"><i class="bi bi-person me-2 fs-16"></i>Maitre d'ouvrage : <span
                                                class="fw-semibold fs-18" data-bs-toggle="tooltip"
                                                title="Current Salary">{{data.MaitreOuvrage}}</span> </div>
                                        <div class="mt-1"><i class="bi bi-geo-alt me-2 fs-16"></i>Localité : <span
                                                class="fw-semibold  fs-18" data-bs-toggle="tooltip"
                                                title="Current Salary">{{data.LocalitesConcernees}}</span> </div>
                                        <div class="mt-1"><i class="bi bi-bricks me-2 fs-16"></i>Entreprise responsable:
                                            <span class="fw-semibold fs-18" data-bs-toggle="tooltip" title="Current Salary">
                                                {{data.EntrepriseResponsable}}</span> </div>
    
                                        <div class="d-flex fs-14 mt-1">
                                            <div>
                                                <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Date début
                                                    : <span class="fw-semibold text-warning fs-16" data-bs-toggle="tooltip"
                                                        title="Current Salary">{{formatDate(data.DateDebut) }}</span> </div>
                                                <div class="mt-1 fs-16"><i class="bi bi-eye me-2 fs-16"></i>Visibilité :
                                                    <span v-if="data.Visible ==='1'"
                                                        class="fw-semibold badge rounded-pill bg-success"
                                                        data-bs-toggle="tooltip" title="Current Salary">Actif</span>
                                                    <span v-else class="fw-semibold badge rounded-pill bg-danger"
                                                        data-bs-toggle="tooltip" title="Current Salary">Inactif</span>
                                                </div>
                                            </div>
                                            <div class="ms-4">
                                                <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Date fin :
                                                    <span class="fw-semibold fs-16" data-bs-toggle="tooltip"
                                                        title="Current Salary" style="color:red">{{formatDate(data.DateFin)
                                                        }}</span> </div>
                                            </div>
                                        </div>
                                        <div class="">
                                            <div class="mt-1 fs-17"><i class="bi bi-x-diamond me-2 fs-16"></i>Type
                                                d'infrastructure : <span class="fw-semibold" data-bs-toggle="tooltip"
                                                    title="Current Salary">{{data.TypeInfrastructure}}</span> </div>
                                        </div>
                                        <div class="">
                                            <div class="mt-1 fs-17"><i class="bi bi-calendar3 me-2 fs-16"></i>Trimestre :
                                                <span class="fw-semibold" data-bs-toggle="tooltip"
                                                    title="Current Salary">{{data.TypeInfrastructure}}</span> </div>
                                        </div>
                                    </div>
    
    
    
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12">
    
                            <div class="card m-0">
                                <div class="card-header">
                                    Information sur le projet
    
                                </div>
                                <div class="card-body p-0 candidate-edu-timeline">
                                    <div class="p-2 ">
                                        <div class="ms-4 ps-0">
    
                                            <p><span class=" fs-20">Nom projet : </span><span class="  fs-15 fw-bolder"> {{
                                                    data.projet?.NomProjet }}</span> </p>
                                            <p><span class="fw-semibold fs-14">Date debut : </span> <span
                                                    class="fs-14 fw-semibold text-warning">{{
                                                    formatDate(data.projet?.DateDebut)}}</span> </p>
                                            <p><span class="fw-semibold fs-14">Date fin : </span><span
                                                    class="fs-14 fw-semibold text-warning">{{
                                                    formatDate(data.projet?.DateFin) }}</span></p>
    
                                        </div>
                                    </div>
                                </div>
                            </div>
    
                        </div>
    
                    </div> -->
                </div>
            </div>
    
            <!--End::row-1 -->
    
    
    
    
    
            <div class="row">
                <div class="col-xl-12">
                    <div class="card custom-card overflow-hidden">
                       
                        <div class="contact-header py-2 px-1">
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
  
          <button class="btn  btn-primary ms-2" data-bs-placement="top" data-bs-title="Add Contact"
            data-bs-toggle="modal" data-bs-target="#create-suivi">
            <i class="ri-add-line"> suivi </i>
          </button>
        </div>
      </div>
    </div>
                        <div class="card-body">
                            <div v-if="paginatedItems.length === 0" class="noresul">
                            <span> Vous n'avez pas encore de suivi, vous pouvez également en ajouter un !! </span>
                          </div>
  
                              <div class="table-responsive" v-else>
                                  <table class="table  table-bordered table-striped">
                                      <thead>
                                          <tr>
                                              <th class="text-center" scope="col">N°</th>
                                              <th scope="col">Date suivi</th>
                                              <th scope="col" class="text-center">Niveau d'avancement</th>
                                              <th scope="col">Montant decaissé</th>
                                              <th scope="col" class="text-center">Taux d'avancement technique</th>
                                              <th scope="col">Difficultes</th>
                                              <th scope="col">Images</th>
                                              <th scope="col">Videos</th>
                                              <th scope="col">Actions</th>
                                          </tr>
                                      </thead>
                                      <tbody>
                                          <tr v-for="(user , index) in paginatedItems" :key="user.id">                              
                                              <th scope="row" class="ps-4" style="width: 60px;">  {{index + 1}}</th>
                                              <td>
                                                  <div class="d-flex align-items-center lh-1">
                                                      
                                                      <div style="color:red">{{ formatDate(user.DateSuivi)  }}</div>
                                                  </div>
                                              </td>
                                              <td style="width: 100px;" class="text-center">{{user.NiveauAvancement}}</td>
                                              <td class="text-center">{{ formatBudget(user.MontantDecaisser) }}</td>
                                              <td style="width: 160px;" class="text-center">{{user.TauxAvancementTechnique}}</td>
                                              <td>{{user.Difficultes}}</td>
                                              <td class="text-center">
                                                <button 
                                                v-if="user.Photos" 
                                                @click="openGallery(user.Photos)" 
                                                class="btn btn-primary btn-sm"
                                                >
                                                <i class="bi bi-card-image"></i>
                                                </button>
                                                <span v-else>Aucune image</span>
                                              </td>
                                              <td>
                                                <button 
                                                v-if="user.videos" 
                                                @click="openVideo(user.videos)" 
                                                class="btn btn-primary btn-sm text-center"
                                            >
                                            <i class="bi bi-play-btn"></i>
                                            </button>
                                            <span v-else>Aucune vidéo</span>
                                              </td>

                                              <td style="width: 80px;">
                                                  <div class="hstack gap-2 fs-1">
                                                    
                                                      <div class="btn btn-icon btn-sm btn-info btn-wave waves-effect " data-bs-toggle="modal" data-bs-target="#update-suivis"   ><i class="ri-edit-line"></i></div>
                                                      <!-- @click="HandleIdUpdate(user.id)" <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger btn-wave waves-effect waves-light"><i class="ri-delete-bin-line" @click="HandleIdDelete(user.id)"></i></a> -->
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
                        <!-- <div class="card-body px-2">
                            <div class="row">
    
                                <div class="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="card custom-card border border-warning">
                                        <div class="card-body p-3">
                                            <div id="carouselExampleIndicators" class="carousel slide"
                                                data-bs-ride="carousel">
                                                <div class="carousel-indicators">
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="0" class="active" aria-current="true"
                                                        aria-label="Slide 1"></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                </div>
                                                <div class="carousel-inner">
                                                    <div class="carousel-item active">
                                                        <a href="https://report.cosit.tech/kobo/public/INFRASTRUCTURE/attachment1719925376.jpg"
                                                            class="glightbox card" data-gallery="gallery1">
                                                            <img src="@/assets/images/media/media-40.jpg" alt="image">
                                                        </a>
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img src="@/assets/img/logo_mobile.png" class="d-block w-100"
                                                            alt="...">
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img src="@/assets/img/client.png" class="d-block w-100" alt="...">
                                                    </div>
                                                </div>
                                                <button class="carousel-control-prev" type="button"
                                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Previous</span>
                                                </button>
                                                <button class="carousel-control-next" type="button"
                                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-start  flex-wrap">
                                                <div class="d-inline-flex align-items-start position-relative">
    
                                                    <div class="flex-grow-1">
                                                        <span class="mb-0 d-block fs-16 fw-semibold">Suivi du <span
                                                                class="fw-semibold text-success">12/34/3453</span> </span>
    
                                                    </div>
                                                </div>
    
                                            </div>
                                            <div class="fs-13 fw-semibold ">Niveau Avancement : <span
                                                    class="fw-semibold text-gray">70% </span></div>
                                            <div class="fs-13 fw-semibold ">Decaissement : <span
                                                    class="fw-semibold text-gray">123 </span></div>
                                            <div class="d-flex align-items-end flex-wrap gap-2">
                  
                                                <a href="javascript:void(0);" class="btn btn-primary-light btn-wave"><i
                                                        class="bi bi-play-circle"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="card custom-card border border-warning">
                                        <div class="card-body p-3">
                                            <div id="carouselExampleIndicators" class="carousel slide"
                                                data-bs-ride="carousel">
                                                <div class="carousel-indicators">
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="0" class="active" aria-current="true"
                                                        aria-label="Slide 1"></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                </div>
                                                <div class="carousel-inner">
                                                    <div class="carousel-item active">
                                                        <a href="https://report.cosit.tech/kobo/public/INFRASTRUCTURE/attachment1719925376.jpg"
                                                            class="glightbox card" data-gallery="gallery1">
                                                            <img src="@/assets/images/media/media-40.jpg" alt="image">
                                                        </a>
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img src="@/assets/img/logo_mobile.png" class="d-block w-100"
                                                            alt="...">
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img src="@/assets/img/client.png" class="d-block w-100" alt="...">
                                                    </div>
                                                </div>
                                                <button class="carousel-control-prev" type="button"
                                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Previous</span>
                                                </button>
                                                <button class="carousel-control-next" type="button"
                                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-start  flex-wrap">
                                                <div class="d-inline-flex align-items-start position-relative">
    
                                                    <div class="flex-grow-1">
                                                        <span class="mb-0 d-block fs-16 fw-semibold">Suivi du <span
                                                                class="fw-semibold text-success">12/34/3453</span> </span>
    
                                                    </div>
                                                </div>
    
                                            </div>
                                            <div class="fs-13 fw-semibold ">Niveau Avancement : <span
                                                    class="fw-semibold text-gray">70% </span></div>
                                            <div class="fs-13 fw-semibold ">Decaissement : <span
                                                    class="fw-semibold text-gray">123 </span></div>
                                            <div class="d-flex align-items-end flex-wrap gap-2">
                       
                                                <a href="javascript:void(0);" class="btn btn-primary-light btn-wave"><i
                                                        class="bi bi-play-circle"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                                    <div class="card custom-card border border-warning">
                                        <div class="card-body p-3">
                                            <div id="carouselExampleIndicators" class="carousel slide"
                                                data-bs-ride="carousel">
                                                <div class="carousel-indicators">
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="0" class="active" aria-current="true"
                                                        aria-label="Slide 1"></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="1" aria-label="Slide 2"></button>
                                                    <button type="button" data-bs-target="#carouselExampleIndicators"
                                                        data-bs-slide-to="2" aria-label="Slide 3"></button>
                                                </div>
                                                <div class="carousel-inner">
                                                    <div class="carousel-item active">
                                                        <a href="https://report.cosit.tech/kobo/public/INFRASTRUCTURE/attachment1719925376.jpg"
                                                            class="glightbox card" data-gallery="gallery1">
                                                            <img src="@/assets/images/media/media-40.jpg" alt="image">
                                                        </a>
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img src="@/assets/img/logo_mobile.png" class="d-block w-100"
                                                            alt="...">
                                                    </div>
                                                    <div class="carousel-item">
                                                        <img src="@/assets/img/client.png" class="d-block w-100" alt="...">
                                                    </div>
                                                </div>
                                                <button class="carousel-control-prev" type="button"
                                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Previous</span>
                                                </button>
                                                <button class="carousel-control-next" type="button"
                                                    data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                                    <span class="visually-hidden">Next</span>
                                                </button>
                                            </div>
                                            <div class="d-flex justify-content-between align-items-start  flex-wrap">
                                                <div class="d-inline-flex align-items-start position-relative">
    
                                                    <div class="flex-grow-1">
                                                        <span class="mb-0 d-block fs-16 fw-semibold">Suivi du <span
                                                                class="fw-semibold text-success">12/34/3453</span> </span>
    
                                                    </div>
                                                </div>
    
                                            </div>
                                            <div class="fs-13 fw-semibold ">Niveau Avancement : <span
                                                    class="fw-semibold text-gray">70% </span></div>
                                            <div class="fs-13 fw-semibold ">Decaissement : <span
                                                    class="fw-semibold text-gray">123 </span></div>
                                            <div class="d-flex align-items-end flex-wrap gap-2">
                   
                                                <a href="javascript:void(0);" class="btn btn-primary-light btn-wave"><i
                                                        class="bi bi-play-circle"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <nav aria-label="Page navigation">
                                    <ul class="pagination justify-content-end mb-4">
                                        <li class="page-item disabled">
                                            <a class="page-link">Previous</a>
                                        </li>
                                        <li class="page-item"><a class="page-link" href="javascript:void(0);">1</a></li>
                                        <li class="page-item"><a class="page-link" href="javascript:void(0);">2</a></li>
                                        <li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
                                        <li class="page-item">
                                            <a class="page-link" href="javascript:void(0);">Next</a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div> -->
    
                    </div>
                </div>
            </div>
            <!--End::row-1 -->
    
        </div>
        <!-- Start:: Create suivi -->
        <div
      class="modal fade effect-rotate-bottom"
      id="create-suivi"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="create-suivi"
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
              <b class="text-center">Créer un suivi</b>
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
                <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="Code">Date suivi<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.DateSuivi" color="info" name="DateSuivi" size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step1.DateSuivi.$error">{{ v$.step1.DateSuivi.$errors[0].$message}}</small>
                                        <small v-if="resultError['DateSuivi']"> {{ resultError["DateSuivi"] }} </small>
                                    </div>
                                                               
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="Nom">Niveau d'avancement<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.NiveauAvancement" color="info" name="NiveauAvancement" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.NiveauAvancement.$error">{{ v$.step1.NiveauAvancement.$errors[0].$message}}</small>
                                        <small v-if="resultError['NiveauAvancement']"> {{ resultError["NiveauAvancement"] }} </small>

                                    </div>
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="Sigle">Montant décaissé<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.MontantDecaisser" color="info" name="MontantDecaisser" size="sm" rounded-size="sm"  />
                                        <small v-if="v$.step1.MontantDecaisser.$error">{{ v$.step1.MontantDecaisser.$errors[0].$message}}</small>
                                        <small v-if="resultError['MontantDecaisser']"> {{ resultError["MontantDecaisser"] }} </small>
                                    </div>
         
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                    <label for="date_start">Taux d'avancement technique<span class="text-danger">*</span></label>
                                        <MazInput v-model="step1.TauxAvancementTechnique"   color="info" name="TauxAvancementTechnique" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step1.TauxAvancementTechnique.$error">{{ v$.step1.TauxAvancementTechnique.$errors[0].$message}}</small>
                                        <small v-if="resultError['TauxAvancementTechnique']"> {{ resultError["TauxAvancementTechnique"] }} </small>
                                    </div>
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="date_end">Images<span class="text-danger">*</span></label>
                                        <input class="form-control" type="file" id="input-file" accept="image/*" multiple
                                         @change="handleFileUploadImages">
                                        <small v-if="v$.step1.images.$error">{{ v$.step1.images.$errors[0].$message}}</small>
                                        <small v-if="resultError['images[]']"> {{ resultError["images[]"] }} </small>
                                    </div>
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="date_end">Videos<span class="text-danger">*</span></label>
                                        <input class="form-control" type="file" id="input-file" accept="video/*"
                                    @change="handleFileUploadVideo">
                                <small v-if="v$.step1.videoss.$error">{{ v$.step1.videoss.$errors[0].$message}}</small>
                                <small v-if="resultError['videoss[]']"> {{ resultError["videoss[]"] }} </small>
                                    </div>
                                   
                                    <div class="col-12">
                                        <label for="infrastructure_id">Difficultes<span class="text-danger">*</span></label>
                                        <MazTextarea v-model="step1.Difficultes" color="info" name="Difficultes" size="sm" rounded-size="sm"  />
                                        <small v-if="v$.step1.Difficultes.$error">{{ v$.step1.Difficultes.$errors[0].$message}}</small>
                                        <small v-if="resultError['Difficultes']"> {{ resultError["Difficultes"] }} </small>
                                    </div>
                                  
                                    
                                   
                                   
  

         </div>
         
         <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitSuivi('create-suivi')">
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
        <!-- End:: Create suivi -->

         <!-- Start:: update suivi -->
         <div
      class="modal fade effect-rotate-bottom"
      id="update-suivi"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update-suivi"
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
              <b class="text-center">Modifier un suivi</b>
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
                <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="Code">Date suivi<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.DateSuivi" color="info" name="DateSuivi" size="sm" rounded-size="sm" type="date" />
                                        <small v-if="v$.step2.DateSuivi.$error">{{ v$.step2.DateSuivi.$errors[0].$message}}</small>
                                        <small v-if="resultError['DateSuivi']"> {{ resultError["DateSuivi"] }} </small>
                                    </div>
                                                               
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="Nom">Niveau d'avancement<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.NiveauAvancement" color="info" name="NiveauAvancement" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step2.NiveauAvancement.$error">{{ v$.step2.NiveauAvancement.$errors[0].$message}}</small>
                                        <small v-if="resultError['NiveauAvancement']"> {{ resultError["NiveauAvancement"] }} </small>

                                    </div>
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="Sigle">Montant décaissé<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.MontantDecaisser" color="info" name="MontantDecaisser" size="sm" rounded-size="sm"  />
                                        <small v-if="v$.step2.MontantDecaisser.$error">{{ v$.step2.MontantDecaisser.$errors[0].$message}}</small>
                                        <small v-if="resultError['MontantDecaisser']"> {{ resultError["MontantDecaisser"] }} </small>
                                    </div>
         
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                    <label for="date_start">Taux d'avancement technique<span class="text-danger">*</span></label>
                                        <MazInput v-model="step2.TauxAvancementTechnique"   color="info" name="TauxAvancementTechnique" size="sm" rounded-size="sm" type="text" />
                                        <small v-if="v$.step2.TauxAvancementTechnique.$error">{{ v$.step2.TauxAvancementTechnique.$errors[0].$message}}</small>
                                        <small v-if="resultError['TauxAvancementTechnique']"> {{ resultError["TauxAvancementTechnique"] }} </small>
                                    </div>
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="date_end">Images<span class="text-danger">*</span></label>
                                        <input class="form-control" type="file" id="input-file" accept="image/*" multiple
                                         @change="handleFileUploadImagesUpdate">
                                        <small v-if="v$.step2.images.$error">{{ v$.step2.images.$errors[0].$message}}</small>
                                        <small v-if="resultError['images[]']"> {{ resultError["images[]"] }} </small>
                                    </div>
                                    
                                    <div class="col-xl-6 col-md-6 col-sm-12">
                                        <label for="date_end">Videos<span class="text-danger">*</span></label>
                                        <input class="form-control" type="file" id="input-file" accept="video/*"
                                    @change="handleFileUploadVideo">
                                <small v-if="v$.step2.videoss.$error">{{ v$.step2.videoss.$errors[0].$message}}</small>
                                <small v-if="resultError['videoss[]']"> {{ resultError["videoss[]"] }} </small>
                                    </div>
                                   
                                    <div class="col-12">
                                        <label for="infrastructure_id">Difficultes<span class="text-danger">*</span></label>
                                        <MazTextarea v-model="step2.Difficultes" color="info" name="Difficultes" size="sm" rounded-size="sm"  />
                                        <small v-if="v$.step2.Difficultes.$error">{{ v$.step2.Difficultes.$errors[0].$message}}</small>
                                        <small v-if="resultError['Difficultes']"> {{ resultError["Difficultes"] }} </small>
                                    </div>
                                  
                                    
                                   
                                   
  

         </div>
         
         <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdateInfrastructureSuivi('update-suivi')">
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
        <!-- End:: update suivi -->
    </div>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import Pag from "@/components/others/pagination.vue";
import { require, lgmin, lgmax, ValidNumeri } from "@/functions/rules";
import { useToast } from "vue-toastification";
import Loading from '@/components/others/loading.vue';
import axios from '@/lib/axiosConfig.js'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import Swal from 'sweetalert2'
import {successmsg} from "@/lib/modal.js"
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

export default {
  name: "ComponentlisteInfra",
  props: ['id'],
  components: { Loading, MazPhoneNumberInput , Pag },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    totalPages() {
      return Math.ceil(this.SuiviOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.SuiviOptions.slice(startIndex, endIndex);
    },
    
    tempsEcoule() {
  const dateDebut = new Date(this.data.DateDebut);
  const dateFin = new Date(this.data.DateFin);

  let years = dateFin.getFullYear() - dateDebut.getFullYear();
  let months = dateFin.getMonth() - dateDebut.getMonth();
  let days = dateFin.getDate() - dateDebut.getDate();

  if (days < 0) {
    months -= 1;
    days += new Date(dateFin.getFullYear(), dateFin.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  if (years > 0) {
    return `${years} année${years > 1 ? 's' : ''} et ${months} mois`;
  } else {
    return `${months} mois et ${days} jour${days > 1 ? 's' : ''}`;
  }
}

  },
  data() {
    return {
      loading: true,
      data: "",
      error: "",
      search:"",
      resultError: {},
      currentPage: 1,
      itemsPerPage: 12,
      totalPageArray: [],
      SuiviOptions:[],
      datas:[],
      ToId: "",
      v$: useVuelidate(),
      step1: {
        DateSuivi: "",
        NiveauAvancement: "",
        MontantDecaisser: "",
        TauxAvancementTechnique: "",
        images: [],
        videoss: "",
        Difficultes: "",

      },
      step2: {
        DateSuivi: "",
        NiveauAvancement: "",
        MontantDecaisser: "",
        TauxAvancementTechnique: "",
        images: [],
        videoss: "",
        Difficultes: "",
        imagesUrls:[],

      },




    }
  },
  validations: {
    step1: {
        DateSuivi: { require },
        NiveauAvancement: { require },
        MontantDecaisser: { require },
        TauxAvancementTechnique: { require },
        images: {  },
        videoss: {  },
        Difficultes: { require },

    },
    step2: {
        DateSuivi: { require },
        NiveauAvancement: { require },
        MontantDecaisser: { require },
        TauxAvancementTechnique: { require },
        images: {  },
        videoss: {  },
        Difficultes: { require },

    }
  },
  async mounted() {

    await this.fetchDetailInfra()
    var lightboxVideo = GLightbox({
      selector: '.glightbox'
    });
    lightboxVideo.on('slide_changed', ({ prev, current }) => {
      console.log('Prev slide', prev);
      console.log('Current slide', current);

      const { slideIndex, slideNode, slideConfig, player } = current;
    });
  },
  methods: {
    successmsg:successmsg,
    openGallery(photos) {
      const images = photos.split('|').map(url => ({
        href: url,
        type: 'image'
      }));

      GLightbox({elements: images}).open();
    },
    openVideo(videoUrl) {
    GLightbox({
      elements: [{
        'href': videoUrl,
        'type': 'video',
        'source': 'local', // ou 'youtube', 'vimeo', etc. selon la source de votre vidéo
        'width': '900px',
      }]
    }).open();
  },
  
  
    async fetchDetailInfra() {
      try {
        const response = await axios.get(`infrastructures/detail/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("SuiviOptions", response.data);
        if (response.data.status === "success") {
          this.data = response.data.data;
          this.datas = this.data.suivis
             this.SuiviOptions =  this.datas
          //   this.setCodeProjet(this.data.CodeProjet);
          //   console.log("CodeProjet", this.code); 
          //   this.ObjectisOptions =  response.data.data.objectifs   
          //   this.SuivisOptions =  response.data.data.suivis
          //   this.BailleursOptions =  response.data.data.bailleurs
          //   this.InfrastructuresOptions =  response.data.data.infrastructures

          // await this.fetchObjectif(this.code)
          console.log("SuiviOptions", this.data);

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
    async submitSuivi(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        console.log('rrrrrrrrrr',this.step1.images);

        const formData = new FormData();
        formData.append("DateSuivi", this.step1.DateSuivi);
        formData.append("NiveauAvancement", this.step1.NiveauAvancement);
        formData.append("MontantDecaisser", this.step1.MontantDecaisser);
        formData.append("CodeInfrastructure", this.data.CodeInfrastructure);

        formData.append("TauxAvancementTechnique", this.step1.TauxAvancementTechnique);
        formData.append("Difficultes", this.step1.Difficultes);
        if (this.step1.images && this.step1.images.length > 0) {
        for (let i = 0; i < this.step1.images.length; i++) {
            console.log(this.step1.images);
            formData.append("images[]", this.step1.images[i]);
        }
        }
        if (this.step1.videoss) {
        formData.append("videoss[]", this.step1.videoss);
        }

        try {
      const response = await axios.post("/infrastructures/suivis", formData, {
        headers: { 
          Authorization: `Bearer ${this.loggedInUser.token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log("Réponse du téléversement :", response);
      if (response.data.status === "success") {
        this.closeModal(modalId);
        this.successmsg(
          "Suivi créé avec succès",
          "Le nouveau suivi a été créé avec succès !"
        );
        await this.fetchDetailInfra()
        // Autres actions après succès...
      }
    } catch (error) {
      console.log("Erreur lors de la soumission", error);
      this.loading = false;
      if (error.response && error.response.data.status === "error") {
        this.error = error.response.data.message;
      } else if (error.response && error.response.data.errors) {
        this.formatValidationErrors(error.response.data.errors);
      }
    }
  } else {
    console.log("Erreurs de validation", this.v$.$errors);
  }

     
    },
    async  HandleIdUpdate(id){
  this.loading = true;

    try {
      const response = await axios.get(`/infrastructures/suivis/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${this.loggedInUser.token}`
        }
      });

      // console.log("response", response);
      if (response.data.status === "success") {
        console.log("responsedata", response.data.data);
        let data =  response.data.data
       
        this.step2 = {
        DateSuivi: data.DateSuivi,
        NiveauAvancement: data.NiveauAvancement,
        MontantDecaisser: data.MontantDecaisser,
        TauxAvancementTechnique: data.TauxAvancementTechnique,
        Difficultes: data.Difficultes,
        videoss: data.videos,
        images: [],
         imagesUrls: data.Photos.split('|'),
      };

      this.ToId = data.id;
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
  async  submitUpdateInfrastructureSuivi(modalId){
 
 this.v$.step2.$touch();


  if (this.v$.$errors.length == 0) {
  
     this.loading = true;
     const formData = new FormData();
      formData.append("DateSuivi", this.step2.DateSuivi);
      formData.append("NiveauAvancement", this.step2.NiveauAvancement);
      formData.append("MontantDecaisser", this.step2.MontantDecaisser);
      formData.append("TauxAvancementTechnique", this.step2.TauxAvancementTechnique);
      formData.append("Difficultes", this.step2.Difficultes);
      formData.append("CodeInfrastructure", this.data.CodeInfrastructure);
      formData.append("id", this.ToId);

      ;

      if (this.step2.images.length > 0) {
      for (let i = 0; i < this.step2.images.length; i++) {
        formData.append("images[]", this.step2.images[i]);
      }
    } else {
      console.log(this.step2.imagesUrls)
      const imageFiles = await this.convertUrlsToFiles(this.step2.imagesUrls)
      
      for (let file of imageFiles) {
      formData.append("images[]", file);
      console.log('file', file);
      
    }
      
  

    }

        

    try {
      const response = await axios.post('/infrastructures/suivis',formData, {
        headers: {
         
          Authorization: `Bearer ${this.loggedInUser.token}`,
        
        },
      });
      console.log("Réponse du téléversement :", response);
      if (response.data.status === "success") {
        this.closeModal(modalId);
        this.successmsg(
          "Suivi mis à jour avec succès",
          "Le suivi a été mis à jour avec succès !"
        );
        await this.fetchDetailInfra()
       
        
      } 
    } catch (error) {
      console.error("Erreur lors du téléversement :", error);
     
      if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");  //a revoir
        }
   else{
     this.formatValidationErrors(error.response.data.errors);
     this.loading = false;

   }
    }
  } else {
    console.log("cest pas bon ", this.v$.$errors);
    this.loading = false;

  }
 },
 async  urlToFile(url, filename, mimeType) {
  try {
    const response = await fetch(url ,{ mode: 'no-cors' });
    
    if (!response.ok) {
      throw new Error(`Erreur lors du téléchargement de l'image : ${response.statusText}`);
    }
    
    const blob = await response.blob();
    
    return new File([blob], filename, { type: mimeType });
  } catch (error) {
    console.error('Erreur lors de la conversion de l\'URL en fichier:', error);
    return null;
  }
},

async  convertUrlsToFiles(urls) {
  const files = [];

  for (let url of urls) {
    const filename = url.split('/').pop();
    const mimeType = url.includes('.png') ? 'image/png' : 'image/jpeg';
    
    const file = await this.urlToFile(url, filename, mimeType);
    
    if (file && file.size > 0) { // Vérifie que le fichier a bien été créé avec du contenu
      files.push(file);
    } else {
      console.warn(`Le fichier ${filename} est vide ou n'a pas pu être créé.`);
    }
  }

  return files;
},

 async  convertUrlToFile(url) {
  return fetch(url, { mode: 'no-cors' })
    .then(response => response.blob())
    .then(blob => new File([blob], url.split('/').pop(), { type: blob.type }));
},

 async HandleIdDelete(id) {
   // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
   const result = await Swal.fire({
      title: 'Êtes-vous sûr ?',
      text: 'Vous ne pourrez pas annuler cette action !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-le !',
      cancelButtonText: 'Non, annulez !',
      reverseButtons: true
   });

   // Si l'utilisateur confirme la suppression
   if (result.isConfirmed) {
     this.ConfirmeDelete(id);
   }
       },
       async ConfirmeDelete(id) {
        this.loading = true
       
       try {
         // Faites une requête pour supprimer l'élément avec l'ID itemId
         const response = await axios.delete(`/infrastructures/types/${id}`, {
           headers: {
             Authorization: `Bearer ${this.loggedInUser.token}`,
             
 
           },
 
 
         });
         console.log('Réponse de suppression:', response);
         if (response.data.status === 'success') {
           this.loading = false
           this.successmsg(
            "Type d'infrastructure supprimé avec succès",
            "Le type d'infrastructure a été supprimé avec succès !"
          );
          await this.fetchClients();
 
         } else {
           console.log('error', response.data)
           this.loading = false
         }
       } catch (error) {
         console.error('Erreur lors de la suppression:', error);
        
         if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
              await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
         
       }
 
     },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
    },
    formatBudget(budget) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'GNF',
        minimumFractionDigits: 0
      }).format(budget);
    },

    async formatValidationErrors(errors) {
      const formattedErrors = {};

      for (const field in errors) {
        const errorMessages = errors[field]; // Liste complète des messages d'erreur
        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet
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
    handleFileUploadImages(event) {
  console.log("File input change");
  const files = event.target.files;
  console.log("Selected files:", files);
       // Créer un tableau pour stocker les fichiers
  this.step1.images = [];
  
  // Ajouter chaque fichier au tableau
  for (let i = 0; i < files.length; i++) {
    this.step1.images.push(files[i]);
  }
  

  console.log("Images stored:", this.step1.images);

    },
    handleFileUploadImagesUpdate(event) {
  console.log("File input change");
  const files = event.target.files;
  console.log("Selected files:", files);
       // Créer un tableau pour stocker les fichiers
  this.step2.images = [];
  
  // Ajouter chaque fichier au tableau
  for (let i = 0; i < files.length; i++) {
    this.step2.images.push(files[i]);
  }
  
 
  console.log("Images stored:", this.step2.images);

    },
    handleFileUploadVideo(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("handleFileUploadLogo Selected file:", file);
      this.step1.videoss = file

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
      return this.SuiviOptions.slice(startIndex, endIndex);
    },
    filterByName() {
      this.currentPage = 1;
      if (this.search !== null) {
        const tt = this.search;
        const searchValue = tt.toLowerCase();
        this.SuiviOptions = this.datas.filter((user) => {
          const Nom = user.DateSuivi || "";
          const Prenoms = user.NiveauAvancement || "";
          const Pseudo = user.MontantDecaisser || "";
           const Email = user.TauxAvancementTechnique || "";
          return (
            Nom.toLowerCase().includes(searchValue) ||
            Prenoms.toLowerCase().includes(searchValue) ||
            Pseudo.toLowerCase().includes(searchValue) ||
            Email.toLowerCase().includes(searchValue) 
          );
        });
      } else {
        this.SuiviOptions = [...this.datas];
      }
    },
  },

}
</script>
<style lang="css" scoped>

</style>