<template >
    <div>
    <Loading v-if="loading" style="z-index: 99999;"></Loading>
        <div class="row authentication mx-0" style="height: 100vh">

            <div class="col-xxl-5 col-xl-5 col-lg-5 d-xl-block d-none px-0">
    <div class="authentication-cover">
      
        <div class="aunthentication-cover-content rounded">
         
                      <div class="">
                      <img src="@/assets/img/logo.png" alt="" class="bg-white" style="height:80px; width:auto">
                      </div>
                      <p class="text-center" style="color:yellow" >Bureau de Suivi des Priorités Présidentielles</p>
                 
          
            <div class="swiper mySwiper keyboard-control">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <div class="text-fixed-white text-center p-5 d-flex align-items-center justify-content-center">
                            <div>
                                <div class="mb-5">
                                    <img src="@/assets/img/bg1.jpg" class="authentication-image" alt="">
                                </div>
                                
                              
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="text-fixed-white text-center p-5 d-flex align-items-center justify-content-center">
                            <div>
                                <div class="mb-5">
                                    <img src="@/assets/img/bg4.jpg" class="authentication-image" alt="">

                                </div>
                               
                            </div>
                        </div>
                    </div>
                    <div class="swiper-slide">
                        <div class="text-fixed-white text-center p-5 d-flex align-items-center justify-content-center">
                            <div>
                                <div class="mb-5">
                                    <img src="@/assets/img/bg5.jpg" class="authentication-image" alt="">
                                </div>
               
                            </div>
                        </div>
                    </div>
                </div>
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
            </div>
        </div>
    </div>
           </div> 

            <div class="col-xxl-7 col-xl-7 col-lg-12  d-flex flex-column justify-content-center">
            
                <div class="login-reg-panel">
                    
                                        
                   
                                        
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
            
                                <p class="signin" style="text-align: end; "  data-bs-title="Add Password" data-bs-toggle="modal" data-bs-target="#change-password" > <span >Mot de passe oublié ?</span> </p>
                                <div class="boutton">
                                <button class="" @click="Hamdlelogin()">Connecter</button>
                                </div>
                            
                        
                        </div>
                        
                    </div>
                    </div>
            </div>
        </div> 

        <div class="modal fade effect-rotate-bottom" id="change-password" tabindex="-1" aria-hidden="true"
      data-bs-backdrop="static" ref="change-password">
      <div class="modal-dialog modal-dialog-centered ">
        <div class="modal-content" v-if="isEmail">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">Entrez votre Adresse Email</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center" style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
              <div class="row mt-3">
                <small v-if="error">{{ error }} <br>  L'adresse email saisi n'existe pas dans le système ou bien vous avez mal saisi</small>

                <div class="col-xl-12">
                 
                <MazInput  v-model="step3.email" type="email"  label="Adresse Email" color="info" name="email"   size="md" rounded-size="sm" />
                <small v-if="v$.step3.email.$error">{{v$.step3.email.$errors[0].$message}}</small> 
                            
                 
                </div>
              
              </div>
             
  
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="PasswordOtp('change-password')">
                    Valider
                  </button>
                </div>
              </div>
  
  
            </div>
  
            <br />
            <div class="modal-footer">
              <div class="btn-group ms-auto">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" @click="close">
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-content" v-if="isCode">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">  Verification de  Code</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center" style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
                    <small v-if="error">{{ error }}</small>

                 <div class="text-subtitle-2 font-weight-bold mb-3">
                  Veuillez entrer le code que nous avons envoyé à votre
                  adresse e-mail pour réinitialiser votre mot de passe.
                </div>
              <div class="row mt-3">
                <div class="col-xl-12">
                 
                <MazInput  v-model="step4.code" type="number"  label="entrez le code " color="info" name="code"   size="md" rounded-size="sm" />
                <small v-if="v$.step4.code.$error">{{v$.step4.code.$errors[0].$message}}</small>  
                </div>
              
              </div>
             
  
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="HamdleOtpPassword('change-password')">
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

        <div class="modal-content" v-if="isValider">
          <div class="modal-header float-start text-center justify-content-center"
            style="background-color: var(--primary-rgb); padding-bottom: 10px">
            <h2 class="modal-title text-white text-center" id="mail-ComposeLabel" style="font-size: 22px !important">
              <b class="text-center">  Réinitialisation</b>
            </h2>
          </div>
          <div class="modal-body px-4">
            <div class="row gy-2 justify-content-center" style="
                  border-width: 1px;
                  border-style: solid;
                  border-radius: 6px;
                  border-color: rgb(0, 77, 134);
                ">
                    <small v-if="error">{{ error }}</small>

                 <div class="text-subtitle-2 font-weight-bold mb-3">
                  Connectez-vous à votre espace administrative
                </div>
              <div class="row mt-3">
                <div class="col-xl-12 mb-3">
                 
                <MazInput  v-model="step5.password" type="password"  label="Nouveau mot de passe  " color="info" name="password"   size="md" rounded-size="sm" />
                <small v-if="v$.step5.password.$error">{{v$.step5.password.$errors[0].$message}}</small>  
                </div>
                <div class="col-xl-12">
                 
                 <MazInput  v-model="step5.password_confirmation" type="password"  label="Confirmez le mot de passe  " color="info" name="password"   size="md" rounded-size="sm" />
                 <small v-if="v$.step5.password_confirmation.$error">{{v$.step5.password_confirmation.$errors[0].$message}}</small>
                 <small v-if="!validatePasswordsMatch()">Les mots de passe ne correspondent pas.</small>

                 </div>
              
              </div>
             
  
              <div class="row mb-3">
                <div class="boutton">
                  <button class="" @click.prevent="ValiderPassword('change-password')">
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
import Swal from "sweetalert2";


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
            isEmail:true,
            isCode:false,
            isValider:false,
            error:"",
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
        step5:{
             password:'',
             password_confirmation:'',
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

        step5:{
           password:{
           require,
          lgmin: lgmin(8),
      
            },
            password_confirmation:{
              require,
              lgmin: lgmin(8),
            }
            
        },

    
  },
  methods: {
      ...mapActions('auth', ['setMyAuthenticatedUser']),
      close(){
        this.isEmail = true,
        this.isCode = false,
        this.isValider = false
      },
      validatePasswordsMatch() {
     return this.step5.password === this.step5.password_confirmation;
    },
  async Hamdlelogin(){

this.error = '',
this.v$.step1.$touch()
if (this.v$.$errors.length == 0 ) {
   this.loading = true
  
let DataUser = {
email:this.step1.email,
password:this.step1.password,
}
try {
const response = await axios.post('/system/login' , DataUser);
if (response.data.status === "success") {
this.InfoUser = response.data.data
// this.setMyAuthenticatedUser(this.InfoUser);
this.fetchUserDetail(this.InfoUser)


} else {

}



} catch (error) {
console.log("errorLogin", error);

this.loading = false
if (error.response.data.status === "error") {
return this.error = error.response.data.message

} else {
return this.error = "L'authentification a échoué"
}
}
  }else{
  

  
  } 
},
async fetchUserDetail(data) {

  
      try {
        const response = await axios.get("/auth-user", {

          headers: {
             Authorization: `Bearer ${data.access_token}`,
          },
        });
        if (response.data.status === "success") {
          const selectedActualites = response.data.data.roles[0].menus;
          const selectedPermissions = response.data.data.roles[0].permissions
          data.menus = selectedActualites;
          data.permissions = selectedPermissions;
          data.user_role = response.data.data.roles[0].id
          this.setMyAuthenticatedUser(data);
          this.$router.push('/bspp');

   
          this.loading = false;
        }
      } catch (error) {
        this.loading = false;
       
        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },



  async PasswordOtp(){
           this.error = ''
           this.v$.step3.$touch()
          if (this.v$.$errors.length == 0 ) {
          this.loading = true
          
          let CodeUserEmail ={
            email:1,
            value:this.step3.email
          
          }

          try {
         const response = await axios.post('/send-otp', CodeUserEmail);
      
         if (response.data.status === 'success') {
          this.isEmail = false
          this.isCode = true
         this.loading = false
         } else {
         this.loading = false

          this.error = response.data.message
         }
    
        } catch (error) {
          this.loading = false;
         
        
        }
          }else{
          
     
            this.loading = false;
          
          
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
     
      try {
      const response = await axios.post('/verification-otp' , DataUser);
   
      if(response.data.status === 'success'){
      
            this.isCode = false
            this.isValider = true
            this.loading = false
      }else{
      
       this.error = "Echec de vérification du code."
       this. step4.code = ''
      this.v$.step4.$reset();

       this.loading = false
      }
    
        
              
     
    } catch (error) {
   

      this.loading = false
      if (error.response.data.status === 'error') {
       return this.errorOtp = "L'authentification a échoué"
        
      } else {
        
      }
    }
            }else{
            
      
            
            }

    },
    async  ValiderPassword(modalId){
        this.error = '',
         this.v$.step5.$touch()
          if (this.v$.$errors.length == 0 ) {
             this.loading = true
            
            let DataUser = {
            email: true,
            value: this. step3.email,
            code: this. step4.code,
            password:this.step5.password,
            password_confirmation:this.step5.password_confirmation
        }

     
     
      try {
      const response = await axios.post('/password/reset' , DataUser);

      if(response.data.status === 'success'){
        this.closeModal(modalId);
        Swal.fire({
title: "Changement de mot passe réussi",
text: "Votre mot de passe a été modifié avec succès. vous pouvez maintenant vous  connecter en toute sécurité. Merçi pour votre vigilance en matière de sécurité !",
icon: "success",
showCancelButton: false,
confirmButtonColor: "#3085d6",
cancelButtonColor: "#d33",
confirmButtonText: "OK"
}).then((result) => {
if (result.isConfirmed) {
  this.$router.push('/');
 
}
});
this.loading = false

      }else{
      
     
       this.loading = false
      }
    
        
              
     
    } catch (error) {
   

      this.loading = false
      if (error.response.data.status === 'error') {
       return this.errorOtp = "L'authentification a échoué"
        
      } else {
        
      }
    }
            }else{
            
      
            
            }

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
  
  .login{
  
     
      width: 100%;
      height: 100vh;
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
      left: 25%;
      
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
    
</style>