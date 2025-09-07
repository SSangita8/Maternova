import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import dietPlanData from '../data/formatted_pregnancy_guide.json'; // Adjust the path as needed

export default function DietPlanScreen({ navigation }) {
  const [selectedTrimester, setSelectedTrimester] = useState('first_trimester');
  const [selectedOption, setSelectedOption] = useState('vegetarian');

  let content = null;

  switch (selectedOption) {
    case 'vegetarian':
    case 'non_vegetarian':
      const dietPlan = dietPlanData[selectedTrimester][selectedOption];
      content = (
        <ScrollView style={styles.cardContainer}>
          <Text style={styles.sectionHeader}>What to Eat/Drink</Text>
          {dietPlan.what_to_eat_drink.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>{item}</Text>
            </View>
          ))}
          <Text style={styles.sectionHeader}>What to Avoid</Text>
          {dietPlan.what_to_avoid.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>{item}</Text>
            </View>
          ))}
        </ScrollView>
      );
      break;

    case 'foods_to_avoid':
      content = (
        <ScrollView style={styles.cardContainer}>
          {dietPlanData.foods_to_avoid.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{item.category}</Text>
              <Text style={styles.subText}>{item.foods.join(', ')}</Text>
              <Text style={styles.reasonText}>Reason: {item.reason}</Text>
            </View>
          ))}
        </ScrollView>
      );
      break;

    case 'skincare_products':
      content = (
        <ScrollView style={styles.cardContainer}>
          {Object.keys(dietPlanData["Skincare Products to Avoid During Pregnancy (Indian Market)"]).map((category, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardTitle}>{category}</Text>
              <Text style={styles.subText}>
              <Text style={styles.boldText}>Ingredients to Avoid: </Text>{dietPlanData["Skincare Products to Avoid During Pregnancy (Indian Market)"][category]["Ingredients to Avoid"].join(', ')}
              </Text>
              <Text style={styles.subText}>
              <Text style={styles.boldText}>Examples of Products: </Text> {dietPlanData["Skincare Products to Avoid During Pregnancy (Indian Market)"][category]["Examples of Products"].join(', ')}
              </Text>
            </View>
          ))}
        </ScrollView>
      );
      break;

    default:
      content = <Text style={styles.sectionHeader}>Please select a valid option</Text>;
      break;
  }

  return (
    <View style={styles.container}>
      {/* Trimester Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setSelectedTrimester('first_trimester')} style={selectedTrimester === 'first_trimester' ? styles.activeTab : styles.inactiveTab}>
          <Text style={selectedTrimester === 'first_trimester' ? styles.activeTabText : styles.inactiveTabText}>1st Trimester</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTrimester('second_trimester')} style={selectedTrimester === 'second_trimester' ? styles.activeTab : styles.inactiveTab}>
          <Text style={selectedTrimester === 'second_trimester' ? styles.activeTabText : styles.inactiveTabText}>2nd Trimester</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTrimester('third_trimester')} style={selectedTrimester === 'third_trimester' ? styles.activeTab : styles.inactiveTab}>
          <Text style={selectedTrimester === 'third_trimester' ? styles.activeTabText : styles.inactiveTabText}>3rd Trimester</Text>
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      <View style={[styles.dropdownContainer,styles.shadowContainer]}>
        {/*<Text style={styles.dropdownLabel}>Select Option:</Text>*/}
        <RNPickerSelect
          onValueChange={(value) => setSelectedOption(value)}
          items={[
            { label: 'Vegetarian', value: 'vegetarian' },
            { label: 'Non-Vegetarian', value: 'non_vegetarian' },
            { label: 'General Foods to Avoid', value: 'foods_to_avoid' },
            { label: 'Skincare Products to Avoid', value: 'skincare_products' },
          ]}
          value={selectedOption}
          style={pickerSelectStyles}
          placeholder={{ label: "Select Option", value: null }}
        />
      </View>

      {/* Content Based on Selection */}
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
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
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tab: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  activeTab: {
    backgroundColor: '#FFF3CD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  inactiveTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,  },
  activeTabText: {
    color: '#000',
    fontWeight: 'bold',
  },
  inactiveTabText: {
    color: '#999',
    fontWeight: 'bold',
  },
  cardContainer: {
    flex: 1,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center', // Center align the section headers
  },
  card: {
    backgroundColor: '#FAB6CE', // Light pink color
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center', // Center align the content within the card
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,

    // Elevation property for Android
    elevation: 5,
  
  },
  boldText: {
    fontWeight: 'bold', // Makes the text bold
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#474747',
    marginBottom: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center', // Center align the text
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center', // Center align the text
    
  },
  reasonText: {
    fontSize: 14,
    color: '#fff',
    marginTop: 5,
    textAlign: 'center', // Center align the text
  },
  underlinedCardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'underline', // Underline the text
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
