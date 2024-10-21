<template >
    <div>
        <div
      class="d-md-flex d-block pt-12  align-items-center justify-content-between my-4 page-header-breadcrumb"
    >
      <h1 class="page-title fw-semibold fs-18 mb-0">Utilisateurs</h1>
      <div class="ms-md-1 ms-0">
        <nav>
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <a href="javascript:void(0);">BSPP</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">
              Roles et Permissions
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
                                <a class="nav-link active" data-bs-toggle="tab" role="tab" aria-current="page" href="#roles" aria-selected="true">Rôles</a>
                            </li>

                            <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#permissions" aria-selected="false" tabindex="-1"> Permissions</a>
                            </li>

                            <!-- <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#menus" aria-selected="false" tabindex="-1">Assigner Menus</a>
                            </li> -->

                            <!-- <li class="nav-item" role="presentation">
                                <a class="nav-link" data-bs-toggle="tab" role="tab" aria-current="page" href="#permissionsassign" aria-selected="false" tabindex="-1">Assigner Permissions</a>
                            </li> -->
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
            <div class="tab-pane show active p-0 border-0" id="roles" role="tabpanel">
                <Roles></Roles>
          
            </div>
            <div class="tab-pane p-0" id="permissions" role="tabpanel">
               <Permissions></Permissions>
            </div>

            <!-- <div class="tab-pane p-0" id="menus" role="tabpanel">
               <Menus></Menus>
            </div> -->

            <!-- <div class="tab-pane p-0" id="permissionsassign" role="tabpanel">
               <PermissionsAssign></PermissionsAssign>
            </div>
           -->
          
          



        </div>
    </div>
</div>
<!-- End:: row-2 -->


</div>
    </div>
</template>
<script>
import Menus from '@/components/droits/menus.vue'
import PermissionsAssign from '@/components/droits/Assignpermissions.vue'
import Roles from '@/components/roles&permissions/roles.vue'
import Permissions from '@/components/roles&permissions/permissions.vue'
export default {
    components: {
        Menus , PermissionsAssign , Roles , Permissions
    },
}
</script>
<style lang="css" scoped>
    
</style>