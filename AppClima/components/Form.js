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

const Form = ({search, setSearch, setQuery, hideKeyboard}) => {
  const {city} = search;

  //Valor inicial de la animación. No se puede mezclar valores escalares
  const [btnAnimation] = useState(new Animated.Value(1));

  const queryWeather = () => {
    if (city.trim() === '') {
      showAlert();
      return;
    }

    // consultar la api
    setQuery(true);
    //ocultar teclado
    hideKeyboard();
  };

  const showAlert = () => {
    Alert.alert(
      'Información',
      'Debe escribir el nombre de una city.',
      [{text: 'OK '}],
      {cancelable: true},
    );
  };

  const inAnimation = () => {
    Animated.spring(btnAnimation, {
      toValue: 0.8,
      useNativeDriver: true,
    }).start();
  };

  const outAnimation = () => {
    Animated.spring(btnAnimation, {
      toValue: 1,
      friction: 4,
      tension: 20,
      useNativeDriver: true,
    }).start();
  };
  // Acciones de transformación que realiza la animación.
  const AnimationStyle = {
    transform: [{scale: btnAnimation}],
  };

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            value={city}
            style={styles.input}
            onChangeText={city => setSearch({...search, city})}
            placeholder="Escriba el nombre de la ciudad"
            placeholderTextColor="#b1bfca"
          />
        </View>

        <TouchableWithoutFeedback
          onPressIn={() => inAnimation()} // Cuando presiona
          onPressOut={() => outAnimation()} // Cuando suelta
          onPress={() => queryWeather()} // Acción de press completa
        >
          <Animated.View style={[styles.btnBuscar, AnimationStyle]}>
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
    fontFamily: 'Montserrat-Medium',
    // textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 24,
  },
});

export default Form;
