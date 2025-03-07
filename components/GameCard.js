import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function GameCard({ onSelectGame }) {
  const handleGamePress = (gameName) => {
    if (onSelectGame && typeof onSelectGame === 'function') {
      onSelectGame(gameName);
    }
  };

  return (
    <View style={styles.container}>
      {/* Tic Tac Toe Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleGamePress('TicTacToe')}
      >
        <Image
          source={{
            uri: 'https://thumbs.dreamstime.com/z/hand-drawn-tic-tac-toe-game-vector-illustration-isolated-white-background-eps-140470618.jpg',
          }}
          style={styles.image}
        />
        <Text style={styles.text}>Tic Tac Toe</Text>
      </TouchableOpacity>

      {/* Sokoban Card */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleGamePress('Sokoban')}
      >
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxnjsP7Eq39971N9hbBMZQypUOmfqBbDpc6w&s'
          }}
          style={styles.image}
        />
        <Text style={styles.text}>Sokoban</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 25,
    flexWrap: 'wrap', // allow wrapping if there are many cards
  },
  card: {
    alignItems: 'center',
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 15,
    backgroundColor: '#ededed',
    padding: 15,
    width: 120,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 9,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
