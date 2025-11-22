<template >
  <div>
      <div
    class="d-md-flex d-block pt-12  align-items-center justify-content-between my-4 page-header-breadcrumb"
  >
    <h1 class="page-title fw-semibold fs-18 mb-0">Autres</h1>
    <div class="ms-md-1 ms-0">
      <nav>
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a href="javascript:void(0);">BSPP</a>
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            Autres
          </li>
        </ol>
      </nav>
    </div>
  </div>
  <div class="">

<!-- Start::row-1 -->
<div class="row ">
  <div class="col-xl-12">
      <div class="pb-3">
          <div class="">
              <div class="d-flex align-items-center justify-content-between flex-wrap gap-2" style="border-bottom:1px solid var(--secondary-rgb);">
                  <div>
                      <ul class="nav nav-tabs nav-tabs-header mb-0" role="tablist">
                          <li class="nav-item" role="presentation">
                              <a class="nav-link active" data-bs-toggle="tab" role="tab" aria-current="page" href="#bureau" aria-selected="true">Bureau de contrôle</a>
                          </li>

                          <li class="nav-item" role="presentation">
                              <a class="nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#entreprise" aria-selected="false" tabindex="-1"> Entreprise de travaux</a>
                          </li>

                          <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#ouvrage" aria-selected="false" tabindex="-1"> Maître d'ouvrage</a>
                          </li>
                          <li class="nav-item" role="presentation">
                            <a class="nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#conditions" aria-selected="false" tabindex="-1"> Critères d'etat de projet</a>
                          </li>
                      </ul>
                  </div>
                 
              </div>
          </div>
      </div>
  </div>
</div>
<!--End::row-1 -->

<!-- Start:: row-2 -->
<div class="row p-0">
  <div class="col-xl-12 p-0">
      <div class="tab-content">
          <div class="tab-pane show active p-0 border-0" id="bureau" role="tabpanel">
              <Bureau></Bureau>
        
          </div>
          <div class="tab-pane p-0" id="entreprise" role="tabpanel">
             <Entreprise></Entreprise>
          </div>
          <div class="tab-pane p-0" id="ouvrage" role="tabpanel">
             <Ouvrage></Ouvrage>
          </div>
          <div class="tab-pane p-0" id="conditions" role="tabpanel">
             <Conditions></Conditions>
          </div>
      </div>
  </div>
</div>
<!-- End:: row-2 -->


</div>
  </div>
</template>
<script>

import Bureau from '@/components/missions/bureau.vue'
import Entreprise from '@/components/missions/entreprise.vue'
import Ouvrage from '@/components/missions/ouvrage.vue'
import Conditions from '@/components/missions/conditions.vue'
export default {
  components: {
      Entreprise , Bureau , Ouvrage , Conditions
  },
}
</script>
<style lang="css" scoped>
  
</style>