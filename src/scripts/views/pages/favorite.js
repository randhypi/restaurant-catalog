import FavoriteRestaurantIdb from '../../data/favoriterestaurant-idb';
import '../../component/food-list';

const Favorite = {
  async render() {
    return `
          <h2>Favorite Page</h2>
        `;
  },

  async afterRender() {
    const foodListElement = document.createElement('food-list');
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    if (restaurants.length <= 0) {
      console.log('restaurant is null');
      document.querySelector('#content').innerHTML =
      `<h2>Favorite Page</h2> <br> <div class="favorite-item__not__found"><h3>Tidak ada restaurant untuk ditampilkan</h3></div>`;
    } else {
      foodListElement.foods = restaurants;
      document.querySelector('#content').appendChild(foodListElement);
    }
  },
};

export default Favorite;
