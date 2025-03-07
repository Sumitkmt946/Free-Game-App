// games/AdvancedCarRacing.js

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';

const { width, height } = Dimensions.get('window');

// Road background (long/tall image for scrolling)
const ROAD_IMAGE = {
  uri: 'https://blenderartists.org/uploads/default/original/3X/4/4/44a7490e8d14e6b5553792a0ad85f400c4c210ce.jpg', // Example road image
};

// Player’s car
const PLAYER_CAR = {
  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHHBdhQIbkaIxkEU00ZyFUh6H59C-B7mnrCg&s', // Example car sprite
};

// Opponent car
const OPPONENT_CAR = {
  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqgUf0pnjrJxhXqm2AxkNB5tZwQJJ3plC15g&s', // Another car sprite
};

export default function AdvancedCarRacing() {
  // Lane positions (3 lanes as example)
  const laneX = [width * 0.2, width * 0.5 - 40, width * 0.8 - 80];

  // Player lane index: 0 => left, 1 => middle, 2 => right
  const [playerLane, setPlayerLane] = useState(1);

  // Player speed factor
  const [speed, setSpeed] = useState(5);

  // Road scroll animation
  const roadAnim = new Animated.Value(0);

  // Opponent car state: lane index, Y position
  const [opponents, setOpponents] = useState([
    { lane: 0, y: new Animated.Value(-200) },
    { lane: 2, y: new Animated.Value(-600) },
  ]);

  useEffect(() => {
    // Start road scrolling
    Animated.loop(
      Animated.timing(roadAnim, {
        toValue: 1,
        duration: 4000 / speed, // scroll faster with higher speed
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [speed]);

  useEffect(() => {
    // Animate opponents downward
    opponents.forEach((opp) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opp.y, {
            toValue: height + 200,
            duration: 4000 / speed,
            useNativeDriver: true,
          }),
          Animated.timing(opp.y, {
            toValue: -200,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [opponents, speed]);

  // Move player left or right
  const steer = (direction) => {
    if (direction === 'LEFT' && playerLane > 0) {
      setPlayerLane(playerLane - 1);
    } else if (direction === 'RIGHT' && playerLane < 2) {
      setPlayerLane(playerLane + 1);
    }
  };

  // Accelerate or brake
  const adjustSpeed = (type) => {
    if (type === 'ACCEL') {
      setSpeed((prev) => Math.min(prev + 1, 10));
    } else {
      setSpeed((prev) => Math.max(prev - 1, 1));
    }
  };

  // Road transform
  const roadY = roadAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Car Racing Demo</Text>

      {/* Road scrolling background */}
      <View style={styles.roadContainer}>
        <Animated.Image
          source={ROAD_IMAGE}
          style={[
            styles.road,
            {
              transform: [{ translateY: roadY }],
            },
          ]}
          resizeMode="repeat"
        />
        <Animated.Image
          source={ROAD_IMAGE}
          style={[
            styles.road,
            {
              transform: [
                { translateY: roadY.interpolate({
                    inputRange: [0, height],
                    outputRange: [-height, 0],
                  }) },
              ],
            },
          ]}
          resizeMode="repeat"
        />
        {/* Opponents */}
        {opponents.map((opp, i) => (
          <Animated.Image
            key={i}
            source={OPPONENT_CAR}
            style={[
              styles.opponentCar,
              {
                left: laneX[opp.lane],
                transform: [{ translateY: opp.y }],
              },
            ]}
            resizeMode="contain"
          />
        ))}
        {/* Player car */}
        <Image
          source={PLAYER_CAR}
          style={[
            styles.playerCar,
            { left: laneX[playerLane] },
          ]}
          resizeMode="contain"
        />
      </View>

      {/* Steering & Speed Controls */}
      <View style={styles.controlsContainer}>
        {/* Steering row */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.arrowButton} onPress={() => steer('LEFT')}>
            <Text style={styles.arrowText}>◀</Text>
          </TouchableOpacity>

          <View style={{ width: 40 }} />

          <TouchableOpacity style={styles.arrowButton} onPress={() => steer('RIGHT')}>
            <Text style={styles.arrowText}>▶</Text>
          </TouchableOpacity>
        </View>

        {/* Accelerator & Brake */}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.accButton, { marginRight: 30 }]} onPress={() => adjustSpeed('ACCEL')}>
            <Text style={styles.accText}>Accel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accButton} onPress={() => adjustSpeed('BRAKE')}>
            <Text style={styles.accText}>Brake</Text>
          </TouchableOpacity>
        </View>

        {/* Speed Display */}
        <Text style={styles.speedText}>Speed: {speed}</Text>
      </View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 40,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  roadContainer: {
    width: '100%',
    height: '60%',
    overflow: 'hidden',
    backgroundColor: '#999',
  },
  road: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  opponentCar: {
    position: 'absolute',
    width: 60,
    height: 100,
  },
  playerCar: {
    position: 'absolute',
    bottom: 20,
    width: 60,
    height: 100,
  },
  controlsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    marginVertical: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowButton: {
    backgroundColor: '#333',
    borderRadius: 40,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  accButton: {
    backgroundColor: '#444',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  accText: {
    color: '#fff',
    fontSize: 16,
  },
  speedText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
  },
});
