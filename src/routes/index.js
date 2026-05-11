import { createRouter, createWebHistory } from "vue-router";
import Home from "@/pages/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  {
    path: "/destination/:id/:slug",
    name: "destination.show",
    component: () => import("@/pages/DestinationShow.vue"),
    props: (route) => ({
      id: parseInt(route.params.id),
      slug: route.params.slug,
      experienceSlug: route.params.experienceSlug,
    }),
    children: [
      {
        path: ":experienceSlug",
        name: "experience.show",
        component: () => import("@/pages/ExperiencesShow.vue"),
        props: (route) => ({
          id: parseInt(route.params.id),
          slug: route.params.slug,
          experienceSlug: route.params.experienceSlug,
        }),
      },
    ],
  },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active-link",
});

export default router;
