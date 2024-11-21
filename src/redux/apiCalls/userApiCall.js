import axios from "../../utils/axios";
import {
    fetchUsersStart, fetchUsersSuccess, fetchUsersFailure
  } from "../slices/userSlice.js";
  import { AppDispatch } from "../store";

export const fetchUsers =  () => async (dispatch) => {
    dispatch(fetchUsersStart());
  try {
    const response = await axios.get("/user");
    dispatch(fetchUsersSuccess(response.data.users));
    if (Array.isArray(response.data)) {
      return response.data.users;
    }
  } catch (error) {
    dispatch(fetchUsersFailure(error.message || "Failed to fetch user"));
  }
};
