import axios from "axios";
import {
  APPLY_COUPON_REQUEST,
  APPLY_COUPON_SUCCESS,
  APPLY_COUPON_FAIL,
  CLEAR_COUPON,
} from "../constants/couponConstants";

// Action to apply a coupon
export const applyCoupon = (couponCode) => async (dispatch) => {
  try {
    dispatch({ type: APPLY_COUPON_REQUEST });

    // Send a request to your API to apply the coupon
    const { data } = await axios.post("/api/apply-coupon/", {
      coupon_code: couponCode,
    });

    dispatch({
      type: APPLY_COUPON_SUCCESS,
      payload: data.message, // Assuming the API response includes a message
    });

    // Optionally, you might want to clear the coupon from the state after a successful application
    setTimeout(() => {
      dispatch(clearCoupon());
    }, 5000); // Clear coupon after 5 seconds
  } catch (error) {
    dispatch({
      type: APPLY_COUPON_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to clear the coupon from the state
export const clearCoupon = () => ({
  type: CLEAR_COUPON,
});
