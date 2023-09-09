import { createContext, useContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import { initialState } from "./AppReducer";

const shopingCardContext = createContext();

const ShopingCardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  return (
    <shopingCardContext.Provider
      value={{
        basket: state.basket,
        user: state.user,
        dispatch: dispatch,
      }}
    >
      {children}
    </shopingCardContext.Provider>
  );
};
export default ShopingCardProvider;

export const useShopingCard = () => {
  return useContext(shopingCardContext);
};
