// games/SokobanGame.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';

// Import local sound assets
import moveSound from '../assets/moveSound.wav';
import levelCompleteSound from '../assets/moveSound.wav';

/**
 * Grid Characters:
 *  - 'W' => Wall
 *  - 'B' => Box
 *  - 'T' => Target
 *  - 'P' => Player
 *  - '.' => Floor
 *
 * Level complete tab hoga jab saare 'B' (boxes) 'T' (targets) par pohonch jaayen.
 */

// Levels Array: total 9 levels (bade aur challenging layouts)
const LEVELS = [
  [
    "WWWWWWW",
    "W..T..W",
    "W.WBW.W",
    "W.WPW.W",
    "W..B..W",
    "W..T..W",
    "WWWWWWW"
  ],
  [
    "WWWWWWWW",
    "W...T..W",
    "W.WBWB.W",
    "W.WPW..W",
    "W...B..W",
    "W..T...W",
    "WWWWWWWW"
  ],
  [
    "WWWWWWWWW",
    "W.T...T.W",
    "W.WWBW..W",
    "W..PWB..W",
    "W.WWBW..W",
    "W.T...T.W",
    "WWWWWWWWW"
  ],
  [
    "WWWWWWWWWW",
    "W..T...T.W",
    "W.WWBWBW.W",
    "W.WP..BW.W",
    "W.WWBWBW.W",
    "W..T...T.W",
    "WWWWWWWWWW"
  ],
  [
    "WWWWWWWWW",
    "W.T.T.T.W",
    "W.WWBW.WW",
    "W.WP.B..W",
    "W.WWBW.WW",
    "W.T.T.T.W",
    "WWWWWWWWW"
  ],
  [
    "WWWWWWWWWW",
    "W.T.....TW",
    "W..BBWB..W",
    "W.WP..BW.W",
    "W..BBWB..W",
    "W.T.....TW",
    "WWWWWWWWWW"
  ],
  [
    "WWWWWWWWWWW",
    "W..TT.TT..W",
    "W.WBBWBBBW.W",
    "W.WP..B..BW",
    "W.WBBWBBBW.W",
    "W..TT.TT..W",
    "WWWWWWWWWWW"
  ],
  // Extra Level 8: Thoda maze aur boxes
  [
    "WWWWWWWWWWWW",
    "W..T...T...W",
    "W.WBWBWBWB.W",
    "W.WP...B..W",
    "W.WBWBWBWB.W",
    "W..T...T...W",
    "WWWWWWWWWWWW"
  ],
  // Extra Level 9: Complex layout
  [
    "WWWWWWWWWWWWW",
    "W.T.T.T.T.T.W",
    "W.WBWBWBWBWB.W",
    "W.WP...B...W.W",
    "W.WBWBWBWBWB.W",
    "W.T.T.T.T.T.W",
    "WWWWWWWWWWWWW"
  ]
];

/**
 * parseLevel: Level ko 2D array mein convert kar deta hai.
 */
function parseLevel(levelLayout) {
  return levelLayout.map(row => row.split(""));
}

/**
 * checkLevelComplete: Check karta hai ki koi 'B' bacha hua hai ya nahi.
 */
function checkLevelComplete(grid) {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === 'B') {
        return false;
      }
    }
  }
  return true;
}

/**
 * playSound: Koi bhi sound asset ko play karta hai (Expo-AV se).
 */
async function playSound(soundAsset) {
  try {
    const { sound } = await Audio.Sound.createAsync(
      soundAsset,
      { shouldPlay: true }
    );
    // Agar zarurat ho to: await sound.unloadAsync();
  } catch (error) {
    console.log('Sound play error:', error);
  }
}

const SokobanGame = () => {
  const [levelIndex, setLevelIndex] = useState(0);
  const [grid, setGrid] = useState(parseLevel(LEVELS[levelIndex]));

  // Player ki position dhundo
  const findPlayerPosition = (grid) => {
    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (grid[r][c] === 'P') {
          return { row: r, col: c };
        }
      }
    }
    return null;
  };

  // Movement handle: up/down/left/right
  const handleMove = async (dir) => {
    const newGrid = grid.map(row => [...row]);
    const playerPos = findPlayerPosition(newGrid);
    if (!playerPos) return;

    let { row, col } = playerPos;
    let targetRow = row;
    let targetCol = col;

    if (dir === 'UP') targetRow--;
    if (dir === 'DOWN') targetRow++;
    if (dir === 'LEFT') targetCol--;
    if (dir === 'RIGHT') targetCol++;

    // Boundary check
    if (!newGrid[targetRow] || newGrid[targetRow][targetCol] === undefined) {
      return;
    }

    const targetCell = newGrid[targetRow][targetCol];

    // Agar wall hai to kuch mat karo
    if (targetCell === 'W') {
      return;
    }

    // Agar box hai to push
    if (targetCell === 'B') {
      const nextRow = targetRow + (targetRow - row);
      const nextCol = targetCol + (targetCol - col);

      // Check next cell boundary
      if (!newGrid[nextRow] || newGrid[nextRow][nextCol] === undefined) {
        return;
      }

      // Agar agla cell khaali ya target hai to push possible
      if (newGrid[nextRow][nextCol] === '.' || newGrid[nextRow][nextCol] === 'T') {
        newGrid[nextRow][nextCol] = 'B';
        newGrid[targetRow][targetCol] = '.';
      } else {
        return;
      }
    }

    // Update player position
    newGrid[row][col] = '.';
    newGrid[targetRow][targetCol] = 'P';
    setGrid(newGrid);

    // Move par sound
    await playSound(moveSound);

    // Level complete check
    if (checkLevelComplete(newGrid)) {
      // Level complete par sound
      await playSound(levelCompleteSound);
      // Automatic next level load without alert
      goToNextLevel();
    }
  };

  // Next level automatically
  const goToNextLevel = () => {
    const nextIndex = levelIndex + 1;
    if (nextIndex >= LEVELS.length) {
      Alert.alert("Game Over", "Aapne saare levels paar kar liye!");
      return;
    }
    setLevelIndex(nextIndex);
    setGrid(parseLevel(LEVELS[nextIndex]));
  };

  // Reset current level
  const resetLevel = () => {
    setGrid(parseLevel(LEVELS[levelIndex]));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Sokoban (Level {levelIndex + 1})
      </Text>
      {/* Grid */}
      <View style={styles.gridContainer}>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <View
                key={colIndex}
                style={[
                  styles.cell,
                  cell === 'W' && styles.wall,
                  cell === 'B' && styles.box,
                  cell === 'T' && styles.target,
                  cell === 'P' && styles.player
                ]}
              >
                {/* Debug ke liye, cell value dekhna ho to niche ka Text use karein */}
                {/* <Text style={{ color:'#fff', fontSize:10 }}>{cell}</Text> */}
              </View>
            ))}
          </View>
        ))}
      </View>

      {/* Joystick-style controls */}
      <View style={styles.controllerContainer}>
        {/* UP */}
        <View style={styles.arrowRow}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleMove('UP')}
          >
            <Text style={styles.arrowText}>▲</Text>
          </TouchableOpacity>
        </View>
        {/* LEFT - RIGHT */}
        <View style={styles.arrowRow}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleMove('LEFT')}
          >
            <Text style={styles.arrowText}>◀</Text>
          </TouchableOpacity>
          <View style={{ width: 40 }} />
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleMove('RIGHT')}
          >
            <Text style={styles.arrowText}>▶</Text>
          </TouchableOpacity>
        </View>
        {/* DOWN */}
        <View style={styles.arrowRow}>
          <TouchableOpacity
            style={styles.arrowButton}
            onPress={() => handleMove('DOWN')}
          >
            <Text style={styles.arrowText}>▼</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Reset & Next Level buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btn} onPress={resetLevel}>
          <Text style={styles.btnText}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={goToNextLevel}>
          <Text style={styles.btnText}>Next Level</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SokobanGame;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 20,
    fontWeight: 'bold'
  },
  gridContainer: {
    marginVertical: 20,
    backgroundColor: '#555',
    padding: 5,
    borderRadius: 10
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    width: 35,
    height: 35,
    borderWidth: 1,
    borderColor: '#444',
    backgroundColor: '#999',
    alignItems: 'center',
    justifyContent: 'center'
  },
  wall: {
    backgroundColor: '#000'
  },
  box: {
    backgroundColor: 'brown'
  },
  target: {
    backgroundColor: 'yellow'
  },
  player: {
    backgroundColor: 'green'
  },
  controllerContainer: {
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowRow: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowButton: {
    backgroundColor: '#0066cc',
    borderRadius: 40,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  arrowText: {
    fontSize: 24,
    color: '#fff'
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 8
  },
  btn: {
    backgroundColor: '#0066cc',
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});
