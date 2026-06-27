export type ProductStatus = "Active" | "Draft" | "Low stock";
export type OrderStatus = "Placed" | "Packed" | "Out for delivery" | "Delivered";

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  mrp: number;
  stock: number;
  reserved: number;
  reorderLevel: number;
  rating: number;
  safetyTag: string;
  imageUrl: string;
  videoUrl: string;
  status: ProductStatus;
  featured?: boolean;
};

export type Order = {
  id: string;
  customer: string;
  phone: string;
  city: string;
  status: OrderStatus;
  total: number;
  items: number;
  createdAt: string;
};

export type ProductDraft = Pick<
  Product,
  "name" | "category" | "description" | "price" | "mrp" | "stock" | "imageUrl" | "videoUrl"
>;

export const currency = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export const categories = ["Sparklers", "Flower Pots", "Rockets", "Gift Boxes", "Ground Chakkars"];

export const products: Product[] = [
  {
    id: "spark-classic",
    name: "Classic Gold Sparklers",
    category: "Sparklers",
    description: "Long-burning 10 cm sparklers with bright gold trails for family celebrations.",
    price: 180,
    mrp: 240,
    stock: 128,
    reserved: 14,
    reorderLevel: 40,
    rating: 4.8,
    safetyTag: "Low smoke",
    imageUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://cdn.coverr.co/videos/coverr-sparkler-at-night-2414/1080p.mp4",
    status: "Active",
    featured: true,
  },
  {
    id: "pot-rainbow",
    name: "Rainbow Flower Pot",
    category: "Flower Pots",
    description: "Color fountain pot with layered green, red, and silver crackle effects.",
    price: 520,
    mrp: 650,
    stock: 46,
    reserved: 8,
    reorderLevel: 24,
    rating: 4.7,
    safetyTag: "Outdoor only",
    imageUrl: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://cdn.coverr.co/videos/coverr-fireworks-in-the-sky-2761/1080p.mp4",
    status: "Active",
    featured: true,
  },
  {
    id: "rocket-comet",
    name: "Comet Tail Rockets",
    category: "Rockets",
    description: "Pack of 12 aerial rockets with comet trails and clean burst timing.",
    price: 890,
    mrp: 1100,
    stock: 19,
    reserved: 6,
    reorderLevel: 20,
    rating: 4.5,
    safetyTag: "Licensed zones",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://cdn.coverr.co/videos/coverr-colorful-fireworks-5236/1080p.mp4",
    status: "Low stock",
  },
  {
    id: "box-festival",
    name: "Festival Family Box",
    category: "Gift Boxes",
    description: "Curated 38-piece family assortment with sparklers, fountains, chakkars, and novelty shots.",
    price: 2490,
    mrp: 3200,
    stock: 34,
    reserved: 11,
    reorderLevel: 16,
    rating: 4.9,
    safetyTag: "Best seller",
    imageUrl: "https://images.unsplash.com/photo-1467810563316-b5476525c0f9?auto=format&fit=crop&w=900&h=900&q=80",
    videoUrl: "https://cdn.coverr.co/videos/coverr-fireworks-show-5835/1080p.mp4",
    status: "Active",
    featured: true,
  },
  {
    id: "chak-green",
    name: "Emerald Ground Chakkars",
    category: "Ground Chakkars",
    description: "Fast-spinning green chakkars with steady ground bloom and low debris.",
    price: 360,
    mrp: 480,
    stock: 72,
    reserved: 9,
    reorderLevel: 30,
    rating: 4.6,
    safetyTag: "Flat surface",
    imageUrl: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?auto=format&fit=crop&w=900&q=80",
    videoUrl: "https://cdn.coverr.co/videos/coverr-party-sparklers-7622/1080p.mp4",
    status: "Active",
  },
];

export const orders: Order[] = [
  { id: "ORD-1048", customer: "Aarav Mehta", phone: "+91 98765 41028", city: "Chennai", status: "Placed", total: 5480, items: 6, createdAt: "2026-06-28 09:42" },
  { id: "ORD-1047", customer: "Nisha Rao", phone: "+91 98401 77211", city: "Madurai", status: "Packed", total: 1820, items: 3, createdAt: "2026-06-28 08:10" },
  { id: "ORD-1046", customer: "Vikram Iyer", phone: "+91 94444 52980", city: "Coimbatore", status: "Out for delivery", total: 7690, items: 9, createdAt: "2026-06-27 19:25" },
  { id: "ORD-1045", customer: "Meera Shah", phone: "+91 99887 23014", city: "Bengaluru", status: "Delivered", total: 2490, items: 1, createdAt: "2026-06-27 17:02" },
];

export function getWelcomeMessage(appName = "Cracker Shope") {
  return `Welcome to ${appName}!`;
}

export function formatAppName(name: string) {
  return name
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatCurrency(value: number) {
  return currency.format(value);
}

export function availableStock(product: Product) {
  return Math.max(product.stock - product.reserved, 0);
}

export function discountPercent(product: Product) {
  return Math.round(((product.mrp - product.price) / product.mrp) * 100);
}

export function inventoryStatus(product: Product): ProductStatus {
  return availableStock(product) <= product.reorderLevel ? "Low stock" : product.status;
}

export function createProduct(input: ProductDraft): Product {
  return {
    ...input,
    id: input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
    reserved: 0,
    reorderLevel: 20,
    rating: 4.4,
    safetyTag: "Review required",
    status: "Draft",
  };
}

export function getDashboardMetrics(productList = products, orderList = orders) {
  const revenue = orderList.reduce((sum, order) => sum + order.total, 0);
  const inventoryUnits = productList.reduce((sum, product) => sum + availableStock(product), 0);
  const lowStock = productList.filter((product) => inventoryStatus(product) === "Low stock").length;
  return {
    revenue,
    orders: orderList.length,
    inventoryUnits,
    lowStock,
    avgOrderValue: Math.round(revenue / Math.max(orderList.length, 1)),
  };
}

export function getFeaturedProducts(productList = products) {
  return productList.filter((product) => product.featured || product.status === "Active").slice(0, 4);
}
