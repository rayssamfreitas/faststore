import type { Dispatch, SetStateAction } from 'react'
import { useMemo } from 'react'

import type { ProductDetailsFragment_ProductFragment } from '@generated/graphql'

import { useBuyButton } from 'src/sdk/cart/useBuyButton'
import { useFormattedPrice } from 'src/sdk/product/useFormattedPrice'

import Selectors from 'src/components/ui/SkuSelector'
import AddToCartLoadingSkeleton from './AddToCartLoadingSkeleton'

import { useOverrideComponents } from 'src/sdk/overrides/OverrideContext'

interface ProductDetailsSettingsProps {
  product: ProductDetailsFragment_ProductFragment
  buyButtonTitle: string
  buyButtonIcon: {
    alt: string
    icon: string
  }
  isValidating: boolean
  quantity: number
  setQuantity: Dispatch<SetStateAction<number>>
  notAvailableButtonTitle: string
  useUnitMultiplier: boolean
}

function ProductDetailsSettings({
  product,
  buyButtonTitle,
  isValidating,
  quantity,
  setQuantity,
  buyButtonIcon: { icon: buyButtonIconName, alt: buyButtonIconAlt },
  notAvailableButtonTitle,
  useUnitMultiplier,
}: ProductDetailsSettingsProps) {
  const {
    BuyButton,
    Icon,
    ProductPrice,
    QuantitySelector,
    __experimentalNotAvailableButton: NotAvailableButton,
  } = useOverrideComponents<'ProductDetails'>()

  const {
    id,
    sku,
    gtin,
    unitMultiplier,
    name: variantName,
    brand,
    isVariantOf,
    isVariantOf: { skuVariants },
    image: productImages,
    additionalProperty,
    offers: {
      offers: [{ availability, price, listPrice, seller }],
    },
  } = product

  const buyProps = useBuyButton({
    id,
    price,
    listPrice,
    seller,
    quantity,
    itemOffered: {
      sku,
      name: variantName,
      gtin,
      image: productImages,
      brand,
      isVariantOf,
      additionalProperty,
      unitMultiplier,
    },
  })

  const outOfStock = useMemo(
    () => availability === 'https://schema.org/OutOfStock',
    [availability]
  )

  const AddToCartButton = () => {
    return outOfStock ? (
      // TODO: Adds <OutOfStock /> when component is ready to use
      <NotAvailableButton.Component>
        {notAvailableButtonTitle}
      </NotAvailableButton.Component>
    ) : (
      <BuyButton.Component
        {...BuyButton.props}
        icon={
          <Icon.Component
            {...Icon.props}
            name={buyButtonIconName ?? Icon.props.name}
            aria-label={buyButtonIconAlt ?? Icon.props['aria-label']}
          />
        }
        {...buyProps}
      >
        {buyButtonTitle || 'Add to Cart'}
      </BuyButton.Component>
    )
  }

  return (
    <>
      {!outOfStock && (
        <section data-fs-product-details-values>
          <ProductPrice.Component
            data-fs-product-details-prices
            value={price}
            listPrice={listPrice}
            formatter={useFormattedPrice}
            {...ProductPrice.props}
          />
          <QuantitySelector.Component
            min={1}
            max={10}
            unitMultiplier={useUnitMultiplier ? unitMultiplier : 1}
            useUnitMultiplier={useUnitMultiplier}
            {...QuantitySelector.props}
            // Dynamic props shouldn't be overridable
            // This decision can be reviewed later if needed
            onChange={setQuantity}
          />
        </section>
      )}
      {skuVariants && (
        <Selectors
          slugsMap={skuVariants.slugsMap}
          availableVariations={skuVariants.availableVariations}
          activeVariations={skuVariants.activeVariations}
          data-fs-product-details-selectors
        />
      )}
      {isValidating ? (
        /* NOTE:
          A loading skeleton had to be used to avoid a Lighthouse's
          non-composited animation violation due to the button transitioning its
          background color when changing from its initial disabled to active state.
          See full explanation on commit https://git.io/JyXV5. */
        <AddToCartLoadingSkeleton />
      ) : (
        <AddToCartButton />
      )}
    </>
  )
}

export default ProductDetailsSettings
