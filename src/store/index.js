import { createStore } from 'vuex'

export default createStore({
  state: {
    applications: [
      {id: 1, creation_date: '20.01.2020', creation_time: '14.05.43,34', change_date: 'not completed', change_time: '', status: 'Active', side: 'Buy', price: 91.25, amount: '500 000', instrument: 'GBP', deal_summ: '5400392'},
      {id: 2, creation_date: '20.01.2020', creation_time: '14.05.43,34', change_date: '20.01.2020', change_time: '14.05.43,34', status: 'Filled', side: 'Sell', price: 75.40, amount: '10 000', instrument: 'USD', deal_summ: '5400392'},
      {id: 3, creation_date: '20.01.2020', creation_time: '14.05.43,34', change_date: 'not completed', change_time: '', status: 'Active', side: 'Buy', price: 81.10, amount: '350 000', instrument: 'EUR', deal_summ: '5400392'},
      {id: 4, creation_date: '20.01.2020', creation_time: '14.05.43,34', change_date: 'not completed', change_time: '', status: 'Active', side: 'Buy', price: 77.80, amount: '50 000', instrument: 'USD', deal_summ: '5400392'},
      {id: 5, creation_date: '20.01.2020', creation_time: '14.05.43,34', change_date: 'not completed', change_time: '', status: 'Rejected', side: 'Sell', price: 3.96, amount: '60 000', instrument: 'TRY', deal_summ: '5400392'},
      {id: 6, creation_date: '20.01.2020', creation_time: '14.05.43,34', change_date: 'not completed', change_time: '', status: 'Cancelled', side: 'Sell', price: 79.06, amount: '20 000', instrument: 'EUR', deal_summ: '5400392'},
      {id: 7, creation_date: '20.01.2020', creation_time: '14.05.43,34', change_date: 'not completed', change_time: '', status: 'Cancelled', side: 'Sell', price: 89.79, amount: '30 000', instrument: 'GBP', deal_summ: '5400392'},
      {id: 8, creation_date: '20.01.2020', creation_time: '14.05.43,34', change_date: '20.01.2020', change_time: '14.05.43,34', status: 'Filled', side: 'Buy', price: 77.80, amount: '70 000', instrument: 'USD', deal_summ: '5400392'},
      {id: 9, creation_date: '20.01.2020', creation_time: '14.05.43,34', change_date: '20.01.2020', change_time: '14.05.43,34', status: 'Filled', side: 'Buy', price: 81.10, amount: '100 000', instrument: 'EUR', deal_summ: '5400392'},
    ],
    currencies: [
      {id: 1, value: 'USD', sell_price: '75.40', buy_price: '77.80'},
      {id: 2, value: 'EUR', sell_price: '79.06', buy_price: '81.10'},
      {id: 3, value: 'GBP', sell_price: '89.79', buy_price: '91.25'},
      {id: 4, value: 'TRY', sell_price: '3.96', buy_price: '4.10'},
    ],

    current_operation: [],
    confirmation: false,
  },
  getters: {
    GET_APPLICATIONS: state => {
      return state.applications;
    },
    GET_CURRENCIES: state => {
      return state.currencies;
    },

    CURRENT_OPERATION: state => {
      return state.current_operation;
    },
    CONFIRMATION: state => {
      return state.confirmation;
    }
  },
  mutations: {
    SET_APPLICATIONS: (state, payload) => {
      state.applications = payload;
    },

    SET_CURRENT_OPERATION: (state, payload) => {
      state.current_operation = payload;
    },
    SET_CONFIRMATION: (state, payload) => {
      state.confirmation = payload;
    }
  },
  actions: {
  },
  modules: {
  }
})
