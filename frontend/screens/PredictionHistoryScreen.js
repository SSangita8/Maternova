import React, { useContext, useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function PredictionHistoryScreen() {
  const [state] = useContext(AuthContext);
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        console.log('Requesting predictions for user:', state.user._id);
        const response = await axios.get(`/risk/predictions/${state.user._id}`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        console.log('Predictions fetched successfully:', response.data);
        
        // Sort predictions by date in descending order
        const sortedPredictions = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPredictions(sortedPredictions);
      } catch (error) {
        console.error('Error fetching predictions:', error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [state.user._id, state.token]);

  const formatDataForChart = (parameter) => {
    // Use the first 10 records from the sorted dataset
    return predictions.slice(0, 10).map(prediction => prediction[parameter]);
  };

  const formatLabelsForChart = () => {
    // Use the first 10 records and format the date as 'DD/MM'
    return predictions.slice(0, 10).map(prediction =>
      new Date(prediction.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })
    );
  };

  const chartWidth = Dimensions.get('window').width* 1.2 - 40; // Adjust the width of the chart

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Prediction History</Text>

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        predictions.length === 0 ? (
          <Text>No predictions found</Text>
        ) : (
          <>
            <Text style={styles.chartLabel}>Systolic Blood Pressure</Text>
            <ScrollView horizontal={true} style={styles.chartScrollView}>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: formatLabelsForChart(), // Use all labels
                    datasets: [{ data: formatDataForChart('SystolicBP') }],
                  }}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chart}
                />
              </View>
            </ScrollView>

            <Text style={styles.chartLabel}>Diastolic Blood Pressure</Text>
            <ScrollView horizontal={true} style={styles.chartScrollView}>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: formatLabelsForChart(), // Use all labels
                    datasets: [{ data: formatDataForChart('DiastolicBP') }],
                  }}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chart}
                />
              </View>
            </ScrollView>

            <Text style={styles.chartLabel}>Glucose (RBS)</Text>
            <ScrollView horizontal={true} style={styles.chartScrollView}>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: formatLabelsForChart(), // Use all labels
                    datasets: [{ data: formatDataForChart('RBS') }],
                  }}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chart}
                />
              </View>
            </ScrollView>

            <Text style={styles.chartLabel}>Respiration Rate</Text>
            <ScrollView horizontal={true} style={styles.chartScrollView}>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: formatLabelsForChart(), // Use all labels
                    datasets: [{ data: formatDataForChart('RR') }],
                  }}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chart}
                />
              </View>
            </ScrollView>

            <Text style={styles.chartLabel}>Body Temperature</Text>
            <ScrollView horizontal={true} style={styles.chartScrollView}>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: formatLabelsForChart(), // Use all labels
                    datasets: [{ data: formatDataForChart('BodyTemp') }],
                  }}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chart}
                />
              </View>
            </ScrollView>

            <Text style={styles.chartLabel}>Heart Rate</Text>
            <ScrollView horizontal={true} style={styles.chartScrollView}>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: formatLabelsForChart(), // Use all labels
                    datasets: [{ data: formatDataForChart('HeartRate') }],
                  }}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chart}
                />
              </View>
            </ScrollView>

            <Text style={styles.chartLabel}>Hemoglobin (HB)</Text>
            <ScrollView horizontal={true} style={styles.chartScrollView}>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: formatLabelsForChart(), // Use all labels
                    datasets: [{ data: formatDataForChart('HB') }],
                  }}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chart}
                />
              </View>
            </ScrollView>

            <Text style={styles.chartLabel}>HBA1C Level</Text>
            <ScrollView horizontal={true} style={styles.chartScrollView}>
              <View style={styles.chartContainer}>
                <LineChart
                  data={{
                    labels: formatLabelsForChart(), // Use all labels
                    datasets: [{ data: formatDataForChart('HBA1C') }],
                  }}
                  width={chartWidth}
                  height={220}
                  chartConfig={chartConfig}
                  style={styles.chart}
                />
              </View>
            </ScrollView>
          </>
        )
      )}
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientTo: '#FFF',
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    marginVertical: 10,
    marginLeft: -16, // Move chart towards the left
  },
  chart: {
    borderRadius: 16,
  },
  chartLabel: {
    fontSize: 18,
    marginBottom: 10,
  },
});
