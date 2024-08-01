<template>
    <div class="modal-backdrop" v-if="visible">
      <div class="modal-container">
        <div class="modal-header">
          <h5 class="modal-title">Détails des Régions</h5>
          <button type="button" class="close" @click="$emit('close')">&times;</button>
        </div>
        <div class="modal-body">
          <div class="region-list">
            <div v-for="region in regions" :key="region.id" class="region-card">
              <div class="region-card-content">
                {{ region.region.NomRegion }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      regions: {
        type: Array,
        required: true
      }
    },
    computed: {
      visible() {
        return this.regions.length > 0;
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
    max-width: 90%;
    width: 600px;
    max-height: 80%;
    overflow-y: auto;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .modal-title {
    margin: 0;
    font-size: 1.5rem;
  }
  
  .close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
  }
  
  .modal-body {
    padding: 0 1rem;
  }
  
  .region-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px; /* Espace entre les cartes */
  }
  
  .region-card {
    background-color: #f1f1f1; /* Couleur de fond des cartes */
    border-radius: 8px;
    padding: 15px;
    width: 100%; /* Ajuster la largeur selon vos besoins */
    max-width: 200px; /* Largeur maximale des cartes */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .region-card:hover {
    transform: translateY(-5px); /* Léger déplacement vers le haut */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Ombre plus prononcée */
  }
  
  .region-card-content {
    font-size: 1.1rem;
    font-weight: bold;
    text-align: center;
    color: #333; /* Couleur du texte */
  }
  </style>
  