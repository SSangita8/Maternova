import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import yogaData from '../data/yogaformatted_with_images_.json'; // Adjust the path as needed

export default function YogaExerciseScreen({ navigation }) {
  const [selectedTrimester, setSelectedTrimester] = useState('First Trimester (Weeks 1-12)');
  const [selectedOption, setSelectedOption] = useState('exercises');

  const trimesterData = yogaData[selectedTrimester] || {};
  const exercises = trimesterData.Exercises?.["Recommended Exercises"] || [];
  const exercisesToAvoid = trimesterData.Exercises?.["Exercises to Avoid"] || [];
  const yogaPoses = trimesterData["Yoga Poses"]?.["Recommended Yoga Poses"] || [];
  const posesToAvoid = trimesterData["Yoga Poses"]?.["Poses to Avoid"] || [];
  const generalTips = yogaData["General Tips"] || [];

  let content = null;

  if (selectedOption === 'exercises') {
    content = (
      <>
        <Text style={styles.sectionHeader}>Recommended Exercises</Text>
        {exercises.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>{item.exercise}</Text>
            {item.image_url && <Image source={{ uri: item.image_url }} style={styles.cardImage} />}
          </View>
        ))}

        <Text style={styles.sectionHeader}>Exercises to Avoid</Text>
        {exercisesToAvoid.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>{item.exercise}</Text>
            {item.image_url && <Image source={{ uri: item.image_url }} style={styles.cardImage} />}
          </View>
        ))}
      </>
    );
  } else if (selectedOption === 'yoga') {
    content = (
      <>
        <Text style={styles.sectionHeader}>Recommended Yoga Poses</Text>
        {yogaPoses.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>{item.pose}</Text>
            {item.image_url && <Image source={{ uri: item.image_url }} style={styles.cardImage} />}
          </View>
        ))}

        <Text style={styles.sectionHeader}>Yoga Poses to Avoid</Text>
        {posesToAvoid.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>{item.pose}</Text>
            {item.image_url && <Image source={{ uri: item.image_url }} style={styles.cardImage} />}
          </View>
        ))}
      </>
    );
  } else if (selectedOption === 'general_tips') {
    content = (
      <>
        <Text style={styles.sectionHeader}>General Tips</Text>
        {generalTips.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.cardText}>{item.tip}</Text>
            {item.image_url && <Image source={{ uri: item.image_url }} style={styles.cardImage} />}
          </View>
        ))}
      </>
    );
  }

  return (
    <View style={styles.container}>
      {/* Trimester Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setSelectedTrimester('First Trimester (Weeks 1-12)')} style={selectedTrimester === 'First Trimester (Weeks 1-12)' ? styles.activeTab : styles.inactiveTab}>
          <Text style={selectedTrimester === 'First Trimester (Weeks 1-12)' ? styles.activeTabText : styles.inactiveTabText}>1st Trimester</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTrimester('Second Trimester (Weeks 13-26)')} style={selectedTrimester === 'Second Trimester (Weeks 13-26)' ? styles.activeTab : styles.inactiveTab}>
          <Text style={selectedTrimester === 'Second Trimester (Weeks 13-26)' ? styles.activeTabText : styles.inactiveTabText}>2nd Trimester</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTrimester('Third Trimester (Weeks 27-40)')} style={selectedTrimester === 'Third Trimester (Weeks 27-40)' ? styles.activeTab : styles.inactiveTab}>
          <Text style={selectedTrimester === 'Third Trimester (Weeks 27-40)' ? styles.activeTabText : styles.inactiveTabText}>3rd Trimester</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      <View style={[styles.dropdownContainer, styles.shadowContainer]}>
        <RNPickerSelect
          onValueChange={(value) => setSelectedOption(value)}
          items={[
            { label: 'Exercises', value: 'exercises' },
            { label: 'Yoga Poses', value: 'yoga' },
            { label: 'General Tips', value: 'general_tips' },
          ]}
          value={selectedOption}
          style={pickerSelectStyles}
          placeholder={{ label: "Select Option", value: null }}
        />
      </View>

      {/* Content Based on Selection */}
      <ScrollView style={styles.cardContainer}>
        {content}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  activeTab: {
    backgroundColor: '#FFF3CD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  inactiveTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  dropdownContainer: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  shadowContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android
  },
  cardContainer: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FDDCAB',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'justify', // Justify the text
    flex: 1,
  },
  cardImage: {
    width: 120,
    height: 120,
    marginLeft: 10,
    borderRadius: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
});
