import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    groupFlag: false,
    personFlag: false,
    guideFlag: false,
    isToken: false,
    collapseFlag: false,
    somePdfFlag: false,
    gradesFlag: false,
    mqttUpdate: false,
    sysType: 1,
    partsFlag: false,
    partsFourFlag: false,
    oneTotalFlag: false
  },
  mutations: {
    setUserName(state, data) {
      state.userName = data;
    },
    setGroupFlag(state, data) {
      state.groupFlag = data;
    },
    setGradesFlag(state, data) {
      state.gradesFlag = data;
    },
    setPersonFlag(state, data) {
      state.personFlag = data;
    },
    setGuideFlag(state, data) {
      state.guideFlag = data;
    },
    setSomePdfFlag(state, data) {
      state.somePdfFlag = data;
    },
    setToken(state, data) {
      state.isToken = data;
    },
    setCollapseFlag(state, data) {
      state.collapseFlag = data;
    },
    setSysType(state, data) {
      state.sysType = data;
    },
    setMqttUpdate(state, data) {
      state.mqttUpdate = data;
    },
    setPartsFlag(state, data) {
      state.partsFlag = data;
    },
    setPartsFourFlag(state, data) {
      state.partsFourFlag = data;
    },
    setOneTotalFlag(state, data) {
      state.oneTotalFlag = data;
    }
  },
  getters: {
    getUserName(state) {
      return state.userName;
    },
    getGroupFlag(state) {
      return state.groupFlag;
    },
    getGradesFlag(state) {
      return state.gradesFlag;
    },
    getPersonFlag(state) {
      return state.personFlag;
    },
    getGuideFlag(state) {
      return state.guideFlag;
    },
    getSomePdfFlag(state) {
      return state.somePdfFlag;
    },
    getToken(state) {
      return state.isToken;
    },
    getCollapseFlag(state) {
      return state.collapseFlag;
    },
    getSysType(state) {
      return state.sysType;
    },
    getMqttUpdate(state) {
      return state.mqttUpdate;
    },
    getPartsFlag(state) {
      return state.partsFlag;
    },
    getPartsFourFlag(state) {
      return state.partsFourFlag;
    },
    getOneTotalFlag(state) {
      return state.OneTotalFlag;
    }
  },
  actions: {

  }
})
