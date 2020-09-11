import Vue from "vue";
import Router from "vue-router";
import AppHeader from "./layout/AppHeader";
import Components from "./views/Components.vue";
import CreateAccount from "./views/CreateAccount.vue";
import VerifyAccount from "./views/VerifyAccount.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: "active",
  routes: [
    {
      path: "/",
      name: "getstart",
      components: {
        header: AppHeader,
        default: Components
      }
    },
    {
      path: "/create_account",
      name: "createaccount",
      components: {
        header: AppHeader,
        default: CreateAccount,
      }
    },
    {
      path: "/verification/:token/:email",
      name: "verification",
      components: {
        header: AppHeader,
        default: VerifyAccount,
      }
    },
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});
