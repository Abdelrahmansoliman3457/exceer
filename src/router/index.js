import { createRouter, createWebHistory } from "vue-router";
import i18n from '@/i18n';

// start to sidebar route

const routes = [
  // home Route
  {
    name: "Home",
    path: "/",
    slug: 'navBar',
    component: () => import('../views/index.vue'),
    meta: {
      title: 'Glopal.home',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },

  // home services

  {
    name: "services",
    path: "/services",
    slug: 'navBar',
    component: () => import('../views/services.vue'),
    meta: {
      title: 'titles.services',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },

  // packages Route

  {
    name: "packages",
    path: "/packages",
    slug: 'navBar',
    component: () => import('../views/packages.vue'),
    meta: {
      title: 'titles.packages',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },

  // appointment Requests Route

  {
    name: "orders",
    path: "/orders",
    slug: 'navBar',
    component: () => import('../views/appointmentRequests.vue'),
    redirect: {name: 'new-order'},
    meta: {
      title: 'titles.appointment_requests',
      descreption: 'bla bla bla',
      requiresAuth: true,
    },

    children: [
      {
        name: "new-order",
        path: 'neworder',
        component: () => import('@/views/Orders/newOrderstable.vue'),
        meta: {
          title: 'titles.appointment_requests',
          descreption: 'bla bla bla',
          requiresAuth: true,
        },
      },
      {
        name: "current-order",
        path: 'currentOrder',
        component: () => import('@/views/Orders/currentOrders.vue'),
      },
      {
        name: "finished-order",
        path: 'finishedOrders',
        component: () => import('@/views/Orders/finishedOrders.vue'),
      },
      {
        name: "cancel-order",
        path: 'cancelOrders',
        component: () => import('@/views/Orders/cancelOrders.vue'),
      },
    ]
  },


  // product details route

  {
    name: 'orderDetails',
    path: '/orderDetails/:orderId',
    slug: 'navBar',
    component: () => import('@/views/Orders/orderDetails.vue'),
    meta: {
      title: 'titles.order_details',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },


  // Worktime
  {
    name: 'worktime',
    path: '/worktime',
    slug: 'navBar',
    component: () => import('@/views/workTime.vue'),
    meta: {
      title: 'Sidebar.times_work',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },

  // Worktime update
  {
    name: 'worktimeUpdate',
    path: '/worktimeUpdate',
    slug: 'navBar',
    component: () => import('@/views/worktimeUpdate.vue'),
    meta: {
      title: 'Sidebar.times_work',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },

  // External appointments
  {
    name: 'externalAppointments',
    path: '/externalAppointments',
    slug: 'navBar',
    component: () => import('@/views/externalAppointments.vue'),
    meta: {
      title: 'Sidebar.external_appointments',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },


  // My Data
  {
    name: 'myData',
    path: '/myData',
    slug: 'navBar',
    component: () => import('@/views/myData.vue'),
    redirect: {name: 'centerData'},
    meta: {
      title: 'Sidebar.my_data',
      descreption: 'bla bla bla',
      requiresAuth: true,
    },

    children: [
      {
        name: "centerData",
        path: 'centerData',
        component: () => import('@/views/MyData/centerData.vue'),
      },
      {
        name: "doctorData",
        path: 'doctorData',
        component: () => import('@/views/MyData/doctorData.vue'),
      },
      {
        name: "bankAccount",
        path: 'bankAccount',
        component: () => import('@/views/MyData/bankAccount.vue'),
      },
    ]

  },

  // My reviews
  {
    name: "myReviews",
    path: "/myReviews",
    slug: 'navBar',
    component: () => import('@/views/myReviews.vue'),
    meta: {
      title: 'titles.my_reviews',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },

  // My Financial transactions
  {
    name: "financialtransactions",
    path: "/financialtransactions",
    slug: 'navBar',
    component: () => import('@/views/financialTransactions.vue'),
    meta: {
      title: 'Sidebar.financial_transactions',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },


  // Order reports
  {
    name: "orderReports",
    path: "/orderReports",
    slug: 'navBar',
    component: () => import('@/views/orderReports'),
    meta: {
      title: 'Sidebar.order_reports',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },


  // User permissions
  {
    name: "userPermissions",
    path: "/userPermissions",
    slug: 'navBar',
    component: () => import('@/views/userPermissions'),
    meta: {
      title: 'Sidebar.user_permissions',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },


  // Notifications
  {
    name: "notifications",
    path: "/notifications",
    slug: 'navBar',
    component: () => import('@/views/notifications'),
    meta: {
      title: 'Glopal.notifications',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },

  // About the application
  {
    name: "aboutApplication",
    path: "/aboutApplication",
    slug: 'navBar',
    component: () => import('@/views/aboutApplication'),
    meta: {
      title: 'Sidebar.about_application',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },

  // terms_and_Conditions befor Auth
  {
    name: "termsAndConditions",
    path: "/termsAndConditions",
    slug: 'navBar',
    component: () => import('@/views/termsbeforeAuth'),
    meta: {
      title: 'Auth.terms_conditions',
      descreption: 'bla bla bla',
      authRout: true,
    }
  },

  // terms_and_Conditions
  {
    name: "termsConditions",
    path: "/termsConditions",
    slug: 'navBar',
    component: () => import('@/views/termsConditions'),
    meta: {
      title: 'Auth.terms_conditions',
      descreption: 'bla bla bla',
      // requiresAuth: true,
    }
  },

  // Connect us
  {
    name: "Connectus",
    path: "/Connectus",
    slug: 'navBar',
    component: () => import('@/views/Connectus'),
    meta: {
      title: 'Sidebar.connect_us',
      descreption: 'bla bla bla',
      requiresAuth: true,
    }
  },

    
    

  

  // start to Auth
  {
    name: "login",
    path: "/login",
    slug: 'Auth',
    component: () => import('@/views/Auth/login'),
    meta: {
      title: 'Auth.signin',
      descreption: 'bla bla bla',
      authRout: true,
    }
  },
  
  {
    name: "register-step-1",
    path: "/register-step-1",
    slug: 'Auth',
    component: () => import('@/views/Auth/registerStep_1'),
    meta: {
      title: 'titles.register_step_1',
      descreption: 'bla bla bla',
      authRout: true,
    }
  },

  {
    name: "register-step-2",
    path: "/register-step-2",
    slug: 'Auth',
    component: () => import('@/views/Auth/registerStep_2'),
    meta: {
      title: 'titles.register_step_2',
      descreption: 'bla bla bla',
      authRout: true,
      requiresAuth: true,
    }
  },

  {
    name: "register-step-3",
    path: "/register-step-3",
    slug: 'Auth',
    component: () => import('@/views/Auth/registerStep_3'),
    meta: {
      title: 'titles.register_step_3',
      descreption: 'bla bla bla',
      authRout: true,
      requiresAuth: true,
    }
  },

  {
    name: "activateAccount",
    path: "/activateAccount",
    slug: 'Auth',
    component: () => import('@/views/Auth/activateAccount'),
    meta: {
      title: 'Auth.activate_account',
      descreption: 'bla bla bla',
      authRout: true,
    }
  },

  {
    name: "restorepassword",
    path: "/restorepassword",
    slug: 'Auth',
    component: () => import('@/views/Auth/restorePassword'),
    meta: {
      title: 'Auth.restore_password',
      descreption: 'bla bla bla',
      authRout: true,
    }
  },

  {
    name: "restorepassword-check-code",
    path: "/restorepassword-check-code",
    slug: 'Auth',
    component: () => import('@/views/Auth/restorePassword_check_code'),
    meta: {
      title: 'titles.restorepassword_check_code',
      descreption: 'bla bla bla',
      authRout: true,
    }
  },

  {
    name: "changepassword",
    path: "/changepassword",
    slug: 'Auth',
    component: () => import('@/views/Auth/changePassword'),
    meta: {
      title: 'titles.change_password',
      descreption: 'bla bla bla',
      authRout: true,
    }
  },








  {
    name: "About",
    path: '/about',
    slug: 'navBar',
    component: () => import('../views/aboutPage.vue'),
    meta: {
      title: 'About',
      descreption: 'bla bla bla',
      requiresAuth: true,
    },
  },

  
  {
    name: "Profile",
    path: '/profile/:userId/:userName',
    slug: 'navBar',
    component: () => import('../views/profilePage.vue'),
    meta: {
      title: 'Profile',
      descreption: 'bla bla bla',
      requiresAuth: true,
    },
  },

  // page not found
  {
    name: "NotFound",
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
    meta: {
      title: 'NotFound',
      descreption: 'bla bla bla',
      authRout: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from, next) => {
  // console.log("to is ", to);
  // console.log("from is ", from);
  // console.log("next is ", next);

  // if(to.name == 'Profile') {
  //   return next({name: 'Home'});
  // }

  const pageTitle = to.meta.title; // Access the meta title from the route

  document.title = i18n.global.t(`${pageTitle}`);


  // document.title = to.meta.title
  window.scrollTo(0, 0);
  // next();
})


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!localStorage.getItem("token")) {
          next({ name: "login" });
      } else {
          next();
      }
  } else {
      next();
  }
});

export default router;
