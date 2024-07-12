<template>
  <div class="bloc-modale">
    <div class="overlay"></div>
    <div class="container-fluid">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="loader6">
              <span class="loader-inner">
                <img
                  src="@/assets/img/logo_mobile.png"
                  alt=""
                  class="w-75 h-75"
                />
              </span>
            </div>
          </div>
        </div>
        <br /><br />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DNPMECLPreloader",
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="css" scoped>
.bloc-modale {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  padding: 10px;
  overflow: hidden;
}
.overlay {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.container-fluid {
  padding: 2em 0em 4em 0em;
}
.container {
  padding: 2em 0em 5em 0em;
}

/********************  Preloader Demo-6 *******************/
.loader6,
.loader6:after,
.loader6:before {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}
.loader6 .loader-inner,
.loader6:after,
.loader6:before {
  top: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
}
.loader6 {
  margin: 0 auto;
  position: relative;
  animation: loading-6 0.8s infinite;
}
/* .loader6:after,
.loader6:before {
  content: "";
  margin-left: 50%;
  border: 10px solid transparent;
  border-left: 10px solid #4dd70a;
}
.loader6:after {
  border: 10px solid transparent;
  border-right: 10px solid #4dd70a;
  position: absolute;
} */
.loader6 .loader-inner {
  display: flex;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 4px solid #e6ff00;
  margin: 0 auto 0 50%;
  flex-direction: column;
    justify-content: center;
    align-items: center;
}
/* .loader6 .loader-inner:after,
.loader6 .loader-inner:before {
  content: "";
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 10px solid transparent;
  border-left: 10px solid #e3b505;
  margin-left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}
.loader6 .loader-inner:after {
  border: 10px solid transparent;
  border-right: 10px solid #e3b505;
} */
@-webkit-keyframes loading-6 {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loading-6 {
  0% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
