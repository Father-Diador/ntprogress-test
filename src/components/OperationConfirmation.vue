<template>
        <div class="background" @click="declineOperation()">
        </div>
        <div class="widget">
        <div class="confirmation__text" v-if="getCurrentOperation">
            <input type="checkbox" v-model="confirmDeal">
            Confirm the operation: <span> {{ getCurrentOperation.amount }} {{ getCurrentOperation.instrument }} </span> for {{ getCurrentOperation.deal_summ}} rubles.
        </div>
        <div class="confirmation__text" v-if="!getCurrentOperation">
            Sorry, this deal is closed.
        </div>
        <div class="application__btn">
            <button class="dec" @click="declineOperation()">Decline</button>
            <button class="acc" v-if="getCurrentOperation" @click="acceptOperation()">Accept</button>
        </div>
        </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDeal: false,
    }
  },
  methods: {
    findById(tree, id) {
        for (let application of tree) {
            if (application.id === id) {
              application.status = 'Filled';
              let date = new Date();
              let year = date.getFullYear();
              let month = date.getMonth() + 1;
              let day = date.getDate();
              if(String(month).length < 2) {
                month = '0' + month;
              }
              let hour = date.getHours();
              let minute = date.getMinutes();
              let second = date.getSeconds();
              let milisecond = date.getMilliseconds();
              application.change_date = day + '.' + month + '.' + year;
              application.change_time = hour + ':' + minute + ':' + second + '.' + milisecond;
              return tree;
            }
        }
        this.$notify('Something went wrong', {
          type: 'danger',
          showIcon: true,
        });
        return false
    },
    declineOperation() {
      this.$store.commit('SET_CONFIRMATION', false);
    },
    acceptOperation() {
      if(this.confirmDeal == true) {
        let new_aplications = this.findById(this.$store.getters.GET_APPLICATIONS, this.$store.getters.CURRENT_OPERATION.id);
        this.$store.commit('SET_APPLICATIONS', new_aplications);
        this.$store.commit('SET_CONFIRMATION', false);
        this.$notify('deal completed', {
          type: 'success',
          showIcon: true,
        });
      }
      else{
        this.$notify('You did not confirm the operation', {
          type: 'danger',
          showIcon: true,
        });
      }
    }
  },
  computed: {
    getCurrentOperation() {
      return this.$store.getters.CURRENT_OPERATION;
    }
  }
}
</script>

<style scoped>
.background{
  top: 0;
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(23, 28, 40, 0.7);
  overflow-y: hidden;
}
.widget{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 50px;
  box-sizing: border-box;
  width: 40%;
  height: 300px;
  background-color: #f6faff;
  border-radius: 15px;
}
.confirmation__text{
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  color: #000;
  line-height: 30px;
}
.confirmation__text span{
  text-decoration: underline;
  color: #cc0000;
}
.application__btn{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
button{
  transition: 0.3s;
  width: 30%;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 15px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}
.dec{
  border: 2px solid #de8d7e;
  background-color: #de8d7e;
  color: #fff;
}
.dec:hover{
  background-color: #fff;
  color: #000;
}
.acc{
  border: 2px solid #66b480;
  background-color: #66b480;
  color: #fff;
}
.acc:hover{
  background-color: #fff;
  color: #000;
}
</style>