import UrlParser from '../../routes/url-parser';
import TheRestaurantSource from '../../data/therestaurant-source';
import CONFIG from '../../globals/config';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
        <h2>Detail Page</h2>
        <div class='detail'>
        </div>
        <div class='detail-review'>
        </div>
        
        <div id="likeButtonContainer"></div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();

    const restaurants =
    await TheRestaurantSource.detailRestaurantDataSource(url.id);
    const categories = restaurants.categories;
    const menusFood = restaurants.menus.foods;
    const menusdrink = restaurants.menus.foods;
    const customerReviews = restaurants.customerReviews;

    const detailContainer = document.querySelector('.detail');
    const detail = `     
     <img src="${restaurants.pictureId ? CONFIG.BASE_IMAGE_URL +
      restaurants.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" 
       alt="food ${restaurants.name}"
       class="post_item_thumbnail"/>
  
    <div class="post_item_kota">
     <h3> Kota ${restaurants.city}<h3>
     <br>
     <h4> ${restaurants.address}<h4>
    </div>
    <div class="post_deskripsi">
      <h2 class="post_item_rating">Rating : ${restaurants.rating}</h2>
      <h2><a href="${restaurants.id}">${restaurants.name}</a></h2>
      <p>${restaurants.description}</p>
   </div>
      <div class='categories'></div>
      <div class="menus-detail">
      <div class='food-menu'></div>
      <div class='drink-menu'></div>
   </div>
   `;
    detailContainer.innerHTML = detail;

    const deskripsiContainer = document.querySelector('.categories');
    let categoriesHtml = `<h4>Categories :</h4>`;
    categories.forEach((categori) => {
      categoriesHtml += `<ul><li>${categori.name}</li></ul>`;
      console.log(categori.name);
    });
    deskripsiContainer.innerHTML = categoriesHtml;

    const foodMenuContainer = document.querySelector('.food-menu');
    let menusFoodHtml = `<h4>Food Menu :</h4>`;
    menusFood.forEach((food) => {
      menusFoodHtml += `<ul><li>${food.name}</li></ul>`;
      console.log(food.name);
    });
    foodMenuContainer.innerHTML = menusFoodHtml;

    const drinkMenuContainer = document.querySelector('.drink-menu');
    let menusDrinkHtml = `<h4>Drink Menu :</h4>`;
    menusdrink.forEach((drink) => {
      menusDrinkHtml += `<ul><li>${drink.name}</li></ul>`;
      console.log(drink.name);
    });

    drinkMenuContainer.innerHTML = menusDrinkHtml;

    const detailReviewContainer = document.querySelector('.detail-review');
    let detailReviewHtml = `<h4>Reviews </h4>`;
    customerReviews.forEach((review) => {
      detailReviewHtml += `
      <p class='detail-review-name'>${review.name}<p>
      <p class='detail-review-review'>${review.review}</p>
      <p class='detail-review-date'>${review.date}</p>
      <hr>
      `;
    });
    detailReviewHtml +=`
    <div class="add-review">
        <input class="input-review" 
          type="text" id="review" name="review" 
            placeholder="Add your review in here">
        <input class="button-review" type="submit" value="Review">
    <div>
    `;
    detailReviewContainer.innerHTML = detailReviewHtml;


    const review = document.querySelector('#review');

    const addReview = async function(e) {
      if (e.key === 'Enter' || e.keyCode === 13 || e.type === 'click' ) {
        await TheRestaurantSource.setReview({
          'id': `${await url.id}`,
          'name': 'Anonymous',
          'review': `${await review.value}`,
        });
        review.value ='';
      }
    };
    document.querySelector('.button-review')
        .addEventListener('click', addReview);
    review.addEventListener('keyup', addReview);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      restaurant: {
        id: restaurants.id,
        pictureId: restaurants.pictureId,
        city: restaurants.city,
        rating: restaurants.rating,
        description: restaurants.description,
        name: restaurants.name,
        categories: categories,
        foods: menusFood,
        drinks: menusdrink,
        reviews: customerReviews,
      },
    });
  },
};

export default Detail;
