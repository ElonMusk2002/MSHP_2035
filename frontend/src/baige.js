import axios from "axios";

export async function fetchCartQuantity() {
    try {
      const response = await axios.get("http://localhost:3001/api/cart/item");
      cartQuantity.value = response.data.totalQuantity;
    } catch (err) {
      console.log(err);
    }
}