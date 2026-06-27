import {
  availableStock,
  categories,
  formatCurrency,
  getDashboardMetrics,
  inventoryStatus,
  type Order,
  type Product,
  type ProductDraft,
} from '@cracker-shope/utils';

type AdminOfficeProps = {
  products: Product[];
  orders: Order[];
  metrics: ReturnType<typeof getDashboardMetrics>;
  draft: ProductDraft;
  onDraftChange: (draft: ProductDraft) => void;
  onAddProduct: () => void;
};

export function AdminOffice({
  products,
  orders,
  metrics,
  draft,
  onDraftChange,
  onAddProduct,
}: AdminOfficeProps) {
  return (
    <>
      <section className="adminHero">
        <div>
          <p className="eyebrow">Back office</p>
          <h2>Manage festive sales with live inventory clarity.</h2>
          <span>Products, media assets, orders, and reorder signals in one elegant workspace.</span>
        </div>
        <button className="primaryButton">Export stock report</button>
      </section>

      <section className="dashboardGrid" aria-label="Admin dashboard">
        <Metric title="Revenue" value={formatCurrency(metrics.revenue)} note={`AOV ${formatCurrency(metrics.avgOrderValue)}`} />
        <Metric title="Orders" value={String(metrics.orders)} note="Live queue" />
        <Metric title="Inventory" value={String(metrics.inventoryUnits)} note="Sellable units" />
        <Metric title="Low stock" value={String(metrics.lowStock)} note="Needs refill" />
      </section>

      <section className="adminLayout">
        <ProductForm draft={draft} onDraftChange={onDraftChange} onAddProduct={onAddProduct} />
        <InventoryPanel products={products} />
      </section>

      <OrdersPanel orders={orders} />
    </>
  );
}

function Metric({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <article className="metricCard">
      <p>{title}</p>
      <strong>{value}</strong>
      <span>{note}</span>
    </article>
  );
}

function ProductForm({
  draft,
  onDraftChange,
  onAddProduct,
}: {
  draft: ProductDraft;
  onDraftChange: (draft: ProductDraft) => void;
  onAddProduct: () => void;
}) {
  return (
    <form className="adminPanel elevatedPanel" onSubmit={(event) => { event.preventDefault(); onAddProduct(); }}>
      <div className="sectionHeader compact">
        <div>
          <p className="eyebrow">Catalog manager</p>
          <h2>Add product</h2>
        </div>
      </div>
      <label>
        Product name
        <input value={draft.name} onChange={(event) => onDraftChange({ ...draft, name: event.target.value })} />
      </label>
      <label>
        Category
        <select value={draft.category} onChange={(event) => onDraftChange({ ...draft, category: event.target.value })}>
          {categories.map((category) => <option key={category}>{category}</option>)}
        </select>
      </label>
      <label>
        Description
        <textarea value={draft.description} onChange={(event) => onDraftChange({ ...draft, description: event.target.value })} />
      </label>
      <div className="formGrid">
        <label>
          Price
          <input type="number" value={draft.price || ''} onChange={(event) => onDraftChange({ ...draft, price: Number(event.target.value) })} />
        </label>
        <label>
          MRP
          <input type="number" value={draft.mrp || ''} onChange={(event) => onDraftChange({ ...draft, mrp: Number(event.target.value) })} />
        </label>
        <label>
          Stock
          <input type="number" value={draft.stock || ''} onChange={(event) => onDraftChange({ ...draft, stock: Number(event.target.value) })} />
        </label>
      </div>
      <label>
        Image asset URL
        <input value={draft.imageUrl} onChange={(event) => onDraftChange({ ...draft, imageUrl: event.target.value })} />
      </label>
      <label>
        Video asset URL
        <input value={draft.videoUrl} onChange={(event) => onDraftChange({ ...draft, videoUrl: event.target.value })} />
      </label>
      <button className="primaryButton" type="submit">Save product draft</button>
    </form>
  );
}

function InventoryPanel({ products }: { products: Product[] }) {
  return (
    <div className="adminPanel elevatedPanel">
      <div className="sectionHeader compact">
        <div>
          <p className="eyebrow">Inventory</p>
          <h2>Products</h2>
        </div>
      </div>
      <div className="tableLike">
        {products.map((product) => (
          <div className="tableRow" key={product.id}>
            <img src={product.imageUrl} alt="" />
            <div>
              <strong>{product.name}</strong>
              <span>{product.category}</span>
            </div>
            <span>{availableStock(product)} left</span>
            <b className={inventoryStatus(product) === 'Low stock' ? 'danger' : ''}>{inventoryStatus(product)}</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrdersPanel({ orders }: { orders: Order[] }) {
  return (
    <section className="adminPanel elevatedPanel ordersPanel">
      <div className="sectionHeader compact">
        <div>
          <p className="eyebrow">Order management</p>
          <h2>Recent orders</h2>
        </div>
      </div>
      <div className="ordersGrid">
        {orders.map((order) => (
          <article key={order.id} className="orderCard">
            <div>
              <strong>{order.id}</strong>
              <span>{order.createdAt}</span>
            </div>
            <h3>{order.customer}</h3>
            <p>{order.city} | {order.phone}</p>
            <div className="stockLine">
              <span>{order.items} items</span>
              <strong>{formatCurrency(order.total)}</strong>
            </div>
            <b>{order.status}</b>
          </article>
        ))}
      </div>
    </section>
  );
}
