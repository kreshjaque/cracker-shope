import { useMemo, useState } from 'react';
import {
  categories,
  createProduct,
  getDashboardMetrics,
  orders as seedOrders,
  products as seedProducts,
  type Order,
  type Product,
  type ProductDraft,
} from '@cracker-shope/utils';
import { AdminOffice } from './components/AdminOffice';
import { CustomerShop, type CategoryCount } from './components/CustomerShop';
import './App.css';

type View = 'shop' | 'admin';

type CartLine = {
  product: Product;
  quantity: number;
};

const emptyDraft: ProductDraft = {
  name: '',
  category: categories[0],
  description: '',
  price: 0,
  mrp: 0,
  stock: 0,
  imageUrl: '',
  videoUrl: '',
};

function App() {
  const [view, setView] = useState<View>('shop');
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [orders] = useState<Order[]>(seedOrders);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [query, setQuery] = useState('');
  const [cart, setCart] = useState<CartLine[]>([]);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return products.filter((product) => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const queryMatch =
        !normalizedQuery ||
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [products, query, selectedCategory]);

  const categoryCounts = useMemo<CategoryCount[]>(
    () =>
      categories.map((category) => ({
        name: category,
        count: products.filter((product) => product.category === category).length,
      })),
    [products],
  );

  const metrics = useMemo(() => getDashboardMetrics(products, orders), [products, orders]);
  const cartTotal = cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0);
  const cartItems = cart.reduce((sum, line) => sum + line.quantity, 0);

  function addToCart(product: Product, quantity = 1) {
    setCart((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
          line.product.id === product.id ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...current, { product, quantity }];
    });
  }

  function addProduct() {
    if (!draft.name || !draft.description || !draft.imageUrl || draft.price <= 0) {
      return;
    }
    setProducts((current) => [createProduct(draft), ...current]);
    setDraft(emptyDraft);
    setView('admin');
  }

  return (
    <main className="appShell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Tamil Nadu Diwali commerce</p>
          <h1>Cracker Shope</h1>
        </div>
        <nav className="viewSwitch" aria-label="Primary view">
          <button className={view === 'shop' ? 'active' : ''} onClick={() => setView('shop')}>
            Customer shop
          </button>
          <button className={view === 'admin' ? 'active' : ''} onClick={() => setView('admin')}>
            Admin office
          </button>
        </nav>
      </header>

      {view === 'shop' ? (
        <CustomerShop
          products={visibleProducts}
          allProducts={products}
          categoryCounts={categoryCounts}
          selectedProduct={selectedProduct}
          selectedCategory={selectedCategory}
          query={query}
          cartItems={cartItems}
          cartTotal={cartTotal}
          onCategoryChange={setSelectedCategory}
          onQueryChange={setQuery}
          onSelectProduct={setSelectedProduct}
          onCloseProduct={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      ) : (
        <AdminOffice
          products={products}
          orders={orders}
          metrics={metrics}
          draft={draft}
          onDraftChange={setDraft}
          onAddProduct={addProduct}
        />
      )}
    </main>
  );
}

export default App;
