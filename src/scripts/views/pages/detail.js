import UrlParser from '../../routes/url-parser';
import TheRestaurantSource from '../../data/therestaurant-source';
import CONFIG from '../../globals/config';

const Detail = {
  async render() {
    return `
        <h2>Detail Page</h2>
        <div class='detail'></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    // const foodItemElement = document.createElement('food-item');
    const restaurants =
    await TheRestaurantSource.detailRestaurantDataSource(url.id);
    console.log(restaurants);
    // foodItemElement.food = restaurants;
    // document.querySelector('#content').appendChild(foodItemElement);

    const detailContainer = document.querySelector('.detail');

    detailContainer.innerHTML = `     
    <img src="${restaurants.pictureId ? CONFIG.BASE_IMAGE_URL + restaurants.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" alt="Image food ${restaurants.name}
     class="post_item_thumbnail">
    <h3 class="post_item_kota">  Kota ${restaurants.city} </h3>
      <div class="post_deskripsi">
      <h2 class="post_item_rating">Rating : ${restaurants.rating}</h2>
              <h2><a href="${restaurants.id}">${restaurants.name}</a></h2>
              <p>${restaurants.description}</p>
      </div>
          `;
  },
};

export default Detail;
