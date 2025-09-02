import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function BarcodeScanner() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [barcode, setBarcode] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    setBarcode(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {barcode && <Text style={styles.barcodeText}>Scanned: {barcode}</Text>}
      {scanned && (
        <Text style={styles.resetText} onPress={() => setScanned(false)}>
          Tap to scan again
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  barcodeText: { position: 'absolute', bottom: 60, fontSize: 18, color: '#fff', backgroundColor: 'rgba(0,0,0,0.6)', padding: 6, borderRadius: 8 },
  resetText: { position: 'absolute', bottom: 20, fontSize: 16, color: '#00f', backgroundColor: '#fff', padding: 6, borderRadius: 8 },
});