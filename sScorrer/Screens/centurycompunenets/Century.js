// MatchScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MatchScreen({ route, navigation }) {
  const { numPlayers, playerNames } = route.params;
  const [playerScores, setPlayerScores] = useState({});
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const initialScores = {};
    for (let i = 1; i <= numPlayers; i++) {
      initialScores[`player${i}`] = 0;
    }
    setPlayerScores(initialScores);

    // Start the stopwatch
    intervalRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [numPlayers]);

  useEffect(() => {
    Object.keys(playerScores).forEach((playerKey) => {
      if (playerScores[playerKey] >= 100) {
        Alert.alert(
          'We have a Winner!',
          `${playerNames[playerKey]} has reached 100 points!`,
          [{ text: 'OK', onPress: handleFinishGame }],
          { cancelable: false }
        );
      }
    });
  }, [playerScores]);

  const updateScore = (playerKey, scoreChange) => {
    setPlayerScores((prevScores) => ({
      ...prevScores,
      [playerKey]: prevScores[playerKey] + scoreChange,
    }));
  };

  const handleFinishGame = async () => {
    clearInterval(intervalRef.current);

    Alert.alert(
      'Finish Game',
      'Are you sure you want to finish the game?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: async () => {
            const winnerKey = Object.keys(playerScores).reduce((a, b) => playerScores[a] > playerScores[b] ? a : b);
            const winnerName = playerNames[winnerKey];
            const matchData = {
              playerNames,
              playerScores,
              winner: winnerName,
              title: 'Century',
              date: new Date().toISOString(),
              elapsedTime, 
            };
            try {
              const data = await AsyncStorage.getItem('matchHistory');
              const matchHistory = data ? JSON.parse(data) : [];
              matchHistory.push(matchData);
              await AsyncStorage.setItem('matchHistory', JSON.stringify(matchHistory));
              Alert.alert(
                'Game Finished',
                `Congratulations ${winnerName}! The match data has been saved.`,
                [{ text: 'OK', onPress: () => navigation.goBack() }],
                { cancelable: false }
              );
            } catch (error) {
              console.error('Error saving match data:', error);
              Alert.alert('Error', 'There was an error saving the match data.');
            }
          }
        }
      ],
      { cancelable: false }
    );
  };

  const renderPlayerInputs = () => {
    const inputs = [];
    for (let i = 1; i <= numPlayers; i++) {
      const playerKey = `player${i}`;
      inputs.push(
        <View key={i} style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ScoreScreen', { playerKey, playerName: playerNames[playerKey], updateScore, currentScore: playerScores[playerKey] })}
            style={styles.touchable}
          >
            <Text style={styles.label}>Player {i}: {playerNames[playerKey]}</Text>
            <TextInput
              style={styles.input}
              value={playerScores[playerKey]?.toString()}
              editable={false}
            />
          </TouchableOpacity>
        </View>
      );
    }
    return inputs;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Match Screen</Text>
      <Text style={styles.timer}> Clock: {Math.floor(elapsedTime / 60)}:{elapsedTime % 60}</Text>
      {renderPlayerInputs()}
      <Button title="Finish Match" onPress={handleFinishGame} color="#1e90ff" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  timer: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  touchable: {
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 5,
  },
});
