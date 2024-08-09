<template>
    <div class="container mt-5">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Tooltip on top"
      >
        Hover to see tooltip
      </button>
  
      <div class="mt-3">
        <span
          class="d-inline-block"
          tabindex="0"
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Tooltip on right"
        >
          <span class="badge bg-info">Hover over me</span>
        </span>
      </div>
    </div>
  </template>
  
  <script>
  import { onMounted } from 'vue';
 
  
  export default {
    name: 'TooltipExample',
    setup() {
      onMounted(() => {
        // Initialiser les tooltips après le montage du composant
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
          return new bootstrap.Tooltip(tooltipTriggerEl);
        });
      });
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: auto;
  }
  </style>
  