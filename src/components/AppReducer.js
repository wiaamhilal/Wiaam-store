export const GetBasketTotal = (basket) => {
  return basket.reduce((total, current) => {
    total += current.price;
    return total;
  }, 0);
};
export const initialState = {
  basket: localStorage.getItem("basket")
    ? JSON.parse(localStorage.getItem("basket"))
    : [],
  user: null,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    // case "SET_USER":
    //   return {
    //     ...state,
    //     user: action.user,
    //   };
    case "ADD_TO_BASKET":
      return {
        state,
        basket: [...state.basket, action.item],
      };
    case "REMOVE_ITEM":
      let newBasket = [...state.basket];
      const index = state.basket.findIndex((item) => {
        return item.id === action.id;
      });
      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      return {
        ...state,
        basket: newBasket,
      };
    case "CLEAR_BASKET":
      return {
        ...state,
        basket: [],
      };
    default:
      return state;
  }
};

export default AppReducer;
