<template>
  
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Expert"/>
     
      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="add">
            <div class="form-group">
              <input
                v-model="nome"
                type="text"
                class="form-control form-control-lg"
                id="txtNome"
                placeholder="escreve nome"
                required
              />
            </div>

            <div class="form-group">
              <input
                v-model="formacao"
                type="text"
                class="form-control form-control-lg"
                id="txtFormacao"
                placeholder="escreve formacao"
                required
              />
            </div>

            <div class="form-group">
              <input
                v-model="telefone"
                type="text"
                class="form-control form-control-lg"
                id="txtTelefone"
                placeholder="escreve telefone"
                required
              />
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>
            <router-link
              :to="{name: 'listExperts'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
            <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>EXPERT
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_EXPERTS } from "@/store/experts/experts.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddExperts",
   components: {
    HeaderPage
  },
  data: () => {
    return {
      nome: "",
      formacao: "",
      telefone: ""
    };
  },
  computed: {
     ...mapGetters("expert", ["getMessage"]),
  },
  methods: {
    add() {
        this.$store.dispatch(`expert/${ADD_EXPERTS}`, this.$data).then(
          () => {
            this.$alert(
              this.getMessage,
              "Expert adicionado!",
              "success"
            );
            router.push({name: 'listExperts'});
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
     
    }
  }
};
</script>