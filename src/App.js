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
      <div class='title'>
        <h1>Dosis Pediátricas</h1>
        <h3>Calculadora</h3>
      </div>

      <div class="panel-container">
        <div class="left-panel">
          {
            drugs.length > 0
              ? <Dropdown options={drugs} setSelectedDrug={setSelectedDrug}></Dropdown>
              : <p>Cargando informacion</p>
          }
        </div>
        <div class="right-panel">
          <div>
            <h3>Introduzca el Peso (kg)</h3>
            <input
              class='weight'
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div class='pediatric-dose'>
        <p class="dose">Dosis: {pediatricDose} ml</p>
      </div>

    </div>
  );
}

export default App;