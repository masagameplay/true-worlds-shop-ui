import {ShopActionType} from "interfaces/shop-action.type";
import axios from "axios";
import {ShopInterface} from "interfaces/shop.interface";

export const loadShops = () => async (dispatch: any) => {

    const response = await axios.get("https://trueworlds.net/survival/shops.json");

    const shops: ShopInterface[] = [];

    const shopKeepers = new Map<string, string>();

    const items = ["sand", "arrow", "andesite", "baked_potato", "bone", "birch_leaves", "spruce_trapdoor"];

    for(const shop of response.data.shops) {

        let username: string;

        if(shopKeepers.get(shop.shopkeeper)) {
            username = shopKeepers.get(shop.shopkeeper) + "";
        } else {
            username = (await axios.get(`https://mcapi.ca/player/profile/${shop.shopkeeper}`)).data.name;
            shopKeepers.set(shop.shopkeeper, username);
        }

        shop.shopkeeper = {
            uuid: shop.shopkeeper,
            name: username
        }

        shop.item_type = items[Math.floor(Math.random() * items.length)]

        shops.push(shop)
    }

    dispatch({
        type: ShopActionType.ADD_SHOPS,
        updated: response.data.updated,
        shops: shops,
    })

}
