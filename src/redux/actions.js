import api from "../libs/api";

const storeData = {
  type: "",
  data: null,
};

export const getFish = () => {
  return async (dispatch) => {
    try {
      const data = await api.read("list");
      if (data) {
        storeData.type = "GET_FISH";
        storeData.data = data;
        dispatch(storeData);
      }
    } catch (error) {
      throw error;
    }
  };
};

export const addFish = (payload) => {
  return async (dispatch) => {
    try {
      const data = await api.append("list", [payload]);
      if (data) {
        storeData.type = "ADD_FISH";
        storeData.data = payload;
        dispatch(storeData);
      }
    } catch (error) {
      throw error;
    }
  };
};
