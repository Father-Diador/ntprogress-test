<template>
  <div class="wrapper">
      <ApplicationWidget 
        @create="performOperation"
        :currencies="currencies"
      />
      <ApplicationsList 
        :applications="applications"
      />
  </div>
  <OperationConfirmation 
    v-if="OperationConfirmation"
  />
</template>

<script>
import ApplicationWidget from "@/components/ApplicationWidget";
import ApplicationsList from "@/components/ApplicationsList";
import OperationConfirmation from "@/components/OperationConfirmation";

export default {
  components: {
    ApplicationWidget,
    ApplicationsList,
    OperationConfirmation,
  },
  data() {
    return {
      applications: this.$store.getters.GET_APPLICATIONS,
      currencies: this.$store.getters.GET_CURRENCIES,
    }
  },
  methods: {
    performOperation(application) {
      this.applications.unshift(application);
      this.$store.commit('SET_APPLICATIONS', this.applications);
      localStorage.setItem('applications', JSON.stringify(this.applications));
    },
  },
  computed: {
    OperationConfirmation(){
      return this.$store.getters.CONFIRMATION;
    },
  },
  beforeMount() {
    if (!JSON.parse(localStorage.getItem('applications'))) {
      localStorage.setItem('applications', JSON.stringify(this.applications));
    } else {
      this.applications = JSON.parse(localStorage.getItem('applications'));
      this.$store.commit('SET_APPLICATIONS', this.applications);
    }
  }
}
</script>

<style scoped>
.wrapper{
  background-color: #171c28;
  padding: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
h1{
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  color: #fff;
  margin-bottom: 50px;
}
</style>
