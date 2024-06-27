
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';

export default function PlayerSelection({ navigation }) {
  const [numPlayers, setNumPlayers] = useState(0);
  const [playerNames, setPlayerNames] = useState({});

  const renderPlayerInputs = () => {
    const inputs = [];
    for (let i = 1; i <= numPlayers; i++) {
      inputs.push(
        <View key={i} style={styles.inputContainer}>
          <Text style={styles.label}>Player {i}</Text>
          <TextInput
            style={styles.input}
            placeholder={`Player ${i} Name`}
            onChangeText={(text) => setPlayerNames({ ...playerNames, [`player${i}`]: text })}
          />
        </View>
      );
    }
    return inputs;
  };

  const handleStartMatch = () => {
    navigation.navigate('MatchScreen', { numPlayers, playerNames });
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.title}>Select Number of Players</Text>
      <View style={styles.radioContainer}>
        <CheckBox
          title="Two Players"
          checked={numPlayers === 2}
          onPress={() => setNumPlayers(2)}
          containerStyle={styles.checkBoxContainer}
        />
        <CheckBox
          title="Three Players"
          checked={numPlayers === 3}
          onPress={() => setNumPlayers(3)}
          containerStyle={styles.checkBoxContainer}
        />
        <CheckBox
          title="Four Players"
          checked={numPlayers === 4}
          onPress={() => setNumPlayers(4)}
          containerStyle={styles.checkBoxContainer}
        />
      </View>
      {renderPlayerInputs()}
      <Button title="Start Match" onPress={handleStartMatch} />
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  radioContainer: {
    marginBottom: 20,
  },
  checkBoxContainer: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});
