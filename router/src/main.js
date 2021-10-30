import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './pages/HomePage.vue'
import AboutPage from './pages/AboutPage.vue'
import ArticlePage from './pages/ArticlePage.vue'
import NotFoundPage from './pages/NotFoundPage.vue'
import ArticlesByTagPage from './pages/ArticlesByTagPage.vue'
import ArticleCommentList from './pages/ArticlePage/ArticleCommentList.vue'
import ArticleAuthor from './pages/ArticlePage/ArticleAuthor.vue'
import LoginPage from './pages/LoginPage.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
    name: 'home',
    alias: ['/home', '/homepage']
  },
  // {
  //   path: '/home',
  //   redirect: {
  //     name: 'home'
  //   }
  // },
  {
    path: '/about',
    component: AboutPage,
    name: 'about'
  },
  {
    path: '/articles/:id(\\d+)',
    name: 'articles',
    component: ArticlePage,
    props: true,
    children: [
      {
        name: 'articles.comments',
        path: '',
        component: ArticleCommentList,
        props: true
      },
      {
        name: 'articles.author',
        path: 'author',
        component: ArticleAuthor,
        props: true
      }
    ]
  },
  {
    path: '/tags/:tags+',
    name: 'tags',
    component: ArticlesByTagPage,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/:url(.+)?',
    name: 'not-found',
    component: NotFoundPage
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to, from) => {
  console.log(`Global beforeEach, from ${from.name} to ${to.name}`);

  if (['login', 'home', 'about'].includes(to.name)) {
    return true;
  }

  return { name: 'login', query: { redirect: to.fullPath } };
});

const app = createApp(App);
app.use(router);

app.mount('#app');
