<template>
  <div class="bloc-modale">
    <div class="overlay"></div>
    <div class="container-fluid">
     <div class="d-flex justify-content-center">
      <div class="loader">
            <div class = "box"> 
            <div class = "logo">
            <img src="@/assets/img/logo_mobile.png" alt="">
            </div>
            </div>
            <!-- <div class = "box"></div>
            <div class = "box"></div>
            <div class = "box"></div>
            <div class = "box"></div> -->
          </div>
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
.loader {
  height: 300px;
  aspect-ratio: 1;

  position: relative;
}
.loader .box {
  position: absolute;
  /* background: rgba(100, 100, 100, 0.15);
  background: linear-gradient(0deg, rgba(50, 50, 50, 0.2) 0%, rgba(100, 100, 100, 0.2) 100%); */
  border-radius: 50%;
  border-top: 1px solid #646464;
  /* box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px 0px; */
  backdrop-filter: blur(10px);
  animation: ripple 2s infinite ease-in-out;
}
.loader .box:nth-child(1) {
  inset: 40%;
  z-index: 99;
}
.loader .box:nth-child(2) {
  inset: 30%;
  z-index: 98;
  border-color: rgba(100, 100, 100, 0.8);
  animation-delay: 0.2s;
}
.loader .box:nth-child(3) {
  inset: 20%;
  z-index: 97;
  border-color: rgba(100, 100, 100, 0.6);
  animation-delay: 0.4s;
}
.loader .box:nth-child(4) {
  inset: 10%;
  z-index: 96;
  border-color: rgba(100, 100, 100, 0.4);
  animation-delay: 0.6s;
}
.loader .box:nth-child(5) {
  inset: 0%;
  z-index: 95;
  border-color: rgba(100, 100, 100, 0.2);
  animation-delay: 0.8s;
}
.loader .logo {
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  padding: 20%;
}
.loader .logo img {
  fill: grey;
  width: 100%;
  animation: color-change 2s infinite ease-in-out;
}

@keyframes ripple {
  0% {
    transform: scale(1);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px 0px;
  }
  50% {
    transform: scale(1.3);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 30px 20px 0px;
  }
  100% {
    transform: scale(1);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 10px 10px 0px;
  }
}
@keyframes color-change {
  0% {
    fill: grey;
  }
  50% {
    fill: white;
  }
  100% {
    fill: grey;
  }
}
</style>
