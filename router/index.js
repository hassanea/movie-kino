import { createRouter, createWebHistory } from "vue-router";

import routes from "./routes.js";

// Creates a Vue router instance with defined route paths and HTML5 Web History Mode.
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
