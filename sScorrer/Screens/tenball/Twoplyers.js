import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,Image } from 'react-native';
import tailwind from 'twrnc';

export default function TwoPlayers({ navigation }) {
  const [playerOne, setPlayerOne] = useState('');
  const [playerTwo, setPlayerTwo] = useState('');
  const [error, setError] = useState('');

  const handleInput = () => {
    if (playerOne.trim() === '' || playerTwo.trim() === '') {
      setError('Please fill in both fields');
    } else {
      setError('');
      navigation.navigate('tenball', {
        playerOneName: playerOne,
        playerTwoName: playerTwo
      });
    }
  };

  return (
  
    <View style={tailwind`flex-1 justify-center bg-green-800 p-4`}>
     
      <Text style={tailwind`text-3xl font-semibold text-white mb-3`}>
        Player One
      </Text>
      <TextInput
        style={tailwind`border ${playerOne.trim() === '' && error ? 'border-red-500' : 'border-gray-400'} rounded-lg p-2 text-base w-72`}
        onChangeText={setPlayerOne}
        value={playerOne}
      />
      <Text style={tailwind`text-3xl font-semibold text-white mb-3 pt-4`}>
        Player Two
      </Text>
      <TextInput
        style={tailwind`border ${playerTwo.trim() === '' && error ? 'border-red-500' : 'border-gray-400'} rounded-lg p-2 text-base w-72`}
        onChangeText={setPlayerTwo}
        value={playerTwo}
      />
      {error ? (
        <Text style={tailwind`text-red-500 text-sm mb-4`}>{error}</Text>
      ) : null}
      <TouchableOpacity
        style={tailwind`bg-green-600 rounded-lg p-4 w-72 mt-4`}
        onPress={handleInput}
      >
        <Text style={tailwind`text-white text-lg font-bold text-center`}>
          Start Match
        </Text>
      </TouchableOpacity>
    </View>
  );
}
