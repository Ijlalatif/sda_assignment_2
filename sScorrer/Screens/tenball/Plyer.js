import React from 'react';
import { View, Text } from 'react-native';
import tailwind from 'twrnc';
import Icon from 'react-native-vector-icons/AntDesign';
import ScoreInput from './ScoreInput';
import {images} from '../tenball/images'

const Player = ({ name, score, setScore }) => {
  const incrementValues = [
    { image: images.red, amount: 1 },
    { image: images.yellow, amount: 2 },
    { image: images.green, amount: 3 },
    { image: images.brown, amount: 4 },
    { image: images.blue, amount: 5 },
    { image: images.pink, amount: 6 },
    { image: images.black, amount: 7 },
  ];

  const decrementValues = [
    { amount: 4 },
    { amount: 5 },
    { amount: 6 },
    { amount: 7 },
  ];

  return (
    <View style={tailwind`bg-green-800 p-25`}>
      <Icon name='user' size={50} color="black" />
      <Text style={tailwind`text-white text-2xl`}>{name}</Text>
      <ScoreInput
        score={score}
        setScore={setScore}
        incrementValues={incrementValues}
        decrementValues={decrementValues}
      />
    </View>
  );
};

export default Player;
