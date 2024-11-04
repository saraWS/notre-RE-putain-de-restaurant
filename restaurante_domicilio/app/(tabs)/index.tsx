import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput, Alert, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos el ícono de FontAwesome
import { Picker } from '@react-native-picker/picker';

const menuItems = [
  { nombre: 'Limonada', tipo: 'Bebidas Frías', descripcion: 'Limonada fresca con hielo', precio: 5000 ,imagen: require('../../assets/images/limonada.png')},
  { nombre: 'Coca-Cola', tipo: 'Bebidas Frías', descripcion: 'Refresco de cola', precio: 4500 ,imagen: require('../../assets/images/cocacola.jpg')},
  { nombre: 'Té Helado', tipo: 'Bebidas Frías', descripcion: 'Té con limón y hielo', precio: 6000 ,imagen: require('../../assets/images/tehelado.png')},
  { nombre: 'Agua Mineral', tipo: 'Bebidas Frías', descripcion: 'Agua con gas', precio: 3500 ,imagen: require('../../assets/images/aguamineral.png')},
  { nombre: 'Sopa de Pollo', tipo: 'Sopas', descripcion: 'Sopa casera de pollo con fideos', precio: 12000 ,imagen: require('../../assets/images/sopadepollo.png')},
  { nombre: 'Sopa de Tomate', tipo: 'Sopas', descripcion: 'Sopa cremosa de tomate', precio: 11000 ,imagen: require('../../assets/images/sopadetomate.png')},
  { nombre: 'Sopa de Verduras', tipo: 'Sopas', descripcion: 'Sopa mixta de verduras', precio: 11500 ,imagen: require('../../assets/images/sopadeverduras.png')},
  { nombre: 'Sopa de Mariscos', tipo: 'Sopas', descripcion: 'Sopa con una mezcla de mariscos', precio: 15000 ,imagen: require('../../assets/images/sopademariscos.png')},
  { nombre: 'Pollo a la Parrilla', tipo: 'Platos del Día', descripcion: 'Pollo con arroz y ensalada', precio: 20000 ,imagen: require('../../assets/images/polloalaParrilla.png')},
  { nombre: 'Carne Asada', tipo: 'Platos del Día', descripcion: 'Carne de res con papas fritas', precio: 22000 ,imagen: require('../../assets/images/carneAsada.png')},
  { nombre: 'Pasta Alfredo', tipo: 'Platos a la Carta', descripcion: 'Pasta con salsa alfredo y pollo', precio: 18000 ,imagen: require('../../assets/images/pastaAlfredo.png')},
  { nombre: 'Pizza Margarita', tipo: 'Platos a la Carta', descripcion: 'Pizza con tomate, mozzarella y albahaca', precio: 25000 ,imagen: require('../../assets/images/pizzaMargarita.png')},
  { nombre: 'Hamburguesa', tipo: 'Platos a la Carta', descripcion: 'Hamburguesa con queso y papas fritas', precio: 17000 ,imagen: require('../../assets/images/hamburguesa.png')},
  { nombre: 'Tacos', tipo: 'Platos a la Carta', descripcion: 'Tacos con carne, queso y guacamole', precio: 16000 ,imagen: require('../../assets/images/tacos.png')},
  { nombre: 'Ensalada César', tipo: 'Platos a la Carta', descripcion: 'Ensalada con pollo y aderezo César', precio: 14000 ,imagen: require('../../assets/images/cesar.png')},
  { nombre: 'Risotto de Champiñones', tipo: 'Platos a la Carta', descripcion: 'Risotto cremoso con champiñones', precio: 20000 ,imagen: require('../../assets/images/risotto.png')},
  { nombre: 'Menú Infantil', tipo: 'Menú Infantil', descripcion: 'Nuggets de pollo con papas fritas', precio: 12000 ,imagen: require('../../assets/images/nuggets.png')},
];

export default function HomeScreen({ navigation }) {
  const [carrito, setCarrito] = useState([]);
  const [cantidades, setCantidades] = useState({});
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Todos"); // Estado para el filtro
  const [historialPedidos, setHistorialPedidos] = useState([]); // Estado para el historial de pedidos

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

  const modificarCantidad = (index, nuevaCantidad) => {
    setCarrito((prev) => {
      const nuevoCarrito = [...prev];
      nuevoCarrito[index].cantidad = parseInt(nuevaCantidad) || 0;
      return nuevoCarrito;
    });
  };

  const eliminarDelCarrito = (index) => {
    setCarrito((prev) => prev.filter((_, i) => i !== index));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  const calcularDomicilio = () => {
    const totalCompra = calcularTotal();
    if (totalCompra > 90000) {
      return 0;
    } else if (totalCompra > 70000) {
      return 3000;
    } else {
      return 5000;
    }
  };

  const calcularTotalConDomicilio = () => {
    return calcularTotal() + calcularDomicilio();
  };

  const confirmarPedido = () => {
    if (carrito.length === 0) {
      Alert.alert('Error', 'El carrito está vacío.');
      return;
    }
    // Añadir el pedido al historial
    const nuevoPedido = {
      items: [...carrito],
      total: calcularTotalConDomicilio(),
      fecha: new Date().toLocaleString()
    };
    setHistorialPedidos((prev) => [...prev, nuevoPedido]);
    setCarrito([]); // Vaciar el carrito
    Alert.alert('Pedido confirmado', 'Tu pedido ha sido confirmado.');
  };

  const irAlCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };
  
  const platosFiltrados = selectedFilter === "Todos" 
    ? menuItems 
    : menuItems.filter((plato) => plato.tipo === selectedFilter);

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bienvenue dans notre RE putain restaurant</Text>
        </View>

        <TouchableOpacity onPress={irAlCarrito} style={styles.cartButton}>
        {mostrarCarrito ? (
          
          <Icon name="home" size={35} color="#fff" />
        ) : (
          
          <Icon name="shopping-cart" size={35} color="#fff" />
        )}
      </TouchableOpacity>
  
        {mostrarCarrito ? (
          <View style={styles.carritoContainer}>
            <Text style={styles.carritoTitle}>Carrito</Text>
            {carrito.length > 0 ? (
              carrito.map((item, index) => (
                <View key={index} style={styles.carritoItem}>
                  <Text>{item.nombre} x {item.cantidad} -> ${item.precio * item.cantidad}</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    onChangeText={(value) => modificarCantidad(index, value)}
                    value={item.cantidad.toString()}
                  />
                  <TouchableOpacity style={styles.eliminarButton} onPress={() => eliminarDelCarrito(index)}>
                    <Text style={styles.eliminarButtonText}>Eliminar</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <Text style={styles.emptyCartText}>El carrito está vacío.</Text>
            )}
            <Text style={styles.totalText}>Total: ${calcularTotal().toLocaleString()} COP</Text>
            <Text style={styles.totalText}>Domicilio: ${calcularDomicilio().toLocaleString()} COP</Text>
            <Text style={styles.totalText}>Total con domicilio: ${calcularTotalConDomicilio().toLocaleString()} COP</Text>
          <Button title="CONFIRMAR PEDIDO" onPress={confirmarPedido} /> {/* Botón de confirmar pedido */}

          {/* Historial de pedidos */}
          <Text style={styles.historialTitle}>Historial de Pedidos</Text>
          <ScrollView>
            {historialPedidos.map((pedido, index) => (
              <View key={index} style={styles.historialPedido}>
                <Text>Pedido realizado el: {pedido.fecha}</Text>
                <Text>Total: ${pedido.total.toLocaleString()} COP</Text>
                {pedido.items.map((item, idx) => (
                  <Text key={idx}>{item.nombre} x {item.cantidad}</Text>
                ))}
              </View>
            ))}
          </ScrollView>
          
          </View>
        ) : (
          <>
            {/* Filtro de tipo de plato */}
            <TouchableOpacity style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedFilter}
                onValueChange={(itemValue) => setSelectedFilter(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Todos" value="Todos" />
                {[...new Set(menuItems.map((plato) => plato.tipo))].map((tipo) => (
                  <Picker.Item key={tipo} label={tipo} value={tipo} />
                ))}
              </Picker>
            </TouchableOpacity>
  
            <ScrollView style={styles.menuContainer}>
              {platosFiltrados.map((plato, index) => (
                <View key={index} style={styles.menuItem}>
                  <Image source={plato.imagen} style={{ width: 100, height: 100 }} />
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
          </>
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
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#ff6347',
    alignItems: 'center',
    justifyContent: 'center', 
  },

  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
  },

  cartButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#ff6347',
    padding: 15,
    borderRadius: 30,
    elevation: 5, // Sombra para darle un aspecto flotante
    zIndex: 10,
  },

  cartIcon: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007BFF', // Color de fondo azul
    borderRadius: 50, // Redondeado para darle forma circular
    width: 70, // Aumentar el ancho
    height: 70, // Aumentar el alto
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5, 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },

  homeIcon: {
     width: 30,
    height: 30 
  }, // Tamaño de la imagen de la casita

  carritoContainer: { 
    padding: 20
  },

  carritoTitle: {
     fontSize: 20, fontWeight: 'bold' 
  },

  pickerContainer: {
    backgroundColor: '#007BFF', // Azul
    borderRadius: 5,
    margin: 10,
  },

  picker: {
    backgroundColor: '#2494f4',
    color: '#fff', 
    fontSize: 20, 
    height: 45,
    fontWeight: 'bold'
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
    fontSize: 20,
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
    fontSize: 20,
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

  carritoItem: {
    fontSize: 16,
    marginVertical: 5,
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderColor: '#ccc',
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

  eliminarButton: {
    backgroundColor: 'red',
    padding: 3, // Reducir el tamaño del padding
    borderRadius: 5,
    marginLeft: 10,
  },

  eliminarButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12, // Tamaño de texto más pequeño
  },
});