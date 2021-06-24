import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/responsive.css';
import App from './views/app';
import swRegister from './utils/sw-register';

console.log('index.js');

const app = new App({
  button: document.querySelector('#menu_drawer'),
  drawer: document.querySelector('.drawer'),
  content: document.querySelector('#content'),
});

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

// const foodListElement = document.createElement('food-list');
// const menuDrawer = document.querySelector('button');
// const drawer = document.querySelector('.drawer');

// foodListElement.foods = data.restaurants;

// document.querySelector('#content').appendChild(foodListElement);

// menuDrawer.addEventListener('click', function() {
//   drawer.classList.toggle('open');
// });

// menuDrawer.addEventListener('keyup', (e) => {
//   console.log(e);
//   if (e.key === '13') {
//     console.log(e.key);
//     drawer.classList.toggle('open');
//   }
// });


console.log('HAYYY');
