import React, {useState} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';

const Formulario = ({
  busqueda,
  guardarBusqueda,
  guardarConsultar,
  ocultarTeclado,
}) => {
  const {ciudad} = busqueda;

  //Valor inicial de la animación. No se puede mezclar valores escalares
  const [animacionboton] = useState(new Animated.Value(1));

  const consultarClima = () => {
    if (ciudad.trim() === '') {
      mostrarAlerta();
      return;
    }

    // consultar la api
    guardarConsultar(true);
    //ocultar teclado
    ocultarTeclado();
  };

  const mostrarAlerta = () => {
    Alert.alert(
      'Información',
      'Debe escribir el nombre de una ciudad.',
      [{text: 'OK '}],
      {cancelable: true},
    );
  };

  const animacionEntrada = () => {
    Animated.spring(animacionboton, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const animacionSalida = () => {
    Animated.spring(animacionboton, {
      toValue: 1,
      friction: 4,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionboton}],
  };

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={ciudad}
            style={styles.input}
            onChangeText={ciudad => guardarBusqueda({...busqueda, ciudad})}
            placeholder="Escriba el nombre de la ciudad"
            placeholderTextColor="#b1bfca"
          />
        </View>

        <TouchableWithoutFeedback
          onPressIn={() => animacionEntrada()} // Cuando presiona
          onPressOut={() => animacionSalida()} // Cuando suelta
          onPress={() => consultarClima()} // Acción de press completa
        >
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#fff',
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    marginBottom: 0,
    textAlign: 'center',
    borderColor: '#0277bd',
    borderWidth: 3,
    borderRadius: 80,
  },
  btnBuscar: {
    marginTop: 20,
    height: 50,
    backgroundColor: '#0277bd',
    padding: 10,
    justifyContent: 'center',
    fontFamily: 'Montserrat-Thin',
    borderRadius: 80,
  },
  textoBuscar: {
    color: '#FFF',
    //fontWeight: 'bold',
    fontFamily: 'Montserrat-ExtraBold',
    // textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 24,
  },
});

export default Formulario;
