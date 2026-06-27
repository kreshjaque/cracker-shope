import { useState } from 'react';
import {
  availableStock,
  discountPercent,
  formatCurrency,
  type Product,
} from '@cracker-shope/utils';

type ProductDetailProps = {
  product: Product;
  relatedProducts: Product[];
  cartItems: number;
  cartTotal: number;
  onBack: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
};

export function ProductDetail({
  product,
  relatedProducts,
  cartItems,
  cartTotal,
  onBack,
  onSelectProduct,
  onAddToCart,
}: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);

  function updateQuantity(nextQuantity: number) {
    setQuantity(Math.min(Math.max(nextQuantity, 1), availableStock(product)));
  }

  return (
    <section className="detailPage">
      <div className="detailTopbar">
        <button className="textButton" onClick={onBack}>Back to catalog</button>
        <span>{cartItems} items | {formatCurrency(cartTotal)}</span>
      </div>

      <article className="detailShell productPageShell">
        <div className="detailGallery">
          <div className="breadcrumb">Home / Shop / {product.category} / {product.name}</div>
          <div className="detailImageCard">
            <img src={product.imageUrl} alt={product.name} />
            <span className="discountBadge detailDiscount">-{discountPercent(product)}%</span>
          </div>
          <div className="thumbnailRow">
            <button className="active"><img src={product.imageUrl} alt="" /></button>
            <button><span>Video</span></button>
          </div>
        </div>

        <div className="detailInfo productSummary">
          <p className="eyebrow">{product.category}</p>
          <h2>{product.name}</h2>
          <div className="ratingPill">Rating {product.rating} | {product.safetyTag}</div>
          <div className="detailPrice">
            <strong>{formatCurrency(product.price)}</strong>
            <del>{formatCurrency(product.mrp)}</del>
            <span>{discountPercent(product)}% off</span>
          </div>
          <p>{product.description}</p>

          <div className="purchaseBox">
            <div className="quantityStepper" aria-label="Quantity">
              <button onClick={() => updateQuantity(quantity - 1)}>-</button>
              <strong>{quantity}</strong>
              <button onClick={() => updateQuantity(quantity + 1)}>+</button>
            </div>
            <button className="primaryButton detailButton" onClick={() => onAddToCart(product, quantity)}>
              Add enquiry
            </button>
          </div>

          <div className="productMeta">
            <span><strong>SKU:</strong> {product.id.toUpperCase()}</span>
            <span><strong>Category:</strong> {product.category}</span>
            <span><strong>Availability:</strong> {availableStock(product)} boxes</span>
          </div>

          <div className="detailStats">
            <div>
              <strong>{availableStock(product)}</strong>
              <span>Available stock</span>
            </div>
            <div>
              <strong>{product.reserved}</strong>
              <span>Reserved units</span>
            </div>
            <div>
              <strong>{product.reorderLevel}</strong>
              <span>Reorder level</span>
            </div>
          </div>
        </div>
      </article>

      <section className="productInfoTabs">
        <article>
          <h3>Description</h3>
          <p>{product.description}</p>
        </article>
        <article>
          <h3>Safety and delivery</h3>
          <p>
            Outdoor use only. Final sale, freight, delivery area, and minimum order confirmation are handled
            after enquiry review by the store team.
          </p>
        </article>
        <article>
          <h3>Product video</h3>
          <video controls muted poster={product.imageUrl}>
            <source src={product.videoUrl} type="video/mp4" />
          </video>
        </article>
      </section>

      <section className="relatedSection">
        <div className="sectionHeader compact">
          <div>
            <p className="eyebrow">Related products</p>
            <h2>You may also like</h2>
          </div>
        </div>
        <div className="relatedGrid">
          {relatedProducts.map((relatedProduct) => (
            <button key={relatedProduct.id} className="relatedCard" onClick={() => onSelectProduct(relatedProduct)}>
              <img src={relatedProduct.imageUrl} alt="" />
              <span>{relatedProduct.name}</span>
              <strong>{formatCurrency(relatedProduct.price)}</strong>
            </button>
          ))}
        </div>
      </section>
    </section>
  );
}
