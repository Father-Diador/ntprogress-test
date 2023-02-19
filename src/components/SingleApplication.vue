<template>
    <div class="single-application" @click="respondAplication()">
        <div>
          {{ application.creation_date }} <br>
          {{ application.creation_time }}
        </div>
        <div>
          {{ application.change_date }} <br>
          {{ application.change_time }}
          </div>
        <div>{{ application.status }}</div>
        <div>{{ application.side }}</div>
        <div>{{ application.price }}</div>
        <div>{{ application.amount }}</div>
        <div>{{ application.instrument }}</div>
    </div>
</template>

<script>
export default {
  props: {
    application: {
      type: Object,
      required: true,
    },
  },
  methods: {
    respondAplication() {
      if(this.application.status == 'Active') {
        this.$store.commit('SET_CURRENT_OPERATION', this.application);
      } else {
        this.$store.commit('SET_CURRENT_OPERATION', false);
      }
      this.$store.commit('SET_CONFIRMATION', true);
      console.log(this.$store.getters.CURRENT_OPERATION);
    }
  }
}
</script>

<style scoped>
.single-application{
  background-color: #1c202f;
  margin: 10px 0;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  transition: 0.3s;
}
.single-application:hover{
  background-color: #2e354d;
}
.buying-widget{
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 400px;
  background-color: #f6faff;
  border-radius: 15px;
}
.single-application div{
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  width: 14%;
  padding: 20px;
}
</style>