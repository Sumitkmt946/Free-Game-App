import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

/**
 * Basic Sudoku Game with custom numeric keypad:
 * - 9x9 grid
 * - Tap on a cell to select it (only if it's editable).
 * - Use custom keypad at bottom to fill numbers.
 */

// Example puzzle (0 means blank):
const initialPuzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

export default function SudokuGame() {
  const [board, setBoard] = useState(initialPuzzle);
  // selectedCell store karega ki user ne kaunsa cell tap kiya (row, col)
  const [selectedCell, setSelectedCell] = useState(null);

  // Cell par tap
  const handleCellPress = (row, col) => {
    // Agar cell editable nahin hai, to kuch mat karo
    if (initialPuzzle[row][col] !== 0) return;

    setSelectedCell({ row, col });
  };

  // Keypad par number ya clear press
  const handleNumberPress = (num) => {
    if (!selectedCell) return; // Agar koi cell select nahin hai to ignore

    const { row, col } = selectedCell;
    const newBoard = board.map(r => [...r]);
    newBoard[row][col] = num; // 1-9 ya 0 (clear) set kar do
    setBoard(newBoard);
  };

  // Basic check ke sab fill ho gaye ya nahin
  const checkSolution = () => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === 0) {
          Alert.alert('Incomplete', 'Abhi kuch cells blank hain!');
          return;
        }
      }
    }
    Alert.alert('Sudoku', 'Lagta hai sab fill ho gaya. (Validation logic can be improved!)');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sudoku</Text>

      {/* Sudoku Board */}
      <View style={styles.board}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cellValue, colIndex) => {
              const isEditable = initialPuzzle[rowIndex][colIndex] === 0;
              const isSelected =
                selectedCell &&
                selectedCell.row === rowIndex &&
                selectedCell.col === colIndex;

              // cell styles
              let cellStyle = [styles.cell];
              if (isSelected) {
                cellStyle.push(styles.selectedCell);
              }

              return (
                <TouchableOpacity
                  key={colIndex}
                  style={cellStyle}
                  onPress={() => handleCellPress(rowIndex, colIndex)}
                  activeOpacity={isEditable ? 0.6 : 1}
                >
                  <Text style={[styles.cellText, !isEditable && styles.givenText]}>
                    {cellValue !== 0 ? cellValue : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>

      {/* Check Button */}
      <TouchableOpacity style={styles.checkButton} onPress={checkSolution}>
        <Text style={styles.checkButtonText}>Check</Text>
      </TouchableOpacity>

      {/* Numeric Keypad */}
      <View style={styles.keypad}>
        {/* Buttons 1-9 */}
        {[1,2,3,4,5,6,7,8,9].map(num => (
          <TouchableOpacity
            key={num}
            style={styles.keypadButton}
            onPress={() => handleNumberPress(num)}
          >
            <Text style={styles.keypadButtonText}>{num}</Text>
          </TouchableOpacity>
        ))}
        {/* Clear Button */}
        <TouchableOpacity
          style={[styles.keypadButton, { backgroundColor: '#999' }]}
          onPress={() => handleNumberPress(0)} // 0 means blank
        >
          <Text style={styles.keypadButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#222',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 26,
    color: '#fff',
    marginBottom: 10,
    fontWeight: 'bold'
  },
  board: {
    borderWidth: 2,
    borderColor: '#fff'
  },
  row: {
    flexDirection: 'row'
  },
  cell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectedCell: {
    backgroundColor: '#444'
  },
  cellText: {
    color: '#fff',
    fontSize: 18
  },
  givenText: {
    fontWeight: 'bold'
  },
  checkButton: {
    backgroundColor: '#0066cc',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10
  },
  checkButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15
  },
  keypadButton: {
    width: 60,
    height: 40,
    backgroundColor: '#333',
    margin: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  keypadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
