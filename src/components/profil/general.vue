<template>
  <div>
    <Loading v-if="loading" style="z-index: 999999"></Loading>

    <div class=" card">
      <div class="row p-3">
        <div class="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
          <div class="card overflow-hidden border" style="box-shadow: none; border: 1px solid #c9d1d9">
              <div class="account-pages w-100">
               
                  <div class="card-header">
                 <div class="card-title">
                <h5 class="mb-0 fw-semibold fs-14">
                  Information general
                </h5>
              </div>
            </div>
            <div class="card-body pt-0">
              <div class="d-flex flex-column align-items-center">
                <div class="profile-pic text-center">
              <label class="-label" for="file">
                <span class="glyphicon glyphicon-camera"></span>
                <i class="ri-edit-line"></i> <span>Modifier</span>
              </label>
              <input id="file" type="file" @change="loadFile" />
              <img
                v-if="!image || !image.startsWith('https')"
                src="@/assets/img/client.png"
                id="output"
                width="200"
                accept="image/*"
              />
              <img v-else :src="image" id="output" width="200" />
               </div>
               <div>
                <small>{{ error }}</small>
                          <form data-request="onSignin" class="login_form">
                            <div class="row mb-3 content-group">
                              <div class="col">
                                <div class="input-group">
                                  <label
                                    class="font-weight-600 text-color-orange"
                                    for="emailAddress"
                                    >Nom</label
                                  >
                                  <MazInput
                                    v-model="step2.nom"
                                    
                                    color="info"
                                    type="text" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.nom.$error">{{
                                    v$.step2.nom.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>

                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
                                  <label
                                    class="font-weight-600 text-color-orange"
                                    for="emailAddress"
                                    >Prenom</label
                                  >
                                  <MazInput
                                    v-model="step2.prenom"
                                    
                                    color="info"
                                    type="text" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.prenom.$error">{{
                                    v$.step2.prenom.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>
                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
                                  <label
                                    class="font-weight-600 text-color-orange"
                                    for="emailAddress"
                                    >Pseudo</label
                                  >
                                  <MazInput
                                    v-model="step2.username"
                                    
                                    color="info"
                                    type="text" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.username.$error">{{
                                    v$.step2.username.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>

                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
                                  <label
                                    class="font-weight-600 text-color-orange"
                                    for="emailAddress"
                                    >Adresse Email</label
                                  >
                                  <MazInput
                                    v-model="step2.email"
                                    
                                    color="info"
                                    type="email" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.email.$error">{{
                                    v$.step2.email.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>
                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
                                  <label
                                    class="font-weight-600 text-color-orange"
                                    for="emailAddress"
                                    >Region</label
                                  >
                                  <MazSelect
                                    v-model="step2.region"
                                    :options="regionOptions"
                                    color="info"
                                     size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.region.$error">{{
                                    v$.email.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>

                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
                                  <label
                                    class="font-weight-600 text-color-orange"
                                    for="emailAddress"
                                    >Numéro Téléphonique</label
                                  >
                                  <MazPhoneNumberInput
                                    v-model="step2.phoneNumber"
                                    show-code-on-list
                                    
                                    color="info"
                                    defaultCountryCode="GN"
                                    :ignored-countries="['AC']"
                                    @update="results = $event"
                                    :success="results?.isValid"
                                    noFlags="false" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.step2.phoneNumber.$error">{{
                                    v$.step2.phoneNumber.$errors[0].$message
                                  }}</small>
                                </div>
                              </div>
                            </div>

                            <div class="row mb-0">
                              <div class="col-12 text-end">
                                <div class="button">
                                  <button
                                    class="btn btn-primary"
                                    @click.prevent="HamdlePassword"
                                  >
                                  Valider
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
               </div>


              </div>

            </div>
             
            </div>

          </div>
        
        </div>


        <div class="col-xxl-6 col-xl-6 col-md-6 col-sm-12">
          <div class="account-pages w-100">
              <div class="card overflow-hidden border" style="box-shadow: none; border: 1px solid #c9d1d9">
                <div class="card-header">
              <div class="card-title">
                <h5 class="mb-0 fw-semibold fs-14">
                  Mot de passe
                </h5>
              </div>
            </div>
               
                <div class="card-body pt-0">
                      <div class="row">
                          <div class="p-2">
                                            <form class="form-horizontal">
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="mb-3 position-relative">
                                                            <label for="old_password">Ancien mot de passe</label>
                                                            <MazInput v-model="step1.old_password"  type="password" name="old_password" color="info" placeholder="Abc123@!"  size="sm" rounded-size="sm" />
                                                            <small v-if="v$.step1.old_password.$error">{{v$.step1.old_password.$errors[0].$message}}</small>
                                                            <small v-if="resultError['old_password']">{{resultError['old_password']}}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="mb-3 position-relative">
                                                            <label for="password">Nouveau mot de passe</label>
                                                            <MazInput v-model="step1.password"  type="password" name="password" color="info" placeholder="Abc123@!"  size="sm" rounded-size="sm" />
                                                            <small v-if="v$.step1.password.$error">{{v$.step1.password.$errors[0].$message}}</small>
                                                            <small v-if="resultError['password']">{{resultError['password']}}</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div class="col-md-12">
                                                        <div class="mb-3 position-relative">
                                                            <label for="password_confirmation">Confirmer le mot de passe</label>
                                                            <MazInput v-model="step1.password_confirmation"  type="password" name="password_confirmation" color="info" placeholder="Abc123@!"   size="sm" rounded-size="sm"/>
                                                            <small v-if="v$.step1.password_confirmation.$error">{{v$.step1.password_confirmation.$errors[0].$message}}</small>
                                                            <small v-if="resultError['password_confirmation']">{{resultError['password_confirmation']}}</small>
                                                            <small v-if="!validatePasswordsMatch()">Les mots de passe ne correspondent pas.</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row mb-0">
                                                    <div class="col-12 text-end">
                                                        <div class="button">
                                                            <button class="btn btn-primary" @click.prevent="HamdleAddUser()">Valider</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                          </div>   
                      </div>
                   
                </div>
              </div>
            </div>
        </div>
      </div>
       
    </div>
  </div>
</template>
<script>
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import MazDialog from "maz-ui/components/MazDialog";
import useVuelidate from "@vuelidate/core";
import { require, lgmin, lgmax } from "@/functions/rules";
import axios from "@/lib/axiosConfig.js";
import Loading from "@/components/others/loading.vue";
import { successmsg } from "@/lib/modal.js";
import { mapActions } from "vuex";
 import Swal from 'sweetalert2'

export default {
  name: "CositLSignUser",
  components: {
    MazPhoneNumberInput,
    MazDialog,
    Loading,
  },
  data() {
    return {
      isOpen: false,
      loading: true,
      isOpenPassword: false,
      regionOptions:[],
    
      v$: useVuelidate(),
      errorPassword: "",
      error: "",
      id: "",
      image: "",
      direction: "",
      password: "",
    
      step1:{
            old_password:'',
            password:'',
            password_confirmation:'',
              }, 
              step2:{
                email: "",
                phoneNumber: "",
                nom: "",
                prenom: "",
                username: "",
                region: "",
              },
              resultError: {},
    };
  },
  validations: {
    step2:{
      email: {
      require,
    },
    phoneNumber: {
      require,
    },
    nom: {
      require,
      lgmin: lgmin(2),
    },
    prenom: {
      require,
      lgmin: lgmin(2),
    },
    username: {
      require,
      lgmin: lgmin(2),
    },
    region: {
      require,
      
    },
    },
   
   
    step1:{
        old_password: {
            require,
            lgmin: lgmin(8),
            lgmax: lgmax(100),
         
       },
       password: {
            require,
            lgmin: lgmin(8),
            lgmax: lgmax(100),
       },
       password_confirmation: {
            require,
            lgmin: lgmin(8),
            lgmax: lgmax(100),
       },
      
       },
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
      
    },
  },
  async mounted() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    await this.fetchUserDetail();
    await this.fetchRegionOptions()
    console.log("dataespace", this.loggedInUser);
  },
  methods: {
    ...mapActions("auth", ["setMyAuthenticatedUser"]),
    successmsg: successmsg,
    validatePasswordsMatch() {
     return this.step1.password === this.step1.password_confirmation;
    },
    async fetchUserDetail() {
      try {
        const response = await axios.get("/auth-user", {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log("Réponse du téléversement :", response);
        if (response.data.status === "success") {
          const selectedActualites = response.data.data;

          console.log(selectedActualites);
          this.step2.nom = selectedActualites.Nom;
          this.step2.prenom = selectedActualites.Prenoms;
          this.step2.username= selectedActualites.username;
          this.step2.email = selectedActualites.email;
          this.step2.phoneNumber = selectedActualites.Whatsapp;
          this.step2.region = selectedActualites.region;
          this.id = selectedActualites.id;
          this.image = selectedActualites.photo,
            
          this.loading = false;
        }
      } catch (error) {
        console.error("Erreur lors du téléversement :", error);
        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },
    async fetchRegionOptions() {
      // Renommez la méthode pour refléter qu'elle récupère les options de pays
      try {
        await this.$store.dispatch("fetchRegionOptions");
        const options = JSON.parse(
          JSON.stringify(this.$store.getters["getRegionOptions2"])
         
        ); // Accéder aux options des pays via le getter
        console.log(options);
        this.regionOptions = options.map(region => ({
        label: region.NomRegion,
        value: region.CodeRegion,
      }));;
        // Affecter les options à votre propriété sortedCountryOptions
        this.loading = false
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des options des pays :",
          error.message
        );
      }
    },

    async HamdleSign() {
      window.scrollTo({ top: 0, behavior: "smooth" });
      this.loading = true;
      this.isOpenPassword = false;
      let DataUser = {
        user: this.id,
        email: this.step2.email,
        Nom: this.step2.nom,
        Prenoms: this.step2.prenom,
        username: this.step2.username,
        Whatsapp: this.step2.phoneNumber,
        region: this.step2.region,
        
      };
      console.log("data", DataUser);
      try {
        const response = await axios.put("/auth-user-update", DataUser, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
          },
        });
        console.log(response);
        if (response && response.data && response.data.status === "success") {
          const updatedUser = response.data.data;
          let role_id;
      if (Array.isArray(this.loggedInUser.role_id)) {
        role_id = this.loggedInUser.role_id.length > 0 ? this.loggedInUser.role_id[0].id : null;
      } else {
        role_id = this.loggedInUser.role_id;
      }

      this.$store.dispatch('auth/setMyAuthenticatedUser', {
        user: {
          id: updatedUser.id,
          Nom: updatedUser.Nom,
          Prenoms: updatedUser.Prenoms,
          email: updatedUser.email,
          Whatsapp: updatedUser.Whatsapp,
          photo: updatedUser.photo,
          username:updatedUser.username,
        },
        roles: role_id,
        expires_in: this.loggedInUser.tokenExpiration - Math.floor(Date.now() / 1000),
        access_token: this.loggedInUser.token,
        });

          this.fetchUserDetail()

          this.loading = false;
          this.successmsg(
            "Modification du compte",
            "Votre compte a été mis à jour avec succès !"
          );
        } else {
          this.loading = false;
          console.log(response);
        }
      } catch (error) {
        console.error("errorzzzz", error);
        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },

    HamdlePassword() {
      this.v$.step2.$touch();
      this.error = "";
      if (this.v$.$errors.length == 0) {
        this.HamdleSign();
      } else {
        console.log("pas bon", this.v$.$errors);
      }
    },

    async loadFile(event) {
      this.loading = true;
      var image = document.getElementById("output");
      image.src = URL.createObjectURL(event.target.files[0]);
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append("profile", file);

      try {
        const response = await axios.post("/auth-user-profile", formData, {
          headers: {
            Authorization: `Bearer ${this.loggedInUser.token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response", response);

        if (response.data.status === "success") {
          const updatedUser = response.data.data;
          let role_id;
      if (Array.isArray(this.loggedInUser.role_id)) {
        role_id = this.loggedInUser.role_id.length > 0 ? this.loggedInUser.role_id[0].id : null;
      } else {
        role_id = this.loggedInUser.role_id;
      }

      this.$store.dispatch('auth/setMyAuthenticatedUser', {
        user: {
          id: updatedUser.id,
          Nom: updatedUser.Nom,
          Prenoms: updatedUser.Prenoms,
          email: updatedUser.email,
          Whatsapp: updatedUser.Whatsapp,
          photo: updatedUser.photo,
          username:updatedUser.username,
        },
        roles: role_id,
        expires_in: this.loggedInUser.tokenExpiration - Math.floor(Date.now() / 1000),
        access_token: this.loggedInUser.token,
        });
          this.fetchUserDetail(); 
          this.loading = false;
          this.successmsg(
            "Modification du compte",
            "Votre compte a été mis à jour avec succès !"
          );

        } else {
          console.log("errorrr", response.data);
          this.errorImage = "L'enregistrement a échoué !!!";
        }
      } catch (error) {
        console.error(
          "Erreur lors de la mise à jour des données MPME guinee :",
          error
        );
        if (
          error.response.data.message === "Vous n'êtes pas autorisé." ||
          error.response.status === 401
        ) {
          await this.$store.dispatch("auth/clearMyAuthenticatedUser");
          this.$router.push("/"); //a revoir
        }
      }
    },
    async HamdleAddUser(){
         this.error = '',
         this.resultError= '',
        this.v$.step1.$touch()
        if (this.v$.$errors.length == 0 ) {
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
           this.confirmDelete();
         }
           }else{
           
           console.log('pas bon', this.v$.$errors);
           
           } 
             },
             async confirmDelete() {
                  this.loading = true
             let DataUser = {
                old_password:this.step1.old_password,
                password:this.step1.password,
                password_confirmation:this.step1.password_confirmation
             }
             console.log("eeeee",DataUser);
             try {
            
             const response = await axios.post('/auth-change-password' , DataUser, {
                 headers: { Authorization: `Bearer ${this.loggedInUser.token}`, },
               });
             console.log('response.login', response.data); 
             if (response.data.status === "success") { 
               
               this.loading = false
               this.successmsg("Modification du mot de passe", "Votre mot de passe a été modifié avec succès !");
              this.$router.push({ path: '/bspp/profil' })

             } else {
    
             }
    
    
    
       } catch (error) {
       console.log('response.login', error); 
    
       this.loading = false
       if (error.response.data.message==="Vous n'êtes pas autorisé." || error.response.status === 401) {
                await this.$store.dispatch('auth/clearMyAuthenticatedUser');
              this.$router.push("/");  //a revoir
            }
       if (error.response.data.status === "error") {
       return this.error = error.response.data.message
       
    
       } else {
         this.formatValidationErrors(error.response.data.errors);
       }
       } 
             },
           
           async formatValidationErrors(errors) {
         const formattedErrors = {};
    
         for (const field in errors) {
           const errorMessages = errors[field]; // Liste complète des messages d'erreur
           console.log(" errorMessages", errorMessages, typeof errorMessages);
    
           const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
           console.log(" concatenatedError", concatenatedError, typeof concatenatedError);
    
           formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
         }
    
         this.resultError = formattedErrors; // Stockez les erreurs dans un objet
    
         // Maintenant, this.resultError est un objet où les clés sont les noms des champs
         console.log("resultError", this.resultError);
       },
  },
};
</script>
<style lang="css" scoped>
.container-general {
  /* border: 1px solid red; */
  display: flex;
  padding: 30px 0;
}


.hero-content {
  background-repeat: no-repeat;
  /* background-size: cover; */
}

#container {
  box-shadow: var(--shadow-medium);
  border: 1px solid #d9d9d9;
}

#main-wrapper.oxyy-login-register {
  background: #fff;
}

.oxyy-login-register .hero-wrap {
  position: relative;
  overflow: hidden;
}

.oxyy-login-register .hero-wrap .hero-mask {
  z-index: 1;
}

.oxyy-login-register .hero-wrap .hero-mask,
.oxyy-login-register .hero-wrap .hero-bg,
.oxyy-login-register .hero-wrap .hero-bg-slideshow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}
.oxyy-login-register .bg-secondary {
  background-color: #fff !important;
}
.oxyy-login-register .opacity-4 {
  opacity: 0.4;
}

.oxyy-login-register .hero-wrap .hero-bg.hero-bg-scroll {
  background-attachment: scroll;
}

.oxyy-login-register .hero-wrap .hero-bg {
  z-index: 0;
  background-attachment: fixed;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  transition: background-image 300ms ease-in 200ms;
}
.oxyy-login-register .hero-wrap .hero-mask,
.oxyy-login-register .hero-wrap .hero-bg,
.oxyy-login-register .hero-wrap .hero-bg-slideshow {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.oxyy-login-register .hero-wrap .hero-content {
  position: relative;
  z-index: 2;
}

.oxyy-login-register .font-weight-700 {
  font-weight: 700 !important;
}

.oxyy-login-register .text-5 {
  font-size: 21px !important;
  font-size: 1.3125rem !important;
}

.oxyy-login-register .font-weight-600 {
  font-weight: 600 !important;
}

.oxyy-login-register .text-9 {
  font-size: 36px !important;
  font-size: 2.25rem !important;
}
.text-color-orange {
  color: var(--color-primary);
}

.oxyy-login-register .text-primary,
.oxyy-login-register .btn-link {
  color: #007bff !important;
}

form {
  padding: 0;
  margin: 0;
  display: inline;
}

.form-group {
  margin-bottom: 1rem;
}

.oxyy-login-register .font-weight-600 {
  font-weight: 600 !important;
}

.text-color-orange {
  color: var(--color-primary);
}

.oxyy-login-register .form-control:not(.form-control-sm) {
  padding: 0.81rem 0.96rem;
  height: inherit;
}

.oxyy-login-register .form-control,
.oxyy-login-register .custom-select {
  border-color: #dae1e3;
  font-size: 16px;
  color: var(--color-defaut);
}

.oxyy-login-register .btn:not(.btn-link) {
  -webkit-box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.15);
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
.oxyy-login-register .btn {
  padding: 0.8rem 2.6rem;
  font-weight: 500;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.form-container {
  width: 510px;
  border-radius: 0.75rem;

  z-index: 100;
}
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  /* font-size: 1.5rem; */
  /* line-height: 2rem; */
  /* font-weight: 700; */
}

.title img {
  width: 90px;
  height: ç0px;
}

.sign {
  display: block;
  width: 100%;
  background-color: var(--color-secondary);
  padding: 0.75rem;
  text-align: center;
  color: black;
  border: none;
  border-radius: 0.375rem;
  font-weight: 600;
  margin-top: 50px;
}

.btn-modale {
  position: absolute;
  top: 10px;
  right: 10px;
}

.sign:hover {
  border: 1px solid var(--color-secondary);
  color: var(--color-secondary);
  background-color: white;
}

.profile-pic {
  color: transparent;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 0.3s ease;
  height: 210px;
  width: 210px;
}

.profile-pic input {
  display: none;
}

.profile-pic img {
  position: absolute;
  object-fit: cover;
  width: 80%;
  height: 80%;
  box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
  z-index: 0;
  border:1px solid #435971;
  border-radius: 50%;
  padding:2px;
}

.profile-pic .-label {
  left: 12px;
  cursor: pointer;
  height: 23px;
  width: 88px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  z-index: 10000;
  color: var(--primary-color);
  transition: background-color 0.2s ease-in-out;
  margin-bottom: 0;
  position: absolute;
  top: 160px;
  border-radius: 3px;
  border: 1px solid var(--primary-color);
}

.profile-pic .-label:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.profile-pic span {
  display: inline-flex;
  padding: 0.2em;
}
@media (max-width: 1210px) {
  .container-general {
    flex-direction: column;
    align-items: center;
  }
  .class1{
    flex-direction: column;
    align-items: center;

  }
  .class2{
    
    width: 100%;

  }

  .cole {
    width: 100%;
  }
}

</style>
