<template>
  
  <section class="page-section">
    <b-container>
      <HeaderPage title="Adicionar Sponsor"/>
     
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
                v-model="nacionalidade"
                type="text"
                class="form-control form-control-lg"
                id="txtNacionalidade"
                placeholder="escreve nacionalidade"
                required
              />
            </div>

            <div class="form-group">
              <input
                v-model="empresa"
                type="text"
                class="form-control form-control-lg"
                id="txtEmpresa"
                placeholder="escreve empresa"
                required
              />
            </div>
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-plus-square"></i> ADICIONAR
            </button>
            <router-link
              :to="{name: 'listSponsors'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            >
            <i class="fas fa-window-close"></i> CANCELAR
            </router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>SPONSOR
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { ADD_SPONSORS } from "@/store/sponsors/sponsors.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "AddSponsors",
   components: {
    HeaderPage
  },
  data: () => {
    return {
      nome: "",
      nacionalidade: "",
      empresa: ""
    };
  },
  computed: {
     ...mapGetters("sponsor", ["getMessage"]),
  },
  methods: {
    add() {
        this.$store.dispatch(`sponsor/${ADD_SPONSORS}`, this.$data).then(
          () => {
            this.$alert(
              this.getMessage,
              "Sponsor adicionado!",
              "success"
            );
            router.push({name: 'listSponsors'});
          },
          err => {
            this.$alert(`${err.message}`, "Erro", "error");
          }
        );
     
    }
  }
};
</script>