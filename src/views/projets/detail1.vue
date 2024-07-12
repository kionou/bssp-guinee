<template>
    <div id="appp">
      <MenuCheckbox :items="menuData" :checked-items.sync="checkedItems" />
    </div>
  </template>
  
  <script>
  import MenuCheckbox from '@/components/others/MenuCheckbox.vue';
  
  export default {
    name: 'App',
    components: {
      MenuCheckbox
    },
    data() {
      return {
        menuData: [], // Les données du menu
        checkedItems: {} // État des éléments cochés
      };
    },
    created() {
      // Remplacez cette partie par votre appel API ou méthode pour obtenir les données
      this.menuData = [
        {
          id: 1,
          label: "Accueil",
          children: []
        },
        {
          id: 2,
          label: "Gestion des utilisateurs",
          children: [
            { id: 3, label: "Utilisateurs", children: [] },
            { id: 4, label: "Droit", children: [] },
            { id: 5, label: "Profil", children: [] },
            { id: 6, label: "Historique des actions", children: [] }
          ]
        },
        {
          id: 10,
          label: "Projets",
          children: [
            { id: 7, label: "liste", children: [] },
            { id: 8, label: "ajouter", children: [] },
            { id: 9, label: "Profil", children: [] },
            {  }
          ]
        },
        // Ajoutez d'autres éléments de menu ici
      ];
    }
  }
  </script>
  
  <style scoped style="css">
  #appp {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
  