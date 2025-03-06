<template >
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="d-md-flex d-block pt-12  align-items-center justify-content-between my-4 page-header-breadcrumb">
      <h1 class="page-title fw-semibold fs-18 mb-0">Projet-suivi</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Projet-suivi
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="card">
      <div class="float-end w-20 mt-1 mx-1">
        <a class="px-2 bg-primary text-white  fs-15 " @click="goBack" href="#"> &larr; Retour</a>
      </div>
      <div  class="position-fixed  my-1" style="left: 60%; z-index:2" v-if="hasPermission(6)" >
      <button class="btn " :class=" data?.Validated == '1' ? 'bg-success' : 'bg-danger'" :disabled="data?.Validated == '1'" style=" color:white" @click="validateSelection(data?.id)">
        <i class="bi bi-check2-circle"></i>
        {{ data?.Validated == '1' ? 'Valider' : 'Non Valider' }}
      </button>
    </div>
      <div class="card-body">
  
        <div class="row align-items-center mb-2">
          <div class="  col-xl-4 col-sm-12  ">
            <div class="my-1 card p-2 border-radius  border border-primary "> <span class="fw-semibold fs-20 text-center" data-bs-toggle="tooltip"
                title="Current Salary" style="color:red">Date du suivi : <b></b> {{ formatDate(data.DateSuivi) }}</span></div>
          </div>
         
          <div class=" col-xl-4 col-sm-12  ">
            <div class="my-1 card p-2 border-radius  border border-primary"> <span class="fs-20 fw-semibold text-center" data-bs-toggle="tooltip"
                title="Current Salary"   style="color: var(--primary-rgb)">Taux d'exécution Physique:  {{data.TauxAvancementPhysique}}%</span></div>
          </div>

          <div class=" col-xl-4 col-sm-12  ">
            <div class="my-1 card p-2 border-radius  border border-primary"> <span class="fs-20 fw-semibold text-center" data-bs-toggle="tooltip"
                title="Current Salary"   style="color: var(--primary-rgb)">Taux d'exécution Financière:  {{data.TauxExecutionFinanciere}}%</span></div>
          </div>

          <!-- <div class=" col-xl-4 col-sm-12   ">
            <div class="my-1 card p-2 border-radius  border border-primary">
              <span class="fw-semibold fs-20" data-bs-toggle="tooltip" title="Current Salary">Niv. Avan: {{data.NiveauExecution}}</span>
            </div>
          </div> -->

          <!-- <div class=" col-xl-6 ">
            <div class="my-0  align-items-center  card p-1 border-radius  border border-primary">
             
               <span class="  fs-20 fw-semibold" data-bs-toggle="tooltip"
                title="Current Salary"   >  Etat du projet:

                <b v-if="data.StatutProjet === 'Réalisé'" class="text-center chart-container"
                  style="font-size:26px !important;padding-top:0px;">
                  <i class="bi bi-check-circle-fill text-success"></i>
  
                </b>
  
                <b v-else-if="data.StatutProjet === 'En retard'" class="text-center chart-container"
                  style="font-size:26px !important;padding-top:0px;">
                  <i class="bi bi-exclamation-diamond-fill text-danger"></i>
                </b>
  
                <b v-else-if="data.StatutProjet === 'En cours'" class="text-center chart-container"
                  style="font-size:26px !important;padding-top:0px;">
                  <i class="bi bi-exclamation-triangle text-warning"></i>
                </b>
  
                <b v-else class="text-center chart-container" style="font-size:26px !important;padding-top:0px;">
                  <i class="bi bi-question-circle text-muted"></i>
                </b>
              </span>
            </div>
          </div> -->
          <!-- <div class=" col-xl-6  ">
            <div class="my-0 card p-2 border-radius  border border-primary"> <span class="fs-20 fw-semibold text-center" data-bs-toggle="tooltip"
                title="Current Salary"   style="color: var(--primary-rgb)">Avance de démarrage:  {{data.Avance}}%</span></div>
          </div> -->
        </div>
        <div class="row">
                <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-6">
                  <div class="mt-1"><i class="bi bi-bricks me-2 fs-14"></i>Nom du projet : <span
                      class="fw-semibold fs-16" data-bs-toggle="tooltip"
                      title="Current Salary">{{data.projet?.NomProjet}}</span> </div>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1"><i class="bi bi-calendar3 me-2 fs-14"></i>Date début projet : <span class="fw-semibold  fs-16"
                      data-bs-toggle="tooltip" title="Current Salary" style="color:red">{{ formatDate(data.projet?.DateDebut)}}</span> </div>
                </div>
                <div class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-6">
                  <div class="mt-1"><i class="bi bi-calendar3 me-2 fs-14"></i>Date fin projet: <span
                      class="fw-semibold fs-16" data-bs-toggle="tooltip" title="Current Salary" style="color:red">
                      {{ formatDate(data.projet?.DateFin)}}</span> </div>
  
                </div>
              </div>
        <div class="row">
          <p class="fs-15 fw-semibold mb-1">Images & vidéo :</p>

          <div class="col-xl-6">
            <div class="row"  >
              <div v-if="!data.Images" class="col-xl-6">
                Pas de données
              </div>

                  <div v-else class="col-xl-6" v-for="(image, index) in data.Images?.split('|')" :key="index">
                <a :href="image" class="glightbox card" data-gallery="gallery1">
                  <img :src="image" alt="image" style="height:200px !important; width:100% !important">
                </a>
              </div>
              <div v-if="!data.Video" class="col-xl-6">
        Pas de vidéo disponible
      </div>
      
      <div v-else class="col-xl-6">
        <a :href="data.Video" class="glightbox card" data-gallery="gallery2">
          <img src="@/assets/img/video.png" alt="vidéo" style="height:200px !important; width:100% !important">
        </a>
      </div>
                      
                    </div>

                 
          </div>
          <div class="col-xl-6" >
            <div class="row">
          <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="mb-2 card rounded border border-primary custom-card p-2" style="height:215px !important; overflow-y:scroll">
              <p class="fs-15 fw-semibold mb-1">Récapitulatif du projet :</p>
              <p class="text-muted mb-0 " v-if="data.Observations === '' || data.Observations === null">
                Pas de description liée a ce suivi
              </p>
              <p class="text-muted mb-0 " v-else>
                {{data.Observations}}
              </p>
            </div>
          </div>

          <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="mb-2 card rounded border border-primary custom-card p-2" style="height:215px !important; overflow-y:scroll">
              <p class="fs-15 fw-semibold mb-1">Réalisation des travaux :</p>
              <p class="text-muted mb-0 " v-if="data.Observations === '' || data.Observations === null">
                Pas de réalisation de travaux liée a ce suivi
              </p>
              <p class="text-muted mb-0 " v-else>
                <span v-for="(part, index) in this.data?.Realisation?.split('|')" :key="index" v-html="part"></span>
                
              </p>
            </div>
             </div>
            </div>
          
         
  
  
        
          </div>
        </div>

       

        <div class="row">
          <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="card custom-card">
              <div class="card-header justify-content-between">
                <div class="card-title">
                  La liste des bailleurs dans ce suivi
                </div>
  
              </div>
              <div class="card-body">
                <div class="row task-card">
                  <div v-if="paginatedBailleurs.length === 0" class="noresul">
                    <span class="fs-14"> Vous n'avez pas encore de bailleur qui a effectué des décaissements dans ce suivi
                      !! </span>
                  </div>
                  <div style="overflow-x: scroll !important" class="table-responsive" v-else>
                    <table class="table table-hover text-nowrap table-bordered table-striped">
                      <thead>
                        <tr>
                          <th scope="row" class="ps-4 fw-semibold">
                            <span class="float-right">N°</span>
                          </th>
                          <th scope="col" class="text-left"> <span class="fw-semibold">Nom</span> </th>
                          <!-- <th scope="col"  class="text-center">  <span class="fw-semibold" >Budget</span></th> -->
                          <th scope="col" class="text-center">
                            <span class="fw-semibold">Montant Décaissé</span>
                          </th>
                          <!-- <th scope="col" class="text-center">
                                            <span class="fw-semibold">Taux de Décaissement</span>
                                          </th> -->
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(item , index)  in paginatedBailleurs" :key="item.id">
                          <th style="width: 30px;" scope="row" class="ps-4 ">{{ (currentPageBailleurs - 1) * itemsPerPage
                            +
                            index + 1 }}</th>
                          <td><span class="d-block fw-semibold mb-1 text-left"> {{item.CodeBailleur}}</span></td>
                          <!-- <td style="width: 180px;" class="text-center"><span class="d-block fw-semibold mb-1 "> {{ formatBudget(item.Budget) || 0 }} </span></td> -->
                          <td style="width: 180px;" class="text-center">
                            <span class="d-block fw-semibold mb-1">{{ formatBudget(item.MontantDecaisser) }}</span>
  
                          </td>
                          <!-- <td style="width: 130px;" class="text-center">
                                                <span class="d-block text-center text-danger fw-bold mb-1">
                                                  {{ tauxDecaissement(item).toFixed(2) }}%
                                                </span>
                                                <div
                                                  class="progress mt-1 border border-primary"
                                                  role="progressbar"
                                                  aria-valuenow="50"
                                                  aria-valuemin="0"
                                                  aria-valuemax="100"
                                                >
                                                  <div
                                                    class="progress-bar"
                                                    :class="getProgressClass(tauxDecaissement(item))"
                                                    :style="{ width: tauxDecaissement(item) + '%' }"
                                                  ></div>
                                                </div>
                                              </td> -->
                           <td class="" style="width: 80px;">
                                            <div class="btn-list w-25 d-flex">
    
                                              <button class="btn btn-sm btn-icon btn-info btn-wave " data-bs-toggle="modal"
                                                v-tippy="{ content: 'Modifier l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                                                data-bs-target="#update_bailleur" @click="HandleIdUpdateBailleurs(item.id)">
                                                <i class="ri-edit-line"></i>
                                              </button>
    
                                              <button class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDeleteBailleur(item.id)" 
                                                v-tippy="{ content: 'Supprimer l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}">
                                                <i class="ri-delete-bin-line"></i>
                                              </button>
    
    
                                            </div>
                                          </td>
                    
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colspan="2"><strong>Total général</strong></td>
                          <td class="text-center"> <strong style="color:red;">{{ totalBudget }} GNF</strong></td>
                          <!-- <td  class="text-center"> <strong  style="color:red;">{{ totalMontantDecaisse }} GNF</strong></td>
              <td class="text-center">
                <span class="progress-text fw-bold text-danger ">{{ tauxDecaissementTotal }}%</span>
                <div class="progress mt-1 border border-primary" role="progressbar">
                  <div
                    class="progress-bar"
                    :class="{
                      'bg-danger': tauxDecaissementTotal <= 30,
                      'bg-warning': tauxDecaissementTotal > 30 && tauxDecaissementTotal <= 75,
                      'bg-success': tauxDecaissementTotal > 75
                    }"
                    :style="{ width: tauxDecaissementTotal + '%' }"
                  ></div>
                </div>
              </td> -->
                          <!-- <td></td> -->
                        </tr>
                      </tfoot>
                    </table>
                  </div>
  
                </div>
                <div class="row">
                  <div class="col-lg-12">
                    <div class="container_pagination">
                      <Pag :current-page="currentPageBailleurs" :total-pages="totalPagesBailleurs"
                        @page-change="updateCurrentPageBailleurs" />
                    </div>
                  </div>
                </div>
              </div>
  
            </div>
          </div>
          <div class="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div class="card custom-card">
              <div class="card-header">
                <div class="card-title d-flex justify-content-between w-100">
                  <b> Les contraintes liées au suivi</b>
  
                  <button v-if="hasPermission(3)" class="btn btn-icon btn-primary ms-2 " data-bs-placement="top"
                    v-tippy="{ content: 'Créer un nouvel élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                    data-bs-title="Add Contact" data-bs-toggle="modal" data-bs-target="#add_contrainte">
                    <i class="ri-add-line"> </i>
                  </button>
                </div>
              </div>
              <div class="card-body">
                <div v-if="Array.isArray(ContrainteOptions) && ContrainteOptions.length === 0" class="noresul">
                  <span>Aucune contrainte liée à ce suivi !!</span>
                </div>
                <div style="overflow-x: scroll !important" class="table-responsive " v-else>
                  <table class="table  table-bordered border-primary">
                    <thead>
                      <tr>
                        <th scope="col" class="text-dark fw-semibold">Contraintes</th>
                        <th scope="col" class="text-dark fw-semibold">Mitigation</th>
                        <th scope="col" class="text-dark fw-semibold">Acteur-s (Responsables)</th>
                        <th scope="col" class="text-dark fw-semibold text-center">Statut</th>
                        <th scope="col" class="text-dark fw-semibold text-center">Delai</th>
                        <th scope="col" class="text-dark fw-semibold text-center">Actions</th> <!-- Colonne Actions -->
                      </tr>
                    </thead>
                    <tbody>
                      <!-- Lignes pour les contraintes administratives -->
                      <tr v-if="hasAdministrativeConstraints">
                        <th colspan="4" class="text-dark fw-semibold">Administratives</th>
                      </tr>
                      <tr v-for="(item, index) in filteredConstraints('ADMIN')" :key="item.id">
                        <td>
                          <span class="fw-bolder">{{ index + 1 }}-)</span> {{ item.IntituleConstrainte }}
                        </td>
                        <td>{{ item.Mitigation }}</td>
                        <td>{{ item.Acteurs }}</td>
                        <td class="text-center" style="width: 100px;">
                          <router-link v-if="item.suivis_contrainte.length > 0" to="#" class="text-white btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#add_contrainte_suivi" @click="fetchSuiviContrainte(item.id)"
                            v-tippy="{ content: 'Suivre cette contrainte',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}">
                            {{item.suivis_contrainte[0].Statut}}
                          </router-link>
                          <router-link v-else to="#" class="text-white btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#add_contrainte_suivi" @click="fetchSuiviContrainte(item.id)"
                            v-tippy="{ content: 'Suivre cette contrainte',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}">
                            suivre
                          </router-link>
                        </td>
                        <td style="color:red ; width:100px">{{ formatDate(item.Delai)}}</td>
                        <td style="width:80px">
                          <div class="hstack gap-2 fs-1">
                            <button v-if="hasPermission(2)" class="btn btn-sm btn-icon btn-info btn-wave"
                              data-bs-toggle="modal" data-bs-target="#update_contrainte"
                              @click="HandleIdUpdateContrainte(item.id)" 
                              v-tippy="{ content: 'Modifier l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}">
                              <i class="ri-edit-line"></i>
                            </button>
                            <button v-if="hasPermission(4)" class="btn btn-sm btn-icon btn-danger btn-wave"

                              @click="HandleIdDeleteContrainte(item.id)"
                              v-tippy="{ content: 'Supprimer l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}">
                              <i class="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
  
                      <!-- Lignes pour les contraintes techniques -->
                      <tr v-if="hasTechnicalConstraints">
                        <th colspan="4" class="text-dark fw-semibold">Techniques</th>
                      </tr>
                      <tr v-for="(item, index) in filteredConstraints('TECH')" :key="item.id">
                        <td>
                          <span class="fw-bolder">{{ index + 1 }}-)</span> {{ item.IntituleConstrainte }}
                        </td>
                        <td>{{ item.Mitigation }}</td>
                        <td>{{ item.Acteurs }}</td>
                        <td class="text-center" style="width: 100px;">
                          <router-link v-if="item.suivis_contrainte.length > 0" to="#" class="text-white btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#add_contrainte_suivi" @click="fetchSuiviContrainte(item.id)">
                            {{item.suivis_contrainte[0].Statut}}
                          </router-link>
                          <router-link v-else to="#" class="text-white btn btn-success btn-sm" data-bs-toggle="modal" data-bs-target="#add_contrainte_suivi" @click="fetchSuiviContrainte(item.id)">
                            suivre
                          </router-link>
                        </td>
                        <td style="color:red ; width:100px">{{ formatDate(item.Delai) }}</td>
                        <td style="width:100px">
                          <div class="hstack gap-2 fs-1">
                            <button v-if="hasPermission(2)" class="btn btn-sm btn-icon btn-info btn-wave"
                              data-bs-toggle="modal" data-bs-target="#update_contrainte"
                              @click="HandleIdUpdateContrainte(item.id)">
                              <i class="ri-edit-line"></i>
                            </button>
                            <button v-if="hasPermission(4)" class="btn btn-sm btn-icon btn-danger btn-wave"
                              @click="HandleIdDeleteContrainte(item.id)">
                              <i class="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
  
        </div>
      </div>
    </div>
  
    <!-- Start:: Create contrainte -->
  
  
    <div class="modal fade effect-rotate-bottom" id="add_contrainte" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="add_contrainte">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Ajouter une contrainte</b>
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
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="infrastructure_id">Type Contrainte<span class="text-danger">*</span></label>
                  <MazSelect v-model="step1.TypeConstrainte" color="info" name="TypeConstrainte" size="sm"
                    rounded-size="sm" :options="contraintess" search />
                  <small v-if="v$.step1.TypeConstrainte.$error">{{ v$.step1.TypeConstrainte.$errors[0].$message}}</small>
                  <small v-if="resultError['TypeConstrainte']"> {{ resultError["TypeConstrainte"] }} </small>
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="IntituleConstrainte">Intitule Contrainte<span class="text-danger">*</span></label>
                  <textarea class="form-control" id="text-area" v-model="step1.IntituleConstrainte" rows="1"></textarea>
                  <small v-if="v$.step1.IntituleConstrainte.$error">{{
                    v$.step1.IntituleConstrainte.$errors[0].$message}}</small>
                  <small v-if="resultError['IntituleConstrainte']"> {{ resultError["IntituleConstrainte"] }} </small>
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Localité">Mitigation<span class="text-danger">*</span></label>
                  <textarea class="form-control" id="text-area" v-model="step1.Mitigation" rows="1"></textarea>
                  <small v-if="v$.step1.Mitigation.$error">{{ v$.step1.Mitigation.$errors[0].$message}}</small>
                  <small v-if="resultError['Mitigation']"> {{ resultError["Mitigation"] }} </small>
  
                </div>
                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12   ">
                      
                        <div >
                        <label for="userpassword">Acteur-s (Responsables) <span class="text-danger">*</span></label>
                        <MazInput  v-model="step1.Acteurs" type="text"   color="info"   name="step1.Acteurs" size="sm" rounded-size="sm" />
                        </div>
                        <small v-if="v$.step1.Acteurs.$error">{{
                    v$.step1.Acteurs.$errors[0].$message}}</small>
                  <small v-if="resultError['Acteurs']"> {{ resultError["Acteurs"] }} </small>
                        
                        </div>
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="date_start">Delai <span class="text-danger">*</span></label>
                  <MazInput v-model="step1.Delai" color="info" name="Delai" size="sm" rounded-size="sm" type="date" />
                  <small v-if="v$.step1.Delai.$error">{{ v$.step1.Delai.$errors[0].$message}}</small>
                  <small v-if="resultError['Delai']"> {{ resultError["Delai"] }} </small>
                </div>

              
              
  
  
  
  
  
  
  
              </div>
  
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitContrainte('add_contrainte')">
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
    <!-- End:: Create contrainte -->
  
    <!-- Start:: update contrainte -->
  
  
    <div class="modal fade effect-rotate-bottom" id="update_contrainte" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update_contrainte">
      <div class="modal-dialog modal-dialog-centered modal-lg">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier une contrainte</b>
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
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="infrastructure_id">Type Contrainte<span class="text-danger">*</span></label>
                  <MazSelect v-model="step2.TypeConstrainte" color="info" name="TypeConstrainte" size="sm"
                    rounded-size="sm" :options="contraintess" search />
                  <small v-if="v$.step2.TypeConstrainte.$error">{{ v$.step2.TypeConstrainte.$errors[0].$message}}</small>
                  <small v-if="resultError['TypeConstrainte']"> {{ resultError["TypeConstrainte"] }} </small>
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="IntituleConstrainte">Intitule Contrainte<span class="text-danger">*</span></label>
                  <textarea class="form-control" id="text-area" v-model="step2.IntituleConstrainte" rows="1"></textarea>
                  <small v-if="v$.step2.IntituleConstrainte.$error">{{
                    v$.step2.IntituleConstrainte.$errors[0].$message}}</small>
                  <small v-if="resultError['IntituleConstrainte']"> {{ resultError["IntituleConstrainte"] }} </small>
                </div>
                <div class="col-xl-6 col-md-6 col-sm-12">
                  <label for="Localité">Mitigation<span class="text-danger">*</span></label>
                  <textarea class="form-control" id="text-area" v-model="step2.Mitigation" rows="1"></textarea>
                  <small v-if="v$.step2.Mitigation.$error">{{ v$.step2.Mitigation.$errors[0].$message}}</small>
                  <small v-if="resultError['Mitigation']"> {{ resultError["Mitigation"] }} </small>
  
                </div>
                <div class="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12   ">
                       
                        <div >
                        <label for="userpassword">Acteur-s (Responsables) <span class="text-danger">*</span></label>
                        <MazInput  v-model="step2.Acteurs"  type="text"  color="info"   name="step2.Acteurs" size="sm" rounded-size="sm"  />
                        </div>
                        <small v-if="v$.step2.Acteurs.$error">{{
                    v$.step2.Acteurs.$errors[0].$message}}</small>
                  <small v-if="resultError['Acteurs']"> {{ resultError["Acteurs"] }} </small>
                     
                        </div>
  
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="date_start">Delai <span class="text-danger">*</span></label>
                  <MazInput v-model="step2.Delai" color="info" name="Delai" size="sm" rounded-size="sm" type="date" />
                  <small v-if="v$.step2.Delai.$error">{{ v$.step2.Delai.$errors[0].$message}}</small>
                  <small v-if="resultError['Delai']"> {{ resultError["Delai"] }} </small>
                </div>

              
  
              </div>
  
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdateContrainte('update_contrainte')">
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


      <!-- Start:: update bailleur -->
  
  
      <div class="modal fade effect-rotate-bottom" id="update_bailleur" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update_bailleur">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier un bailleur</b>
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
                  <label for="infrastructure_id">Nom<span class="text-danger">*</span></label>
                  <MazSelect v-model="UpdateBailleur.CodeBailleur" color="info" name="CodeBailleur" size="sm"
                    rounded-size="sm" search :options="BailleurProjet"  />
                  <small v-if="v$.UpdateBailleur.CodeBailleur.$error">{{ v$.UpdateBailleur.CodeBailleur.$errors[0].$message}}</small>
                  <small v-if="resultError['CodeBailleur']"> {{ resultError["CodeBailleur"] }} </small>
                </div>
  
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="date_start">Montant décaissé <span class="text-danger">*</span></label>
                  <MazInput v-model="UpdateBailleur.MontantDecaisser" color="info" name="MontantDecaisser" size="sm" rounded-size="sm" type="number" />
                  <small v-if="v$.UpdateBailleur.MontantDecaisser.$error">{{ v$.UpdateBailleur.MontantDecaisser.$errors[0].$message}}</small>
                  <small v-if="resultError['MontantDecaisser']"> {{ resultError["MontantDecaisser"] }} </small>
                </div>

              </div>
  
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitUpdateBailleur('update_bailleur')">
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

     <!-- Start:: liste suivi contrainte -->
  
  
     <div class="modal fade effect-rotate-bottom" id="add_contrainte_suivi" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="add_contrainte_suivi">
      <div class="modal-dialog modal-dialog-centered modal-xl">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Liste des suivis contrainte</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center" style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
                <div class="contact-header my-2  py-2 px-1">
            <div class="d-sm-flex d-block align-items-center justify-content-between">
              <div class="h5 fw-semibold mb-0"></div>
              <div class="d-flex mt-sm-0 mt-2 align-items-center">
                
    
                <button v-if="hasPermission(3)" class="btn btn-icon btn-primary ms-2" data-bs-placement="top" data-bs-title="Add Contact"

                @click="handleModal('create_suivi')"
                v-tippy="{ content: 'Créer un nouvel élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}">
                  <i class="ri-add-line">
                  </i></button>
              </div>
            </div>
          </div>

<div v-if="SuiviContrainteOptions.length === 0" class="noresul">
          <span> Vous n'avez pas encore de suivi contrainte, vous pouvez également en ajouter une !! </span>
        </div>
            <div style="overflow-x: scroll !important" class="table-responsive" v-else>
              <table class="table text-nowrap table-bordered">
                <thead>
                  <tr>
                    <th scope="row" class="ps-4 fw-semibold">
                        <span class="float-left">N°</span>
                      </th>
    
                    <th scope="col" class="text-center"> <span class="fw-semibold" >Date du suivi</span></th>
                    <th scope="col" class="text-center"> <span class="fw-semibold" >Observation</span></th>
                    <th scope="col" class="text-center"> <span class="fw-semibold" >Statut</span></th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr  v-for="(item , index)  in SuiviContrainteOptions" :key="item.id">
                    <td style="width: 30px;">
                      <span>
                        <th   scope="row" class="ps-4 ">{{  index + 1 }}</th>
  
                      </span>
                    </td>
    
                    <td style="width: 120px;" class="text-center">
                      <span class="d-block fw-bolder mb-1  text-warning"> {{ formatDate(item.DateSuivi) }} </span>
                    </td>
                    
                    <td class="text-center">
                      <span class="fw-semibold fs-14">{{item.Observations}}</span>
                    </td>
                    <td style="width: 100px;" class="text-center">
                      <span class="fw-semibold fs-14" >{{item.Statut}}</span>
                    </td>
                  
                    <td class="" style="width: 80px;">
                      <div class="btn-list w-25 d-flex">
  
                        <button v-if="hasPermission(2)" class="btn btn-sm btn-icon btn-info btn-wave " 
                          @click="HandleIdUpdateSuivi(item.id)" 
                           v-tippy="{ content: 'Créer un nouvel élément',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}"
                          :disabled="index !==0">
                          <i class="ri-edit-line"></i>
                        </button>
  
                        <button v-if="hasPermission(4)" class="btn btn-sm btn-icon btn-danger btn-wave" @click="HandleIdDeleteSuivi(item.id)"
                          v-tippy="{ content: 'Supprimer l\'élément sélectionné',theme: 'custom',animation: 'shift-away', backgroundColor: '#FF5733'}">
                          <i class="ri-delete-bin-line"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                 
    
                </tbody>
              </table>

              <!-- <div class="row">
                  <div class="col-lg-12">
                    <div class="container_pagination">
                      <Pag :current-page="currentPageSuiviContrainte" :total-pages="totalPagesSuiviContrainte"
                        @page-change="updatecurrentPageSuiviContrainte" />
                    </div>
                  </div>
                </div> -->
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

      <!-- Start::  create suivi contrainte -->
  
  
      <div class="modal fade effect-rotate-bottom" id="create_suivi" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="create_suivi">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Ajouter un suivi contrainte</b>
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
                  <label for="Code">Date du suivi <span class="text-danger">*</span></label>
                  <MazInput v-model="mission.DateSuivi" color="info" name="DateSuivi" size="sm"
                    rounded-size="sm" type="date" />
                  <small v-if="v$.mission.DateSuivi.$error">{{
                    v$.mission.DateSuivi.$errors[0].$message}}</small>
                  <small v-if="resultError['DateSuivi']"> {{ resultError["DateSuivi"] }} </small>
                </div>
  
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Nom">Statut du suivi<span class="text-danger">*</span></label>
                  <MazSelect v-model="mission.Statue" color="info" name="Statue" size="sm"
                    rounded-size="sm" search :options="Statut" />
                  <small v-if="v$.mission.Statue.$error">{{
                    v$.mission.Statue.$errors[0].$message}}</small>
                  <small v-if="resultError['Statue']"> {{ resultError["Statue"] }} </small>
  
                </div>
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Sigle">Observation du suivi</label>
                  <MazTextarea v-model="mission.Observations" color="info" name="Observations" size="sm" rounded-size="sm"  />
                  <small v-if="v$.mission.Observations.$error">{{ v$.mission.Observations.$errors[0].$message}}</small>
                  <small v-if="resultError['Observations']"> {{ resultError["Observations"] }} </small>
                </div>
                <div class="row mb-3">
                  <div class="boutton">
                    <button class="" @click.prevent="submitMission('create_suivi')">
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

       <!-- Start::  update suivi contrainte -->
  
  
       <div class="modal fade effect-rotate-bottom" id="update_suivi" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="update_suivi">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Modifier un suivi contrainte</b>
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
                  <label for="Code">Date du suivi <span class="text-danger">*</span></label>
                  <MazInput v-model="UpdateSuivi.DateSuivi" color="info" name="DateSuivi" size="sm"
                    rounded-size="sm" type="date" />
                  <small v-if="v$.UpdateSuivi.DateSuivi.$error">{{
                    v$.UpdateSuivi.DateSuivi.$errors[0].$message}}</small>
                  <small v-if="resultError['DateSuivi']"> {{ resultError["DateSuivi"] }} </small>
                </div>
  
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Nom">Statut du suivi<span class="text-danger">*</span></label>
                  <MazSelect v-model="UpdateSuivi.Statue" color="info" name="Statue" size="sm"
                    rounded-size="sm" search :options="Statut" />
                  <small v-if="v$.UpdateSuivi.Statue.$error">{{
                    v$.UpdateSuivi.Statue.$errors[0].$message}}</small>
                  <small v-if="resultError['Statue']"> {{ resultError["Statue"] }} </small>
  
                </div>
                <div class="col-xl-12 col-md-12 col-sm-12">
                  <label for="Sigle">Observation du suivi</label>
                  <MazTextarea v-model="UpdateSuivi.Observations" color="info" name="Observations" size="sm" rounded-size="sm"  />
                  <small v-if="v$.UpdateSuivi.Observations.$error">{{ v$.UpdateSuivi.Observations.$errors[0].$message}}</small>
                  <small v-if="resultError['Observations']"> {{ resultError["Observations"] }} </small>
                </div>
                <div class="row mb-3">
                  <div class="boutton">
                    <button class="" @click.prevent="submitUpdateSuivi('update_suivi')">
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
import axios from "@/lib/axiosConfig";
import Loading from "@/components/others/loading.vue";
import Pag from "@/components/others/pagination.vue";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax, ValidEmail, ValidNumeri, vlmin, vlmax } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import Swal from "sweetalert2";
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';


export default {
  props: ['id'],
  components: {
    Loading, Pag


  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    // Pour BailleursOptions
    totalPagesBailleurs() {
      return Math.ceil(this.filteredBailleurs.length / this.itemsPerPage);
    },
    paginatedBailleurs() {
      const startIndex = (this.currentPageBailleurs - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredBailleurs.slice(startIndex, endIndex);
    },
    filteredBailleurs() {
      if (!this.searchBailleur) {
        console.log('this.BailleursOptions', this.BailleursOptions);
        return this.BailleursOptions;
      }
      const searchValue = this.searchBailleur.toLowerCase();
      return this.BailleursOptions.filter((bailleur) => {
        const code = bailleur.CodeBailleur || "";
        return code.toLowerCase().includes(searchValue);
      });
    },
    totalBudget() {
      return this.BailleursOptions.reduce((total, bailleur) => {
        return total + parseFloat(bailleur.MontantDecaisser || 0);
      }, 0).toLocaleString(); // Formatage avec séparateurs de milliers
    },

    // Calcul du montant total décaissé
    totalMontantDecaisse() {
      return this.BailleursOptions.reduce((total, item) => {
        return total + parseFloat((item.decaissement && item.decaissement[0] && item.decaissement[0].montant_decaisser) || 0);
      }, 0).toLocaleString(); // Formatage avec séparateurs de milliers
    },

    // Calcul du taux de décaissement total en pourcentage
    tauxDecaissementTotal() {
      const totalBudgetValue = this.BailleursOptions.reduce((total, bailleur) => {
        return total + parseFloat(bailleur.Budget || 0);
      }, 0);
      const totalMontantDecaisseValue = this.BailleursOptions.reduce((total, item) => {
        return total + parseFloat((item.decaissement && item.decaissement[0] && item.decaissement[0].montant_decaisser) || 0);
      }, 0);
      if (totalBudgetValue === 0) return 0;
      return ((totalMontantDecaisseValue / totalBudgetValue) * 100).toFixed(2);
    },
    hasAdministrativeConstraints() {
      return this.ContrainteOptions.some(c => c.TypeConstrainte === 'ADMIN');
    },
    hasTechnicalConstraints() {
      return this.ContrainteOptions.some(c => c.TypeConstrainte === 'TECH');
    },


    totalPagesSuiviContrainte() {
        return Math.ceil(this.SuiviContrainteOptions.length / this.itemsPerPage);
      },
      paginatedSuiviContrainte() {
        const startIndex = (this.currentPageSuiviContrainte - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.SuiviContrainteOptions.slice(startIndex, endIndex);
      },

  },

  data() {
    return {
      loading: true,
      data: '',
      currentPageBailleurs: 1,
      currentPage: 1,
      itemsPerPage: 6,
      totalPageArray: [],
      BailleursOptions: [],
      BailleurProjet:[],
      SuiviContrainteOptions:[],
      UsersOptions:[],
      IdContrainte:"",
      ContrainteOptions: [],
      resultError: {},
      v$: useVuelidate(),
      error: "",
      contraintess: [
        { label: "Administratives", value: "ADMIN" },
        { label: "Techniques", value: 'TECH' },
      ],
      Statut: [
          { label: "Non démarré", value: "Non démarré" },
          { label: "En cours", value: 'En cours' },
          { label: "Réalisé", value: 'Réalisé' },
        ],
      step1: {
        IntituleConstrainte: "",
        Mitigation: "",
        Delai: "",
        TypeConstrainte: "",
        Acteurs:"",
      },
      step2: {
        IntituleConstrainte: "",
        Mitigation: "",
        Delai: "",
        TypeConstrainte: "",
        Acteurs:"",

      },
      mission:{
        DateSuivi:"",
        Statue:"",
        Observations:"",
      },
      UpdateSuivi:{
        DateSuivi:"",
        Statue:"",
        Observations:"",
      },
      UpdateBailleur:{

        CodeBailleur:"",
        MontantDecaisser:""
      }


    };
  },
  validations: {
    step1: {
      IntituleConstrainte: { require },
      Mitigation: { require },
      Delai: {},
      TypeConstrainte: { require },
      Acteurs: {  },

    },
    step2: {
      IntituleConstrainte: { require },
      Mitigation: { require },
      Delai: {},
      TypeConstrainte: { require },
      Acteurs: {  },

    },
    mission:{
        DateSuivi: { require },
        Statue: { require },
        Observations: {  },
      },
      UpdateSuivi:{
        DateSuivi: { require },
        Statue: { require },
        Observations: {  },
      },
    UpdateBailleur:{

CodeBailleur:{ require },
MontantDecaisser:{ require }
}
  },

  async mounted() {
    this.initGlightbox();
    console.log("loggedInUser", this.loggedInUser);
    await this.fetchDetailProjet()
    // await   this.fetchUserAll()



  },

  methods: {
    successmsg: successmsg,
    initGlightbox() {
      GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
      });
    },
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

    filteredConstraints(type) {
      return this.ContrainteOptions.filter(c => c.TypeConstrainte === type);
    },
    async fetchDetailProjet() {
      try {
        const response = await axios.get(`/projet-suivis/detail/${this.id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        // console.log("usersOptions", response.data);
        if (response.data.status === "success") {
          this.data = response.data.data.suivi;
          this.BailleursOptions = this.data.bailleurs
          const filtercontrainte = response.data.data?.contraintes !== null ? response.data.data?.contraintes
          .filter(i => i.suivis_contrainte[0]?.Statut !== 'Réalisé') : []
          this.ContrainteOptions =  this.data.contraintes.concat( filtercontrainte) 
          this.data.projet.bailleurs.map(item => this.BailleurProjet.push({
              label: item.CodeBailleur,
              value:  item.CodeBailleur
            }))

         

          this.loading = false;
          localStorage.setItem('CodeProjet', this.data.CodeProjet);
          // localStorage.setItem('reload', 'true'); 
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
    splitRealisation() {
      
      return this.data.Realisation ? this.data.Realisation.split('|') : [];
    },
    async fetchUserAll() {
      try {
        const response = await axios.get('/auth-users', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });


        if (response.data.status === "success") {
         
          this.usersOptions =response.data.data.map(item => this.UsersOptions.push({
            label: `${item.Nom} ${item.Prenoms}`,
            value: `${item.Nom} ${item.Prenoms}`
          }))

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
    async submitContrainte(modalId) {
      this.v$.step1.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        let data = {
          IntituleConstrainte: this.step1.IntituleConstrainte,
          Mitigation: this.step1.Mitigation,
          Delai: this.step1.Delai,
          TypeConstrainte: this.step1.TypeConstrainte,
          Acteurs:this.step1.Acteurs,
          IdSuiviProjet: this.id

        }
        try {
          const response = await axios.post("/contraintes", data, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,

            }
          });
          console.log('data.response', response);

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.step1 = {
                IntituleConstrainte: "",
                Mitigation: "",
                Delai: "",
                TypeConstrainte: "",
                Acteurs:"",
              },
                this.v$.step1.$reset();
            this.successmsg(
              "Contrainte créée avec succès",
              "La nouvelle contrainte a été créée avec succès !"
            );
            await this.fetchDetailProjet();
          } else {
          }
        } catch (error) {
          console.log('error', error);


          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrors(error.response.data.errors);
          }
        }
      } else {
      }
    },
    async HandleIdUpdateContrainte(id) {
      this.loading = true;
      this.step2 = {
        IntituleConstrainte: "",
        Mitigation: "",
        Delai: "",
        Acteurs: "",
        TypeConstrainte: "",
      }
      


      try {
        const response =   this.ContrainteOptions.find(u => u.id === id)
       
        if (response) {

          this.step2.IntituleConstrainte = response?.IntituleConstrainte,
            this.step2.Mitigation = response?.Mitigation,
            this.step2.Delai = response?.Delai,
            this.step2.Acteurs = response?.Acteurs,
            this.step2.TypeConstrainte = response?.TypeConstrainte,

            this.ToId = response.id
          this.loading = false;

        }
      } catch (error) {

        console.log('error', error);

      }

    },
    async submitUpdateContrainte(modalId) {

      this.v$.step2.$touch();


      if (this.v$.$errors.length == 0) {

        this.loading = true;
        let data = {
          id: this.ToId,
          IntituleConstrainte: this.step2.IntituleConstrainte,
          Mitigation: this.step2.Mitigation,
          Delai: this.step2.Delai,
          TypeConstrainte: this.step2.TypeConstrainte,
          Acteurs:this.step2.Acteurs,
          IdSuiviProjet: this.id
        }
        console.log('data', data)



        try {
          const response = await axios.post('/contraintes', data, {
            headers: {

              Authorization: `Bearer ${this.loggedInUser.token}`,

            },
          });
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Données de la contrainte mises à jour",
              "Les données de la contrainte ont été mises à jour avec succès !"
            );
            await this.fetchDetailProjet();



          }
        } catch (error) {

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
    async HandleIdDeleteContrainte(id) {
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
        this.ConfirmeDeleteContrainte(id);
      }
    },
    async ConfirmeDeleteContrainte(id) {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/contraintes/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Contraintet supprimée",
            "La contrainte  a été supprimée avec succès."
          );
          await this.fetchDetailProjet();
          this.loading = false;

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

    // contrainte

    async HandleIdUpdateBailleurs(id) {
      this.loading = true;
      try {
        const response = this.data.bailleurs.find(u => u.id === id)
        console.log('',response)
      
        if (response) {
            this.UpdateBailleur.CodeBailleur = response.CodeBailleur,
            this.UpdateBailleur.MontantDecaisser = response.MontantDecaisser,
            this.ToId = response.id
          this.loading = false;

        }
      } catch (error) {

        console.log('error', error);

      }

    },
    async submitUpdateBailleur(modalId) {

this.v$.UpdateBailleur.$touch();


if (this.v$.$errors.length == 0) {

  this.loading = true;
  let data = {
    identity: this.ToId,
    CodeBailleur: this.UpdateBailleur.CodeBailleur,
    MontantDecaisser: this.UpdateBailleur.MontantDecaisser,  
    IdSuiviProjet: this.id
  }




  try {
    const response = await axios.put('/projet-suivis/update/disbursement', data, {
      headers: {

        Authorization: `Bearer ${this.loggedInUser.token}`,

      },
    });
    if (response.data.status === "success") {
      this.closeModal(modalId);
      this.successmsg(
        "Données du bailleur mises à jour",
        "Les données du bailleur  ont été mises à jour avec succès !"
      );
      await this.fetchDetailProjet();



    }
  } catch (error) {

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
    async HandleIdDeleteBailleur(id) {
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
        this.ConfirmeDeleteBailleur(id);
      }
    },
    async ConfirmeDeleteBailleur(id) {
      this.loading = true;

      try {
      
        const response = await axios.delete(`/projet-suivis/supprimer/disbursement`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params:{
            identity:id
          }
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "bailleur retiré",
            "Le bailleur   a été supprimée avec succès."
          );
          await this.fetchDetailProjet();
          this.loading = false;

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

    // suivi contrainte

    async fetchSuiviContrainte(id) {
      this.loading = true
      this.IdContrainte = id
  
      try {
        const response = await axios.get('/contraintes/suivis', {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
          params:{contrainte:id}
         
        });

        console.log("usersOptionys", response.data);
        if (response.data.status === "success") {
          // this.data = response.data.data;
          // this.dataSuivi =  response.data.data.suivis
           this.SuiviContrainteOptions =  response.data.data
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
    handleModal(modalId){
      if(modalId === 'create_suivi'){
 // this.closeModal(modalId);
 const modal = new bootstrap.Modal(this.$refs.create_suivi);
        modal.show();
      }else{
 // this.closeModal(modalId);
 const modal = new bootstrap.Modal(this.$refs.update_suivi);
        modal.show();
      }
     


    },

    async submitMission(modalId) {
    
    this.v$.mission.$touch();
 
    if (this.v$.$errors.length == 0) {
      this.loading = true;
     
      let data = {
        IdContrainte:this.IdContrainte,
        DateSuivi: this.mission.DateSuivi,
        Statut: this.mission.Statue,
        Observations: this.mission.Observations,
          }
        
       
     
      console.log('data', data);
      try {
        const response = await axios.post("/contraintes/suivis", data, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
           
          }
        });

        console.log("Réponse du téléversement :", response);

        if (response.data.status === "success") {
          this.closeModal(modalId);
          this.mission = {
              DateSuivi:"",
              Statut:"",
              Observations:"",
            }
          this.v$.mission.$reset();
          this.successmsg(
            "Suivi contrainte créée avec succès",
            "Le nouveau suivi contrainte a été créée avec succès !"
          );

          this.loading = false;
         this.fetchSuiviContrainte( this.IdContrainte)
        } else {
          // Gérer les erreurs du serveur ici
        }
      } catch (error) {
        console.log("response.login", error);

        this.loading = false;
        if (error.response.data.status === "error") {
          Swal.fire({
              title: "Enrégistrement  impossible",
              text: error.response.data.message,
              icon: "question"
            });
        } else {
          this.formatValidationErrors(error.response.data.errors);
        }
      }
    } else {
      console.log("error", this.v$.$errors);
    }
  },
  async HandleIdUpdateSuivi(id) {
      this.loading = true;
      try {
        const response = await axios.get(`/contraintes/suivis/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },

         
        });
      
        if (response) {
          console.log('res',response)
          let data = response.data.data
            this.UpdateSuivi.DateSuivi = data.DateSuivi,
            this.UpdateSuivi.Statue = data.Statut,
            this.UpdateSuivi.Observations = data.Observations,
            this.IdContrainte = data.IdContrainte
            this.ToId = data.id
          this.loading = false;
          this.handleModal('update_suivi')

        }
      } catch (error) {

        console.log('error', error);

      }

    },
    async submitUpdateSuivi(modalId) {

this.v$.UpdateSuivi.$touch();


if (this.v$.$errors.length == 0) {

  this.loading = true;
  let data = {
    id: this.ToId,
    DateSuivi: this.UpdateSuivi.DateSuivi,
    Statut: this.UpdateSuivi.Statue,  
    Observations: this.UpdateSuivi.Observations,  
    IdContrainte: this.IdContrainte
  }
  console.log('data', data)



  try {
    const response = await axios.post('contraintes/suivis', data, {
      headers: {

        Authorization: `Bearer ${this.loggedInUser.token}`,

      },
    });
    if (response.data.status === "success") {
      this.closeModal(modalId);
      this.successmsg(
        "Données du suivi mises à jour",
        "Les données du suivi  ont été mises à jour avec succès !"
      );
      await this.fetchSuiviContrainte( this.IdContrainte);



    }
  } catch (error) {

    if (error.response.data.message === "Vous n'êtes pas autorisé." || error.response.status === 401) {
      await this.$store.dispatch('auth/clearMyAuthenticatedUser');
      this.$router.push("/");  //a revoir
    }else if(error.response.data.status === "error"){
      this.loading = false;
      Swal.fire({
              title: "Enrégistrement  impossible",
              text: error.response.data.message,
              icon: "question"
            });
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

  async HandleIdDeleteSuivi(id) {
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
        this.ConfirmeDeleteContrainteSuivi(id);
      }
    },
    async ConfirmeDeleteContrainteSuivi(id) {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/contraintes/suivis/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse de suppression:", response);
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Suivi supprimé",
            "Le suivi  a été supprimé avec succès."
          );
          await this.fetchSuiviContrainte( this.IdContrainte);
          this.loading = false;

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

    getTypeContrainte(type) {
      if (type === 'ADMIN') {
        return ' ADMINISTRATIVES';
      } else if (type === 'TECH') {
        return ' TECHNIQUES';
      } else {
        return type;
      }
    },
    getClassForTypeContrainte(type) {
      if (type === 'ADMIN') {
        return 'admin-class';
      } else if (type === 'TECH') {
        return 'tech-class';
      } else {
        return 'default-class';
      }
    },

    formatDate(date) {
      const d = new Date(date);
      const day = String(d.getDate()).padStart(2, '0')
      const month = String(d.getMonth() + 1).padStart(2, '0')
      const year = String(d.getFullYear())

      return `${day}/${month}/${year}`


    },
    formatBudget(budget) {
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'GNF',
        minimumFractionDigits: 0
      }).format(budget);
    },
    tauxDecaissement(item) {
      const montantDecaisse = parseFloat(item.decaissement[0].montant_decaisser || 0);
      const budget = parseFloat(item.Budget || 0);
      return budget ? (montantDecaisse / budget) * 100 : 0;
    },
    getProgressClass(percentage) {
      if (percentage <= 30) {
        return 'bg-danger';
      } else if (percentage <= 75) {
        return 'bg-warning';
      } else {
        return 'bg-success';
      }
    },
    tauxDecaissement(item) {
      const montantDecaisse = item.decaissement && item.decaissement[0] && item.decaissement[0].montant_decaisser || 0;
      if (!item.Budget) return 0;
      return (parseFloat(montantDecaisse) / parseFloat(item.Budget)) * 100;
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
           const response = await axios.put('/projet-suivis/confirmer',data, {
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
              await this.fetchDetailProjet();
              this.loading = false
              
   
           } else {
        
            this.handleErrors(error);
           }
         } catch (error) {
          console.log('error',error)
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
      this.currentPage = 1; // Reset to the first page on search
    },
    updateCurrentPageBailleurs(pageNumber) {
      this.currentPageBailleurs = pageNumber;
      // window.scrollTo({
      //   top: 0,
      //   behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
      // });
    },

    updateCurrentPageSuiviContrainte(pageNumber) {
        this.currentPageSuiviContrainte = pageNumber;
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
.admin-class {
  color: orange;
}

.tech-class {
  color: green;
}

.default-class {
  color: black;
}
</style>