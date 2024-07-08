import Home from '../src/components/views/Home.vue';
const MovieListing = () => import('../src/components/views/MovieListing.vue');
const Movie = () => import('../src/components/views/Movie.vue');
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
        component: Home,
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
    component: Movie,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'Not Found',
    component: NotFound,
  },
];

export default routes;
