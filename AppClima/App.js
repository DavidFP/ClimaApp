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
import Form from './components/Form';
import Weather from './components/Weather';

const App = () => {
  const [search, setSearch] = useState({
    city: '',
  });
  const [query, setQuery] = useState(false);
  const [result, setResult] = useState({});
  const [bgColor, setBgColor] = useState('rgba(38,50,56,0.6)');
  const {city} = search;

  useEffect(() => {
    const queryWeather = async () => {
      if (query) {
        const appId = 'edb3b07b4eafccb0d8183712ed2f5220';
        //const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${pais}&appid=${appId}`;
        //const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},ES&appid=${appId}&lang=sp&units=metric`;
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appId}&lang=sp&units=metric`;

        try {
          const response = await fetch(url);
          const jsonResult = await response.json();

          setResult(jsonResult);
          setQuery(false);

          // Modifica los colores de fondo basado en la temperatura
          const {main} = jsonResult;
          const currentTemp = main.temp;
          setBackgroundColor(currentTemp);

        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    queryWeather();
  }, [city, query]);

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No hay results, intenta con otra city y comprueba que esté correctamente escrito',
      [{text: 'OK '}],
    );
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };
  const setBackgroundColor = current => {
    // Clima muy frío
    if (current < 5) {
      setBgColor('rgba(75,163,199,0.6)');
    } // Clima frío
    else if (current >= 5 && current < 16) {
      setBgColor('rgba(30, 136, 229,0.7)');
    } // Clima medio
    else if (current >= 16 && current < 26) {
      //setBgColor('transparent');
      setBgColor('rgba(128,203,196,0.7)');
    } else if (current >= 26 && current < 35) {
      setBgColor('rgba(255,179,0,0.7)');
    }
    // clima muy caluroso
    else {
      setBgColor('rgba( 244,81,30,0.7)');
    }
  };
  const bgColorApp = {
    backgroundColor: bgColor,
  };

  return (
    <>
      <ImageBackground
        source={{
          uri:
            'https://source.unsplash.com/random/1080x1920/?weather ',
        }}
        style={styles.background}>
        <Header />
        <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
          <View style={[styles.app, bgColorApp]}>
            <View style={styles.contenido}>
              <Weather result={result} />
              <Form
                search={search}
                setSearch={setSearch}
                setQuery={setQuery}
                hideKeyboard={hideKeyboard}
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
    marginHorizontal: '2.5%',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default App;
