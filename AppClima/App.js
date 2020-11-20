import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ImageBackground,
} from 'react-native';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const [busqueda, guardarBusqueda] = useState({
    ciudad: '',
  });
  const [consultar, guardarConsultar] = useState(false);
  const [resultado, guardarResultado] = useState({});
  const [bgcolor, guardarBgcolor] = useState('rgba(38,50,56,0.6)');
  const {ciudad} = busqueda;

  useEffect(() => {
    const consultarClima = async () => {
      if (consultar) {
        const appId = 'edb3b07b4eafccb0d8183712ed2f5220';
        //const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
        //const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},ES&appid=${appId}&lang=sp&units=metric`;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${appId}&lang=sp&units=metric`;

        try {
          const respuesta = await fetch(url);
          const resultado = await respuesta.json();

          guardarResultado(resultado);
          guardarConsultar(false);

          // Modifica los colores de fondo basado en la temperatura
          const {main} = resultado;
          const actual = main.temp;
          setBackgroundColor(actual);

        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    consultarClima();
  }, [ciudad, consultar]);

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No hay resultados, intenta con otra ciudad y comprueba que esté correctamente escrito',
      [{text: 'OK '}],
    );
  };

  const ocultarTeclado = () => {
    Keyboard.dismiss();
  };
  const setBackgroundColor = actual => {
    // Clima muy frío
    if (actual < 5) {
      guardarBgcolor('rgba(75,163,199,0.6)');
    } // Clima frío
    else if (actual >= 5 && actual < 16) {
      guardarBgcolor('rgba(30, 136, 229,0.7)');
    } // Clima medio
    else if (actual >= 16 && actual < 26) {
      //guardarBgcolor('transparent');
      guardarBgcolor('rgba(128,203,196,0.7)');
    } else if (actual >= 26 && actual < 35) {
      guardarBgcolor('rgba(255,179,0,0.7)');
    }
    // clima muy caluroso
    else {
      guardarBgcolor('rgba( 244,81,30,0.7)');
    }
  };
  const bgColorApp = {
    backgroundColor: bgcolor,
  };

  return (
    <>
      <ImageBackground
        source={{
          uri:
            'https://source.unsplash.com/random/1080x1920/?weather,cloud,summer,spring,autumn,winter,nature',
        }}
        style={styles.background}>
        <Header />
        <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
          <View style={[styles.app, bgColorApp]}>
            <View style={styles.contenido}>
              <Clima resultado={resultado} />
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
                ocultarTeclado={ocultarTeclado}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    fontFamily: 'Montserrat-Thin',
  },
  contenido: {
    marginHorizontal: '4%',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default App;
