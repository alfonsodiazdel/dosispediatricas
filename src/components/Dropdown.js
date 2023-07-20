import React, { useState, useEffect } from 'react'
import './Dropdown.css';
export default function Dropdown(props) {
    const [selectedOption, setSelectedOption] = useState(1)

    useEffect(() => {
        const id = parseInt(selectedOption);
        const drug = props.options.filter(option => option.id == id)[0]
        console.log(drug)
        props.setSelectedDrug(drug)
    }, [selectedOption])

    return (
        <div>
            <h3>Seleccione medicamento</h3>
            <div class='dropdown'>
                <select class='dropbtn' onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
                    {
                        props.options.map(option => <option value={option.id} label={option.name} key={option.id}></option>)
                    }
                </select>
            </div>
        </div>
    )
}
