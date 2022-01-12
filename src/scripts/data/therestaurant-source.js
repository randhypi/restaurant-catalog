import API_ENDPOINT from '../globals/api-endpoint';
import CONFIG from '../globals/config';

class TheRestaurantDataSource {
  static async listRestaurantDataSource() {
    const response = await fetch(API_ENDPOINT.LIST_RESTAURANT);
    const responseJson = await response.json();
    return responseJson.restaurants;
  }

  static async detailRestaurantDataSource(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    return responseJson.restaurant;
  }

  static async setReview(data) {
    const response = await fetch(API_ENDPOINT.REVIEW, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': CONFIG.KEY,
      },
      body: JSON.stringify(data),
    });
    console.log(response);
    return response.json();
  }
}


export default TheRestaurantDataSource;
