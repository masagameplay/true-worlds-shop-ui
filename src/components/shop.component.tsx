import React from "react";
import {ShopInterface} from "interfaces/shop.interface";
import RowItem from "components/row-item.component";

interface ShopComponentProps {
    shop: ShopInterface;
    setSearch: (keyword: string) => void;
}

const Shop: React.FC<ShopComponentProps> = props => {

    const {shop, setSearch} = props;

    return <div className="bg-gray-700 shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg leading-6 font-medium text-gray-300 cursor-pointer" onClick={() => setSearch(`item:"${shop.item}"`)}>
                    {shop.item}
                </h3>
                <div className="bg-gray-600 w-10 h-10 rounded-md p-2">
                    <div className="bg-no-repeat bg-center bg-contain bg-clip-padding w-full h-full " style={{backgroundImage: `url(minecraft-icons/${shop.item_type}.png)`}}>
                    </div>
                </div>
            </div>
        </div>
        <div className="border-t border-gray-800 px-4 py-5 sm:p-0">
            <dl className="sm:divide-y sm:divide-gray-800">
                <RowItem title={"Kappalemäärä"} value={shop.amount}/>
                <RowItem title={"Ostohinta"} value={shop.price_buy || "Kauppa ei myy tuotetta"}/>
                <RowItem title={"Myyntihinta"} value={shop.price_sell || "Kauppa ei osta tuotetta"}/>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-300">
                        Sijainti kartalla
                    </dt>
                    <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2 font-bold">
                        <a
                            className="hover:text-gray-400 transition duration-150"
                            target="_blank"
                            rel="noreferrer"
                            href={`https://trueworlds.net/dynmap/survival/?worldname=${shop.world}&x=${shop.x}&y=${shop.y}&z=${shop.z}&zoom=4`}>Avaa</a>
                    </dd>
                </div>
                <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-300">
                        Myyjä
                    </dt>
                    <dd className="mt-1 text-sm text-gray-100 sm:mt-0 sm:col-span-2 font-bold">
                        <p className="cursor-pointer hover:text-gray-400 transition duration-150"
                           onClick={() => setSearch("shopkeeper:" + shop.shopkeeper.name)}>
                            {shop.shopkeeper.name}
                        </p>
                    </dd>
                </div>
            </dl>
        </div>
    </div>
}

export default Shop;
