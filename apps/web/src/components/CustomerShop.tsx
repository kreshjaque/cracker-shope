import {
  availableStock,
  discountPercent,
  formatCurrency,
  getFeaturedProducts,
  type Product,
} from '@cracker-shope/utils';
import { ProductDetail } from './ProductDetail';

export type CategoryCount = {
  name: string;
  count: number;
};

type CustomerShopProps = {
  products: Product[];
  allProducts: Product[];
  categoryCounts: CategoryCount[];
  selectedProduct: Product | null;
  selectedCategory: string;
  query: string;
  cartItems: number;
  cartTotal: number;
  onCategoryChange: (category: string) => void;
  onQueryChange: (query: string) => void;
  onSelectProduct: (product: Product) => void;
  onCloseProduct: () => void;
  onAddToCart: (product: Product, quantity?: number) => void;
};

export function CustomerShop({
  products,
  allProducts,
  categoryCounts,
  selectedProduct,
  selectedCategory,
  query,
  cartItems,
  cartTotal,
  onCategoryChange,
  onQueryChange,
  onSelectProduct,
  onCloseProduct,
  onAddToCart,
}: CustomerShopProps) {
  const heroProduct = getFeaturedProducts(allProducts)[0];

  if (selectedProduct) {
    return (
      <ProductDetail
        product={selectedProduct}
        relatedProducts={allProducts.filter((product) => product.id !== selectedProduct.id).slice(0, 4)}
        cartItems={cartItems}
        cartTotal={cartTotal}
        onBack={onCloseProduct}
        onSelectProduct={onSelectProduct}
        onAddToCart={onAddToCart}
      />
    );
  }

  return (
    <>
      <section className="noticeBar">
        <strong>Updates</strong>
        <span>
          Online firecracker sale rules vary by region. Submit an enquiry/cart request and our team will confirm
          availability, minimum order value, freight, and delivery eligibility.
        </span>
      </section>

      <section className="heroPanel">
        <video autoPlay muted loop playsInline poster={heroProduct.imageUrl}>
          <source src={heroProduct.videoUrl} type="video/mp4" />
        </video>
        <div className="heroContent">
          <p className="eyebrow">Special offer upto 80% discount</p>
          <h2>Sivakasi-style Diwali crackers, organized for quick enquiry.</h2>
          <p>
            Browse compact categories, compare festive prices, view product media, and build an enquiry cart
            for Tamil Nadu celebrations.
          </p>
          <div className="heroActions">
            <a href="#catalog">Browse products</a>
            <span>{cartItems} items | {formatCurrency(cartTotal)}</span>
          </div>
        </div>
      </section>

      <section className="trustStrip" aria-label="Store highlights">
        <div>
          <strong>Licensed sellers</strong>
          <span>Compliance-first product catalog</span>
        </div>
        <div>
          <strong>Diwali-ready assets</strong>
          <span>Images, videos, descriptions</span>
        </div>
        <div>
          <strong>Inventory aware</strong>
          <span>Stock, reserved units, reorder alerts</span>
        </div>
      </section>

      <section className="sectionHeader" id="catalog">
        <div>
          <p className="eyebrow">Quick buy catalog</p>
          <h2>Browse crackers</h2>
        </div>
        <div className="catalogSearch">
          <input
            aria-label="Search products"
            placeholder="Search crackers, category, effect..."
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
        </div>
      </section>

      <section className="shopLayout">
        <CategoryRail
          categoryCounts={categoryCounts}
          selectedCategory={selectedCategory}
          onCategoryChange={onCategoryChange}
        />

        <div className="catalogPane">
          <div className="catalogMeta">
            <strong>{products.length} products</strong>
            <span>{selectedCategory === 'All' ? 'All categories' : selectedCategory}</span>
          </div>
          <section className="productGrid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </section>
        </div>
      </section>
    </>
  );
}

function CategoryRail({
  categoryCounts,
  selectedCategory,
  onCategoryChange,
}: {
  categoryCounts: CategoryCount[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}) {
  const totalProducts = categoryCounts.reduce((sum, category) => sum + category.count, 0);

  return (
    <aside className="categoryRail" aria-label="Browse categories">
      <div className="railHeader">
        <strong>Browse Categories</strong>
        <span>{totalProducts} products</span>
      </div>
      <button className={selectedCategory === 'All' ? 'active' : ''} onClick={() => onCategoryChange('All')}>
        <span>All products</span>
        <b>{totalProducts}</b>
      </button>
      {categoryCounts.map((category) => (
        <button
          key={category.name}
          className={selectedCategory === category.name ? 'active' : ''}
          onClick={() => onCategoryChange(category.name)}
        >
          <span>{category.name}</span>
          <b>{category.count}</b>
        </button>
      ))}
    </aside>
  );
}

function ProductCard({
  product,
  onSelectProduct,
  onAddToCart,
}: {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}) {
  return (
    <article className="productCard compactCard">
      <button className="cardHitArea" onClick={() => onSelectProduct(product)} aria-label={`View ${product.name}`}>
        <span />
      </button>
      <span className="discountBadge">-{discountPercent(product)}%</span>
      <div className="mediaFrame compactMedia">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="productBody">
        <div>
          <p className="category">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <div className="priceRow">
          <strong>{formatCurrency(product.price)}</strong>
          <del>{formatCurrency(product.mrp)}</del>
        </div>
        <div className="stockLine">
          <span>{availableStock(product)} available</span>
          <span>{product.rating} rating</span>
        </div>
        <button className="primaryButton compactButton" onClick={() => onAddToCart(product)}>
          Add enquiry
        </button>
      </div>
    </article>
  );
}
