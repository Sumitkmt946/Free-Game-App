import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from './src/context/ThemeContext'; // Import ThemeProvider

// Auth Screens
import LoginPage from './screens/LoginPage';

// Main Screens
import HomeScreen from './screens/HomeScreen';
import LatestScreen from './screens/LatestScreen';

// Games
import TicTacToe from './games/TicTacToe';
import SokobanGame from './games/SokobanGame';
import SudokuGame from './games/SudokuGame';
import LudoGame from './games/LudoGame';
import CarRacingGame from './games/CarRacingGame';

// Profile & Dashboard Screens
import ProfileScreen from './screens/ProfileScreen';
import HistoryScreen from './screens/HistoryScreen';


import AnalysisScreen from './screens/AnalysisScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider>
        <Stack.Navigator initialRouteName="Login">

          {/* 🔹 Authentication Screens */}
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{ headerShown: false }}
          />

          {/* 🔹 Main Screens */}
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Latest"
            component={LatestScreen}
            options={{ title: 'Latest' }}
          />

          {/* 🔹 Games Section */}
          <Stack.Screen name="TicTacToe" component={TicTacToe} options={{ title: 'Tic Tac Toe' }} />
          <Stack.Screen name="Sokoban" component={SokobanGame} options={{ title: 'Sokoban' }} />
          <Stack.Screen name="Sudoku" component={SudokuGame} options={{ title: 'Sudoku' }} />
          <Stack.Screen name="Ludo" component={LudoGame} options={{ title: 'Ludo' }} />
          <Stack.Screen name="CarRacing" component={CarRacingGame} options={{ title: 'Car Racing' }} />

          {/* 🔹 Profile & Dashboard Screens */}
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />
          <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'History' }} />
         
         
          <Stack.Screen name="Analysis" component={AnalysisScreen} options={{ title: 'Analysis' }} />
          

        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}
