import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Mybutton = props => {
  const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#f05555',
      color: '#ffffff',
      padding: 10,
      marginTop: 16,
      marginLeft: 35,
      marginRight: 35,
      ...props.style,
    },
    text: {
      color: '#ffffff',
    },
  });

  return (
    <TouchableOpacity style={styles.button} onPress={props.customClick}>
      <Text style={styles.text}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export default Mybutton;
