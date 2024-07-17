<template>
  <div>
    <Loading v-if="loading" style="z-index: 999999"></Loading>

    <div class="container-general card">
      <div class="container">
        <div class="row class1">
          <div class="col-md-8 d-flex align-items-center class2">
            <div class="account-pages w-100">
              <div
                class="card overflow-hidden border"
                style="box-shadow: none; border: 1px solid #c9d1d9"
              >
               
                <div class="card-body pt-0">
                  <div>
                    <div>
                      <div class="row">
                        <div class="col-11 col-lg-11 mx-auto">
                          <small>{{ error }}</small>
                          <form data-request="onSignin" class="login_form">
                            <div class="row mb-3 mt-3 content-group">
                              <div class="col">
                                <div class="input-group">
                                  <label
                                    class="font-weight-600 text-color-orange"
                                    for="emailAddress"
                                    >Nom</label
                                  >
                                  <MazInput
                                    v-model="nom"
                                    
                                    color="info"
                                    type="text" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.nom.$error">{{
                                    v$.nom.$errors[0].$message
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
                                    v-model="prenom"
                                    
                                    color="info"
                                    type="text" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.prenom.$error">{{
                                    v$.prenom.$errors[0].$message
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
                                    v-model="username"
                                    
                                    color="info"
                                    type="text" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.username.$error">{{
                                    v$.username.$errors[0].$message
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
                                    v-model="email"
                                    
                                    color="info"
                                    type="email" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.email.$error">{{
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
                                    >Region</label
                                  >
                                  <MazSelect
                                    v-model="region"
                                    :options="regionOptions"
                                    color="info"
                                    type="region" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.region.$error">{{
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
                                    v-model="phoneNumber"
                                    show-code-on-list
                                    
                                    color="info"
                                    defaultCountryCode="GN"
                                    :ignored-countries="['AC']"
                                    @update="results = $event"
                                    :success="results?.isValid"
                                    noFlags="false" size="sm" rounded-size="sm"
                                  />
                                  <small v-if="v$.phoneNumber.$error">{{
                                    v$.phoneNumber.$errors[0].$message
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
            </div>
          </div>

          <div class="col-md-4 py-5">
            <div class="profile-pic text-center">
              <label class="-label" for="file">
                <span class="glyphicon glyphicon-camera"></span>
                <i class="ri-edit-line"></i> <span>Modifier</span>
              </label>
              <input id="file" type="file" @change="loadFile" />
              <img
                v-if="image === null"
                src="@/assets/img/client.png"
                id="output"
                width="200"
                accept="image/*"
              />
              <img v-else :src="image" id="output" width="200" />
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
      password: "",
      email: "",
      phoneNumber: "",
      nom: "",
      prenom: "",
      username: "",
      v$: useVuelidate(),
      errorPassword: "",
      error: "",
      id: "",
      image: "",
      direction: "",
      region: "",
    };
  },
  validations: {
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
          this.nom = selectedActualites.Nom;
          this.prenom = selectedActualites.Prenoms;
          this.username= selectedActualites.username;
          this.email = selectedActualites.email;
          this.phoneNumber = selectedActualites.Whatsapp;
          this.region = selectedActualites.region;
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
        email: this.email,
        Nom: this.nom,
        Prenoms: this.prenom,
        username: this.username,
        Whatsapp: this.phoneNumber,
        
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
          profile: updatedUser.profile,
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
      this.v$.$touch();
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
          this.fetchUserDetail(); // Assurez-vous que cette fonction est correctement définie
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
  height: 280px;
  width: 280px;
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
  left: 25px;
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
  top: 204px;
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
