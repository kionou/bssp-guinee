<template >
  <div>
    <RouterView />
  </div>
</template>

<script>

  import  "@/assets/libs/bootstrap/css/bootstrap.min.css"
  import "@/assets/css/styles.min.css" 
  import "@/assets/css/icons.css" 
  import "@/assets/libs/node-waves/waves.min.css"  
  import "@/assets/libs/simplebar/simplebar.min.css" 
  import "@/assets/libs/flatpickr/flatpickr.min.css"
  import "@/assets/libs/@simonwep/pickr/themes/nano.min.css"
  import "@/assets/libs/choices.js/public/assets/styles/choices.min.css"
  import "@/assets/css/icons.min.css"
  import "@/assets/libs/glightbox/css/glightbox.min.css"
  import "@/assets/libs/choices.js/public/assets/styles/choices.min.css"
  import "@/assets/libs/prismjs/themes/prism-coy.min.css"
  import "@/assets/libs/choices.js/public/assets/styles/choices.min.css"
 
  import "@/assets/libs/choices.js/public/assets/scripts/choices.min.js"
  import "@/assets/js/main.js"
  import "@/assets/libs/@popperjs/core/umd/popper.min.js"
  import "@/assets/libs/bootstrap/js/bootstrap.bundle.min.js"
  import "@/assets/libs/apexcharts/apexcharts.min.js"
  import "@/assets/libs/glightbox/js/glightbox.min.js"
  import "@/assets/libs/prismjs/prism.js"
  import "@/assets/js/prism-custom.js"
  // import "@/assets/js/select2.js"
  // import"@/assets/js/choices.js"

 

   


       

   

  export default {
  name:'App',
  watch: {
    created() {
    
    },
    $route(to,) {
      const name = to.name.toLowerCase()
      const title = name 
        // ? `${name} (${to.href.split('/')[2].toLowerCase()})`
        // : name
      document.title = `Bspp-Guinee - ${title}`

      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  },
  mounted() {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  },
  
}
</script>
<style lang="css" scoped>
  
</style>