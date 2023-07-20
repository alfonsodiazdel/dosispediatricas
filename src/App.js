import { useState, useEffect } from 'react'
import './App.css';
import Dropdown from './components/Dropdown';

function App() {
  const [drugs, setDrugs] = useState([])

  const fetchDrugs = async () => {
    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz0szonSnEk7kstcbXl0dV9tMiR79jHwSZVpJ-kda-9ajzZKE8bO_xs-_ziBVvPQrRv/exec')
      const drugs = await response.json();
      setDrugs(drugs)
    } catch (error) {
      console.log('Error fetching data', error)
    }
  }

  useEffect(() => {
    fetchDrugs()
  }, [])

  const [selectedDrug, setSelectedDrug] = useState({})
  const [weight, setWeight] = useState(0)
  const [pediatricDose, setPediatricDose] = useState('')

  const calculatePediatricDose = () => {
    const dose = ((weight * selectedDrug.pediatric_dose) * selectedDrug.ml) / selectedDrug.mg
    setPediatricDose(dose);
  }

  useEffect(() => {
    calculatePediatricDose()
  }, [selectedDrug, weight])

  return (
    <div className="App">
      <div className='title'>
        <h1>Dosis Pediátricas</h1>
        <h3>Calculadora</h3>
      </div>

      <div className="panel-container">
        <div className="left-panel">
          {
            drugs.length > 0
              ? <div>
                <Dropdown options={drugs} setSelectedDrug={setSelectedDrug}></Dropdown>
                <span className='additional-info'>{selectedDrug.pediatric_dose} mg/kg</span>
              </div>
              : <p>Cargando informacion</p>
          }
        </div>
        <div className="right-panel">
          <div>
            <h3>Peso (kg)</h3>
            <input
              className='weight'
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className='pediatric-dose'>
        <h3 className=''>Resultado</h3>
        <p className="dose">Dosis: {pediatricDose.toFixed(2)} ml</p>
      </div>

    </div>
  );
}

export default App;
