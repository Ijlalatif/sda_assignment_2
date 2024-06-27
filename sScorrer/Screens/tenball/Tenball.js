import React, { useState } from 'react';
import { View, Button, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tailwind from 'twrnc';
import Player from './Plyer';

export default function Tenball({ route, navigation }) {
  const { playerOneName, playerTwoName } = route.params || {};
  const [score1, setScoreOne] = useState(0);
  const [score2, setScoreTwo] = useState(0);

  const finishGame = async () => {
    let winner = '';
    if (score1 > score2) {
      winner = playerOneName;
    } else if (score2 > score1) {
      winner = playerTwoName;
    } else {
      winner = 'No one, it\'s a tie!';
    }

    const gameData = {
      title: 'Tenball', 
      players: [
        { name: playerOneName, score: score1 },
        { name: playerTwoName, score: score2 }
      ],
      winner,
      date: new Date().toISOString(),
    };

    try {
      const data = await AsyncStorage.getItem('gameHistory');
      const gameHistory = data ? JSON.parse(data) : [];
      gameHistory.push(gameData);
      await AsyncStorage.setItem('gameHistory', JSON.stringify(gameHistory));
      Alert.alert(
        'Game Over',
        `Congratulations ${winner}!`,
        [{ text: 'OK', onPress: () => navigation.goBack() }],
        { cancelable: false }
      );
    } catch (error) {
      console.error('Error saving game data:', error);
      Alert.alert('Error', 'There was an error saving the game data.');
    }
  };

  return (
    <ScrollView>
      <View>
        <Player name={playerOneName} score={score1} setScore={setScoreOne} />
        <View style={tailwind`justify-center bg-white p-3`} />
        <Player name={playerTwoName} score={score2} setScore={setScoreTwo} />
        <View style={tailwind`p-1`}>
          <Button title='Finish' onPress={finishGame} />
        </View>
      </View>
    </ScrollView>
  );
}
