import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Accept a 'navigation' prop so we can navigate to screens
export default function BottomTab({ navigation }) {
  return (
    <View style={styles.tabContainer}>
      {/* Home */}
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Home')}>
        <Ionicons name="home" size={24} color="#333" />
        <Text style={styles.tabText}>Home</Text>
      </TouchableOpacity>

      {/* Games (placeholder) */}
      <TouchableOpacity style={styles.tabButton} onPress={() => console.log('Games tapped')}>
        <Ionicons name="game-controller" size={24} color="#333" />
        <Text style={styles.tabText}>Games</Text>
      </TouchableOpacity>

      {/* Latest */}
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Latest')}>
        <Ionicons name="flash" size={24} color="#333" />
        <Text style={styles.tabText}>Latest</Text>
      </TouchableOpacity>

      {/* Sudoku Tab */}
      <TouchableOpacity style={styles.tabButton} onPress={() => navigation.navigate('Sudoku')}>
        <Ionicons name="grid" size={24} color="#333" />
        <Text style={styles.tabText}>Sudoku</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  tabButton: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#333',
    marginTop: 3,
  },
});
