(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Cropper = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":8}],2:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    getRawTag = require('./_getRawTag'),
    objectToString = require('./_objectToString');

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;

},{"./_Symbol":1,"./_getRawTag":5,"./_objectToString":6}],3:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":7}],5:[function(require,module,exports){
var Symbol = require('./_Symbol');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;

},{"./_Symbol":1}],6:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;

},{}],7:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],8:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":3}],9:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],10:[function(require,module,exports){
var baseGetTag = require('./_baseGetTag'),
    getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

module.exports = isPlainObject;

},{"./_baseGetTag":2,"./_getPrototype":4,"./isObjectLike":9}],11:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":14}],12:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
},{}],13:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

var _createStore = require('./createStore');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2['default'])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("production" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  if ("production" !== 'production') {
    var unexpectedKeyCache = {};
  }

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if ("production" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2['default'])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
},{"./createStore":15,"./utils/warning":17,"lodash/isPlainObject":10}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}
},{}],15:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports['default'] = createStore;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2['default']] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
}
},{"lodash/isPlainObject":10,"symbol-observable":18}],16:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = require('./combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = require('./bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = require('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("production" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2['default'];
exports.combineReducers = _combineReducers2['default'];
exports.bindActionCreators = _bindActionCreators2['default'];
exports.applyMiddleware = _applyMiddleware2['default'];
exports.compose = _compose2['default'];
},{"./applyMiddleware":11,"./bindActionCreators":12,"./combineReducers":13,"./compose":14,"./createStore":15,"./utils/warning":17}],17:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
},{}],18:[function(require,module,exports){
module.exports = require('./lib/index');

},{"./lib/index":19}],19:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./ponyfill":20}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],21:[function(require,module,exports){
'use strict';

var defaults = {
  aspectRatio: 0,
  cropperMode: 'none',
  dragMode: 'crop',
  movable: true,
  preview: undefined,
  responsive: false,
  toolbar: true,
  zoomable: true
};

module.exports = defaults;

},{}],22:[function(require,module,exports){
'use strict';

// const actions = require('./state/action');

exports.keyEvents = function (actions) {
  return function (e) {
    switch (e.keyCode) {
      case 27:
        // ESC
        actions.clearCropper();
        break;
      default:
        break;
    }
  };
};

exports.mouseEvents = function (actions) {
  /**
   * 没有考虑 触摸板 或 触摸屏 的情况
   * 仅仅是鼠标点击事件
   */
  return function mouseEvents(e) {
    var pageXOffset = window.pageXOffset;
    var pageYOffset = window.pageYOffset;
    var x = e.clientX + pageXOffset;
    var y = e.clientY + pageYOffset;
    switch (e.type) {
      case 'mousedown':
        actions.cropperBorderStart(x, y);
        break;
      case 'mouseup':
        actions.cropperBorderEnd();
        break;
      case 'mousemove':
        actions.cropperBorderMove(x, y);
        break;
      default:
        break;
    }
    e.preventDefault();
  };
};

},{}],23:[function(require,module,exports){
'use strict';

function getBorderRestrict(cropperMode, containerElement) {
  var bStyle, startX, startY, endX, endY;
  if (cropperMode === 'border') {
    bStyle = getComputedStyle(containerElement);
    startX = 0;
    startY = 0;
    endX = parseFloat(bStyle.width);
    endY = parseFloat(bStyle.height);
  } else if (cropperMode === 'image') {
    bStyle = getComputedStyle(containerElement.firstChild);
    startX = parseFloat(bStyle.left);
    startY = parseFloat(bStyle.top);
    endX = startX + parseFloat(bStyle.width);
    endY = startY + parseFloat(bStyle.height);
  } else {
    startX = Number.MIN_VALUE;
    startY = Number.MIN_VALUE;
    endX = Number.MAX_VALUE;
    endY = Number.MAX_VALUE;
  }
  return { startX: startX, startY: startY, endX: endX, endY: endY };
}

function getComputedStyle(ele) {
  return ele.ownerDocument.defaultView.getComputedStyle(ele);
}

function getElementOffset(ele) {
  var offsetLeft = 0;
  var offsetTop = 0;
  while (ele) {
    offsetLeft += ele.offsetLeft;
    offsetTop += ele.offsetTop;
    ele = ele.offsetParent;
  }
  return { left: offsetLeft, top: offsetTop };
}

function inRange(x, y, cx, cy) {
  return Math.abs(cx - x) <= 5 && Math.abs(cy - y) <= 5;
}

function normalizeCoordinateDuringMoveCropper(cropperStartX, cropperStartY, cropperEndX, cropperEndY, cropperMode, containerElement) {
  var subX = 0;
  var subY = 0;
  var border = getBorderRestrict(cropperMode, containerElement);
  if (cropperStartX < border.startX) {
    subX = cropperStartX - border.startX;
  }
  if (cropperStartY < border.startY) {
    subY = cropperStartY - border.startY;
  }
  if (cropperEndX > border.endX) {
    subX = cropperEndX - border.endX;
  }
  if (cropperEndY > border.endY) {
    subY = cropperEndY - border.endY;
  }
  return { cropperStartX: cropperStartX - subX, cropperStartY: cropperStartY - subY, cropperEndX: cropperEndX - subX, cropperEndY: cropperEndY - subY };
}

function normalizeCoordinateDuringMoveImage(imgStartX, imgStartY, cropperStartX, cropperStartY, cropperEndX, cropperEndY, cropperMode, containerElement) {
  if (cropperMode === 'image') {
    var imgStyle = getComputedStyle(containerElement.firstChild);
    var imgEndX = imgStartX + parseFloat(imgStyle.width);
    var imgEndY = imgStartY + parseFloat(imgStyle.height);
    if (imgStartX > cropperStartX) {
      imgStartX = cropperStartX;
    }
    if (imgStartY > cropperStartY) {
      imgStartY = cropperStartY;
    }
    if (imgEndX < cropperEndX) {
      imgStartX += cropperEndX - imgEndX;
    }
    if (imgEndY < cropperEndY) {
      imgStartY += cropperEndY - imgEndY;
    }
  }
  return { leftOffset: imgStartX, topOffset: imgStartY };
}

function normalizeCoordinateDuringResize(sx, sy, ex, ey, ordX, ordY, ratio, cropperMode, containerElement) {
  var border = getBorderRestrict(cropperMode, containerElement);
  var cords = { cropperStartX: sx, cropperStartY: sy, cropperEndX: ex, cropperEndY: ey };
  cords.cropperStartX = Math.min(Math.max(cords.cropperStartX, border.startX), border.endX);
  cords.cropperEndX = Math.min(Math.max(cords.cropperEndX, border.startX), border.endX);
  cords.cropperStartY = Math.min(Math.max(cords.cropperStartY, border.startY), border.endY);
  cords.cropperEndY = Math.min(Math.max(cords.cropperEndY, border.startY), border.endY);
  if (ratio <= 0) {
    return cords;
  }
  var subX = cords.cropperEndX - cords.cropperStartX;
  var subY = cords.cropperEndY - cords.cropperStartY;
  var positiveX = subX > 0 ? 1 : -1;
  var positiveY = subY > 0 ? 1 : -1;
  subX = Math.abs(subX);
  subY = Math.abs(subY);
  if (subX / ratio <= subY) {
    subY = subX / ratio;
    if (ordY === -1) {
      cords.cropperStartY = cords.cropperEndY - subY * positiveY;
    } else {
      cords.cropperEndY = cords.cropperStartY + subY * positiveY;
    }
  } else {
    subX = subY * ratio;
    if (ordX === -1) {
      cords.cropperStartX = cords.cropperEndX - subX * positiveX;
    } else {
      cords.cropperEndX = cords.cropperStartX + subX * positiveX;
    }
  }
  return cords;
}

function normalizeCoordinateDuringCrop(sx, sy, ex, ey, ratio, cropperMode, containerElement) {
  return normalizeCoordinateDuringResize(sx, sy, ex, ey, 0, 0, ratio, cropperMode, containerElement);
}

exports.getComputedStyle = getComputedStyle;
exports.getElementOffset = getElementOffset;
exports.inRange = inRange;
exports.normalizeCoordinateDuringMoveCropper = normalizeCoordinateDuringMoveCropper;
exports.normalizeCoordinateDuringMoveImage = normalizeCoordinateDuringMoveImage;
exports.normalizeCoordinateDuringResize = normalizeCoordinateDuringResize;
exports.normalizeCoordinateDuringCrop = normalizeCoordinateDuringCrop;

},{}],24:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Actions = require('./state/action');

var _viewRender = require('./render');

var _events = require('./events');
var _keyEvents = _events.keyEvents;
var _mouseEvents = _events.mouseEvents;

var ImageCropper = function ImageCropper(options) {
  var _this = this;

  _classCallCheck(this, ImageCropper);

  this.actions = new Actions();
  this.actions.setOptions(options);
  var curState = this.actions.getState();
  this.initCropper(curState.options);
  this.actions.subscribe(function () {
    _this.draw();
  });
  window.addEventListener('resize', function () {
    _this.onresize();
  });
  var keyEvents = _keyEvents(this.actions);
  var mouseEvents = _mouseEvents(this.actions);
  window.document.addEventListener('keydown', keyEvents);
  this.rootElement.addEventListener('mousedown', mouseEvents);
  this.rootElement.addEventListener('mousemove', mouseEvents);
  this.rootElement.addEventListener('mouseup', mouseEvents);
};

;

Object.assign(ImageCropper.prototype, _viewRender);

module.exports = ImageCropper;

},{"./events":22,"./render":25,"./state/action":26}],25:[function(require,module,exports){
'use strict';

/**
 *
 * var actions = undefined;
 * var rootElement = undefined,
 *   containerElement = undefined,
 *   toolbarElement = undefined,
 *   showToolbarElement = undefined,
 *   containerElementStyle = undefined,
 *   sourceImage = undefined,
 *   previewCanvas = undefined,
 *   previewContext = undefined;
 * var srcImageWidth, srcImageHeight,
 *   previewCanvasWidth, previewCanvasHeight;
 * var handlerTopLeft, handlerTopCenter, handlerTopRight, handlerRightCenter,
 *   handlerBottomRight, handlerBottomCenter, handlerBottomLeft, handlerLeftCenter;
 *   var coverTopLeft, coverTopCenter, coverTopRight, coverRightCenter,
 *   coverBottomRight, coverBottomCenter, coverBottomLeft, coverLeftCenter, coverCenterCenter;
 *
 */

var getComputedStyle = require('./helper').getComputedStyle;
var getElementOffset = require('./helper').getElementOffset;

var toolbarButtons = {
  movePhoto: {
    name: '移动图片',
    className: 'fa fa-arrows',
    action: setModeMove,
    state: 'movable'
  },
  crop: {
    name: '剪裁',
    className: 'fa fa-crop',
    action: setModeCrop
  },
  zoomOut: {
    name: '放大',
    className: 'fa fa-search-plus',
    action: photoZoomOut,
    state: 'zoomable'
  },
  zoomIn: {
    name: '缩小',
    className: 'fa fa-search-minus',
    action: photoZoomIn,
    state: 'zoomable'
  },
  clear: {
    name: '清除',
    className: 'fa fa-times',
    action: clear
  },
  reset: {
    name: '重置',
    className: 'fa fa-refresh',
    action: reset
  },
  hide: {
    name: '隐藏工具栏',
    className: 'fa fa-caret-down',
    action: hideToolbar
  }
};

function clear() {
  this.actions.clearCropper();
}

function clearCropper() {
  var handlers = this.containerElement.getElementsByClassName('cropper-handler');
  handlers = Array.from(handlers);
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var h = _step.value;

      h.style.display = 'none';
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var covers = this.containerElement.getElementsByClassName('cropper-cover');
  covers = Array.from(covers);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = covers[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var c = _step2.value;

      c.style.display = 'none';
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

function repositionImage() {
  var container = this.containerElement;
  var ele = container.firstChild;
  var cStyle = getComputedStyle(container);
  var cWidth = parseInt(cStyle.width);
  var cHeight = parseInt(cStyle.height);
  var sWidth = this.srcImageWidth;
  var sHeight = this.srcImageHeight;
  var tWidth, tHeight, tTop, tLeft;
  if (sWidth > sHeight) {
    tWidth = sWidth * cHeight / sHeight;
    tHeight = cHeight;
    tTop = 0;
    tLeft = (cWidth - tWidth) / 2;
  } else {
    tWidth = cWidth;
    tHeight = sHeight * cWidth / sWidth;
    tTop = (cHeight - tHeight) / 2;
    tLeft = 0;
  }
  ele.style.width = tWidth + 'px';
  ele.style.height = tHeight + 'px';
  ele.style.left = tLeft + 'px';
  ele.style.top = tTop + 'px';
}

function reset() {
  this.repositionImage();
  this.clear();
}

function createIcon(options) {
  var ele = document.createElement('a');
  ele.className = options.className;
  if (typeof options.action === 'function') {
    var that = this;
    ele.addEventListener('click', function (e) {
      options.action.call(that);
      e.stopPropagation();
    });
    ele.addEventListener('mousedown', function (e) {
      e.stopPropagation();
    });
    ele.addEventListener('mouseup', function (e) {
      e.stopPropagation();
    });
    ele.addEventListener('mousemove', function (e) {
      e.stopPropagation();
    });
  }
  return ele;
}

function draw() {
  var state = this.actions.getState();
  this.containerElement.style.cursor = state.rootCursor;
  if (state.dragTarget === 'image') {
    var img = this.containerElement.firstChild;
    img.style.top = state.topOffset + 'px';
    img.style.left = state.leftOffset + 'px';
  }
  if (state.options.preview) {
    this.drawPreview(state);
  }
  switch (state.dragMode) {
    case 'crop':
    case 'move':
      var sX = state.cropperStartX;
      var sY = state.cropperStartY;
      var eX = state.cropperEndX;
      var eY = state.cropperEndY;
      if (sX === -1 || sY === -1 || eX === -1 || eY === -1) {
        return;
      }
      return this.drawCropper(sX, sY, eX, eY);
    default:
      return this.clearCropper();
  }
};

function drawCovers(startX, startY, endX, endY) {
  if (!this.coverTopLeft) {
    this.coverTopLeft = document.createElement('div');
    this.coverTopLeft.className = 'cropper-cover cropper-cover-top-left';
    this.containerElement.appendChild(this.coverTopLeft);
  }
  if (!this.coverTopCenter) {
    this.coverTopCenter = document.createElement('div');
    this.coverTopCenter.className = 'cropper-cover cropper-cover-top-center';
    this.containerElement.appendChild(this.coverTopCenter);
  }
  if (!this.coverTopRight) {
    this.coverTopRight = document.createElement('div');
    this.coverTopRight.className = 'cropper-cover cropper-cover-top-right';
    this.containerElement.appendChild(this.coverTopRight);
  }
  if (!this.coverRightCenter) {
    this.coverRightCenter = document.createElement('div');
    this.coverRightCenter.className = 'cropper-cover cropper-cover-right-center';
    this.containerElement.appendChild(this.coverRightCenter);
  }
  if (!this.coverBottomRight) {
    this.coverBottomRight = document.createElement('div');
    this.coverBottomRight.className = 'cropper-cover cropper-cover-bottom-right';
    this.containerElement.appendChild(this.coverBottomRight);
  }
  if (!this.coverBottomCenter) {
    this.coverBottomCenter = document.createElement('div');
    this.coverBottomCenter.className = 'cropper-cover cropper-cover-bottom-center';
    this.containerElement.appendChild(this.coverBottomCenter);
  }
  if (!this.coverBottomLeft) {
    this.coverBottomLeft = document.createElement('div');
    this.coverBottomLeft.className = 'cropper-cover cropper-cover-bottom-left';
    this.containerElement.appendChild(this.coverBottomLeft);
  }
  if (!this.coverLeftCenter) {
    this.coverLeftCenter = document.createElement('div');
    this.coverLeftCenter.className = 'cropper-cover cropper-cover-left-center';
    this.containerElement.appendChild(this.coverLeftCenter);
  }
  if (!this.coverCenterCenter) {
    this.coverCenterCenter = document.createElement('div');
    this.coverCenterCenter.className = 'cropper-cover cropper-cover-center-center';
    this.containerElement.appendChild(this.coverCenterCenter);
  }
  var rect = this.containerElement.getBoundingClientRect();
  var rootWidth = rect.width;
  var rootHeight = rect.height;
  setCropperCoverStyle(this.coverTopLeft, 0, 0, startX, startY);
  setCropperCoverStyle(this.coverTopCenter, 0, startX, endX - startX, startY);
  setCropperCoverStyle(this.coverTopRight, 0, endX, rootWidth - endX, startY);
  setCropperCoverStyle(this.coverRightCenter, startY, endX, rootWidth - endX, endY - startY);
  setCropperCoverStyle(this.coverBottomRight, endY, endX, rootWidth - endX, rootHeight - endY);
  setCropperCoverStyle(this.coverBottomCenter, endY, startX, endX - startX, rootHeight - endY);
  setCropperCoverStyle(this.coverBottomLeft, endY, 0, startX, rootHeight - endY);
  setCropperCoverStyle(this.coverLeftCenter, startY, 0, startX, endY - startY);
  setCropperCoverStyle(this.coverCenterCenter, startY, startX, endX - startX, endY - startY);
}

function drawCropper(x1, y1, x2, y2) {
  var startX = Math.min(x1, x2);
  var startY = Math.min(y1, y2);
  var endX = Math.max(x1, x2);
  var endY = Math.max(y1, y2);
  if (endY - startY < 10 && endX - startX < 10) return;
  this.drawCovers(startX, startY, endX, endY);
  this.drawHandlers(startX, startY, endX, endY);
}

function drawHandlers(startX, startY, endX, endY) {
  if (!this.handlerTopLeft) {
    this.handlerTopLeft = document.createElement('span');
    this.handlerTopLeft.className = 'cropper-handler cropper-handler-top-left';
    this.containerElement.appendChild(this.handlerTopLeft);
  }
  if (!this.handlerTopCenter) {
    this.handlerTopCenter = document.createElement('span');
    this.handlerTopCenter.className = 'cropper-handler cropper-handler-top-center';
    this.containerElement.appendChild(this.handlerTopCenter);
  }
  if (!this.handlerTopRight) {
    this.handlerTopRight = document.createElement('span');
    this.handlerTopRight.className = 'cropper-handler cropper-handler-top-right';
    this.containerElement.appendChild(this.handlerTopRight);
  }
  if (!this.handlerRightCenter) {
    this.handlerRightCenter = document.createElement('span');
    this.handlerRightCenter.className = 'cropper-handler cropper-handler-right-center';
    this.containerElement.appendChild(this.handlerRightCenter);
  }
  if (!this.handlerBottomRight) {
    this.handlerBottomRight = document.createElement('span');
    this.handlerBottomRight.className = 'cropper-handler cropper-handler-bottom-right';
    this.containerElement.appendChild(this.handlerBottomRight);
  }
  if (!this.handlerBottomCenter) {
    this.handlerBottomCenter = document.createElement('span');
    this.handlerBottomCenter.className = 'cropper-handler cropper-handler-bottom-center';
    this.containerElement.appendChild(this.handlerBottomCenter);
  }
  if (!this.handlerBottomLeft) {
    this.handlerBottomLeft = document.createElement('span');
    this.handlerBottomLeft.className = 'cropper-handler cropper-handler-bottom-left';
    this.containerElement.appendChild(this.handlerBottomLeft);
  }
  if (!this.handlerLeftCenter) {
    this.handlerLeftCenter = document.createElement('span');
    this.handlerLeftCenter.className = 'cropper-handler cropper-handler-left-center';
    this.containerElement.appendChild(this.handlerLeftCenter);
  }
  setCropperHandlerStyle(this.handlerTopLeft, startY - 2, startX - 2);
  setCropperHandlerStyle(this.handlerTopCenter, startY - 2, (startX + endX) / 2);
  setCropperHandlerStyle(this.handlerTopRight, startY - 2, endX - 4);
  setCropperHandlerStyle(this.handlerRightCenter, (startY + endY) / 2, endX - 4);
  setCropperHandlerStyle(this.handlerBottomRight, endY - 4, endX - 4);
  setCropperHandlerStyle(this.handlerBottomCenter, endY - 4, (startX + endX) / 2);
  setCropperHandlerStyle(this.handlerBottomLeft, endY - 4, startX - 2);
  setCropperHandlerStyle(this.handlerLeftCenter, (startY + endY) / 2, startX - 2);
}

function drawPreview(state) {
  if (!this.previewContext) return;

  var _getSelectedRect = this.getSelectedRect(state),
      srcX = _getSelectedRect.x,
      srcY = _getSelectedRect.y,
      srcWidth = _getSelectedRect.width,
      srcHeight = _getSelectedRect.height;

  if (srcWidth <= 10 || srcHeight <= 10) {
    this.clearCropper();
    this.previewContext.clearRect(0, 0, this.previewCanvasWidth, this.previewCanvasHeight);
    return;
  }
  //
  var dx, dy, dWidth, dHeight;
  // 横向画满
  if (this.previewCanvasWidth / srcWidth * srcHeight <= this.previewCanvasHeight) {
    dWidth = this.previewCanvasWidth;
    dHeight = this.previewCanvasWidth / srcWidth * srcHeight;
    dx = 0;
    dy = (this.previewCanvasHeight - dHeight) / 2;
  } else {
    dWidth = this.previewCanvasHeight / srcHeight * srcWidth;
    dHeight = this.previewCanvasHeight;
    dx = (this.previewCanvasWidth - dWidth) / 2;
    dy = 0;
  }
  this.previewContext.clearRect(0, 0, this.previewCanvasWidth, this.previewCanvasHeight);
  this.previewContext.drawImage(this.sourceImage, srcX, srcY, srcWidth, srcHeight, dx, dy, dWidth, dHeight);
}

function getImage() {
  var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'image/png';

  var _getSelectedRect2 = this.getSelectedRect(),
      srcX = _getSelectedRect2.x,
      srcY = _getSelectedRect2.y,
      srcWidth = _getSelectedRect2.width,
      srcHeight = _getSelectedRect2.height;

  if (srcWidth <= 10 || srcHeight <= 10) return;
  var canvas = document.createElement('canvas');
  canvas.setAttribute('width', srcWidth);
  canvas.setAttribute('height', srcHeight);
  var ctx = canvas.getContext('2d');
  ctx.drawImage(this.sourceImage, srcX, srcY, srcWidth, srcHeight, 0, 0, srcWidth, srcHeight);
  return canvas.toDataURL(type);
}

function getSelectedRect(state) {
  state = state || this.actions.getState();
  var s = getComputedStyle(this.containerElement.firstChild);
  var tWidth = parseInt(s.width);
  var tHeight = parseInt(s.height);
  var tTop = parseInt(s.top) || 0;
  var tLeft = parseInt(s.left) || 0;
  var sX = Math.min(state.cropperStartX, state.cropperEndX);
  var sY = Math.min(state.cropperStartY, state.cropperEndY);
  var eX = Math.max(state.cropperStartX, state.cropperEndX);
  var eY = Math.max(state.cropperStartY, state.cropperEndY);
  var ratioX = this.srcImageWidth / tWidth;
  var ratioY = this.srcImageHeight / tHeight;
  var srcX = (-tLeft + sX) * ratioX;
  var srcY = (-tTop + sY) * ratioY;
  var srcWidth = (eX - sX) * ratioX;
  var srcHeight = (eY - sY) * ratioY;
  return { x: srcX, y: srcY, width: srcWidth, height: srcHeight };
}

function showToolbar() {
  this.showToolbarElement.style.display = 'none';
  this.toolbarElement.style.display = 'flex';
}

function hideToolbar() {
  this.toolbarElement.style.display = 'none';
  this.showToolbarElement.style.display = 'inline-block';
}

function initCropper(options) {
  var _this = this;

  injectFontAwesome();
  var ele = options.element;
  if (!ele) {
    throw new Error('没有指定目标节点');
  }
  this.rootElement = document.createElement('div');
  this.rootElement.className = 'cropper-container';
  this.containerElement = document.createElement('div');
  this.containerElement.className = 'cropper-img-container';
  var parent = ele.parentNode;
  parent.removeChild(ele);
  this.containerElement.appendChild(ele);
  this.rootElement.appendChild(this.containerElement);
  //
  parent.appendChild(this.rootElement);
  // tool bar
  ele.onload = function () {
    // preview or get image canvas
    _this.sourceImage = new Image();
    var that = _this;
    _this.sourceImage.onload = function () {
      that.srcImageWidth = that.sourceImage.width;
      that.srcImageHeight = that.sourceImage.height;
      //
      that.initCropperStyle();
      if (options.toolbar) {
        that.toolbarElement = document.createElement('div');
        that.toolbarElement.className = 'cropper-toolbar';
        for (var item in toolbarButtons) {
          if (toolbarButtons[item].state && !options[toolbarButtons[item].state]) {
            continue;
          }
          that.toolbarElement.appendChild(createIcon.call(that, toolbarButtons[item]));
        }
        that.rootElement.appendChild(that.toolbarElement);
        // showToolbarElement
        that.showToolbarElement = document.createElement('div');
        that.showToolbarElement.className = 'cropper-toolbar cropper-toolbar-show';
        var showToolbarIcon = that.createIcon({ name: '显示工具栏', className: 'fa fa-caret-up', action: showToolbar });
        that.showToolbarElement.appendChild(showToolbarIcon);
        that.showToolbarElement.style.display = 'none';
        that.rootElement.appendChild(that.showToolbarElement);
      }
      // canvas
      that.previewCanvas = document.createElement('canvas');
      that.previewCanvas.className = 'cropper-preview-canvas';
      if (options.preview) {
        options.preview.appendChild(that.previewCanvas);
        var ps = getComputedStyle(options.preview);
        that.previewCanvasWidth = parseInt(ps.width);
        that.previewCanvasHeight = parseInt(ps.height);
      } else {
        that.previewCanvasWidth = that.srcImageWidth;
        that.previewCanvasHeight = that.srcImageHeight;
      }
      that.previewCanvas.setAttribute('width', that.previewCanvasWidth);
      that.previewCanvas.setAttribute('height', that.previewCanvasHeight);
      that.previewContext = that.previewCanvas.getContext('2d');
      that.repositionImage();
    };
    _this.sourceImage.src = ele.src;
  };
  this.actions.setContainerElement(this.containerElement);
  return this.containerElement;
}

function initCropperStyle() {
  var root = this.rootElement.parentNode;
  var img = this.containerElement.firstChild;
  var ratio = this.srcImageWidth / this.srcImageHeight;
  var styles = ['width', /* 'height', */
  'paddingLeft', 'paddingTop', 'paddingRight', 'paddingBottom', 'marginLeft', 'marginTop', 'marginRight', 'marginBottom'];
  var computedStyle = getComputedStyle(root);
  var newWidth = parseFloat(computedStyle.width);
  var newHeight = newWidth / ratio;
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = styles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var k = _step3.value;

      this.rootElement.style[k] = computedStyle[k];
      this.containerElement.style[k] = computedStyle[k];
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  img.style.position = 'absolute';
  img.style.width = this.containerElement.style.width;
  root.style.height = newHeight + 'px';
  this.rootElement.style.height = newHeight + 'px';
  this.containerElement.style.height = newHeight + 'px';
  img.style.height = newHeight + 'px';
  this.repositionImage();
}

function injectFontAwesome() {
  var inject = true;
  var styleSheets = window.document.styleSheets;
  for (var i = 0; i < styleSheets.length; i++) {
    if (!styleSheets[i].href) {
      continue;
    }
    if (styleSheets[i].href.indexOf('font-awesome') > -1) {
      inject = false;
      break;
    }
  }
  if (inject) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css';
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

function onresize() {
  this.clear();
  this.initCropperStyle();
}

function photoZoom(percent) {
  var state = this.actions.getState();
  if (!state.options.zoomable) {
    throw new Error('The photo is unzommable');
  }
  var ele = this.containerElement.firstChild;
  var cs = getComputedStyle(this.containerElement);
  var cw = parseInt(cs.width);
  var ch = parseInt(cs.height);
  var es = getComputedStyle(ele);
  var ew = parseInt(es.width);
  var eh = parseInt(es.height);
  var ept = parseInt(es.top);
  var epl = parseInt(es.left);
  var cx = -epl + cw / 2;
  var cy = -ept + ch / 2;
  var newW = ew + cw * percent;
  var newH = eh + ch * percent;
  if (newW <= 20 || newH <= 20) {
    return;
  }
  var newL = newW * (cx / ew) - cw / 2;
  var newT = newH * (cy / eh) - ch / 2;
  ele.style.width = newW + 'px';
  ele.style.height = newH + 'px';
  ele.style.left = -newL + 'px';
  ele.style.top = -newT + 'px';
  this.actions.repositionCropper();
}

function photoZoomOut() {
  this.photoZoom(0.1);
}

function photoZoomIn() {
  this.photoZoom(-0.1);
}

function setCropperCoverStyle(cover, top, left, width, height) {
  cover.style.top = top + 'px';
  cover.style.left = left + 'px';
  cover.style.width = width + 'px';
  cover.style.height = height + 'px';
  cover.style.display = 'block';
}

function setCropperHandlerStyle(handler, top, left) {
  handler.style.top = top + 'px';
  handler.style.left = left + 'px';
  handler.style.display = 'block';
}

function setModeCrop() {
  this.toggleMode('crop');
}

function setModeMove() {
  var state = this.actions.getState();
  if (!state.options.movable) {
    throw new Error('The cropper is unmovable');
  }
  var img = this.containerElement.firstChild;
  var s = getComputedStyle(img);
  var top = parseInt(s.top) || 0;
  var left = parseInt(s.left) || 0;
  this.toggleMode('move', { top: top, left: left });
}

function toggleMode(mode) {
  var extras = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  this.actions.toggleMode(mode, extras);
}

exports.clear = clear;
exports.clearCropper = clearCropper;
exports.createIcon = createIcon;
exports.draw = draw;
exports.drawCovers = drawCovers;
exports.drawCropper = drawCropper;
exports.drawHandlers = drawHandlers;
exports.drawPreview = drawPreview;
exports.getElementOffset = getElementOffset;
exports.getImage = getImage;
exports.getSelectedRect = getSelectedRect;
exports.hideToolbar = hideToolbar;
exports.initCropper = initCropper;
exports.initCropperStyle = initCropperStyle;
exports.onresize = onresize;
exports.photoZoom = photoZoom;
exports.photoZoomIn = photoZoomIn;
exports.photoZoomOut = photoZoomOut;
exports.repositionImage = repositionImage;
exports.setModeCrop = setModeCrop;
exports.setModeMove = setModeMove;
exports.showToolbar = showToolbar;
exports.toggleMode = toggleMode;

},{"./helper":23}],26:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var createStore = require('redux').createStore;
var reducer = require('./reducer');

var Actions = function () {
  function Actions() {
    _classCallCheck(this, Actions);

    this.__unsubscribe = undefined;
    this.store = createStore(reducer);
  }

  _createClass(Actions, [{
    key: 'clearCropper',
    value: function clearCropper() {
      this.store.dispatch({ type: 'CLEAR_CROPPER' });
    }
  }, {
    key: 'cropperBorderEnd',
    value: function cropperBorderEnd() {
      this.store.dispatch({ type: 'CROPPER_BORDER_END' });
    }
  }, {
    key: 'cropperBorderMove',
    value: function cropperBorderMove(x, y) {
      this.store.dispatch({ type: 'CROPPER_BORDER_MOVE', x: x, y: y });
    }
  }, {
    key: 'cropperBorderStart',
    value: function cropperBorderStart(x, y) {
      this.store.dispatch({ type: 'CROPPER_BORDER_START', x: x, y: y });
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.store.getState();
    }
  }, {
    key: 'setContainerElement',
    value: function setContainerElement(ele) {
      this.store.dispatch({ type: 'SET_CONTAINER_ELEMENT', element: ele });
    }
  }, {
    key: 'setOptions',
    value: function setOptions(options) {
      this.store.dispatch({ type: 'SET_OPTIONS', options: options });
    }
  }, {
    key: 'toggleMode',
    value: function toggleMode(mode) {
      var extras = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      console.log(mode);
      console.log(extras);
      this.store.dispatch({ type: 'SET_MODE', mode: mode, extras: extras });
    }
  }, {
    key: 'repositionCropper',
    value: function repositionCropper() {
      this.store.dispatch({ type: 'REPOSITION_CROPPER' });
    }
  }, {
    key: 'reset',
    value: function reset() {
      alert('reset');
    }
  }, {
    key: 'subscribe',
    value: function subscribe(updateFunc) {
      this.unsubscribe();
      this.__unsubscribe = this.store.subscribe(updateFunc);
    }
  }, {
    key: 'unsubscribe',
    value: function unsubscribe() {
      if (this.__unsubscribe) {
        this.__unsubscribe();
        this.__unsubscribe = undefined;
      }
    }
  }]);

  return Actions;
}();

;

module.exports = Actions;

},{"./reducer":27,"redux":16}],27:[function(require,module,exports){
'use strict';

var defaultOptions = require('../defaults');

var getComputedStyle = require('../helper').getComputedStyle;
var getElementOffset = require('../helper').getElementOffset;
var inRange = require('../helper').inRange;
var normalizeCoordinateDuringMoveCropper = require('../helper').normalizeCoordinateDuringMoveCropper;
var normalizeCoordinateDuringMoveImage = require('../helper').normalizeCoordinateDuringMoveImage;
var normalizeCoordinateDuringCrop = require('../helper').normalizeCoordinateDuringCrop;
var normalizeCoordinateDuringResize = require('../helper').normalizeCoordinateDuringResize;

var defaultStates = {
  options: defaultOptions,

  // container element
  containerElement: null,

  // cropper border coordinations
  isCropDown: false,
  cropperStartX: -1,
  cropperStartY: -1,
  cropperEndX: -1,
  cropperEndY: -1,
  // drag point
  isDragDown: false,
  // ['top-left', 'top-center', 'top-right', 'right-center', 'bottom-right', 'bottom-center', 'bottom-left', 'left-center']
  dragPoint: '',
  // ['image', 'cropper', 'none']
  dragTraget: 'none',
  dragStartX: -1,
  dragStartY: -1,
  topOffset: -1,
  leftOffset: -1,
  // cropper point move mode: ["crop", "move", "none"], default "none"
  dragMode: 'none',
  //
  rootCursor: 'default'
};

function cropperBorderEnd(state, action) {
  if (state.isCropDown) {
    var sX = Math.min(state.cropperStartX, state.cropperEndX);
    var sY = Math.min(state.cropperStartY, state.cropperEndY);
    var eX = Math.max(state.cropperStartX, state.cropperEndX);
    var eY = Math.max(state.cropperStartY, state.cropperEndY);
    return Object.assign({}, state, { isCropDown: false, cropperStartX: sX, cropperStartY: sY, cropperEndX: eX, cropperEndY: eY });
  }if (state.isDragDown) {
    return Object.assign({}, state, { isDragDown: false, dragTarget: 'none' });
  } else {
    return Object.assign({}, state);
  }
}

function cropperBorderMove(state, action) {
  if (!state.containerElement) return state;
  var ele = state.containerElement;
  var cropperMode = state.options.cropperMode;
  var offset = getElementOffset(state.containerElement);
  action.x -= offset.left;
  action.y -= offset.top;
  var cords;
  if (state.isCropDown) {
    cords = normalizeCoordinateDuringCrop(state.cropperStartX, state.cropperStartY, action.x, action.y, state.options.aspectRatio, cropperMode, ele);
    return Object.assign({}, state, cords);
  } else if (state.isDragDown) {
    var subX = state.dragStartX - action.x;
    var subY = state.dragStartY - action.y;
    var aspectRatio = state.options.aspectRatio;
    if (state.dragTarget === 'cropper') {
      switch (state.dragPoint) {
        case 'top-left':
          cords = normalizeCoordinateDuringResize(state._cropperStartX - subX, state._cropperStartY - subY, state.cropperEndX, state.cropperEndY, -1, -1, aspectRatio, cropperMode, ele);
          break;
        case 'top-center':
          // cords = aspectRatio == 0 ? { cropperStartY: state._cropperStartY - subY } : {};
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state._cropperStartY - subY, state.cropperEndX, state.cropperEndY, 0, -1, aspectRatio, cropperMode, ele);
          break;
        case 'top-right':
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state._cropperStartY - subY, state._cropperEndX - subX, state.cropperEndY, 1, -1, aspectRatio, cropperMode, ele);
          break;
        case 'right-center':
          // cords = aspectRatio == 0 ? { cropperEndX: state._cropperEndX - subX } : {};
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state.cropperStartY, state._cropperEndX - subX, state.cropperEndY, 1, 0, aspectRatio, cropperMode, ele);
          break;
        case 'bottom-right':
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state.cropperStartY, state._cropperEndX - subX, state._cropperEndY - subY, 1, 1, aspectRatio, cropperMode, ele);
          break;
        case 'bottom-center':
          // cords = aspectRatio == 0 ? { cropperEndY: state._cropperEndY - subY } : {};
          cords = normalizeCoordinateDuringResize(state.cropperStartX, state.cropperStartY, state.cropperEndX, state._cropperEndY - subY, 0, 1, aspectRatio, cropperMode, ele);
          break;
        case 'bottom-left':
          cords = normalizeCoordinateDuringResize(state._cropperStartX - subX, state.cropperStartY, state.cropperEndX, state._cropperEndY - subY, -1, 1, aspectRatio, cropperMode, ele);
          break;
        case 'left-center':
          // cords = aspectRatio == 0 ? { cropperStartX: state._cropperStartX - subX } : {};
          cords = normalizeCoordinateDuringResize(state._cropperStartX - subX, state.cropperStartY, state.cropperEndX, state.cropperEndY, -1, 0, aspectRatio, cropperMode, ele);
          break;
        default:
          cords = normalizeCoordinateDuringMoveCropper(state._cropperStartX - subX, state._cropperStartY - subY, state._cropperEndX - subX, state._cropperEndY - subY, cropperMode, ele);
          break;
      }
      return Object.assign({}, state, cords);
    } else if (state.dragTarget === 'image') {
      var newOffset = normalizeCoordinateDuringMoveImage(state._leftOffset - subX, state._topOffset - subY, state.cropperStartX, state.cropperStartY, state.cropperEndX, state.cropperEndY, cropperMode, ele);
      return Object.assign({}, state, newOffset);
    } else {
      return Object.assign({}, state);
    }
  } else {
    var obj = {};
    var x = action.x;
    var y = action.y;
    var sX = state.cropperStartX;
    var sY = state.cropperStartY;
    var eX = state.cropperEndX;
    var eY = state.cropperEndY;
    if (inRange(x, y, sX, sY) || inRange(x, y, eX, eY)) {
      obj.rootCursor = 'nwse-resize';
    } else if (inRange(x, y, sX, eY) || inRange(x, y, eX, sY)) {
      obj.rootCursor = 'nesw-resize';
    } else if (inRange(x, y, (sX + eX) / 2, sY) || inRange(x, y, (sX + eX) / 2, eY)) {
      obj.rootCursor = 'ns-resize';
    } else if (inRange(x, y, sX, (sY + eY) / 2) || inRange(x, y, eX, (sY + eY) / 2)) {
      obj.rootCursor = 'ew-resize';
    } else if (x > sX && x < eX && y > sY && y < eY) {
      obj.rootCursor = 'move';
    } else {
      if (state.dragMode === 'move') {
        obj.rootCursor = 'move';
      } else {
        obj.rootCursor = 'default';
      }
    }
    return Object.assign({}, state, obj);
  }
}

function cropperBorderStart(state, action) {
  if (!state.containerElement) return state;
  var offset = getElementOffset(state.containerElement);
  action.x -= offset.left;
  action.y -= offset.top;
  if (state.dragMode === 'none') {
    return Object.assign({}, state, { isCropDown: true, cropperStartX: action.x, cropperStartY: action.y, cropperEndX: action.x, cropperEndY: action.y, dragMode: 'crop' });
  } else {
    var obj = {};
    obj.isDragDown = true;
    obj.dragTarget = 'cropper';
    obj.dragStartX = action.x;
    obj.dragStartY = action.y;
    obj._cropperStartX = state.cropperStartX;
    obj._cropperStartY = state.cropperStartY;
    obj._cropperEndX = state.cropperEndX;
    obj._cropperEndY = state.cropperEndY;
    var x = action.x;
    var y = action.y;
    var sX = state.cropperStartX;
    var sY = state.cropperStartY;
    var eX = state.cropperEndX;
    var eY = state.cropperEndY;
    if (inRange(x, y, sX, sY)) {
      obj.dragPoint = 'top-left';
    } else if (inRange(x, y, (sX + eX) / 2, sY)) {
      obj.dragPoint = 'top-center';
    } else if (inRange(x, y, eX, sY)) {
      obj.dragPoint = 'top-right';
    } else if (inRange(x, y, eX, (sY + eY) / 2)) {
      obj.dragPoint = 'right-center';
    } else if (inRange(x, y, eX, eY)) {
      obj.dragPoint = 'bottom-right';
    } else if (inRange(x, y, (sX + eX) / 2, eY)) {
      obj.dragPoint = 'bottom-center';
    } else if (inRange(x, y, sX, eY)) {
      obj.dragPoint = 'bottom-left';
    } else if (inRange(x, y, sX, (sY + eY) / 2)) {
      obj.dragPoint = 'left-center';
    } else if (action.x > sX && action.x < eX && action.y > sY && action.y < eY) {
      obj.dragPoint = '';
    } else {
      if (state.dragMode === 'crop') {
        obj.isDragDown = false;
        obj.dragStartY = -1;
        obj.dragStartY = -1;
        obj.dragPoint = '';
        obj.isCropDown = true;
        obj.cropperStartX = action.x;
        obj.cropperStartY = action.y;
        obj.cropperEndX = action.x;
        obj.cropperEndY = action.y;
      } else {
        obj.isDragDown = true;
        obj.dragTarget = 'image';
        obj.dragStartX = action.x;
        obj.dragStartY = action.y;
        obj._leftOffset = state.leftOffset;
        obj._topOffset = state.topOffset;
      }
    }
    return Object.assign({}, state, obj);
  }
}

function repositionCropper(state) {
  var imgStyle = getComputedStyle(state.containerElement.firstChild);
  var imgStartX = parseFloat(imgStyle.left);
  var imgStartY = parseFloat(imgStyle.top);
  var imgEndX = imgStartX + parseFloat(imgStyle.width);
  var imgEndY = imgStartY + parseFloat(imgStyle.height);
  if (state.cropperStartX >= imgStartX && state.cropperStartX <= imgEndX && state.cropperStartY >= imgStartY && state.cropperStartY <= imgEndY && state.cropperEndX >= imgStartX && state.cropperEndX <= imgEndX && state.cropperEndY >= imgStartY && state.cropperEndY <= imgEndY) {
    return state;
  } else {
    return Object.assign({}, state, { cropperStartX: -1, cropperStartY: -1, cropperEndX: -1, cropperEndY: -1 });
  }
}

var reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultStates;
  var action = arguments[1];

  switch (action.type) {
    case 'CLEAR_CROPPER':
      return Object.assign({}, state, { isCropDown: false, cropperStartX: -1, cropperStartY: -1, cropperEndX: -1, cropperEndY: -1, dragMode: 'none', rootCursor: 'default' });
    case 'CROPPER_BORDER_END':
      return cropperBorderEnd(state, action);
    case 'CROPPER_BORDER_MOVE':
      return cropperBorderMove(state, action);
    case 'CROPPER_BORDER_START':
      return cropperBorderStart(state, action);
    case 'REPOSITION_CROPPER':
      return repositionCropper(state);
    case 'SET_CONTAINER_ELEMENT':
      return Object.assign({}, state, { containerElement: action.element });
    case 'SET_MODE':
      var obj = {};
      obj.dragMode = action.mode;
      var extras = action.extras;
      if (obj.dragMode === 'move') {
        obj.rootCursor = 'move';
        obj.topOffset = extras.top;
        obj.leftOffset = extras.left;
      } else {
        obj.rootCursor = 'default';
      }
      return Object.assign({}, state, obj);
    case 'SET_OPTIONS':
      var newOptions = Object.assign({}, state.options, action.options);
      return Object.assign({}, state, { options: newOptions, dragMode: newOptions.dragMode || state.dragMode });
    default:
      return Object.assign({}, state);
  }
};

module.exports = reducer;

},{"../defaults":21,"../helper":23}]},{},[24])(24)
});