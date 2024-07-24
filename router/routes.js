import HomePage from '../src/components/views/HomePage.vue';
const MovieListing = () => import('../src/components/views/MovieListing.vue');
const MoviePage = () => import('../src/components/views/MoviePage.vue');
const NotFound = () => import('../src/components/views/NotFound.vue');
import DefaultLayout from '../src/components/layouts/DefaultLayout.vue';

// https://www.youtube.com/watch?v=64kDEpY7xOs
// https://ahmedshaltout.com/vuejs/how-to-make-layouts-in-vue-3-application/

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Home Content',
        component: HomePage,
      },
    ],
  },
  {
    path: '/movies',
    name: 'Movies',
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Movie Listing',
        component: MovieListing,
      },
    ],
  },
  {
    path: '/movies/:id',
    name: 'Movie',
    props: true,
    component: MoviePage,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFound,
  },
];

export default routes;
