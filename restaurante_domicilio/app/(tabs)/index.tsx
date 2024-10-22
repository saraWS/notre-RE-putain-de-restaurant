import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos el ícono de FontAwesome

const menuItems = [
  { nombre: 'Limonada', tipo: 'Bebidas Frías', descripcion: 'Limonada fresca con hielo', precio: 5000 },
  { nombre: 'Coca-Cola', tipo: 'Bebidas Frías', descripcion: 'Refresco de cola', precio: 4500 },
  { nombre: 'Té Helado', tipo: 'Bebidas Frías', descripcion: 'Té con limón y hielo', precio: 6000 },
  { nombre: 'Agua Mineral', tipo: 'Bebidas Frías', descripcion: 'Agua con gas', precio: 3500 },
  { nombre: 'Sopa de Pollo', tipo: 'Sopas', descripcion: 'Sopa casera de pollo con fideos', precio: 12000 },
  { nombre: 'Sopa de Tomate', tipo: 'Sopas', descripcion: 'Sopa cremosa de tomate', precio: 11000 },
  { nombre: 'Sopa de Verduras', tipo: 'Sopas', descripcion: 'Sopa mixta de verduras', precio: 11500 },
  { nombre: 'Sopa de Mariscos', tipo: 'Sopas', descripcion: 'Sopa con una mezcla de mariscos', precio: 15000 },
  { nombre: 'Pollo a la Parrilla', tipo: 'Platos del Día', descripcion: 'Pollo con arroz y ensalada', precio: 20000 },
  { nombre: 'Carne Asada', tipo: 'Platos del Día', descripcion: 'Carne de res con papas fritas', precio: 22000 },
  { nombre: 'Pasta Alfredo', tipo: 'Platos a la Carta', descripcion: 'Pasta con salsa alfredo y pollo', precio: 18000 },
  { nombre: 'Pizza Margarita', tipo: 'Platos a la Carta', descripcion: 'Pizza con tomate, mozzarella y albahaca', precio: 25000 },
  { nombre: 'Hamburguesa', tipo: 'Platos a la Carta', descripcion: 'Hamburguesa con queso y papas fritas', precio: 17000 },
  { nombre: 'Tacos', tipo: 'Platos a la Carta', descripcion: 'Tacos con carne, queso y guacamole', precio: 16000 },
  { nombre: 'Ensalada César', tipo: 'Platos a la Carta', descripcion: 'Ensalada con pollo y aderezo César', precio: 14000 },
  { nombre: 'Risotto de Champiñones', tipo: 'Platos a la Carta', descripcion: 'Risotto cremoso con champiñones', precio: 20000 },
  { nombre: 'Menú Infantil', tipo: 'Menú Infantil', descripcion: 'Nuggets de pollo con papas fritas', precio: 12000 },
];

export default function HomeScreen({ navigation }) {
  const [carrito, setCarrito] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const handleCantidadChange = (nombre, cantidad) => {
    setCantidades((prev) => ({ ...prev, [nombre]: parseInt(cantidad) || 0 }));
  };

  const agregarAlCarrito = (plato) => {
    const cantidad = cantidades[plato.nombre] || 1;
    if (cantidad > 0) {
      setCarrito((prev) => [...prev, { ...plato, cantidad }]);
      Alert.alert('Añadido al carrito', `${plato.nombre} x${cantidad}`);
    } else {
      Alert.alert('Error', 'La cantidad debe ser mayor que 0.');
    }
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const irAlCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bienvenido a su restaurante a domicilio</Text>
        <TouchableOpacity onPress={irAlCarrito} style={styles.cartIcon}>
          <Icon name="shopping-cart" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      {mostrarCarrito ? (
        <View style={styles.carritoContainer}>
          <Text style={styles.carritoTitle}>Carrito de compras</Text>
          <ScrollView>
            {carrito.length > 0 ? (
              carrito.map((item, index) => (
                <Text key={index} style={styles.carritoItem}>
                  {item.nombre} x{item.cantidad} - ${item.precio * item.cantidad}
                </Text>
              ))
            ) : (
              <Text style={styles.emptyCartText}>Tu carrito está vacío.</Text>
            )}
            <Text style={styles.totalText}>Total: ${calcularTotal().toLocaleString()} COP</Text>
          </ScrollView>
        </View>
      ) : (
        <ScrollView style={styles.menuContainer}>
          {menuItems.map((plato, index) => (
            <View key={index} style={styles.menuItem}>
              <Text style={styles.menuItemTitle}>{plato.nombre}</Text>
              <Text style={styles.menuItemType}>{plato.tipo}</Text>
              <Text style={styles.menuItemDescription}>{plato.descripcion}</Text>
              <Text style={styles.menuItemPrice}>Precio: ${plato.precio.toLocaleString()} COP</Text>

              <TextInput
                style={styles.input}
                placeholder="Cantidad"
                keyboardType="numeric"
                onChangeText={(value) => handleCantidadChange(plato.nombre, value)}
                value={cantidades[plato.nombre]?.toString() || '1'}
              />

              <Button title="Añadir al carrito" onPress={() => agregarAlCarrito(plato)} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ff6347',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  cartIcon: {
    position: 'absolute',
    right: 20,
    top: 50,
  },
  menuContainer: {
    padding: 20,
  },
  menuItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  menuItemType: {
    fontSize: 14,
    color: '#666',
    marginVertical: 5,
  },
  menuItemDescription: {
    fontSize: 14,
    color: '#333',
  },
  menuItemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginTop: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginVertical: 10,
    width: 80,
  },
  carritoContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  carritoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  carritoItem: {
    fontSize: 16,
    marginVertical: 5,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  emptyCartText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});
