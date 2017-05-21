const createStore = require('redux').createStore;
const reducer = require('./reducer');

class Actions {
  constructor() {
    this.__unsubscribe = undefined;
    this.store = createStore(reducer);
  }
  clearCropper() {
    this.store.dispatch({type: "CLEAR_CROPPER"});
  }
  cropperBorderEnd() {
    this.store.dispatch({type: "CROPPER_BORDER_END"});
  }
  cropperBorderMove(x, y) {
    this.store.dispatch({type: "CROPPER_BORDER_MOVE", x: x, y: y});
  }
  cropperBorderStart(x, y) {
    this.store.dispatch({type: "CROPPER_BORDER_START", x: x, y: y});
  }
  getState() {
    return this.store.getState();
  }
  setOptions(options) {
    this.store.dispatch({type: "SET_OPTIONS", options: options});
  }
  toggleMode(mode, extras = {}) {
    console.log(mode);
    console.log(extras);
    this.store.dispatch({type: "SET_MODE", mode: mode, extras: extras});
  }
  reset() {
    alert("reset");
  }
  subscribe(updateFunc) {
    this.unsubscribe();
    this.__unsubscribe = this.store.subscribe(updateFunc);
  }
  unsubscribe() {
    if (this.__unsubscribe) {
      this.__unsubscribe();
      this.__unsubscribe = undefined;
    }
  }
};

module.exports = Actions;
