import React, { useState } from 'react';
import {
  Image,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {
  availableStock,
  discountPercent,
  formatCurrency,
  getDashboardMetrics,
  orders,
  type Product,
  type ProductDraft,
} from '@cracker-shope/utils';

type StyleMap = Record<string, any>;

export function Shop({
  products,
  selectedProduct,
  styles,
  onSelectProduct,
  onBack,
}: {
  products: Product[];
  selectedProduct: Product | null;
  styles: StyleMap;
  onSelectProduct: (product: Product) => void;
  onBack: () => void;
}) {
  const [quantity, setQuantity] = useState(1);

  function updateQuantity(nextQuantity: number) {
    if (!selectedProduct) {
      return;
    }
    setQuantity(Math.min(Math.max(nextQuantity, 1), availableStock(selectedProduct)));
  }

  if (selectedProduct) {
    return (
      <View style={styles.stack}>
        <Pressable style={styles.textButton} onPress={onBack}>
          <Text style={styles.textButtonLabel}>Back to catalog</Text>
        </Pressable>
        <View style={styles.detailCard}>
          <Image source={{ uri: selectedProduct.imageUrl }} style={styles.detailImage} />
          <Text style={styles.breadcrumb}>Home / Shop / {selectedProduct.category}</Text>
          <Text style={styles.category}>{selectedProduct.category}</Text>
          <Text style={styles.detailTitle}>{selectedProduct.name}</Text>
          <Text style={styles.badge}>{discountPercent(selectedProduct)}% festive discount</Text>
          <Text style={styles.description}>{selectedProduct.description}</Text>
          <View style={styles.rowBetween}>
            <Text style={styles.detailPrice}>{formatCurrency(selectedProduct.price)}</Text>
            <Text style={styles.badge}>{availableStock(selectedProduct)} available</Text>
          </View>
          <View style={styles.quantityStepper}>
            <Pressable onPress={() => updateQuantity(quantity - 1)} style={styles.quantityButton}>
              <Text style={styles.quantityLabel}>-</Text>
            </Pressable>
            <Text style={styles.quantityValue}>{quantity}</Text>
            <Pressable onPress={() => updateQuantity(quantity + 1)} style={styles.quantityButton}>
              <Text style={styles.quantityLabel}>+</Text>
            </Pressable>
          </View>
          <View style={styles.metaCard}>
            <Text style={styles.description}>SKU: {selectedProduct.id.toUpperCase()}</Text>
            <Text style={styles.description}>Category: {selectedProduct.category}</Text>
            <Text style={styles.description}>Safety: {selectedProduct.safetyTag}</Text>
          </View>
          <Text style={styles.assetLine}>Video asset: {selectedProduct.videoUrl}</Text>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Add enquiry</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.stack}>
      <View style={styles.heroCard}>
        <Image source={{ uri: products[0].imageUrl }} style={styles.heroImage} />
        <Text style={styles.heroTitle}>Diwali crackers with rich media, live stock, and safety-first details.</Text>
      </View>
      <Text style={styles.sectionTitle}>Diwali collection</Text>
      {products.map((product) => (
        <Pressable style={styles.productCard} key={product.id} onPress={() => onSelectProduct(product)}>
          <Image source={{ uri: product.imageUrl }} style={styles.productImageSmall} />
          <View style={styles.productBody}>
            <Text style={styles.category}>{product.category}</Text>
            <Text style={styles.productTitle}>{product.name}</Text>
            <View style={styles.rowBetween}>
              <Text style={styles.price}>{formatCurrency(product.price)}</Text>
              <Text style={styles.badge}>{availableStock(product)} left</Text>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}

export function Admin({
  products,
  draft,
  metrics,
  styles,
  onDraftChange,
  onSave,
}: {
  products: Product[];
  draft: ProductDraft;
  metrics: ReturnType<typeof getDashboardMetrics>;
  styles: StyleMap;
  onDraftChange: (draft: ProductDraft) => void;
  onSave: () => void;
}) {
  return (
    <View style={styles.stack}>
      <Text style={styles.sectionTitle}>Admin app dashboard</Text>
      <View style={styles.metricsGrid}>
        <Metric label="Revenue" value={formatCurrency(metrics.revenue)} styles={styles} />
        <Metric label="Orders" value={String(metrics.orders)} styles={styles} />
        <Metric label="Inventory" value={String(metrics.inventoryUnits)} styles={styles} />
        <Metric label="Low stock" value={String(metrics.lowStock)} styles={styles} />
      </View>

      <View style={styles.formCard}>
        <Text style={styles.productTitle}>Add product</Text>
        <TextInput placeholder="Product name" value={draft.name} onChangeText={(name) => onDraftChange({ ...draft, name })} style={styles.input} />
        <TextInput placeholder="Description" value={draft.description} onChangeText={(description) => onDraftChange({ ...draft, description })} style={[styles.input, styles.textArea]} multiline />
        <TextInput placeholder="Price" value={draft.price ? String(draft.price) : ''} onChangeText={(value) => onDraftChange({ ...draft, price: Number(value) })} keyboardType="numeric" style={styles.input} />
        <TextInput placeholder="Image URL" value={draft.imageUrl} onChangeText={(imageUrl) => onDraftChange({ ...draft, imageUrl })} style={styles.input} />
        <TextInput placeholder="Video URL" value={draft.videoUrl} onChangeText={(videoUrl) => onDraftChange({ ...draft, videoUrl })} style={styles.input} />
        <Pressable style={styles.primaryButton} onPress={onSave}>
          <Text style={styles.primaryButtonText}>Save product draft</Text>
        </Pressable>
      </View>

      <Text style={styles.sectionTitle}>Inventory</Text>
      {products.map((product) => (
        <View style={styles.inventoryRow} key={product.id}>
          <Text style={styles.inventoryName}>{product.name}</Text>
          <Text style={styles.badge}>{availableStock(product)} available</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Orders</Text>
      {orders.map((order) => (
        <View style={styles.orderCard} key={order.id}>
          <Text style={styles.productTitle}>{order.id} | {order.status}</Text>
          <Text style={styles.description}>{order.customer} | {order.city}</Text>
          <Text style={styles.price}>{formatCurrency(order.total)}</Text>
        </View>
      ))}
    </View>
  );
}

function Metric({ label, value, styles }: { label: string; value: string; styles: StyleMap }) {
  return (
    <View style={styles.metricCard}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}
