import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import dosDontsData from '../data/dos_and_donts.json'; // Adjust the path as needed

export default function DosDontsScreen() {
  const [selectedTrimester, setSelectedTrimester] = useState('First Trimester (Weeks 1-12)');
  const [selectedOption, setSelectedOption] = useState('dos');

  const content = selectedOption === 'dos' 
    ? dosDontsData[selectedTrimester]["Do's"] 
    : dosDontsData[selectedTrimester]["Don'ts"];

  const renderContent = (content) => {
    return Object.keys(content).map((key, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.cardTitle}>{key}</Text>
        <Text style={styles.cardText}>{content[key]}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
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

      <View style={[styles.dropdownContainer,styles.shadowContainer]}>
        {/*<Text style={styles.dropdownLabel}>Select Option:</Text>*/}
        <RNPickerSelect
          onValueChange={(value) => setSelectedOption(value)}
          items={[
            { label: "Do's", value: 'dos' },
            { label: "Don'ts", value: 'donts' },
          ]}
          value={selectedOption}
          style={pickerSelectStyles}
          placeholder={{ label: "Select Option", value: null }}
        />
      </View>

      <ScrollView style={styles.cardContainer}>
        {renderContent(content)}
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
  dropdownLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    backgroundColor: '#C4ECF6', // Light blue color for the card
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Elevation property for Android
    elevation: 5,
  
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
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
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
