<template>
    <div>
        <Loading v-if="loading" style="z-index: 99999"></Loading>
      <!-- Page Header -->
      <div
        class="d-md-flex d-block align-items-center justify-content-between my-4 page-header-breadcrumb"
      >
        <h1 class="page-title fw-semibold fs-18 mb-0">Projets</h1>
        <div class="ms-md-1 ms-0">
          <nav>
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">
                <a href="javascript:void(0);">BSSP</a>
              </li>
              <li class="breadcrumb-item active" aria-current="page">
                Projets
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <!-- Page Header Close -->
         <div >
   <div class="error text-center" v-if="this.error">{{ error }} <br /></div>
   <div  class="container-fluid" >
    
     <form class="form"  style="position:relative">
       
         <div class="form-container">
           <!-- debut infos genral -->
           <div class="content">
             <p class="titre">Information General</p>
             <div class="row mb-3 mt-3 content-group">

<div class="col">
<div class="input-groupe">
 <label for="userpassword">Code <span class="text-danger">*</span></label>
 <MazInput  v-model="step1.first_name" type="text"  color="info" name="nom"   size="sm" rounded-size="sm" />
</div>
<small v-if="v$.step1.first_name.$error">{{ v$.step1.first_name.$errors[0].$message}}</small>
<small v-if="resultError['first_name']"> {{ resultError["first_name"] }} </small>
</div>
<div class="col">
<div class="input-groupe">
 <label for="userpassword">Sigle <span class="text-danger">*</span></label>
 <MazInput  v-model="step1.last_name" type="text"  color="info" name="prenom"   size="sm" rounded-size="sm" />

</div>
<small v-if="v$.step1.last_name.$error">{{ v$.step1.last_name.$errors[0].$message}}</small>
<small v-if="resultError['last_name']"> {{ resultError["last_name"] }} </small>
</div>
<div class="col">
<div class="input-groupe">
 <label for="userpassword">Nom <span class="text-danger">*</span></label>
 <MazInput  v-model="step1.first_name" type="text"  color="info" name="nom"   size="sm" rounded-size="sm" />
</div>
<small v-if="v$.step1.first_name.$error">{{ v$.step1.first_name.$errors[0].$message}}</small>
<small v-if="resultError['first_name']"> {{ resultError["first_name"] }} </small>
</div>

               </div>
             <div class="row mb-3 mt-3 content-group">
               <div class="col">
               <div class="input-groupe">
                 <label for="userpassword"> Zone <span class="text-danger">*</span></label>
               <MazSelect  v-model="step1.email"   color="info" name="email"   size="sm" rounded-size="sm" />
               </div>
               <small v-if="v$.step1.email.$error">{{ v$.step1.email.$errors[0].$message}}</small>
               <small v-if="resultError['email']"> {{ resultError["email"] }} </small>
              </div>
               <div class="col">
               <div class="input-groupe">
                 <label for="userpassword">Budget <span class="text-danger">*</span></label>
               <MazInput  v-model="step1.address" type="text"  color="info" name="address"   size="sm" rounded-size="sm" />
               </div>
               <small v-if="v$.step1.address.$error">{{ v$.step1.address.$errors[0].$message}}</small>
               <small v-if="resultError['address']"> {{ resultError["address"] }} </small>
              </div>
              <div class="col">
               <div class="input-groupe">

                 <label for="userpassword">Mode de financement <span class="text-danger">*</span></label>
                <MazInput  v-model="step1.age" type="number" min="0" color="info" name="age"   size="sm" rounded-size="sm" />
               </div>
               <small v-if="v$.step1.age.$error">{{ v$.step1.age.$errors[0].$message}}</small>
               <small v-if="resultError['age']"> {{ resultError["age"] }} </small>
              </div>

             

              </div>
              <div class="row mb-3 mt-3 content-group">
            
            
                 <div class="col">
                 <div class="input-groupe">
                 <label for="userpassword">Visible <span class="text-danger">*</span></label>
                 <MazSelect  v-model="step1.number_street_city_state_zip" type="text"  color="info"  name="number_street_city_state_zip" size="sm" rounded-size="sm" />
                 </div>
                 <small v-if="v$.step1.number_street_city_state_zip.$error">{{ v$.step1.number_street_city_state_zip.$errors[0].$message}}</small>
                 <small v-if="resultError['number_street_city_state_zip']"> {{ resultError["number_street_city_state_zip"] }} </small>
                 </div>

                 <div class="col">
                 <div class="input-groupe">
                 <label for="userpassword">Date debut <span class="text-danger">*</span></label>
                 <MazInput  v-model="step1.number_street_city_state_zip" type="text"  color="info"  name="number_street_city_state_zip" size="sm" rounded-size="sm" />
                 </div>
                 <small v-if="v$.step1.number_street_city_state_zip.$error">{{ v$.step1.number_street_city_state_zip.$errors[0].$message}}</small>
                 <small v-if="resultError['number_street_city_state_zip']"> {{ resultError["number_street_city_state_zip"] }} </small>
                 </div>

                 <div class="col">
                 <div class="input-groupe">
                 <label for="userpassword">Date fin <span class="text-danger">*</span></label>
                 <MazInput  v-model="step1.number_street_city_state_zip" type="text"  color="info"  name="number_street_city_state_zip" size="sm" rounded-size="sm" />
                 </div>
                 <small v-if="v$.step1.number_street_city_state_zip.$error">{{ v$.step1.number_street_city_state_zip.$errors[0].$message}}</small>
                 <small v-if="resultError['number_street_city_state_zip']"> {{ resultError["number_street_city_state_zip"] }} </small>
                 </div>
             </div>

             <div class="row mb-3 mt-3 content-group">
            
            
            <div class="col">
            <div class="input-groupe">
            <label for="userpassword">Description <span class="text-danger">*</span></label>
            <MazTextarea  v-model="step1.number_street_city_state_zip" type="text"  color="info"  name="number_street_city_state_zip" size="sm" rounded-size="sm" />
            </div>
            <small v-if="v$.step1.number_street_city_state_zip.$error">{{ v$.step1.number_street_city_state_zip.$errors[0].$message}}</small>
            <small v-if="resultError['number_street_city_state_zip']"> {{ resultError["number_street_city_state_zip"] }} </small>
            </div>

        

          
        </div>

              <p class="titre">Les Bailleurs</p>

              <div class="row mb-3 mt-3 content-group">
         <div  class="row mb-3 mt-3 content-group" v-for="(day, index) in step1.DaysHours" :key="day.id">
           <div class="col">
         <div class="input-groupe">
         <label for="userpassword">Nom bailleur <span class="text-danger">*</span></label>
         <MazSelect 
          label="Select" 
          v-model="day.day_id"
           name="day_id"  
           listPosition="left" 
           color="info"
            :options="DaysOptions" 
             size="sm" 
             rounded-size="sm" 
              v-slot="{ option }"
            search > 
            <div class="flex items-center" style="  width: 100%;  gap: 1rem; " @click="clearError(index, 'day_id')">
                     {{ option.label }}
                   </div>
                 </MazSelect>  
         </div>
         <small v-if="errors.step1.DaysHours && errors.step1.DaysHours[index] && errors.step1.DaysHours[index].day_id">{{ errors.step1.DaysHours[index].day_id }}</small>
         <small v-if="resultError['DaysHours']"> {{ resultError["DaysHours"] }} </small>
         </div>

         <div class="col   d-flex align-items-center">
         <div class="input-groupe w-100 me-2">
            <div >
             <label for="userpassword">Budget <span class="text-danger">*</span></label>
         <MazInput  v-model="day.available_hour" type="text"  color="info" @input="clearError(index, 'available_hour')"  name="day.available_hour" size="sm" rounded-size="sm" />
         </div>
         <small v-if="errors.step1.DaysHours && errors.step1.DaysHours[index] && errors.step1.DaysHours[index].available_hour">{{ errors.step1.DaysHours[index].available_hour }}</small>
         <small v-if="resultError['DaysHours']"> {{ resultError["DaysHours"] }} </small>
            </div>
            <div class="btn-list mt-8">
             <div class="bouttons" style="position:relative;">
       <div class="boutton"   style=" padding:6px 10px !important ; background:red;margin-top:0 !important" @click="deleteRowDays(index)" ><i class="ri-delete-bin-line"></i></div>
       </div>
           <!-- <a aria-label="anchor"  @click="deleteRowDays(index)" href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a> -->
       </div>
         </div>
         </div>          
             </div>

             <p class="titre">Objectifs</p>

<div class="row mb-3 mt-3 content-group">
<div  class="row mb-3 mt-3 content-group" v-for="(day, index) in step1.DaysHours" :key="day.id">
<div class="col">
<div class="input-groupe">
<label for="userpassword">Intitule <span class="text-danger">*</span></label>
<MazInput
label="Select" 
v-model="day.day_id"
name="day_id"  
listPosition="left" 
color="info"
:options="DaysOptions" 
size="sm" 
rounded-size="sm" 
v-slot="{ option }"
search > 
<div class="flex items-center" style="  width: 100%;  gap: 1rem; " @click="clearError(index, 'day_id')">
       {{ option.label }}
     </div>
   </MazInput>  
</div>
<small v-if="errors.step1.DaysHours && errors.step1.DaysHours[index] && errors.step1.DaysHours[index].day_id">{{ errors.step1.DaysHours[index].day_id }}</small>
<small v-if="resultError['DaysHours']"> {{ resultError["DaysHours"] }} </small>
</div>

<div class="col   d-flex align-items-center">
<div class="input-groupe w-100 me-2">
<div >
<label for="userpassword">Visible <span class="text-danger">*</span></label>
<MazSelect  v-model="day.available_hour" type="text"  color="info" @input="clearError(index, 'available_hour')"  name="day.available_hour" size="sm" rounded-size="sm" />
</div>
<small v-if="errors.step1.DaysHours && errors.step1.DaysHours[index] && errors.step1.DaysHours[index].available_hour">{{ errors.step1.DaysHours[index].available_hour }}</small>
<small v-if="resultError['DaysHours']"> {{ resultError["DaysHours"] }} </small>
</div>
<div class="btn-list mt-8">
<div class="bouttons" style="position:relative;">
<div class="boutton"   style=" padding:6px 10px !important ; background:red;margin-top:0 !important" @click="deleteRowDays(index)" ><i class="ri-delete-bin-line"></i></div>
</div>
<!-- <a aria-label="anchor"  @click="deleteRowDays(index)" href="javascript:void(0);" class="btn btn-icon btn-sm btn-danger-light"><i class="ri-delete-bin-line"></i></a> -->
</div>
</div>
</div>          
</div>
           </div>
           <!-- fin infos genral -->
           <div class="btnForm py-3 d-flex items-center justify-content-end">
           <button class="btnLogin" :disabled="isButtonDisabled" @click.prevent="nextStep">
             Valider
           </button>
         </div>
         </div>
        
      
  
     </form>
         </div>

        </div>
</div>

 </template>
 <script>
 

 import useVuelidate from "@vuelidate/core";
 import { require, lgmin, lgmax, ValidNumeri } from "@/functions/rules";
 import { useToast } from "vue-toastification";
 import Loading from '@/components/others/loading.vue';
 import axios from '@/lib/axiosConfig.js'
 import MazPhoneNumberInput from 'maz-ui/components/MazPhoneNumberInput'
 import Swal from 'sweetalert2'

 
 export default {
   name: "Componentlogin",
   setup() {
  const toast = useToast();
  return { toast }
},
   components: { Loading , MazPhoneNumberInput},
   computed: {
     
   },
   data() {
     return {
       
       loading: false,
       userData:'',
      
   
       error: "",
       resultError: {},
       DaysOptions:[],
       HonorairesOptions:[],
       LevelIdOptions:[],
       DrivingOptions:[],
       TransportOptions:[],
       FileInsurance:"",
       errors: {
       step1: { DaysHours: [] },
     },
   
     results: null,
       choix: [
         { label: "Oui", value: true },
         { label: "Non", value: false },
       ],

      
       
       v$: useVuelidate(),
       step1: {
           first_name: "",
           last_name: "",
           phone: "",

           email:"",
           address: "",
           age: "",
           social_security: "",

           number_street_city_state_zip:"",

           position_applied_agency:"",
           weekly_available_hours:"",
           can_work_night:"",

           number_pref:"",
           how_long:"",

           DaysHours:[{
             day_id:'',
           available_hour:'',

           }],

           
     },
    
      
     };
   },
   validations: {
     step1: {
           first_name: {require},
           last_name: {require},
           phone: {require},

           email:{require},
           address: {require},
           age: {require},
           social_security: {require },

           number_street_city_state_zip:{require},


           position_applied_agency:{require},
           weekly_available_hours:{require},
           can_work_night:{require},

           number_pref:{ValidNumeri},
           how_long:{require},

           DaysHours: {
         $each: {
           day_id: { require},
           available_hour: { require },
         }
       },
           date_available_to_start:{require}, 

          date_available_to_start:{require}, 
           full_part_both:{require},    
     },
    

    
   },
   methods: {
   
  

   clearError(index, field) {
       
     if (this.errors.step1.DaysHours[index]) {
       this.errors.step1.DaysHours[index][field] = null;
     }
   },
  
     
     redirect(){

       window.location.href = 'https://www.leprimecare.com'
     },
     swaaa(){
       Swal.fire({
 title: "Recruitment information has been successfully submitted",
 text: "A return will be made to you after processing, thank you",
 icon: "success",
 showCancelButton: false,
 confirmButtonColor: "#3085d6",
 cancelButtonColor: "#d33",
 confirmButtonText: "OK"
}).then((result) => {
 if (result.isConfirmed) {
   this.redirect()
   
 }
});
     },

AddformDataDays() {
   this.step1.DaysHours.push({ day_id:'', available_hour:'',});
 },

 deleteRowDays(index) {
  
   if(index !== 0){
     this.step1.DaysHours.splice(index, 1);
   }
},



collectStepData(step) {
   let stepData = {};
 

// Collecter les données des étapes précédentes
for (let i = 1; i < step; i++) {
   const previousStepData = this.collectStepData(i);
   Object.assign(stepData, previousStepData);
}
   
   switch (step) {
       case 1:
           stepData = {
             
             ...stepData,

             first_name: this.step1.first_name,
             last_name: this.step1.last_name,
             phone: this.step1.phone,
             address: this.step1.address,
             email:this.step1.email,
             age: this.step1.age,
             social_security: this.step1.social_security,
             number_street_city_state_zip: this.step1.number_street_city_state_zip,
             position_applied_agency: this.step1.position_applied_agency,
             weekly_available_hours: this.step1.weekly_available_hours,
             can_work_night: this.step1.can_work_night,
             number_pref: this.step1.number_pref,
             how_long: this.step1.how_long,

             DaysHours: this.step1.DaysHours,

             date_available_to_start: this.step1.date_available_to_start,
             full_part_both: this.step1.full_part_both,
           };
           break;
       case 2:
           stepData = {
             ...stepData,
             type_school: this.step2.type_school,
             school_name: this.step2.school_name,
             school_location: this.step2.school_location,
             school_email_address: this.step2.school_email_address,
             number_of_year_school: this.step2.number_of_year_school,
             school_level_id: parseInt(this.step2.school_level_id),
             means_transportation: this.step2.means_transportation,
             driver_licence: this.step2.driver_licence,
             driver_licence_number: this.step2.driver_licence_number,
             driver_licence_issue_state: this.step2.driver_licence_issue_state,
             driver_licence_expiration_date: this.step2.driver_licence_expiration_date,
             current_insurance: this.step2.current_insurance,
             insurance_policy: this.step2.insurance_policy,
             insurance_copy_submitted: this.step2.insurance_copy_submitted,
             FileInsurance: this.FileInsurance,

           };
           break;

           case 3:
           stepData = {
             ...stepData,
             any_accident_during_past_year:this.step3.any_accident_during_past_year ,
             accident_count: parseInt(this.step3.accident_count)  ,
             moving_violation_past_three_year: this.step3.moving_violation_past_three_year,
             moving_violation_count:parseInt(this.step3.moving_violation_count) ,
             convicted_crime: this.step3.convicted_crime,
             crime_description: this.step3.crime_description,

           };
           break;
           case 4:
           stepData = {
             ...stepData,
               experiences:this.step4.experiences
           };
           break;
           case 5:
           stepData = {
             ...stepData,
             references:this.step5.references
        
       
           };
           break;
           case 6:
           stepData = {
             ...stepData,
             type_skill:this.step6.type_skill,
             computer_skill:this.step6.computer_skill,
             other_skills:this.step6.other_skills,
        
       
           };
           break;
       // Ajoutez des cas pour chaque étape du formulaire
       default:
           break;
   }
   
   return stepData;
},
   
 
     async nextStep() {   
       try {
         let isValid = false;

       if (this.currentStep === 1) {
       isValid = this.validateStep1();
     } else if (this.currentStep === 4) {
       isValid = this.validateStep4();
     } else if (this.currentStep === 5) {
       isValid = this.validateStep5();
     } else {
       isValid = true; 
     }
  


 
       this.v$[`step${this.currentStep}`].$touch();
       if (this.v$.$errors.length === 0 && isValid) {
         if( this.currentStep === 6){
              this.loading = true
               const stepData = this.collectStepData(this.currentStep);
                 console.log(stepData);
                 localStorage.setItem('tempLeprimecare', JSON.stringify(stepData));
                 const response = await this.registeremployeeData(stepData) 
                 console.log('responseenregistrement',response)
                 if(response.status === "success"){
                 this.loading = false
                   this.swaaa()
                   localStorage.removeItem('tempLeprimecare')

                 }else{
                 this.loading = false

                 }
         }else{
           const stepData = this.collectStepData(this.currentStep);
                
                 localStorage.setItem('tempLeprimecare', JSON.stringify(stepData))
               this.currentStep++;
             window.scrollTo({ top: 0, behavior: "smooth" });
         
          
         }
       } else {
           // Afficher un message d'erreur à l'utilisateur
           console.log("Le formulaire contient des erreurs");
            console.log("errroor222", this.v$.$errors);
           window.scrollTo({ top: 0, behavior: "smooth" });
                  this.loading = false;
       }

      
   } catch (error) {
       // Gérer les erreurs
       console.log("errroor222", this.v$.$errors);

       console.error("Une erreur s'est produite :", error);
       console.log("errroor222", this.v$.$errors);
       

       window.scrollTo({ top: 0, behavior: "smooth" });
        this.loading = false;
   }
     },
     async nextStep1() {
   try {
       // Valider les données de l'étape actuelle
       this.v$[`step${this.currentStep}`].$touch();
       if (this.v$.$errors.length === 0) {
         
           console.log('stepData', this.currentStep);
           this.loading = true;
           if( this.currentStep === 5){
             
              const stepData = this.collectStepData(this.currentStep);
               console.log(stepData);
                 const response = await this.updateMpmeDonnees(stepData) 
                 console.log('eee',response);
                 if (response === true) {
                   this.loading = false;
                   this.confirmDelete()
               
                 } else {
                     console.error("Erreur lors de l'envoi des données :", response);
                     window.scrollTo({ top: 0, behavior: "smooth" });
                     this.loading = false;
                 }

           }else if(this.currentStep === 4 || this.currentStep === 5){
                 
                 const stepData = this.collectStepData(this.currentStep);
                 console.log(stepData);
                 localStorage.setItem('tempLeprimecare', JSON.stringify(stepData))
                 const response = await this.updateMpmeDonnees(stepData) 
                 console.log('eee',response);
                 if (response === true) {
                     this.currentStep++;
                     window.scrollTo({ top: 0, behavior: "smooth" });
                  this.loading = false;
                 } else {
                     console.error("Erreur lors de l'envoi des données :", response);
                     window.scrollTo({ top: 0, behavior: "smooth" });
                     this.loading = false;
                 }
           }else{
             const stepData = this.collectStepData(this.currentStep);
                 console.log(stepData);
                 localStorage.setItem('tempLeprimecare', JSON.stringify(stepData));
                 const response = await this.registeremployeeData(stepData) 
                 console.log('eee',response);
                 if (response === true) {
                     this.currentStep++;
                     window.scrollTo({ top: 0, behavior: "smooth" });
                     this.loading = false;
                 } else {
                     console.error("Erreur lors de l'envoi des données :", response);
                     window.scrollTo({ top: 0, behavior: "smooth" });
                     this.loading = false;
                 }

           }

           


       } else {
           // Afficher un message d'erreur à l'utilisateur
           console.log("Le formulaire contient des erreurs");
           window.scrollTo({ top: 0, behavior: "smooth" });
                  this.loading = false;
       }
   } catch (error) {
       // Gérer les erreurs
       console.error("Une erreur s'est produite :", error);
       window.scrollTo({ top: 0, behavior: "smooth" });
        this.loading = false;
   }
},
async registeremployeeData(employeeData) {
   try {
       const response = await axios.post('/employees', employeeData);

       console.log("response", response);
       if (response.data.status === 'success') {
         
           return response.data;
       } else {
           console.error("Erreur lors de la mise à ", response.data); 
           // Passer à l'étape suivante si l'erreur n'est pas liée à l'étape en cours
           this.error = "An error has occurred. Please try again later";
           return false;
       }
   } catch (error) {
     console.error("Erreur lors de la mise à ", error.response.data.errors);

  
         if(error.response.data.errors){
           const errorKeys = Object.keys(error.response.data.errors);
           const currentStepFields = Object.keys(employeeData);
           const isCurrentStepError = errorKeys.some(key => currentStepFields.includes(key));

      

           if (isCurrentStepError === true) {
               // Passer à l'étape suivante si l'erreur n'est pas liée à l'étape en cours
               this.formatValidationErrors(error.response.data.errors);
             return false;

           }else{
             return true;
           }
         }
         else{

           if (error.response) {
               
           } else {
               // Afficher les erreurs à l'utilisateur
               this.formatValidationErrors(error.response.data.errors);
               this.loading = false;
           }
         }

   }
},
 

 
  
     async fetchDays() {
     try {
      
       const response = await axios.get('/working-days');;

       if (response.data.status === 'success') {
         this.DaysOptions = response.data.data.map((day) => ({
             label:day. name,
             value: day.id,
           }));
        
       }
      
     } catch (error) {
       console.log("Erreur lors de la mise à jour des données MPME guinee :", error);
     
       
     }
   },
   async fetchHonoraires() {
     try {
      
       const response = await axios.get('/employees/detail/honoraires/emp');

     
       if (response.data.status === 'success') {
         this.HonorairesOptions = response.data.data.map((el) => ({
             label:el,
             value: el,
           }));
       
       }
      
     } catch (error) {
       console.log("Erreur lors de la mise à jour des données MPME guinee :", error);
     
       
     }
   },
  
  

   
     async formatValidationErrors(errors) {
     const formattedErrors = {};

     for (const field in errors) {
       const errorMessages = errors[field]; // Liste complète des messages d'erreur
      

       const concatenatedError = errorMessages.join(", "); // Concaténer les messages d'erreur
       

       formattedErrors[field] = concatenatedError; // Utilisez le nom du champ comme clé
     }

     this.resultError = formattedErrors; // Stockez les erreurs dans un objet

     // Maintenant, this.resultError est un objet où les clés sont les noms des champs
   
     for (let key in this.resultError) {
 if (this.resultError.hasOwnProperty(key)) {
   // Construire le message d'erreur avec le nom du champ (clé) et son message (valeur)
   let errorMessage = `${key}: ${this.resultError[key]}`;
   // Afficher le toast pour chaque erreur
   this.triggerToast(errorMessage);
 }
}
   },
   triggerToast(errorMessage) {
   this.toast.error(errorMessage, {
   position: "top-right",
   timeout: 5000,
   closeOnClick: true,
   pauseOnFocusLoss: true,
   pauseOnHover: true,
   draggable: true,
   draggablePercent: 0.6,
   showCloseButtonOnHover: false,
   hideProgressBar: true,
   closeButton: "button",
   icon: "mdi mdi-alert-circle-outline", // Modifier l'icône pour une icône d'erreur
   rtl: false,
   className: 'toast-error'
 });
},



validateStep1() {
     let isValid = true;
     this.errors.step1 = { DaysHours: [] };
     this.step1.DaysHours.forEach((day, index) => {
       const dayErrors = {};
       if (!day.day_id) {
         dayErrors.day_id = 'Day is required';
         isValid = false;
       }
       if (!day.available_hour) {
         dayErrors.available_hour = 'Hour is required';
         isValid = false;
       }
       this.errors.step1.DaysHours[index] = dayErrors;
     });

     return isValid;
   },
  
    

   },
   async mounted() {
    
  try {
     window.scrollTo({
       top: 0,
       behavior: "smooth",
     });
     
     await Promise.all([
      this.fetchDays(),
      this.fetchHonoraires(),

      
     ]);
     
   } catch (error) {
     console.error("Erreur lors du chargement des données:", error);
   }
      
      
   },
 };
 </script>
 
 <style lang="css" scoped>
 .error {
   /* border: 1px solid red; */
   max-width: 1140px;
   margin: 40px auto;
   padding: 10px;
   color: red;
   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
 }

 
 .error-border {
   border: 2px solid red !important; /* Bordure rouge en cas d'erreur */
   border-radius: 0.5rem !important;
 }
 
 .profil1 {
   /* border: 2px solid red; */
   right: 0;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   width: 50px;
   height: 50px;
   border-radius: 100%;
   font-size: 25px;
   position: absolute;
   top: -41px;
   cursor: pointer;
   background-color: var(--color-primary);
   color: #fff;
 }
 
 .profil1:hover {
   border: 2px solid var(--color-primary);
   background-color: #fff;
   color: var(--color-primary);
   cursor: pointer;
 }
 
 .profil {
   display: flex;
   flex-direction: column;
   align-items: flex-end;
   position: relative;
   margin: 0 auto;
   max-width: 1140px;
   padding-right: 76px;
 }
 
 .form-container {
   /* width: 700px; */
   max-width: 1140px;
   margin: 0 auto 20px;
   /* border-radius: 0.75rem; */
   background-color: white;
   padding: 1rem;
   color: black;
   /* max-height: 550px; */
   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
   /* border: 1px solid red; */
 }
 
 .form .content {
   border: 1px solid rgb(201, 209, 217);
   margin: 10px 0;
   padding: 10px;
 }
 
 .title {
   text-align: center;
   font-size: 1.5rem;
   line-height: 2rem;
   font-weight: 700;
 }
 
 .form {
   margin-top: 1.5rem;
 }
 
 .input-groupe {
   margin-top: 0.25rem;
   font-size: 0.875rem;
   line-height: 1.25rem;
 }
 
 .input-groupe label {
   display: block;
   color: #000;
   margin-bottom: 4px;
 }
 
 .titre {
   display: block;
   color: rgba(156, 163, 175, 1);
   margin-bottom: 4px;
   font-size: 12px;
   width: fit-content;
   border: 1px solid #4dd70a;
   padding: 1px 5px;
 }
 
 .input-groupe input,
 .form-select {
   width: 100%;
   border-radius: 0.1rem !important;
   border: 1px solid #17a4ba;
   outline: 0;
   padding: 8px;
   color: rgb(3, 3, 5);
 }
 
 .input-groupe input:focus {
   border-color: var(--color-primary);
 }
 
 .form-select:focus {
   border-color: var(--color-primary);
   outline: 0;
   box-shadow: 0 0 0 0 rgba(101, 113, 255, 0.25);
 }
 
 .signup a:hover {
   text-decoration: underline var(--color-primary);
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
 
 .signup {
   text-align: center;
   font-size: 0.75rem;
   line-height: 1rem;
   color: rgba(156, 163, 175, 1);
 }
 
 
 .btnForm {
   max-width: 1140px;
   margin: 0px auto;
   background-color: white;
   padding: 1rem;
   color: black;
   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
 }
 
 .btnLogin {
   padding: 1em 3em;
   font-size: 12px;
   font-weight: 500;
   color: #fff;
   background-color:var(--primary-color);
   border: none;
   border-radius: 45px;
 
   cursor: pointer;
   outline: none;
 }
 
 .btnLogin:hover {
   background-color: #fff;
   border: 1px solid var(--primary-color);
   color:#000;
 }
 
 .generastep {
   background-color: #fff;
   max-width: 1140px;
   margin: 10px auto;
   padding: 10px;
   display: flex;
   justify-content: center;
   align-items: center;
   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
 }
 
 .tx-green-1 {
   color: #75cc65;
   font-weight: 600;
 }
 
 .wrapper-stepper {
   background-color: #fff;
   padding: 60px;
   border-radius: 32px;
   box-shadow: rgba(0, 0, 0, 0.09);
 }
 
 .stepper {
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 660px;
   position: relative;
   z-index: 0;
   /* margin-bottom: 24px; */
 }
 
 .stepper-progress {
   position: absolute;
   background-color: #c5c5c5;
   height: 2px;
   z-index: -1;
   left: 0;
   right: 0;
   margin: 0 auto;
 }
 
 .stepper-progress-bar {
   position: absolute;
   left: 0;
   height: 100%;
   width: 0%;
   background-color: #47c00b;
   transition: all 500ms ease;
 }
 
 .stepper-item {
   display: flex;
   flex-direction: column;
   align-items: center;
   color: #c5c5c5;
   transition: all 500ms ease;
   cursor:pointer;
 }
 
 .stepper-item-counter {
   height: 35px;
   width: 35px;
   display: grid;
   place-items: center;
   background-color: #fff;
   border-radius: 100%;
   border: 2px solid #c5c5c5;
   position: relative;
 }
 
 .stepper-item-counter .icon-success {
   position: absolute;
   opacity: 0;
   transform: scale(0);
   width: 18px;
   transition: all 500ms ease;
 }
 
 .stepper-item-counter .number {
   font-size: 15px;
   transition: all 500ms ease;
 }
 
 .stepper-item-title {
   position: absolute;
   font-size: 15px;
   bottom: -39px;
   width: 71px;
   display: flex;
   justify-content: center;
 }
 
 .stepper-item.success .stepper-item-counter {
   border-color: #75cc65;
   background-color: #c8ebc1;
   color: #fff;
   font-weight: 600;
 }
 
 .stepper-item.success .stepper-item-counter .icon-success {
   opacity: 1;
   transform: scale(1);
 }
 
 .stepper-item.success .stepper-item-counter .number {
   opacity: 0;
   transform: scale(0);
 }
 
 .stepper-item.success .stepper-item-title {
   color: #75cc65;
 }
 
 .stepper-item.current .stepper-item-counter {
   border-color: #75cc65;
   background-color: #75cc65;
   color: #fff;
   font-weight: 600;
 }
 
 .stepper-item.current .stepper-item-title {
   color: #818181;
 }
 
 .supp {
   font-size: 15px;
   font-weight: 500;
   color: #fff;
   border: none;
   border-radius: 45px;
   z-index: 3;
   cursor: pointer;
   outline: none;
   width: 100px;
   height: 40px;
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 0 5px;
 }
 
 .supp:hover {
   background-color: #fff;
 }
 
 .profile-pic {
   color: transparent;
   transition: all 0.3s ease;
   display: flex;
   justify-content: center;
   align-items: center;
   position: relative;
   transition: all 0.3s ease;
 }
 
 .profile-pic input {
   display: none;
 }
 
 .profile-pic img {
   position: absolute;
   object-fit: cover;
   width: 80%;
   height: 100%;
   box-shadow: 0 0 10px 0 rgba(255, 255, 255, 0.35);
   z-index: 0;
   border-radius: 50%;
   border: 1px solid var(--color-primary);
 }
 
 .profile-pic .-label {
   cursor: pointer;
   height: 165px;
   width: 230px;
 }
 
 .profile-pic:hover .-label {
   display: flex;
   justify-content: center;
   align-items: center;
   background-color: rgba(0, 0, 0, 0.2);
   z-index: 10000;
   color: #fafafa;
   transition: background-color 0.2s ease-in-out;
 
   margin-bottom: 0;
 }
 
 .profile-pic span {
   display: inline-flex;
   padding: 0.2em;
   height: 2em;
 }
 
 /* Upload Area */
 .upload-area {
   width: 100%;
   /* max-width: 25rem; */
   background-color: rgb(255, 255, 255);
   border: 2px solid var(--color-secondary);
   border-radius: 24px;
   padding: 2rem 1.875rem 5rem 1.875rem;
   /* margin: 0.625rem; */
   text-align: center;
 }
 
 .upload-area--open {
   /* Slid Down Animation */
   animation: slidDown 500ms ease-in-out;
 }
 
 .upload-area__title {
   font-size: 1.8rem;
   font-weight: 500;
   margin-bottom: 0.3125rem;
 }
 
 .upload-area__paragraph {
   font-size: 0.9375rem;
   color: rgb(196, 195, 196);
   margin-top: 0;
 }
 
 .upload-area__tooltip {
   position: relative;
   color: var(--color-secondary);
   cursor: pointer;
   transition: color 300ms ease-in-out;
 }
 
 .upload-area__tooltip:hover {
   color: var(--clr-blue);
 }
 
 .upload-area__tooltip-data {
   position: absolute;
   top: 50%;
   left: 50%;
   transform: translate(-50%, -125%);
   min-width: max-content;
   background-color: rgb(255, 255, 255);
   color: rgb(63, 134, 255);
   border: 1px solid var(--color-secondary);
   padding: 0.625rem 1.25rem;
   font-weight: 500;
   opacity: 0;
   visibility: hidden;
   transition: none 300ms ease-in-out;
   transition-property: opacity, visibility;
 }
 
 .upload-area__tooltip:hover .upload-area__tooltip-data {
   opacity: 1;
   visibility: visible;
 }
 
 /* Drop Zoon */
 .upload-area__drop-zoon {
   position: relative;
   height: 11.25rem;
   /* 180px */
   display: flex;
   justify-content: center;
   align-items: center;
   flex-direction: column;
   border: 2px dashed var(--color-secondary);
   border-radius: 15px;
   margin-top: 2.1875rem;
 
   transition: border-color 300ms ease-in-out;
 }
 
 
 @media screen and (max-width: 768px) {
   .form-container {
     width: 700px;
     max-width: 100%;
   }
 
   .content-group {
     display: flex;
     flex-direction: column;
   }
 
   .profil1{
 
     top:-26px;
   }
 
   .upload-area__title{
 
     font-size:1.6rem;
   }
 }
 .titres1{

   display: flex;
   justify-content: space-between;
   align-items: center;
 }

 .titres{

   width: 22%;
   display: flex;
   justify-content: space-evenly;
   align-items: flex-start;
 }

 .titres .nombre{

color:#fff;
background-color:var(--primary-color);
border-radius:50%;
padding: 1px 7px;
font-size: 13px;
z-index: 10; 
}

@media screen and (max-width: 775px){

 .titres{

width: 67%;
justify-content: flex-start;
}

.titres .nombre{
margin-left:5px;
}
}



.btnForms {
   width: 100%;
   background-color: white;
   padding:10px;
   color: black;
   box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
   position:fixed;
   display:flex; 
   z-index:100;
 }


 .btnForms img{
  
   height:80px;

 }

 .btnForms h3{
   position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

 }

 @media screen and (max-width: 991px){
   .btnForms {
     justify-content: space-between;
   align-items: center;
 }


 .btnForms h3{
   position:relative;
   top: 0;
   left: 0;
   transform: none;

 }
 }

 @media screen and (max-width: 600px){
  
 .btnForms img{
   
   height:60px;
  

 }

 .btnForms h3{
  font-size:20px;

 }
 }
 @media screen and (max-width: 600px){
  
  .btnForms {
    
   flex-direction:column;
   
 
  }

  }

 .m-select {
   width: 100%;
 
}

.m-input{   
   width: 100%;
 
}

.m-phone-number-input{
 width: 100%;

}
.m-select-list-item{

 padding-top: 0 !important;
   padding-bottom: 0 !important;
}
 </style>
 