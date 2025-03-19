<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
  
    <!-- Start::app-content -->
  
    <div class="">
  
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
              <div class="row">
                <div class="col-11">
                  <h4 class="fw-semibold fs-20 mb-0 d-flex align-items-center "> {{data.NomInfrastructure}} <span
                      style="color:red"> ({{data.CodeInfrastructure}})</span> </h4>
                </div>
                <div class="col-1">
                  <div class="float-end w-20 ">
                    <a class="px-2 bg-primary text-white  fs-15 " @click="goBack" href="#"> &larr; Retour</a>
  
                  </div>
                </div>
              </div>
  
  
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1"><i class="bi bi-person me-2 fs-14"></i>Maître d'ouvrage : <span
                      class="fw-semibold fs-16" data-bs-toggle="tooltip"
                      title="Current Salary">{{data.MaitreOuvrage}}</span> </div>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1"><i class="bi bi-geo-alt me-2 fs-14"></i>Localité : <span class="fw-semibold  fs-16"
                      data-bs-toggle="tooltip" title="Current Salary">{{data.LocalitesConcernees}}</span> </div>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1"><i class="bi bi-bricks me-2 fs-14"></i>Entreprise de travaux: <span
                      class="fw-semibold fs-16" data-bs-toggle="tooltip" title="Current Salary">
                      {{data.responsable?.NomMission}}</span> </div>
  
                </div>
              </div>
              <div class="row">
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Date début prévue : <span
                      class="fw-semibold text-warning fs-16" data-bs-toggle="tooltip"
                      title="Current Salary">{{formatDate(data.DateDebut) }}</span> </div>
  
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Date fin prévue : <span
                      class="fw-semibold text-warning fs-16" data-bs-toggle="tooltip"
                      title="Current Salary">{{formatDate(data.DateFin) }}</span> </div>
                </div>
  
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1 fs-16"><i class="bi bi-calendar3 me-2 fs-16"></i>Durée prévue : <span
                      class="fw-semibold fs-16" data-bs-toggle="tooltip" title="Current Salary"
                      style="color:red">{{tempsEcoule(data.DateDebut , data.DateFin) }}</span> </div>
                </div>
  
              </div>
              <div class="row">
                <div class="col-xxl-7 col-xl-7 col-lg-7 col-md-6 col-sm-12">
                  <div class="mt-1 fs-17"><i class="bi bi-x-diamond me-2 fs-16"></i>Type d'infrastructure
                    : <span class="fw-semibold" data-bs-toggle="tooltip"
                      title="Current Salary">{{data.type?.Intitule}}</span> </div>
  
                </div>
               
                <div class="col-xxl-5 col-xl-5 col-lg-5 col-md-6 col-sm-6">
                  <div class="mt-1 fs-17"><i class="bi bi-bank me-2 fs-16"></i>Coût infrastructure : <span
                      class="fw-semibold" data-bs-toggle="tooltip" title="Current Salary">
                      {{ formatBudget(data.Cost) ?? "-"
  
                      }}
                    </span> </div>
  
                </div>
                <div class="col-xxl-8 col-xl-8 col-lg-8 col-md-6 col-sm-12">
                  <div class="mt-1 fs-16"><i class="bi bi-bullseye me-2 fs-16"></i>Bureau de contrôle :
                    <span
                      class="fw-semibold" data-bs-toggle="tooltip" title="Current Salary">
                      {{ data.bureau?.NomMission ?? "-" }} </span> 
                  </div>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <div class="mt-1 fs-16"><i class="bi bi-eye me-2 fs-16"></i>Visibilité :
                    <span v-if="data.Visible ==='1'" class="fw-semibold badge rounded-pill bg-success"
                      data-bs-toggle="tooltip" title="Current Salary">Actif</span>
                    <span v-else class="fw-semibold badge rounded-pill bg-danger" data-bs-toggle="tooltip"
                      title="Current Salary">Inactif</span>
                  </div>
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
                  <p><span class=" fs-20">Date debut : </span> <span class="fs-15 fw-semibold text-warning">{{
                      formatDate(data.projet?.DateDebut)}}</span> </p>
  
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <p><span class=" fs-20">Date fin : </span><span class="fs-15 fw-semibold text-warning">{{
                      formatDate(data.projet?.DateFin)
                      }}</span></p>
  
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12">
                  <p><span class=" fs-20">Durée : </span><span class="fs-15 fw-semibold" style="color:red">{{
                      tempsEcoule(data.projet?.DateDebut , data.projet?.DateFin) }}</span></p>
  
                </div>
              </div>
            </div>
            <div class="card-body">
            
            </div>
          </div>
         
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
  
                  <button v-if="hasPermission(3)" class="btn  btn-primary ms-2" data-bs-placement="top"
                    v-tippy="{ content: 'Créer un nouvel élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                    data-bs-title="Add Contact" data-bs-toggle="modal" data-bs-target="#create-suivi">
                    <i class="ri-add-line"> suivi </i>
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div v-if="paginatedItems.length === 0" class="noresul">
                <span> Vous n'avez pas encore de suivi, vous pouvez également en ajouter un !! </span>
              </div>
  
              <div style="overflow-x: scroll !important" class="table-responsive" v-else>
                <table class="table  table-bordered table-striped">
                  <thead>
                    <tr>
                      <th class="text-center" scope="col">N°</th>
                      <th scope="col">Date suivi</th>
                      <th scope="col" class="text-center">Niv. d'Avance.</th>
                      <th scope="col" class="text-center">Taux Exc. Fina.</th>
                      <th scope="col">Mont. Décaiss.</th>
                      <th scope="col" class="text-center">Taux Av. Tech.</th>
                      <th scope="col">Difficultes</th>
                      <!-- <th scope="col">Trimestres</th> -->
                      <th scope="col">Images</th>
                      <th scope="col">Videos</th>
                      <th scope="col" v-if="hasPermission(6)">Etat</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user , index) in paginatedItems" :key="user.id">
                      <th scope="row" class="ps-4" style="width: 60px;"> {{index + 1}}</th>
                      <td>
                        <div class="d-flex align-items-center lh-1">
  
                          <div style="color:red">{{ formatDate(user.DateSuivi) }}</div>
                        </div>
                      </td>
                      <td  class="text-center">{{user.NiveauAvancement}}</td>
                      <td  class="text-center">{{user.TauxExecutionFinanciere}}</td>
                      <td class="text-center"  style="width: 100px;">{{ formatBudget(user.MontantDecaisser) }}</td>
                      <td style="width: 100px;" class="text-center">{{user.TauxAvancementTechnique}}</td>
                      <td>{{user.Difficultes}}</td>
                      <!-- <td>
                        {{user.Trimestre}}
                         
                      </td> -->
                      <td class="text-center"  style="width: 80px;">
                        <button v-if="user.Photos" @click="openGallery(user.Photos)" class="btn btn-primary btn-sm"
                         v-tippy="{ content: 'Afficher les images',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                        >
                          <i class="bi bi-card-image"></i>
                        </button>
                        <span v-else>Aucune image</span>
                      </td>
                      <td  style="width: 80px;">
                        <button v-if="user.videos" @click="openVideo(user.videos)"
                          v-tippy="{ content: 'Afficher les vidéos',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                          class="btn btn-primary btn-sm text-center">
                          <i class="bi bi-play-btn"></i>
                        </button>
                        <span v-else>Aucune vidéo</span>
                      </td>
                      <td style="width:120PX" v-if="hasPermission(6)" >
                        <button class="btn " :class=" user?.Validated == '1' ? 'bg-success' : 'bg-danger'" :disabled="user?.Validated == '1'" style=" color:white" @click="validateSelection(user?.id)">
                        <i class="bi bi-check2-circle"></i>
                        {{ user?.Validated == '1' ? 'Valider' : 'Non Valider' }}
                      </button>
                      </td>
  
                      <td style="width: 80px;">
                        <div class="hstack gap-2 fs-1">
  
                          <div v-if="hasPermission(2)" class="btn btn-icon btn-sm btn-info btn-wave waves-effect "
                            v-tippy="{ content: 'Modifier l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                            data-bs-toggle="modal" data-bs-target="#update-suivi" @click="HandleIdUpdate(user.id)"><i
                              class="ri-edit-line"></i></div>
                          <a v-if="hasPermission(4)" aria-label="anchor" href="javascript:void(0);"
                            v-tippy="{ content: 'Supprimer l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                            class="btn btn-icon btn-sm btn-danger btn-wave waves-effect waves-light"><i
                              class="ri-delete-bin-line" @click="HandleIdDelete(user.id)"></i></a>
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
      <!--End::row-1 -->
  
    </div>
    <!-- Start:: Create suivi -->
    <div class="modal fade effect-rotate-bottom" id="create-suivi" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="create-suivi">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Créer un suivi</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center" style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
              <div class="row">
                <div class="col-12">
  
                  <div class="card border border-primary mt-2 mb-0 custom-card">
                    <div class="card-body py-1">
                      <div class="card-text">
                        <p class="mb-0"><span class="fw-semibold fs-14">Nom projet : </span><span
                            class=" text-success fs-14 "> {{ data.projet?.NomProjet }}</span> </p>
                        <p class="mb-0"><span class="fw-semibold fs-14">Nom de l'infrastructure : </span> <span
                            class=" text-success fs-15 "> {{data.NomInfrastructure}}</span> </p>
                      </div>
                    </div>
                  </div>
                </div>
              
              </div>
              <div class="row">
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Code">Date suivi<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.DateSuivi" color="info" name="DateSuivi" size="sm" rounded-size="sm"
                    type="date" />
                  <small v-if="v$.step1.DateSuivi.$error">{{ v$.step1.DateSuivi.$errors[0].$message}}</small>
                  <small v-if="resultError['DateSuivi']"> {{ resultError["DateSuivi"] }} </small>
                </div>
  
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Nom">Niveau d'avancement<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.NiveauAvancement" color="info" name="NiveauAvancement" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step1.NiveauAvancement.$error">{{
                    v$.step1.NiveauAvancement.$errors[0].$message}}</small>
                  <small v-if="resultError['NiveauAvancement']"> {{ resultError["NiveauAvancement"] }} </small>
  
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Sigle">Montant décaissé<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.MontantDecaisser" color="info" name="MontantDecaisser" size="sm"
                    rounded-size="sm" type="number" />
                  <small v-if="v$.step1.MontantDecaisser.$error">{{
                    v$.step1.MontantDecaisser.$errors[0].$message}}</small>
                  <small v-if="resultError['MontantDecaisser']"> {{ resultError["MontantDecaisser"] }} </small>
                </div>
  
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_start">Taux d'avancement technique<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.TauxAvancementTechnique" color="info" name="TauxAvancementTechnique" size="sm"
                    rounded-size="sm" type="number" min="0" max="100" />
                  <small v-if="v$.step1.TauxAvancementTechnique.$error">{{
                    v$.step1.TauxAvancementTechnique.$errors[0].$message}}</small>
                  <small v-if="resultError['TauxAvancementTechnique']"> {{ resultError["TauxAvancementTechnique"] }}
                  </small>
                </div>
                <div class="col col-md-12 col-sm-12">
                    <div class="mb-3 position-relative">
                       <div class="input-groupe">
                        <label for="password">Taux d'exécution financière <span class="text-danger">*</span></label>
                        <MazInput v-model="step1.TauxExecutionFinanciere"  name="TauxExecutionFinanciere" color="info" placeholder="10"  type="number"
                        min="0" max="100"  size="sm" rounded-size="sm" />
                        <small v-if="v$.step1.TauxExecutionFinanciere.$error">{{v$.step1.TauxExecutionFinanciere.$errors[0].$message}}</small>
                        <small v-if="resultError['TauxExecutionFinanciere']">{{resultError['TauxAvancementPhysique']}}</small>
                       </div>
                    </div>
                </div> 
                <!-- <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Sigle">Trimestre<span class="text-danger">*</span></label>
                  <MazSelect v-model="step1.Trimestre" color="info" name="Trimestre" size="sm" rounded-size="sm"
                    :options="trimestre" multiple search />
                  <small v-if="v$.step1.Trimestre.$error">{{ v$.step1.Trimestre.$errors[0].$message}}</small>
                  <small v-if="resultError['Trimestre']"> {{ resultError["Trimestre"] }} </small>
                </div> -->
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_end">Images<span class="text-danger">*</span></label>
                  <input class="form-control" type="file" id="input-file" accept="image/*" multiple
                    @change="handleFileUploadImages">
                    <small class="fs-13">Formats autorisés : PNG, JPG, JPEG | Taille maximale : 2048 Mo</small>
                  <small v-if="v$.step1.images.$error">{{ v$.step1.images.$errors[0].$message}}</small>
                  <small v-if="resultError['images[]']"> {{ resultError["images[]"] }} </small>
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_end">Videos</label>
                  <input class="form-control" type="file" id="input-file" accept="video/*"
                    @change="handleFileUploadVideo">
                  <small class="fs-13">Taille d'importation maximale 10 megas</small>
                  <small v-if="v$.step1.videoss.$error">{{ v$.step1.videoss.$errors[0].$message}}</small>
                  <small v-if="resultError['videoss[]']"> {{ resultError["videoss[]"] }} </small>
                </div>
  
                <div class="col-12">
                  <label for="infrastructure_id">Difficultes</label>
                  <MazTextarea v-model="step1.Difficultes" color="info" name="Difficultes" size="sm" rounded-size="sm" />
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
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
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
    <div class="modal fade effect-rotate-bottom" id="update-suivi" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update-suivi">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier un suivi</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center" style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
              <div class="row">
                <div class="col-12">
  
  <div class="card border border-primary mt-2 mb-0 custom-card">
    <div class="card-body py-1">
      <div class="card-text">
        <p class="mb-0"><span class="fw-semibold fs-14">Nom projet : </span><span
            class=" text-success fs-14 "> {{ data.projet?.NomProjet }}</span> </p>
        <p class="mb-0"><span class="fw-semibold fs-14">Nom de l'infrastructure : </span> <span
            class=" text-success fs-15 "> {{data.NomInfrastructure}}</span> </p>
      </div>
    </div>
  </div>
</div>
  
              </div>
              <div class="row">
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Code">Date suivi<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.DateSuivi" color="info" name="DateSuivi" size="sm" rounded-size="sm"
                    type="date" />
                  <small v-if="v$.step2.DateSuivi.$error">{{ v$.step2.DateSuivi.$errors[0].$message}}</small>
                  <small v-if="resultError['DateSuivi']"> {{ resultError["DateSuivi"] }} </small>
                </div>
  
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Nom">Niveau d'avancement<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.NiveauAvancement" color="info" name="NiveauAvancement" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.NiveauAvancement.$error">{{
                    v$.step2.NiveauAvancement.$errors[0].$message}}</small>
                  <small v-if="resultError['NiveauAvancement']"> {{ resultError["NiveauAvancement"] }} </small>
  
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Sigle">Montant décaissé<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.MontantDecaisser" color="info" name="MontantDecaisser" size="sm"
                    rounded-size="sm" type="number" />
                  <small v-if="v$.step2.MontantDecaisser.$error">{{
                    v$.step2.MontantDecaisser.$errors[0].$message}}</small>
                  <small v-if="resultError['MontantDecaisser']"> {{ resultError["MontantDecaisser"] }} </small>
                </div>
  
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_start">Taux d'avancement technique<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.TauxAvancementTechnique" color="info" name="TauxAvancementTechnique" size="sm"
                    rounded-size="sm" type="number" min="0" max="100" />
                  <small v-if="v$.step2.TauxAvancementTechnique.$error">{{
                    v$.step2.TauxAvancementTechnique.$errors[0].$message}}</small>
                  <small v-if="resultError['TauxAvancementTechnique']"> {{ resultError["TauxAvancementTechnique"] }}
                  </small>
                </div>
                <div class="col col-md-12 col-sm-12">
                    <div class="mb-3 position-relative">
                       <div class="input-groupe">
                        <label for="password">Taux d'exécution financière <span class="text-danger">*</span></label>
                        <MazInput v-model="step2.TauxExecutionFinanciere"  name="TauxExecutionFinanciere" color="info" placeholder="10"  type="number"
                        min="0" max="100"  size="sm" rounded-size="sm" />
                        <small v-if="v$.step2.TauxExecutionFinanciere.$error">{{v$.step2.TauxExecutionFinanciere.$errors[0].$message}}</small>
                        <small v-if="resultError['TauxExecutionFinanciere']">{{resultError['TauxAvancementPhysique']}}</small>
                       </div>
                    </div>
                </div> 
                <!-- <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Sigle">Trimestre<span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.Trimestre" color="info" name="Trimestre" size="sm" rounded-size="sm"
                    :options="trimestre" multiple search />
                  <small v-if="v$.step2.Trimestre.$error">{{ v$.step2.Trimestre.$errors[0].$message}}</small>
                  <small v-if="resultError['Trimestre']"> {{ resultError["Trimestre"] }} </small>
                </div> -->
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_end">Images<span class="text-danger">*</span></label>
                  <input class="form-control" type="file" id="input-file" accept="image/*" multiple
                    @change="handleFileUploadImagesUpdate">
                  <small v-if="v$.step2.images.$error">{{ v$.step2.images.$errors[0].$message}}</small>
                  <small v-if="resultError['images[]']"> {{ resultError["images[]"] }} </small>
                </div>
                <!-- <div class="col-xl-12 col-md-12 col-sm-12">
                                        <label for="date_end">Images<span class="text-danger">*</span></label>
                                        <div class="image-container">
                                          <div v-for="(imageUrl, index) in step2.imagesUrls" :key="index" class="image-wrapper">
                                            <img 
                                              :src="imageUrl" 
                                              alt="Image" 
                                              class="img-thumbnail mb-2" 
                                              @click="triggerFileInput(index)"
                                            >
                                            <div class="overlay">
                                              <span class="change-text">Changer</span>
                                            </div>
                                            <input 
                                              type="file" 
                                              :id="`input-file-${index}`" 
                                              accept="image/*" 
                                              @change="handleFileUploadImagesUpdate($event, index)" 
                                              class="file-input"
                                            >
                                          </div>
                                          <div class="image-wrapper add-image">
                                          <div class="plus-icon">+</div>
                                          <input 
                                            type="file" 
                                            id="input-file-new" 
                                            accept="image/*" 
                                            multiple 
                                            @change="handleFileUploadImagesUpdate($event)" 
                                            class="file-input"
                                          >
                                          <small v-if="v$.step2.images.$error">{{ v$.step2.images.$errors[0].$message }}</small>
                                          <small v-if="resultError['images[]']">{{ resultError["images[]"] }}</small>
                                        </div>
                                        </div>
                                      </div> -->
  
  
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="date_end">Videos</label>
                  <input class="form-control" type="file" id="input-file" accept="video/*"
                    @change="handleFileUploadVideo">
                  <small v-if="v$.step2.videoss.$error">{{ v$.step2.videoss.$errors[0].$message}}</small>
                  <small v-if="resultError['videoss[]']"> {{ resultError["videoss[]"] }} </small>
                </div>
  
                <div class="col-12">
                  <label for="infrastructure_id">Difficultes</label>
                  <MazTextarea v-model="step2.Difficultes" color="info" name="Difficultes" size="sm" rounded-size="sm" />
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
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
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
import { require, lgmin, lgmax, ValidNumeri, vlmin, vlmax } from "@/functions/rules";
import { useToast } from "vue-toastification";
import Loading from '@/components/others/loading.vue';
import axios from '@/lib/axiosConfig.js'
import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
import Swal from 'sweetalert2'
import { successmsg } from "@/lib/modal.js"
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';

export default {
  name: "ComponentlisteInfra",
  props: ['id'],
  components: { Loading, MazPhoneNumberInput, Pag },
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



  },
  data() {
    return {
      loading: true,
      data: "",
      error: "",
      search: "",
      resultError: {},
      currentPage: 1,
      itemsPerPage: 12,
      totalPageArray: [],
      SuiviOptions: [],
      datas: [],
      ToId: "",
      v$: useVuelidate(),
      trimestre: [
        { label: "Trimestre 1", value: "T1" },
        { label: "Trimestre 2", value: "T2" },
        { label: "Trimestre 3", value: "T3" },
        { label: "Trimestre 4", value: "T4" },
      ],
      step1: {
        DateSuivi: "",
        NiveauAvancement: "",
        MontantDecaisser: "",
        TauxAvancementTechnique: "",
        TauxExecutionFinanciere: "",
        Trimestre: ["T1"],
        images: [],
        videoss: "",
        Difficultes: "",

      },
      step2: {
        DateSuivi: "",
        NiveauAvancement: "",
        MontantDecaisser: "",
        TauxAvancementTechnique: "",
        TauxExecutionFinanciere: "",
        Trimestre: ["T1"],
        images: [],
        videoss: "",
        Difficultes: "",
        imagesUrls: [],

      },
    }
  },
  validations: {
    step1: {
      DateSuivi: { require },
      NiveauAvancement: { require },
      MontantDecaisser: { require },
      TauxAvancementTechnique: {
        require,
        ValidNumeri,
        vlmin: vlmin(0),
        vlmax: vlmax(100),
      },
      TauxExecutionFinanciere: {
        require,
        ValidNumeri,
        vlmin: vlmin(0),
        vlmax: vlmax(100),
      },
      Trimestre: {  },
      images: { require },
      videoss: {},
      Difficultes: {},

    },
    step2: {
      DateSuivi: { require },
      NiveauAvancement: { require },
      MontantDecaisser: { require },
      TauxAvancementTechnique: {
        require, ValidNumeri,
        vlmin: vlmin(0),
        vlmax: vlmax(100),
      },
      TauxExecutionFinanciere: {
        require,
        ValidNumeri,
        vlmin: vlmin(0),
        vlmax: vlmax(100),
      },
      Trimestre: {  },
      images: {},
      videoss: {},
      Difficultes: {},

    }
  },
  async mounted() {

    await this.fetchDetailInfra()
    var lightboxVideo = GLightbox({
      selector: '.glightbox'
    });
    lightboxVideo.on('slide_changed', ({ prev, current }) => {
     

      const { slideIndex, slideNode, slideConfig, player } = current;
    });
  },
  methods: {
    successmsg: successmsg,
    goBack() {
      this.$router.go(-1);
    },
    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },
    triggerFileInput(index) {
      document.getElementById(`input-file-${index}`).click();
    },
    openGallery(photos) {
      const images = photos.split('|').map(url => ({
        href: url,
        type: 'image'
      }));

      GLightbox({ elements: images }).open();
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

    
        if (response.data.status === "success") {
          this.data = response.data.data;
          this.datas = this.data.suivis
          this.SuiviOptions = this.datas
         

          this.loading = false;

        }
      } catch (error) {
        this.loading = false;
      
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
    async submitSuivi(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
       

        const formData = new FormData();
        formData.append("DateSuivi", this.step1.DateSuivi);
        formData.append("NiveauAvancement", this.step1.NiveauAvancement);
        formData.append("MontantDecaisser", this.step1.MontantDecaisser);
        formData.append("CodeInfrastructure", this.data.CodeInfrastructure);

        formData.append("TauxAvancementTechnique", this.step1.TauxAvancementTechnique);
        formData.append("TauxExecutionFinanciere", this.step1.TauxExecutionFinanciere);
        formData.append("Difficultes", this.step1.Difficultes);
       
        if (this.step1.Trimestre && this.step1.Trimestre.length > 0) {
          for (let i = 0; i < this.step1.Trimestre.length; i++) {
           
            formData.append("Trimestre[]", this.step1.Trimestre[i]);
          }
        }
        if (this.step1.images && this.step1.images.length > 0) {
          for (let i = 0; i < this.step1.images.length; i++) {
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

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.step1 = {
                DateSuivi: "",
                NiveauAvancement: "",
                MontantDecaisser: "",
                TauxAvancementTechnique: "",
                TauxExecutionFinanciere: "",
                // Trimestre: [],
                images: [],
                videoss: "",
                Difficultes: "",

              },
              this.v$.step1.$reset();
             this.successmsg(
              "Suivi créé avec succès",
              "Le nouveau suivi a été créé avec succès !"
            );
            await this.fetchDetailInfra()
            
          }
        } catch (error) {
          this.loading = false;
          if (error.response && error.response.data.status === "error") {
            this.error = error.response.data.message;
          } else if (error.response && error.response.data.errors) {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
        this.loading = false;
        
      }


    },
    async HandleIdUpdate(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/infrastructures/suivis/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`
          }
        });

        if (response.data.status === "success") {
          let data = response.data.data

          this.step2 = {
            DateSuivi: data.DateSuivi,
            NiveauAvancement: data.NiveauAvancement,
            MontantDecaisser: data.MontantDecaisser,
            TauxAvancementTechnique: data.TauxAvancementTechnique,
            TauxExecutionFinanciere: data.TauxExecutionFinanciere,
            Difficultes: data.Difficultes,
            //  Trimestre : data.Trimestre?.split(','),
            videoss: data.videos,
            images: [],
            imagesUrls: data.Photos.split('|'),
          };

          this.ToId = data.id;
          this.loading = false;

        }
      } catch (error) {
        this.loading = false;
       
        if (error.response.data.status === "error") {
          this.loading = false;
          

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
    async submitUpdateInfrastructureSuivi(modalId) {

      this.v$.step2.$touch();


      if (this.v$.$errors.length == 0) {

        this.loading = true;
        const formData = new FormData();
        formData.append("DateSuivi", this.step2.DateSuivi);
        formData.append("NiveauAvancement", this.step2.NiveauAvancement);
        formData.append("MontantDecaisser", this.step2.MontantDecaisser);
        formData.append("TauxAvancementTechnique", this.step2.TauxAvancementTechnique);
        formData.append("TauxExecutionFinanciere", this.step2.TauxExecutionFinanciere);
        formData.append("Difficultes", this.step2.Difficultes);
        formData.append("CodeInfrastructure", this.data.CodeInfrastructure);
        formData.append("Trimestre[]", ["T1"]);
        formData.append("id", this.ToId);

     
        ;

      

        if (this.step2.images.length > 0) {
          for (let i = 0; i < this.step2.images.length; i++) {
            formData.append("images[]", this.step2.images[i]);
          }
        }




        try {
          const response = await axios.post('/infrastructures/suivis', formData, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,

            },
          });
         
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Suivi mis à jour avec succès",
              "Le suivi a été mis à jour avec succès !"
            );
            await this.fetchDetailInfra()


          }
        } catch (error) {
          this.loading = false;
        

          if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
            await this.$store.dispatch('auth/clearMyAuthenticatedUser');
            this.$router.push("/");  //a revoir
          }
          else {
            this.formatValidationErrors(error.response.data.errors);
            this.loading = false;

          }
        }
      } else {
     
        this.loading = false;

      }
    },
    async urlToFile(url, filename, mimeType) {
      try {
        const response = await fetch(url, { mode: 'no-cors' });

        if (!response.ok) {
          throw new Error(`Erreur lors du téléchargement de l'image : ${response.statusText}`);
        }

        const blob = await response.blob();

        return new File([blob], filename, { type: mimeType });
      } catch (error) {
        this.loading = false;
      
        return null;
      }
    },

    async convertUrlsToFiles(urls) {
      const files = [];

      for (let url of urls) {
        const filename = url.split('/').pop();
        const mimeType = url.includes('.png') ? 'image/png' : 'image/jpeg';

        const file = await this.urlToFile(url, filename, mimeType);

        if (file && file.size > 0) { // Vérifie que le fichier a bien été créé avec du contenu
          files.push(file);
        } else {
          this.loading = false;
         
        }
      }

      return files;
    },

    async convertUrlToFile(url) {
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
        const response = await axios.delete(`/infrastructures/suivis/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,


          },


        });
       
        if (response.data.status === 'success') {
          this.loading = false
          this.successmsg(
            "Suivi d'infrastructure supprimé avec succès",
            "Le suivi d'infrastructure a été supprimé avec succès !"
          );
          await this.fetchDetailInfra();

        } else {
       
          this.loading = false
        }
      } catch (error) {
      

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
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
    tempsEcoule(a, b) {
      const dateDebut = new Date(a);
      const dateFin = new Date(b);

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
    
      const files = event.target.files;
    
      this.step1.images = [];

      // Ajouter chaque fichier au tableau
      for (let i = 0; i < files.length; i++) {
        this.step1.images.push(files[i]);
      }


  

    },
    handleFileUploadImagesUpdateNew(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.step2.imagesUrls.push(e.target.result);
          this.step2.images.push(files[i]);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    handleFileUploadImagesUpdate(event) {
     

   
      const files = event.target.files;
    
      this.step2.images = [];

      // Ajouter chaque fichier au tableau
      for (let i = 0; i < files.length; i++) {
        this.step2.images.push(files[i]);
      }


    

    },
    handleFileUploadVideo(event) {
    
      const file = event.target.files[0];
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
    async validateSelection(id) {
     const result = await Swal.fire({
        title: 'Êtes-vous sûr ?',
        text: 'Vous ne pourrez pas annuler cette action !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, validez !',
        cancelButtonText: 'Non, annulez !',
        reverseButtons: true
     });
  
     // Si l'utilisateur confirme la suppression
     if (result.isConfirmed) {
       this.validateSelection1(id);
     }
        },
        async  validateSelection1(id) {
        const data = {
          id:id
        }
    
      this.loading = true
         
         try {
           const response = await axios.put('/infrastructures/suivis/confirmer',data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
           
   
   
           });
       
           if (response.status === 200) {
             this.loading = false
             this.successmsg(
                  "Validation du suivi",
                  "Votre suivi  a été validé avec succès !"
              );  
              await this.fetchDetailInfra();
              this.loading = false
              
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
         
              this.loading = false
              Swal.fire({
              icon: "error",
              title: "Suivi validé",
              text: "Ce suivi a été déjà valider merci.",
            
            });
            // this.handleErrors(error);
           
         }

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
.image-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.image-wrapper {
  position: relative;
  margin: 10px;
  width: 100px;
  height: 100px;
  overflow: hidden;
  border-radius: 50%;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
  border: 1px solid var(--primary-color);
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.change-text {
  color: white;
  font-weight: bold;
}

.image-wrapper:hover .overlay {
  opacity: 1;
}

.file-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}

.add-image {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0;
  cursor: pointer;
}

.plus-icon {
  font-size: 40px;
  color: #666;
}

.add-image:hover .plus-icon {
  color: #333;
}

.add-image .file-input {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
</style>