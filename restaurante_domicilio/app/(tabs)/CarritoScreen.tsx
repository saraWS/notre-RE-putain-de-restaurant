import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function CarritoScreen({ route }) {
  const { carrito, total } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de Compras</Text>
      <ScrollView style={styles.cartContainer}>
        {carrito.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Text style={styles.cartItemText}>{item.nombre} x{item.cantidad} - ${item.precio * item.cantidad} COP</Text>
          </View>
        ))}
        <Text style={styles.totalText}>Total: ${total.toLocaleString()} COP</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  cartContainer: {
    flex: 1,
  },
  cartItem: {
    marginBottom: 10,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  cartItemText: {
    fontSize: 18,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});
