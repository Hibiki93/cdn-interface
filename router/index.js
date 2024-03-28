import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/cdn-system-view/Home.vue";
import FreelancerProfile from "@/views/cdn-system-view/Profile.vue";

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta:{title:'Complete Developer Network - Home'}
  },
  {
    path: "/profile/:id",
    name: "Freelancer Profile",
    component: FreelancerProfile,
    props:true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'Complete Developer Network';
  next();
});

export default router;
