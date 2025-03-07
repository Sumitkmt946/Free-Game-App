import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LatestScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>LATEST GAMES</Text>

      <View style={styles.gamesRow}>
        {/* Ludo Game Card */}
        <TouchableOpacity
          style={styles.gameCard}
          onPress={() => navigation.navigate('Ludo')}
        >
          <Text style={styles.gameText}>Ludo</Text>
        </TouchableOpacity>

        {/* Car Racing Game Card */}
        <TouchableOpacity
          style={styles.gameCard}
          onPress={() => navigation.navigate('CarRacing')}
        >
          <Text style={styles.gameText}>Car Racing</Text>
        </TouchableOpacity>

        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  gamesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  gameCard: {
    width: 120,
    height: 120,
    backgroundColor: '#ededed',
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
