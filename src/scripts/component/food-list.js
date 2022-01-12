import './food-item';

class FoodList extends HTMLElement {
  set foods(foods) {
    this._foods = foods;
    console.log(foods);
    this.render();
  }

  render() {
    this._foods.forEach((food) => {
      const foodItemElement = document.createElement('food-item');
      foodItemElement.food = food;
      this.appendChild(foodItemElement);
    });
  }
}

customElements.define('food-list', FoodList);
