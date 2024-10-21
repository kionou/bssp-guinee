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
  
          <button v-if="hasPermission(3)" class="btn btn-icon btn-primary ms-2" data-bs-placement="top"
            data-bs-title="Add Contact" data-bs-toggle="modal" data-bs-target="#create-infrastructure">
            <i class="ri-add-line"> </i>
          </button>
        </div>
      </div>
    </div>
    <div class="row task-card" data-aos="zoom-in">
      <div v-if="paginatedItems.length === 0" class="noresul">
        <span> Vous n'avez pas encore d'infrastructure, vous pouvez également en ajouter une !! </span>
      </div>
      <div style="overflow-x: scroll !important" class="table-responsive" v-else>
        <div class="btn-list text-end mb-2">
          <button class="btn btn-danger  label-btn" @click=" exportPDF">
            <i class="bi bi-filetype-pdf label-btn-icon me-1"></i>
            Exporter en pdf
          </button>
          <button class="btn btn-info label-btn" @click=" exportToCSV">
            <i class="bi bi-filetype-csv label-btn-icon me-1"></i>
            Exporter en csv
          </button>
          <button class="btn btn-success label-btn" @click=" exportToExcel">
            <i class="bi bi-file-earmark-excel label-btn-icon me-1"></i>
            Exporter en excel
          </button>
  
  
  
        </div>
        <table class="table text-nowrap table-bordered">
          <thead>
            <tr>
              <th scope="col">Code</th>
              <th scope="col">Nom</th>
              <th scope="col">Date début prévue</th>
              <th scope="col">date fin prévue</th>
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
                      <img v-if="item.Logo.includes('https')" :src="item.Logo" alt="" @click="openGallery(item.Logo)">
                      <img v-else src="@/assets/img/logo_mobile.png" alt="">
  
                    </span>
                  </div>
                  <div>{{ item.NomInfrastructure }}</div>
                </div>
              </td>
              <td class="text-warning">
                {{ formatDate(item.DateDebut) }}
              </td>
              <td style="color:red">
                {{ formatDate(item.DateFin) }}
              </td>
              <td>
                {{ item.MaitreOuvrage }}
              </td>
              <td>
  
                <div class="btn-list w-100 d-flex justify-content-center">
                  <div>
                    <div class="btn btn-sm  btn-success btn-wave" v-if="item.Visible === '1'">
                      <i class="ri-lock-unlock-line"></i>
                    </div>
                    <button class="btn btn-sm  btn-warning btn-wave" v-if="item.Visible === '0'">
                      <i class="ri-lock-2-line"></i>
                    </button>
                  </div>
  
                </div>
              </td>
  
              <td>
                <div class="hstack gap-2 fs-1">
                  <router-link v-if="hasPermission(1)" :to="{ name: 'detail_infrastructures', params: { id: item.id }}"
                    class="btn btn-sm btn-icon btn-primary btn-wave">
                    <i class="ri-eye-line"></i>
                  </router-link>
                  <button v-if="hasPermission(2)" class="btn btn-sm btn-icon btn-info btn-wave " data-bs-toggle="modal"
                    data-bs-target="#update-infrastructure" @click="HandleIdUpdateInfra(item.id)">
                    <i class="ri-edit-line"></i>
                  </button>
  
                  <button v-if="hasPermission(4)" class="btn btn-sm btn-icon btn-danger btn-wave"
                    @click="HandleIdDeleteInfrastructure(item.id)">
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
  
  
    <div class="modal fade effect-rotate-bottom" id="create-infrastructure" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="create-infrastructure">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Créer une infrastructure</b>
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
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="MaitreOuvrage">Maître d'ouvrage<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.MaitreOuvrage" color="info" name="MaitreOuvrage" size="sm" rounded-size="sm"
                    type="text" />
                  <small v-if="v$.step1.MaitreOuvrage.$error">{{ v$.step1.MaitreOuvrage.$errors[0].$message}}</small>
                  <small v-if="resultError['MaitreOuvrage']"> {{ resultError["MaitreOuvrage"] }} </small>
                </div>
                
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="infrastructure_id">Bureau de contrôle<span class="text-danger">*</span></label>
                  <div class="row">
                    <div class="col-10">
                  <MazSelect v-model="step1.CodeMission" color="info" name="CodeMission" size="sm"
                    rounded-size="sm" :options="MissionsOptions" search />
                  <small v-if="v$.step1.CodeMission.$error">{{
                    v$.step1.CodeMission.$errors[0].$message}}</small>
                  <small v-if="resultError['CodeMission']"> {{ resultError["CodeMission"] }} </small>
                  </div>
                
                  <div class="col-2 p-0" v-if="hasPermission(3)">
                    <button  class="btn btn-icon btn-primary ms-2" @click="handleModal(1)" >
                    <i class="ri-add-line"> </i>
                  </button>
                  </div>
                  </div>
                 
                </div>
              
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="EntrepriseResponsable">Entreprise de travaux<span class="text-danger">*</span></label>
                  <div class="row">
                    <div class="col-10">
                      <MazSelect v-model="step1.EntrepriseResponsable" color="info" name="EntrepriseResponsable" size="sm"
                    rounded-size="sm" search :options="EntrepriseOptions" />
                  <small v-if="v$.step1.EntrepriseResponsable.$error">{{
                    v$.step1.EntrepriseResponsable.$errors[0].$message}}</small>
                  <small v-if="resultError['EntrepriseResponsable']"> {{ resultError["EntrepriseResponsable"] }} </small>
                    </div>
                    <div class="col-2 p-0" v-if="hasPermission(3)">
                    <button  class="btn btn-icon btn-primary ms-2" @click="handleModal(2)" >
                    <i class="ri-add-line"> </i>
                  </button>
                  </div>
                  </div>
                
                </div>
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Code">Code<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.CodeInfrastructure" color="info" name="CodeInfrastructure" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step1.CodeInfrastructure.$error">{{
                    v$.step1.CodeInfrastructure.$errors[0].$message}}</small>
                  <small v-if="resultError['CodeInfrastructure']"> {{ resultError["CodeInfrastructure"] }} </small>
                </div>
  
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Nom">Nom<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.NomInfrastructure" color="info" name="NomInfrastructure" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step1.NomInfrastructure.$error">{{
                    v$.step1.NomInfrastructure.$errors[0].$message}}</small>
                  <small v-if="resultError['NomInfrastructure']"> {{ resultError["NomInfrastructure"] }} </small>
  
                </div>
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Sigle">Coût infrastructure<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.Cost" color="info" name="Cost" size="sm" rounded-size="sm" type="number" />
                  <small v-if="v$.step1.Cost.$error">{{ v$.step1.Cost.$errors[0].$message}}</small>
                  <small v-if="resultError['Cost']"> {{ resultError["Cost"] }} </small>
                </div>
  
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="date_start">Date de début prévue<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.DateDebut" color="info" name="DateDebut" size="sm" rounded-size="sm"
                    type="date" />
                  <small v-if="v$.step1.DateDebut.$error">{{ v$.step1.DateDebut.$errors[0].$message}}</small>
                  <small v-if="resultError['DateDebut']"> {{ resultError["DateDebut"] }} </small>
                </div>
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="date_end">Date fin prévue<span class="text-danger">*</span></label>
                  <MazInput v-model="step1.DateFin" :min="step1.DateDebut" color="info" name="DateFin" size="sm"
                    rounded-size="sm" type="date" @change="validateDateFin" />
                  <small v-if="v$.step1.DateFin.$error">{{ v$.step1.DateFin.$errors[0].$message}}</small>
                  <small v-if="resultError['DateFin']"> {{ resultError["DateFin"] }} </small>
                </div>
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Logo">Logo</label>
                  <input type="file" class="form-control" id="contact-mail" @change="handleFileUploadLogo"
                    accept="image/*">
                    <small class="fs-13">Formats autorisés : PNG, JPG, JPEG | Taille maximale : 2048 Mo</small>
                  <small v-if="v$.step1.Logo.$error">{{ v$.step1.Logo.$errors[0].$message}}</small>
                  <small v-if="resultError['Logo']"> {{ resultError["Logo"] }} </small>
                </div>
  
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="infrastructure_id">Type d'infrastructure<span class="text-danger">*</span></label>
                  
                  <div class="row">
                    <div class="col-12">
                      <MazSelect v-model="step1.TypeInfrastructure" color="info" name="TypeInfrastructure" size="sm"
                    rounded-size="sm" :options="TypesOptions" search />
                  <small v-if="v$.step1.TypeInfrastructure.$error">{{
                    v$.step1.TypeInfrastructure.$errors[0].$message}}</small>
                  <small v-if="resultError['TypeInfrastructure']"> {{ resultError["TypeInfrastructure"] }} </small>
                    </div>
                    <!-- <div class="col-2 p-0">
                    <button  class="btn btn-icon btn-primary ms-2" @click="handleModal" >
                    <i class="ri-add-line"> </i>
                  </button>
                  </div> -->
                  </div>
                
                 
                 
                </div>

                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Localité">Localité<span class="text-danger">*</span></label>
                  <MazSelect v-model="step1.LocalitesConcernees" color="info" name="LocalitesConcernees" size="sm"
                    rounded-size="sm" :options="formattedRegionsOptions"  />
                  <small v-if="v$.step1.LocalitesConcernees.$error">{{
                    v$.step1.LocalitesConcernees.$errors[0].$message}}</small>
                  <small v-if="resultError['LocalitesConcernees']"> {{ resultError["LocalitesConcernees"] }} </small>
  
                </div>
  
  
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="projet_id">Geo Infrastructure</label>
                  <MazInput v-model="step1.GeoInfrastructure" color="info" name="GeoInfrastructure" size="sm"
                    rounded-size="sm" placeholder="12.22 , -23.33" />
                  <small v-if="v$.step1.GeoInfrastructure.$error">{{
                    v$.step1.GeoInfrastructure.$errors[0].$message}}</small>
                  <small v-if="resultError['GeoInfrastructure']"> {{ resultError["GeoInfrastructure"] }} </small>
                </div>
  
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Visibilite">Visibilite<span class="text-danger">*</span></label>
                  <MazSelect v-model="step1.Visible" color="info" name="Visible" size="sm" rounded-size="sm"
                    :options="choix" />
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
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
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
  
  
    <div class="modal fade effect-rotate-bottom" id="update-infrastructure" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update-infrastructure">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier une infrastructure</b>
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
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="MaitreOuvrage">Maître d'ouvrage<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.MaitreOuvrage" color="info" name="MaitreOuvrage" size="sm" rounded-size="sm"
                    type="text" />
                  <small v-if="v$.step2.MaitreOuvrage.$error">{{ v$.step2.MaitreOuvrage.$errors[0].$message}}</small>
                  <small v-if="resultError['MaitreOuvrage']"> {{ resultError["MaitreOuvrage"] }} </small>
                </div>
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="infrastructure_id">Bureau de contrôle<span class="text-danger">*</span></label>
                  <div class="row">
                    <div class="col-12">
                  <MazSelect v-model="step2.CodeMission" color="info" name="CodeMission" size="sm"
                    rounded-size="sm" :options="MissionsOptions" search />
                  <small v-if="v$.step2.CodeMission.$error">{{
                    v$.step2.CodeMission.$errors[0].$message}}</small>
                  <small v-if="resultError['CodeMission']"> {{ resultError["CodeMission"] }} </small>
                  </div>
                
                 
                  </div>
                 
                </div>
                
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="EntrepriseResponsable">Entreprise de travaux<span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.EntrepriseResponsable" color="info" name="EntrepriseResponsable" size="sm"
                    rounded-size="sm" search :options="EntrepriseOptions" />
                  <small v-if="v$.step2.EntrepriseResponsable.$error">{{
                    v$.step2.EntrepriseResponsable.$errors[0].$message}}</small>
                  <small v-if="resultError['EntrepriseResponsable']"> {{ resultError["EntrepriseResponsable"] }} </small>
                </div>
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Code">Code<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.CodeInfrastructure" color="info" name="CodeInfrastructure" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.CodeInfrastructure.$error">{{
                    v$.step2.CodeInfrastructure.$errors[0].$message}}</small>
                  <small v-if="resultError['CodeInfrastructure']"> {{ resultError["CodeInfrastructure"] }} </small>
                </div>
  
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Nom">Nom<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.NomInfrastructure" color="info" name="NomInfrastructure" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.step2.NomInfrastructure.$error">{{
                    v$.step2.NomInfrastructure.$errors[0].$message}}</small>
                  <small v-if="resultError['NomInfrastructure']"> {{ resultError["NomInfrastructure"] }} </small>
  
                </div>
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Sigle">Coût infrastructure <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.Cost" color="info" name="Cost" size="sm" rounded-size="sm" type="number" />
                  <small v-if="v$.step2.Cost.$error">{{ v$.step2.Cost.$errors[0].$message}}</small>
                  <small v-if="resultError['Cost']"> {{ resultError["Cost"] }} </small>
                </div>
  
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="date_start">Date de debut prévue<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.DateDebut" color="info" name="DateDebut" size="sm" rounded-size="sm"
                    type="date" />
                  <small v-if="v$.step2.DateDebut.$error">{{ v$.step2.DateDebut.$errors[0].$message}}</small>
                  <small v-if="resultError['DateDebut']"> {{ resultError["DateDebut"] }} </small>
                </div>
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="date_end">Date fin prévue<span class="text-danger">*</span></label>
                  <MazInput v-model="step2.DateFin" :min="step2.DateDebut" color="info" name="DateFin" size="sm"
                    rounded-size="sm" type="date" @change="validateDateFin2" />
                  <small v-if="v$.step2.DateFin.$error">{{ v$.step2.date_start.$errors[0].$message}}</small>
                  <small v-if="resultError['DateFin']"> {{ resultError["DateFin"] }} </small>
                </div>
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Logo">Logo<span class="text-danger">*</span></label>
                  <input type="file" class="form-control" id="contact-mail" @change="handleFileUploadLogoUpdate"
                    accept="image/*">
                  <!-- <small v-if="v$.step2.Logo.$error">{{ v$.step2.Logo.$errors[0].$message}}</small> -->
                  <small v-if="resultError['Logo']"> {{ resultError["Logo"] }} </small>
                </div>
  
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="infrastructure_id">Type d'infrastructure<span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.TypeInfrastructure" color="info" name="TypeInfrastructure" size="sm"
                    rounded-size="sm" :options="TypesOptions" search />
                  <small v-if="v$.step2.TypeInfrastructure.$error">{{
                    v$.step2.TypeInfrastructure.$errors[0].$message}}</small>
                  <small v-if="resultError['TypeInfrastructure']"> {{ resultError["TypeInfrastructure"] }} </small>
                </div>
                
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="Localité">Localité<span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.LocalitesConcernees" color="info" name="LocalitesConcernees" size="sm"
                    rounded-size="sm" :options="formattedRegionsOptions"  />
                  <small v-if="v$.step2.LocalitesConcernees.$error">{{
                    v$.step2.LocalitesConcernees.$errors[0].$message}}</small>
                  <small v-if="resultError['LocalitesConcernees']"> {{ resultError["LocalitesConcernees"] }} </small>
  
                </div>
  
  
                <div class="col-xl-4 col-md-6 col-sm-12">
                  <label for="projet_id">Geo Infrastructure</label>
                  <MazInput v-model="step2.GeoInfrastructure" color="info" name="GeoInfrastructure" size="sm"
                    rounded-size="sm" placeholder="12.22 , -23.33" />
                  <small v-if="v$.step2.GeoInfrastructure.$error">{{
                    v$.step2.GeoInfrastructure.$errors[0].$message}}</small>
                  <small v-if="resultError['GeoInfrastructure']"> {{ resultError["GeoInfrastructure"] }} </small>
                </div>
  
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Visibilite">Visibilite<span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.Visible" color="info" name="Visible" size="sm" rounded-size="sm"
                    :options="choix" />
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
                  <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close">
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


      <!-- Start::  create mission -->
  
  
      <div class="modal fade effect-rotate-bottom" id="create_controle" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="create_controle">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Ajouter un bureau de contrôle</b>
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
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Code">Code du contrôle<span class="text-danger">*</span></label>
                  <MazInput v-model="mission.CodeMission" color="info" name="CodeMission" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.mission.CodeMission.$error">{{
                    v$.mission.CodeMission.$errors[0].$message}}</small>
                  <small v-if="resultError['CodeMission']"> {{ resultError["CodeMission"] }} </small>
                </div>
  
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Nom">Nom du contrôle<span class="text-danger">*</span></label>
                  <MazInput v-model="mission.NomMission" color="info" name="NomMission" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.mission.NomMission.$error">{{
                    v$.mission.NomMission.$errors[0].$message}}</small>
                  <small v-if="resultError['NomMission']"> {{ resultError["NomMission"] }} </small>
  
                </div>
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Sigle">Description du contrôle</label>
                  <MazTextarea v-model="mission.Description" color="info" name="Description" size="sm" rounded-size="sm"  />
                  <small v-if="v$.mission.Description.$error">{{ v$.mission.Description.$errors[0].$message}}</small>
                  <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>
                </div>
                <div class="row mb-3">
                  <div class="boutton">
                    <button class="" @click.prevent="submitMission('create_controle',1)">
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
      <!-- End:: update infrastructure -->
    </div>

     <!-- Start::  create mission -->
  
  
     <div class="modal fade effect-rotate-bottom" id="create_entreprise" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="create_entreprise">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Ajouter une entreprise  de travaux</b>
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
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Code">Code de l'entreprise  de travaux<span class="text-danger">*</span></label>
                  <MazInput v-model="mission.CodeMission" color="info" name="CodeMission" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.mission.CodeMission.$error">{{
                    v$.mission.CodeMission.$errors[0].$message}}</small>
                  <small v-if="resultError['CodeMission']"> {{ resultError["CodeMission"] }} </small>
                </div>
  
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Nom">Nom de l'entreprise  de travaux<span class="text-danger">*</span></label>
                  <MazInput v-model="mission.NomMission" color="info" name="NomMission" size="sm"
                    rounded-size="sm" type="text" />
                  <small v-if="v$.mission.NomMission.$error">{{
                    v$.mission.NomMission.$errors[0].$message}}</small>
                  <small v-if="resultError['NomMission']"> {{ resultError["NomMission"] }} </small>
  
                </div>
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Sigle">Description de l'entreprise  de travaux</label>
                  <MazTextarea v-model="mission.Description" color="info" name="Description" size="sm" rounded-size="sm"  />
                  <small v-if="v$.mission.Description.$error">{{ v$.mission.Description.$errors[0].$message}}</small>
                  <small v-if="resultError['Description']"> {{ resultError["Description"] }} </small>
                </div>
                <div class="row mb-3">
                  <div class="boutton">
                    <button class="" @click.prevent="submitMission('create_entreprise' , 2)">
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
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.min.css';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
export default {
  name: "ComponentlisteInfra",
  props: {
    data: {
      type: Object,
      required: true
    },
    InfrastructuresOptions: {
      type: Array,
      required: true
    },

  },

  components: { Loading, MazPhoneNumberInput, Pag },
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
      Code: "",
      search: "",
      currentPage: 1,
      itemsPerPage: 12,
      totalPageArray: [],
      MissionsOptions:[],
      EntrepriseOptions:[],
      TypesOptions: [],
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
        Cost: "",
        CodeProjet: "",
        Logo: "",
        NomInfrastructure: "",
        MaitreOuvrage: "",
        EntrepriseResponsable: "",
        DateDebut: "",
        DateFin: "",
        GeoInfrastructure: "",
        LocalitesConcernees: "",
        TypeInfrastructure: "",
        CodeMission: "",
        Visible: "",

      },
      step2: {
        CodeInfrastructure: "",
        Cost: "",
        CodeProjet: "",
        Logo: "",
        NomInfrastructure: "",
        MaitreOuvrage: "",
        EntrepriseResponsable: "",
        DateDebut: "",
        DateFin: "",
        GeoInfrastructure: "",
        LocalitesConcernees: "",
        TypeInfrastructure: "",
        CodeMission: "",
        Visible: "",

      },
      mission:{
        CodeMission:"",
        NomMission:"",
        Description:"",
      }


    };
  },
  validations: {
    step1: {
      CodeInfrastructure: { require },
      Cost: { require },
      Logo: {},
      NomInfrastructure: { require },
      MaitreOuvrage: { require },
      EntrepriseResponsable: { require },
      DateDebut: { require },
      DateFin: { require },
      GeoInfrastructure: {},
      LocalitesConcernees: { require },
      TypeInfrastructure: { require },
      CodeMission: { require },
      Visible: { require },
    },
    step2: {
      CodeInfrastructure: { require },
      Cost: { require },
      Logo: {},
      NomInfrastructure: { require },
      MaitreOuvrage: { require },
      EntrepriseResponsable: { require },
      DateDebut: { require },
      DateFin: { require },
      GeoInfrastructure: {},
      LocalitesConcernees: { require },
      TypeInfrastructure: { require },
      Visible: { require },
      CodeMission: { require },
    },
    mission:{
        CodeMission: { require },
        NomMission: { require },
        Description: {  },
      }
  },
  watch: {
   
    data: {
      handler(newVal) {
      
        this.Code = newVal.CodeProjet;
        this.fetchData(newVal.infrastructures)


      },
      deep: true,
      immediate: true
    },
  },

  async mounted() {
  
    await this.fetchTypes();
    await this.fetchControle()


  },
  methods: {
    successmsg: successmsg,
    fetchData(a) {
      return a
    },
    openGallery(imageUrl) {
      const lightbox = GLightbox({
        elements: [{
          href: imageUrl,
          type: 'image'
        }]
      });
      lightbox.open();
    },
    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },
    handleCodeProjetChange(codeProjet) {

      this.Code = codeProjet
      // Par exemple, mettre à jour les indicateurs ou autres données
    },
    async fetchTypes() {
      try {
        const response = await axios.get('/infrastructures/types',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );


        if (response.data.status === "success") {
          const filteredOptions = response.data.data.filter(item => item.Visible === '1');
          this.TypesOptions = filteredOptions.map(item => ({
            label: item.Intitule,
            value: item.id,
          }))
       

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

    async fetchControle() {
      try {
        const response = await axios.get('/missions',
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
          }
        );

     console.log('response',response.data.data)
        if (response.data.status === "success") {
   
          this.MissionsOptions = response.data.data
          .filter(i => i.Statut ==="1" )
          .map(item => ({
            label: item.NomMission,
            value: item.CodeMission,
          }))

          this.EntrepriseOptions = response.data.data
          .filter(i => i.Statut ==="2" )
          .map(item => ({
            label: item.NomMission,
            value: item.CodeMission,
          }))
   

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
    handleFileUploadLogo(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("handleFileUploadLogo Selected file:", file);
      // this.submitFile(file )
      this.step1.Logo = file

    },
    handleFileUploadLogoUpdate(event) {
      console.log("File input change");
      const file = event.target.files[0];
      console.log("handleFileUploadLogo Selected file:", file);
      // this.submitFile(file )
      this.step2.Logo = file

    },


    async submitFile(file) {
      const formData = new FormData();
      formData.append('Fichier', file);


      try {
        const response = await axios.post('/recruitment/insurance/uploads', formData, {
          headers: {

            'Content-Type': 'multipart/form-data'
          }
        });
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
   
    async submitInfrastructure(modalId) {
      this.error = '';
      this.resultError = {};

      // Vérifiez la validité de la date de fin
      if (!this.validateDateFin()) {
        return;
      }

      this.v$.step1.$touch();

      // Vérifiez les erreurs de validation
      if (this.v$.$errors.length == 0) {
        this.loading = true;

        // Vérifiez si les champs de coordonnées sont vides
        if (!this.step1.GeoInfrastructure || this.step1.GeoInfrastructure.length === 0) {
          try {
            const position = await this.getCurrentPosition();
            this.step1.GeoInfrastructure = [position.coords.latitude, position.coords.longitude];
          } catch (error) {
            console.error('Erreur lors de la récupération des coordonnées :', error);
            this.error = "Impossible de récupérer votre position actuelle.";
            this.loading = false;
            return;
          }
        }

        let data = {
          CodeInfrastructure: this.step1.CodeInfrastructure,
          CodeProjet: this.step1.CodeProjet,
          Logo: this.step1.Logo,
          NomInfrastructure: this.step1.NomInfrastructure,
          MaitreOuvrage: this.step1.MaitreOuvrage,
          EntrepriseResponsable: this.step1.EntrepriseResponsable,
          DateDebut: this.step1.DateDebut,
          DateFin: this.step1.DateFin,
          GeoInfrastructure: this.step1.GeoInfrastructure,
          LocalitesConcernees: this.step1.LocalitesConcernees,
          TypeInfrastructure: this.step1.TypeInfrastructure,
          CodeMission: this.step1.CodeMission,
          Visible: this.step1.Visible,
          CodeProjet: this.Code,
        };

        console.log('data', data);

        const formData = new FormData();
        formData.append("CodeInfrastructure", this.step1.CodeInfrastructure);
        formData.append("CodeProjet", this.Code);
        formData.append("Cost", this.step1.Cost);
        formData.append("Logo", this.step1.Logo);
        formData.append("NomInfrastructure", this.step1.NomInfrastructure);
        formData.append("MaitreOuvrage", this.step1.MaitreOuvrage);
        formData.append("CodeMission", this.step1.CodeMission);
        formData.append("EntrepriseResponsable", this.step1.EntrepriseResponsable);
        formData.append("DateDebut", this.step1.DateDebut);
        formData.append("DateFin", this.step1.DateFin);
        formData.append("GeoInfrastructure[]", this.step1.GeoInfrastructure);
        formData.append("LocalitesConcernees[]", this.step1.LocalitesConcernees);
        formData.append("TypeInfrastructure", this.step1.TypeInfrastructure);
        formData.append("Visible", this.step1.Visible ? 1 : 0);

        try {
          const response = await axios.post("/infrastructures", formData, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
              'Content-Type': 'multipart/form-data',
            }
          });

          console.log("Réponse du téléversement :", response);

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.step1 = {

              CodeInfrastructure: "",
                Cost: "",
                CodeProjet: "",
                Logo: "",
                NomInfrastructure: "",
                MaitreOuvrage: "",
                EntrepriseResponsable: "",
                DateDebut: "",
                DateFin: "",
                GeoInfrastructure: "",
                LocalitesConcernees: [],
                TypeInfrastructure: "",
                CodeMission: "",
                Visible: "",
                }
                this.v$.step1.$reset();
            this.successmsg(
              "Infrastructure créée avec succès",
              "La nouvelle infrastructure a été créée avec succès !"
            );
            this.loading = false;
            this.$emit('indicateur-updated');
          } else {
            // Gérer les erreurs du serveur ici
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

    getCurrentPosition() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        } else {
          reject(new Error("La géolocalisation n'est pas prise en charge par ce navigateur."));
        }
      });
    },

    async HandleIdUpdateInfra(id) {
      this.step2 = {

CodeInfrastructure: "",
  Cost: "",
  CodeProjet: "",
  Logo: "",
  NomInfrastructure: "",
  MaitreOuvrage: "",
  EntrepriseResponsable: "",
  DateDebut: "",
  DateFin: "",
  GeoInfrastructure: "",
  LocalitesConcernees: [],
  TypeInfrastructure: "",
  CodeMission: "",
  Visible: "",
  }
      this.loading = true;

      try {
        const response = await axios.get(`/infrastructures/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        console.log("response", response);
        if (response) {
    
          let data = response.data.data;
          this.step2.CodeInfrastructure = data.CodeInfrastructure,
            // this.step2.Logo = data.Logo,
            this.step2.Cost = data.Cost,
            this.step2.NomInfrastructure = data.NomInfrastructure,
            this.step2.MaitreOuvrage = data.MaitreOuvrage,
            this.step2.EntrepriseResponsable = data.EntrepriseResponsable,
            this.step2.DateDebut = data.DateDebut,
            this.step2.DateFin = data.DateFin,
            this.step2.CodeMission = data.CodeMission
            this.step2.TypeInfrastructure = parseInt(data.TypeInfrastructure),
            this.step2.Visible = (data.Visible === "1") ? true : false,
            this.Code = data.CodeProjet,
            this.ToId = data.id;
          if (data.LocalitesConcernees.includes("|")) {
            this.step2.LocalitesConcernees = data.LocalitesConcernees.split("|");
          } else if (data.LocalitesConcernees.includes(",")) {
            // Vérification si c'est un JSON valide
            try {
              this.step2.LocalitesConcernees = JSON.parse(data.LocalitesConcernees);
            } catch (e) {
              this.step2.LocalitesConcernees = data.LocalitesConcernees.split(",");
            }
          } else {
            this.step2.LocalitesConcernees = data.LocalitesConcernees.split(" ");
          }

          if (data.GeoInfrastructure.includes("|")) {
            this.step2.GeoInfrastructure = data.GeoInfrastructure.split("|");
          } else if (data.GeoInfrastructure.includes(",")) {
            // Vérification si c'est un JSON valide
            try {
              this.step2.GeoInfrastructure = JSON.parse(data.GeoInfrastructure);
            } catch (e) {
              this.step2.GeoInfrastructure = data.GeoInfrastructure.split(",");
            }
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
      this.error = '',
        this.resultError = {}
      if (!this.validateDateFin2()) {
        return;
      }
      this.v$.step2.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true
        const dataSend = {


          id: this.ToId,
          CodeInfrastructure: this.step2.CodeInfrastructure,
          Cost: this.step2.Cost,
          Logo: this.step2.Logo,
          NomInfrastructure: this.step2.NomInfrastructure,
          MaitreOuvrage: this.step2.MaitreOuvrage,
          EntrepriseResponsable: this.step2.EntrepriseResponsable,
          DateDebut: this.step2.DateDebut,
          DateFin: this.step2.DateFin,
          CodeMission: this.step2.CodeMission,
          GeoInfrastructure: this.formattedGeoInfrastructureUpdate,
          LocalitesConcernees: this.step2.LocalitesConcernees,
          TypeInfrastructure: this.step2.TypeInfrastructure,
          Visible: this.step2.Visible ? 1 : 0,
          CodeProjet: this.Code,

        }

        console.log(dataSend);
        const formData = new FormData();
        formData.append("CodeInfrastructure", this.step2.CodeInfrastructure);
        formData.append("CodeProjet", this.Code);
        formData.append("id", this.ToId);
        formData.append("Cost", this.step2.Cost);

        formData.append("Logo", this.step2.Logo);
        formData.append("NomInfrastructure", this.step2.NomInfrastructure);
        formData.append("MaitreOuvrage", this.step2.MaitreOuvrage);
        formData.append("CodeMission", this.step2.CodeMission);

        formData.append("EntrepriseResponsable", this.step2.EntrepriseResponsable);
        formData.append("DateDebut", this.step2.DateDebut);
        formData.append("DateFin", this.step2.DateFin);

        formData.append("GeoInfrastructure[]", this.formattedGeoInfrastructureUpdate);
        formData.append("LocalitesConcernees[]", this.step2.LocalitesConcernees);
        formData.append("TypeInfrastructure", this.step2.TypeInfrastructure);

        formData.append("Visible", this.step2.Visible ? 1 : 0);

        try {
          const response = await axios.post('/infrastructures/update', formData, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
              'Content-Type': 'multipart/form-data'
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
    handleModal(id){
      if(id === 1){
        const modal = new bootstrap.Modal(this.$refs.create_controle);
        modal.show();
      }else{
        const modal = new bootstrap.Modal(this.$refs.create_entreprise);
        modal.show();
      }
       


    },

    async submitMission(modalId ,id) {
    
      this.v$.mission.$touch();
   
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        
       
        let data = {
          missions :[
            {
          CodeMission: this.mission.CodeMission,
          NomMission: this.mission.NomMission,
          Description: this.mission.Description,
          Statut : id 
            }
          ]
         
         
        };
        console.log('data', data);
        try {
          const response = await axios.post("/missions", data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
             
            }
          });

          console.log("Réponse du téléversement :", response);

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.mission = {
                CodeMission:"",
                NomMission:"",
                Description:"",
              }
            this.v$.mission.$reset();
            if(id === 1){
              this.successmsg(
              "Bureau de controle créée avec succès",
              "Le Bureau de controle a été créée avec succès !"
            );

            }else{
              this.successmsg(
              "Entreprise de travaux  créée avec succès",
              "La nouvelle entreprise de travaux  a été créée avec succès !"
            );

            }
           
            this.loading = false;
           this.fetchControle()
          } else {
            // Gérer les erreurs du serveur ici
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

    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: 'numeric', month: 'short', year: 'numeric' };
      return date.toLocaleDateString('fr-FR', options).replace('.', ',');
    },
    formatBudget(value) {
      return parseFloat(value).toLocaleString(); // Formatage avec séparateurs de milliers
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
    exportToExcel() {

      const data = this.InfrastructuresOptions.map(item => ({
        'Code infrastructure': item.CodeInfrastructure,
        'Nom': item.NomInfrastructure,
        'Date de début': this.formatDate(item.DateFin),
        'Date de fin': this.formatDate(item.DateFin),
        'Coût infrastructure (GNF) ': this.formatBudget(item.Cost),
        'Entreprise Responsable ': item.EntrepriseResponsable,
        "Maitre d'Ouvrage": item.MaitreOuvrage,
        'Taux Avancement Technique': item.TauxAvancementTechnique,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Liste des infrastructures');

      XLSX.writeFile(workbook, 'listes_des_infrastructures.xlsx');
    },
    exportToCSV() {
      const data = this.InfrastructuresOptions.map(item => ({
        'Code infrastructure': item.CodeInfrastructure,
        'Nom': item.NomInfrastructure,
        'Date de début': this.formatDate(item.DateFin),
        'Date de fin': this.formatDate(item.DateFin),
        'Coût infrastructure (GNF) ': this.formatBudget(item.Cost),
        'Entreprise Responsable ': item.EntrepriseResponsable,
        "Maitre d'Ouvrage": item.MaitreOuvrage,
        'Taux Avancement Technique': item.TauxAvancementTechnique,
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const csv = XLSX.utils.sheet_to_csv(worksheet);

      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'listes_des_infrastructures.csv';
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
        head: [['Code', 'Nom', 'Date de début', 'Date de fin', 'Coût infrastructure (GNF)', 'Entreprise Responsable ', "Maitre d'Ouvrage", 'Taux Avancement Technique']],
        body: this.InfrastructuresOptions.map(item => [
          item.CodeInfrastructure,
          item.NomInfrastructure,
          this.formatDate(item.DateDebut),
          this.formatDate(item.DateFin),
          this.formatBudget(item.Cost),
          item.EntrepriseResponsable,
          item.MaitreOuvrage,
          item.TauxAvancementTechnique

        ]),
      });

      // Sauvegarder le PDF
      doc.save('listes_des_infrastructures.pdf');
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