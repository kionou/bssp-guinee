<template>
  <div>
    <!-- Start::app-content -->
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <div class="row pb-0 mb-0">
      <div class="col-12 d-flex align-items-center w-100">
        <div
          class="bg-primary text-white fs-20 p-1 pt-2 text-center"
          style="width: 495px; height: 49px"
        >
          Zones d'intervention :
        </div>
        <div class="marquee-rtl bg-gray-400">
          <div>
            {{ formattedRegions }}
          </div>
        </div>
      </div>

      <div class="col-xl-4 mt-xxl-0 mt-3">
        <div class="mb-0">
          <div class="card custom-card mb-1">
            <ul class="list-group">
              <li class="list-group-item">
                <div class="d-flex flex-wrap align-items-center">
                  <div class="me-2 fw-semibold">Code :</div>
                  <span class="fw-semibold" style="color: #05b305">{{
                    data.CodeProjet
                  }}</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex flex-wrap align-items-center">
                  <div class="me-2 fw-semibold">Sigle :</div>
                  <span class="fw-semibold" style="color: #05b305">{{
                    data.Sigle
                  }}</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex flex-wrap align-items-center">
                  <div class="me-2 fw-semibold">Debut :</div>
                  <span class="fw-semibold text-warning">{{
                    formatDate(data.DateDebut)
                  }}</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex flex-wrap align-items-center">
                  <div class="me-2 fw-semibold">Fin :</div>
                  <span class="fw-semibold text-warning">{{
                    formatDate(data.DateFin)
                  }}</span>
                </div>
              </li>
              <li class="list-group-item">
                <div class="d-flex flex-wrap align-items-center">
                  <div class="me-2 fw-semibold">Durée :</div>
                  <span class="fw-semibold" style="color: red">{{
                    tempsEcoule
                  }}</span>
                </div>
              </li>
              <!-- <li class="list-group-item">
                              <div class="d-flex flex-wrap align-items-center">
                                <div class="me-2 fw-semibold">
                                  Mode Financement :
                                </div>
                                <span class=" fw-semibold " style="color:#05b305;">{{ data.ModeFinancement }}</span>
                              </div>
                            </li> -->
              <!-- <li class="list-group-item">
                              <div class="d-flex flex-wrap align-items-center">
                                <div class="me-2 fw-semibold">
                                  Zones d'intervention :
                                </div>
                                <span class="fs-12 fw-semibold " style="color:#05b305;">
                                  {{ formattedRegions }}
                                </span>
                              </div>
                            </li> -->
            </ul>
          </div>
          <p class="fs-15 fw-semibold mb-2">Autre informations :</p>
          <div class="tab-menu-heading border-0 p-0 ms-auto mt-sm-0 mt-1">
            <div class="tabs-menu-task me-1 w-100">
              <ul class="nav nav-tabs panel-tabs-task border-0" role="tablist">
                <li>
                  <button
                    type="button"
                    class="btn btn-secondaire my-1 me-1 p-1 active fw-semibold"
                    data-bs-toggle="tab"
                    data-bs-target="#Active"
                    role="tab"
                    aria-selected="true"
                  >
                    Objectifs
                    <span class="badge ms-2 bg-danger">{{
                      ObjectisOptions.length
                    }}</span>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    class="btn btn-secondaire my-1 me-1 p-1"
                    data-bs-toggle="tab"
                    data-bs-target="#Complete"
                    role="tab"
                    aria-selected="false"
                  >
                    Bailleurs
                    <span class="badge ms-2 bg-danger">{{
                      BailleursOptions.length
                    }}</span>
                  </button>
                </li>
                <!-- <li><span class="fw-semibold" data-bs-toggle="tab" data-bs-target="#Complete" role="tab" aria-selected="false">Bailleurs </span></li> -->
                <li>
                  <button
                    type="button"
                    class="btn btn-secondaire my-1 me-1 p-1"
                    data-bs-toggle="tab"
                    data-bs-target="#indicateur"
                    role="tab"
                    aria-selected="false"
                  >
                    Indicateurs
                    <span class="badge ms-2 bg-danger">{{
                      indicateursOptions.length
                    }}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-8 mt-xxl-0 mt-3">
        <div>
          <p class="fs-18 fw-semibold mb-0 text-center">{{ data.NomProjet }}</p>
          <hr />
          <div class="row">
            <div class="col-xl-7">
              <div class="fs-20 fw-semibold mb-2 lh-1 text-muted">
                <b>BUDGET (GNF):</b>
                <span class="mt-4 fs-20 fw-bolder lh-1 mx-2" style="color: red">
                  {{ totalBudget || 0 }}
                </span>
              </div>
            </div>
            <div class="col-xl-5">
              <div class="fs-20 fw-semibold mb-2 lh-1 text-muted">
                Mode Financement :
                <span
                  class="mt-4 fs-20 fw-bolder lh-1 mx-2"
                  style="color: #05b305"
                  >{{ data.ModeFinancement }}</span
                >
              </div>
            </div>
            <div class="col-xl-12">
              <div class="fs-20 mt-1 fw-semibold mb-2 lh-1 text-muted">
                <b>MAîTRE D'OUVRAGE:</b>
                <div class="fs-20 fw-semibold lh-1">
                  <span
                    class="mt-4 fs-20 fw-semibold lh-1 text-success"
                    v-if="data.infrastructures?.length === 0"
                  >
                    Aucun responsable rattaché à ce projet.
                  </span>
                  <span
                    class="mt-4 fs-20 fw-semibold text-success responsables-text"
                    v-else
                  >
                    <span
                      class="mb-4 fs-20 fw-semibold text-success"
                      v-html="formattedResponsables"
                    ></span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header fs-15 fw-semibold mb-1">Description</div>
            <div
              class="card-body text-muted pt-0"
              style="overflow: scroll; height: 130px"
            >
              {{ data.Description }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-4 pt-0 mt-0">
      <hr class="mt-0" />
      <div class="card-body p-0">
        <div class="tab-content p-0">
          <div class="tab-pane active p-0 border-0" id="Active">
            <div class="mb-3 px-1">
              <div
                class="d-sm-flex d-block align-items-center justify-content-between"
              >
                <div class="h5 fw-semibold mb-0"></div>
                <div class="d-flex mt-sm-0 mt-2 align-items-center">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      placeholder="Recherchez..."
                      aria-describedby="search-member"
                      v-model="searchObjectif"
                      @input="filterByName"
                    />
                    <button
                      class="btn btn-light"
                      type="button"
                      id="search-contact-member"
                    >
                      <i class="ri-search-line text-muted"></i>
                    </button>
                  </div>

                  <button
                    v-if="hasPermission(3)"
                    class="btn btn-icon btn-primary ms-2"
                    data-bs-placement="top"
                    data-bs-title="Add Contact"
                    v-tippy="{
                      content: 'Créer un nouvel élément',
                      theme: 'custom',
                      animation: 'shift-away',
                      backgroundColor: '#FF5733',
                    }"
                    data-bs-toggle="modal"
                    data-bs-target="#add_objectif"
                  >
                    <i class="ri-add-line"> </i>
                  </button>
                </div>
              </div>
            </div>
            <div class="row task-card">
              <div v-if="paginatedObjectifs.length === 0" class="noresul">
                <span>
                  Vous n'avez pas encore d'objectif, vous pouvez également en
                  ajouter un !!
                </span>
              </div>
              <div
                style="overflow-x: scroll !important"
                class="table-responsive"
                v-else
              >
                <table class="table table-hover table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="row" class="ps-4 fw-semibold">
                        <span class="float-right">N°</span>
                      </th>
                      <th scope="col" class="text-left">
                        <span class="fw-semibold">Intitule de l'objet</span>
                      </th>
                      <th scope="col" class="text-center">
                        <span class="fw-semibold">Etat</span>
                      </th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in paginatedObjectifs"
                      :key="item.id"
                    >
                      <th style="width: 30px" scope="row" class="ps-4">
                        {{
                          (currentPageObjectifs - 1) * itemsPerPage + index + 1
                        }}
                      </th>
                      <td>
                        <span class="d-block mb-1 text-left">
                          {{ item.Intitule }}</span
                        >
                      </td>
                      <td style="width: 130px" class="text-center">
                        <span
                          v-if="item.Visible === '1'"
                          class="badge bg-success"
                          >Activer</span
                        >
                        <span v-else class="badge bg-warning">Desactiver</span>
                      </td>
                      <td style="width: 80px">
                        <div class="btn-list w-25 d-flex">
                          <button
                            v-if="hasPermission(2)"
                            class="btn btn-sm btn-icon btn-info btn-wave"
                            data-bs-toggle="modal"
                            v-tippy="{
                              content: 'Modifier l\'élément sélectionné',
                              theme: 'custom',
                              animation: 'shift-away',
                              backgroundColor: '#FF5733',
                            }"
                            data-bs-target="#update_objectif"
                            @click="HandleIdUpdateObjectif(item.id)"
                          >
                            <i class="ri-edit-line"></i>
                          </button>

                          <button
                            v-if="hasPermission(4)"
                            class="btn btn-sm btn-icon btn-danger btn-wave"
                            v-tippy="{
                              content: 'Supprimer cet élément',
                              theme: 'custom',
                              animation: 'shift-away',
                              backgroundColor: '#FF5733',
                            }"
                            @click="HandleIdDelete(item.id)"
                          >
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
                  <Pag
                    :current-page="currentPageObjectifs"
                    :total-pages="totalPagesObjectifs"
                    @page-change="updateCurrentPageObjectifs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane p-0 border-0" id="Complete">
            <div class="mb-3 px-1">
              <div
                class="d-sm-flex d-block align-items-center justify-content-between"
              >
                <div class="h5 fw-semibold mb-0"></div>
                <div class="d-flex mt-sm-0 mt-2 align-items-center">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      placeholder="Recherchez..."
                      aria-describedby="search-member"
                      v-model="searchBailleur"
                      @input="filterByName"
                    />
                    <button
                      class="btn btn-light"
                      type="button"
                      id="search-contact-member"
                    >
                      <i class="ri-search-line text-muted"></i>
                    </button>
                  </div>

                  <button
                    v-if="hasPermission(3)"
                    class="btn btn-icon btn-primary ms-2"
                    data-bs-placement="top"
                    data-bs-title="Add Contact"
                    v-tippy="{
                      content: 'Créer un nouvel élément',
                      theme: 'custom',
                      animation: 'shift-away',
                      backgroundColor: '#FF5733',
                    }"
                    data-bs-toggle="modal"
                    data-bs-target="#add_bailleur"
                  >
                    <i class="ri-add-line"> </i>
                  </button>
                </div>
              </div>
            </div>
            <div class="row task-card">
              <div v-if="paginatedBailleurs.length === 0" class="noresul">
                <span>
                  Vous n'avez pas encore de bailleur, vous pouvez également en
                  ajouter un !!
                </span>
              </div>
              <div
                style="overflow-x: scroll !important"
                class="table-responsive"
                v-else
              >
                <table class="table table-hover table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="row" class="ps-4 fw-semibold">
                        <span class="float-right">N°</span>
                      </th>
                      <th scope="col" class="text-left">
                        <span class="fw-semibold">Nom</span>
                      </th>
                      <th scope="col" class="text-center">
                        <span class="fw-semibold">Apport bailleur</span>
                      </th>
                      <th scope="col" class="text-center">
                        <span class="fw-semibold">Montant Décaissé</span>
                      </th>
                      <th scope="col" class="text-center">
                        <span class="fw-semibold">Taux décaissement</span>
                      </th>
                      <th scope="col" class="text-center">
                        <span class="fw-semibold">Commentaire</span>
                      </th>

                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(item, index) in paginatedBailleurs"
                      :key="item.id"
                    >
                      <th style="width: 30px" scope="row" class="ps-4">
                        {{
                          (currentPageBailleurs - 1) * itemsPerPage + index + 1
                        }}
                      </th>
                      <td>
                        <span class="d-block fw-semibold mb-1 text-left">
                          {{ item.CodeBailleur }}</span
                        >
                      </td>
                      <td style="width: 150px" class="text-center">
                        <span class="d-block fw-semibold mb-1">
                          {{ formatBudget(item.Budget) || 0 }}
                        </span>
                      </td>
                      <td style="width: 150px" class="text-center">
                        <span
                          class="d-block fw-semibold mb-1"
                          v-if="item.decaissement.length === 0"
                          >0 GNF</span
                        >
                        <span class="d-block fw-semibold mb-1" v-else>{{
                          formatBudget(item.decaissement[0]?.montant_decaisser)
                        }}</span>
                      </td>
                      <td style="width: 130px" class="text-center">
                        <span
                          class="text-center fw-semibold"
                          :style="{
                            color: getProgressColor(tauxDecaissement(item)),
                          }"
                        >
                          {{ tauxDecaissement(item).toFixed(2) }}%
                        </span>

                        <div
                          class="progress"
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            class="progress-bar progress-bar-striped"
                            :class="getProgressClass(tauxDecaissement(item))"
                            :style="{ width: tauxDecaissement(item) + '%' }"
                            :aria-valuenow="tauxDecaissement(item)"
                          ></div>
                        </div>
                      </td>
                      <td>
                        <span class="d-block fw-semibold mb-1">
                          {{ item.Commentaire ?? "-" }}</span
                        >
                      </td>

                      <td class="" style="width: 80px">
                        <div class="btn-list w-25 d-flex">
                          <button
                            v-if="hasPermission(2)"
                            class="btn btn-sm btn-icon btn-info btn-wave"
                            data-bs-toggle="modal"
                            v-tippy="{
                              content: 'Modifier l\'élément sélectionné',
                              theme: 'custom',
                              animation: 'shift-away',
                              backgroundColor: '#FF5733',
                            }"
                            data-bs-target="#update_bailleur"
                            @click="HandleIdUpdateBailleur(data.id, item.id)"
                          >
                            <i class="ri-edit-line"></i>
                          </button>

                          <button
                            v-if="hasPermission(4)"
                            class="btn btn-sm btn-icon btn-danger btn-wave"
                            @click="HandleIdDeleteBailleur(item.CodeBailleur)"
                            v-tippy="{
                              content: 'Supprimer cet élément',
                              theme: 'custom',
                              animation: 'shift-away',
                              backgroundColor: '#FF5733',
                            }"
                          >
                            <i class="ri-delete-bin-line"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2"><strong>Total général</strong></td>
                      <td class="text-center">
                        <strong style="color: red">{{
                          formatBudget(data.bailleurs_sum_budget ?? "-")
                        }}</strong>
                      </td>
                      <td class="text-center">
                        <strong style="color: red"
                          >{{ totalMontantDecaisse }} GNF</strong
                        >
                      </td>
                      <td class="text-center">
                        <span
                          class="text-center fw-semibold"
                          :style="{
                            color: getProgressColor(tauxDecaissementTotal),
                          }"
                        >
                          {{ tauxDecaissementTotal }}%
                        </span>

                        <div
                          class="progress mb-3"
                          role="progressbar"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        >
                          <div
                            class="progress-bar progress-bar-striped"
                            :class="{
                              'bg-danger': tauxDecaissementTotal <= 30,
                              'bg-warning':
                                tauxDecaissementTotal > 30 &&
                                tauxDecaissementTotal <= 75,
                              'bg-success': tauxDecaissementTotal > 75,
                            }"
                            :style="{ width: tauxDecaissementTotal + '%' }"
                            :aria-valuenow="tauxDecaissementTotal"
                          ></div>
                        </div>
                      </td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-12">
                <div class="container_pagination">
                  <Pag
                    :current-page="currentPageBailleurs"
                    :total-pages="totalPagesBailleurs"
                    @page-change="updateCurrentPageBailleurs"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="tab-pane p-0 border-0" id="indicateur">
            <div class="mb-3 px-1">
              <div
                class="d-sm-flex d-block align-items-center justify-content-between"
              >
                <div class="h5 fw-semibold mb-0"></div>
                <div class="d-flex mt-sm-0 mt-2 align-items-center">
                  <div class="input-group">
                    <input
                      type="text"
                      class="form-control bg-light border-0"
                      placeholder="Recherchez..."
                      aria-describedby="search-member"
                      v-model="search"
                      @input="filterByName"
                    />
                    <button
                      class="btn btn-light"
                      type="button"
                      id="search-contact-member"
                    >
                      <i class="ri-search-line text-muted"></i>
                    </button>
                  </div>

                  <button
                    v-if="hasPermission(3)"
                    class="btn btn-icon btn-primary ms-2"
                    data-bs-placement="top"
                    data-bs-title="Add Contact"
                    v-tippy="{
                      content: 'Créer un nouvel élément',
                      theme: 'custom',
                      animation: 'shift-away',
                      backgroundColor: '#FF5733',
                    }"
                    data-bs-toggle="modal"
                    data-bs-target="#add_indicateur"
                  >
                    <i class="ri-add-line"> </i>
                  </button>
                </div>
              </div>
            </div>

            <div class="row task-card">
              <div v-if="paginatedItems.length === 0" class="noresul">
                <span>
                  Vous n'avez pas encore d'incateur, vous pouvez également en
                  ajouter un !!
                </span>
              </div>
              <div
                style="overflow-x: scroll !important"
                class="table-responsive"
                v-else
              >
                <table class="table table-hover table-bordered table-striped">
                  <thead>
                    <tr class="text-center">
                      <th scope="row" class="ps-4">
                        <span class="float-left fw-semibold">Code</span>
                      </th>
                      <th scope="col" class="text-left">
                        <span class="fw-semibold">Intitule</span>
                      </th>
                      <th scope="col " class="text-center">
                        <span class="fw-semibold">Valeur Cible</span>
                      </th>
                      <th scope="col text-center">
                        <span class="fw-semibold">Valeur réalisée</span>
                      </th>
                      <th scope="col text-center">
                        <span class="fw-semibold">Date suivi</span>
                      </th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in paginatedItems" :key="item.id">
                      <th style="width: 30px" scope="row" class="ps-4">
                        {{ item.CodeIndicateur }}
                      </th>
                      <td>
                        <span class="d-block mb-1 text-left">
                          {{ item.IntituleIndicateur }}</span
                        >
                      </td>
                      <td style="width: 130px" class="text-center">
                        <span
                          class="d-block fw-semibold mb-1"
                          style="color: red"
                        >
                          {{ item.CibleFinProjet }}
                        </span>
                      </td>
                      <td style="width: 150px">
                        <span
                          class="d-block fw-semibold mb-1 text-center text-primary"
                        >
                          {{ item.progress[0]?.Realisation ?? "-" }}
                        </span>
                      </td>
                      <td style="width: 150px">
                        <span class="d-block fw-semibold mb-1 text-center">
                          {{
                            item.progress[0]?.DateSuivi == null
                              ? "-"
                              : formatDate(item.progress[0]?.DateSuivi)
                          }}
                        </span>
                      </td>
                      <!-- <td class="text-center"> <button class="btn btn-warning btn-sm ">suivi</button>
              </td> -->

                      <td style="width: 80px">
                        <div class="btn-list w-25 d-flex">
                          <button
                            v-if="hasPermission(2)"
                            class="btn btn-sm btn-icon btn-info btn-wave"
                            data-bs-placement="top"
                            data-bs-title="Add Contact"
                            data-bs-toggle="modal"
                            v-tippy="{
                              content: 'Modifier l\'élément sélectionné',
                              theme: 'custom',
                              animation: 'shift-away',
                              backgroundColor: '#FF5733',
                            }"
                            data-bs-target="#update_indicateurs"
                            @click="HandleIdUpdateIndicateur(item.id)"
                          >
                            <i class="ri-edit-line"></i>
                          </button>

                          <button
                            v-if="hasPermission(4)"
                            class="btn btn-sm btn-icon btn-danger btn-wave"
                            @click="HandleIdDeleteIndicateur(item.id)"
                            v-tippy="{
                              content: 'Supprimer cet élément',
                              theme: 'custom',
                              animation: 'shift-away',
                              backgroundColor: '#FF5733',
                            }"
                          >
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
                  <Pag
                    :current-page="currentPage"
                    :total-pages="totalPages"
                    @page-change="updateCurrentPage"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--add bailleur -->
    <!-- <div class="modal fade effect-rotate-bottom " id="add_bailleur" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="add_bailleur">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Attribuer des bailleurs au projet </b>
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
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Nom <span class="text-danger">*</span></label>
                      <MazInput v-model="bailleur.nom" color="info" name="nom" size="sm" rounded-size="sm" type="text" />
                      <small v-if="v$.bailleur.nom.$error">{{
                        v$.bailleur.nom.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['nom']">
                        {{ resultError["nom"] }}
                      </small>
                    </div>
                  </div>
  
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword">Budget <span class="text-danger">*</span></label>
                      <MazInput v-model="bailleur.budget" type="text" color="info" name="budget" size="sm"
                        rounded-size="sm" />
                      <small v-if="v$.bailleur.budget.$error">{{
                        v$.bailleur.budget.$errors[0].$message
                        }}</small>
                      <small v-if="resultError['budget']">
                        {{ resultError["budget"] }}
                      </small>
                    </div>
                  </div>
  
  
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="submitBailleur('add_bailleur')">
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
    </div> -->

    <!-- add bailleur -->
    <div
      class="modal fade effect-rotate-bottom"
      id="add_bailleur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_bailleur"
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
              <b class="text-center">Attribuer des bailleurs au projet </b>
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
                <div
                  class="btn-list"
                  style="position: absolute; right: 7px; top: 5px"
                >
                  <div class="bouttons">
                    <div
                      class="boutton"
                      style="
                        width: 100px;
                        z-index: 1000;
                        max-width: 200px !important;
                      "
                      @click="AddformDataBailleurs"
                      v-tippy="{
                        content: 'Créer une nouvelle ligne',
                        theme: 'custom',
                        animation: 'shift-away',
                        backgroundColor: '#FF5733',
                      }"
                    >
                      <i class="ri-add-line"></i>Ajouter
                    </div>
                  </div>
                </div>
                <div
                  class="row align-items-center p-2 border-bottom"
                  v-for="(bailleur, index) in Bailleurs"
                  :key="bailleur.id"
                >
                  <div class="col-11">
                    <span class="nombre">
                      {{ index + 1 }}
                    </span>
                    <div class="row content-group">
                      <div
                        class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12"
                      >
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Nom Bailleur
                            <span class="text-danger">*</span></label
                          >

                          <MazSelect
                            v-model="bailleur.CodeBailleur"
                            color="info"
                            name="CodeBailleur"
                            size="sm"
                            rounded-size="sm"
                            search
                            @click="clearErrorBailleurs(index, 'CodeBailleur')"
                            :options="BailleursOption"
                          />
                          <small
                            v-if="
                              errors.Bailleurs &&
                              errors.Bailleurs[index] &&
                              errors.Bailleurs[index].CodeBailleur
                            "
                            >{{ errors.Bailleurs[index].CodeBailleur }}</small
                          >
                          <small v-if="resultError['Bailleurs']">
                            {{ resultError["Bailleurs"] }}
                          </small>
                        </div>
                      </div>
                      <div
                        class="col-xxl-4 col-xl-4 col-lg-4 col-md-6 col-sm-12"
                      >
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Apport bailleur
                            <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="bailleur.Budget"
                            color="info"
                            name="Budget"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            @input="clearErrorBailleurs(index, 'Budget')"
                          />
                          <small
                            v-if="
                              errors.Bailleurs &&
                              errors.Bailleurs[index] &&
                              errors.Bailleurs[index].Budget
                            "
                            >{{ errors.Bailleurs[index].Budget }}</small
                          >
                          <small v-if="resultError['Bailleurs']">
                            {{ resultError["Bailleurs"] }}
                          </small>
                        </div>
                      </div>
                      <div
                        class="col-xxl-4 col-xl-4 col-lg-4 col-md-12 col-sm-12"
                      >
                        <div class="input-groupe">
                          <label for="userpassword">Commentaire </label>
                          <!-- <MazInput
                        v-model="bailleur.Budget"
                        color="info"
                        name="Budget"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                        @input="clearErrorBailleurs(index, 'Budget')"
                      /> -->
                          <textarea
                            class="form-control"
                            id="text-area"
                            v-model="bailleur.Commentaire"
                            rows="1"
                            @input="clearErrorBailleurs(index, 'Commentaire')"
                          ></textarea>
                          <small
                            v-if="
                              errors.Bailleurs &&
                              errors.Bailleurs[index] &&
                              errors.Bailleurs[index].Commentaire
                            "
                            >{{ errors.Bailleurs[index].Commentaire }}</small
                          >
                          <small v-if="resultError['Bailleurs']">
                            {{ resultError["Bailleurs"] }}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    <button
                      class="btn btn-sm btn-icon btn-danger btn-wave"
                      @click="deleteRowBailleurs(index)"
                      style="
                        position: absolute !important ;
                        top: 18px !important;
                        background: red;
                      "
                      v-tippy="{
                        content: 'Supprimer cette ligne',
                        theme: 'custom',
                        animation: 'shift-away',
                        backgroundColor: '#FF5733',
                      }"
                    >
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="submitBailleurs('add_bailleur')"
                  >
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

    <!-- update bailleur -->
    <div
      class="modal fade effect-rotate-bottom"
      id="update_bailleur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_bailleur"
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
              <b class="text-center">Modifier un bailleur </b>
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
                <div class="row align-items-center p-2 border-bottom">
                  <div class="col-12">
                    <div class="row content-group">
                      <div class="col-12">
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Nom Bailleur
                            <span class="text-danger">*</span></label
                          >

                          <MazSelect
                            v-model="bailleurUpdate.CodeBailleur"
                            color="info"
                            name="CodeBailleur"
                            size="sm"
                            rounded-size="sm"
                            search
                            :options="BailleursOptionUpates"
                          />
                          <small v-if="v$.bailleurUpdate.CodeBailleur.$error">{{
                            v$.bailleurUpdate.CodeBailleur.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['CodeBailleur']">
                            {{ resultError["CodeBailleur"] }}
                          </small>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Apport bailleur
                            <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="bailleurUpdate.Budget"
                            color="info"
                            name="Budget"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                          />
                          <small v-if="v$.bailleurUpdate.Budget.$error">{{
                            v$.bailleurUpdate.Budget.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['Budget']">
                            {{ resultError["Budget"] }}
                          </small>
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="input-groupe">
                          <label for="userpassword">Commentaire</label>
                          <MazTextarea
                            v-model="bailleurUpdate.Commentaire"
                            color="info"
                            name="Budget"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                          />
                          <small v-if="v$.bailleurUpdate.Commentaire.$error">{{
                            v$.bailleurUpdate.Commentaire.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['Commentaire']">
                            {{ resultError["Commentaire"] }}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="submitUpdateBaileurs('update_bailleur')"
                  >
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
    <!-- add Objectif -->

    <div
      class="modal fade effect-rotate-bottom"
      id="add_objectif"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_objectif"
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
              <b class="text-center">Ajouter des objectifs </b>
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
                <div
                  class="btn-list"
                  style="position: absolute; right: 7px; top: 5px"
                >
                  <div class="bouttons">
                    <div
                      class="boutton"
                      style="width: 38px; z-index: 1000"
                      @click="AddformDataObjectifs"
                      v-tippy="{
                        content: 'Créer une nouvelle ligne',
                        theme: 'custom',
                        animation: 'shift-away',
                        backgroundColor: '#FF5733',
                      }"
                    >
                      <i class="ri-add-line"></i>
                    </div>
                  </div>
                </div>
                <div
                  class="row align-items-center p-2 border-bottom"
                  v-for="(objectif, index) in Objectifs"
                  :key="objectif.id"
                >
                  <div class="col-11">
                    <span class="nombre">
                      {{ index + 1 }}
                    </span>
                    <div class="row content-group">
                      <div
                        class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                      >
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Intitulé de l'objet
                            <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="objectif.Intitule"
                            color="info"
                            name="Intitule"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            @input="clearErrorObjectifs(index, 'Intitule')"
                          />
                          <small
                            v-if="
                              errors.Objectifs &&
                              errors.Objectifs[index] &&
                              errors.Objectifs[index].Intitule
                            "
                            >{{ errors.Objectifs[index].Intitule }}</small
                          >
                          <small v-if="resultError['Objectifs']">
                            {{ resultError["Objectifs"] }}
                          </small>
                        </div>
                      </div>
                      <div
                        class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                      >
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Visible <span class="text-danger">*</span></label
                          >
                          <MazSelect
                            v-model="objectif.Visible"
                            color="info"
                            name="Visible"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            @click="clearErrorObjectifs(index, 'Visible')"
                            :options="choix"
                          />
                          <small
                            v-if="
                              errors.Objectifs &&
                              errors.Objectifs[index] &&
                              errors.Objectifs[index].Visible
                            "
                            >{{ errors.Objectifs[index].Visible }}</small
                          >
                          <small v-if="resultError['Objectifs']">
                            {{ resultError["Objectifs"] }}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    <button
                      class="btn btn-sm btn-icon btn-danger btn-wave"
                      @click="deleteRowObjectifs(index)"
                      v-tippy="{
                        content: 'Supprimer cette ligne',
                        theme: 'custom',
                        animation: 'shift-away',
                        backgroundColor: '#FF5733',
                      }"
                      style="
                        position: absolute !important ;
                        top: 18px !important;
                        background: red;
                      "
                    >
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="submitObjectifs('add_objectif')"
                  >
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

    <!-- update objectifs -->
    <div
      class="modal fade effect-rotate-bottom"
      id="update_objectif"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_objectif"
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
              <b class="text-center">Modifier un objectif </b>
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
                        >Intitulé de l'objet
                        <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="objectif.Intitule"
                        color="info"
                        name="Intitule"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                      />
                      <small v-if="v$.objectif.Intitule.$error">{{
                        v$.objectif.Intitule.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['Intitule']">
                        {{ resultError["Intitule"] }}
                      </small>
                    </div>
                  </div>
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Visible <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="objectif.Visible"
                        type="text"
                        color="info"
                        name="Visible"
                        size="sm"
                        :options="choix"
                        rounded-size="sm"
                      />
                      <small v-if="v$.objectif.Visible.$error">{{
                        v$.objectif.Visible.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['Visible']">
                        {{ resultError["Visible"] }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="submitUpdateObjectifs('update_objectif')"
                  >
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

    <!-- add indicateur -->

    <div
      class="modal fade effect-rotate-bottom"
      id="add_indicateur"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_indicateur"
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
                <div
                  class="btn-list"
                  style="position: absolute; right: 7px; top: 5px"
                >
                  <div class="bouttons">
                    <div
                      class="boutton"
                      style="width: 38px; z-index: 1000"
                      @click="AddformDataIndicateurs"
                      v-tippy="{
                        content: 'Créer une nouvelle ligne',
                        theme: 'custom',
                        animation: 'shift-away',
                        backgroundColor: '#FF5733',
                      }"
                    >
                      <i class="ri-add-line"></i>
                    </div>
                  </div>
                </div>
                <div
                  class="row align-items-center p-2 border-bottom"
                  v-for="(indicateur, index) in Indicateurs"
                  :key="indicateur.id"
                >
                  <div class="col-11">
                    <span class="nombre">
                      {{ index + 1 }}
                    </span>
                    <div class="row content-group">
                      <div
                        class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12"
                      >
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Code <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="indicateur.CodeIndicateur"
                            color="info"
                            name="CodeIndicateur"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            @input="
                              clearErrorIndicateurs(index, 'CodeIndicateur')
                            "
                          />
                          <small
                            v-if="
                              errors.Indicateurs &&
                              errors.Indicateurs[index] &&
                              errors.Indicateurs[index].CodeIndicateur
                            "
                            >{{
                              errors.Indicateurs[index].CodeIndicateur
                            }}</small
                          >
                        </div>
                      </div>
                      <div
                        class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12"
                      >
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Intitulé <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="indicateur.IntituleIndicateur"
                            color="info"
                            name="IntituleIndicateur"
                            size="sm"
                            rounded-size="sm"
                            type="text"
                            @input="
                              clearErrorIndicateurs(index, 'IntituleIndicateur')
                            "
                          />
                          <small
                            v-if="
                              errors.Indicateurs &&
                              errors.Indicateurs[index] &&
                              errors.Indicateurs[index].IntituleIndicateur
                            "
                            >{{
                              errors.Indicateurs[index].IntituleIndicateur
                            }}</small
                          >
                          <small v-if="resultError['Indicateurs']">
                            {{ resultError["Indicateurs"] }}
                          </small>
                        </div>
                      </div>
                      <div
                        class="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-12"
                      >
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Valeur cible
                            <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="indicateur.CibleFinProjet"
                            type="number"
                            min="0"
                            color="info"
                            name="CibleFinProjet"
                            size="sm"
                            rounded-size="sm"
                            @input="
                              clearErrorIndicateurs(index, 'CibleFinProjet')
                            "
                          />
                          <small
                            v-if="
                              errors.Indicateurs &&
                              errors.Indicateurs[index] &&
                              errors.Indicateurs[index].CibleFinProjet
                            "
                            >{{
                              errors.Indicateurs[index].CibleFinProjet
                            }}</small
                          >
                          <small v-if="resultError['Indicateurs']">
                            {{ resultError["Indicateurs"] }}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-1" style="position: relative">
                    <button
                      class="btn btn-sm btn-icon btn-danger btn-wave"
                      @click="deleteRowIndicateurs(index)"
                      v-tippy="{
                        content: 'Supprimer cette ligne',
                        theme: 'custom',
                        animation: 'shift-away',
                        backgroundColor: '#FF5733',
                      }"
                      style="
                        position: absolute !important ;
                        top: 18px !important;
                        background: red;
                      "
                    >
                      style=" position:absolute !important ; top: 18px
                      !important; background:red;">
                      <i class="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="submitIndicateur('add_indicateur')"
                  >
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

    <!-- update indicateur -->
    <div
      class="modal fade effect-rotate-bottom"
      id="update_indicateurs"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_indicateurs"
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
              <b class="text-center">Modifier un indicateur </b>
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
                        v-model="indicateur.CodeIndicateur"
                        color="info"
                        name="CodeIndicateur"
                        size="sm"
                        rounded-size="sm"
                        type="text"
                      />
                      <small v-if="v$.indicateur.CodeIndicateur.$error">{{
                        v$.indicateur.CodeIndicateur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['CodeIndicateur']">
                        {{ resultError["CodeIndicateur"] }}
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
                        v-model="indicateur.IntituleIndicateur"
                        type="text"
                        color="info"
                        name="IntituleIndicateur"
                        size="sm"
                        rounded-size="sm"
                      />
                      <small v-if="v$.indicateur.IntituleIndicateur.$error">{{
                        v$.indicateur.IntituleIndicateur.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['IntituleIndicateur']">
                        {{ resultError["IntituleIndicateur"] }}
                      </small>
                    </div>
                  </div>
                </div>
                <div class="row mt-3 content-group">
                  <div class="col">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Cible fin projet
                        <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="indicateur.CibleFinProjet"
                        type="text"
                        color="info"
                        name="CibleFinProjet"
                        size="sm"
                        rounded-size="sm"
                      />
                      <small v-if="v$.indicateur.CibleFinProjet.$error">{{
                        v$.indicateur.CibleFinProjet.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['CibleFinProjet']">
                        {{ resultError["CibleFinProjet"] }}
                      </small>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-3">
                <div class="boutton">
                  <button
                    class=""
                    @click.prevent="
                      submitUpdateIndicateur('update_indicateurs')
                    "
                  >
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
import axios from "@/lib/axiosConfig";
import Loading from "@/components/others/loading.vue";
import Pag from "@/components/others/pagination.vue";

import useVuelidate from "@vuelidate/core";
import Objectif from "@/components/projets/objectif.vue";
import { require, lgmin, lgmax, ValidEmail } from "@/functions/rules";
import { successmsg } from "@/lib/modal.js";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import Swal from "sweetalert2";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    ObjectisOptions: {
      type: Array,
      required: true,
    },
    BailleursOptions: {
      type: Array,
      required: true,
    },
    indicateursOptions: {
      type: Array,
      required: true,
    },
  },
  components: {
    Loading,
    Objectif,
    Pag,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    formattedRegions() {
      if (!this.data || !this.data.regions) {
        return "";
      }
      return this.data.regions
        .map((region) => region.region?.NomRegion)
        .filter(Boolean) // Filtre pour enlever les valeurs indéfinies ou nulles
        .join(", ");
    },
    formattedResponsables() {
      if (!this.data || !this.data?.infrastructures) {
        return "";
      }
      const arrayInfrastructure = this.data?.infrastructures[0].MaitreOuvrage;
      // const arrayInfrastructure =  this.data?.infrastructures.map(i => i.MaitreOuvrage)
      return arrayInfrastructure;
      // .map(responsable => {
      //   return responsable?.MaitreOuvrage; })
      // .filter(name => name.trim() !== '') // Filtre pour enlever les noms vides
      // .join(', '); // Using non-breaking space here
    },

    // Pour ObjectisOptions
    totalPagesObjectifs() {
      return Math.ceil(this.filteredObjectifs.length / this.itemsPerPage);
    },
    paginatedObjectifs() {
      const startIndex = (this.currentPageObjectifs - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.filteredObjectifs.slice(startIndex, endIndex);
    },
    filteredObjectifs() {
      if (!this.searchObjectif) {
        return this.ObjectisOptions;
      }
      const searchValue = this.searchObjectif.toLowerCase();
      return this.ObjectisOptions.filter((objectif) => {
        const nom = objectif.Intitule || "";
        return nom.toLowerCase().includes(searchValue);
      });
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
        return total + parseFloat(bailleur.Budget || 0);
      }, 0).toLocaleString(); // Formatage avec séparateurs de milliers
    },

    // Calcul du montant total décaissé
    totalMontantDecaisse() {
      return this.BailleursOptions.reduce((total, item) => {
        return (
          total +
          parseFloat(
            (item.decaissement &&
              item.decaissement[0] &&
              item.decaissement[0].montant_decaisser) ||
              0
          )
        );
      }, 0).toLocaleString(); // Formatage avec séparateurs de milliers
    },

    // Calcul du taux de décaissement total en pourcentage
    tauxDecaissementTotal() {
      const totalBudgetValue = this.BailleursOptions.reduce(
        (total, bailleur) => {
          return total + parseFloat(bailleur.Budget || 0);
        },
        0
      );
      const totalMontantDecaisseValue = this.BailleursOptions.reduce(
        (total, item) => {
          return (
            total +
            parseFloat(
              (item.decaissement &&
                item.decaissement[0] &&
                item.decaissement[0].montant_decaisser) ||
                0
            )
          );
        },
        0
      );
      if (totalBudgetValue === 0) return 0;
      return ((totalMontantDecaisseValue / totalBudgetValue) * 100).toFixed(2);
    },
    filteredBailleursOptions() {
      return this.BailleursOptions.filter((option) => {
        option.CodeBailleur;

        return !this.BailleursOption.some(
          (apiOption) => apiOption.value === option.CodeBailleur
        );
      });
    },

    // pour indicateur
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
        return this.indicateursOptions;
      }
      const searchValue = this.search.toLowerCase();
      return this.indicateursOptions.filter((user) => {
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

    tempsEcoule() {
      const dateDebut = new Date(this.data.DateDebut);
      const dateFin = new Date(this.data.DateFin);

      let years = dateFin.getFullYear() - dateDebut.getFullYear();
      let months = dateFin.getMonth() - dateDebut.getMonth();
      let days = dateFin.getDate() - dateDebut.getDate();

      if (days < 0) {
        months -= 1;
        days += new Date(
          dateFin.getFullYear(),
          dateFin.getMonth(),
          0
        ).getDate();
      }

      if (months < 0) {
        years -= 1;
        months += 12;
      }

      if (years > 0) {
        return `${years} année${years > 1 ? "s" : ""} et ${months} mois`;
      } else {
        return `${months} mois et ${days} jour${days > 1 ? "s" : ""}`;
      }
    },
  },

  data() {
    return {
      loading: false,
      Code: "",
      searchBailleur: "",
      searchObjectif: "",
      search: "",
      currentPageObjectifs: 1,
      currentPageBailleurs: 1,
      currentPage: 1,
      itemsPerPage: 6,
      totalPageArray: [],
      BailleursOption: [],
      BailleursOptionUpates: [],
      filteredBailleursOptions: [],
      ListeBailleurs: [],

      // totalMontantDecaisse: 0,
      // totalBudget: 0,
      // tauxDecaissementTotal: 0,
      choix: [
        { label: "Oui", value: true },
        { label: "Non", value: "non" },
      ],
      errors: {
        Objectifs: [],
        Bailleurs: [],
        Indicateurs: [],
      },
      Objectifs: [
        {
          Intitule: "",
          Visible: "",
        },
      ],
      Bailleurs: [
        {
          CodeBailleur: "",
          Budget: "",
          Commentaire: "",
        },
      ],

      Indicateurs: [
        {
          CodeIndicateur: "",
          IntituleIndicateur: "",
          CibleFinProjet: "",
        },
      ],
      indicateur: {
        CodeIndicateur: "",
        IntituleIndicateur: "",
        CibleFinProjet: "",
      },
      bailleur: {
        CodeBailleur: "",
        Budget: "",
        Commentaire: "",
      },

      objectif: {
        Intitule: "",
        Visible: "",
      },
      bailleurUpdate: {
        CodeBailleur: "",
        Budget: "",
        Commentaire: "",
      },
      resultError: {},
      v$: useVuelidate(),
      error: "",
    };
  },
  validations: {
    bailleur: {
      CodeBailleur: { require },
      Budget: { require },
    },
    objectif: {
      Intitule: { require },
      Visible: { require },
    },
    indicateur: {
      CodeIndicateur: { require },
      IntituleIndicateur: { require },
      CibleFinProjet: { require },
    },
    bailleurUpdate: {
      CodeBailleur: { require },
      Budget: { require },
      Commentaire: {},
    },
  },
  watch: {
    data: {
      handler(newVal) {
        this.Code = newVal.CodeProjet;
        this.ListeBailleurs = newVal.bailleurs;

        this.fetchBailleurs(newVal.bailleurs);
      },
      deep: true,
      immediate: true,
    },
    BailleursOptions: "filterBailleurs",
  },

  async mounted() {
    this.Code = localStorage.getItem("CodeProjet");
  },

  methods: {
    successmsg: successmsg,
    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },
    async fetchBailleurs(bailleurs) {
      try {
        const response = await axios.get("/bailleurs", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        if (response.data.status === "success") {
          response.data.data?.map(
            (item) =>
              !bailleurs.some((i) => item.CodeBailleur === i.CodeBailleur) &&
              this.BailleursOption.push({
                label: item.NomBailleur,
                value: item.CodeBailleur,
              })
          );

          response.data.data?.map((item) =>
            this.BailleursOptionUpates.push({
              label: item.NomBailleur,
              value: item.CodeBailleur,
            })
          );

          this.loading = false;
        }
      } catch (error) {}
    },

    filterBailleurs() {
      this.filteredBailleursOptions = this.BailleursOption.filter(
        (apiBailleur) => {
          return !this.BailleursOptions.some((propBailleur) => {
            return apiBailleur.value === propBailleur.CodeBailleur;
          });
        }
      );
    },

    AddformDataObjectifs() {
      this.Objectifs.push({ Intitule: "", Visible: "" });
    },
    deleteRowObjectifs(index) {
      if (index !== 0) {
        this.Objectifs.splice(index, 1);
      }
    },
    clearErrorObjectifs(index, field) {
      if (this.errors.Objectifs[index]) {
        this.errors.Objectifs[index][field] = null;
      }
    },
    validateObjectifs() {
      let isValid = true;
      this.errors = { Objectifs: [] };
      this.Objectifs.forEach((objectif, index) => {
        const objectifErrors = {};
        if (!objectif.Intitule) {
          objectifErrors.Intitule = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!objectif.Visible) {
          objectifErrors.Visible = "Ce champs est obligatoire!";
          isValid = false;
        }

        this.errors.Objectifs[index] = objectifErrors;
      });
      return isValid;
    },
    async submitObjectifs(modalId) {
      if (this.validateObjectifs()) {
        this.loading = true;
        this.Objectifs.forEach((objectif) => {
          if (objectif.Visible === "non") {
            objectif.Visible = false;
          }
        });
        const dataToSend = {
          projet: this.Code,
          objectives: this.Objectifs,
        };

        try {
          const response = await axios.post("/projet-objectifs", dataToSend, {
            headers: {
               Authorization: `Bearer ${this.loggedInUser.token}`,
               


             },
          });
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Objectifs créés avec succès",
              "Les nouveaux objectifs ont été créés avec succès !"
            );
            this.loading = false;
            this.$emit("indicateur-updated");
          } else {
          }
        } catch (error) {
          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrorsMultiple(
              error.response.data.errors,
              "Objectifs"
            );
          }
        }
      } else {
      }
    },
    async HandleIdUpdateObjectif(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/projet-objectifs/detail/${id}`, {
          headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response) {
          let data = response.data.data;
          (this.objectif.Intitule = data.Intitule),
            (this.objectif.Visible = data.Visible === "1" ? true : "non"),
            (this.ToId = data.id);
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
    async submitUpdateObjectifs(modalId) {
      this.v$.objectif.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        const dataSend = {
          projet: this.Code,
          objectives: [
            {
              id: this.ToId,
              Intitule: this.objectif.Intitule,
              Visible:
                this.objectif.Visible === "non" ? false : this.objectif.Visible,
            },
          ],
        };

        try {
          const response = await axios.put(
            "projet-objectifs/update",
            dataSend,
            {
              headers: {
                  Authorization: `Bearer ${this.loggedInUser.token}`,
              },
            }
          );

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Données de l'objectif mises à jour",
              "Les données de l'objectif ont été mises à jour avec succès !"
            );
            this.loading = false;
            this.$emit("indicateur-updated");
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
        const response = await axios.delete(`/projet-objectifs/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Objectif supprimé",
            "Objectif  a été supprimé avec succès."
          );
          this.loading = false;
          this.$emit("indicateur-updated");
        } else {
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
    getProgressColor(percentage) {
      if (percentage <= 30) {
        return "red";
      } else if (percentage <= 75) {
        return "orange";
      } else {
        return "green";
      }
    },

    // debut bailleur

    AddformDataBailleurs() {
      this.Bailleurs.push({ Intitule: "", Visible: "", Commentaire: "" });
    },
    deleteRowBailleurs(index) {
      if (index !== 0) {
        this.Bailleurs.splice(index, 1);
      }
    },
    clearErrorBailleurs(index, field) {
      if (this.errors.Bailleurs[index]) {
        this.errors.Bailleurs[index][field] = null;
      }
    },
    validateBailleurs() {
      let isValid = true;
      this.errors = { Bailleurs: [] };
      this.Bailleurs.forEach((bailleur, index) => {
        const bailleurErrors = {};
        if (!bailleur.CodeBailleur) {
          bailleurErrors.CodeBailleur = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!bailleur.Budget) {
          bailleurErrors.Budget = "Ce champ est obligatoire!";
          isValid = false;
        } else if (bailleur.Budget == 0) {
          bailleurErrors.Budget = "Le budget ne peut pas être 0!";
          isValid = false;
        }

        this.errors.Bailleurs[index] = bailleurErrors;
      });
      return isValid;
    },
    async submitBailleurs(modalId) {
      if (this.validateBailleurs()) {
        this.loading = true;

        const dataToSend = {
          projet: this.Code,
          bailleurs: this.Bailleurs,
        };

        try {
          const response = await axios.post(
            "/projets/assigner-bailleurs/projet",
            dataToSend,
            {
              headers: { 
                  Authorization: `Bearer ${this.loggedInUser.token}`,
               },
            }
          );

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Bailleurs et budgets attribués avec succès",
              "Les bailleurs et leurs budgets ont été attribués au projet avec succès !"
            );
            this.loading = false;
            this.$emit("indicateur-updated");
          } else {
          }
        } catch (error) {
          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrorsMultiple(
              error.response.data.errors,
              "Bailleurs"
            );
          }
        }
      } else {
      }
    },
    async HandleIdUpdateBailleur(id, Idbailleur) {
      this.loading = true;

      try {
        const response = await axios.get(`/projets/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response) {
          let data = response.data.data.bailleurs;
          let selectedBailleur = data.find(
            (bailleur) => bailleur.id === Idbailleur
          );

          if (selectedBailleur) {
            (this.bailleurUpdate.CodeBailleur = selectedBailleur.CodeBailleur),
              (this.bailleurUpdate.Budget = selectedBailleur.Budget),
              (this.bailleurUpdate.Commentaire = selectedBailleur.Commentaire),
              (this.ToId = selectedBailleur.id);
          } else {
          }
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
    async submitUpdateBaileurs(modalId) {
      this.v$.bailleurUpdate.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        const dataSend = {
          projet: this.Code,
          bailleurs: [
            {
              id: this.ToId,
              CodeBailleur: this.bailleurUpdate.CodeBailleur,
              Budget: this.bailleurUpdate.Budget,
              Commentaire: this.bailleurUpdate.Commentaire,
            },
          ],
        };

        try {
          const response = await axios.post(
            "/projets/assigner-bailleurs/projet",
            dataSend,
            {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
                
              },
            }
          );

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Données du bailleur mises à jour",
              "Les données du bailleur ont été mises à jour avec succès !"
            );
            this.loading = false;
            this.$emit("indicateur-updated");
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
      let data = {
        CodeProjet: this.Code,
        CodeBailleur: id,
      };

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(
          "/projets/supprimer-bailleurs/projet",
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
            },
            params: {
              CodeProjet: this.Code,
              CodeBailleur: id,
            },
          }
        );

        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Bailleur supprimé",
            "Bailleur  a été supprimé avec succès."
          );
          this.loading = false;
          this.$emit("indicateur-updated");
        } else {
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

    formatBudget(budget) {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "GNF",
        minimumFractionDigits: 0,
      }).format(budget);
    },
    tauxDecaissement(item) {
      const montantDecaisse = parseFloat(
        item.decaissement[0].montant_decaisser || 0
      );
      const budget = parseFloat(item.Budget || 0);
      return budget ? (montantDecaisse / budget) * 100 : 0;
    },
    getProgressClass(percentage) {
      if (percentage <= 30) {
        return "bg-danger";
      } else if (percentage <= 75) {
        return "bg-warning";
      } else {
        return "bg-success";
      }
    },
    tauxDecaissement(item) {
      const montantDecaisse =
        (item.decaissement &&
          item.decaissement[0] &&
          item.decaissement[0].montant_decaisser) ||
        0;
      if (!item.Budget) return 0;
      return (parseFloat(montantDecaisse) / parseFloat(item.Budget)) * 100;
    },
    // fin bailleur

    // debut indicateur

    AddformDataIndicateurs() {
      this.Indicateurs.push({
        CodeIndicateur: "",
        IntituleIndicateur: "",
        CibleFinProjet: "",
      });
    },
    deleteRowIndicateurs(index) {
      if (index !== 0) {
        this.Indicateurs.splice(index, 1);
      }
    },
    clearErrorIndicateurs(index, field) {
      if (this.errors.Indicateurs[index]) {
        this.errors.Indicateurs[index][field] = null;
      }
    },
    validateIndicateur() {
      let isValid = true;
      this.errors = { Indicateurs: [] };
      this.Indicateurs.forEach((indicateur, index) => {
        const indicateurErrors = {};
        if (!indicateur.CodeIndicateur) {
          indicateurErrors.CodeIndicateur = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!indicateur.IntituleIndicateur) {
          indicateurErrors.IntituleIndicateur = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!indicateur.CibleFinProjet) {
          indicateurErrors.CibleFinProjet = "Ce champs est obligatoire!";
          isValid = false;
        }
        this.errors.Indicateurs[index] = indicateurErrors;
      });
      return isValid;
    },
    async submitIndicateur(modalId) {
      if (this.validateIndicateur()) {
        this.loading = true;

        this.Indicateurs.forEach((indicateur) => {
          indicateur.CodeProjet = this.Code;
        });

        const dataToSend = {
          indicateurs: this.Indicateurs,
        };

        try {
          const response = await axios.post("/indicateurs", dataToSend, {
            headers: { 
              Authorization: `Bearer ${this.loggedInUser.token}`,
              
             },
          });
          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Indicateurs créés avec succès",
              "Les nouveaux indicateurs ont été créés avec succès !"
            );
            this.loading = false;
            this.$emit("indicateur-updated");
          } else {
          }
        } catch (error) {
          this.loading = false;
          if (error.response.data.status === "error") {
            return (this.error = error.response.data.message);
          } else {
            this.formatValidationErrorsMultiple(
              error.response.data.errors,
              "Indicateurs"
            );
          }
        }
      } else {
      }
    },
    async HandleIdUpdateIndicateur(id) {
      this.loading = true;

      try {
        const response = await axios.get(`/indicateurs/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            
          },
        });

        if (response) {
          let data = response.data.data;
          (this.indicateur.CodeIndicateur = data.CodeIndicateur),
            (this.indicateur.IntituleIndicateur = data.IntituleIndicateur),
            (this.indicateur.CibleFinProjet = data.CibleFinProjet),
            (this.ToId = data.id);
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

    async submitUpdateIndicateur(modalId) {
      this.v$.indicateur.$touch();

      if (this.v$.$errors.length == 0) {
        this.loading = true;
        const dataSend = {
          indicateurs: [
            {
              id: this.ToId,
              CodeIndicateur: this.indicateur.CodeIndicateur,
              IntituleIndicateur: this.indicateur.IntituleIndicateur,
              CibleFinProjet: this.indicateur.CibleFinProjet,
              CodeProjet: this.Code,
            },
          ],
        };

        try {
          const response = await axios.put("/indicateurs/update", dataSend, {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`, 
              
            },
          });

          if (response.data.status === "success") {
            this.closeModal(modalId);
            this.successmsg(
              "Données d'indicateurs mises à jour",
              "Les données de l'indicateurs ont été mises à jour avec succès !"
            );
            this.loading = false;
            this.$emit("indicateur-updated");
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
      } else {
        this.loading = false;
      }
    },
    async HandleIdDeleteIndicateur(id) {
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
        this.ConfirmeDeleteIndicateur(id);
      }
    },
    async ConfirmeDeleteIndicateur(id) {
      this.loading = true;

      try {
        // Faites une requête pour supprimer l'élément avec l'ID itemId
        const response = await axios.delete(`/indicateurs/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Indicateur supprimé",
            "Indicateur  a été supprimé avec succès."
          );
          this.loading = false;
          this.$emit("indicateur-updated");
        } else {
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
    // fin indicateur

    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("fr-FR", options).replace(".", ",");
    },

    filterByName() {
      this.currentPage = 1; // Reset to the first page on search
    },

    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.ObjectisOptions.slice(startIndex, endIndex);
    },
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    // Pour Objectifs
    updateCurrentPageObjectifs(pageNumber) {
      this.currentPageObjectifs = pageNumber;
      // window.scrollTo({
      //   top: 0,
      //   behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
      // });
    },

    // Pour Bailleurs
    updateCurrentPageBailleurs(pageNumber) {
      this.currentPageBailleurs = pageNumber;
      // window.scrollTo({
      //   top: 0,
      //   behavior: 'smooth', // Utilisez 'auto' pour un défilement instantané
      // });
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
        const errorMessages = errors[field];

        const concatenatedError = errorMessages.join(", ");

        formattedErrors[field] = concatenatedError;
      }

      this.resultError = formattedErrors;
    },

    async formatValidationErrorsMultiple(errors, entity) {
      const formattedErrors = {};
      formattedErrors[entity] = [];

      for (const field in errors) {
        const errorMessages = errors[field];

        const [_, index, fieldName] = field.match(
          new RegExp(`${entity.toLowerCase()}\\.(\\d+)\\.(\\w+)`)
        );

        if (!formattedErrors[entity][index]) {
          formattedErrors[entity][index] = {};
        }

        formattedErrors[entity][index][fieldName] = errorMessages[0];
      }

      this.errors = formattedErrors;
    },
  },
};
</script>
<style lang="css" scoped>
.responsables-text {
  line-height: 1.5; /* Adjust this value as needed */
}

/* ---------------------------- */
/* Défilement de droite à gauche */
.marquee-rtl {
  overflow: hidden; /* important */
  width: 100%;
  max-width: 100%; /* A ADAPTER */
}
.marquee-rtl > div {
  display: inline-block; /* important */
  white-space: nowrap; /* important */
  animation: defilement-rtl 15s infinite linear; /* défilement */
  cursor: pointer;
  padding: 10px 2em 10px 100%;
}
.marquee-rtl:hover > div {
  animation-play-state: paused; /* met en pause le défilement */
}

@keyframes defilement-rtl {
  0% {
    -webkit-transform: translate(0);
    transform: translate(0);
  }
  100% {
    -webkit-transform: translate(-100%);
    transform: translate(-100%);
  }
}
/* ---------------------------- */
</style>
