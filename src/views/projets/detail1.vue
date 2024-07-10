<template >
    <div>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
       
        <div style="position:relative">
            <div id="carouselExampleDark" class="carousel carousel-dark slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0"
            class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
    </div>
    <div class=" authentication mx-0">



<div class="  d-flex flex-column justify-content-center">

    <div class="login-reg-panel">
        
                            
        <div class="register-info-box">
            <div class="image">
            <img src="@/assets/img/logo.png" alt="" class="w-100">
            </div>
            <p class="text-danger" >Bureau de Suivi des Priorités Présidentiels</p>
        </div>
                            
        <div class="white-panel">
            <div class="login-show" style="margin-top:30px">
                <small>{{ error  }}</small>
                        <h2 style="font-size:20px !important;">Bienvenue chez BSPP ! </h2>
                         <p>Connectez-vous pour continuer sur la plateforme BSPP .</p>
                
                <div class="mb-6">
                    <MazInput  v-model="step1.email" type="email"  label="Adresse Email" color="info" name="email"   size="md" rounded-size="sm" />
                    <small v-if="v$.step1.email.$error">{{v$.step1.email.$errors[0].$message}}</small> 
                </div>
                
                    <div class="mb-6">
                    <MazInput  v-model="step1.password" type="password"  label="Mot de passe" color="info" name="password"   size="md" rounded-size="sm" />
                        <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small>
                    </div>

                    <p class="signin" style="text-align: end; " @click="ChangePassword"> <span >Mot de passe oublié ?</span> </p>
                    <div class="boutton">
                    <button class="" @click="Hamdlelogin()">Connecter</button>
                    </div>
                
            
            </div>
            
        </div>
        </div>
</div>
</div> 
    <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="5000">
            <img src="@/assets/img/bg1.jpg" class="d-block w-100 imageCarousel" 
                alt="...">
            
        </div>
        <div class="carousel-item" data-bs-interval="5000">
            <img src="@/assets/images/media/media-64.jpg" class="d-block w-100 imageCarousel" 
                alt="...">
          
        </div>
        <div class="carousel-item" data-bs-interval="5000">
            <img src="@/assets/images/media/media-62.jpg" class="d-block w-100 imageCarousel" 
                alt="...">
            
        </div>
    </div>
    <button class="carousel-control-prev" type="button"
        data-bs-target="#carouselExampleDark" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button"
        data-bs-target="#carouselExampleDark" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>
        </div>

       
    </div>
</template>
<script>
 import useVuelidate from '@vuelidate/core';
  import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
  import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.css';
import axios from '@/lib/axiosConfig.js'
import Loading from '@/components/others/loading.vue';
import { mapActions } from 'vuex';
 

  export default {
    components: {
        Loading,
  
      },
  
      data() {
          return {
            loading:false,
              show1: false,
              visible:false,
              dialogOtp:false,
              dialogPassword:false, 
              dialogOtpPassword:false,
              InfoUser:'',
              errorOtp:'',
              step1:{
               email: '',
               password: '',
             },
  
               step2:{
               code:'',
          },
  
          step3:{
              email:'',
          },
          step4:{
               code:'',
          },
         
          v$: useVuelidate(),
          error:''
          }
      },
      validations: {
      step1:{
          email: {
        require,
        ValidEmail
      },
      password: {
        require,
        lgmin: lgmin(8),
        lgmax: lgmax(20),
      }
      },
      step2:{
              code:{
          require,
        lgmin: lgmin(4),
        lgmax: lgmax(4),
              }
              
          },
          step3:{
          email: {
        require,
        ValidEmail
      },
    },
      step4:{
              code:{
          require,
        lgmin: lgmin(4),
        lgmax: lgmax(4),
              }
              
          },
  
      
    },
    methods: {
        ...mapActions('auth', ['setMyAuthenticatedUser']),
    async Hamdlelogin(){

this.error = '',
 this.v$.step1.$touch()
  if (this.v$.$errors.length == 0 ) {
     this.loading = true
    
let DataUser = {
email:this.step1.email,
password:this.step1.password,
}
console.log("eeeee",DataUser);
try {
const response = await axios.post('/login' , DataUser);
console.log('response.login', response.data); 
if (response.data.status === "success") {
this.InfoUser = response.data.data
this.setMyAuthenticatedUser(this.InfoUser);
this.loading = false

      this.$router.push('/bspp'); 

} else {

}



} catch (error) {
console.log('response.login', error); 

this.loading = false
if (error.response.data.status === "error") {
return this.error = error.response.data.message

} else {
return this.error = "L'authentification a échoué"
}
}
    }else{
    
    console.log('pas bon', this.v$.$errors);
    
    } 
},

async ChangePassword(){
            this.dialogPassword = true
            this.error = ''
            
    
    }, 
  
    async PasswordOtp(){
  
             this.v$.step3.$touch()
            if (this.v$.$errors.length == 0 ) {
               this.loading = true
            
            let CodeUserEmail ={
              email:1,
              value:this.step3.email
            
            }
            console.log("eee",CodeUserEmail);
            try {
           const response = await axios.post('/mcipme/send-otp', CodeUserEmail);
           
           console.log('response.Code', response); 
           if (response.data.status === 'success') {
            this.dialogPassword = false
           this.dialogOtpPassword = true
           this.loading = false
           } else {
            
           }
      
      } catch (error) {
          console.log('error',error);
      }
            }else{
            
          console.log('error',this.v$.$errors);
            
            
            }
    },
  
    onOtpInputPassworod() {
        // Vérifiez si l'OTP est complètement saisi (longueur de 4 chiffres)
        this.errorOtp  = ''
        if (this.step4.code.length === 4) {
          // Déclenchez votre action ici, par exemple, appelez une méthode pour envoyer à l'API
          this.HamdleOtpPassword();
        }
      },
      async  HamdleOtpPassword(){
          this.error = '',
           this.v$.step4.$touch()
            if (this.v$.$errors.length == 0 ) {
               this.loading = true
              
              let DataUser = {
              email: true,
              value: this. step3.email,
              code: this. step4.code
          }
        console.log("eeeee",DataUser);
     
       
        try {
        const response = await axios.post('/mcipme/verification-otp' , DataUser);
        console.log('response.login', response.data); 
        if(response.data.status === 'success'){
          localStorage.setItem('resetPasswordInfo', JSON.stringify({
                    email: this.step3.email,
                    code: this.step4.code// Assurez-vous de récupérer le code correctement
                  }));
               this.$router.push('/reinitialiser');
                this.loading = false
                this.dialogOtpPassword = false
        }else{
        
         this.errorOtp = "Echec de vérification du code."
         this. step4.code = ''
         this.loading = false
        }
      
          
                
       
      } catch (error) {
        console.log('response.login', error); 
  
        this.loading = false
        if (error.response.data.status === 'error') {
         return this.errorOtp = "L'authentification a échoué"
          
        } else {
          
        }
      }
              }else{
              
              console.log('pas bon', this.v$.$errors);
              
              }
  
      },
    },
  async  mounted() {
        
  const swiper = new Swiper(".keyboard-control", {
        slidesPerView: 1,
        spaceBetween: 30,
        keyboard: {
            enabled: true,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false
        }
    });
    },
    
}
</script>
<style lang="css" scoped>

  
  @import url('https://fonts.googleapis.com/css?family=Mukta');
  
  .authentication{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 60%;
    z-index:111
  }
  .login{
  
     
      width: 100%;
     
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #f8f9fa;
  }
  
  
  .login-reg-panel{
      position: relative;
      /* top: 50%; */
      /* transform: translateY(-50%); */
      text-align:center;
      width:100%;
      /* right:0;left:0; */
      /* margin:auto; */
      height:400px;
      /* background-color: rgba(236, 48, 20, 0.9); */
      border: 1px solid #d9d9d9;
      display: flex;
    flex-direction: row;
    justify-content: flex-end;
     
  }
  .white-panel{
      background-color: rgba(255,255, 255, 1);
      height:450px;
      position:absolute;
      top:-23px;
      width:54%;
      right:calc(50% - 50px);
      transition:.3s ease-in-out;
      z-index:0;
      box-shadow: 0px 2px 6px 0px rgba(0, 0, 0, 0.1);
      
  }
  .login-reg-panel input[type="radio"]{
      position:relative;
      display:none;
  }
  .login-reg-panel{
      color:#B8B8B8;
  }
  .login-reg-panel #label-login, 
  .login-reg-panel #label-register{
      border:1px solid #9E9E9E;
      padding:5px 5px;
      width:150px;
      display:block;
      text-align:center;
      border-radius:10px;
      cursor:pointer;
      font-weight: 600;
      font-size: 18px;
  }
  .login-info-box{
      width:30%;
      padding:0 50px;
      top:20%;
      left:0;
      position:absolute;
      text-align:left;
  }
  .register-info-box{
    width: 43%;
   
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .register-info-box .image{
    width: 90%;
    padding: 10px;
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: center;
    box-shadow: 0 1px 3px #0000001a, 0 1px 2px #0000000f;

  }
  .right-log{right:50px !important;}
  
  .login-show, 
  .register-show{
      z-index: 1;
      display:block;
      opacity:1;
      transition:0.3s ease-in-out;
      color:#242424;
      text-align:left;
      padding:30px 50px;
      text-align: center;
  }
  .show-log-panel{
      display:block;
      opacity:0.9;
  }
  
  
  .boutton a{
      display:inline-block;
      padding:10px 0;
  }
  
  
  
  .signin {
  color: rgba(88, 87, 87, 0.822);
  font-size: 14px;
  text-align: center;
  margin-top: 20px;
  }
  
  
  
  .signin span {
  color: royalblue;
  }
  
  .signin span:hover {
  text-decoration: underline royalblue;
  cursor: pointer;
  }
  
  @media (max-width: 1100px) {
  
      .login-reg-panel{
  
          display: flex;
        
      height: auto;
      flex-direction: column;
      align-items: center;
      justify-content: space-evenly;
      padding: 20px 10px;
      } 
  
      .white-panel{
          position: static;
          width: 100%;
      max-width: 380px;
      }
  
      .register-info-box{
          position: static;
          margin-bottom: 20px;
          width: 50%;
          display: flex;
    justify-content: center;
      }
  }
  
  @media (max-width: 675px) {
      .login-reg-panel{
     
      width:100%;
  
     
  }
  
  .register-info-box{
        
          width: 50%;
      }
  }
  @media (max-width: 530px) {
  
  .register-info-box{
        
          width: 60%;
      }
  }
  @media (max-width: 460px) {
  
  .register-info-box{
        
          width: 70%;
      }
  }

  .m-input{   
    width: 100%;
  
}

.imageCarousel{
    height:100vh !important;  
    filter: brightness(75%) !important;
}
    
</style>