import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BarIndicator = ({ label, currentValue, minAcceptable, maxAcceptable, minValue, maxValue }) => {
  const position = ((currentValue - minValue) / (maxValue - minValue)) * 100;
  const minAcceptablePosition = ((minAcceptable - minValue) / (maxValue - minValue)) * 100;
  const maxAcceptablePosition = ((maxAcceptable - minValue) / (maxValue - minValue)) * 100;

  return (
    <View style={styles.barContainer}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.valueLabelsAboveBar}>
        <Text style={[styles.valueLabel, { left: `${minAcceptablePosition}%` }]}>{minAcceptable}</Text>
        <Text style={[styles.valueLabel, { right: `${100 - maxAcceptablePosition}%` }]}>{maxAcceptable}</Text>
      </View>
      <View style={styles.barBackground}>
        <View style={[styles.acceptableRange, { left: `${minAcceptablePosition}%`, right: `${100 - maxAcceptablePosition}%` }]} />
        <View style={[styles.currentValueIndicator, { left: `${position}%` }]}>
          <Text style={styles.currentValueText}>{currentValue}</Text>
          <View style={styles.verticalLine} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  barContainer: {
    marginVertical: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  valueLabelsAboveBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 14,
  },
  valueLabel: {
    fontSize: 12,
    color: '#666',
    position: 'absolute',
  },
  barBackground: {
    height: 10,
    backgroundColor: '#FFD54F',
    borderRadius: 5,
    position: 'relative',
  },
  acceptableRange: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: '#81C784',
    borderRadius: 5,
  },
  currentValueIndicator: {
    position: 'absolute',
    alignItems: 'center',
  },
  currentValueText: {
    fontSize: 12,
    color: '#1E88E5',
    fontWeight: 'bold',
    marginTop: -20,
  },
  verticalLine: {
    width: 2,
    height: 20,
    backgroundColor: '#1E88E5',
    marginTop:-2,
  },
});

export default BarIndicator;
