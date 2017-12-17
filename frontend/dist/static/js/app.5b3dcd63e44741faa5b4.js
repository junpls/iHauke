webpackJsonp([0],[
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const dev = "production" !== 'production';

const location = dev ? '/' : '/ihauke/';

/* harmony default export */ __webpack_exports__["a"] = ({
  dev: dev,
  location: location,
  api: {
    scheme: window.location.protocol.slice(0, -1),
    host: dev ? window.location.host.slice(0, -1) + '1' : window.location.host,
    basePath: location + 'v1'
  }
});

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = setAuth;
/* harmony export (immutable) */ __webpack_exports__["e"] = createBoard;
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchBoard;
/* unused harmony export deleteBoard */
/* harmony export (immutable) */ __webpack_exports__["c"] = fetchDebts;
/* harmony export (immutable) */ __webpack_exports__["d"] = createDebt;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_axios___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_axios__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_querystring__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_querystring___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_querystring__);






const axios = __WEBPACK_IMPORTED_MODULE_2_axios___default.a.create({
  baseURL: `${__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].api.scheme}://${__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].api.host}${__WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].api.basePath}`
});

function convertDates(debts, name) {
  debts.forEach(d => {
    d[name] = new Date(d[name]);
  });
}

function setAuth(board, password) {
  __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[board].auth = {
    username: board,
    password: password
  };
  window.localStorage.setItem('pw_' + board, password);
}

async function createBoard(users, password) {
  let response = await axios.request({
    url: '/boards',
    method: 'post',
    data: {
      id: 'new',
      users: users
    },
    auth: {
      username: '',
      password: password
    }
  });
  if (response.status !== 200) {
    return {};
  }
  let board = response.data;
  __WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards, board.id, board);
  setAuth(board.id, password);

  return board;
}

async function fetchBoard(id) {
  let response = await axios.request({
    url: `/boards/${id}`,
    method: 'get',
    auth: __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[id].auth
  });

  let board = response.data;
  convertDates(board.debts, 'timestamp');

  if (__WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards.hasOwnProperty(id)) {
    __WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */].util.extend(__WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[board.id], board);
  } else {
    __WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards, board.id, board);
  }

  return board;
}

async function deleteBoard(id) {
  __WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */].delete(__WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards, id);
}

async function fetchDebts(id, dir, count, offset) {
  let params = {
    direction: dir,
    count: count,
    offset: offset
  };
  let response = await axios.request({
    url: `/boards/${id}/debts?${__WEBPACK_IMPORTED_MODULE_4_querystring___default.a.stringify(params)}`,
    method: 'get',
    auth: __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[id].auth
  });
  if (response.status === 404) {
    console.log('board not found');
  }
  if (response.status !== 200) {
    return {};
  }
  let debts = response.data;
  convertDates(debts, 'timestamp');

  debts.forEach(d => {
    if (__WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[id].debts.every(e => e.timestamp !== d.timestamp)) {
      __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[id].debts.push(d);
    }
  });

  console.log(debts);

  return debts;
}

async function createDebt(id, user, gets, reason) {
  let response = await axios.request({
    url: `/boards/${id}/debts`,
    method: 'post',
    data: {
      user: user,
      gets: gets,
      reason: reason,
      timestamp: new Date()
    },
    auth: __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[id].auth
  });
  if (response.status !== 200) {
    return {};
  }
  let debt = response.data;
  convertDates([debt], 'timestamp');

  __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[id].debts.unshift(debt);
  if (user === 0) {
    __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[id].balance += debt.gets;
  } else {
    __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[id].balance -= debt.gets;
  }

  return debt;
}

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({
  active: 'janfred',
  landscape: true,
  boards: {
    'janfred': {
      users: ['Jan', 'Fred'],
      balance: 1000,
      debts: []
    }
  }
});

/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = (['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg']);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = toMoney;
/* harmony export (immutable) */ __webpack_exports__["a"] = capitalize;
/* unused harmony export hexFrom */
/* unused harmony export hexTo */
/* unused harmony export sleep */
function toMoney(cents) {
  let div = cents / 100 + '';
  let split = div.split('.');
  if (split[1] && split[1].length < 2) {
    split[1] += '0';
  }
  return split.join(',') + '€';
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function hexFrom(num) {
  return num.toString(16);
}

function hexTo(str) {
  return parseInt(str, 16);
}

async function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(64)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(52),
  /* template */
  __webpack_require__(90),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(58)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(53),
  /* template */
  __webpack_require__(83),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 16 */,
/* 17 */,
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Board__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Board___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Board__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Landing__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Landing___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_Landing__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(3);






__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]);

/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  mode: 'history',
  base: __WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].location,
  routes: [{
    path: '/',
    name: 'landing',
    component: __WEBPACK_IMPORTED_MODULE_3__components_Landing___default.a
  }, {
    path: '/b/:board',
    name: 'board',
    component: __WEBPACK_IMPORTED_MODULE_2__components_Board___default.a
  }]
}));

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(61)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(41),
  /* template */
  __webpack_require__(87),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__App___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__App__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_buefy__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_buefy___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_buefy__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_buefy_lib_buefy_css__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_buefy_lib_buefy_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_buefy_lib_buefy_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__router__ = __webpack_require__(18);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.






__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false;
__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_2_buefy___default.a);

/* eslint-disable no-new */
new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
  el: '#app',
  router: __WEBPACK_IMPORTED_MODULE_4__router__["a" /* default */],
  template: '<App/>',
  components: { App: __WEBPACK_IMPORTED_MODULE_1__App___default.a }
});

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'app'
});

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'authModal',
  props: ['submit'],
  data() {
    return {
      password: '',
      disabled: false
    };
  },
  mounted() {
    this.$refs.pw.focus();
  },
  methods: {
    send() {
      this.disabled = true;
      this.submit(this.password).then(() => {
        this.$parent.close();
      }).catch(() => {
        setTimeout(() => {
          this.disabled = false;
          this.password = '';
        }, 2000);
      });
    }
  }
});

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Page__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Page___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_Page__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_lib_GenericTitle__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_lib_GenericTitle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_lib_GenericTitle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_History__ = __webpack_require__(73);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_History___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_History__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_AuthModal__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_AuthModal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__components_AuthModal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_vue__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_lib_ParallaxLayout__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_lib_ParallaxLayout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__components_lib_ParallaxLayout__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//











/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'board',
  components: {
    History: __WEBPACK_IMPORTED_MODULE_4__components_History___default.a,
    Page: __WEBPACK_IMPORTED_MODULE_2__components_Page___default.a,
    ParallaxLayout: __WEBPACK_IMPORTED_MODULE_7__components_lib_ParallaxLayout___default.a,
    GenericTitle: __WEBPACK_IMPORTED_MODULE_3__components_lib_GenericTitle___default.a,
    AuthModal: __WEBPACK_IMPORTED_MODULE_5__components_AuthModal___default.a
  },
  data() {
    return {
      isAuthModalActive: false,
      state: __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */],
      board: __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards[this.$route.params.board]
    };
  },
  beforeCreate() {
    if (!__WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards.hasOwnProperty(this.$route.params.board)) {
      __WEBPACK_IMPORTED_MODULE_6_vue__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].boards, this.$route.params.board, {
        id: this.$route.params.board,
        users: ['...', '...'],
        balance: 0,
        debts: [],
        auth: {
          username: this.$route.params.board,
          password: window.localStorage.getItem('pw_' + this.$route.params.board)
        }
      });
    }
  },
  created() {
    this.tryPoll();
  },
  methods: {
    historyUpdated() {
      this.$refs.parallaxLayout.jump();
    },
    async tryPoll() {
      try {
        await __WEBPACK_IMPORTED_MODULE_1__api__["a" /* fetchBoard */](this.$route.params.board);
      } catch (e) {
        if (e.hasOwnProperty('response') && e.response.hasOwnProperty('status') && (e.response.status === 403 || e.response.status === 401)) {
          this.isAuthModalActive = true;
        }
        throw e;
      }
    },
    async authSubmit(pw) {
      __WEBPACK_IMPORTED_MODULE_1__api__["b" /* setAuth */](this.$route.params.board, pw);
      await this.tryPoll();
      await __WEBPACK_IMPORTED_MODULE_1__api__["c" /* fetchDebts */](this.$route.params.board, 'desc', 20, 0);
    }
  }
});

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'debtModal',
  props: ['submit'],
  data() {
    return {
      users: []
    };
  },
  methods: {
    send() {
      this.submit(this.users).then(() => {
        this.$parent.close();
      });
    }
  }
});

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'debtModal',
  props: ['users', 'submit'],
  data() {
    return {
      person: null,
      money: null,
      reason: null,
      disabled: false
    };
  },
  methods: {
    send() {
      this.disabled = true;
      let person = this.person === this.users[0] ? 0 : 1;
      let money = this.money * 100;
      this.submit(person, money, this.reason).then(() => {
        this.$parent.close();
      });
    }
  }
});

/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_infinite_loading__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_vue_infinite_loading___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_vue_infinite_loading__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





const distance = 20;

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'history',
  components: {
    InfiniteLoading: __WEBPACK_IMPORTED_MODULE_2_vue_infinite_loading___default.a
  },
  data() {
    return {
      landscape: false,
      empty: true
    };
  },
  props: ['users', 'debts'],
  methods: {
    getDebtsString(user, amount, reason, timestamp) {
      let str = timestamp.getDate() + '.' + timestamp.getMonth() + ': ';
      if (amount >= 0) {
        return `${str} <b>${__WEBPACK_IMPORTED_MODULE_0__util__["a" /* capitalize */](this.users[user])}</b> bekommt ${__WEBPACK_IMPORTED_MODULE_0__util__["b" /* toMoney */](amount)} für ${reason}`;
      } else {
        return `${str} <b>${__WEBPACK_IMPORTED_MODULE_0__util__["a" /* capitalize */](this.users[1 - user])}</b> hat ${__WEBPACK_IMPORTED_MODULE_0__util__["b" /* toMoney */](Math.abs(amount))} zurückgezahlt`;
      }
    },
    async infiniteHandler(state) {
      let board = this.$route.params.board;
      let fetched = await __WEBPACK_IMPORTED_MODULE_1__api__["c" /* fetchDebts */](board, 'desc', distance, this.debts.length);

      if (fetched.length >= distance) {
        state.loaded();
      } else {
        if (fetched.length > 0) {
          state.loaded();
        }
        state.complete();
      }
    }
  }
});

/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_LandingPage__ = __webpack_require__(75);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_LandingPage___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_LandingPage__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_lib_GenericTitle__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_lib_GenericTitle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_lib_GenericTitle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_lib_ParallaxLayout__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_lib_ParallaxLayout___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__components_lib_ParallaxLayout__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'landing',
  components: {
    ParallaxLayout: __WEBPACK_IMPORTED_MODULE_4__components_lib_ParallaxLayout___default.a,
    GenericTitle: __WEBPACK_IMPORTED_MODULE_2__components_lib_GenericTitle___default.a,
    LandingPage: __WEBPACK_IMPORTED_MODULE_1__components_LandingPage___default.a
  },
  data() {
    return {
      state: __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */],
      githubIcon: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].location + 'static/icons/github.svg'
    };
  }
});

/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__banners__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_lib_Plus__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_lib_Plus___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_lib_Plus__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_CreateModal__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_CreateModal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_CreateModal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_PasswordModal__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_PasswordModal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__components_PasswordModal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__api__ = __webpack_require__(4);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







// import * as util from '@/util'

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'landing-page',
  components: {
    Plus: __WEBPACK_IMPORTED_MODULE_1__components_lib_Plus___default.a,
    CreateModal: __WEBPACK_IMPORTED_MODULE_2__components_CreateModal___default.a,
    PasswordModal: __WEBPACK_IMPORTED_MODULE_3__components_PasswordModal___default.a
  },
  props: ['state'],
  data() {
    return {
      imgSrc: __WEBPACK_IMPORTED_MODULE_4__config__["a" /* default */].location + 'static/banners/' + __WEBPACK_IMPORTED_MODULE_0__banners__["a" /* default */][Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_0__banners__["a" /* default */].length)],
      isCreateModalActive: false,
      isPasswordModalActive: false,
      create: {
        users: [],
        pw: ''
      }
    };
  },
  methods: {
    async namesEntered(users) {
      this.create.users = users;
      this.isPasswordModalActive = true;
    },
    async passwordEntered(pw) {
      this.create.pw = pw;
      let created = await __WEBPACK_IMPORTED_MODULE_5__api__["e" /* createBoard */](this.create.users, this.create.pw);
      this.$router.push({ name: 'board', params: { board: created.id } });
    }
  }
});

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_DebtModal__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_DebtModal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_DebtModal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_SettleModal__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_SettleModal___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_SettleModal__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__banners__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__api__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__(13);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//








// Some browsers take time to focus an input
const COPY_TIMEOUT = 500;

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'page',
  components: {
    DebtModal: __WEBPACK_IMPORTED_MODULE_0__components_DebtModal___default.a,
    SettleModal: __WEBPACK_IMPORTED_MODULE_1__components_SettleModal___default.a
  },
  props: ['state'],
  data() {
    return {
      isDebtModalActive: false,
      isSettleModalActive: false,
      imgSrc: __WEBPACK_IMPORTED_MODULE_3__config__["a" /* default */].location + 'static/banners/' + __WEBPACK_IMPORTED_MODULE_2__banners__["a" /* default */][Math.floor(Math.random() * __WEBPACK_IMPORTED_MODULE_2__banners__["a" /* default */].length)],
      jumping: false,
      folded: true
    };
  },
  computed: {
    welcomeLabel() {
      return `Willkommen ${this.state.users[0]} und ${this.state.users[1]}!
Hier könnt ihr ab jetzt eure Schulden verwalten.`;
    }
  },
  methods: {
    unfold() {
      this.folded = !this.folded;
    },
    getBorrower() {
      return __WEBPACK_IMPORTED_MODULE_5__util__["a" /* capitalize */](this.state.balance > 0 ? this.state.users[0] : this.state.users[1]);
    },
    getDebtsString() {
      if (this.state.balance === 0) {
        return 'Ihr seid quitt';
      } else {
        return `<b>${this.getBorrower()}</b> bekommt noch <b>${__WEBPACK_IMPORTED_MODULE_5__util__["b" /* toMoney */](Math.abs(this.state.balance))}</b>`;
      }
    },
    capUsr(id) {
      return __WEBPACK_IMPORTED_MODULE_5__util__["a" /* capitalize */](this.state.users[id]);
    },
    capitalize(str) {
      return __WEBPACK_IMPORTED_MODULE_5__util__["a" /* capitalize */](str);
    },
    getLink() {
      return window.location.href;
    },
    async submitDebt(person, money, reason) {
      await __WEBPACK_IMPORTED_MODULE_4__api__["d" /* createDebt */](this.state.id, person, money, reason);
      this.jumping = true;
      setTimeout(() => {
        this.jumping = false;
      }, 3000);
      this.$emit('updateHistory');
    },
    async submitSettle(person, money) {
      await __WEBPACK_IMPORTED_MODULE_4__api__["d" /* createDebt */](this.state.id, person, money, '');
      this.jumping = true;
      setTimeout(() => {
        this.jumping = false;
      }, 3000);
      this.$emit('updateHistory');
    },
    focus() {
      this.$refs.urlField.focus();
    },
    focusAndCopy(wut) {
      this.$refs.urlField.focus();
      setTimeout(() => {
        if (document.execCommand('copy')) {
          this.$toast.open({
            message: 'Kopiert!',
            type: 'is-success'
          });
        } else {
          this.$toast.open({
            message: 'Hat nicht geklappt :( Versuch\'s manuell.',
            type: 'is-danger'
          });
        }
      }, COPY_TIMEOUT);
    },
    leaveBoard() {
      this.$router.push({ name: 'landing' });
    }
  }
});

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'debtModal',
  props: ['submit'],
  data() {
    return {
      password: '',
      disabled: false
    };
  },
  mounted() {
    this.$refs.pw.focus();
  },
  methods: {
    send() {
      this.disabled = true;
      this.submit(this.password).then(() => {
        this.$parent.close();
      });
    }
  }
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'debtModal',
  props: ['balance', 'submit'],
  data() {
    return {
      money: null,
      min: 0,
      disabled: false
    };
  },
  methods: {
    all(event) {
      if (event) {
        this.money = Math.abs(this.balance / 100);
        this.min = this.money;
      } else {
        this.min = 0;
      }
    },
    send() {
      this.disabled = true;
      let person = this.balance > 0 ? 0 : 1;
      let balance = -Math.abs(this.money) * 100;
      this.submit(person, balance).then(() => {
        this.$parent.close();
      });
    }
  }
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//


/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'generic-title',
  props: ['title']
});

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue__ = __webpack_require__(2);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'parallax-layout',
  data() {
    return {
      scrollTop: 0,
      scrolledTop: false,
      fullWidth: document.documentElement.clientWidth,
      landscape: __WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */].landscape,
      jumping: false
    };
  },
  props: {
    initScroll: {
      type: String,
      default: '0'
    }
  },
  methods: {
    handleResize() {
      this.fullWidth = document.documentElement.clientWidth;
      this.landscape = this.fullWidth > 1200;
      __WEBPACK_IMPORTED_MODULE_1_vue__["a" /* default */].set(__WEBPACK_IMPORTED_MODULE_0__sourceOfTruth__["a" /* default */], 'landscape', this.landscape);
    },
    handleScroll(event) {
      this.scrollTop = window.scrollY / 2 + 'px';
      if (window.scrollY > this.$refs.balloon.offsetTop) {
        this.scrolledTop = true;
      } else {
        this.scrolledTop = false;
      }
    },
    jump() {
      if (!this.landscape) {
        this.jumping = true;
        setTimeout(() => {
          this.jumping = false;
        }, 3000);
      }
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener('resize', this.handleResize);
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    window.removeEventListener('scroll', this.handleScroll);
  }
});

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  name: 'plus',
  props: ['href', 'size']
});

/***/ }),
/* 55 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 56 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 57 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 58 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 59 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 60 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 61 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 62 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 63 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 64 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 65 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 66 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(55)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(42),
  /* template */
  __webpack_require__(80),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-0aed6116",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(60)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(43),
  /* template */
  __webpack_require__(86),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(57)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(44),
  /* template */
  __webpack_require__(82),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-12f9ba02",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(45),
  /* template */
  __webpack_require__(91),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(56)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(46),
  /* template */
  __webpack_require__(81),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(59)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(47),
  /* template */
  __webpack_require__(84),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(66)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(48),
  /* template */
  __webpack_require__(93),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(62)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(49),
  /* template */
  __webpack_require__(88),
  /* styles */
  injectStyle,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(63)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(50),
  /* template */
  __webpack_require__(89),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-4eae3103",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(51),
  /* template */
  __webpack_require__(85),
  /* styles */
  null,
  /* scopeId */
  null,
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

function injectStyle (ssrContext) {
  __webpack_require__(65)
}
var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(54),
  /* template */
  __webpack_require__(92),
  /* styles */
  injectStyle,
  /* scopeId */
  "data-v-5b08bd43",
  /* moduleIdentifier (server only) */
  null
)

module.exports = Component.exports


/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.send($event)
      }
    }
  }, [_c('div', {
    staticClass: "modal-card"
  }, [_vm._m(0, false, false), _vm._v(" "), _c('section', {
    staticClass: "modal-card-body"
  }, [_vm._v("\n      Dieses Board ist Passwortgeschützt\n      "), _c('b-input', {
    ref: "pw",
    attrs: {
      "size": "is-normal",
      "type": "password",
      "disabled": _vm.disabled,
      "expanded": "",
      "password-reveal": ""
    },
    model: {
      value: (_vm.password),
      callback: function($$v) {
        _vm.password = $$v
      },
      expression: "password"
    }
  })], 1), _vm._v(" "), _c('footer', {
    staticClass: "modal-card-foot center-outer"
  }, [_c('div', {
    staticClass: "center-inner"
  }, [_c('button', {
    staticClass: "button is-primary",
    attrs: {
      "disabled": _vm.disabled
    }
  }, [_vm._v("Lass mich rein")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "modal-card-head"
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._v("Passwort")])])
}]}

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "debt-list"
    }
  }, [_vm._l((_vm.debts), function(debt) {
    return _c('div', {
      staticClass: "debt",
      class: {
        ldebt: (debt.user === 0 && debt.gets >= 0), rdebt: (debt.user === 1 && debt.gets >= 0)
      }
    }, [_c('span', {
      domProps: {
        "innerHTML": _vm._s(_vm.getDebtsString(debt.user, debt.gets, debt.reason, debt.timestamp))
      }
    })])
  }), _vm._v(" "), _c('infinite-loading', {
    attrs: {
      "spinner": "waveDots",
      "force-use-infinite-wrapper": !_vm.landscape
    },
    on: {
      "infinite": _vm.infiniteHandler
    }
  }, [_c('span', {
    attrs: {
      "slot": "no-results"
    },
    slot: "no-results"
  }, [_vm._v("\n      *zirp zirp*\n    ")]), _vm._v(" "), _c('span', {
    attrs: {
      "slot": "no-more"
    },
    slot: "no-more"
  })])], 2)
},staticRenderFns: []}

/***/ }),
/* 82 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.send($event)
      }
    }
  }, [_c('div', {
    staticClass: "modal-card"
  }, [_vm._m(0, false, false), _vm._v(" "), _c('section', {
    staticClass: "modal-card-body"
  }, [_vm._v("\n      Board erstellen für\n      "), _c('b-field', {
    attrs: {
      "grouped": ""
    }
  }, [_c('b-input', {
    attrs: {
      "size": "is-normal",
      "type": "text",
      "placeholder": "z.B. Jörg",
      "required": "",
      "expanded": ""
    },
    model: {
      value: (_vm.users[0]),
      callback: function($$v) {
        _vm.$set(_vm.users, 0, $$v)
      },
      expression: "users[0]"
    }
  }), _vm._v("\n        und \n        "), _c('b-input', {
    attrs: {
      "size": "is-normal",
      "type": "text",
      "placeholder": "Thorben",
      "required": "",
      "expanded": ""
    },
    model: {
      value: (_vm.users[1]),
      callback: function($$v) {
        _vm.$set(_vm.users, 1, $$v)
      },
      expression: "users[1]"
    }
  })], 1)], 1), _vm._v(" "), _c('footer', {
    staticClass: "modal-card-foot center-outer"
  }, [_c('div', {
    staticClass: "center-inner"
  }, [_c('button', {
    staticClass: "button",
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.$parent.close()
      }
    }
  }, [_vm._v("Zurück")]), _vm._v(" "), _c('button', {
    staticClass: "button is-primary"
  }, [_vm._v("Weiter")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "modal-card-head"
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._v("Neues Board")])])
}]}

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('div', {
    staticClass: "left",
    class: {
      'left-landscape': _vm.landscape, 'left-portrait': !_vm.landscape
    },
    style: ({
      'padding-top': _vm.scrollTop
    })
  }, [_c('div', {
    class: {
      'page-landscape': _vm.landscape, 'page-portrait': !_vm.landscape
    }
  }, [_vm._t("head")], 2)]), _vm._v(" "), _c('div', {
    class: {
      'history-landscape': _vm.landscape, 'hop-animation': _vm.jumping
    }
  }, [_c('div', {
    ref: "balloon"
  }, [_c('div', {
    staticClass: "balloon-header balloon",
    class: {
      'balloon-header-top': _vm.scrolledTop
    }
  }, [_vm._t("balloon")], 2), _vm._v(" "), (_vm.scrolledTop) ? _c('div', {
    staticClass: "balloon"
  }) : _vm._e()]), _vm._v(" "), _vm._t("body")], 2)])
},staticRenderFns: []}

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('parallax-layout', [_c('landing-page', {
    attrs: {
      "slot": "head"
    },
    slot: "head"
  }), _vm._v(" "), _c('generic-title', {
    attrs: {
      "slot": "balloon",
      "title": "About"
    },
    slot: "balloon"
  }), _vm._v(" "), _c('div', {
    attrs: {
      "slot": "body"
    },
    slot: "body"
  }, [_c('div', {
    attrs: {
      "id": "about"
    }
  }, [_c('b', [_vm._v("iHauke")]), _vm._v(" ist das aufgehübschte Remake einer Web-App, die ich vor einigen Jahren mal an einem öden Wochenende für unsere Studenten WG geschrieben habe."), _c('br'), _vm._v(" "), _c('br'), _vm._v(" "), _c('b', [_vm._v("Lange Rede, kurzer Sinn:")]), _vm._v(" Ihr schuldet euch ständig Geld für irgendwelche Anschaffungen? Einfach schnell auf iHauke eintragen und nie wieder sinnlos Geld hin und her-überweisen 🎉\n          "), _c('br'), _vm._v(" "), _c('br')]), _vm._v(" "), _c('a', {
    attrs: {
      "href": "https://github.com/junpls/iHauke/"
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.githubIcon,
      "alt": "GitHub",
      "height": "42",
      "width": "42"
    }
  })]), _vm._v(" "), _c('br'), _vm._v(" "), _c('br')])], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.send($event)
      }
    }
  }, [_c('div', {
    staticClass: "modal-card"
  }, [_vm._m(0, false, false), _vm._v(" "), _c('section', {
    staticClass: "modal-card-body"
  }, [_c('b-field', {
    attrs: {
      "label": "Schulden verringern um"
    }
  }, [_c('b-input', {
    ref: "input",
    attrs: {
      "size": "is-medium",
      "type": "number",
      "step": "0.01",
      "min": _vm.min,
      "max": Math.abs(_vm.balance / 100),
      "placeholder": "0,00",
      "icon": "euro_symbol",
      "disabled": _vm.disabled,
      "required": "",
      "expanded": ""
    },
    model: {
      value: (_vm.money),
      callback: function($$v) {
        _vm.money = $$v
      },
      expression: "money"
    }
  })], 1), _vm._v(" "), _c('b-checkbox', {
    attrs: {
      "disabled": _vm.disabled
    },
    on: {
      "change": _vm.all
    }
  }, [_vm._v("Alles komplett")])], 1), _vm._v(" "), _c('footer', {
    staticClass: "modal-card-foot center-outer"
  }, [_c('div', {
    staticClass: "center-inner"
  }, [_c('button', {
    staticClass: "button",
    attrs: {
      "type": "button",
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.$parent.close()
      }
    }
  }, [_vm._v("Zurück")]), _vm._v(" "), _c('button', {
    staticClass: "button is-primary",
    attrs: {
      "disabled": _vm.disabled
    }
  }, [_vm._v("Ab dafür!")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "modal-card-head"
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._v("Schulden begleichen")])])
}]}

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', [_c('parallax-layout', {
    ref: "parallaxLayout"
  }, [_c('page', {
    attrs: {
      "slot": "head",
      "state": _vm.board
    },
    on: {
      "updateHistory": _vm.historyUpdated
    },
    slot: "head"
  }), _vm._v(" "), _c('generic-title', {
    attrs: {
      "slot": "balloon",
      "title": "History"
    },
    slot: "balloon"
  }), _vm._v(" "), _c('history', {
    attrs: {
      "slot": "body",
      "users": _vm.board.users,
      "debts": _vm.board.debts
    },
    slot: "body"
  })], 1), _vm._v(" "), _c('b-modal', {
    attrs: {
      "active": _vm.isAuthModalActive,
      "canCancel": false,
      "has-modal-card": ""
    },
    on: {
      "update:active": function($event) {
        _vm.isAuthModalActive = $event
      }
    }
  }, [_c('auth-modal', {
    attrs: {
      "submit": _vm.authSubmit
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "app"
    }
  }, [_c('router-view')], 1)
},staticRenderFns: []}

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page"
  }, [_c('div', {
    staticClass: "columns is-gapless is-mobile shrinkHeader"
  }, [_c('div', {
    staticClass: "column is-1"
  }), _vm._v(" "), _c('div', {
    staticClass: "page-title column"
  }, [_vm._v("iHauke")]), _vm._v(" "), _c('div', {
    staticClass: "sandwich column is-2"
  }, [_c('b-dropdown', {
    attrs: {
      "position": "is-bottom-left"
    }
  }, [_c('button', {
    staticClass: "hiddenbutton",
    attrs: {
      "slot": "trigger"
    },
    slot: "trigger"
  }, [(_vm.folded) ? _c('b-icon', {
    attrs: {
      "icon": "expand_more",
      "size": "is-large"
    }
  }) : _c('b-icon', {
    attrs: {
      "icon": "expand_less",
      "size": "is-large"
    }
  })], 1), _vm._v(" "), _c('b-dropdown-option', {
    attrs: {
      "subheader": ""
    }
  }, [_vm._v("Hallo "), _c('span', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm.capUsr(0)))]), _vm._v(" und "), _c('span', {
    staticClass: "name"
  }, [_vm._v(_vm._s(_vm.capUsr(1)))])]), _vm._v(" "), _c('b-dropdown-option', {
    attrs: {
      "separator": ""
    }
  }), _vm._v(" "), _c('b-dropdown-option', {
    attrs: {
      "subheader": ""
    }
  }, [_c('b-input', {
    ref: "urlField",
    attrs: {
      "type": "url",
      "value": _vm.getLink()
    },
    on: {
      "focus": this.focus
    }
  }), _vm._v(" "), _c('span', {
    on: {
      "click": this.focusAndCopy
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "link"
    }
  }), _vm._v("\n            Link kopieren\n          ")], 1)], 1), _vm._v(" "), _c('b-dropdown-option', {
    attrs: {
      "separator": ""
    }
  }), _vm._v(" "), _c('b-dropdown-option', {
    on: {
      "click": this.leaveBoard
    }
  }, [_c('b-icon', {
    attrs: {
      "icon": "exit_to_app"
    }
  }), _vm._v("\n          Board verlassen\n        ")], 1)], 1)], 1)]), _vm._v(" "), _c('div', {
    staticClass: "banner",
    style: ({
      'background-image': 'url(' + _vm.imgSrc + ')'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "enter"
  }, [_c('span', {
    class: {
      'blink-animation': _vm.jumping
    },
    domProps: {
      "innerHTML": _vm._s(_vm.getDebtsString())
    }
  }), _c('br'), _vm._v(" "), _c('a', {
    staticClass: "button is-primary is-large",
    on: {
      "click": function($event) {
        _vm.isDebtModalActive = true;
        _vm.tooltipsActive = false
      }
    }
  }, [_vm._v("Anschreiben")]), _vm._v(" "), (_vm.state.balance !== 0) ? _c('a', {
    staticClass: "button is-primary is-outlined is-large",
    on: {
      "click": function($event) {
        _vm.isSettleModalActive = true
      }
    }
  }, [_vm._v("Begleichen")]) : _vm._e()]), _vm._v(" "), _c('b-modal', {
    attrs: {
      "active": _vm.isDebtModalActive,
      "has-modal-card": ""
    },
    on: {
      "update:active": function($event) {
        _vm.isDebtModalActive = $event
      }
    }
  }, [_c('debt-modal', {
    attrs: {
      "users": _vm.state.users.map(this.capitalize),
      "submit": _vm.submitDebt
    }
  })], 1), _vm._v(" "), _c('b-modal', {
    attrs: {
      "active": _vm.isSettleModalActive,
      "has-modal-card": ""
    },
    on: {
      "update:active": function($event) {
        _vm.isSettleModalActive = $event
      }
    }
  }, [_c('settle-modal', {
    attrs: {
      "balance": _vm.state.balance,
      "submit": _vm.submitSettle
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.send($event)
      }
    }
  }, [_c('div', {
    staticClass: "modal-card"
  }, [_vm._m(0, false, false), _vm._v(" "), _c('section', {
    staticClass: "modal-card-body"
  }, [_vm._v("\n      Damit nicht jeder reinguckt\n      "), _c('b-input', {
    ref: "pw",
    attrs: {
      "size": "is-normal",
      "type": "password",
      "placeholder": "z.B. alligator3",
      "disabled": _vm.disabled,
      "expanded": "",
      "password-reveal": ""
    },
    model: {
      value: (_vm.password),
      callback: function($$v) {
        _vm.password = $$v
      },
      expression: "password"
    }
  })], 1), _vm._v(" "), _c('footer', {
    staticClass: "modal-card-foot center-outer"
  }, [_c('div', {
    staticClass: "center-inner"
  }, [_c('button', {
    staticClass: "button",
    attrs: {
      "type": "button",
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.$parent.close()
      }
    }
  }, [_vm._v("Zurück")]), _vm._v(" "), _c('button', {
    staticClass: "button is-primary",
    attrs: {
      "disabled": _vm.disabled
    }
  }, [_vm._v("Fertig")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "modal-card-head"
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._v("Passwort")])])
}]}

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "generic-title"
  }, [_vm._v("\n  " + _vm._s(_vm.title) + "\n")])
},staticRenderFns: []}

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.send($event)
      }
    }
  }, [_c('div', {
    staticClass: "modal-card"
  }, [_vm._m(0, false, false), _vm._v(" "), _c('section', {
    staticClass: "modal-card-body"
  }, [_c('b-field', [_c('b-select', {
    attrs: {
      "required": "",
      "expanded": "",
      "placeholder": "Person",
      "size": "is-medium",
      "disabled": _vm.disabled
    },
    model: {
      value: (_vm.person),
      callback: function($$v) {
        _vm.person = $$v
      },
      expression: "person"
    }
  }, [_c('option', [_vm._v(_vm._s(_vm.users[0]))]), _vm._v(" "), _c('option', [_vm._v(_vm._s(_vm.users[1]))])])], 1), _vm._v(" "), _c('b-field', {
    attrs: {
      "label": "bekommt"
    }
  }, [_c('b-input', {
    attrs: {
      "size": "is-medium",
      "type": "number",
      "step": "0.01",
      "min": "0",
      "placeholder": "0,00",
      "icon": "euro_symbol",
      "required": "",
      "expanded": "",
      "disabled": _vm.disabled
    },
    model: {
      value: (_vm.money),
      callback: function($$v) {
        _vm.money = $$v
      },
      expression: "money"
    }
  })], 1), _vm._v(" "), _c('b-field', {
    attrs: {
      "label": "für"
    }
  }, [_c('b-input', {
    attrs: {
      "size": "is-medium",
      "placeholder": "z.B. Kackpappe",
      "required": "",
      "expanded": "",
      "disabled": _vm.disabled
    },
    model: {
      value: (_vm.reason),
      callback: function($$v) {
        _vm.reason = $$v
      },
      expression: "reason"
    }
  })], 1)], 1), _vm._v(" "), _c('footer', {
    staticClass: "modal-card-foot center-outer"
  }, [_c('div', {
    staticClass: "center-inner"
  }, [_c('button', {
    staticClass: "button",
    attrs: {
      "type": "button",
      "disabled": _vm.disabled
    },
    on: {
      "click": function($event) {
        _vm.$parent.close()
      }
    }
  }, [_vm._v("Zurück")]), _vm._v(" "), _c('button', {
    staticClass: "button is-primary",
    attrs: {
      "disabled": _vm.disabled
    }
  }, [_vm._v("Ab dafür!")])])])])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', {
    staticClass: "modal-card-head"
  }, [_c('p', {
    staticClass: "modal-card-title"
  }, [_vm._v("Anschreiben")])])
}]}

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    staticClass: "plus",
    style: ({
      width: _vm.size,
      height: _vm.size
    }),
    attrs: {
      "xmlns:dc": "http://purl.org/dc/elements/1.1/",
      "xmlns:cc": "http://creativecommons.org/ns#",
      "xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
      "xmlns:svg": "http://www.w3.org/2000/svg",
      "xmlns": "http://www.w3.org/2000/svg",
      "width": _vm.size,
      "height": _vm.size,
      "viewBox": "0 0 199.99999 199.99999",
      "id": "svg4319",
      "version": "1.1"
    }
  }, [_c('g', {
    attrs: {
      "id": "layer1",
      "transform": "translate(0,-852.36225)"
    }
  }, [_c('path', {
    staticStyle: {
      "display": "inline",
      "opacity": "1",
      "stroke": "none",
      "stroke-width": "1",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-miterlimit": "4",
      "stroke-dasharray": "none",
      "stroke-dashoffset": "0",
      "stroke-opacity": "1"
    },
    attrs: {
      "d": "m 100.00005,864.67886 c -48.426363,-4.9e-4 -87.684113,39.2564 -87.684697,87.68274 -5e-4,48.4271 39.257568,87.6851 87.684697,87.6846 48.42638,-6e-4 87.68327,-39.2582 87.68277,-87.6846 -5.8e-4,-48.42564 -39.25715,-87.68215 -87.68277,-87.68274 z m -3.98367,49.3682 7.93474,0 0,34.20435 34.20429,0 0,7.93279 -34.20429,0 0,34.20433 -7.93474,0 0,-34.20433 -34.204288,0 0,-7.93279 34.204288,0 z",
      "id": "path4136-5"
    }
  })])])
},staticRenderFns: []}

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "page"
  }, [_c('div', {
    staticClass: "page-title"
  }, [_vm._v("\n    iHauke\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "description"
  }, [_vm._v("\n    Ein semiprofessionelles Finanzverwaltungssystem für Zweier WGs\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "banner",
    style: ({
      'background-image': 'url(' + _vm.imgSrc + ')'
    })
  }), _vm._v(" "), _c('div', {
    staticClass: "vcenter",
    staticStyle: {
      "height": "20%",
      "margin-top": "-20px"
    }
  }, [_c('b', [_vm._v("Neues Board -> ")]), _vm._v(" "), _c('span', {
    on: {
      "click": function($event) {
        _vm.isCreateModalActive = true
      }
    }
  }, [_c('plus', {
    attrs: {
      "size": "20vh"
    }
  })], 1)]), _vm._v(" "), _c('b-modal', {
    attrs: {
      "active": _vm.isCreateModalActive,
      "has-modal-card": ""
    },
    on: {
      "update:active": function($event) {
        _vm.isCreateModalActive = $event
      }
    }
  }, [_c('create-modal', {
    attrs: {
      "submit": _vm.namesEntered
    }
  })], 1), _vm._v(" "), _c('b-modal', {
    attrs: {
      "active": _vm.isPasswordModalActive,
      "has-modal-card": ""
    },
    on: {
      "update:active": function($event) {
        _vm.isPasswordModalActive = $event
      }
    }
  }, [_c('password-modal', {
    attrs: {
      "submit": _vm.passwordEntered
    }
  })], 1)], 1)
},staticRenderFns: []}

/***/ })
],[40]);
//# sourceMappingURL=app.5b3dcd63e44741faa5b4.js.map