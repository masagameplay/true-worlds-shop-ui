import {ShopActionType} from "interfaces/shop-action.type";
import {ShopInterface} from "interfaces/shop.interface";

export interface ShopReducerInterface {
    updated: string;
    shops: ShopInterface[]
    isLoaded: boolean;
    isEmpty: boolean;
}

const initState: ShopReducerInterface = {
    updated: "",
    shops: [],
    isLoaded: false,
    isEmpty: false
};

interface ShopAction {
    type: ShopActionType;
    updated: string;
    shops: ShopInterface[];
}

const shopReducer = (state = initState, action: ShopAction) => {
    switch (action.type) {
        case ShopActionType.ADD_SHOPS:
            return {
                updated: action.updated,
                shops: action.shops,
                isLoaded: true,
                isEmpty: false
            }
        default:
            return state;
    }
}

export default shopReducer;
