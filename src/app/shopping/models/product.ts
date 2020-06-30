
export interface Product {
  id: string;
  name: string;
  shop: Shop;
  price: Price;
  received: boolean;
  deliveryEstDate: string;
}

export interface Shop {
  id: number;
  name: string;
}

export interface AgregatedShopInfo extends Shop {
  productsSum: Price;
}

export interface Price {
  usd: number;
  ils: number;
}