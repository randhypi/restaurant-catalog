import TheRestaurantSource from '../../data/therestaurant-source';
import '../../component/food-list';

const Home = {
  async render() {
    return `
            <h2>List Restaurant</h2>
          `;
  },

  async afterRender() {
    const foodListElement = document.createElement('food-list');
    const restaurants = await TheRestaurantSource.listRestaurantDataSource();
    console.log(restaurants);
    foodListElement.foods = restaurants;
    document.querySelector('#content').appendChild(foodListElement);
  },
};

export default Home;
