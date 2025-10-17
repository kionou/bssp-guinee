<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- <div class="card py-2 bg-primary" > 
      <h6 class="text-center text-danger m-0 text-white">{{data.NomProjet}}</h6>   
      </div> -->
    <div class="contact-header mb-3 py-2 px-1">
      <div class="d-sm-flex d-block align-items-center justify-content-between">
        <div class="fs-16 fw-semibold mb-0 text-primary">
          {{ data.NomProjet }}
        </div>
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
            data-bs-toggle="modal"
            data-bs-target="#add_suivi"
            v-tippy="{
              content: 'Créer un nouvel élément',
              theme: 'custom',
              animation: 'shift-away',
              backgroundColor: '#FF5733',
            }"
          >
            <i class="ri-add-line"> </i>
          </button>
        </div>
      </div>
    </div>
    <div class="row task-card">
      <div v-if="paginatedItems.length === 0" class="noresul">
        <span>
          Vous n'avez pas encore de suivi, vous pouvez également en ajouter un
          !!
        </span>
      </div>
      <div id="tasks-container" v-else>
        <div class="row task-card">
          <div class="row">
            <div
              class="col-xxl-4 col-xl-4 col-lg-6 col-md-6 col-sm-12"
              v-for="(item, index) in paginatedItems"
              :key="index"
            >
              <div
                class="card custom-card task-pending-card border border-dark"
              >
                <div class="card-body">
                  <div
                    class="d-flex justify-content-between flex-wrap flex-column"
                  >
                    <div>
                      <p
                        class="fw-semibold mb-3 d-flex align-items-center fs-16"
                      >
                        <span
                          class="avatar me-2 avatar-rounded border border-gray-800"
                        >
                          <img src="@/assets/img/logo_mobile.png" alt="img" />
                        </span>
                        Suivi du
                        <b class="fs-16 ml-2" style="color: red">
                          {{ formatDate(item.DateSuivi) }}
                        </b>
                      </p>
                      <p class="mb-2 fw-semibold fs-16">
                        Taux Ex. Physique :
                        <span class="fs-14 mb-1 text-secondary fw-semibold"
                          >{{ item.TauxAvancementPhysique }} %</span
                        >
                      </p>
                      <p class="mb-2 fw-semibold fs-16">
                        Taux Ex. Financière :
                        <span class="fs-14 mb-1 text-secondary fw-semibold"
                          >{{ item.TauxExecutionFinanciere }} %</span
                        >
                      </p>
                      <p class="mb-2 fw-semibold fs-16">
                        Récap. :
                        <span
                          class="fs-14 mb-1 fw-semibold truncate"
                          v-html="getTruncateHtml(item.Observations, 20)"
                        >
                        </span>
                      </p>
                    </div>
                    <hr />
                    <div>
                      <div class="btn-list pull-right">
                        <!-- <button class="btn btn-sm btn-icon btn-wave btn-success"><i class="ri-eye-line"></i></button> -->
                        <router-link
                          v-if="hasPermission(1)"
                          :to="{
                            name: 'suivi-projet',
                            params: { id: item.id },
                          }"
                          class="btn btn-sm btn-icon btn-success btn-wave"
                          v-tippy="{
                            content: 'Afficher les détails',
                            theme: 'custom',
                            animation: 'shift-away',
                            backgroundColor: '#FF5733',
                          }"
                        >
                          <i class="ri-eye-line"></i>
                        </router-link>
                        <button
                          v-if="hasPermission(2)"
                          class="btn btn-sm btn-icon btn-wave btn-info"
                          @click="HandleIdUpdateSuivie(item.id)"
                          v-tippy="{
                            content: 'Modifier l\'élément sélectionné',
                            theme: 'custom',
                            animation: 'shift-away',
                            backgroundColor: '#FF5733',
                          }"
                          :disabled="index !== 0"
                          data-bs-toggle="modal"
                          data-bs-target="#update_suivi"
                        >
                          <i class="ri-edit-line"></i>
                        </button>
                        <button
                          v-if="hasPermission(4)"
                          class="btn btn-sm btn-icon btn-danger btn-wave"
                          @click="HandleIdDelete(item.id)"
                          v-tippy="{
                            content: 'Supprimer l\'élément sélectionné',
                            theme: 'custom',
                            animation: 'shift-away',
                            backgroundColor: '#FF5733',
                          }"
                        >
                          <i class="ri-delete-bin-line"></i>
                        </button>
                        <button
                          v-if="hasPermission(6)"
                          class="btn btn-sm btn-icon"
                          :class="
                            item?.Validated == '1' ? 'bg-success' : 'bg-warning'
                          "
                          :disabled="item?.Validated == '1' || index !== 0"
                          style="color: white"
                          @click="validateSelection(item?.id)"
                          v-tippy="{
                            content: 'Activer ou déactiver le suivi',
                            theme: 'custom',
                            animation: 'shift-away',
                            backgroundColor: '#FF5733 !important',
                          }"
                        >
                          <i
                            :class="
                              item?.Validated == '1'
                                ? 'ri-lock-2-line'
                                : 'ri-lock-unlock-line'
                            "
                          >
                          </i>
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

    <!--add suivi projet  -->
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
                <div class="row">
                  <div class="col-12">
                    <p class="mb-0">
                      <span class="fw-semibold fs-14">Nom projet : </span
                      ><span class="text-success fs-15 fw-bolder">
                        {{ data.NomProjet }}</span
                      >
                    </p>
                  </div>
                </div>
                <div class="generastep">
                  <div class="stepper">
                    <div class="stepper-progress">
                      <div
                        class="stepper-progress-bar"
                        :style="'width:' + stepperProgress"
                      ></div>
                    </div>

                    <div
                      class="stepper-item"
                      :class="{
                        current: currentStep == item,
                        success: currentStep > item,
                      }"
                      v-for="item in 5"
                      :key="item"
                      @click="goToStep(item)"
                    >
                      <div class="stepper-item-counter">
                        <img
                          class="icon-success"
                          src="https://www.seekpng.com/png/full/1-10353_check-mark-green-png-green-check-mark-svg.png"
                          alt=""
                        />
                        <span class="number">
                          {{ item }}
                        </span>
                      </div>
                      <span class="stepper-item-title"> Etape {{ item }} </span>
                    </div>
                  </div>
                </div>

                <!-- <div class="error text-center" v-if="this.error">{{ error }} <br /></div> -->
                <div class="container-fluid">
                  <!-- Étape 1 -->
                  <div v-if="currentStep === 1">
                    <div class="form-container">
                      <div class="row mt-3 content-group">
                        <div class="col col-md-6 col-sm-6">
                          <div class="input-groupe">
                            <label for="userpassword"
                              >Date du suivi
                              <span class="text-danger">*</span></label
                            >

                            <MazInput
                              v-model="step1.DateSuivi"
                              color="info"
                              name="DateSuivi"
                              size="sm"
                              rounded-size="sm"
                              type="date"
                            />
                            <small v-if="v$.step1.DateSuivi.$error">{{
                              v$.step1.DateSuivi.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['DateSuivi']">
                              {{ resultError["DateSuivi"] }}
                            </small>
                          </div>
                        </div>

                        <div class="col col-md-6 col-sm-6">
                          <div class="mb-3 position-relative">
                            <div class="input-groupe">
                              <label for="password"
                                >Taux d'exécution physique
                                <span class="text-danger">*</span></label
                              >
                              <MazInput
                                v-model="step1.TauxAvancementPhysique"
                                name="TauxAvancementPhysique"
                                color="info"
                                placeholder="10"
                                type="number"
                                min="0"
                                max="100"
                                size="sm"
                                rounded-size="sm"
                              />
                              <small
                                v-if="v$.step1.TauxAvancementPhysique.$error"
                                >{{
                                  v$.step1.TauxAvancementPhysique.$errors[0]
                                    .$message
                                }}</small
                              >
                              <small
                                v-if="resultError['TauxAvancementPhysique']"
                                >{{
                                  resultError["TauxAvancementPhysique"]
                                }}</small
                              >
                            </div>
                          </div>
                        </div>
                        <div class="col col-md-12 col-sm-12">
                          <div class="mb-3 position-relative">
                            <div class="input-groupe">
                              <label for="password"
                                >Taux d'exécution financière
                                <span class="text-danger">*</span></label
                              >
                              <MazInput
                                v-model="step1.TauxExecutionFinanciere"
                                name="TauxExecutionFinanciere"
                                color="info"
                                placeholder="10"
                                type="number"
                                min="0"
                                max="100"
                                size="sm"
                                rounded-size="sm"
                              />
                              <small
                                v-if="v$.step1.TauxExecutionFinanciere.$error"
                                >{{
                                  v$.step1.TauxExecutionFinanciere.$errors[0]
                                    .$message
                                }}</small
                              >
                              <small
                                v-if="resultError['TauxExecutionFinanciere']"
                                >{{
                                  resultError["TauxAvancementPhysique"]
                                }}</small
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                      <!-- <div class="col col-md-4 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Niveau d'avancement global<span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step1.NiveauExecutionGlobal"
                        color="info"
                        name="NiveauExecutionGlobal"
                        size="sm"
                        rounded-size="sm"
                        search
                        :options="Global"
                      
                        
                      />
                      <small v-if="v$.step1.NiveauExecutionGlobal.$error">{{
                        v$.step1.NiveauExecutionGlobal.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['NiveauExecutionGlobal']">
                        {{ resultError["NiveauExecutionGlobal"] }}
                      </small>
                    </div>
                  </div> -->

                      <!-- <div class="row mt-3 content-group">
                 
              
                                                
                <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Statut du projet <span class="text-danger">*</span></label
                      >
                      <MazSelect
                        v-model="step1.StatutProjet"
                        type="text"
                        color="info"
                        name="StatutProjet"
                        size="sm"
                        rounded-size="sm"
                        :options="status"
                       
                      />
                      <small v-if="v$.step1.StatutProjet.$error">{{
                        v$.step1.StatutProjet.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['StatutProjet']">
                        {{ resultError["StatutProjet"] }}
                      </small>
                    </div>
                  </div>        
                  <div class="col col-md-6 col-sm-12">
                    <div class="input-groupe">
                      <label for="userpassword"
                        >Avance de démarrage <span class="text-danger">*</span></label
                      >
                      <MazInput
                        v-model="step1.Avance"
                        type="number"
                        color="info"
                        name="Avance"
                        size="sm"
                        rounded-size="sm"
                       
                       
                      />
                      <small v-if="v$.step1.Avance.$error">{{
                        v$.step1.Avance.$errors[0].$message
                      }}</small>
                      <small v-if="resultError['Avance']">
                        {{ resultError["Avance"] }}
                      </small>
                    </div>
                  </div>                       
                </div> -->
                    </div>
                    <div
                      class="btnForm py-3 d-flex items-center justify-content-end"
                    >
                      <button
                        class="btnLogin"
                        :disabled="isButtonDisabled"
                        @click.prevent="nextStep('add_suivi')"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>

                  <!-- Étape 2 -->
                  <div v-if="currentStep === 2">
                    <div class="form-container">
                      <!-- debut infos genral -->

                      <!-- bailleurs -->
                      <div style="position: relative">
                        <p class="titre">Décaissement</p>
                        <div
                          class="btn-list"
                          style="position: absolute; right: 7px; top: 5px"
                        >
                          <button
                            class="btn btn-sm btn-primary btn-wave"
                            @click="AddformDataBailleurs(index)"
                          >
                            <i class="ri-add-line"></i> bailleur
                          </button>
                        </div>
                        <div
                          class="row align-items-center p-2 border-bottom"
                          v-for="(bailleur, index) in step2.Bailleurs"
                          :key="bailleur.id"
                        >
                          <div class="col-11">
                            <span class="nombres">
                              {{ index + 1 }}
                            </span>
                            <div class="row content-group">
                              <div
                                class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                              >
                                <div class="input-groupe">
                                  <div>
                                    <label for="userpassword"
                                      >Nom du Bailleur
                                    </label>
                                    <MazSelect
                                      v-model="bailleur.CodeBailleur"
                                      type="text"
                                      color="info"
                                      @click="
                                        clearErrorBailleurs(
                                          index,
                                          'CodeBailleur'
                                        )
                                      "
                                      name="bailleur.CodeBailleur"
                                      size="sm"
                                      rounded-size="sm"
                                      :options="formattedBailleursOptions"
                                    />
                                  </div>
                                  <small
                                    v-if="
                                      errors.step2.Bailleurs &&
                                      errors.step2.Bailleurs[index] &&
                                      errors.step2.Bailleurs[index].CodeBailleur
                                    "
                                    >{{
                                      errors.step2.Bailleurs[index].CodeBailleur
                                    }}</small
                                  >
                                  <small v-if="resultError['Bailleurs']">
                                    {{ resultError["Bailleurs"] }}
                                  </small>
                                </div>
                              </div>
                              <div
                                class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                              >
                                <div class="input-groupe">
                                  <div>
                                    <label for="userpassword"
                                      >Montant décaissé (GNF)
                                    </label>
                                    <MazInput
                                      v-model="bailleur.MontantDecaisser"
                                      type="number"
                                      color="info"
                                      @input="
                                        clearErrorBailleurs(
                                          index,
                                          'MontantDecaisser'
                                        )
                                      "
                                      name="bailleur.MontantDecaisser"
                                      size="sm"
                                      rounded-size="sm"
                                    />
                                  </div>
                                  <small
                                    v-if="
                                      errors.step2.Bailleurs &&
                                      errors.step2.Bailleurs[index] &&
                                      errors.step2.Bailleurs[index]
                                        .MontantDecaisser
                                    "
                                    >{{
                                      errors.step2.Bailleurs[index]
                                        .MontantDecaisser
                                    }}</small
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
                            >
                              <i class="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>

                        <div
                          class="btnForm py-3 d-flex items-center justify-content-between"
                        >
                          <button class="btnLogin" @click.prevent="prevStep">
                            Précédent
                          </button>
                          <button
                            class="btnLogin"
                            @click.prevent="nextStep('add_suivi')"
                          >
                            Suivant
                          </button>
                        </div>
                      </div>
                      <!-- fin infos genral -->
                    </div>
                  </div>
                  <!-- Étape 3 -->
                  <div v-if="currentStep === 3">
                    <div class="form-container">
                      <div class="row mt-3 content-group">
                        <div class="col-12 col-md-12 col-sm-12">
                          <div class="input-groupe">
                            <label for="employment_date_begin"
                              >Récapitulatif du projet
                              <span class="text-danger">*</span></label
                            >
                            <!-- <MazTextarea
                              v-model="step3.Observations"
                              color="info"
                              name="Observations"
                              size="sm"
                              rounded-size="sm"
                            /> -->
                            <QuillEditor v-model="step3.Observations" />
                            <small v-if="v$.step3.Observations.$error">{{
                              v$.step3.Observations.$errors[0].$message
                            }}</small>
                            <small v-if="resultError['Observations']">{{
                              resultError["Observations"]
                            }}</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div
                      class="btnForm py-3 d-flex items-center justify-content-between"
                    >
                      <button class="btnLogin" @click.prevent="prevStep">
                        Précédent
                      </button>
                      <button
                        class="btnLogin"
                        @click.prevent="nextStep('add_suivi')"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>

                  <!-- Étape 4 -->

                  <div v-if="currentStep === 4">
                    <div class="form-container">
                      <div style="position: relative">
                        <p class="titre">Les Realisations</p>
                        <div
                          class="btn-list"
                          style="position: absolute; right: 7px; top: 5px"
                        >
                          <button
                            class="btn btn-sm btn-primary btn-wave"
                            @click="AddformDataRealisations(index)"
                          >
                            <i class="ri-add-line"></i> realisation
                          </button>
                        </div>
                        <div
                          class="row align-items-center p-2 border-bottom"
                          v-for="(realisation, index) in step4.Realisations"
                          :key="realisation.id"
                        >
                          <div class="col-11">
                            <span class="nombre">
                              {{ index + 1 }}
                            </span>
                            <div class="row mt-3 content-group">
                              <div class="col-12 col-md-12 col-sm-12">
                                <div class="input-groupe">
                                  <label for="employment_date_begin"
                                    >Réalisation des travaux</label
                                  >

                                  <QuillEditor
                                    v-model="realisation.Realisation"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-1" style="position: relative">
                            <button
                              class="btn btn-sm btn-icon btn-danger btn-wave"
                              @click="deleteRowRealisations(index)"
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
                    </div>

                    <div
                      class="btnForm py-3 d-flex items-center justify-content-between"
                    >
                      <button class="btnLogin" @click.prevent="prevStep">
                        Précédent
                      </button>
                      <button
                        class="btnLogin"
                        @click.prevent="nextStep('add_suivi')"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>
                  <!-- Étape 5 -->

                  <div v-if="currentStep === 5">
                    <div class="form-container">
                      <!-- debut infos genral -->

                      <!-- contrainte -->
                      <div style="position: relative">
                        <p class="titre">Les Contraintes</p>
                        <div
                          class="btn-list"
                          style="position: absolute; right: 7px; top: 5px"
                        >
                          <button
                            class="btn btn-sm btn-primary btn-wave"
                            @click="AddformDataContraintes(index)"
                          >
                            <i class="ri-add-line"></i> contrainte
                          </button>
                        </div>
                        <div
                          class="row align-items-center p-2 border-bottom"
                          v-for="(contrainte, index) in step5.Contraintes"
                          :key="contrainte.id"
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
                                  <div>
                                    <label for="userpassword"
                                      >Type de contrainte
                                      <span class="text-danger"></span
                                    ></label>
                                    <MazSelect
                                      v-model="contrainte.TypeConstrainte"
                                      type="text"
                                      color="info"
                                      @click="
                                        clearError(index, 'TypeConstrainte')
                                      "
                                      name="contrainte.TypeConstrainte"
                                      size="sm"
                                      rounded-size="sm"
                                      :options="contraintess"
                                    />
                                  </div>
                                  <small
                                    v-if="
                                      errors.step5.Contraintes &&
                                      errors.step5.Contraintes[index] &&
                                      errors.step5.Contraintes[index]
                                        .TypeConstrainte
                                    "
                                    >{{
                                      errors.step5.Contraintes[index]
                                        .TypeConstrainte
                                    }}</small
                                  >
                                  <small v-if="resultError['Contraintes']">
                                    {{ resultError["Contraintes"] }}
                                  </small>
                                </div>
                              </div>

                              <div
                                class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                              >
                                <div class="input-groupe">
                                  <div>
                                    <label for="userpassword"
                                      >Description de la contrainte
                                      <span class="text-danger"></span
                                    ></label>
                                    <textarea
                                      class="form-control"
                                      id="text-area"
                                      v-model="contrainte.IntituleConstrainte"
                                      rows="1"
                                      @input="
                                        clearError(index, 'IntituleConstrainte')
                                      "
                                    ></textarea>
                                  </div>
                                  <small
                                    v-if="
                                      errors.step5.Contraintes &&
                                      errors.step5.Contraintes[index] &&
                                      errors.step5.Contraintes[index]
                                        .IntituleConstrainte
                                    "
                                    >{{
                                      errors.step5.Contraintes[index]
                                        .IntituleContrainte
                                    }}</small
                                  >
                                  <small v-if="resultError['Contraintes']">
                                    {{ resultError["Contraintes"] }}
                                  </small>
                                </div>
                              </div>

                              <div
                                class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                              >
                                <div class="input-groupe">
                                  <div>
                                    <label for="userpassword"
                                      >Mitigation
                                      <span class="text-danger"></span
                                    ></label>
                                    <textarea
                                      class="form-control"
                                      id="text-area"
                                      v-model="contrainte.Mitigation"
                                      rows="1"
                                    ></textarea>
                                  </div>
                                  <small
                                    v-if="
                                      errors.step5.Contraintes &&
                                      errors.step5.Contraintes[index] &&
                                      errors.step5.Contraintes[index].Mitigation
                                    "
                                    >{{
                                      errors.step5.Contraintes[index]
                                        .IntituleConstrainte
                                    }}</small
                                  >
                                  <small v-if="resultError['Contraintes']">
                                    {{ resultError["Contraintes"] }}
                                  </small>
                                </div>
                              </div>

                              <div
                                class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                              >
                                <div class="input-groupe">
                                  <div>
                                    <label for="userpassword"
                                      >Acteur-s (Responsables)
                                      <span class="text-danger"></span
                                    ></label>
                                    <MazInput
                                      v-model="contrainte.Acteurs"
                                      type="text"
                                      color="info"
                                      @click="clearError(index, 'Acteurs')"
                                      name="contrainte.Acteurs"
                                      size="sm"
                                      rounded-size="sm"
                                    />
                                  </div>
                                  <small
                                    v-if="
                                      errors.step5.Contraintes &&
                                      errors.step5.Contraintes[index] &&
                                      errors.step5.Contraintes[index].Acteurs
                                    "
                                    >{{
                                      errors.step5.Contraintes[index].Acteurs
                                    }}</small
                                  >
                                  <small v-if="resultError['Contraintes']">
                                    {{ resultError["Contraintes"] }}
                                  </small>
                                </div>
                              </div>

                              <div
                                class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                              >
                                <div class="input-groupe">
                                  <div>
                                    <label for="userpassword"
                                      >Délai de la mise en oeuvre
                                      <span class="text-danger"></span
                                    ></label>
                                    <MazSelect
                                      v-model="contrainte.Delai"
                                      color="info"
                                      @click="clearError(index, 'Delai')"
                                      name="contrainte.Delai"
                                      size="sm"
                                      rounded-size="sm"
                                      :options="DelaisOptions"
                                      search
                                    />
                                  </div>
                                  <small
                                    v-if="
                                      errors.step5.Contraintes &&
                                      errors.step5.Contraintes[index] &&
                                      errors.step5.Contraintes[index].Delai
                                    "
                                    >{{
                                      errors.step5.Contraintes[index].Delai
                                    }}</small
                                  >
                                  <small v-if="resultError['Contraintes']">
                                    {{ resultError["Contraintes"] }}
                                  </small>
                                </div>
                              </div>

                              <div
                                class="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                              >
                                <div class="input-groupe">
                                  <div>
                                    <label for="userpassword"
                                      >Catégorie
                                      <span class="text-danger"></span
                                    ></label>
                                    <MazSelect
                                      v-model="contrainte.Categorie"
                                      type="text"
                                      color="info"
                                      @click="clearError(index, 'Categorie')"
                                      name="contrainte.Categorie"
                                      size="sm"
                                      rounded-size="sm"
                                      :options="CategoriesOptions"
                                    />
                                  </div>
                                  <small
                                    v-if="
                                      errors.step5.Contraintes &&
                                      errors.step5.Contraintes[index] &&
                                      errors.step5.Contraintes[index].Categorie
                                    "
                                    >{{
                                      errors.step5.Contraintes[index].Categorie
                                    }}</small
                                  >
                                  <small v-if="resultError['Contraintes']">
                                    {{ resultError["Contraintes"] }}
                                  </small>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="col-1" style="position: relative">
                            <button
                              class="btn btn-sm btn-icon btn-danger btn-wave"
                              @click="deleteRowContraintes(index)"
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
                      <!-- fin infos genral -->
                    </div>
                    <div
                      class="btnForm py-3 d-flex items-center justify-content-between"
                    >
                      <button class="btnLogin" @click.prevent="prevStep">
                        Précédent
                      </button>
                      <button
                        class="btnLogin"
                        @click.prevent="nextStep('add_suivi')"
                      >
                        Valider
                      </button>
                    </div>
                  </div>
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
                  ar
                  ia-label="Close"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- update suivi projet -->

    <div
      class="modal fade effect-rotate-bottom"
      id="update_suivi"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="update_suivi"
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
              <div>
                <div class="row">
                  <div class="col-12">
                    <p class="mb-0">
                      <span class="fw-semibold fs-14">Nom projet : </span
                      ><span class="text-success fs-15 fw-bolder">
                        {{ data.NomProjet }}</span
                      >
                    </p>
                  </div>
                </div>
                <div class="container-fluid">
                  <div class="form-container">
                    <div class="row mt-3 content-group">
                      <div class="col col-md-6 col-sm-12">
                        <div class="input-groupe">
                          <label for="userpassword"
                            >Date du suivi
                            <span class="text-danger">*</span></label
                          >
                          <MazInput
                            v-model="suivi.DateSuivi"
                            color="info"
                            name="DateSuivi"
                            size="sm"
                            rounded-size="sm"
                            type="date"
                          />
                          <small v-if="v$.suivi.DateSuivi.$error">{{
                            v$.suivi.DateSuivi.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['DateSuivi']">
                            {{ resultError["DateSuivi"] }}
                          </small>
                        </div>
                      </div>
                      <div class="col col-md-6 col-sm-12">
                        <div class="mb-3 position-relative">
                          <div class="input-groupe">
                            <label for="password"
                              >Taux d'exécution physique
                              <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="suivi.TauxAvancementPhysique"
                              name="TauxAvancementPhysique"
                              color="info"
                              placeholder="10"
                              type="number"
                              min="0"
                              max="100"
                              size="sm"
                              rounded-size="sm"
                            />
                            <small
                              v-if="v$.suivi.TauxAvancementPhysique.$error"
                              >{{
                                v$.suivi.TauxAvancementPhysique.$errors[0]
                                  .$message
                              }}</small
                            >
                            <small
                              v-if="resultError['TauxAvancementPhysique']"
                              >{{
                                resultError["TauxAvancementPhysique"]
                              }}</small
                            >
                          </div>
                        </div>
                      </div>
                      <div class="col col-md-12 col-sm-12">
                        <div class="mb-3 position-relative">
                          <div class="input-groupe">
                            <label for="password"
                              >Taux d'exécution financière
                              <span class="text-danger">*</span></label
                            >
                            <MazInput
                              v-model="suivi.TauxExecutionFinanciere"
                              name="TauxExecutionFinanciere"
                              color="info"
                              placeholder="10"
                              type="number"
                              min="0"
                              max="100"
                              size="sm"
                              rounded-size="sm"
                            />
                            <small
                              v-if="v$.suivi.TauxExecutionFinanciere.$error"
                              >{{
                                v$.suivi.TauxExecutionFinanciere.$errors[0]
                                  .$message
                              }}</small
                            >
                            <small
                              v-if="resultError['TauxExecutionFinanciere']"
                              >{{
                                resultError["TauxAvancementPhysique"]
                              }}</small
                            >
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="row mt-3 content-group"></div>
                    <div class="row mt-3 content-group">
                      <div class="col col-md-12 col-sm-12">
                        <div class="input-groupe">
                          <label for="employment_date_begin"
                            >Récapitulatif du projet
                            <span class="text-danger">*</span></label
                          >
                          <!-- <MazTextarea
                            v-model="suivi.Observations"
                            type="date"
                            color="info"
                            name="Observations"
                            size="sm"
                            rounded-size="sm"
                          /> -->
                          <!-- <div id="quillEditorObservations" class="quill-editor"></div> -->
                          <div
                            ref="quillEditorObservation"
                            class="quill-editor"
                          ></div>

                          <small v-if="v$.suivi.Observations.$error">{{
                            v$.suivi.Observations.$errors[0].$message
                          }}</small>
                          <small v-if="resultError['Observations']">{{
                            resultError["Observations"]
                          }}</small>
                        </div>
                      </div>
                    </div>

                    <div class="row mt-3 content-group">
                      <div class="col col-md-12 col-sm-12">
                        <div class="form-container">
                          <div style="position: relative">
                            <p class="titre">Les Realisations</p>
                            <div
                              class="btn-list"
                              style="position: absolute; right: 7px; top: 5px"
                            >
                              <button
                                class="btn btn-sm btn-primary btn-wave"
                                @click="AddformDataRealisationsUpdate(index)"
                              >
                                <i class="ri-add-line"></i> realisation
                              </button>
                            </div>
                            <div
                              class="row align-items-center p-2 border-bottom"
                              v-for="(realisation, index) in suivi.Realisations"
                              :key="realisation.id"
                            >
                              <div class="col-11">
                                <span class="nombre">{{ index + 1 }}</span>
                                <div class="row mt-3 content-group">
                                  <div class="col-12 col-md-12 col-sm-12">
                                    <div class="input-groupe">
                                      <label for="realisation"
                                        >Réalisation des travaux</label
                                      >

                                      <!-- Div pour chaque instance de QuillEditor -->
                                      <div
                                        :id="'quillEditor-' + index"
                                        class="quill-editor"
                                      ></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-1" style="position: relative">
                                <button
                                  class="btn btn-sm btn-icon btn-danger btn-wave"
                                  @click="deleteRowRealisationsUpdate(index)"
                                  style="
                                    position: absolute;
                                    top: 18px;
                                    background: red;
                                  "
                                >
                                  <i class="ri-delete-bin-line"></i>
                                </button>
                              </div>
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
                        @click="submitUpdateSuivi('update_suivi')"
                      >
                        Valider
                      </button>
                    </div>
                  </div>
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

    <!-- add file picture an videoss  -->

    <div
      class="modal fade effect-rotate-bottom"
      id="add_file"
      tabindex="-1"
      aria-hidden="true"
      data-bs-backdrop="static"
      ref="add_file"
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
              <b class="text-center">Ajouter des fichiers</b>
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
                <div class="row">
                  <div class="col-12">
                    <p class="mb-0">
                      <span class="fw-semibold fs-14">Nom projet : </span
                      ><span class="text-success fs-15 fw-bolder">
                        {{ data.NomProjet }}</span
                      >
                    </p>
                  </div>
                </div>

                <div class="container-fluid">
                  <div class="form-container">
                    <div class="row mt-3 content-group">
                      <div class="col-xl-6 col-md-6 col-sm-12">
                        <label for="date_end"
                          >Images<span class="text-danger">*</span></label
                        >
                        <input
                          class="form-control"
                          type="file"
                          id="input-file"
                          accept="image/*"
                          multiple
                          @change="handleFileUploadImages"
                        />
                        <small v-if="v$.Fichiers.images.$error">{{
                          v$.Fichiers.images.$errors[0].$message
                        }}</small>
                        <small v-if="resultError['images[]']">
                          {{ resultError["images[]"] }}
                        </small>
                      </div>
                      <div class="col-xl-6 col-md-6 col-sm-12">
                        <label for="date_end">Videos</label>
                        <input
                          class="form-control"
                          type="file"
                          id="input-file"
                          accept="video/*"
                          @change="handleFileUploadVideo"
                        />
                        <small class="fs-13"
                          >Taille d'importation maximale 10 megas</small
                        >
                        <small v-if="v$.Fichiers.videoss.$error">{{
                          v$.Fichiers.videoss.$errors[0].$message
                        }}</small>
                        <small v-if="resultError['videoss[]']">
                          {{ resultError["videoss[]"] }}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row mb-3">
                  <div class="boutton">
                    <button
                      class=""
                      @click.prevent="submitFileSuivi('add_file')"
                    >
                      Valider
                    </button>
                  </div>
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
import Loading from "@/components/others/loading.vue";
import Pag from "@/components/others/pagination.vue";
import { ValidNumeri, require, vlmax, vlmin } from "@/functions/rules";
import axios from "@/lib/axiosConfig";
import { successmsg } from "@/lib/modal.js";
import useVuelidate from "@vuelidate/core";
// import Quill from "quill";
import Swal from "sweetalert2";
import { mapGetters } from "vuex";
import QuillEditor from "./QuillEditor.vue";

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    SuivisOptions: {
      type: Array,
      required: true,
    },

    BailleursOptions: {
      type: Array,
      required: true,
    },
  },
  components: {
    Loading,
    Pag,
    QuillEditor,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    ...mapGetters("project", ["getCodeProjet"]),
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
    formattedBailleursOptions() {
      return this.BailleursOptions.map((bailleur) => ({
        label: bailleur.CodeBailleur,
        value: bailleur.CodeBailleur,
      }));
    },
    filteredIndicateurs() {
      if (!this.search) {
        return this.SuivisOptions;
      }
      const searchValue = this.search.toLowerCase();
      return this.SuivisOptions.filter((user) => {
        const Nom = user.TauxAvancementPhysique || "";
        const Prenoms = user.NiveauExecution || "";
        const Pseudo = user.TauxAvancementPhysique || "";

        return (
          Nom.toLowerCase().includes(searchValue) ||
          Prenoms.toLowerCase().includes(searchValue) ||
          Pseudo.toLowerCase().includes(searchValue)
        );
      });
    },
  },

  data() {
    return {
      loading: false,
      Code: "",
      search: "",
      currentStep: 1,
      currentData: "",
      currentPage: 1,
      cheickModal: false,
      itemsPerPage: 12,
      totalPageArray: [],
      UsersOptions: [],
      quillEditorObservationContainer: null,
      errors: {
        step2: { Bailleurs: [] },
        step5: { Contraintes: [] },
        step4: { Realisations: [] },

        contraintes: { Contraintes: [] },
        bailleurs: { Bailleurs: [] },
      },
      status: [
        { label: "Non démarré", value: "Non démarré" },
        { label: "En cours", value: "En cours" },
        { label: "En retard", value: "En retard" },
        { label: "Réalisé", value: "Réalisé" },
      ],
      contraintess: [
        { label: "Administratives", value: "ADMIN" },
        { label: "Techniques", value: "TECH" },
      ],
      Global: [
        { label: "Phase de conception ", value: "Phase de conception" },
        { label: "Phase d’exécution ", value: "Phase d’exécution" },
        { label: "Phase de clôture ", value: "Phase de clôture" },
      ],
      CategoriesOptions: [
        { label: "Catégorie 1 ", value: "1" },
        { label: "Catégorie 2 ", value: "2" },
      ],
      DelaisOptions: [
        { label: "immédiat", value: "immédiat" },
        { label: "continu", value: "continu" },
        { label: "court terme", value: "court terme" },
        { label: "long terme", value: "long terme" },
      ],

      step1: {
        DateSuivi: "",
        // NiveauExecutionGlobal: "",
        // StatutProjet: "",
        TauxAvancementPhysique: "",
        TauxExecutionFinanciere: "",
        // Avance:"",
      },
      step2: {
        Bailleurs: [{ CodeBailleur: "", MontantDecaisser: "" }],
      },
      step5: {
        Contraintes: [
          {
            TypeConstrainte: null,
            IntituleConstrainte: null,
            Mitigation: null,
            Acteurs: null,
            Delai: null,
            Categorie: null,
          },
        ],
      },

      step3: { Observations: "" },
      step4: { Realisations: [{ Realisation: null }] },
      Fichiers: {
        images: [],
        videoss: [],
      },

      suivi: {
        DateSuivi: "",
        // NiveauExecutionGlobal: "",
        // StatutProjet: "",
        TauxAvancementPhysique: "",
        TauxExecutionFinanciere: "",
        Observations: "",
        Realisations: [],
      },
      resultError: {},

      v$: useVuelidate(),
      error: "",
    };
  },
  validations: {
    step1: {
      DateSuivi: { require },
      // NiveauExecutionGlobal:{ require },
      // StatutProjet:{  },
      TauxAvancementPhysique: {
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
      //    Avance:{require},
      // Observations:{  },
    },
    step3: {
      Observations: { require },
    },
    Fichiers: {
      images: {},
      videoss: {},
    },

    suivi: {
      DateSuivi: { require },
      // NiveauExecutionGlobal:{ require },
      // StatutProjet:{  },
      TauxAvancementPhysique: {
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
      //  Avance:{require},
      Observations: {},
      Realisation: {},
    },
    // autre: {Observations:{ require },},
  },

  watch: {
    // codeProjet(newVal) {
    //    this.handleCodeProjetChange(newVal);
    // },
    data: {
      handler(newVal) {
        this.Code = newVal.CodeProjet;
      },
      deep: true,
      immediate: true,
    },
    //   'suivi.Realisations': {
    //   handler() {
    //     this.initQuillEditors(); // Réinitialise Quill quand les réalisations changent
    //   },
    //   deep: true,
    // }
  },
  async mounted() {
    await this.fetchUserAll();
  },

  methods: {
    successmsg: successmsg,
    getTruncate(word, nbre) {
      if (word.length > nbre) {
        return word.substring(0, nbre) + " ...";
      } else {
        return word;
      }
    },
    getTruncateHtml(htmlContent, nbre) {
      if (!htmlContent) return "";

      // Créer un élément temporaire pour extraire le texte
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = htmlContent;
      const textContent = tempDiv.textContent || tempDiv.innerText || "";

      // Si le texte est plus court que la limite, retourner le HTML original
      if (textContent.length <= nbre) {
        return htmlContent;
      }

      // Tronquer le texte et ajouter "..."
      const truncatedText = textContent.substring(0, nbre) + " ...";

      // Essayer de préserver le formatage HTML en tronquant intelligemment
      // Si c'est du HTML simple, on peut essayer de préserver les balises
      if (htmlContent.includes("<p>") || htmlContent.includes("<div>")) {
        // Pour du HTML complexe, on retourne juste le texte tronqué
        return truncatedText;
      } else {
        // Pour du HTML simple, on peut essayer de préserver certaines balises
        return truncatedText;
      }
    },
    firstElement(index) {
      return index !== 0;
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
      this.Code = codeProjet;
    },
    stepperProgress() {
      return (100 / 4) * (this.currentStep - 1) + "%";
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },

    goToStep(step) {
      this.currentStep = step;
    },

    initQuillEditors() {
      this.suivi.Realisations?.forEach((realisation, index) => {
        // this.initQuillEditorForIndex(index);
        const editorElement = document.getElementById(`quillEditor-${index}`);
        if (editorElement) {
          const quill = new Quill(editorElement, {
            theme: "snow",
            modules: {
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ header: 1 }, { header: 2 }],
                [{ direction: "rtl" }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                ["clean"],
              ],
            },
          });

          quill.root.innerHTML = realisation.Realisation;

          // Mettre à jour `this.suivi.Realisations[index].Realisation` à chaque changement
          quill.on("text-change", () => {
            this.suivi.Realisations[index].Realisation = quill.root.innerHTML;
          });
        }
      });
    },
    initQuillEditorForIndex(index) {
      const editorElement = document.getElementById(`quillEditor-${index}`);
      if (editorElement) {
        const quill = new Quill(editorElement, {
          theme: "snow",
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"],
              [{ header: 1 }, { header: 2 }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              ["clean"],
            ],
          },
        });

        // Charger le contenu de la réalisation dans l'éditeur
        quill.root.innerHTML = this.suivi.Realisations[index].Realisation;

        // Synchroniser les données lors du changement dans Quill
        quill.on("text-change", () => {
          this.suivi.Realisations[index].Realisation = quill.root.innerHTML;
        });
      }
    },

    initQuillEditorObservations(contenu) {
      // Attendre que le DOM soit mis à jour
      this.$nextTick(() => {
        const editorElement = this.$refs.quillEditorObservation;

        if (editorElement) {
          // Nettoyer le contenu existant
          editorElement.innerHTML = "";

          const quill = new Quill(editorElement, {
            theme: "snow",
            modules: {
              toolbar: [
                ["bold", "italic", "underline", "strike"],
                [{ header: 1 }, { header: 2 }],
                [{ direction: "rtl" }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ font: [] }],
                ["clean"],
              ],
            },
          });

          // Charger le contenu si disponible
          if (contenu) {
            quill.clipboard.dangerouslyPasteHTML(0, contenu);
            this.suivi.Observations = quill.root.innerHTML;
          }

          // Synchroniser les changements
          quill.on("text-change", () => {
            this.suivi.Observations = quill.root.innerHTML;
          });

          this.quillEditorObservationContainer = quill;
        }
      });
    },

    resetQuillEditors() {
      // Nettoyer l'instance Quill existante
      if (this.quillEditorObservationContainer) {
        this.quillEditorObservationContainer.off("text-change");
        this.quillEditorObservationContainer = null;
      }

      // Nettoyer le contenu de l'élément ref
      if (this.$refs.quillEditorObservation) {
        this.$refs.quillEditorObservation.innerHTML = "";
      }
    },
    AddformDataContraintes() {
      this.step5.Contraintes.push({
        TypeConstrainte: null,
        IntituleConstrainte: null,
        Mitigation: null,
        Acteurs: null,
        Delai: null,
        Categorie: null,
      });
    },
    deleteRowContraintes(index) {
      if (index !== 0) {
        this.step5.Contraintes.splice(index, 1);
      }
    },
    clearError(index, field) {
      if (this.errors.step5.Contraintes[index]) {
        this.errors.step5.Contraintes[index][field] = null;
      }
    },

    validateStep1() {
      let isValid = true;
      this.errors.step5 = { Contraintes: [] };
      this.step5.Contraintes.forEach((contrainte, index) => {
        const contrainteErrors = {};
        if (!contrainte.Code) {
          contrainteErrors.Code = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!contrainte.IntituleConstrainte) {
          contrainteErrors.IntituleConstrainte = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!contrainte.Type) {
          contrainteErrors.Type = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!contrainte.Statut) {
          contrainteErrors.Statut = "Ce champs est obligatoire!";
          isValid = false;
        }

        if (!contrainte.Delai) {
          contrainteErrors.Delai = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!contrainte.Categorie) {
          contrainteErrors.Categorie = "Ce champs est obligatoire!";
          isValid = false;
        }
        this.errors.step5.Contraintes[index] = contrainteErrors;
      });
      return isValid;
    },

    AddformDataBailleurs() {
      this.step2.Bailleurs.push({ CodeBailleur: "", MontantDecaisser: "" });
    },
    deleteRowBailleurs(index) {
      if (index !== 0) {
        this.step2.Bailleurs.splice(index, 1);
      }
    },
    clearErrorBailleurs(index, field) {
      if (this.errors.step2.Bailleurs[index]) {
        this.errors.step2.Bailleurs[index][field] = null;
      }
    },

    validateStep2() {
      let isValid = true;
      this.errors.step2 = { Bailleurs: [] };
      this.step2.Bailleurs.forEach((bailleur, index) => {
        const bailleurErrors = {};
        if (!bailleur.CodeBailleur) {
          bailleurErrors.CodeBailleur = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!bailleur.MontantDecaisser) {
          bailleurErrors.MontantDecaisser = "Ce champs est obligatoire!";
          isValid = false;
        }

        this.errors.step2.Bailleurs[index] = bailleurErrors;
      });
      return isValid;
    },

    AddformDataRealisations() {
      this.step4.Realisations.push({ Realisation: "" });
    },
    deleteRowRealisations(index) {
      if (index !== 0) {
        this.step4.Realisations.splice(index, 1);
      }
    },
    clearErrorRealisations(index, field) {
      if (this.errors.step4.Realisations[index]) {
        this.errors.step4.Realisations[index][field] = null;
      }
    },

    validateStep4() {
      let isValid = true;
      this.errors.step2 = { Realisations: [] };
      this.step2.Realisations.forEach((realisation, index) => {
        const realisationErrors = {};
        if (!realisation.Realisation) {
          realisationErrors.Realisation = "Ce champs est obligatoire!";
          isValid = false;
        }

        this.errors.step5.Realisations[index] = realisationErrors;
      });
      return isValid;
    },

    async nextStep(modalId) {
      try {
        if (this.currentStep === 1) {
          this.v$.step1.$touch();
          if (this.v$.$errors.length == 0) {
            this.currentStep++;
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          } else {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        } else if (this.currentStep === 2) {
          this.currentStep++;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (this.currentStep === 3) {
          if (this.v$.$errors.length == 0) {
            this.v$.step3.$touch();
            this.currentStep++;
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          } else {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }
        } else if (this.currentStep === 4) {
          this.currentStep++;
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        } else if (this.currentStep === 5) {
          this.submitSuivi(modalId);
        }
      } catch (error) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.loading = false;
      }
    },
    async fetchUserAll() {
      try {
        const response = await axios.get("/auth-users", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.data.status === "success") {
          this.usersOptions = response.data.data.map((item) =>
            this.UsersOptions.push({
              label: `${item.Nom} ${item.Prenoms}`,
              value: `${item.Nom} ${item.Prenoms}`,
            })
          );

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
    async submitSuivi(modalId) {
      this.loading = true;
      const contraintes = this.step5.Contraintes.every(
        (item) => !item.IntituleConstrainte && !item.TypeConstrainte
      )
        ? []
        : this.step5.Contraintes;

      const bailleurs = this.step2.Bailleurs.every(
        (item) => !item.CodeBailleur && !item.MontantDecaisser
      )
        ? []
        : this.step2.Bailleurs;

      const realisations = this.step4.Realisations.map((i) => i.Realisation);

      const dataToSend = {
        DateSuivi: this.step1.DateSuivi,
        TauxAvancementPhysique: this.step1.TauxAvancementPhysique,
        TauxExecutionFinanciere: this.step1.TauxExecutionFinanciere,
        Observations: this.step3.Observations,

        Realisation: realisations,
        CodeProjet: this.Code,
        contraintes: contraintes,
        bailleurs: bailleurs,
      };

      try {
        const response = await axios.post("/projet-suivis", dataToSend, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.data.status === "success") {
          this.currentData = response.data.data.id;
          this.closeModal(modalId);
          (this.step1 = {
            DateSuivi: "",
            // NiveauExecutionGlobal: "",
            // StatutProjet: "",
            TauxAvancementPhysique: "",
            // Avance:"",
          }),
            (this.step3 = { Observations: "" }),
            (this.step4.Realisations = [{ Realisation: "" }]),
            (this.step2.Contraintes = [
              {
                TypeConstrainte: null,
                IntituleConstrainte: null,
                Mitigation: null,
                Acteurs: null,
                Delai: null,
                Categorie: null,
              },
            ]);
          this.step5.Bailleurs = [{ CodeBailleur: "", MontantDecaisser: "" }];

          this.v$.step1.$reset();
          this.v$.step3.$reset();
          this.loading = false;
          await this.confirmFiles();
        } else {
        }
      } catch (error) {
        this.loading = false;
        if (error.response.data.status === "error") {
          // return (this.error = error.response.data.message);
          Swal.fire({
            title: "Enrégistrement  impossible",
            text: error.response.data.message,
            icon: "question",
          });
        } else {
          this.formatValidationErrors(error.response.data.errors);
        }
      }
    },
    async confirmFiles() {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: "Voulez-vous ajouter des fichiers concernant le suivi?",
        text: "Vous pouvez télécharger des fichiers tels que des images et une video.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, ajouter",
        cancelButtonText: "Non, annuler",
        reverseButtons: true,
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        event.preventDefault();
        const modal = new bootstrap.Modal(this.$refs.add_file);
        modal.show();
      } else {
        this.successmsg(
          "Suivi créé avec succès",
          "Le nouveau suivi a été créé avec succès !"
        );
        this.$emit("indicateur-updated");
        this.loading = false;
      }
    },
    async confirmFilesUpdate() {
      // Affichez une boîte de dialogue Sweet Alert pour confirmer la suppression
      const result = await Swal.fire({
        title: "Voulez-vous modifier les fichiers concernant le suivi?",
        text: "Vous pouvez télécharger des fichiers tels que des images et une video.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, modifier",
        cancelButtonText: "Non, annuler",
        reverseButtons: true,
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        event.preventDefault();
        const modal = new bootstrap.Modal(this.$refs.add_file);
        modal.show();
        this.cheickModal = true;
      } else {
        this.successmsg(
          "Suivi modifié avec succès",
          "Le nouveau suivi a été créé avec succès !"
        );
        this.$emit("indicateur-updated");
        this.loading = false;
      }
    },
    async submitFileSuivi(modalId) {
      this.loading = true;
      const formData = new FormData();
      if (this.Fichiers.images && this.Fichiers.images.length > 0) {
        for (let i = 0; i < this.Fichiers.images.length; i++) {
          formData.append("images[]", this.Fichiers.images[i]);
        }
      }
      if (this.Fichiers.videoss) {
        formData.append("videoss[]", this.Fichiers.videoss);
      }

      formData.append("id", this.currentData);

      try {
        const response = await axios.post(
          "/projet-suivis/fichiers/joindre-au-suivi",
          formData,
          {
            headers: {
              Authorization: `Bearer ${this.loggedInUser.token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data.status === "success") {
          if (this.cheickModal == true) {
            this.closeModal(modalId);
            this.successmsg(
              "Suivi modifié avec succès",
              "Le nouveau suivi a été créé avec succès !"
            );
            this.loading = false;
            this.$emit("indicateur-updated");
          } else {
            this.closeModal(modalId);
            this.successmsg(
              "Suivi créé avec succès",
              "Le nouveau suivi a été créé avec succès !"
            );
            this.loading = false;
            this.$emit("indicateur-updated");
          }
        } else {
        }
      } catch (error) {
        this.loading = false;
        if (error.response.data.status === "error") {
          return (this.error = error.response.data.message);
        } else {
          this.formatValidationErrors(error.response.data.errors);
        }
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
        const response = await axios.delete(`/projet-suivis/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        if (response.data.status === "success") {
          this.loading = false;
          this.successmsg(
            "Suivi projet supprimé",
            "Suivi projet  a été supprimé avec succès."
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

    // update suivi start

    AddformDataContraintesUpdate() {
      this.contraintes.Contraintes.push({
        IntituleConstrainte: "",
        TypeConstrainte: "",
        Mitigation: null,
        Delai: null,
        Categorie: null,
      });
    },
    deleteRowContraintesUpdate(index) {
      if (index !== 0) {
        this.contraintes.Contraintes.splice(index, 1);
      }
    },
    clearErrorUpdate(index, field) {
      if (this.errors.contraintes.Contraintes[index]) {
        this.errors.contraintes.Contraintes[index][field] = null;
      }
    },

    validateStep3() {
      let isValid = true;
      this.errors.contraintes = { Contraintes: [] };
      this.contraintes.Contraintes.forEach((contrainte, index) => {
        const contrainteErrors = {};
        if (!contrainte.Code) {
          contrainteErrors.Code = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!contrainte.IntituleConstrainte) {
          contrainteErrors.IntituleConstrainte = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!contrainte.Type) {
          contrainteErrors.Type = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!contrainte.Delai) {
          contrainteErrors.Delai = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!contrainte.Categorie) {
          contrainteErrors.Categorie = "Ce champs est obligatoire!";
          isValid = false;
        }
        this.errors.contraintes.Contraintes[index] = contrainteErrors;
      });
      return isValid;
    },

    AddformDataBailleursUpdate() {
      this.bailleurs.Bailleurs.push({ CodeBailleur: "", MontantDecaisser: "" });
    },
    deleteRowBailleursUpdate(index) {
      if (index !== 0) {
        this.bailleurs.Bailleurs.splice(index, 1);
      }
    },
    clearErrorBailleursUpdate(index, field) {
      if (this.errors.bailleurs.Bailleurs[index]) {
        this.errors.bailleurs.Bailleurs[index][field] = null;
      }
    },

    validateStep4() {
      let isValid = true;
      this.errors.bailleurs = { Bailleurs: [] };
      this.bailleurs.Bailleurs.forEach((bailleur, index) => {
        const bailleurErrors = {};
        if (!bailleur.CodeBailleur) {
          bailleurErrors.CodeBailleur = "Ce champs est obligatoire!";
          isValid = false;
        }
        if (!bailleur.MontantDecaisser) {
          bailleurErrors.MontantDecaisser = "Ce champs est obligatoire!";
          isValid = false;
        }

        this.errors.bailleurs.Bailleurs[index] = bailleurErrors;
      });
      return isValid;
    },

    AddformDataRealisationsUpdate() {
      this.suivi.Realisations.push({ Realisation: "" });
      this.$nextTick(() => {
        const index = this.suivi.Realisations.length - 1;
        this.initQuillEditorForIndex(index);
      });
    },
    deleteRowRealisationsUpdate(index) {
      if (index !== 0) {
        this.suivi.Realisations.splice(index, 1);
      }
    },
    async HandleIdUpdateSuivie(id) {
      this.loading = true;

      // Nettoyer les éditeurs existants
      this.resetQuillEditors();

      try {
        const response = await axios.get(`/projet-suivis/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response) {
          let data = response.data.data.suivi;
          this.suivi.DateSuivi = data.DateSuivi;
          this.suivi.TauxAvancementPhysique = data.TauxAvancementPhysique;
          this.suivi.TauxExecutionFinanciere = data.TauxExecutionFinanciere;
          this.suivi.Observations = data.Observations || "";

          this.suivi.Realisations =
            data.Realisation === null
              ? []
              : data.Realisation?.split("|").map((real, index) => ({
                  id: index,
                  Realisation: real,
                }));

          this.ToId = data.id;

          // Attendre que le modal soit ouvert et le DOM mis à jour
          this.$nextTick(() => {
            // Initialiser l'éditeur des observations avec le contenu
            this.initQuillEditorObservations(data?.Observations);
            // Initialiser les éditeurs des réalisations
            this.initQuillEditors();
          });

          this.loading = false;
        }
      } catch (error) {
        if (error.response.data.status === "error") {
          if (
            error.response.data.message === "Vous n'êtes pas autorisé." ||
            error.response.status === 401
          ) {
            await this.$store.dispatch("auth/clearMyAuthenticatedUser");
            this.$router.push("/");
          }
        } else {
          this.formatValidationErrors(error.response.data.errors);
          this.loading = false;
          return false;
        }
      }
    },

    async submitUpdateSuivi(modalId) {
      this.v$.suivi.$touch();
      if (this.v$.$errors.length == 0) {
        this.loading = true;
        const realisations = this.suivi.Realisations.map((i) => i.Realisation);
        const dataToSend = {
          id_suivi: this.ToId,
          DateSuivi: this.suivi.DateSuivi,
          TauxAvancementPhysique: this.suivi.TauxAvancementPhysique,
          TauxExecutionFinanciere: this.suivi.TauxExecutionFinanciere,
          Observations: this.suivi.Observations,
          Realisation: realisations,
          CodeProjet: this.Code,
        };

        try {
          const response = await axios.put(
            "/projet-suivis/update",
            dataToSend,
            {
              headers: {
                Authorization: `Bearer ${this.loggedInUser.token}`,
              },
            }
          );

          if (response.data.status === "success") {
            this.currentData = response.data.data.id;

            this.closeModal(modalId);

            this.loading = false;
            await this.confirmFilesUpdate();
          } else {
          }
        } catch (error) {
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
    handleFileUploadVideo(event) {
      const file = event.target.files[0];
      this.Fichiers.videoss = file;
    },
    handleFileUploadImages(event) {
      const files = event.target.files;
      // Créer un tableau pour stocker les fichiers
      this.Fichiers.images = [];

      // Ajouter chaque fichier au tableau
      for (let i = 0; i < files.length; i++) {
        this.Fichiers.images.push(files[i]);
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
    // update suivi finish

    getStatusClass(status) {
      switch (status) {
        case "DANGER":
          return "text-danger"; // rouge
        case "EN COURS":
          return "text-warning"; // jaune
        case "TERMINER":
          return "text-success"; // vert
        default:
          return "text-muted"; // couleur par défaut
      }
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      const options = { day: "numeric", month: "short", year: "numeric" };
      return date.toLocaleDateString("fr-FR", options).replace(".", ",");
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

        const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur

        formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
      }

      this.resultError = formattedErrors; // Stockez les erreurs dans un objet

      // Maintenant, this.resultError est un objet où les clés sont les noms des champs
    },
    async validateSelection(id) {
      const result = await Swal.fire({
        title: "Êtes-vous sûr ?",
        text: "Vous ne pourrez pas annuler cette action !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, validez !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      });

      // Si l'utilisateur confirme la suppression
      if (result.isConfirmed) {
        this.validateSelection1(id);
      }
    },
    async validateSelection1(id) {
      const data = {
        id: id,
      };

      this.loading = true;

      try {
        const response = await axios.put("/projet-suivis/confirmer", data, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });

        if (response.status === 200) {
          this.loading = false;
          this.successmsg(
            "Validation du suivi",
            "Votre suivi  a été validé avec succès !"
          );
          this.$emit("indicateur-updated");
          this.loading = false;
        } else {
          this.handleErrors(error);
        }
      } catch (error) {
        this.loading = false;
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
    updateCurrentPage(pageNumber) {
      this.currentPage = pageNumber;
      window.scrollTo({
        top: 0,
        behavior: "smooth", // Utilisez 'auto' pour un défilement instantané
      });
    },
    updatePaginatedItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;

      const endIndex = startIndex + this.itemsPerPage;
      return this.SuivisOptions.slice(startIndex, endIndex);
    },
    //   createSuivieData() {
    //   return {

    //      this.step2.Contraintes.every(item =>
    //     !item.IntituleConstrainte && !item.TypeConstrainte) ? [] : this.step2.Contraintes;

    //    this.step2.Bailleurs.every(item =>
    //     !item.CodeBailleur && !item.MontantDecaisser) ? [] : this.step2.Bailleurs;

    //       DateSuivi: this.step1.DateSuivi,
    //       NiveauExecution: this.step1.NiveauExecutionGlobal,
    //       StatutProjet: this.step1.StatutProjet,
    //       TauxAvancementPhysique: this.step1.TauxAvancementPhysique,
    //       Observations: this.step1.Observations,
    //       CodeProjet: this.Code,
    //       contraintes: contraintes,
    //       bailleurs: bailleurs

    //   };
    // },
  },
};
</script>
<style lang="css" scoped>
.tx-green-1 {
  color: #75cc65;
  font-weight: 600;
}

.wrapper-stepper {
  background-color: #fff;
  padding: 60px;
  border-radius: 32px;
  box-shadow: rgba(0, 0, 0, 0.09);
}

.stepper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* width: 660px; */
  position: relative;
  z-index: 0;
  /* margin-bottom: 24px; */
}

.stepper-progress {
  position: absolute;
  background-color: #c5c5c5;
  height: 2px;
  z-index: -1;
  left: 0;
  right: 0;
  margin: 0 auto;
}

.stepper-progress-bar {
  position: absolute;
  left: 0;
  height: 100%;
  width: 0%;
  background-color: #47c00b;
  transition: all 500ms ease;
}

.stepper-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #c5c5c5;
  transition: all 500ms ease;
  cursor: pointer;
}

.stepper-item-counter {
  height: 35px;
  width: 35px;
  display: grid;
  place-items: center;
  background-color: #fff;
  border-radius: 100%;
  border: 2px solid #c5c5c5;
  position: relative;
}

.stepper-item-counter .icon-success {
  position: absolute;
  opacity: 0;
  transform: scale(0);
  width: 18px;
  transition: all 500ms ease;
}

.stepper-item-counter .number {
  font-size: 15px;
  transition: all 500ms ease;
}

.stepper-item-title {
  position: absolute;
  font-size: 15px;
  bottom: -39px;
  width: 71px;
  display: flex;
  justify-content: center;
}

.stepper-item.success .stepper-item-counter {
  border-color: #75cc65;
  background-color: #c8ebc1;
  color: #fff;
  font-weight: 600;
}

.stepper-item.success .stepper-item-counter .icon-success {
  opacity: 1;
  transform: scale(1);
}

.stepper-item.success .stepper-item-counter .number {
  opacity: 0;
  transform: scale(0);
}

.stepper-item.success .stepper-item-title {
  color: #75cc65;
}

.stepper-item.current .stepper-item-counter {
  border-color: #75cc65;
  background-color: #75cc65;
  color: #fff;
  font-weight: 600;
}

.stepper-item.current .stepper-item-title {
  color: #818181;
}
.signup a:hover {
  text-decoration: underline var(--primary-color);
}

.sign {
  display: block;
  width: 100%;
  background-color: var(--primary-color);
  padding: 0.75rem;
  text-align: center;
  color: black;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  margin-top: 50px;
}

.signup {
  text-align: center;
  font-size: 0.75rem;
  line-height: 1rem;
  color: rgba(156, 163, 175, 1);
}

.btnForm {
  max-width: 1140px;
  margin: 20px auto;
  background-color: white;
  padding: 1rem;
  color: black;
  border: 1px solid var(--primary-color);
  /* box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06); */
}

.btnLogin {
  padding: 1em 3em;
  font-size: 12px;
  font-weight: 500;
  color: #fff;
  background-color: var(--primary-color);
  border: none;
  border-radius: 45px;

  cursor: pointer;
  outline: none;
}

.btnLogin:hover {
  background-color: #fff;
  border: 1px solid var(--primary-color);
  color: #000;
}

.quill-editor {
  height: auto;
  margin-bottom: 10px;
}

:deep(.ql-toolbar.ql-snow) {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  padding: 8px;
  border-radius: 4px 4px 0 0;
}

:deep(.ql-formats) {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 0 !important;
}
:deep(.ql-toolbar.ql-snow + .ql-container.ql-snow) {
  height: 150px;
  overflow: scroll;
}
:deep(.ql-toolbar button) {
  height: 28px;
  width: 28px;
  padding: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.ql-editor) {
  min-height: 150px;
}
</style>
