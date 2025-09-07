import React, { createContext, useState } from 'react';

const HealthContext = createContext();

const HealthProvider = ({ children }) => {
  const [healthData, setHealthData] = useState({
    // Initial Questions
    numConceived: '',
    deliveries: '',
    liveBirth: '',
    abortion: '',
    childDeath: '',
    // Risk Parameters
    RBS: '',
    HB: '',
    HBA1C: '',
    RR: '',
    SystolicBP: '',
    DiastolicBP: '',
    HeartRate: '',
    BodyTemp: '',
  });

  return (
    <HealthContext.Provider value={[healthData, setHealthData]}>
      {children}
    </HealthContext.Provider>
  );
};

export { HealthContext, HealthProvider };
