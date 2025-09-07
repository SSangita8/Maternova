import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import { HealthContext } from '../context/HealthContext';
import BarIndicator from '../components/BarIndicator';

export default function PredictionScreen({ navigation }) {
  const [state] = useContext(AuthContext);
  const [healthData] = useContext(HealthContext);
  const [risk, setRisk] = useState(null);
  const [loading, setLoading] = useState(true);

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    const getPrediction = async () => {
      try {
        const age = calculateAge(state.user.dob);
        console.log('Token:', state.token);

        const response = await axios.post('https://avipsa.pythonanywhere.com/predict', {
          RBS: healthData.RBS,
          abortion: healthData.abortion,
          HB: healthData.HB,
          numConceived: healthData.numConceived,
          HBA1C: healthData.HBA1C,
          RR: healthData.RR,
          Age: age,
          deliveries: healthData.deliveries,
          liveBirth: healthData.liveBirth,
          SystolicBP: healthData.SystolicBP,
          DiastolicBP: healthData.DiastolicBP,
          childDeath: healthData.childDeath,
          HeartRate: healthData.HeartRate,
          BodyTemp: healthData.BodyTemp,
        }, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        setRisk(response.data.risk);

        await axios.post('/risk/store-risk-check', {
          userId: state.user._id,
          RBS: healthData.RBS,
          HB: healthData.HB,
          HBA1C: healthData.HBA1C,
          RR: healthData.RR,
          SystolicBP: healthData.SystolicBP,
          DiastolicBP: healthData.DiastolicBP,
          HeartRate: healthData.HeartRate,
          BodyTemp: healthData.BodyTemp,
          risk: response.data.risk,
        }, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });

        await axios.put('/ques/update-details', {
          numConceived: healthData.numConceived,
          liveBirth: healthData.liveBirth,
          abortion: healthData.abortion,
          childDeath: healthData.childDeath,
          deliveries: healthData.deliveries,
        }, {
          headers: {
            Authorization: `Bearer ${state.token}`
          }
        });

      } catch (error) {
        console.error('Error fetching prediction:', error);
        alert('Error fetching prediction');
      } finally {
        setLoading(false);
      }
    };

    getPrediction();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : risk !== null ? (
        <>
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              You are {risk === 0 ? 'good to go!!' : 'at high risk'}
            </Text>
            <Text style={styles.riskText}>{risk === 0 ? 'No Risk' : 'High Risk'}</Text>
          </View>

          <Text style={styles.analysisHeader}>Report Analysis</Text>

          <BarIndicator label="Systolic Blood Pressure" currentValue={healthData.SystolicBP} minAcceptable={90} maxAcceptable={120} minValue={60} maxValue={150} />
          <BarIndicator label="Diastolic Blood Pressure" currentValue={healthData.DiastolicBP} minAcceptable={60} maxAcceptable={80} minValue={40} maxValue={100} />
          <BarIndicator label="Glucose" currentValue={healthData.RBS} minAcceptable={70} maxAcceptable={140} minValue={40} maxValue={170} />
          <BarIndicator label="Respiration Rate" currentValue={healthData.RR} minAcceptable={12} maxAcceptable={20} minValue={0} maxValue={32} />
          <BarIndicator label="Body Temperature" currentValue={healthData.BodyTemp} minAcceptable={97} maxAcceptable={99} minValue={95} maxValue={104} />
          <BarIndicator label="Pulse Rate" currentValue={healthData.HeartRate} minAcceptable={60} maxAcceptable={100} minValue={40} maxValue={120} />
          <BarIndicator label="Hemoglobin Level" currentValue={healthData.HB} minAcceptable={12} maxAcceptable={16} minValue={5} maxValue={23} />
          <BarIndicator label="HBA1C Level" currentValue={healthData.HBA1C} minAcceptable={4} maxAcceptable={5.6} minValue={2} maxValue={10} />

          <View style={styles.buttonContainer}>
            <Button title="Save" color="#4CAF50" onPress={() => navigation.navigate('HomeScreen')} />
          </View>
        </>
      ) : (
        <Text style={styles.errorText}>Error fetching prediction result</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  resultContainer: {
    alignItems: 'center',
    marginVertical: 20,
    padding: 20,
    backgroundColor: '#FFF9C4',
    borderRadius: 10,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  riskText: {
    fontSize: 18,
    color: '#4CAF50',
    marginTop: 10,
  },
  analysisHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
});
