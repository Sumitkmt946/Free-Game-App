import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Header from '../components/Header';
import GameCard from '../components/GameCard';
import BottomTab from '../components/BottomTab';
import Menu from '../components/Menu';

// Example: local images rakhna ho to aise import karo:
// import trophyImg from '../assets/trophy.png';
// import starImg from '../assets/star.png';

export default function HomeScreen({ navigation }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* 1) Header */}
      <Header onMenuPress={() => setMenuOpen(true)} />

      {/* 2) Achievement Box (Trophy + "First Prize" | "Rank #1" + Star) */}
      <View style={styles.achievementBox}>
        {/* Left side: Trophy + Text */}
        <View style={styles.leftSection}>
          {/* Agar aap local image use kar rahe ho, to aise: 
              <Image source={trophyImg} style={styles.icon} /> 
             Yahan main example ke liye URI se random trophy le raha hoon. 
          */}
          <Image
            source={{ uri: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5b5eed03-3715-42fd-8716-9b189aa554ad/d9dtwte-f182fd91-a5a5-42c2-8689-6258747a7c16.png/v1/fill/w_894,h_894,strp/trophy_icon_by_papillonstudio_d9dtwte-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTAyNCIsInBhdGgiOiJcL2ZcLzViNWVlZDAzLTM3MTUtNDJmZC04NzE2LTliMTg5YWE1NTRhZFwvZDlkdHd0ZS1mMTgyZmQ5MS1hNWE1LTQyYzItODY4OS02MjU4NzQ3YTdjMTYucG5nIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.czjzw5LT-abKpTIfLuMmVUITzdH-W_aln-Woi5pQWIQ' }}
            style={styles.icon}
          />
          <Text style={styles.textLabel}>First Prize</Text>
        </View>

        {/* Divider line ya vertical bar */}
        <View style={styles.divider} />

        {/* Right side: Rank #1 + Star */}
        <View style={styles.rightSection}>
          <Text style={styles.textLabel}>Rank #1</Text>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2107/2107957.png' }}
            style={styles.icon}
          />
        </View>
      </View>

      {/* 3) GameCard */}
      <GameCard
        onSelectGame={(game) => {
          if (game === 'TicTacToe') {
            navigation.navigate('TicTacToe');
          } else if (game === 'Sokoban') {
            navigation.navigate('Sokoban');
          } else if (game === 'Sudoku') {
            navigation.navigate('Sudoku');
          }
        }}
      />

      {/* 4) BottomTab */}
      <BottomTab navigation={navigation} />

      {/* 5) Side Menu */}
      <Menu
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        navigation={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  achievementBox: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 15,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    // shadow effect (optional)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3, // Android ke liye shadow
    alignItems: 'center', // vertical center
    justifyContent: 'space-between', // leftSection aur rightSection ko space
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divider: {
    width: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 10,
    height: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 5,
  },
  textLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
});
