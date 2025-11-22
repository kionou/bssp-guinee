<template>
  <div>
    <Loading v-if="loading" style="z-index: 99999" />

    <div class="col-xl-12" data-aos="zoom-in">
      <div class="card custom-card">
        <div class="card-header justify-content-between align-items-center">
          <div class="card-title mb-0">Liste des critères d'état de projet</div>
          <button class="btn btn-primary btn-sm d-none" @click="openModal()">
            <i class="ri-add-line me-1"></i>
            Ajouter / modifier
          </button>
        </div>
        <div class="card-body">
          <div v-if="!loading && !ConditionsOptions.length" class="empty-state">
            <h6>Aucune condition enregistrée</h6>
            <p class="text-muted">
              Définissez les règles de calcul pour les statuts BONNE, MODERE et
              ELEVE directement depuis cette interface.
            </p>
            <button class="btn btn-outline-primary" @click="openModal()">
              Créer la première condition
            </button>
          </div>

          <div v-else class="table-responsive">
            <table class="table table-bordered align-middle condition-table">
              <thead>
                <tr>
                  <th class="text-uppercase text-muted">Statut</th>
                  <th>Expression</th>
                  <th class="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="condition in ConditionsOptions" :key="condition.id">
                  <td>
                    <span
                      class="badge"
                      :class="`badge-${condition.statut.toLowerCase()}`"
                    >
                      {{ condition.statut }}
                    </span>
                  </td>
                  <td>
                    <pre class="condition-code mb-0"
                      >{{ condition.statment }}
</pre
                    >
                  </td>
                  <td class="text-center">
                    <button
                      class="btn btn-outline-primary btn-sm"
                      @click="openModal(condition)"
                    >
                      <i class="ri-edit-line me-1"></i>
                      Modifier
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="condition-guide card mt-4">
            <div class="card-body">
              <h6 class="card-title text-uppercase text-muted mb-3">
                Guide d'utilisation des expressions
              </h6>
              <div class="row gy-3">
                <div class="col-md-4">
                  <h6 class="mb-2">Variables disponibles</h6>
                  <ul class="list-unstyled mb-0">
                    <li><strong>$D</strong> : durée écoulée du projet (%)</li>
                    <li><strong>$TF</strong> : taux financier réalisé (%)</li>
                    <li><strong>$TP</strong> : taux physique réalisé (%)</li>
                  </ul>
                </div>
                <div class="col-md-4">
                  <h6 class="mb-2">Opérateurs logiques</h6>
                  <ul class="list-unstyled mb-0">
                    <li><code>&amp;&amp;</code> : ET logique</li>
                    <li><code>||</code> : OU logique</li>
                    <li><code>!</code> : NON logique</li>
                    <li><code>( ... )</code> : regrouper des blocs</li>
                  </ul>
                </div>
                <div class="col-md-4">
                  <h6 class="mb-2">Comparateurs</h6>
                  <ul class="list-unstyled mb-0">
                    <li><code>==</code> : égal</li>
                    <li><code>!=</code> : différent</li>
                    <li>
                      <code>&lt;</code> / <code>&gt;</code> : inférieur /
                      supérieur
                    </li>
                    <li>
                      <code>&lt;=</code> / <code>&gt;=</code> : inférieur ou
                      égal / supérieur ou égal
                    </li>
                  </ul>
                </div>
              </div>
              <div class="alert alert-warning mt-3 mb-0">
                <strong>Astuce :</strong> gardez les unités cohérentes (
                %) et vérifiez vos parenthèses pour éviter les erreurs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="condition-modal">
      <div class="condition-modal-backdrop" @click="closeModal"></div>
      <div class="condition-modal-dialog">
        <div class="condition-modal-header">
          <h5 class="modal-title">
            {{ form.id ? "Modifier la condition" : "Nouvelle condition" }}
          </h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Close"
            @click="closeModal"
          ></button>
        </div>
        <div class="condition-modal-body">
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <label class="form-label">Statut</label>
              <select
                class="form-select"
                v-model="form.statut"
                required
                :disabled="!!form.id"
              >
                <option value="" disabled>Choisir un statut</option>
                <option
                  v-for="option in statusOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">
                Expression de calcul
                <small class="text-muted d-block">
                  Utilisez les variables $TP, $TF et $D comme dans vos
                  procédures actuelles.
                </small>
              </label>
              <textarea
                class="form-control"
                rows="5"
                v-model="form.statment"
                placeholder="Ex: (($TP==0 || $TF==0) && $D<=10 ) ..."
                required
              ></textarea>
            </div>

            <div class="alert alert-info d-flex align-items-start gap-2">
              <i class="ri-information-line fs-5"></i>
              <div>
                Les trois statuts BONNE, MODERE et ELEVE sont fixes. Vous pouvez
                mettre à jour leurs règles aussi souvent que nécessaire sans
                toucher au code.
              </div>
            </div>

            <div class="d-flex justify-content-end gap-2">
              <button
                type="button"
                class="btn btn-light"
                :disabled="submitting"
                @click="closeModal"
              >
                Annuler
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                :disabled="submitting"
              >
                <span
                  v-if="submitting"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                {{ form.id ? "Mettre à jour" : "Enregistrer" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "@/components/others/loading.vue";
import axios from "@/lib/axiosConfig";
import { successmsg } from "@/lib/modal.js";
import Swal from "sweetalert2";
export default {
  components: {
    Loading,
  },
  computed: {
    loggedInUser() {
      return this.$store.getters["auth/myAuthenticatedUser"];
    },
  },
  data() {
    return {
      loading: true,
      ConditionsOptions: [],
      form: {
        id: null,
        statut: "",
        statment: "",
      },
      statusOptions: [
        { label: "Statut BONNE", value: "BONNE" },
        { label: "Statut MODERE", value: "MODERE" },
        { label: "Statut ELEVE", value: "ELEVE" },
      ],
      showModal: false,
      submitting: false,
    };
  },

  async mounted() {
    await this.fetchConditions();
  },

  methods: {
    successmsg: successmsg,

    hasPermission(permissionName) {
      if (!this.loggedInUser || !Array.isArray(this.loggedInUser.permissions)) {
        return false;
      }
      return this.loggedInUser.permissions.some(
        (permission) => permission.id === permissionName
      );
    },

    getAuthHeaders() {
      return {
        Authorization: `Bearer ${this.loggedInUser?.token}`,
      };
    },

    async fetchConditions() {
      try {
        const response = await axios.get("/conditions", {
          headers: this.getAuthHeaders(),
        });

        if (response.data.status === "success") {
          this.ConditionsOptions = response.data?.data || [];
        }
      } catch (error) {
        // handled below
      } finally {
        this.loading = false;
      }
    },

    openModal(condition = null) {
      if (condition) {
        this.form = {
          id: condition.id,
          statut: condition.statut,
          statment: condition.statment,
        };
      } else {
        this.resetForm();
      }
      this.showModal = true;
    },

    closeModal() {
      if (this.submitting) return;
      this.showModal = false;
      this.resetForm();
    },

    resetForm() {
      this.form = {
        id: null,
        statut: "",
        statment: "",
      };
    },

    async handleSubmit() {
      if (!this.form.statut || !this.form.statment.trim()) {
        Swal.fire(
          "Champs requis",
          "Merci de renseigner le statut et l'expression de calcul.",
          "warning"
        );
        return;
      }

      const payload = {
        statut: this.form.statut,
        statment: this.form.statment.trim(),
      };

      this.submitting = true;
      try {
        if (this.form.id) {
          await axios.put(`/conditions/${this.form.id}`, payload, {
            headers: this.getAuthHeaders(),
          });
          this.successmsg("Condition mise à jour avec succès.");
        } else {
          await axios.post("/conditions", payload, {
            headers: this.getAuthHeaders(),
          });
          this.successmsg("Condition créée avec succès.");
        }
        await this.fetchConditions();
        this.closeModal();
      } catch (error) {
        Swal.fire(
          "Erreur",
          error?.response?.data?.message ||
            "Impossible d'enregistrer la condition.",
          "error"
        );
      } finally {
        this.submitting = false;
      }
    },
  },
};
</script>
<style lang="css">
.condition-table th,
.condition-table td {
  vertical-align: middle;
}

.condition-code {
  white-space: pre-wrap;
  font-family: "Fira Code", Consolas, monospace;
  background-color: #f6f8fa;
  border-radius: 4px;
  padding: 12px;
  max-height: 180px;
  overflow: auto;
}

.badge-bonne {
  background-color: #22c55e;
}

.badge-modere {
  background-color: #f97316;
}

.badge-eleve {
  background-color: #ef4444;
}

.empty-state {
  text-align: center;
  padding: 48px 16px;
  border: 1px dashed #e2e8f0;
  border-radius: 12px;
}

.condition-modal {
  position: fixed;
  inset: 0;
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
}

.condition-modal-backdrop {
  position: absolute;
  inset: 0;
  background-color: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(3px);
}

.condition-modal-dialog {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 640px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.2);
  overflow: hidden;
}

.condition-modal-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.condition-modal-body {
  padding: 24px;
}

.condition-modal .btn-close {
  background: none;
  border: none;
  font-size: 1rem;
}

.condition-guide .card-title {
  letter-spacing: 0.08em;
}

.condition-guide ul li {
  font-size: 0.95rem;
  margin-bottom: 4px;
}
</style>
