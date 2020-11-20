import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import moment from 'moment';
import {countries} from 'country-data';
const Weather = ({result}) => {
  const {name, main, sys, weather} = result;
  if (!name) {
    return null;
  }

  console.log('Resultado:' + JSON.stringify(result));

  return (
    <React.Fragment>
      <View style={styles.contenedorIcono}>
        <Text style={styles.texto}>
          En {name}, {countries[sys.country].name}{' '}
          {countries[sys.country].emoji}
        </Text>
        <Text style={styles.texto}>Se prevé {weather[0].description}</Text>
        <Text style={styles.textoPeq}>{moment().format('DD/MM/YYYY')}</Text>
      </View>

      <View style={styles.clima}>
        <Text style={[styles.texto, styles.actual]}>
          {parseInt(main.temp)}
          <Text style={styles.temperatura}>&#x2103;</Text>
        </Text>

        <View style={styles.temperaturas}>
          <Text style={styles.texto}>
            Min{' '}
            <Text style={styles.temperatura}>
              {parseInt(main.temp_min)} &#x2103;
            </Text>{' '}
            Max{' '}
            <Text style={styles.temperatura}>
              {parseInt(main.temp_max)} &#x2103;
            </Text>
          </Text>
          <Text style={styles.textoPeq}>
            Sensación Térmica{' '}
            <Text style={styles.temperaturaPeq}>
              {parseInt(main.feels_like)} &#x2103;
            </Text>
          </Text>
          <Text style={styles.textoPeq}>
            Humedad relativa{' '}
            <Text style={styles.temperaturaPeq}>{main.humidity} %</Text>
          </Text>
          <Text style={styles.textoPeq}>
            Presión{' '}
            <Text style={styles.temperaturaPeq}>{main.pressure} hPa</Text>
          </Text>
          <Text style={styles.textoPeq}>
           🌞Amanece: {moment.unix(sys.sunrise).format('HH:mm:ss')}
            {' - '}🌙Anochece: {moment.unix(sys.sunset).format('HH:mm:ss')}
          </Text>
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  clima: {
    marginBottom: 0,
  },
  contenedorIcono: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
  },
  textoPeq: {
    color: '#FFF',
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    textAlign: 'center',
    marginBottom: 2,
  },
  actual: {
    fontSize: 90,
    marginRight: 0,
    //fontWeight: 'bold',
    fontFamily: 'Montserrat-ExtraBold',
    textShadowColor: '#0277bd',
    textShadowOffset: {width: 5, height: 5},
    textShadowRadius: 10,
  },
  temperatura: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
  },
  temperaturaPeq: {
    fontSize: 15,
    fontFamily: 'Montserrat-Regular',
    fontWeight: 'bold',
  },
  temperaturas: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Weather;
