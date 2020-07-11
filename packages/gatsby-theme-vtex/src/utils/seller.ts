export interface Item {
  sellers: Array<{
    commertialOffer: {
      AvailableQuantity: number
      Price: number
    }
  }>
}

export const findBestSeller = <T extends Item>(sku: T) => {
  let bestSeller = sku.sellers?.[0]

  if (!bestSeller) {
    return
  }

  for (const seller of sku.sellers) {
    const { commertialOffer } = seller
    if (
      commertialOffer.AvailableQuantity > 0 &&
      commertialOffer.Price < bestSeller.commertialOffer.Price
    ) {
      bestSeller = seller
    }
  }

  return bestSeller
}
