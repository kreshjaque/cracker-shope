import React, { useMemo, useState } from 'react';
import { Pressable, ScrollView, StatusBar, StyleSheet, Text, View, useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  categories,
  createProduct,
  getDashboardMetrics,
  orders,
  products as seedProducts,
  type Product,
  type ProductDraft,
} from '@cracker-shope/utils';
import { Admin, Shop } from './src/components/MobileScreens';

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
  const isDarkMode = useColorScheme() === 'dark';
  const [mode, setMode] = useState<'shop' | 'admin'>('shop');
  const [products, setProducts] = useState<Product[]>(seedProducts);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [draft, setDraft] = useState<ProductDraft>(emptyDraft);
  const metrics = useMemo(() => getDashboardMetrics(products, orders), [products]);

  function saveDraft() {
    if (!draft.name || !draft.description || draft.price <= 0) {
      return;
    }
    setProducts((current) => [createProduct(draft), ...current]);
    setDraft(emptyDraft);
    setMode('admin');
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>Tamil Nadu Diwali commerce</Text>
          <Text style={styles.title}>Cracker Shope</Text>
          <View style={styles.segment}>
            <Pressable onPress={() => setMode('shop')} style={[styles.segmentButton, mode === 'shop' && styles.segmentActive]}>
              <Text style={[styles.segmentText, mode === 'shop' && styles.segmentTextActive]}>Shop</Text>
            </Pressable>
            <Pressable onPress={() => setMode('admin')} style={[styles.segmentButton, mode === 'admin' && styles.segmentActive]}>
              <Text style={[styles.segmentText, mode === 'admin' && styles.segmentTextActive]}>Admin</Text>
            </Pressable>
          </View>
        </View>

        {mode === 'shop' ? (
          <Shop
            products={products}
            selectedProduct={selectedProduct}
            styles={styles}
            onSelectProduct={setSelectedProduct}
            onBack={() => setSelectedProduct(null)}
          />
        ) : (
          <Admin products={products} draft={draft} metrics={metrics} styles={styles} onDraftChange={setDraft} onSave={saveDraft} />
        )}
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff8ed',
  },
  container: {
    padding: 18,
    paddingBottom: 40,
  },
  header: {
    gap: 10,
    marginBottom: 18,
  },
  eyebrow: {
    color: '#d03979',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  title: {
    color: '#213c79',
    fontSize: 34,
    fontWeight: '900',
  },
  segment: {
    flexDirection: 'row',
    padding: 4,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
  },
  segmentButton: {
    flex: 1,
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  segmentActive: {
    backgroundColor: '#213c79',
  },
  segmentText: {
    color: '#5c6070',
    fontWeight: '800',
  },
  segmentTextActive: {
    color: '#ffffff',
  },
  stack: {
    gap: 14,
  },
  heroCard: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#213c79',
  },
  heroImage: {
    height: 220,
    width: '100%',
  },
  heroTitle: {
    padding: 16,
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '900',
    backgroundColor: '#213c79',
  },
  sectionTitle: {
    marginTop: 8,
    color: '#213c79',
    fontSize: 22,
    fontWeight: '900',
  },
  productCard: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
  },
  productImage: {
    width: '100%',
    height: 210,
  },
  productImageSmall: {
    width: 104,
    minHeight: 118,
  },
  productBody: {
    flex: 1,
    gap: 8,
    padding: 14,
    justifyContent: 'center',
  },
  category: {
    color: '#d02626',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  productTitle: {
    color: '#182447',
    fontSize: 18,
    fontWeight: '900',
  },
  description: {
    color: '#5c6070',
    lineHeight: 20,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  price: {
    color: '#213c79',
    fontSize: 18,
    fontWeight: '900',
  },
  detailCard: {
    gap: 12,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
  },
  detailImage: {
    width: '100%',
    height: 280,
    borderRadius: 8,
  },
  detailTitle: {
    color: '#213c79',
    fontSize: 28,
    fontWeight: '900',
  },
  breadcrumb: {
    color: '#5c6070',
    fontSize: 12,
    fontWeight: '700',
  },
  detailPrice: {
    color: '#213c79',
    fontSize: 26,
    fontWeight: '900',
  },
  quantityStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    minHeight: 46,
    borderRadius: 8,
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
    backgroundColor: '#fffdf8',
  },
  quantityButton: {
    width: 48,
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityLabel: {
    color: '#213c79',
    fontSize: 22,
    fontWeight: '900',
  },
  quantityValue: {
    flex: 1,
    color: '#182447',
    fontSize: 18,
    fontWeight: '900',
    textAlign: 'center',
  },
  metaCard: {
    gap: 6,
    borderRadius: 8,
    borderColor: '#76c8ba',
    borderWidth: 1,
    padding: 12,
    backgroundColor: '#fffdf8',
  },
  textButton: {
    minHeight: 42,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    borderRadius: 8,
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
  },
  textButtonLabel: {
    color: '#213c79',
    fontWeight: '900',
  },
  badge: {
    overflow: 'hidden',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff1d4',
    color: '#213c79',
    fontSize: 12,
    fontWeight: '800',
  },
  assetLine: {
    color: '#5c6070',
    fontSize: 12,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  metricCard: {
    width: '47%',
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
  },
  metricLabel: {
    color: '#5c6070',
    marginBottom: 8,
  },
  metricValue: {
    color: '#213c79',
    fontSize: 20,
    fontWeight: '900',
  },
  formCard: {
    gap: 10,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
  },
  input: {
    minHeight: 44,
    borderRadius: 8,
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
    paddingHorizontal: 12,
    color: '#182447',
    backgroundColor: '#fffdf8',
  },
  textArea: {
    minHeight: 88,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  primaryButton: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: '#f65a00',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '900',
  },
  inventoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
  },
  inventoryName: {
    flex: 1,
    color: '#182447',
    fontWeight: '800',
  },
  orderCard: {
    gap: 6,
    padding: 14,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderColor: 'rgba(33, 60, 121, 0.16)',
    borderWidth: 1,
  },
});

export default App;
