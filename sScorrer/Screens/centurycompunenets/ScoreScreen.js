import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';

export default function ScoreScreen({ route, navigation }) {
  const { playerKey, playerName, updateScore, currentScore } = route.params;
  const [score, setScore] = useState(currentScore);
  const [history, setHistory] = useState([]);

  const handleScoreChange = (scoreChange) => {
    const newHistoryEntry = {
      id: history.length.toString(),
      change: scoreChange,
      timestamp: new Date().toLocaleTimeString(),
    };

    setScore(score + scoreChange);
    setHistory([...history, newHistoryEntry]);
    updateScore(playerKey, scoreChange);
  };

  const handleUndo = () => {
    if (history.length > 0) {
      const lastChange = history[history.length - 1].change;
      setScore(score - lastChange);
      setHistory(history.slice(0, -1));
      updateScore(playerKey, -lastChange);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Score for {playerName}</Text>
      <Text style={styles.currentScore}>Current Score: {score}</Text>
      <View style={styles.buttonContainer}>
        {[2, 3, 4, 5, 6, 7, 10].map((value) => (
          <Button key={value} title={`+${value}`} onPress={() => handleScoreChange(value)} color="#1e90ff" />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        {[-5, -10].map((value) => (
          <Button key={value} title={`${value}`} onPress={() => handleScoreChange(value)} color="#dc143c" />
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Undo" onPress={handleUndo} color="#ffa500" />
      </View>
      <View style={styles.goBackButton}>
        <Button title="Go Back" onPress={handleGoBack} />
      </View>
      <FlatList
        style={styles.historyList}
        data={history}
        renderItem={({ item }) => (
          <Text style={styles.historyItem}>
            {item.timestamp} - {item.change > 0 ? `+${item.change}` : item.change}
          </Text>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  currentScore: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    width: '100%',
  },
  goBackButton: {
    marginTop: 20,
    width: '100%',
  },
  historyList: {
    marginTop: 20,
    width: '100%',
  },
  historyItem: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
