<template>
  <section class="page-section">
     <b-container>
      <HeaderPage title="Editar Expert"/>
   
      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="expert.nome"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
            <input
                v-model="expert.formacao"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve formacao"
                required
              />
            </div>
            <div class="form-group">
            <input
                v-model="expert.telefone"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve empresa"
                required
              />
            </div>
          
            <button type="submit" class="btn btn-outline-success btn-lg mr-2">
              <i class="fas fa-edit"></i> ATUALIZAR</button>
            <router-link
              :to="{name: 'listExperts'}"
              tag="button"
              class="btn btn-outline-danger btn-lg"
            ><i class="fas fa-window-close"></i> CANCELAR</router-link>
          </form>
        </b-col>
        <b-col cols="2"></b-col>
      </b-row>
     </b-container>
  </section>
</template>

<script>
import { EDIT_EXPERTS } from "@/store/experts/experts.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditExperts",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      expert: {}
    };
  },
  computed: {
    ...mapGetters("expert", ["getExpertsById", "getMessage"])
  },
  methods: {
    update() {
      this.$store.dispatch(`expert/${EDIT_EXPERTS}`, this.$data.expert).then(
        () => {
          this.$alert(
            this.getMessage,
            "Expert atualizado!",
            "success"
          );
          router.push({name: 'listExperts'});
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.expert = this.getExpertsById(this.$route.params.expertId);
  }
};
</script>
