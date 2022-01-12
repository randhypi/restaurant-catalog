import CONFIG from '../globals/config';

class FoodItem extends HTMLElement {
  set food(food) {
    this._food = food;
    this.render();
  }
  render() {
    this.innerHTML = `   
   <img class="lazyload" data-src="${this._food.pictureId ? CONFIG.BASE_IMAGE_URL +
       this._food.pictureId : 'https://picsum.photos/id/666/800/450?grayscale'}" 
       alt="food ${this._food.name}"
       />

      <h3 class="post_item_kota">Kota ${this._food.city} </h3>
      <div class="post_deskripsi">
      <h2 class="post_item_rating">Rating : ${this._food.rating}</h2>
              <h2><a href="/#/detail/${this._food.id}">
              ${this._food.name}</a></h2>
              <p>${this._food.description.slice(0, 200)} 
              <a class="deskripsi_touch" href="/#/detail/${this._food.id}"> 
              selengkapnya...</a></p>
      </div>
          `;
  }
}

customElements.define('food-item', FoodItem);
