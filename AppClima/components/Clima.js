import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import moment from 'moment';
import {countries} from 'country-data';
const Clima = ({resultado}) => {
  // grados kelvin
  const kelvin = 273.15;
  const {name, main, sys} = resultado;
  if (!name) {
    return null;
  }

  console.log('Resultado:' + JSON.stringify(resultado));

  return (
    <React.Fragment>
      <View style={styles.contenedorIcono}>
        <Text style={styles.texto}>
          En {name}
          <Image
            style={styles.icono}
            source={{
              uri: `http://openweathermap.org/img/w/${
                resultado.weather[0].icon
              }.png`,
            }}
          />
          {countries[sys.country].name}{' '}
          {countries[sys.country].emoji}
        </Text>
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
              {main.feels_like} &#x2103;
            </Text>
          </Text>
          <Text style={styles.textoPeq}>
            Humedad relativa{' '}
            <Text style={styles.temperaturaPeq}>{main.humidity} %</Text>
          </Text>
          <Text style={styles.textoPeq}>
            Presión{' '}
            <Text style={styles.temperaturaPeq}>{main.pressure}hPa</Text>
          </Text>
          <Text style={styles.textoPeq}>
            Amanece{' '}
            <Text style={styles.textoPeq}>
              {moment.unix(sys.sunrise).format('HH:mm:ss')}
            </Text>
            {' - '} Anochece{' '}
            <Text style={styles.textoPeq}>
              {moment.unix(sys.sunset).format('HH:mm:ss')}
            </Text>
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
  icono: {
    width: 50,
    height: 58,
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
    marginRight: 20,
  },
  actual: {
    fontSize: 100,
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

export default Clima;
