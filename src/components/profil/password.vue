<template >
    <div>
      <Loading v-if="loading" style="z-index: 99999;"></Loading>
      <div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="account-pages w-100">
                    <div class="container pt-3">
                        <div class="row">
                            <div class="col">
                                <div class="card overflow-hidden border" style="box-shadow: none; border: 1px solid #c9d1d9;">
                                  
                                    <div class="card-body pt-0">
                                      
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
    </div>
</div>


    </div>
        
       
    
    
    </template>
    <script>
    
    import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput';
   
    import axios from '@/lib/axiosConfig.js'
    import Loading from '@/components/others/loading.vue';
    import useVuelidate from '@vuelidate/core';
    import { require, lgmin, lgmax , ValidEmail } from '@/functions/rules';
    import {successmsg} from "@/lib/modal.js"
    import Swal from 'sweetalert2'
    
    export default {
       components: {
 
       Loading ,

       MazPhoneNumberInput,
     },
     data() {
       return {
          loading:false,       
          resultError: {},
          v$: useVuelidate(),
          error:'',
         step1:{
            old_password:'',
            password:'',
            password_confirmation:'',
              },          
       }
     },
     validations: {
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
     computed:{
       loggedInUser() {
         return this.$store.getters['auth/myAuthenticatedUser'];
       },
      
     },
    async mounted() {
       console.log("uusers",this.loggedInUser);
     
     },
     methods: {
       successmsg:successmsg,
       validatePasswordsMatch() {
     return this.step1.password === this.step1.password_confirmation;
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
    }
    </script>
    <style lang="" scoped>
       
    </style>