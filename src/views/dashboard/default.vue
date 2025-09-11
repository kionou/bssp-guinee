<template>
  <div>
    <!-- Start Switcher -->
    <div
      class="offcanvas offcanvas-end"
      tabindex="-1"
      id="switcher-canvas"
      aria-labelledby="offcanvasRightLabel"
    >
      <div class="offcanvas-header border-bottom">
        <h5 class="offcanvas-title text-default" id="offcanvasRightLabel">
          Switcher
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div class="offcanvas-body">
        <nav class="border-bottom border-block-end-dashed">
          <div
            class="nav nav-tabs nav-justified"
            id="switcher-main-tab"
            role="tablist"
          >
            <button
              class="nav-link active"
              id="switcher-home-tab"
              data-bs-toggle="tab"
              data-bs-target="#switcher-home"
              type="button"
              role="tab"
              aria-controls="switcher-home"
              aria-selected="true"
            >
              Theme Styles
            </button>
            <button
              class="nav-link"
              id="switcher-profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#switcher-profile"
              type="button"
              role="tab"
              aria-controls="switcher-profile"
              aria-selected="false"
            >
              Theme Colors
            </button>
          </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div
            class="tab-pane fade show active border-0"
            id="switcher-home"
            role="tabpanel"
            aria-labelledby="switcher-home-tab"
            tabindex="0"
          >
            <div class="">
              <p class="switcher-style-head">Theme Color Mode:</p>
              <div class="row switcher-style gx-0">
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-light-theme">
                      Light
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="theme-style"
                      id="switcher-light-theme"
                      checked
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-dark-theme">
                      Dark
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="theme-style"
                      id="switcher-dark-theme"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <p class="switcher-style-head">Directions:</p>
              <div class="row switcher-style gx-0">
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-ltr">
                      LTR
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="direction"
                      id="switcher-ltr"
                      checked
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-rtl">
                      RTL
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="direction"
                      id="switcher-rtl"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <p class="switcher-style-head">Navigation Styles:</p>
              <div class="row switcher-style gx-0">
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-vertical">
                      Vertical
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="navigation-style"
                      id="switcher-vertical"
                      checked
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-horizontal">
                      Horizontal
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="navigation-style"
                      id="switcher-horizontal"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="navigation-menu-styles">
              <p class="switcher-style-head">
                Vertical & Horizontal Menu Styles:
              </p>
              <div class="row switcher-style gx-0 pb-2 gy-2">
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-menu-click">
                      Menu Click
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="navigation-menu-styles"
                      id="switcher-menu-click"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-menu-hover">
                      Menu Hover
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="navigation-menu-styles"
                      id="switcher-menu-hover"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-icon-click">
                      Icon Click
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="navigation-menu-styles"
                      id="switcher-icon-click"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-icon-hover">
                      Icon Hover
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="navigation-menu-styles"
                      id="switcher-icon-hover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="sidemenu-layout-styles">
              <p class="switcher-style-head">Sidemenu Layout Styles:</p>
              <div class="row switcher-style gx-0 pb-2 gy-2">
                <div class="col-sm-6">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-default-menu">
                      Default Menu
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sidemenu-layout-styles"
                      id="switcher-default-menu"
                      checked
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-closed-menu">
                      Closed Menu
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sidemenu-layout-styles"
                      id="switcher-closed-menu"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-check switch-select">
                    <label
                      class="form-check-label"
                      for="switcher-icontext-menu"
                    >
                      Icon Text
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sidemenu-layout-styles"
                      id="switcher-icontext-menu"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-icon-overlay">
                      Icon Overlay
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sidemenu-layout-styles"
                      id="switcher-icon-overlay"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-detached">
                      Detached
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sidemenu-layout-styles"
                      id="switcher-detached"
                    />
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-double-menu">
                      Double Menu
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="sidemenu-layout-styles"
                      id="switcher-double-menu"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <p class="switcher-style-head">Page Styles:</p>
              <div class="row switcher-style gx-0">
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-regular">
                      Regular
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="page-styles"
                      id="switcher-regular"
                      checked
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-classic">
                      Classic
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="page-styles"
                      id="switcher-classic"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-modern">
                      Modern
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="page-styles"
                      id="switcher-modern"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <p class="switcher-style-head">Layout Width Styles:</p>
              <div class="row switcher-style gx-0">
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-full-width">
                      Full Width
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="layout-width"
                      id="switcher-full-width"
                      checked
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-boxed">
                      Boxed
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="layout-width"
                      id="switcher-boxed"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <p class="switcher-style-head">Menu Positions:</p>
              <div class="row switcher-style gx-0">
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-menu-fixed">
                      Fixed
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="menu-positions"
                      id="switcher-menu-fixed"
                      checked
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-menu-scroll">
                      Scrollable
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="menu-positions"
                      id="switcher-menu-scroll"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <p class="switcher-style-head">Header Positions:</p>
              <div class="row switcher-style gx-0">
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label class="form-check-label" for="switcher-header-fixed">
                      Fixed
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="header-positions"
                      id="switcher-header-fixed"
                      checked
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label
                      class="form-check-label"
                      for="switcher-header-scroll"
                    >
                      Scrollable
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="header-positions"
                      id="switcher-header-scroll"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="">
              <p class="switcher-style-head">Loader:</p>
              <div class="row switcher-style gx-0">
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label
                      class="form-check-label"
                      for="switcher-loader-enable"
                    >
                      Enable
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="page-loader"
                      id="switcher-loader-enable"
                    />
                  </div>
                </div>
                <div class="col-4">
                  <div class="form-check switch-select">
                    <label
                      class="form-check-label"
                      for="switcher-loader-disable"
                    >
                      Disable
                    </label>
                    <input
                      class="form-check-input"
                      type="radio"
                      name="page-loader"
                      id="switcher-loader-disable"
                      checked
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            class="tab-pane fade border-0"
            id="switcher-profile"
            role="tabpanel"
            aria-labelledby="switcher-profile-tab"
            tabindex="0"
          >
            <div>
              <div class="theme-colors">
                <p class="switcher-style-head">Menu Colors:</p>
                <div class="d-flex switcher-style pb-2">
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-white"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Light Menu"
                      type="radio"
                      name="menu-colors"
                      id="switcher-menu-light"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-dark"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Dark Menu"
                      type="radio"
                      name="menu-colors"
                      id="switcher-menu-dark"
                      checked
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-primary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Color Menu"
                      type="radio"
                      name="menu-colors"
                      id="switcher-menu-primary"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-gradient"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Gradient Menu"
                      type="radio"
                      name="menu-colors"
                      id="switcher-menu-gradient"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-transparent"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Transparent Menu"
                      type="radio"
                      name="menu-colors"
                      id="switcher-menu-transparent"
                    />
                  </div>
                </div>
                <div class="px-4 pb-3 text-muted fs-11">
                  Note:If you want to change color Menu dynamically change from
                  below Theme Primary color picker
                </div>
              </div>
              <div class="theme-colors">
                <p class="switcher-style-head">Header Colors:</p>
                <div class="d-flex switcher-style pb-2">
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-white"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Light Header"
                      type="radio"
                      name="header-colors"
                      id="switcher-header-light"
                      checked
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-dark"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Dark Header"
                      type="radio"
                      name="header-colors"
                      id="switcher-header-dark"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-primary"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Color Header"
                      type="radio"
                      name="header-colors"
                      id="switcher-header-primary"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-gradient"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Gradient Header"
                      type="radio"
                      name="header-colors"
                      id="switcher-header-gradient"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-transparent"
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Transparent Header"
                      type="radio"
                      name="header-colors"
                      id="switcher-header-transparent"
                    />
                  </div>
                </div>
                <div class="px-4 pb-3 text-muted fs-11">
                  Note:If you want to change color Header dynamically change
                  from below Theme Primary color picker
                </div>
              </div>
              <div class="theme-colors">
                <p class="switcher-style-head">Theme Primary:</p>
                <div class="d-flex flex-wrap align-items-center switcher-style">
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-primary-1"
                      type="radio"
                      name="theme-primary"
                      id="switcher-primary"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-primary-2"
                      type="radio"
                      name="theme-primary"
                      id="switcher-primary1"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-primary-3"
                      type="radio"
                      name="theme-primary"
                      id="switcher-primary2"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-primary-4"
                      type="radio"
                      name="theme-primary"
                      id="switcher-primary3"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-primary-5"
                      type="radio"
                      name="theme-primary"
                      id="switcher-primary4"
                    />
                  </div>
                  <div
                    class="form-check switch-select ps-0 mt-1 color-primary-light"
                  >
                    <div class="theme-container-primary"></div>
                    <div class="pickr-container-primary"></div>
                  </div>
                </div>
              </div>
              <div class="theme-colors">
                <p class="switcher-style-head">Theme Background:</p>
                <div class="d-flex flex-wrap align-items-center switcher-style">
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-bg-1"
                      type="radio"
                      name="theme-background"
                      id="switcher-background"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-bg-2"
                      type="radio"
                      name="theme-background"
                      id="switcher-background1"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-bg-3"
                      type="radio"
                      name="theme-background"
                      id="switcher-background2"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-bg-4"
                      type="radio"
                      name="theme-background"
                      id="switcher-background3"
                    />
                  </div>
                  <div class="form-check switch-select me-3">
                    <input
                      class="form-check-input color-input color-bg-5"
                      type="radio"
                      name="theme-background"
                      id="switcher-background4"
                    />
                  </div>
                  <div
                    class="form-check switch-select ps-0 mt-1 tooltip-static-demo color-bg-transparent"
                  >
                    <div class="theme-container-background"></div>
                    <div class="pickr-container-background"></div>
                  </div>
                </div>
              </div>
              <div class="menu-image mb-3">
                <p class="switcher-style-head">Menu With Background Image:</p>
                <div class="d-flex flex-wrap align-items-center switcher-style">
                  <div class="form-check switch-select m-2">
                    <input
                      class="form-check-input bgimage-input bg-img1"
                      type="radio"
                      name="theme-background"
                      id="switcher-bg-img"
                    />
                  </div>
                  <div class="form-check switch-select m-2">
                    <input
                      class="form-check-input bgimage-input bg-img2"
                      type="radio"
                      name="theme-background"
                      id="switcher-bg-img1"
                    />
                  </div>
                  <div class="form-check switch-select m-2">
                    <input
                      class="form-check-input bgimage-input bg-img3"
                      type="radio"
                      name="theme-background"
                      id="switcher-bg-img2"
                    />
                  </div>
                  <div class="form-check switch-select m-2">
                    <input
                      class="form-check-input bgimage-input bg-img4"
                      type="radio"
                      name="theme-background"
                      id="switcher-bg-img3"
                    />
                  </div>
                  <div class="form-check switch-select m-2">
                    <input
                      class="form-check-input bgimage-input bg-img5"
                      type="radio"
                      name="theme-background"
                      id="switcher-bg-img4"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-grid canvas-footer">
            <a
              href="javascript:void(0);"
              id="reset-all"
              class="btn btn-danger m-1"
              >Reset</a
            >
          </div>
        </div>
      </div>
    </div>
    <!-- End Switcher -->

    <div class="page">
      <!-- app-header -->
      <header class="app-header">
        <!-- Start::main-header-container -->
        <div class="main-header-container container-fluid">
          <!-- Start::header-content-left -->
          <div class="header-content-left">
            <!-- Start::header-element -->
            <div class="header-element">
              <div class="horizontal-logo">
                <router-link to="/" class="header-logo">
                  <img
                    src="@/assets/img/logo.png"
                    alt="logo"
                    class="desktop-logo"
                  />
                  <img
                    src="@/assets/img/logo.png"
                    alt="logo"
                    class="toggle-logo"
                  />
                  <img
                    src="@/assets/img/logo.png"
                    alt="logo"
                    class="desktop-dark"
                  />
                  <img
                    src="@/assets/img/logo.png"
                    alt="logo"
                    class="toggle-dark"
                  />
                  <img
                    src="@/assets/img/logo.png"
                    alt="logo"
                    class="desktop-white"
                  />
                  <img
                    src="@/assets/img/logo.png"
                    alt="logo"
                    class="toggle-white"
                  />
                </router-link>
              </div>
            </div>
            <!-- End::header-element -->

            <!-- Start::header-element -->
            <div class="header-element">
              <!-- Start::header-link -->
              <a
                aria-label="Hide Sidebar"
                @click="menuClose"
                class="sidemenu-toggle header-link animated-arrow hor-toggle horizontal-navtoggle main-content"
                data-bs-toggle="sidebar"
                href="javascript:void(0);"
                ><span></span
              ></a>
              <!-- End::header-link -->
            </div>
            <!-- End::header-element -->
          </div>
          <!-- End::header-content-left -->

          <!-- Start::header-content-right -->
          <div class="header-content-right">
            <!-- Start::header-element -->
            <div class="header-element">
              <!-- Start::header-link|dropdown-toggle -->
              <a
                href="javascript:void(0);"
                class="header-link dropdown-toggle"
                id="mainHeaderProfile"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
                aria-expanded="false"
              >
                <div class="d-flex align-items-center" v-if="loggedInUser">
                  <div class="me-sm-2 me-0">
                    <img
                      v-if="!loggedInUser.profile || !loggedInUser.profile.startsWith('https')"
                      src="@/assets/img/client.png"
                      alt="img"
                      width="32"
                      height="32"
                      class="rounded-circle"
                    />
                    <img
                      v-else
                      :src="loggedInUser.profile"
                      alt="img"
                     
                      class="rounded-circle"
                      style="width: 40px !important; height:40px !important"
                    />
                  </div>
                  <div class="d-sm-block d-none">
                    <p class="fw-semibold mb-0 lh-1">
                      {{ loggedInUser.prenom }} {{ loggedInUser.nom }}
                    </p>
                  </div>
                </div>
              </a>
              <!-- End::header-link|dropdown-toggle -->
              <ul
                class="main-header-dropdown dropdown-menu pt-0 overflow-hidden header-profile-dropdown dropdown-menu-end"
                aria-labelledby="mainHeaderProfile"
              >
                <li>
                  <router-link
                    class="dropdown-item d-flex"
                    to="/bspp/profil"
                    ><i class="ti ti-user-circle fs-18 me-2 op-7"></i
                    >Profil</router-link
                  >
                </li>
                <li>
                  <a class="dropdown-item d-flex" @click="logout" href="#"
                    ><i class="ti ti-logout fs-18 me-2 op-7"></i>Deconnecter</a
                  >
                </li>
              </ul>
            </div>
            <!-- End::header-element -->
          </div>
          <!-- End::header-content-right -->
        </div>
        <!-- End::main-header-container -->
      </header>
      <!-- /app-header -->
      <!-- Start::app-sidebar -->
      <aside class="app-sidebar sticky" id="sidebar">
        <!-- Start::main-sidebar-header -->
        <div class="main-sidebar-header">
          <router-link to="/" class="header-logo">
            <img src="@/assets/img/logo.png" alt="logo" class="desktop-logo" />
            <img
              src="@/assets/img/logo_mobile.png"
              alt="logo"
              class="toggle-logo"
            />
            <img
              src="@/assets/images/brand-logos/desktop-dark.png"
              alt="logo"
              class="desktop-dark"
            />
            <img
              src="@/assets/img/logo_mobile.png"
              alt="logo"
              class="toggle-dark"
            />
            <img
              src="@/assets/images/brand-logos/desktop-white.png"
              alt="logo"
              class="desktop-white"
            />
            <img
              src="@/assets/img/logo_mobile.png"
              alt="logo"
              class="toggle-white"
            />
          </router-link>
        </div>
        <!-- End::main-sidebar-header -->

        <!-- Start::main-sidebar -->
        <div class="main-sidebar" id="sidebar-scroll">
          <!-- Start::nav -->
          <nav class="main-menu-container nav nav-pills flex-column sub-open">
            <div class="slide-left" id="slide-left">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M13.293 6.293 7.586 12l5.707 5.707 1.414-1.414L10.414 12l4.293-4.293z"
                ></path>
              </svg>
            </div>
          

            <!-- <ul class="main-menu">
    <li class="slide" v-for="parent in organizedMenus" :key="parent.menu.id">
      <router-link :to="parent.menu.lien" class="side-menu__item">
        <i :class="parent.menu.icon"></i>
        <span class="side-menu__label">{{ parent.menu.label }}</span>
        <i v-if="parent.children.length" class="fe fe-chevron-right side-menu__angle"></i>
      </router-link>
      
      <ul v-if="parent.children.length" class="slide-menu child1">
        <li v-for="child in parent.children" :key="child.menu.id" class="slide">
          <router-link :to="child.menu.lien" class="side-menu__item">
            <i :class="child.menu.icon"></i>
            {{ child.menu.label }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul> -->
  <ul class="main-menu">
    <li v-for="parent in organizedMenus" :key="parent.menu.id" class="slide" >
      
      <!-- Si le parent a des enfants, on utilise un div avec un toggle -->
      <a href="javascript:void(0);" v-if="parent.children.length" 
      class="side-menu__item" 
      :class="{active: $route.path == parent.menu.lien}"
      @click="toggleMenu(parent)"
      >
        <i class="side-menu__icon"  :class="parent.menu.icon"></i>
        <span  class="side-menu__label">{{ parent.menu.label }}</span>
        <i class="fe fe-chevron-right side-menu__angle"></i>
      </a>
      
      <!-- Si le parent n'a pas d'enfants, on utilise un router-link -->
      <router-link v-else :to="parent.menu.lien" class="side-menu__item"
      :class="{active: $route.path == parent.menu.lien}"
      >
        <i class="side-menu__icon" :class="parent.menu.icon"></i>
        <span class="side-menu__label">{{ parent.menu.label }}</span>
      </router-link>
      
      <!-- Affichage des enfants si le parent est ouvert -->
      <ul v-if="parent.isOpen && parent.children.length" class="slide-menu child1">
        <li v-for="child in parent.children" :key="child.menu.id" class="slide">
          <router-link :to="child.menu.lien" class="side-menu__item"
          :class="{active: $route.path == child.menu.lien}"
          >
            <i :class="child.menu.icon"></i>
            {{ child.menu.label }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
            <div class="slide-right" id="slide-right">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#7b8191"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M10.707 17.707 16.414 12l-5.707-5.707-1.414 1.414L13.586 12l-4.293 4.293z"
                ></path>
              </svg>
            </div>
          </nav>
          <!-- End::nav -->
        </div>
        <!-- End::main-sidebar -->
      </aside>
      <!-- End::app-sidebar -->
      <!-- Start::app-content -->
      <div class="main-content app-content">
        <!-- <div class="container-fluid"> -->
          <!-- router link -->
          <router-view />
        <!-- </div> -->
      </div>
      <!-- End::app-content -->

      <!-- Footer Start -->
      <footer class="footer mt-auto py-3 bg-white text-center">
        <div class="container">
          <span class="text-muted fs-16">
            © Copyright BSPP <span id="year"></span>
            <a href="javascript:void(0);" class="text-dark fw-semibold"
              >Tous droits réservés
            </a>
            Conçu et développé par
            <a href="javascript:void(0);">
              <span class="fw-semibold text-primary text-decoration-underline">
                COSIT
              </span>
            </a>
          </span>
        </div>
      </footer>
      <!-- Footer End -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";


export default {
  name: "BsppGuineeLayout",
  components: {},

  data() {
    return {
      menus:[],
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    shouldShowNavbar() {
      this.$store.dispatch("auth/loadMyAuthenticatedUser");

      return this.isAuthenticated && this.$route.path !== "/";
    },
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
    // organizedMenus() {
  // Vérifiez que loggedInUser et menus existent
  // if (!this.loggedInUser || !Array.isArray(this.loggedInUser.menus)) {
  //   return []; // Retournez un tableau vide si les données ne sont pas encore disponibles
  // }
   // Filtrer les menus avec type === 1
  //  const menusType1 = this.loggedInUser.menus.filter(menu => menu.menu.type === "1");

  // Filtrer les parents et les enfants à partir des menus de type 1
  // const parentMenus = menusType1.filter(menu => !menu.menu.parent);
  // const childMenus = menusType1.filter(menu => menu.menu.parent);

  // Trier les menus par ID
  // parentMenus.sort((a, b) => a.menu.id - b.menu.id);
  // childMenus.sort((a, b) => a.menu.id - b.menu.id);

  // Associer les enfants aux parents
//   parentMenus.forEach(parent => {
//     parent.children = childMenus.filter(child => child.menu.parent == parent.menu.id);
//     parent.isOpen = false; // État d'ouverture des sous-menus
//   });

//   return parentMenus;
// }

organizedMenussss() {
  // Vérifiez que loggedInUser et menus existent
  if (!this.loggedInUser || !Array.isArray(this.loggedInUser.menus)) {
    return []; // Retournez un tableau vide si les données ne sont pas encore disponibles
  }

  // Filtrer les menus avec type === 1
  const menusType1 = this.loggedInUser.menus.filter(menu => menu.menu.type == "1");

  // Filtrer les parents et les enfants à partir des menus de type 1
  const parentMenus = menusType1.filter(menu => !menu.menu.parent);
  const childMenus = menusType1.filter(menu => menu.menu.parent);

  // Trier les menus par ID
  parentMenus.sort((a, b) => a.menu.id - b.menu.id);
  childMenus.sort((a, b) => a.menu.id - b.menu.id);

  // Déplacer "Paramétrages" en deuxième position
  const parametresIndex = parentMenus.findIndex(menu => menu.menu.label == "Paramétrages");
  if (parametresIndex !== -1) {
    const parametresMenu = parentMenus.splice(parametresIndex, 1)[0];
    parentMenus.splice(1, 0, parametresMenu);
  }

  // Associer les enfants aux parents
  parentMenus.forEach(parent => {
    parent.children = childMenus.filter(child => child.menu.parent == parent.menu.id);
    parent.isOpen = false; // État d'ouverture des sous-menus
  });

  return parentMenus;
},
organizedMenus() {
  // Vérifiez que loggedInUser et menus existent
  if (!this.loggedInUser || !Array.isArray(this.loggedInUser.menus)) {
    return []; // Retournez un tableau vide si les données ne sont pas encore disponibles
  }

  // Filtrer les menus avec type === 1
  const menusType1 = this.loggedInUser.menus.filter(menu => menu.menu.type == "1");

  // Filtrer les parents et les enfants à partir des menus de type 1
  const parentMenus = menusType1.filter(menu => !menu.menu.parent);
  const childMenus = menusType1.filter(menu => menu.menu.parent);

  // Trier les parents par `order_number`
  parentMenus.sort((a, b) => parseInt(a.menu.order_number) - parseInt(b.menu.order_number));

  // Associer et trier les enfants pour chaque parent
  parentMenus.forEach(parent => {
    // Filtrer les enfants appartenant au parent actuel
    parent.children = childMenus
      .filter(child => child.menu.parent == parent.menu.id)
      // Trier les enfants par `order_number`
      .sort((a, b) => parseInt(a.menu.order_number) - parseInt(b.menu.order_number));
    
    parent.isOpen = false; // État d'ouverture des sous-menus
  });

  return parentMenus;
}



  },

  watch: {
    isAuthenticated(newValue) {
      // console.log("User is logged in:", newValue);
    },
  },
  methods: {
 
    async logout() {
      try {
        await this.$store.dispatch("auth/clearMyAuthenticatedUser"); // Appel de l'action pour déconnecter l'utilisateur
        this.$router.push("/");
        location.reload();
      } catch (error) {
      }
    },
    toggleMenu(menu) {
      // Ouvre ou ferme le sous-menu
      menu.isOpen = !menu.isOpen;
    }
  },

 async  mounted() {
 
  
    // this.menus = this.loggedInUser.menus

    ("use strict");

    const ANIMATION_DURATION = 300;

    const sidebar = document.getElementById("sidebar");
    let mainContentDiv = document.querySelector(".main-content");

    const slideHasSub = document.querySelectorAll(".nav > ul > .slide.has-sub");

    const firstLevelItems = document.querySelectorAll(
      ".nav > ul > .slide.has-sub > a"
    );

    const innerLevelItems = document.querySelectorAll(
      ".nav > ul > .slide.has-sub .slide.has-sub > a"
    );

    class PopperObject {
      instance = null;
      reference = null;
      popperTarget = null;

      constructor(reference, popperTarget) {
        this.init(reference, popperTarget);
      }

      init(reference, popperTarget) {
        this.reference = reference;
        this.popperTarget = popperTarget;
        this.instance = Popper.createPopper(this.reference, this.popperTarget, {
          placement: "bottom",
          strategy: "relative",
          resize: true,
          modifiers: [
            {
              name: "computeStyles",
              options: {
                adaptive: false,
              },
            },
          ],
        });

        document.addEventListener(
          "click",
          (e) => this.clicker(e, this.popperTarget, this.reference),
          false
        );

        const ro = new ResizeObserver(() => {
          this.instance.update();
        });

        ro.observe(this.popperTarget);
        ro.observe(this.reference);
      }

      clicker(event, popperTarget, reference) {
        if (
          sidebar.classList.contains("collapsed") &&
          !popperTarget.contains(event.target) &&
          !reference.contains(event.target)
        ) {
          this.hide();
        }
      }

      hide() {
        // this.instance.state.elements.popper.style.visibility = "hidden";
      }
    }

    class Poppers {
      subMenuPoppers = [];

      constructor() {
        this.init();
      }

      init() {
        slideHasSub.forEach((element) => {
          this.subMenuPoppers.push(
            new PopperObject(element, element.lastElementChild)
          );
          this.closePoppers();
        });
      }

      togglePopper(target) {
        if (
          window.getComputedStyle(target).visibility === "hidden" &&
          window.getComputedStyle(target).visibility === undefined
        )
          target.style.visibility = "visible";
        else target.style.visibility = "hidden";
      }

      updatePoppers() {
        this.subMenuPoppers.forEach((element) => {
          element.instance.state.elements.popper.style.display = "none";
          element.instance.update();
        });
      }

      closePoppers() {
        this.subMenuPoppers.forEach((element) => {
          element.hide();
        });
      }
    }

    const slideUp = (target, duration = ANIMATION_DURATION) => {
      const { parentElement } = target;
      parentElement.classList.remove("open");
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = `${duration}ms`;
      target.style.boxSizing = "border-box";
      target.style.height = `${target.offsetHeight}px`;
      target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      window.setTimeout(() => {
        target.style.display = "none";
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
      }, duration);
    };
    const slideDown = (target, duration = ANIMATION_DURATION) => {
      const { parentElement } = target;
      parentElement.classList.add("open");
      target.style.removeProperty("display");
      let { display } = window.getComputedStyle(target);
      if (display === "none") display = "block";
      target.style.display = display;
      const height = target.offsetHeight;
      target.style.overflow = "hidden";
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.boxSizing = "border-box";
      target.style.transitionProperty = "height, margin, padding";
      target.style.transitionDuration = `${duration}ms`;
      target.style.height = `${height}px`;
      target.style.removeProperty("padding-top");
      target.style.removeProperty("padding-bottom");
      target.style.removeProperty("margin-top");
      target.style.removeProperty("margin-bottom");
      window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-property");
        target.style.removeProperty("transition-duration");
      }, duration);
    };
    const slideToggle = (target, duration = ANIMATION_DURATION) => {
      let html = document.querySelector("html");
      if (
        !(
          (html.getAttribute("data-nav-style") === "menu-hover" &&
            html.getAttribute("data-toggled") === "menu-hover-closed" &&
            window.innerWidth >= 992) ||
          (html.getAttribute("data-nav-style") === "icon-hover" &&
            html.getAttribute("data-toggled") === "icon-hover-closed" &&
            window.innerWidth >= 992)
        ) &&
        target &&
        target.nodeType != 3
      ) {
        if (window.getComputedStyle(target).display === "none")
          return slideDown(target, duration);
        return slideUp(target, duration);
      }
    };

    const PoppersInstance = new Poppers();

    /**
     * wait for the current animation to finish and update poppers position
     */
    const updatePoppersTimeout = () => {
      setTimeout(() => {
        PoppersInstance.updatePoppers();
      }, ANIMATION_DURATION);
    };

    const defaultOpenMenus = document.querySelectorAll(".slide.has-sub.open");

    defaultOpenMenus.forEach((element) => {
      element.lastElementChild.style.display = "block";
    });

    /**
     * handle top level submenu click
     */
    firstLevelItems.forEach((element) => {
      element.addEventListener("click", () => {
        let html = document.querySelector("html");
        if (
          !(
            (html.getAttribute("data-nav-style") === "menu-hover" &&
              html.getAttribute("data-toggled") === "menu-hover-closed" &&
              window.innerWidth >= 992) ||
            (html.getAttribute("data-nav-style") === "icon-hover" &&
              html.getAttribute("data-toggled") === "icon-hover-closed" &&
              window.innerWidth >= 992)
          )
        ) {
          const parentMenu = element.closest(".nav.sub-open");
          if (parentMenu)
            parentMenu
              .querySelectorAll(":scope > ul > .slide.has-sub > a")
              .forEach((el) => {
                // window.getComputedStyle(el.nextElementSibling).display !== "none" &&
                if (
                  el.nextElementSibling.style.display === "block" ||
                  window.getComputedStyle(el.nextElementSibling).display ===
                    "block"
                ) {
                  slideUp(el.nextElementSibling);
                }
              });
          slideToggle(element.nextElementSibling);
        }
      });
    });

    /**
     * handle inner submenu click
     */
    innerLevelItems.forEach((element) => {
      let html = document.querySelector("html");
      // if ((html.getAttribute('data-nav-style') !== "menu-hover" || html.getAttribute('data-nav-style') !== "icon-hover") ) {
      element.addEventListener("click", () => {
        const innerMenu = element.closest(".slide-menu");
        if (innerMenu)
          innerMenu
            .querySelectorAll(":scope .slide.has-sub > a")
            .forEach((el) => {
              // window.getComputedStyle(el.nextElementSibling).display !== "none" &&
              // ref || window.getComputedStyle(el.nextElementSibling).display === "block"
              if (
                el.nextElementSibling &&
                el.nextElementSibling?.style.display === "block"
              ) {
                slideUp(el.nextElementSibling);
              }
            });
        slideToggle(element.nextElementSibling);
      });
      // }
    });

    /**
     * menu styles
     */
    let headerToggleBtn, WindowPreSize;
    (() => {
      let html = document.querySelector("html");
      headerToggleBtn = document.querySelector(".sidemenu-toggle");
      headerToggleBtn.addEventListener("click", toggleSidemenu);
      let mainContent = document.querySelector(".main-content");
      if (window.innerWidth <= 992) {
        mainContent.addEventListener("click", menuClose);
      } else {
        mainContent.removeEventListener("click", menuClose);
      }

      WindowPreSize = [window.innerWidth];
      setNavActive();
      if (
        html.getAttribute("data-nav-layout") === "horizontal" &&
        window.innerWidth >= 992
      ) {
        clearNavDropdown();
        mainContent.addEventListener("click", clearNavDropdown);
      } else {
        mainContent.removeEventListener("click", clearNavDropdown);
      }

      window.addEventListener("resize", ResizeMenu);
      switcherArrowFn();

      if (
        !localStorage.getItem("ynexlayout") &&
        !localStorage.getItem("ynexnavstyles") &&
        !localStorage.getItem("ynexverticalstyles") &&
        !document.querySelector(".landing-body") &&
        document.querySelector("html").getAttribute("data-nav-layout") !==
          "horizontal"
      ) {
        // To enable sidemenu layout styles
        // iconTextFn();
        // detachedFn();
        // closedSidemenuFn();
        // doubletFn();
        if (
          !html.getAttribute("data-vertical-style") &&
          !html.getAttribute("data-nav-style")
        ) {
          iconOverayFn();
        }
      }

      function rtlFn() {
        let html = document.querySelector("html");
        html.setAttribute("dir", "rtl");
        document
          .querySelector("#style")
          ?.setAttribute(
            "href",
            "../assets/libs/bootstrap/css/bootstrap.rtl.min.css"
          );
        //RTL
        if (localStorage.getItem("ynexrtl")) {
          document.querySelector("#switcher-rtl").checked = true;
        }
      }

      /* RTL Start */
      if (html.getAttribute("dir") === "rtl") {
        rtlFn();
      }
      /* RTL End */

      /* Horizontal Start */
      if (
        html.getAttribute("data-nav-layout") === "horizontal" &&
        !document.querySelector(".landing-body") == true
      ) {
        setTimeout(() => {
          horizontalClickFn();
        }, 1000);
      }
      /* Horizontal End */

      toggleSidemenu();

      if (
        (html.getAttribute("data-nav-style") === "menu-hover" ||
          html.getAttribute("data-nav-style") === "icon-hover") &&
        window.innerWidth >= 992
      ) {
        clearNavDropdown();
      }
      if (window.innerWidth < 992) {
        html.setAttribute("data-toggled", "close");
      }
    })();

    function ResizeMenu() {
      let html = document.querySelector("html");
      let mainContent = document.querySelector(".main-content");

      WindowPreSize.push(window.innerWidth);
      if (WindowPreSize.length > 2) {
        WindowPreSize.shift();
      }
      if (WindowPreSize.length > 1) {
        if (
          WindowPreSize[WindowPreSize.length - 1] < 992 &&
          WindowPreSize[WindowPreSize.length - 2] >= 992
        ) {
          // less than 992;
          mainContent.addEventListener("click", menuClose);
          setNavActive();
          toggleSidemenu();
          mainContent.removeEventListener("click", clearNavDropdown);
        }

        if (
          WindowPreSize[WindowPreSize.length - 1] >= 992 &&
          WindowPreSize[WindowPreSize.length - 2] < 992
        ) {
          // greater than 992
          mainContent.removeEventListener("click", menuClose);
          toggleSidemenu();
          if (html.getAttribute("data-nav-layout") === "horizontal") {
            clearNavDropdown();
            mainContent.addEventListener("click", clearNavDropdown);
          } else {
            mainContent.removeEventListener("click", clearNavDropdown);
          }
          html.removeAttribute("data-toggled");
        }
      }
      checkHoriMenu();
    }

    function menuClose() {
      let html = document.querySelector("html");
      // html.setAttribute("data-toggled", "close");
      // document.querySelector("#responsive-overlay").classList.remove("active");
    }

    function toggleSidemenu() {
      let html = document.querySelector("html");
      let sidemenuType = html.getAttribute("data-nav-layout");

      if (window.innerWidth >= 992) {
        if (sidemenuType === "vertical") {
          sidebar.removeEventListener("mouseenter", mouseEntered);
          sidebar.removeEventListener("mouseleave", mouseLeave);
          sidebar.removeEventListener("click", icontextOpen);
          mainContentDiv.removeEventListener("click", icontextClose);
          let sidemenulink = document.querySelectorAll(
            ".main-menu li > .side-menu__item"
          );
          sidemenulink.forEach((ele) =>
            ele.removeEventListener("click", doubleClickFn)
          );

          let verticalStyle = html.getAttribute("data-vertical-style");
          switch (verticalStyle) {
            // closed
            case "closed":
              html.removeAttribute("data-nav-style");
              if (html.getAttribute("data-toggled") === "close-menu-close") {
                html.removeAttribute("data-toggled");
              } else {
                html.setAttribute("data-toggled", "close-menu-close");
              }
              break;
            // icon-overlay
            case "overlay":
              html.removeAttribute("data-nav-style");
              if (html.getAttribute("data-toggled") === "icon-overlay-close") {
                html.removeAttribute("data-toggled", "icon-overlay-close");
                sidebar.removeEventListener("mouseenter", mouseEntered);
                sidebar.removeEventListener("mouseleave", mouseLeave);
              } else {
                if (window.innerWidth >= 992) {
                  if (!localStorage.getItem("ynexlayout")) {
                    html.setAttribute("data-toggled", "icon-overlay-close");
                  }
                  sidebar.addEventListener("mouseenter", mouseEntered);
                  sidebar.addEventListener("mouseleave", mouseLeave);
                } else {
                  sidebar.removeEventListener("mouseenter", mouseEntered);
                  sidebar.removeEventListener("mouseleave", mouseLeave);
                }
              }
              break;
            // icon-text
            case "icontext":
              html.removeAttribute("data-nav-style");
              if (html.getAttribute("data-toggled") === "icon-text-close") {
                html.removeAttribute("data-toggled", "icon-text-close");
                sidebar.removeEventListener("click", icontextOpen);
                mainContentDiv.removeEventListener("click", icontextClose);
              } else {
                html.setAttribute("data-toggled", "icon-text-close");
                if (window.innerWidth >= 992) {
                  sidebar.addEventListener("click", icontextOpen);
                  mainContentDiv.addEventListener("click", icontextClose);
                } else {
                  sidebar.removeEventListener("click", icontextOpen);
                  mainContentDiv.removeEventListener("click", icontextClose);
                }
              }
              break;
            // doublemenu
            case "doublemenu":
              html.removeAttribute("data-nav-style");
              if (html.getAttribute("data-toggled") === "double-menu-open") {
                html.setAttribute("data-toggled", "double-menu-close");
                if (document.querySelector(".slide-menu")) {
                  let slidemenu = document.querySelectorAll(".slide-menu");
                  slidemenu.forEach((e) => {
                    if (e.classList.contains("double-menu-active")) {
                      e.classList.remove("double-menu-active");
                    }
                  });
                }
              } else {
                let sidemenu = document.querySelector(
                  ".side-menu__item.active"
                );
                if (sidemenu) {
                  html.setAttribute("data-toggled", "double-menu-open");
                  if (sidemenu.nextElementSibling) {
                    sidemenu.nextElementSibling.classList.add(
                      "double-menu-active"
                    );
                  } else {
                    document
                      .querySelector("html")
                      .setAttribute("data-toggled", "double-menu-close");
                  }
                }
              }

              doublemenu();
              break;
            // detached
            case "detached":
              html.removeAttribute("data-nav-style");
              if (html.getAttribute("data-toggled") === "detached-close") {
                html.removeAttribute("data-toggled", "detached-close");
                sidebar.removeEventListener("mouseenter", mouseEntered);
                sidebar.removeEventListener("mouseleave", mouseLeave);
              } else {
                html.setAttribute("data-toggled", "detached-close");
                if (window.innerWidth >= 992) {
                  sidebar.addEventListener("mouseenter", mouseEntered);
                  sidebar.addEventListener("mouseleave", mouseLeave);
                } else {
                  sidebar.removeEventListener("mouseenter", mouseEntered);
                  sidebar.removeEventListener("mouseleave", mouseLeave);
                }
              }
              break;
            // default
            case "default":
              iconOverayFn();
              html.removeAttribute("data-toggled");

            // for making any vertical style as default
            // default:
            // iconOverayFn();
            // html.removeAttribute('data-toggled');
          }
          let menuclickStyle = html.getAttribute("data-nav-style");
          switch (menuclickStyle) {
            case "menu-click":
              if (html.getAttribute("data-toggled") === "menu-click-closed") {
                html.removeAttribute("data-toggled");
              } else {
                html.setAttribute("data-toggled", "menu-click-closed");
              }
              break;
            case "menu-hover":
              if (html.getAttribute("data-toggled") === "menu-hover-closed") {
                html.removeAttribute("data-toggled");
                setNavActive();
              } else {
                html.setAttribute("data-toggled", "menu-hover-closed");
                clearNavDropdown();
              }
              break;
            case "icon-click":
              if (html.getAttribute("data-toggled") === "icon-click-closed") {
                html.removeAttribute("data-toggled");
              } else {
                html.setAttribute("data-toggled", "icon-click-closed");
              }
              break;
            case "icon-hover":
              if (html.getAttribute("data-toggled") === "icon-hover-closed") {
                html.removeAttribute("data-toggled");
                setNavActive();
              } else {
                html.setAttribute("data-toggled", "icon-hover-closed");
                clearNavDropdown();
              }
              break;
            //for making any horizontal style as default
            default:
          }
        }
      } else {
        if (html.getAttribute("data-toggled") === "close") {
          html.setAttribute("data-toggled", "open");
          let i = document.createElement("div");
          i.id = "responsive-overlay";
          // html.append(i)

          // setTimeout(() => {
          //   if (
          //     document.querySelector("html").getAttribute("data-toggled") ==
          //     "open"
          //   ) {
          //     document
          //       .querySelector("#responsive-overlay")
          //       .classList.add("active");
          //     document
          //       .querySelector("#responsive-overlay")
          //       .addEventListener("click", () => {
          //         document
          //           .querySelector("#responsive-overlay")
          //           .classList.remove("active");
          //       
          //         menuClose();
          //       });
          //   }
          //   window.addEventListener("resize", () => {
          //     if (window.screen.width >= 992) {
          //       document
          //         .querySelector("#responsive-overlay")
          //         .classList.remove("active");
          //     }
          //   });
          // }, 100);
        } else {
         
          html.setAttribute("data-toggled", "close");
        }
      }
    }

    document.addEventListener("click", function (event) {
      if (
        (event.target.classList.contains("side-menu__label") ||
          event.target.classList.contains("side-menu__item")) &&
        !event.target.classList.contains("settings")
      ) {
        let html = document.querySelector("html");
        if (html.getAttribute("data-toggled") === "open")
          html.setAttribute("data-toggled", "close");
      }
    });

    function mouseEntered() {
      let html = document.querySelector("html");
      html.setAttribute("data-icon-overlay", "open");
    }
    function mouseLeave() {
      let html = document.querySelector("html");
      html.removeAttribute("data-icon-overlay");
    }
    function icontextOpen() {
      let html = document.querySelector("html");
      html.setAttribute("data-icon-text", "open");
    }
    function icontextClose() {
      let html = document.querySelector("html");
      html.removeAttribute("data-icon-text");
    }
    function closedSidemenuFn() {
      let html = document.querySelector("html");
      html.setAttribute("data-nav-layout", "vertical");
      html.setAttribute("data-vertical-style", "closed");
      toggleSidemenu();
    }
    function detachedFn() {
      let html = document.querySelector("html");
      html.setAttribute("data-nav-layout", "vertical");
      html.setAttribute("data-vertical-style", "detached");
      toggleSidemenu();
    }
    function iconTextFn() {
      let html = document.querySelector("html");
      html.setAttribute("data-nav-layout", "vertical");
      html.setAttribute("data-vertical-style", "icontext");
      toggleSidemenu();
    }
    function iconOverayFn() {
      let html = document.querySelector("html");
      html.setAttribute("data-nav-layout", "vertical");
      html.setAttribute("data-vertical-style", "overlay");
      toggleSidemenu();
      setNavActive();
    }
    function doubletFn() {
      let html = document.querySelector("html");
      html.setAttribute("data-nav-layout", "vertical");
      html.setAttribute("data-vertical-style", "doublemenu");
      toggleSidemenu();

      const menuSlideItem = document.querySelectorAll(
        ".main-menu > li > .side-menu__item"
      );

      // Create the tooltip element
      const tooltip = document.createElement("div");
      tooltip.className = "custome-tooltip";
      // tooltip.textContent = "This is a tooltip";

      // Set the CSS properties of the tooltip element
      tooltip.style.setProperty("position", "fixed");
      tooltip.style.setProperty("display", "none");
      tooltip.style.setProperty("padding", "0.5rem");
      tooltip.style.setProperty("font-weight", "500");
      tooltip.style.setProperty("font-size", "0.75rem");
      tooltip.style.setProperty("background-color", "rgb(15, 23 ,42)");
      tooltip.style.setProperty("color", "rgb(255, 255 ,255)");
      tooltip.style.setProperty("margin-inline-start", "45px");
      tooltip.style.setProperty("border-radius", "0.25rem");
      tooltip.style.setProperty("z-index", "99");

      menuSlideItem.forEach((e) => {
        // Add an event listener to the menu slide item to show the tooltip
        e.addEventListener("mouseenter", () => {
          tooltip.style.setProperty("display", "block");
          tooltip.textContent =
            e.querySelector(".side-menu__label").textContent;
          if (
            document
              .querySelector("html")
              .getAttribute("data-vertical-style") == "doublemenu"
          ) {
            e.appendChild(tooltip);
          }
        });

        // Add an event listener to hide the tooltip
        e.addEventListener("mouseleave", () => {
          tooltip.style.setProperty("display", "none");
          tooltip.textContent =
            e.querySelector(".side-menu__label").textContent;
          if (
            document
              .querySelector("html")
              .getAttribute("data-vertical-style") == "doublemenu"
          ) {
            e.removeChild(tooltip);
          }
        });
      });
    }
    function menuClickFn() {
      let html = document.querySelector("html");
      html.setAttribute("data-nav-style", "menu-click");
      html.removeAttribute("data-hor-style");
      html.removeAttribute("data-vertical-style");

      toggleSidemenu();
      if (html.getAttribute("data-nav-layout") === "vertical") {
        setNavActive();
      }
    }
    function menuhoverFn() {
      let html = document.querySelector("html");
      html.setAttribute("data-nav-style", "menu-hover");
      html.removeAttribute("data-hor-style");
      html.removeAttribute("data-vertical-style");
      toggleSidemenu();
      if (html.getAttribute("data-toggled") === "menu-hover-closed") {
        clearNavDropdown();
      }
    }
    function iconClickFn() {
      let html = document.querySelector("html");
      html.setAttribute("data-nav-style", "icon-click");
      toggleSidemenu();
      if (html.getAttribute("data-nav-layout") === "vertical") {
        setNavActive();
      }
    }
    function iconHoverFn() {
      let html = document.querySelector("html");
      html.setAttribute("data-nav-style", "icon-hover");
      toggleSidemenu();
      clearNavDropdown();
    }
    function setNavActive() {
      let currentPath = window.location.pathname.split("/")[0];

      currentPath =
        location.pathname == "/"
          ? "index.html"
          : location.pathname.substring(1);
      currentPath = currentPath.substring(currentPath.lastIndexOf("/") + 1);
      let sidemenuItems = document.querySelectorAll(".side-menu__item");
      sidemenuItems.forEach((e) => {
        if (currentPath === "/") {
          currentPath = "index.html";
        }
        if (e.getAttribute("href") === currentPath) {
          e.classList.add("active");
          e.parentElement.classList.add("active");
          let parent = e.closest("ul");
          let parentNotMain = e.closest("ul:not(.main-menu)");
          let hasParent = true;
          // while (hasParent) {
          if (parent) {
            parent.classList.add("active");
            parent.previousElementSibling.classList.add("active");
            parent.parentElement.classList.add("active");

            if (parent.parentElement.classList.contains("has-sub")) {
              let elemrntRef = parent.parentElement.parentElement.parentElement;
              elemrntRef.classList.add("open", "active");
              elemrntRef.firstElementChild.classList.add("active");
              elemrntRef.children[1].style.display = "block";
              Array.from(elemrntRef.children[1].children).map((element) => {
                if (element.classList.contains("active")) {
                  element.children[1].style.display = "block";
                }
              });
            }

            if (parent.classList.contains("child1")) {
              slideDown(parent);
            }
            parent = parent.parentElement.closest("ul");
            //
            if (parent && parent.closest("ul:not(.main-menu)")) {
              parentNotMain = parent.closest("ul:not(.main-menu)");
            }
            if (!parentNotMain) hasParent = false;
          } else {
            hasParent = false;
          }
        }
        // }
      });
    }
    function clearNavDropdown() {
      let sidemenus = document.querySelectorAll("ul.slide-menu");
      sidemenus.forEach((e) => {
        let parent = e.closest("ul");
        let parentNotMain = e.closest("ul:not(.main-menu)");
        if (parent) {
          let hasParent = parent.closest("ul.main-menu");
          while (hasParent) {
            parent.classList.add("active");
            slideUp(parent);
            //
            parent = parent.parentElement.closest("ul");
            parentNotMain = parent.closest("ul:not(.main-menu)");
            if (!parentNotMain) hasParent = false;
          }
        }
      });
    }
    function switcherArrowFn() {
      let slideLeft = document.querySelector(".slide-left");
      let slideRight = document.querySelector(".slide-right");

      // used to remove is-expanded class and remove class on clicking arrow buttons
      function slideClick() {
        let slide = document.querySelectorAll(".slide");
        let slideMenu = document.querySelectorAll(".slide-menu");
        slide.forEach((element, index) => {
          if (element.classList.contains("is-expanded") == true) {
            element.classList.remove("is-expanded");
          }
        });
        slideMenu.forEach((element, index) => {
          if (element.classList.contains("open") == true) {
            element.classList.remove("open");
            element.style.display = "none";
          }
        });
      }

      checkHoriMenu();

      slideLeft.addEventListener("click", () => {
        let menuNav = document.querySelector(".main-menu");
        let mainContainer1 = document.querySelector(".main-sidebar");
        let marginLeftValue = Math.ceil(
          Number(window.getComputedStyle(menuNav).marginLeft.split("px")[0])
        );
        let marginRightValue = Math.ceil(
          Number(window.getComputedStyle(menuNav).marginRight.split("px")[0])
        );
        let mainContainer1Width = mainContainer1.offsetWidth;
        if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
          if (!(document.querySelector("html").getAttribute("dir") === "rtl")) {
            if (
              marginLeftValue < 0 &&
              !(Math.abs(marginLeftValue) < mainContainer1Width)
            ) {
              menuNav.style.marginRight = 0;
              menuNav.style.marginLeft =
                Number(menuNav.style.marginLeft.split("px")[0]) +
                Math.abs(mainContainer1Width) +
                "px";
              slideRight.classList.remove("d-none");
            } else if (marginLeftValue >= 0) {
              menuNav.style.marginLeft = "0px";
              slideLeft.classList.add("d-none");
              slideRight.classList.remove("d-none");
            } else {
              menuNav.style.marginLeft = "0px";
              slideLeft.classList.add("d-none");
              slideRight.classList.remove("d-none");
            }
          } else {
            if (
              marginRightValue < 0 &&
              !(Math.abs(marginRightValue) < mainContainer1Width)
            ) {
              menuNav.style.marginLeft = 0;
              menuNav.style.marginRight =
                Number(menuNav.style.marginRight.split("px")[0]) +
                Math.abs(mainContainer1Width) +
                "px";
              slideRight.classList.remove("d-none");
            } else if (marginRightValue >= 0) {
              menuNav.style.marginRight = "0px";
              slideLeft.classList.add("d-none");
              slideRight.classList.remove("d-none");
            } else {
              menuNav.style.marginRight = "0px";
              slideLeft.classList.add("d-none");
              slideRight.classList.remove("d-none");
            }
          }
        } else {
          document.querySelector(".main-menu").style.marginLeft = "0px";
          document.querySelector(".main-menu").style.marginRight = "0px";
          slideLeft.classList.add("d-none");
        }

        let element = document.querySelector(".main-menu > .slide.open");
        let element1 = document.querySelector(".main-menu > .slide.open >ul");
        if (element) {
          element.classList.remove("open");
        }
        if (element1) {
          element1.style.display = "none";
        }

        slideClick();
        return;
        //
      });
      slideRight.addEventListener("click", () => {
        let menuNav = document.querySelector(".main-menu");
        let mainContainer1 = document.querySelector(".main-sidebar");
        let marginLeftValue = Math.ceil(
          Number(window.getComputedStyle(menuNav).marginLeft.split("px")[0])
        );
        let marginRightValue = Math.ceil(
          Number(window.getComputedStyle(menuNav).marginRight.split("px")[0])
        );
        let check = menuNav.scrollWidth - mainContainer1.offsetWidth;
        let mainContainer1Width = mainContainer1.offsetWidth;

        if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
          if (!(document.querySelector("html").getAttribute("dir") === "rtl")) {
            if (Math.abs(check) > Math.abs(marginLeftValue)) {
              menuNav.style.marginRight = 0;
              if (
                !(
                  Math.abs(check) >
                  Math.abs(marginLeftValue) + mainContainer1Width
                )
              ) {
                mainContainer1Width =
                  Math.abs(check) - Math.abs(marginLeftValue);
                slideRight.classList.add("d-none");
              }
              menuNav.style.marginLeft =
                Number(menuNav.style.marginLeft.split("px")[0]) -
                Math.abs(mainContainer1Width) +
                "px";
              slideLeft.classList.remove("d-none");
            }
          } else {
            if (Math.abs(check) > Math.abs(marginRightValue)) {
              menuNav.style.marginLeft = 0;
              if (
                !(
                  Math.abs(check) >
                  Math.abs(marginRightValue) + mainContainer1Width
                )
              ) {
                mainContainer1Width =
                  Math.abs(check) - Math.abs(marginRightValue);
                slideRight.classList.add("d-none");
              }
              menuNav.style.marginRight =
                Number(menuNav.style.marginRight.split("px")[0]) -
                Math.abs(mainContainer1Width) +
                "px";
              slideLeft.classList.remove("d-none");
            }
          }
        }

        let element = document.querySelector(".main-menu > .slide.open");
        let element1 = document.querySelector(".main-menu > .slide.open >ul");
        if (element) {
          element.classList.remove("open");
        }
        if (element1) {
          element1.style.display = "none";
        }

        slideClick();
        return;
      });
    }
    function checkHoriMenu() {
      let menuNav = document.querySelector(".main-menu");
      let mainContainer1 = document.querySelector(".main-sidebar");
      let slideLeft = document.querySelector(".slide-left");
      let slideRight = document.querySelector(".slide-right");
      let marginLeftValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginLeft.split("px")[0])
      );
      let marginRightValue = Math.ceil(
        Number(window.getComputedStyle(menuNav).marginRight.split("px")[0])
      );
      let check = menuNav.scrollWidth - mainContainer1.offsetWidth;
      // Show/Hide the arrows
      if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
        slideRight.classList.remove("d-none");
        slideLeft.classList.add("d-none");
      } else {
        slideRight.classList.add("d-none");
        slideLeft.classList.add("d-none");
        menuNav.style.marginLeft = "0px";
        menuNav.style.marginRight = "0px";
      }
      if (!(document.querySelector("html").getAttribute("dir") === "rtl")) {
        // LTR check the width and adjust the menu in screen
        if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
          if (Math.abs(check) < Math.abs(marginLeftValue)) {
            menuNav.style.marginLeft = -check + "px";
            slideLeft.classList.remove("d-none");
            slideRight.classList.add("d-none");
          }
        }
        if (marginLeftValue == 0) {
          slideLeft.classList.add("d-none");
        } else {
          slideLeft.classList.remove("d-none");
        }
      } else {
        // RTL check the width and adjust the menu in screen
        if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
          if (Math.abs(check) < Math.abs(marginRightValue)) {
            menuNav.style.marginRight = -check + "px";
            slideLeft.classList.remove("d-none");
            slideRight.classList.add("d-none");
          }
        }
        if (marginRightValue == 0) {
          slideLeft.classList.add("d-none");
        } else {
          slideLeft.classList.remove("d-none");
        }
      }
      if (marginLeftValue != 0 || marginRightValue != 0) {
        slideLeft.classList.remove("d-none");
      }
    }

    //

    ["switcher-icon-click", "switcher-icon-hover", "switcher-horizontal"].map(
      (element) => {
        if (document.getElementById(element)) {
          document.getElementById(element).addEventListener("click", () => {
            let menuNav = document.querySelector(".main-menu");
            let mainContainer1 = document.querySelector(".main-sidebar");
            setTimeout(() => {
              if (menuNav.offsetWidth > mainContainer1.offsetWidth) {
                document
                  .getElementById("slide-right")
                  .classList.remove("d-none");
              } else {
                document.getElementById("slide-right").classList.add("d-none");
              }
            }, 100);
          });
        }
      }
    );

    // double-menu click toggle start
    function doublemenu() {
      if (window.innerWidth >= 992) {
        let html = document.querySelector("html");
        let sidemenulink = document.querySelectorAll(
          ".main-menu > li > .side-menu__item"
        );
        sidemenulink.forEach((ele) => {
          ele.addEventListener("click", doubleClickFn);
        });
      }
    }
    function doubleClickFn() {
      var $this = this;
      let html = document.querySelector("html");
      var checkElement = $this.nextElementSibling;
      if (checkElement) {
        if (!checkElement.classList.contains("double-menu-active")) {
          if (document.querySelector(".slide-menu")) {
            let slidemenu = document.querySelectorAll(".slide-menu");
            slidemenu.forEach((e) => {
              if (e.classList.contains("double-menu-active")) {
                e.classList.remove("double-menu-active");
                html.setAttribute("data-toggled", "double-menu-close");
              }
            });
          }
          checkElement.classList.add("double-menu-active");
          html.setAttribute("data-toggled", "double-menu-open");
        }
      }
    }
    // double-menu click toggle end

    window.addEventListener("unload", () => {
      let mainContent = document.querySelector(".main-content");
      mainContent.removeEventListener("click", clearNavDropdown);
      window.removeEventListener("resize", ResizeMenu);
      let sidemenulink = document.querySelectorAll(
        ".main-menu li > .side-menu__item"
      );
      sidemenulink.forEach((ele) =>
        ele.removeEventListener("click", doubleClickFn)
      );
    });

    // for menu scroll to top active page
    let customScrollTop = () => {
      document.querySelectorAll(".side-menu__item").forEach((ele) => {
        if (ele.classList.contains("active")) {
          let elemRect = ele.getBoundingClientRect();
          if (
            ele.children[0] &&
            ele.parentElement.classList.contains("has-sub") &&
            elemRect.top > 435
          ) {
            ele.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    };
    setTimeout(() => {
      customScrollTop();
    }, 300);
    // for menu scroll to top active page

    // for menu click active close
    document.querySelector(".main-content").addEventListener("click", () => {
      document.querySelectorAll(".slide-menu").forEach((ele) => {
        if (
          document.querySelector("html").getAttribute("data-toggled") ==
            "menu-click-closed" ||
          document.querySelector("html").getAttribute("data-toggled") ==
            "icon-click-closed"
        ) {
          ele.style.display = "none";
        }
      });
    });
    // for menu click active close
  },

 
};
</script>

<style lang="css" scoped>
#responsive-overlay {
  visibility: hidden;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 101;
  background-color: rgba(15, 23, 42, 0.5);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 0.1s;
}

.main-menu .side-menu__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  
}
.main-menu .has-sub > .side-menu__item {
  cursor: pointer;
}
.main-menu .slide-menu {
  display: none;
  /* padding-left: 20px; */
}
.main-menu .slide-menu.child1 {
  display: block;
}
.main-menu .side-menu__angle.rotate {
  transform: rotate(90deg);
}

</style>
