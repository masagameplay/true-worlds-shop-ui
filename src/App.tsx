import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {loadShops} from "store/action/shop.action";
import {AppState} from "store/reducer";
import {ShopInterface} from "interfaces/shop.interface";
// @ts-ignore
import LazyLoad from 'react-lazyload';
import Shop from "components/shop.component";

const App = () => {

    const defaultShopState = useSelector((state: AppState) => state.shop);

    const [search, setSearch] = React.useState("");
    const [shops, setShops] = React.useState<ShopInterface[]>(defaultShopState.shops);

    const [isAsc, setAsc] = React.useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadShops())
    }, [dispatch])


    const sortDesc = (list: ShopInterface[]): ShopInterface[] => {
        return list.sort((a, b) => (b.price_buy || -999999999) - (a.price_buy || -999999999));
    }

    const sortAsc = (list: ShopInterface[]): ShopInterface[] => {
        return list.sort((a, b) => (a.price_buy || 999999999) - (b.price_buy || 999999999));
    }

    const checkShopkeeper = (shopkeeper_name: string, search: string): boolean => {
        return shopkeeper_name.toLowerCase() === search.toLowerCase()
    }

    const checkItem = (item_name: string, search: string): boolean => {
        return item_name.toLowerCase().includes(search.toLowerCase());
    }

    useEffect(() => {
        let filtered = defaultShopState.shops;
        if (search.length) {
            filtered = filtered.filter((shop) => {
                const keywords: string[] = search.match(/(".*?"|[^"\s]+)+(?=\s*|\s*$)/g) || []

                let match = false;

                let shopkeeper = keywords.find(keyword => keyword.startsWith("shopkeeper:"));
                let item = keywords.find(keyword => keyword.startsWith("item:"));

                shopkeeper = shopkeeper ? shopkeeper.replace("shopkeeper:", "").replace(/["']/g, "") : undefined;
                item = item ? item.replace("item:", "").replace(/["']/g, "") : undefined;

                if(!item) {
                    if(shop.item.toLowerCase().includes(search.toLowerCase())) {
                        item = search.toLowerCase();
                    }
                }

                if (shopkeeper && item) {
                    if (checkShopkeeper(shop.shopkeeper.name, shopkeeper) && checkItem(shop.item, item)) {
                        match = true;
                    }
                }

                if (!shopkeeper && item) {
                    if (checkItem(shop.item, item)) {
                        match = true;
                    }
                }

                if (shopkeeper && !item) {
                    if (checkShopkeeper(shop.shopkeeper.name, shopkeeper)) {
                        match = true;
                    }
                }

                return match
            }).splice(0, 100);
            setShops(isAsc ? sortAsc(filtered) : sortDesc(filtered))
        } else {
            setShops(isAsc ? sortAsc(defaultShopState.shops) : sortDesc(defaultShopState.shops))
        }

    }, [search, defaultShopState.shops, isAsc])

    return (
        <div
            className="flex flex-col min-h-full justify-center text-white bg-gray-800">
            <div className="w-full container mx-auto">
                <div className="relative py-12">
                    <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-400 sm:text-4xl">
                        True Worldsin kaupat
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-300">
                        Tiedot päivittyvät 15 minuutin välein
                    </p>
                </div>
                <div className="pb-4">
                    <div>
                        <label htmlFor="product_name" className="block text-sm font-medium text-gray-300">Hae
                            tuotenimellä (item:"TUOTE") ja/tai kaupan omistajan nimellä (shopkeeper:KÄYTTÄJÄNIMI).
                            Esimerkiksi item:Andesite shopkeeper:Masagameplay</label>
                        <div className="mt-1 flex rounded-md shadow-sm">
                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                <input
                                    type="text"
                                    name="product_name" id="product_name"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-4 py-3 sm:text-sm border-gray-300"
                                    placeholder="Hakusanat"
                                    value={search}
                                    onChange={event => setSearch(event.target.value)}
                                />
                            </div>
                            <button
                                onClick={() => setAsc(!isAsc)}
                                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                {
                                    isAsc ?
                                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                             viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path
                                                d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z"/>
                                        </svg>
                                        : <svg className="w-5 h-5 text-gray-400" fill="currentColor"
                                               viewBox="0 0 20 20"
                                               xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h7a1 1 0 100-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM15 8a1 1 0 10-2 0v5.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L15 13.586V8z"/>
                                        </svg>
                                }

                                <span>Hinta ({isAsc ? "nouseva" : "laskeva"})</span>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center">
                    {!defaultShopState.isLoaded &&
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="animate-spin w-20 h-20">
                        <path stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M20 4v5h-.582m0 0a8.001 8.001 0 00-15.356 2m15.356-2H15M4 20v-5h.581m0 0a8.003 8.003 0 0015.357-2M4.581 15H9"/>
                    </svg>}
                </div>
                <div className="grid grid-cols-4 gap-4">
                    {
                        defaultShopState.isLoaded && shops.map((shop, i) => <LazyLoad once
                                                                                      className="col-span-4 lg:col-span-1"
                                                                                      key={i}>
                            <Shop shop={shop} setSearch={setSearch}/>
                        </LazyLoad>)
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
