import React from 'react';
import {Text, StyleSheet, Platform} from 'react-native';

const Header = () => <Text style={styles.encabezado}>El tiempo hoy</Text>;

const styles = StyleSheet.create({
  encabezado: {
    paddingTop: Platform.OS === 'ios' ? 50 : 5,
    fontFamily: 'Montserrat-Medium',
    backgroundColor: '#0277bd',
    paddingBottom: 10,
    textAlign: 'center',
    //textTransform: 'uppercase',
    fontSize: 30,
    color: '#FFF',
    marginBottom: 0,
  },
});

export default Header;
