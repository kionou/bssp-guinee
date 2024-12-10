<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div class="d-md-flex d-block pt-12  align-items-center justify-content-between my-4 page-header-breadcrumb">
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
        <div class="h5 fw-semibold mb-0 d-flex">
          <div class="tab-menu-heading border-0 p-0 ms-auto mt-sm-0 mt-1">
            <div class="tabs-menu-task me-1">
              <ul class="nav nav-tabs panel-tabs-task border-0 " role="tablist">
                <li><button type="button" class="btn btn-secondaire my-1 me-1 p-1 active fw-semibold" data-bs-toggle="tab"
                    data-bs-target="#Active" role="tab" aria-selected="true"> <i
                      class="bi bi-grid-3x3-gap fs-16 p-2"></i></button></li>
                <li><button type="button" class="btn btn-secondaire my-1 me-1 p-1" data-bs-toggle="tab"
                    data-bs-target="#Complete" role="tab" aria-selected="false"><i class="bi bi-list fs-16 p-2"></i>
                  </button></li>
  
              </ul>
            </div>
          </div>
          <div class="btn-list">
    <button class="btn btn-danger label-btn" @click=" exportPDF">
        <i class="bi bi-filetype-pdf label-btn-icon me-2"></i>
       Exporter en pdf
    </button>
    <button class="btn btn-info label-btn" @click=" exportToCSV">
        <i class="bi bi-filetype-csv label-btn-icon me-2"></i>
        Exporter en csv
    </button>
    <button class="btn btn-success label-btn" @click=" exportToExcel">
        <i class="bi bi-file-earmark-excel label-btn-icon me-2"></i>
        Exporter en excel
    </button>
   
   
  
        </div>
        </div>
        

       
        <div class="d-flex mt-sm-0 mt-2 align-items-center">
          <div class="input-group">
            <input type="text" class="form-control bg-light border-0" placeholder="Recherchez..."
              aria-describedby="search-member" v-model="search" @input="filterByName" />
            <button class="btn btn-light" type="button" id="search-contact-member">
  
              <i class="ri-search-line text-muted"></i>
            </button>
          </div>
  
          <!-- <div class="btn btn-icon btn-primary ms-2" @click="$router.push({ path: '/bspp/ajouter-projets' })">
                <i class="ri-add-line"> </i>
              </div> -->
          <div v-if="hasPermission(3)" class="btn btn-icon btn-primary ms-2" data-bs-title="Add Contact"
            data-bs-toggle="modal" data-bs-target="#add_projet">
            <i class="ri-add-line"> </i>
          </div>
        </div>
      </div>
    </div>
  
  
  
    <div class="tab-content p-0" data-aos="zoom-in">
      <div class="tab-pane active p-0 border-0" id="Active">
        <div class="row task-card">
          <div v-if="paginatedItems.length === 0" class="noresul">
            <span> Vous n'avez pas encore de projet , vous pouvez également en ajouter un !! </span>
          </div>
          <div class="row" v-else>
            <div class="col-xxl-3 col-xl-4 col-lg-6 col-md-6 col-sm-12" v-for="projet  in paginatedItems"
              :key="projet.id">
              <div class="card custom-card task-pending-card border border-dark " style="height:360px" data-aos="zoom-in" >
                <div class="card-body pt-2">
                  <div class="d-flex justify-content-between flex-wrap flex-column ">
                    <div>
                      <header>
                        <span class="carde-title ">{{truncateText(projet.NomProjet, 55)}} </span>
                      </header>
                      <div class="row align-items-center px-2">
  
                        <div class="date-box">
                          <img src="@/assets/img/logo_mobile.png" alt="">
                        </div>
  
                      </div>
  
                      <p class="my-2 fw-semibold">Date debut : <span class="fs-14 mb-1 text-warning fw-semibold">{{
                          formatDate(projet.DateDebut) }}</span></p>
                      <p class="mb-2 fw-semibold">Date fin : <span class="fs-14 mb-1  fw-semibold " style="color:red;">{{
                          formatDate(projet.DateFin)}}</span></p>
                      <p class="mb-2 fw-semibold">Financement :<span
                          class="fs-14 mb-1 text-muted fw-semibold">{{projet.ModeFinancement}}</span></p>
                      <p class="mb-2 fw-semibold">Zones :
                        <span class="fs-14 mb-1 fw-semibold" style="color:#05b305;">
                          <span v-for="(region, index) in displayedRegions(projet.regions)" :key="region.id">
                            {{ region.region.NomRegion }}
                            <span v-if="index < displayedRegions(projet.regions).length - 1">, </span>
                          </span>
                          <span v-if="projet.regions.length > 6">...</span>
                        </span>
                      </p>
  
                    </div>
                    <div>
                      <div class="w-100 d-flex justify-content-center"
                        style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                        <div class="btn-list w-100 d-flex justify-content-center">
                          <router-link v-if="hasPermission(1)" :to="{ name: 'detail-projet', params: { id: projet.id }}"
                            class="btn btn-sm btn-icon btn-success btn-wave">
                            <i class="ri-eye-line"></i>
                          </router-link>
  
                          <button v-if="hasPermission(2)" class="btn btn-sm btn-icon btn-info btn-wave"
                            data-bs-title="Add Contact" data-bs-toggle="modal" data-bs-target="#update_projet"
                            @click="HandleIdUpdate(projet.id)">
                            <i class="ri-edit-line"></i>
                          </button>
  
                          <button v-if="hasPermission(4)" class="btn btn-sm btn-icon btn-danger btn-wave"
                            @click="HandleIdDelete(projet.id)">
                            <i class="ri-delete-bin-line"></i>
                          </button>
  
                          <button class="btn btn-sm btn-icon btn-success btn-wave"
                            v-if="projet.Visible === '1' && hasPermission(2)" @click="SubmitToggleProjet(projet.CodeProjet)">
                            <i class="ri-lock-unlock-line"></i>
                          </button>
                          <button class="btn btn-sm btn-icon btn-warning btn-wave" v-else-if="hasPermission(2)" @click="SubmitToggleProjet(projet.CodeProjet)">
                            <i class="ri-lock-2-line"></i>
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
              <Pag :current-page="currentPage" :total-pages="totalPages" @page-change="updateCurrentPage" />
            </div>
          </div>
        </div>
      </div>
  
      <div class="tab-pane p-0 border-0" id="Complete" >
        <div class="card">
          <div class="card-body">
            <div class="task-card">
          <div v-if="paginatedItems.length === 0" class="noresul">
            <span> Vous n'avez pas encore de projet , vous pouvez également en ajouter un !! </span>
          </div>
          <div style="overflow-x: scroll !important" class="table-responsive" v-else  >
            <table  class="table table-hover  table-bordered table-striped" ref="table" >
              <thead>
                <tr>
  
                  <th scope="col" class="text-left"> <span class="fw-semibold">N°</span></th>
                  <th scope="col" class="text-left"> <span class="fw-semibold">Nom</span></th>
                  <th scope="col" class="text-center"> <span class="fw-semibold">Date debut</span></th>
                  <th scope="col" class="text-center"> <span class="fw-semibold">Date fin</span></th>
                  <th scope="col" class="text-center"> <span class="fw-semibold">M.Financ</span></th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item , index)  in paginatedItems" :key="index"  >
                  <td><span class="d-block  mb-1 text-left"> {{(currentPage - 1) * itemsPerPage + index + 1}}</span></td>
                  <td><span class="d-block  mb-1 text-left"> {{item.NomProjet}}</span></td>
                  <td style="width: 120px;"><span class="d-block  mb-1 text-left text-warning"> {{formatDate(item.DateDebut) }}</span></td>
                  <td style="width: 120px;"><span class="d-block  mb-1 text-left" style="color:red"> {{formatDate(item.DateFin) }}</span></td>
                  <td><span class="d-block  mb-1 text-left "> {{item.ModeFinancement }}</span></td>
  
                  <td style="width: 120px;">
                    <div class="w-100 d-flex justify-content-center"
                      style="border: 3px solid #eff2f7; background-color: white; padding: 5px;">
                      <div class="btn-list w-100 d-flex justify-content-center">
                        <router-link v-if="hasPermission(1)" :to="{ name: 'detail-projet', params: { id: item.id }}"
                          class="btn btn-sm btn-icon btn-success btn-wave">
                          <i class="ri-eye-line"></i>
                        </router-link>
  
                        <button v-if="hasPermission(2)" class="btn btn-sm btn-icon btn-info btn-wave"
                          data-bs-title="Add Contact" data-bs-toggle="modal" data-bs-target="#update_projet"
                          @click="HandleIdUpdate(item.id)">
                          <i class="ri-edit-line"></i>
                        </button>
  
                        <button v-if="hasPermission(4)" class="btn btn-sm btn-icon btn-danger btn-wave"
                          @click="HandleIdDelete(item.id)">
                          <i class="ri-delete-bin-line"></i>
                        </button>
  
                        <button class="btn btn-sm btn-icon btn-success btn-wave"
                          v-if="item.Visible === '1' && hasPermission(2)" @click="SubmitToggleProjet(item.CodeProjet)">
                          <i class="ri-lock-unlock-line"></i>
                        </button>
                        <button class="btn btn-sm btn-icon btn-warning btn-wave" v-else-if="hasPermission(2)" @click="SubmitToggleProjet(item.CodeProjet)">
                          <i class="ri-lock-2-line"></i>
                        </button>
  
  
  
                      </div>
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
          </div>
  
        </div>
       
      </div>
  
  
    </div>
  
  
    <div class="modal fade effect-rotate-bottom" id="add_projet" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="add_projet">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Ajouter un projet</b>
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
                      <label for="userpassword">Code du projet <span class="text-danger">*</span></label>
                      <MazInput v-model="step1.CodeProjet" color="info" name="CodeProjet" size="sm" rounded-size="sm"
                        type="text" />
                      <small v-if="v$.step1.CodeProjet.$error">{{
                        v$.step1.CodeProjet.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['CodeProjet']">
                        {{ resultError["CodeProjet"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Sigle du projet<span class="text-danger">*</span></label>
                      <MazInput v-model="step1.Sigle" color="info" name="Sigle" size="sm" rounded-size="sm" type="text" />
                      <small v-if="v$.step1.Sigle.$error">{{
                        v$.step1.Sigle.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Sigle']">
                        {{ resultError["Sigle"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
  
                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Nom du projet<span class="text-danger">*</span></label>
                      <MazInput v-model="step1.NomProjet" type="text" color="info" name="NomProjet" size="sm"
                        rounded-size="sm" />
                      <small v-if="v$.step1.NomProjet.$error">{{
                        v$.step1.NomProjet.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['NomProjet']">
                        {{ resultError["NomProjet"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Afficher à l'écran ?<span class="text-danger">*</span></label>
                      <MazSelect v-model="step1.Visible" color="info" name="Visible" size="sm" rounded-size="sm"
                        type="text" :options="choix" search />
                      <small v-if="v$.step1.Visible.$error">{{
                        v$.step1.Visible.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Visible']">
                        {{ resultError["Visible"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
  
                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Mode de financement du projet<span class="text-danger">*</span></label>
                      <MazSelect v-model="step1.ModeFinancement" color="info" name="ModeFinancement" size="sm"
                        rounded-size="sm" type="text" :options="FinancementOptions" search />
                      <small v-if="v$.step1.ModeFinancement.$error">{{
                        v$.step1.ModeFinancement.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['ModeFinancement']">
                        {{ resultError["ModeFinancement"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Zone d'intervention du projet<span class="text-danger">*</span></label>
                      <MazSelect v-model="step1.zones" color="info" name="zones" size="sm" rounded-size="sm" type="text"
                        :options="RegionsOptions" multiple search />
                      <small v-if="v$.step1.zones.$error">{{
                        v$.step1.zones.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['zones']">
                        {{ resultError["zones"] }}
                      </small>
                    </div>
                  </div>
                </div>

             
  
                <div class="row mt-3 content-group">
  
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="employment_date_begin">Date debut du projet </label>
                      <MazInput v-model="step1.DateDebut" type="date" color="info" name="DateDebut" size="sm"
                        rounded-size="sm" />
                      <small v-if="v$.step1.DateDebut.$error">{{
                        v$.step1.DateDebut.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['DateDebut']">
                        {{ resultError["DateDebut"] }}
                      </small>
  
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="employment_date_end">Date fin du projet </label>
                      <MazInput v-model="step1.DateFin" type="date" :min="step1.DateDebut" color="info" name="DateFin"
                        size="sm" rounded-size="sm" @change="validateDateFin" />
                      <small v-if="v$.step1.DateFin.$error">{{
                        v$.step1.DateFin.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['DateFin']">
                        {{ resultError["DateFin"] }}
                      </small>
  
                    </div>
                  </div>
                </div>
                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Niveau d'avancement global <span class="text-danger">*</span></label>
                      <MazSelect v-model="step1.NiveauAvancementGlobal" color="info" name="NiveauAvancementGlobal" size="sm" rounded-size="sm"
                        search :options="Global" />
                      <small v-if="v$.step1.NiveauAvancementGlobal.$error">{{
                        v$.step1.NiveauAvancementGlobal.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['NiveauAvancementGlobal']">
                        {{ resultError["NiveauAvancementGlobal"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Avance de démarage</label>
                      <MazInput v-model="step1.Avance" color="info" name="Avance" size="sm" rounded-size="sm" type="number" />
                      <small v-if="v$.step1.Avance.$error">{{
                        v$.step1.Avance.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Avance']">
                        {{ resultError["Avance"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
                <!-- <div class="row mt-3 content-group">
                  <div class="col-12">
                    <div class="input-groupe">
                      <label for="employment_date_begin">Taux d'exécution physique</label>
                      <MazInput v-model="step1.TauxAvancementPhysique"  color="info" name="TauxAvancementPhysique" size="sm"
                        rounded-size="sm" type="number" />
                      <small v-if="v$.step1.TauxAvancementPhysique.$error">{{
                        v$.step1.TauxAvancementPhysique.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['TauxAvancementPhysique']">
                        {{ resultError["TauxAvancementPhysique"] }}
                      </small>
  
                    </div>
                  </div>
  
                </div> -->
  
  
                <div class="row mt-3 content-group">
                
                  <div class="col-12">
                    <div class="input-groupe">
                      <label for="employment_date_begin">Description du projet</label>
                      <MazTextarea v-model="step1.Description" type="text" color="info" name="Description" size="sm"
                        rounded-size="sm" />
                      <small v-if="v$.step1.Description.$error">{{
                        v$.step1.Description.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Description']">
                        {{ resultError["Description"] }}
                      </small>
  
                    </div>
                  </div>
  
                </div>
  
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitProjet('add_projet')">
                    Enregistrer
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
  
    <!-- update projet -->
  
    <div class="modal fade effect-rotate-bottom" id="update_projet" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update_projet">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier un projet</b>
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
                      <label for="userpassword">Code du projet<span class="text-danger">*</span></label>
                      <MazInput v-model="step2.CodeProjet" color="info" name="CodeProjet" size="sm" rounded-size="sm"
                        type="text" />
                      <small v-if="v$.step2.CodeProjet.$error">{{
                        v$.step2.CodeProjet.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['CodeProjet']">
                        {{ resultError["CodeProjet"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Sigle du projet<span class="text-danger">*</span></label>
                      <MazInput v-model="step2.Sigle" color="info" name="Sigle" size="sm" rounded-size="sm" type="text" />
                      <small v-if="v$.step2.Sigle.$error">{{
                        v$.step2.Sigle.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Sigle']">
                        {{ resultError["Sigle"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
  
                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Nom du projet<span class="text-danger">*</span></label>
                      <MazInput v-model="step2.NomProjet" type="text" color="info" name="NomProjet" size="sm"
                        rounded-size="sm" />
                      <small v-if="v$.step2.NomProjet.$error">{{
                        v$.step2.NomProjet.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['NomProjet']">
                        {{ resultError["NomProjet"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Afficher à l'écran ?<span class="text-danger">*</span></label>
                      <MazSelect v-model="step2.Visible" color="info" name="Visible" size="sm" rounded-size="sm"
                        type="text" :options="choix" search />
                      <small v-if="v$.step2.Visible.$error">{{
                        v$.step2.Visible.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Visible']">
                        {{ resultError["Visible"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
  
                <div class="row mt-3 content-group">
                  <div class="col  col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Mode de financement du projet<span class="text-danger">*</span></label>
                      <MazSelect v-model="step2.ModeFinancement" color="info" name="ModeFinancement" size="sm"
                        rounded-size="sm" type="text" :options="FinancementOptions" search />
                      <small v-if="v$.step2.ModeFinancement.$error">{{
                        v$.step2.ModeFinancement.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['ModeFinancement']">
                        {{ resultError["ModeFinancement"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Zone d'intervention du projet<span class="text-danger">*</span></label>
                      <MazSelect v-model="step2.zones" color="info" name="zones" size="sm" rounded-size="sm" type="text"
                        :options="RegionsOptions" multiple search />
                      <small v-if="v$.step2.zones.$error">{{
                        v$.step2.zones.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['zones']">
                        {{ resultError["zones"] }}
                      </small>
                    </div>
                  </div>
                </div>
             
  
                <div class="row mt-3 content-group">
  
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="employment_date_begin">Date debut du projet <span class="text-danger">*</span></label>
                      <MazInput v-model="step2.DateDebut" type="date" color="info" name="DateDebut" size="sm"
                        rounded-size="sm" />
                      <small v-if="v$.step2.DateDebut.$error">{{
                        v$.step2.DateDebut.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['DateDebut']">
                        {{ resultError["DateDebut"] }}
                      </small>
  
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="employment_date_end">Date fin du projet<span class="text-danger">*</span></label>
                      <MazInput v-model="step2.DateFin" type="date" :min="step2.DateDebut" color="info" name="DateFin"
                        size="sm" rounded-size="sm" @change="validateDateFin2" />
                      <small v-if="v$.step2.DateFin.$error">{{
                        v$.step2.DateFin.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['DateFin']">
                        {{ resultError["DateFin"] }}
                      </small>
  
                    </div>
                  </div>
                </div>

                <div class="row mt-3 content-group">
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Niveau d'avancement global <span class="text-danger">*</span></label>
                      <MazSelect v-model="step2.NiveauAvancementGlobal" color="info" name="NiveauAvancementGlobal" size="sm" rounded-size="sm"
                        search :options="Global" />
                      <small v-if="v$.step2.NiveauAvancementGlobal.$error">{{
                        v$.step2.NiveauAvancementGlobal.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['NiveauAvancementGlobal']">
                        {{ resultError["NiveauAvancementGlobal"] }}
                      </small>
                    </div>
                  </div>
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword">Avance de démarage</label>
                      <MazInput v-model="step2.Avance" color="info" name="Avance" size="sm" rounded-size="sm" type="number" />
                      <small v-if="v$.step2.Avance.$error">{{
                        v$.step2.Avance.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Avance']">
                        {{ resultError["Avance"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
                <!-- <div class="row mt-3 content-group">
                  <div class="col-12">
                    <div class="input-groupe">
                      <label for="employment_date_begin">Taux d'exécution physique</label>
                      <MazInput v-model="step2.TauxAvancementPhysique"  color="info" name="TauxAvancementPhysique" size="sm"
                        rounded-size="sm" type="number" />
                      <small v-if="v$.step2.TauxAvancementPhysique.$error">{{
                        v$.step2.TauxAvancementPhysique.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['TauxAvancementPhysique']">
                        {{ resultError["TauxAvancementPhysique"] }}
                      </small>
  
                    </div>
                  </div>
  
                </div> -->
  
                <div class="row mt-3 content-group">
  
                  <div class="col-12 ">
                    <div class="input-groupe">
                      <label for="employment_date_begin">Description du projet </label>
                      <MazTextarea v-model="step2.Description" type="text" color="info" name="Description" size="sm"
                        rounded-size="sm" />
                      <small v-if="v$.step2.Description.$error">{{
                        v$.step2.Description.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['Description']">
                        {{ resultError["Description"] }}
                      </small>
  
                    </div>
                  </div>
  
                </div>
  
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdate('update_projet')">
                    Modifier
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
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
      return Math.ceil(this.projetssOptions.length / this.itemsPerPage);
    },
    paginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.projetssOptions.slice(startIndex, endIndex);
    },
    displayedRegions() {
      return (regions) => {
        return regions.slice(0, 2);
      };
    },
    connect() {
    if (!this.loggedInUser) {
      return null; // Retourne une valeur par défaut tant que `loggedInUser` n'est pas défini
    }
    return this.loggedInUser.user_role === 10 ? 0 : 1;
  }


  },
  data() {
    return {
      loading: true,
      projetssOptions: [],
      FinancementOptions: [],
      RegionsOptions: [],
      data: [],
      search: "",
      currentPage: 1,
      itemsPerPage: 12,
      totalPageArray: [],
      resultError: {},
      profil: "",
      ToId: "",
      Id: "",
      choix: [
        { label: "Oui", value: true },
        { label: "Non", value: false },
      ],
      Global :[
        { label: "Phase de conception ", value: "Phase de conception" },
        { label: "Phase d’exécution ", value: "Phase d’exécution" },
        { label: "Phase de clôture ", value: "Phase de clôture" },
        ],
      step1: {
        CodeProjet: "",
        Sigle: "",
        NomProjet: "",
        ModeFinancement: "",
        Visible: "",
        DateDebut: "",
        DateFin: '',
        zones: [],
        Description: '',
        Avance:"",
         NiveauAvancementGlobal:"",
      },
      step2: {
        CodeProjet: "",
        Sigle: "",
        NomProjet: "",
        ModeFinancement: "",
        Visible: "",
        DateDebut: "",
        DateFin: '',
        zones: [],
        Description: '',
        Avance:"",
         NiveauAvancementGlobal:"",
      },
      v$: useVuelidate(),
      error: "",
    };
  },
  watch: {
  loggedInUser(newUser) {
    if (newUser) {
      console.log('connect', this.connect, typeof(this.connect));
      this.fetchProjets(); // Appeler l'action lorsque `loggedInUser` est chargé
    }
  }
},
  validations: {
    step1: {
      CodeProjet: { require },
      Sigle: { require },
      NomProjet: { require },
      ModeFinancement: { require },
      Visible: { require },
      DateDebut: {  },
      DateFin: {  },
      zones: { require },
      Avance: {  },
       NiveauAvancementGlobal:{ require },
      Description: {},

    },
    step2: {
      CodeProjet: { require },
      Sigle: { require },
      NomProjet: { require },
      ModeFinancement: { require },
      Visible: { require },
      DateDebut: { require },
      DateFin: { require },
      zones: { require },
      Avance: {  },
      Description: {},
       NiveauAvancementGlobal:{ require },
    },
  },

  async mounted() {
    
    await this.fetchProjets()
    await this.fetchFinancement()
    await this.fetchRegionOptions()
    localStorage.removeItem('activeTab');
  


  },

  methods: {
    successmsg: successmsg,
   
    truncateText(text, maxLength) {
      if (text.length <= maxLength) {
        return text;
      }
      return text.substring(0, maxLength) + '...';
    },


    swaaa(id) {
      Swal.fire({

        title: "Création de projet",
        text: "Votre projet a été crée avec succès !",
        icon: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {

          this.$router.push({ path: '/bspp/detail-projet/' + id });
        }
      });
    },
    async fetchProjets() {
    
      try {
        const response = await axios.get('/projets', {
          headers: { Authorization: `Bearer ${this.loggedInUser.token}`, },
          params:{for_con_user:this.connect  ,  visible: null }
        });
       
        this.data = response.data.data;
        this.projetssOptions = this.data;
        
        console.log("this.usersOptions", this.projetssOptions);
        this.loading = false;

      } catch (error) {
        console.error('errorqqqqq', error);

        if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
          await this.$store.dispatch('auth/clearMyAuthenticatedUser');
          this.$router.push("/");  //a revoir
        }
      }
    },
    async fetchFinancement() {
      try {
        const response = await axios.get('/mode-financements',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            params: {
              statut: false
            }
          }
        );

        console.log("responseclienteschools-level", response.data);
        if (response.data.status === "success") {

          this.FinancementOptions = response.data.data.map(item => ({
            label: item.Intitule,
            value: item.Code,
          }));
          this.loading = false
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
    async fetchRegionOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchRegionOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getRegionOptions2"])


        ); // Accéder aux options des pays via le getter
        const filteredOptions = options.filter(item => item.Statut === '1');
        console.log(options);
        this.RegionsOptions = filteredOptions.map(item => ({
          label: item.NomRegion,
          value: item.CodeRegion,
        }));;
        console.log(this.RegionsOptions);

        // Affecter les options à votre propriété sortedCountryOptions
        this.loading = false
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
      }
    },
    validateDateFin() {
      if (this.step1.DateFin && this.step1.DateDebut && this.step1.DateFin < this.step1.DateDebut) {
        this.resultError['DateFin'] = "La date de fin ne peut pas être inférieure à la date de début.";
        return false;
      }
      this.resultError['DateFin'] = ""; // Effacer l'erreur si tout est bon
      return true;
    },
    validateDateFin2() {
      if (this.step2.DateFin && this.step2.DateDebut && this.step2.DateFin < this.step2.DateDebut) {
        this.resultError['DateFin'] = "La date de fin ne peut pas être inférieure à la date de début.";
        return false;
      }
      this.resultError['DateFin'] = ""; // Effacer l'erreur si tout est bon
      return true;
    },
    async submitProjet(modalId) {
      this.error = '',
        this.resultError = {}
      if (!this.validateDateFin()) {
        return;
      }
      this.v$.step1.$touch()
      if (this.v$.$errors.length == 0) {

        this.loading = true
        let DataUser = {
          CodeProjet: this.step1.CodeProjet,
          Sigle: this.step1.Sigle,
          NomProjet: this.step1.NomProjet,
          ModeFinancement: this.step1.ModeFinancement,
          DateDebut: this.step1.DateDebut,
          DateFin: this.step1.DateFin,
          Description: this.step1.Description,
          zones: this.step1.zones,
          Visible: this.step1.Visible,
          Avance: this.step1.Avance,
         NiveauAvancementGlobal:this.step1.NiveauAvancementGlobal

        }
        console.log("eeeee", DataUser);
        try {

          const response = await axios.post('/projets', DataUser, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },


          });
          console.log('response.login', response.data);
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.step1 =  {
              CodeProjet: "",
              Sigle: "",
              NomProjet: "",
              ModeFinancement: "",
              Visible: "",
              DateDebut: "",
              DateFin: '',
              zones: [],
              Description: '',
              Avance:"",
              NiveauAvancementGlobal:"",
         },
         this.v$.step1.$reset();
            this.successmsg("Création de projet", 'Votre projet a été crée avec succès !')
            await this.fetchProjets()

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
      } else {

        console.log('pas bon', this.v$.$errors);

      }
    },
    async SubmitToggleProjet(id) {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, modifiez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        this.ToggleProjet(id);
      }
    },
    async ToggleProjet(code) {
      this.loading = true
      try {
        const response = await axios.get(`/projets/projet-visible/${code}`,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
           
          }
        );

        if (response.data.status === "success") {
          this.successmsg(
              "Données du projet mises à jour",
              "Les données du projet ont été mises à jour avec succès !"
            );
            await this.fetchProjets()
          
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
      this.step2 =  {
              CodeProjet: "",
              Sigle: "",
              NomProjet: "",
              ModeFinancement: "",
              Visible: "",
              DateDebut: "",
              DateFin: '',
              zones: [],
              Description: '',
              Avance:"",
              NiveauAvancementGlobal:"",
         },
      this.loading = true;

      try {
        const response = await axios.get(`/projets/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response) {
          console.log("responsedata", response);
          let data = response.data.data;
          this.step2.CodeProjet = data.CodeProjet,
            this.step2.Sigle = data.Sigle,
            this.step2.NomProjet = data.NomProjet,
            this.step2.ModeFinancement = data.ModeFinancement,
            this.step2.Visible = (data.Visible === "1") ? true : false,
            this.step2.DateDebut = data.DateDebut,
            this.step2.DateFin = data.DateFin,
            this.step2.Description = data.Description
            this.step2.Avance = data.Avance
           this.step2.NiveauAvancementGlobal = data.NiveauAvancementGlobal
          const ZonesIds = data.regions.map(zone => zone.CodeRegion);
          console.log('zz', ZonesIds);
          this.step2.zones = ZonesIds
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

    async submitUpdate(modalId) {
      this.error = '',
        this.resultError = {}
      if (!this.validateDateFin2()) {
        return;
      }
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true
        const data = {
          projet: this.step2.CodeProjet,
          CodeProjet: this.step2.CodeProjet,
          Sigle: this.step2.Sigle,
          NomProjet: this.step2.NomProjet,
          ModeFinancement: this.step2.ModeFinancement,
          DateDebut: this.step2.DateDebut,
          DateFin: this.step2.DateFin,
          Description: this.step2.Description,
          zones: this.step2.zones,
           NiveauAvancementGlobal:this.step2.NiveauAvancementGlobal,
           Avance:this.step2.Avance,
          Visible: this.step2.Visible
        }

        console.log(data);
        try {
          const response = await axios.put(`/projets/${this.ToId}`, data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },

          });

          console.log("usersOptions", response.data);
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Données du projet mises à jour",
              "Les données du projet ont été mises à jour avec succès !"
            );
            await this.fetchProjets();
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



      } else {
        console.log("cest pas bon ", this.v$.$errors);
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
        const response = await axios.delete(`/projets/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Projet supprimé",
            "Projet  a été supprimé avec succès."
          );
          await this.fetchProjets();
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
    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },
    filterByName() {
      this.currentPage = 1;
      if (this.search !== null) {
        const tt = this.search;
        const searchValue = tt.toLowerCase();
        this.projetssOptions = this.data.filter((user) => {
          const Nom = user.NomProjet || "";
          const Code = user.CodeProjet || "";
          const Sigle = user.Sigle || "";
          const debut = user.DateDebut || "";
          const fin = user.DateFin || "";
          const Mode = user.ModeFinancement || "";
          return (
            Nom.toLowerCase().includes(searchValue) ||
            Code.toLowerCase().includes(searchValue) ||
            Mode.toLowerCase().includes(searchValue) ||
            debut.toLowerCase().includes(searchValue) ||
            fin.toLowerCase().includes(searchValue) ||
            Sigle.toLowerCase().includes(searchValue)
          );
        });
      } else {
        this.projetssOptions = [...this.data];
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
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
    exportToExcel() {
      const data = this.data.map(item => ({
        Nom : item.NomProjet,
        'Date de début': this.formatDate(item.DateDebut),
        'Date de fin': this.formatDate(item.DateFin),
        'Mode de Financement': item.ModeFinancement,
        'Nbre de  zone' : item.regions.length
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Liste des projets');

      XLSX.writeFile(workbook, 'listes_des_projets.xlsx');
    },
    exportToCSV() {
      const data = this.data.map(item => ({
        Nom: item.NomProjet,
        'Date debut': this.formatDate(item.DateDebut),
        'Date fin': this.formatDate(item.DateFin),
        'Mode de Financement': item.ModeFinancement,
        'Nbre de  zone' : item.regions.length
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'listes_des_projets.csv';
      link.click();
    },
    exportPDF() {
      const doc = new jsPDF('landscape'); // 'landscape' pour le format paysage

      // Ajouter un titre
      doc.setFontSize(18);
      doc.text('Liste des projets', 14, 22);

      // Ajouter la table
      doc.autoTable({
        startY: 30, // Positionner la table sous le titre
        head: [['Nom', 'Date début', 'Date fin', 'Mode Financement', 'Nbre de  zone']],
        body: this.data.map(item => [
          item.NomProjet,
          this.formatDate(item.DateDebut),
          this.formatDate(item.DateFin),
          item.ModeFinancement,
          item.regions.length
          
        ]),
      });

      // Sauvegarder le PDF
      doc.save('liste_des_projets.pdf');
    },
    exportToWord() {
      const tableHtml = this.$refs.table.innerHTML; // Assurez-vous de référencer la table dans le template avec ref="table"
      const blob = htmlDocx.asBlob(tableHtml);
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'projets.docx';
      link.click();
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

    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
      });
    },
    // updatePaginatedItems() {
    //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;

    //   const endIndex = startIndex + this.itemsPerPage;
    //   return this.projetssOptions.slice(startIndex, endIndex);
    // },
  },

};
  </script>
  <style lang="css" scoped>
.texte {
    margin-top: 10px;
  }
  
  .carde-title {
    display: inline-block;
    font-size: 14px;
    font-weight: 700;
    transition: all 0.5s ease-in-out;
    top: -41px;
    right: 24px;
    width: 100%;
    text-transform: uppercase;
  
  }
  
  .carde-title:hover {
    transform: translate3d(0px, 0px, 60px);
  }
  
  
  
  .date-box {
  
    height: 80px;
    width: 80Px;
    border: 1px solid #fff;
    padding: 0 !important;
    border-radius: 50%;
  
  }
  
  .date-box img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
</style>
  