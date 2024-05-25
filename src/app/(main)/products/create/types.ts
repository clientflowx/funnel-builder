type ProductData = {
  name: string;
  description: string;
  media: File | null;
  chargeTax: boolean;
  prices: PriceField[];
};

interface PriceAdditionOption {
  description: string;
  membershipOffer: boolean;
}

interface PriceField {
  amount: string;
  compareAtPrice: string;
  priceAdditionOptions: PriceAdditionOption;
}
export type { ProductData, PriceField };
