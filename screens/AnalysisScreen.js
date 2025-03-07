// screens/AnalysisScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AnalysisScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analysis</Text>
      <Text>This is the Analysis screen.</Text>
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
