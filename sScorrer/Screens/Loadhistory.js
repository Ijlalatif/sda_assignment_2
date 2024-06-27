// LoadHistory.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadHistory = () => {
  const [gameHistory, setGameHistory] = useState([]);

  useEffect(() => {
    const fetchGameHistory = async () => {
      try {
        const tenballData = await AsyncStorage.getItem('gameHistory');
        const centuryData = await AsyncStorage.getItem('matchHistory');
        const tenballHistory = tenballData ? JSON.parse(tenballData) : [];
        const centuryHistory = centuryData ? JSON.parse(centuryData) : [];
        const combinedHistory = [...tenballHistory, ...centuryHistory];
        combinedHistory.sort((a, b) => new Date(b.date) - new Date(a.date)); 
        setGameHistory(combinedHistory);
      } catch (error) {
        console.error('Error loading game history:', error);
      }
    };

    fetchGameHistory();
  }, []);

  const deleteGameHistory = async () => {
    try {
      await AsyncStorage.removeItem('gameHistory');
      await AsyncStorage.removeItem('matchHistory');
      setGameHistory([]);
      Alert.alert('Success', 'Game history deleted successfully!');
    } catch (error) {
      console.error('Error deleting game history:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Game History</Text>
        <Button title="Delete All" onPress={deleteGameHistory} />
      </View>
      <FlatList
        data={gameHistory}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.text}>Title: {item.title}</Text>
            <Text style={styles.text}>Winner: {item.winner}</Text>
            <Text style={styles.text}>Date: {item.date}</Text>
            <Text style={styles.text}>Total Time: {Math.floor(item.elapsedTime / 60)}:{item.elapsedTime % 60}</Text>
            {item.playerScores && Object.keys(item.playerScores).map((playerKey, index) => (
              <Text key={index} style={styles.text}>
                Player {index + 1}: {item.playerNames[playerKey]} - {item.playerScores[playerKey]} points
              </Text>
            ))}
            {item.score1 !== undefined && (
              <View>
                <Text style={styles.text}>Player 1: {item.playerOneName} - {item.score1} points</Text>
                <Text style={styles.text}>Player 2: {item.playerTwoName} - {item.score2} points</Text>
              </View>
            )}
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No game history available</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  itemContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

export default LoadHistory;
