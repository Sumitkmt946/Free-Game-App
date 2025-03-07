// screens/CognitiveScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CognitiveScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cognitive</Text>
      <Text>This is the Cognitive screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
