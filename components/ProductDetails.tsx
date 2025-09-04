import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image, ScrollView } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { supabase } from '../lib/supabase';

import NegativesList from './NegativesList';
import PositivesList from './PositivesList';

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  card: { backgroundColor: "#fff", borderRadius: 16, margin: 16, padding: 0, flex: 1, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  header: { alignItems: "center", paddingTop: 24, paddingBottom: 8 },
  found: { fontSize: 18, color: "#4caf50", fontWeight: "bold" },
  box: { width: "90%", alignSelf: "center", backgroundColor: "#f9f9f9", borderRadius: 12, padding: 12, marginBottom: 12, alignItems: "center", shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  headerRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  scoreBadge: { fontSize: 18, fontWeight: "bold", backgroundColor: "#ffeaea", paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 8 },
  image: { width: "100%", height: 180, borderRadius: 12, backgroundColor: "#eee" },
  name: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  brand: { fontSize: 14, color: "#888" },
  scanAgain: { backgroundColor: "#fff", borderColor: "#4caf50", borderWidth: 1, paddingVertical: 10, paddingHorizontal: 32, borderRadius: 8, margin: 16, alignSelf: "center" },
  scanAgainText: { color: "#4caf50", fontWeight: "bold", fontSize: 16 },
  notFound: { fontSize: 20, color: "#e53935", fontWeight: "bold", marginBottom: 12, textAlign: "center" },
});


type RootStackParamList = {
  Scan: undefined;
  ProductDetails: { barcode: string };
};

type ProductDetailsProps = NativeStackScreenProps<RootStackParamList, 'ProductDetails'>;

type Product = {
  name: string;
  brand: string;
  score: number;
  image?: string;
  negatives: { label: string; value: string | number; color: string; description: string }[];
  positives: { label: string; value: string | number; color: string; description: string }[];
};

const getScoreColor = (score: number) => {
  if (score < 50) return "#e53935"; // red
  if (score < 70) return "#ffb300"; // yellow
  return "#4caf50"; // green
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ route, navigation }) => {
  const { barcode } = route.params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchProduct() {
    setLoading(true);
    console.log('Searching for barcode:', barcode);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('barcode', barcode)
      .single();

    if (error) console.log('Supabase error:', error);
    if (!data) console.log('No product found for barcode:', barcode);
    else console.log('Product found:', data);

    setProduct(data as Product);
    setLoading(false);
  }
  fetchProduct();
}, [barcode]);

   if (loading) return <ActivityIndicator style={{ flex: 1 }} />;
  if (!product) return (
    <View style={styles.container}>
      <Text style={styles.notFound}>Product not found</Text>
      <Text style={{ textAlign: "center" }}>Barcode: {barcode}</Text>
      <TouchableOpacity style={styles.scanAgain} onPress={() => navigation.navigate('Scan')}>
        <Text style={styles.scanAgainText}>Scan Again</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <View style={styles.header}>
          <Text style={styles.found}>🎉 Product Found!</Text>
        </View>

        <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
          <View style={styles.box}>
            <Text
              style={[
                styles.scoreBadge,
                { color: getScoreColor(product.score), borderColor: getScoreColor(product.score), borderWidth: 2 }
              ]}
            >
              {product.score}/100
            </Text>
          </View>

          {product.image && (
            <View style={[styles.box, { padding: 0, overflow: "hidden", height: 180 }]}>
              <Image
                source={{ uri: product.image }}
                style={styles.image}
                resizeMode="cover"
                onError={() => setProduct({ ...product, image: 'https://media.istockphoto.com/id/539071535/photo/bowl-of-dog-food.jpg?s=612x612&w=0&k=20&c=48jSoNa5Vod-1inwbhpSQWKv5eEIhnWr8YAfhKI823M=' })}
              />
            </View>
          )}

          <View style={styles.box}>
            <Text style={styles.name}>{product.name}</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.brand}>{product.brand}</Text>
          </View>
          <View style={styles.box}>
            <NegativesList negatives={product.negatives} />
          </View>
          <View style={styles.box}>
            <PositivesList positives={product.positives} />
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.scanAgain} onPress={() => navigation.navigate('Scan')}>
          <Text style={styles.scanAgainText}>Scan Again</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default ProductDetails;