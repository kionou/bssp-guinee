<template>
  <div class="modal-backdrop" v-if="visible">
    <div class="modal-container ">
      <div class="modal-header">
        <h5 class="modal-title">Détails des Bailleurs</h5>
       
      </div>
      <div class="modal-body px-4">
        <table class="table">
          <thead>
            <tr>
              <th>Bailleur</th>
              <th>Budget</th>
              <th>Montant Décaissé</th>
              <th>Taux de Décaissement</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bailleur in bailleurs" :key="bailleur.id">
              <td>{{ bailleur.CodeBailleur }}</td>
              <td>{{ formatBudget(bailleur.Budget) }} GNF</td>
              <td>{{ bailleur.decaissement.length > 0 && bailleur.decaissement[0]?.montant_decaisser ? formatBudget(bailleur.decaissement[0].montant_decaisser) : 0 }} GNF</td>

              <td>
                <span class="text-center fw-semibold" :style="{ color: getProgressColor(calculerTauxDecaissement(bailleur)) }">
                  {{ calculerTauxDecaissement(bailleur) }}%
                </span>

                <div class="progress mb-3" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                  <div
                    class="progress-bar progress-bar-striped"
                    :class="getProgressClass(calculerTauxDecaissement(bailleur))"
                    :style="{ width: calculerTauxDecaissement(bailleur) + '%' }"
                    :aria-valuenow="calculerTauxDecaissement(bailleur)"
                  >
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Total Général</th>
              <th style="color: red;" class="fw-semibold">{{ formatBudget(totalBudget) }} GNF</th>
              <th style="color: red;" class="fw-semibold">{{ formatBudget(totalMontantDecaisse) }} GNF</th>
              <th>
                <span class="text-center fw-semibold" :style="{ color: getProgressColor(totalTauxDecaissement) }">
                  {{ totalTauxDecaissement }}%
                </span>

                <div class="progress mb-3" role="progressbar" aria-valuemin="0" aria-valuemax="100">
                  <div
                    class="progress-bar progress-bar-striped"
                    :class="getProgressClass(totalTauxDecaissement)"
                    :style="{ width: totalTauxDecaissement + '%' }"
                    :aria-valuenow="totalTauxDecaissement"
                  >
                  </div>
                </div>
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div class="modal-footer " >
        <div class="btn-group ms-auto" style="padding: 10px 10px 10px 0;">
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('close')"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bailleurs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    visible() {
      return this.bailleurs.length > 0;
    },
    totalBudget() {
      return this.bailleurs.reduce((total, bailleur) => total + parseFloat(bailleur.Budget || 0), 0);
   
    },
    totalMontantDecaisse() {
      return this.bailleurs.reduce((sum, bailleur) => sum + parseFloat(bailleur.decaissement[0]?.montant_decaisser || 0), 0);
    },
    totalTauxDecaissement() {
      if (this.totalBudget === 0) return 0;
      return ((this.totalMontantDecaisse / this.totalBudget) * 100).toFixed(2);
    }
  },
  methods: {
    calculerTauxDecaissement(bailleur) {
      const montantTotal = bailleur.Budget || 1; // Évite la division par zéro
      const montantDecaisse = bailleur.decaissement[0]?.montant_decaisser || 0;
      return ((montantDecaisse / montantTotal) * 100).toFixed(2);
    },
    formatBudget(value) {
      return parseFloat(value).toLocaleString(); // Formatage avec séparateurs de milliers
    },
    getProgressClass(percentage) {
      if (percentage <= 30) {
        return 'bg-danger';
      } else if (percentage <= 75) {
        return 'bg-warning';
      } else {
        return 'bg-success';
      }
    },
    getProgressColor(percentage) {
      if (percentage <= 30) {
        return 'red';
      } else if (percentage <= 75) {
        return 'orange';
      } else {
        return 'green';
      }
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
  /* padding: 20px; */
  border-radius: 5px;
  max-width: 90%;
  width: 700px;
  max-height: 80%;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 0.5rem;
  margin-bottom: 1rem;
  background-color: var(--primary-color);
  
}

.modal-title {
  margin: 0;
  font-size: 1.5rem;
  color: white;
}

.close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th, .table td {
  /* padding: 10px; */
  border: 1px solid #ddd;
}

.progress {
  height: 10px;
}

.bg-danger {
  background-color: #dc3545;
}

.bg-warning {
  background-color: #ffc107;
}

.bg-success {
  background-color: #28a745;
}
</style>
