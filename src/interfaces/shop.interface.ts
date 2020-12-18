export interface ShopInterface {
    id: string;
    world: string;
    x: number;
    y: number;
    z: number;
    item: string;
    tag?: string;
    amount: number;
    price_buy?: number;
    price_sell: number;
    shopkeeper: {
        uuid: string;
        name: string;
    };
    item_type: string;
}
