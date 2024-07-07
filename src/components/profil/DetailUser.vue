<template >
    <div>
    
      <div class="container-xxl flex-grow-1">
        <!-- Header -->
        <div class="row">
          <div class="col-12">
            <div class="card">
              <div class="user-profile-header-banner">
                <!-- <img src="@/assets/img/guinee.jpg" alt="Banner image" class="rounded-top" /> -->
              </div>
              <div
                class="user-profile-header d-flex flex-column flex-sm-row text-sm-start text-center"
              >
                <div class="flex-shrink-0 mt-n2 mx-sm-0 mx-auto user-profile" v-if="data.user===null">
                
                    <img
                    
                      src="@/assets/img/client.png"
                      alt="alternative profile image"
                      class="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"
                    />
                </div>
                <div class="flex-shrink-0 mt-n2 mx-sm-0 mx-auto user-profile" v-else-if="data.user">
                  <img v-if="data.user.profile === null"
                    src="@/assets/img/client.png"
                    alt="profile image"
                    class="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"
                  />
                  <img
                      v-else
                      :src="data.user.profile"
                      alt="profile image"
                      class="d-block h-auto ms-0 ms-sm-4 rounded user-profile-img"
                    />
                   
                </div>
                <div class="name-user">
                  <div
                    class="d-flex align-items-sm-start align-items-center justify-content-md-between justify-content-start mx-4 flex-md-row flex-column gap-4"
                  >
                    <div class="user-profile-info text-capitalize">
                      <h4 class="text-capitalize">
                        {{ data.first_name }} {{ data.last_name }}
                      </h4>
                      <ul
                        class="list-inline mb-0 d-flex align-items-center flex-wrap justify-content-sm-start justify-content-center gap-2"
                      >
                        <li class="list-inline-item fw-semibold">
                          <i class="fa-solid fa-location-dot"></i>
                          {{ data.address }} -
                          {{ data.number_street_city_state_zip }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <!-- <hr> -->
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--/ Header -->
        <nav
          class="nav nav-style-6 nav-pills mb-3 nav-justified d-sm-flex d-block"
          role="tablist"
        >
          <a
            class="nav-link active"
            data-bs-toggle="tab"
            role="tab"
            aria-current="page"
            href="#step1"
            aria-selected="false"
            >General</a
          >
          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#step2"
            aria-selected="true"
            >Education </a
          >
          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#step3"
            aria-selected="false"
            >Driving & Skills
          </a>
          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#step4"
            aria-selected="false"
            >Experiences </a
          >

          <a
            class="nav-link"
            data-bs-toggle="tab"
            role="tab"
            href="#step5"
            aria-selected="false"
            >References </a
          >
        </nav>
  
        <!-- Navbar pills -->
        <div class="col-lg-12 col-12 mb-4">
          <div class="nav-align-top mb-4">
            <div class="tab-content">
              <div class="tab-pane fade show active " id="step1" role="tabpanel">
                <div class="row ttb ">
                  <div class="card col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <div class="bg-white rounded-lg">
                      <div class="">
                        <div
                          class="overflow-hidden bg-white border-b border-gray-200 rounded-lg"
                        >
                          <div class="border-t border-gray-200">
                            <dl>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Address Email
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.email }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Cell Phone Number
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.phone }}
                                </dd>
                              </div>
  
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Age
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.age }} years old
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Social Security
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.social_security }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Position Applied for Agency
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.position_applied_agency }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Hours can you work weekly
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.weekly_available_hours }}
                                </dd>
                              </div>
  
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Work nights
                                </dt>
                                <dd v-if="data.can_work_night === '1'" class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> Yes </dd>
                                <dd v-else class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> No </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Number pref
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.number_pref }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  How long
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.how_long }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Date Available to Start
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.date_available_to_start }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Employment desired
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.full_part_both }}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
  
                    <div class="rounded-lg mt-3">
                      <p
                        class="max-w-2xl mb-1 text-center font-semibold text-gray-900"
                      >
                        Days / Hours Available to Work
                      </p>
                      <div class="-my-2 sm:-mx-6 lg:-mx-8">
                        <div
                          class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8"
                        >
                          <div
                            class="overflow-hidden border-b border-gray-200 rounded-lg"
                          >
                            <table class="min-w-full divide-y divide-gray-200">
                              <thead class="bg-gray-50">
                                <tr>
                                  <th
                                    scope="col"
                                    class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                                  >
                                    Days
                                  </th>
                                  <th
                                    scope="col"
                                    class="px-2 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase"
                                  >
                                    Hours
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr
                                  v-if="data.work_days"
                                  class="bg-white"
                                  v-for="(day, index) in data.work_days"
                                  :key="day.id"
                                >
                                  <td
                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap"
                                    v-if="day.day"
                                  >
                                    {{ day.day.name || 0 }}
                                  </td>
                                  <td
                                    class="px-2 py-4 text-sm font-normal text-center text-gray-500 whitespace-nowrap"
                                  >
                                    {{ day.available_hour || 0 }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
             
              <div class="tab-pane fade" id="step2" role="tabpanel">
                <div class="row ttb">
                  <div class="card col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <div class="bg-white rounded-lg">
                      <div class="">
                        <div
                          class="overflow-hidden bg-white border-b border-gray-200 rounded-lg"
                        ></div>
  
                        <div
                          class="overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-3"
                        >
                          <div class="border-t border-gray-200">
                            <dl>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  School Level
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="data.school_level"
                                >
                                  {{ data.school_level.name  ||  "Unknown" }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  School Name
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.school_name }}
                                </dd>
                              </div>
  
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  School Location
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.school_location }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  School Email Address
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.school_email_address }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Number of Years in School
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.number_of_year_school }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Means of transportation to work
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2" v-if="data.transportation"
                                >
                                  {{ data.transportation.name ||  "Unknown"   }}
                                </dd>
                              </div>
  
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Driver Licence
                                </dt>
                                <dd v-if="data.driver_licence === '1'" class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> Yes </dd>
                                <dd v-else class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> No </dd>
                               
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Driver Licence Number
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.driver_licence_number || 'null' }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Driver Licence Issue State
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.driver_licence_issue_state || 'null' }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Driver Licence Expiration Date
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.driver_licence_expiration_date || 'null' }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Current Insurance
                                </dt>
                                <dd v-if="data.current_insurance === '1'" class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> Yes </dd>
                                <dd v-else class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> No </dd>
                               
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Insurance Copy Submitted
                                </dt>
                                <dd v-if="data.insurance_copy_submitted === '1'" class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> Yes </dd>
                                <dd v-else class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> No </dd>
                                
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Insurance Policy Number
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.insurance_policy }}
                                </dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                  <div class="col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <div class="card card-action">
                      <div class="card-header align-items-center">
                        <h5 class="card-action-title mb-0">
                          <i class="bx bx-list-ul me-2"></i>Detail Document
                        </h5>
                      </div>
                      <div class="card-body">
                        <ul class="timeline ms-2">
                          <li class="timeline-item timeline-item-transparent">
                            <span
                              class="timeline-point timeline-point-primary"
                            ></span>
                            <div class="timeline-event">
                              <div class="d-flex flex-wrap gap-2">
                                <p v-if="data.FileInsurance === null">
                                 No File Insurance yet 
                                </p>
                                <a
                                  v-else
                                  :href="data.FileInsurance"
                                  class="me-3 d-flex flex-column align-items-center"
                                  download
                                >
                                  <img
                                    src="@/assets/misc/pdf.png"
                                    alt="Document image"
                                    width="20"
                                    class="me-2"
                                  />
                                  <span class="h6">File Insurance</span>
                                </a>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="tab-pane fade" id="step3" role="tabpanel">
                <div class="row ttb">
                  <div class="card col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <div class="bg-white rounded-lg">
                      <div class="">
                        <div
                          class="overflow-hidden bg-white border-b border-gray-200 rounded-lg"
                        ></div>
  
                        <div
                          class="overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-3"
                        >
                          <div class="border-t border-gray-200">
                            <dl>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                   Accident During Past Year 
                                </dt>
                                <dd v-if="data.any_accident_during_past_year === '1'" class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> Yes </dd>
                                <dd v-else class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> No </dd>
                               
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Accident Count
                                </dt>
                                
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.accident_count || 0 }}
                                </dd>
                              </div>
  
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Moving Violation Past Three Years 
                                </dt>
                                <dd v-if="data.moving_violation_past_three_year === '1'" class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> Yes </dd>
                                <dd v-else class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> No </dd>
                               
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Moving Violation Count
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.moving_violation_count || 0}}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Ever been convicted of a crime
                                </dt>
                                <dd v-if="data.convicted_crime === '1'" class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> Yes </dd>
                                <dd v-else class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> No </dd>
                                
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Crime Description
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.crime_description }}
                                </dd>
                              </div>
  
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Type Skill
                                </dt>
                                <dd v-if="data.type_skill === '1'" class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> Yes </dd>
                                <dd v-else class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> No </dd>
                               
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Computer Skills
                                </dt>
                                <dd v-if="data.computer_skill === '1'" class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> Yes </dd>
                                <dd v-else class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"> No </dd>
                                
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Other Skills
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ data.other_skills }}
                                </dd>
                              </div>
                             
                             
                             
                              
                            </dl>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
  
                 
                </div>
              </div>
              <div class="tab-pane fade" id="step4" role="tabpanel">
                <div class="row ttb">
                  <div class="card col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <div class="bg-white rounded-lg">
                      <div class="">
                        <div
                          class="overflow-hidden bg-white border-b border-gray-200 rounded-lg"
                        ></div>
  
                        <div
                          class="overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-3"
                        > 
                            <div v-if="data.experiences">
                                <div v-if="data.experiences.length === 0" class="noresul">
                                <span> No experience </span>
                                </div> 
                                <div  v-else class="border-t border-gray-200 " v-for="(experience, index) in data.experiences" :key="index">
                            <div class="titres">

                          <span class="nombre">{{ index + 1 }}</span>
                        </div>
                            <dl>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Name
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.employer_name }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Name of Last
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.name_of_last }}
                                </dd>
                              </div>
  
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Phone Number
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.phone }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  City, State, Zip code
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.city_state_zip }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Pay or Salary
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.salary }} $
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Supervisor
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.supervisor }}
                                </dd>
                              </div>
  
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Your last job title 
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.last_job_title }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Start date
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.employment_date_begin }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Finish date
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.employment_date_end }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Reason for leaving (be specific)
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ experience.reason }}
                                </dd>
                              </div>
                             
                             
                              
                            </dl>
                          </div>
                        
                            </div>
                        
                         
  
                        </div>
                      </div>
                    </div>
                  </div>
  
                 
                </div>
              </div>
              <div class="tab-pane fade" id="step5" role="tabpanel">
                <div class="row ttb">
                  <div class="card col-xl-12 col-lg-12 col-md-12 py-2 ttb1">
                    <div class="bg-white rounded-lg">
                      <div class="">
                        <div
                          class="overflow-hidden bg-white border-b border-gray-200 rounded-lg"
                        ></div>
  
                        <div
                          class="overflow-hidden bg-white border-b border-gray-200 rounded-lg mt-3"
                        >
                         <div v-if="data.references">
                            <div v-if="data.references.length === 0" class="noresul">
                                <span> No reference </span>
                                </div>
                            <div v-else class="border-t border-gray-200 " v-for="(reference, index) in data.references" :key="index">
                            <div class="titres">

                          <span class="nombre">{{ index + 1 }}</span>
                        </div>
                            <dl>
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Name
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ reference.name }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Position
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ reference.position }}
                                </dd>
                              </div>
  
                              <div
                                class="px-4 py-3 bg-gray-50 d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Company Address
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ reference.company_address }}
                                </dd>
                              </div>
                              <div
                                class="px-4 py-3 bg-white d-flex justify-content-between align-items-center"
                              >
                                <dt class="text-sm font-medium text-gray-500">
                                  Phone Number
                                </dt>
                                <dd
                                  class="mt-1 font-semibold text-gray-900 sm:mt-0 sm:col-span-2"
                                >
                                  {{ reference.phone }}
                                </dd>
                              </div>

                              
                             
                             
                              
                            </dl>
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
    </div>
  </template>
  <script>
 
  export default {
    props: ["data"],
    components: {
    
    },
    computed: {
      loggedInUser() {
        return this.$store.getters["auth/myAuthenticatedUser"];
      },
    },
  
    data() {
      return {
        
       
      };
    },
  
    async mounted() {
      console.log("loggedInUser", this.loggedInUser , this.data);
      
    },
  
    methods: {
      
    },
  };
  </script>
  <style lang="css" scoped>
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
  </style>
  