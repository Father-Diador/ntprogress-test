<template>
  <div>
    <h1>Your request</h1>
    <div class="widget">
      <div class="application__position">
        <p>New request</p>
        <SelectValue 
          :currencies="currencies"
          v-model="selectedValue"
          @change="checkValue"
        />
        <input type="number"
          v-model="valuesCount"
          @input="checkValue"
        >
      </div>
      <div class="price-and-btn">
        <div class="price-and-btn__position left">
          <span> 
            {{ this.valuesSellOne }}
          </span>
          <span>
            {{ this.valuesSellPrice }}
          </span>
          <button class="sell-btn" @click="performOperation(1)">SELL</button>
        </div>
        <div class="price-and-btn__position right">
          <span>
            {{ this.valuesBuyOne }}
          </span>
          <span>
            {{ this.valuesBuyPrice }}
          </span>
          <button class="buy-btn" @click="performOperation(2)" data-testid="send-buy-request-button">BUY</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectValue from "./SelectValue";

export default {
  data() {
    return {
      application: {
        creation_time: '',
        change_time: '',
        status: '',
        side: '',
        price: '',
        amount: '',
        instrument: '',
        deal_summ: '',
      },

      selectedValue: '',
      valuesCount: 1,
      side: '',
      valuesSellOne: 0,
      valuesBuyOne: 0,
      valuesSellPrice: 0,
      valuesBuyPrice: 0,
    }
  },
  components: {
    SelectValue,
  },
  props: {
      currencies: {
        type: Array,
        required: true,
      },
    },
    methods: {
      findByValue(tree, valName) {
        for (let val of tree) {
            if (val.value === valName) return val
        }
        return false
      },
      checkValue() {
        if (this.valuesCount < 1){
          this.valuesCount = 1;
        }
        if(this.selectedValue){
          let value_string = this.findByValue(this.currencies, this.selectedValue);
          console.log(value_string);
          this.valuesSellPrice = Math.ceil(Number(value_string.sell_price) * this.valuesCount);
          this.valuesBuyPrice = Math.ceil(Number(value_string.buy_price) * this.valuesCount);
          this.valuesSellOne = Number(value_string.sell_price);
          this.valuesBuyOne = Number(value_string.buy_price);
        }
      },
      performOperation(side) {
        if(this.selectedValue && this.valuesCount > 0) {

          if (side === 1) {
            this.side = 'Sell'
            this.application.price = this.valuesSellOne;
            this.application.deal_summ = this.valuesSellPrice;
          } else {
            this.side = 'Buy'
            this.application.price = this.valuesBuyOne;
            this.application.deal_summ = this.valuesBuyPrice;
          }
          
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

          this.application.id = Date.now();
          this.application.creation_date = day + '.' + month + '.' + year;
          this.application.creation_time = hour + ':' + minute + ':' + second + '.' + milisecond;
          this.application.change_date = 'not complited';
          this.application.status = 'Active';
          this.application.side = this.side;
          this.application.amount = this.valuesCount;
          this.application.instrument = this.selectedValue;


          this.$emit('create', this.application);

          // WEB SOCKET

          // var socket = new WebSocket("ws://ссылка/ws");
          // socket.onopen = function() {
          //   alert("Соединение установлено.");
          // };
          // socket.onclose = function(event) {
          //     if (event.wasClean) {
          //         alert('Соединение закрыто чисто');
          //     } else {
          //         alert('Обрыв соединения');
          //     }
          //     alert('Код: ' + event.code + ' причина: ' + event.reason);
          // };
          // socket.onerror = function(error) {
          //     alert("Ошибка " + error.message);
          // };
          // socket.send(this.application);

          this.valuesCount = 1;
          this.side = '';
          this.application = {
            creation_time: '',
            change_time: '',
            status: '',
            side: '',
            price: '',
            amount: '',
            instrument: '',
          }

          this.$notify('Deal created', {
            type: 'success',
            showIcon: true,
          });

        }
        else{
          this.$notify('Application not completed', {
            type: 'danger',
            showIcon: true,
          });
          return
        }
      }
    }
}
</script>

<style scoped lang="scss">
.widget{
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 400px;
  background-color: #f6faff;
  border-radius: 15px;
}
h1{
    font-size: 20px;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    color: #fff;
    margin-bottom: 30px;
}
.application__position{
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  padding: 20px 20px 10px 20px;
  height: 220px;
}
.application__position p{
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}
select{
  border-radius: 8px;
  padding: 0 10px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  cursor: pointer;
  outline: none;
  border: 2px solid #d6dce6;
}
input{
  border-radius: 8px;
  padding: 0 10px;
  height: 50px;
  text-align: center;
  font-size: 20px;
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  outline: none;
  box-sizing: border-box;
  border: 2px solid #d6dce6;
}
.price-and-btn{
  padding: 10px 20px 20px 20px;
  height: 250px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.price-and-btn__position{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.price-and-btn__position span{
  font-size: 40px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}
.left{
  width: 50%;
  border-right: 1px solid #d6dce6;
  padding-right: 20px;
}
.right{
  width: 50%;
  border-left: 1px solid #d6dce6;
  padding-left: 20px;
}
button{
  transition: 0.3s;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  cursor: pointer;

  font-size: 15px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
}
.sell-btn{
  border: 2px solid #de8d7e;
  background-color: #de8d7e;
  color: #fff;
}
.sell-btn:hover{
  background-color: #fff;
  color: #000;
}
.buy-btn{
  border: 2px solid #66b480;
  background-color: #66b480;
  color: #fff;
}
.buy-btn:hover{
  background-color: #fff;
  color: #000;
}
</style>
