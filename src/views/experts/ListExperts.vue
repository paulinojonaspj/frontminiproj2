<template>
  <section class="page-section">
    <b-container>
      <HeaderPage title="Gestão de Experts" />
      <!--MENU DE TOPO-->
      <b-row class="mb-4">
        <b-col cols="1"></b-col>
        <b-col>
          <router-link
            :to="{name:'addExpert'}"
            tag="button"
            class="btn btn-outline-success mr-2 mt-2"
          >
            <i class="fas fa-plus-square"></i> ADICIONAR EXPERT
          </router-link>
          <router-link :to="{name:'admin'}" tag="button" class="btn btn-outline-info mr-2 mt-2">
            <i class="fas fa-bars"></i> MENU PRINCIPAL
          </router-link>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
      <!--TABLE-->
      <b-row>
        <b-col cols="1"></b-col>
        <b-col>
          <table class="table table-striped">
            <thead class="thead-dark">
              <tr>
                <th scope="col">
                  NOME
                  <i class="fas fa-arrow-up" v-if="sortType===1" @click="sort()"></i>
                  <i class="fas fa-arrow-down" v-else @click="sort()"></i>
                </th>
                <th scope="col">FORMAÇÃO</th>
                <th scope="col">TELEFONE</th>
                <th scope="col">AÇÕES</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expert of experts" :key="expert._id">
                <td class="pt-4">{{expert.nome}}</td>
                <td class="pt-4">{{expert.formacao}}</td>
                <td class="pt-4">{{expert.telefone}}</td>
                <td>
                  <router-link
                    :to="{name:'editExpert', params:{expertId: expert._id}}"
                    tag="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-edit"></i> EDITAR
                  </router-link>
                  <button
                    @click="viewExperts(expert._id)"
                    type="button"
                    class="btn btn-outline-success mr-2 mt-2"
                  >
                    <i class="fas fa-search"></i> VER
                  </button>
                  <button
                    @click="removeExperts(expert._id)"
                    type="button"
                    class="btn btn-outline-danger mr-2 mt-2"
                  >
                    <i class="fas fa-trash-alt"></i> REMOVER
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import { FETCH_EXPERTS, REMOVE_EXPERTS } from "@/store/experts/experts.constants";
import { mapGetters } from "vuex";
import HeaderPage from "@/components/HeaderPage.vue"
export default {
  name: "ListExperts",
   components: {
    HeaderPage
  },
  data: function() {
    return {
      experts: [],
      sortType: 1
    };
  },
  computed: {
    ...mapGetters("expert", ["getExperts","getMessage"])
  },
  methods: {
    fetchExperts() {
      this.$store.dispatch(`expert/${FETCH_EXPERTS}`).then( 
        () => {
          this.experts = this.getExperts;
        }, err => {
          this.$alert(`${err.message}`, 'Erro', 'error');
        });
    },
    sort() {
      this.expert.sort(this.compareNames)
      this.sortType *= -1      
    },
    compareNames(q1,q2) {
      if(q1.nome > q2.nome) return 1 * this.sortType
      else if(q1.nome < q2.nome) return -1 * this.sortType
      else return 0
    },
    viewExperts(id) {
      const expert = this.experts.find(expert => expert._id === id);
      this.$fire({
        title: expert.nome,
        html: this.generateTemplate(expert)
        /* imageUrl: user.name,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: "Imagem desconhecida" */
      });
    },
    generateTemplate(expert) {
      let response = `
          <p><b>Nome:</b> ${expert.nome}<br>Formação: ${expert.formacao}<br>Telefone: ${expert.telefone}</p>
         
      `          
      
      return response;
    },
    removeExperts(id) {
      this.$confirm(
        "Se sim, clique em OK",
        "Deseja mesmo remover?",
        "warning",
        { confirmButtonText: "OK", cancelButtonText: "Cancelar" }
      ).then(
        () => {
          this.$store.dispatch(`expert/${REMOVE_EXPERTS}`, id).then(() => {
            this.$alert(
              this.getMessage,
              "Expert removido!",
              "success"
            );
            this.fetchExperts();
          });
        },
        () => {
          this.$alert("Remoção cancelada!", "Informação", "info");
        }
      );
    }
  },
  created() {
    this.fetchExperts();
  }
};
</script>