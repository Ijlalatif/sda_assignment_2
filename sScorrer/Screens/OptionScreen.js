import React from 'react';
import { View, Text, TouchableOpacity, StatusBar,StyleSheet,Image } from 'react-native';
import tailwind from 'twrnc';

export default function OptionScreen ({ navigation }) {
  return (
   
    <View style={tailwind`flex-1 items-center justify-center bg-green-800`}>

      <TouchableOpacity onPress={() => navigation.navigate('Plyerselection')}
      style={tailwind`bg-green-800 hover:bg-gray-100 text-gray-800 font-semibold py-4 px-35 border border-white rounded shadow`}
      >
        
        <Text style={tailwind`text-white text-lg font-bold`}>Century</Text>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity onPress={() => navigation.navigate('Twoplyers')}
      style={tailwind`bg-green-800 hover:bg-gray-100 text-gray-800 font-semibold py-4 px-35 border border-white rounded shadow`}
      >
        <Text style={tailwind`text-white text-lg font-bold`}>Ten Ball</Text>
      </TouchableOpacity>
      <Text></Text>
      <TouchableOpacity onPress={() => navigation.navigate('LoadHistory')}
      style={tailwind`bg-green-800 hover:bg-gray-100 text-gray-800 font-semibold py-4 px-30 border border-white rounded shadow` }
      >
        <Text style={tailwind`text-white text-lg font-bold`}>Load History</Text>
      </TouchableOpacity>
      <Text></Text>
    
      <StatusBar style="dark" />
    </View>
  );
}

