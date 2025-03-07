import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const BOARD_SIZE = 15;

export default function LudoGame() {
  const [diceValues, setDiceValues] = useState({
    red: null,
    green: null,
    yellow: null,
    blue: null,
  });

  const rollDice = (color) => {
    const val = Math.floor(Math.random() * 6) + 1;
    setDiceValues((prev) => ({
      ...prev,
      [color]: val,
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ludo Board with 4 Dice</Text>

      {/* 1) Board */}
      <View style={styles.board}>
        {Array.from({ length: BOARD_SIZE }).map((_, row) => (
          <View key={row} style={styles.row}>
            {Array.from({ length: BOARD_SIZE }).map((_, col) => {
              const bgColor = getCellColor(row, col);
              return (
                <View
                  key={col}
                  style={[styles.cell, { backgroundColor: bgColor }]}
                />
              );
            })}
          </View>
        ))}
      </View>

      {/* 2) Four corner dice */}
      <TouchableOpacity
        style={[styles.diceButton, styles.diceRed]}
        onPress={() => rollDice('red')}
      >
        <Text style={styles.diceButtonText}>
          {diceValues.red || '🎲'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.diceButton, styles.diceGreen]}
        onPress={() => rollDice('green')}
      >
        <Text style={styles.diceButtonText}>
          {diceValues.green || '🎲'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.diceButton, styles.diceYellow]}
        onPress={() => rollDice('yellow')}
      >
        <Text style={styles.diceButtonText}>
          {diceValues.yellow || '🎲'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.diceButton, styles.diceBlue]}
        onPress={() => rollDice('blue')}
      >
        <Text style={styles.diceButtonText}>
          {diceValues.blue || '🎲'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Helper function to color board cells
function getCellColor(row, col) {
  if (row < 6 && col < 6) return 'tomato';       // red corner
  if (row < 6 && col > 8) return 'lightgreen';   // green corner
  if (row > 8 && col > 8) return 'khaki';        // yellow corner
  if (row > 8 && col < 6) return 'lightskyblue'; // blue corner
  return '#fff'; // middle area
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  board: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 25,
    height: 25,
    borderWidth: 0.5,
    borderColor: '#888',
  },
  diceButton: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
  },
  diceButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  diceRed: {
    top: 80,
    left: 20,
  },
  diceGreen: {
    top: 80,
    right: 20,
  },
  diceYellow: {
    bottom: 80,
    right: 20,
  },
  diceBlue: {
    bottom: 80,
    left: 20,
  },
});
