<template>
  <section class="page-section">
     <b-container>
      <HeaderPage title="Editar Utilizador"/>
   
      <!--FORM-->
      <b-row>
        <b-col cols="2"></b-col>
        <b-col cols="8">
          <form @submit.prevent="update">
            <div class="form-group">
              <input
                v-model="sponsor.nome"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nome"
                required
              />
            </div>
            <div class="form-group">
            <input
                v-model="sponsor.nacionalidade"
                type="text"
                class="form-control form-control-lg"
                id="txtName"
                placeholder="escreve nacionalidade"
                required
              />
            </div>
            <div class="form-group">
            <input
                v-model="sponsor.empresa"
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
              :to="{name: 'listSponsors'}"
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
import { EDIT_SPONSORS } from "@/store/sponsors/sponsors.constants";
import HeaderPage from "@/components/HeaderPage.vue"
import router from "@/router";
import { mapGetters } from "vuex";

export default {
  name: "EditSponsors",
  components: {
    HeaderPage
  },
  data: () => {
    return {
      sponsor: {}
    };
  },
  computed: {
    ...mapGetters("sponsor", ["getSponsorsById", "getMessage"])
  },
  methods: {
    update() {
      this.$store.dispatch(`sponsor/${EDIT_SPONSORS}`, this.$data.sponsor).then(
        () => {
          this.$alert(
            this.getMessage,
            "Sponsor atualizado!",
            "success"
          );
          router.push({name: 'listSponsors'});
        },
        err => {
          this.$alert(`${err.message}`, "Erro", "error");
        }
      );
    }
  },
  created() {
    this.sponsor = this.getSponsorsById(this.$route.params.sponsorId);
  }
};
</script>
