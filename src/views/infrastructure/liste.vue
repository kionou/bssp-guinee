<template >
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
    <!-- Page Header -->
    <div
      class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
    >
      <h1 class="page-title fw-semibold fs-18 mb-0">Infrastructures</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSSP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
                Infrastructures
            </li>
          </ol>
        </nav>
      </div>
    </div>
    <!-- Page Header Close --> 
<!-- 
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
  
            <div class="btn btn-icon btn-primary ms-2" @click="$router.push({ path: '/bssp/ajouter-projets' })">
              <i class="ri-add-line"> </i>
            </div>
          </div>
        </div>
      </div> -->
      <div class="row">
                    <div class="col-xl-12">
                        <div class="card custom-card">
                            <div class="card-header justify-content-between">
                                <div class="card-title">
                                    Liste des infrastructures
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
                                    <div class="btn btn-icon btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#create-infrastructure">
                                    <i class="ri-add-line"> </i>
                                    </div>
                                  
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="table-responsive">
                                    <table class="table text-nowrap table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col">Code</th>
                                                <th scope="col">Nom</th>
                                                <th scope="col">Date debut</th>
                                                <th scope="col">date fin</th>
                                                <th scope="col">Maitre ouvrage</th>
                                                <th scope="col">Etat</th>
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
                                                        <div class="me-2">
                                                            <span class="avatar avatar-xs">
                                                                <img src="@/assets/img/logo_mobile.png" alt="">
                                                            </span>
                                                        </div>
                                                        <div>Ray Optics &amp; Optical Fibre Master Class</div>
                                                    </div>
                                                </td>
                                                <td class="text-warning">
                                                    29-05-2023
                                                </td>
                                                <td style="color:red">
                                                    29-05-2023
                                                </td>
                                                <td>
                                                    Ministère des Travaux Publics
                                                </td>
                                                <td>
                                                   mauvais
                                                </td>
                                               
                                                <td>
                                                    <div class="hstack gap-2 fs-1">
                                                        <router-link to="/bssp/detail-infrastructures"  class="btn btn-icon btn-sm btn-primary-light btn-wave waves-effect waves-light"><i class="ri-eye-line"></i></router-link> 
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-info-light btn-wave waves-effect waves-light"><i class="ri-edit-line"></i></a>
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger-light btn-wave waves-effect waves-light"><i class="ri-delete-bin-line"></i></a>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    2
                                                </td>
                                                <td>
                                                    <div class="d-flex align-items-center lh-1">
                                                        <div class="me-2">
                                                            <span class="avatar avatar-xs">
                                                                <img src="@/assets/img/logo_mobile.png" alt="">
                                                            </span>
                                                        </div>
                                                        <div>Master Linear Alzebra Medium Level</div>
                                                    </div>
                                                </td>
                                                <td class="text-warning">
                                                    11-06-2023
                                                </td>
                                                <td style="color:red">
                                                    11-06-2023
                                                </td>
                                                <td>
                                                    Bamba moussa
                                                </td>
                                                <td>
                                                    bon
                                                </td>
                                                <td>
                                                    <div class="hstack gap-2 fs-1">
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-info-light btn-wave waves-effect waves-light"><i class="ri-edit-line"></i></a>
                                                        <a aria-label="anchor" href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger-light btn-wave waves-effect waves-light"><i class="ri-delete-bin-line"></i></a>
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

            <!-- Start:: Create suivi -->
       <div class="modal fade" id="create-infrastructure" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered  modal-lg">
                        <div class="modal-content">
                            <div class="modal-header fs-15 " style="background-color: var(--primary-color); color:white">
                                <h6 class="modal-title text-white">Creer une infrastructure</h6>
                               
                            </div>
                            <div class="modal-body px-4">
                                <div class="row gy-3">
                                    <div class="col-xl-4">
                                        <label for="contact-mail" class="form-label">Code</label>
                                        <input type="text" class="form-control" id="contact-mail" placeholder="00170">
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">Sigle</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="infras1">
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">Nom</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="Infrastructure 1">

                                    </div>
                                    <div class="col-xl-4">
                                    <label for="contact-mail" class="form-label">Date de debut</label>
                                        <input type="date" class="form-control" id="contact-mail" >
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">Date fin</label>
                                        <input class="form-control" type="date" id="input-file" >
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">Visibilite</label>
                                        <select class="form-control" data-trigger name="choices-single-default" id="choices-single-default">
                                            <option value="etat"></option>
                                            <option value="Choice 1">Oui</option>
                                            <option value="Choice 2">Non</option>
                                        </select>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-mail" class="form-label">Logo</label>
                                        <input type="file" class="form-control" id="contact-mail" >
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">projet</label>
                                        <select class="form-control" data-trigger name="choices-single-default" id="choices-single-default">
                                            <option value="etat"></option>
                                            <option value="Choice 1">Oui</option>
                                            <option value="Choice 2">Non</option>
                                        </select>
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">type d'infrastructure</label>
                                        <select class="form-control" data-trigger name="choices-single-default" id="choices-single-default">
                                            <option value="etat"></option>
                                            <option value="Choice 1">Oui</option>
                                            <option value="Choice 2">Non</option>
                                        </select>

                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-mail" class="form-label">Maitre d'ouvrage</label>
                                        <input type="text" class="form-control" id="contact-mail" placeholder="exemple">
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">Entreprise Responsable</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="exemple">
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">Localites</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="exemple 1">

                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-mail" class="form-label">Taux Avancement Technique</label>
                                        <input type="text" class="form-control" id="contact-mail" placeholder="exemple">
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="deal-title" class="form-label">Taux Decaissement</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="exemple">
                                    </div>
                                    <div class="col-xl-4">
                                        <label for="contact-lead-score" class="form-label">Montant Decaisse</label>
                                        <input class="form-control" type="text" id="input-file" placeholder="exemple 1">

                                    </div>
                                    <div class="col-xl-6">
                                        <label for="contact-mail" class="form-label">Trimestre</label>
                                        <input type="text" class="form-control" id="contact-mail" placeholder="exemple">
                                    </div>
                                    <div class="col-xl-6">
                                        <label for="deal-title" class="form-label">Date suivi</label>
                                        <input class="form-control" type="date" id="input-file" placeholder="exemple">
                                    </div>
                                    <div class="col-xl-12">
                                        <label for="contact-lead-score" class="form-label">Difficultes</label>
                                        <textarea class="form-control" id="text-area" rows="3"></textarea>

                                    </div>
                                   
                                    <div class="col-xl-12 text-center pt-1">
                                        <button type="button" class="btn btn-primary">Valider</button>

                                    </div>
                                   
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger"
                                    data-bs-dismiss="modal">Fermer</button>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- End:: Create Contact -->
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="css" scoped>
    
</style>