import {combineReducers} from "redux";
import shopReducer, {ShopReducerInterface} from "store/reducer/shop.reducer";

export default combineReducers({
    shop: shopReducer
});

export interface AppState {
    shop: ShopReducerInterface
}
