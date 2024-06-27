import React from 'react';
import { View, TextInput, ScrollView, TouchableOpacity, Image, Text } from 'react-native';
import tailwind from 'twrnc';

const ScoreInput = ({ score, setScore, incrementValues, decrementValues }) => {
  return (
    <View>
      <TextInput
        style={tailwind`border border-gray-300 rounded-lg p-2 text-black`}
        value={score.toString()} 
        editable={false} 
      />
      <ScrollView horizontal={true} style={{ width: 500, paddingTop: 10 }}>
        {incrementValues.map((value, index) => (
          <TouchableOpacity key={index} onPress={() => setScore(score + value.amount)} style={tailwind`p-1`}>
            <Image source={value.image} style={{ height: 22, width: 30 }} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <ScrollView horizontal={true} style={{ width: 300, paddingTop: 10, paddingLeft: 10 }}>
        {decrementValues.map((value, index) => (
          <TouchableOpacity key={index} onPress={() => setScore(score - value.amount)}>
            <Text style={tailwind`text-black text-2xl pl-7`}>-{value.amount}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default ScoreInput;
