import React, { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import './TempForm.css'

function TempForm() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [values, setValues] = useState('')

  function onSubmit(data, e) {
    setValues(data)
    e.target.reset()
  }

  useEffect(() => {
    convert(values)
  }, [values])
  
  function convert(values) {
    const from = values.fromSelect
    const to = values.toSelect
    const temp = parseInt(values.temp)

    if (from == 'Celsius') {
      // CELSIUS A FARENHEIT
      if (to == 'Fahrenheit'){
        return ((temp*1.8)+32).toFixed(2) + " ºF"
      }
      // CELSIUS A KELVIN
      if (to == 'Kelvin'){
        return (temp+273.15).toFixed(2) + " ºK"
      }
      return temp;
    }

    if (from == 'Fahrenheit') {
      // FARENHEIT A CELSIUS
      if (to == 'Celsius'){
        return ((temp-32)*(5/9)).toFixed(2) + " ºC"
      }
      // FARENHEIT A KELVIN
      if (to == 'Kelvin'){
        return ((temp+459.67)*(5/9)).toFixed(2) + " ºK"
      }
      return temp;
    }

    if (from == 'Kelvin') {
      // KELVIN A CELSIUS
      if (to == 'Celsius'){
        return (temp-273.15).toFixed(2) + " ºC"
      }
      // KELVIN A FARENHEIT
      if (to == 'Fahrenheit'){
        return ( 1.8 * (temp - 273) +32 ).toFixed(2) + " ºF"
      }
      return temp;
    }
  }


  return (
    <div className='form-container'>
      <form 
        className='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="temp-input" id='labeltemp'>
          Value to convert
        </label>
        <input
          type="text"
          name="temp"
          id='temp-input'
          placeholder='Enter the value...'
          {...register("temp", 
          { required: {value:true, message:'Campo Requerido'} }
        )} 
        />
      <div className='error'>
        {errors?.temp?.message}
      </div>
        <label htmlFor="from-input" id='labelfrom'>
          From
        </label>

        <select name="fromSelect" id='from-input'
        {...register("fromSelect", 
        { required: {value:true, message:'Campo Requerido'} }
         )} 
        >
          <option value="Celsius" defaultValue>Celsius</option>
          <option value="Fahrenheit">Fahrenheit</option>
          <option value="Kelvin">Kelvin</option>
          
        </select>

        <label htmlFor="to-input" id='labelto'
        >
          To
        </label>
        <select name="toSelect" id='to-input'
        {...register("toSelect", 
        { required: {value:true, message:'Campo Requerido'} }
        )} 
        >
          <option value="Kelvin">Kelvin</option>
          <option value="Fahrenheit" defaultValue>Fahrenheit</option>
          <option value="Celsius">Celsius</option>
        </select>

      <button className='btn'>CONVERT</button>
        
      <p className='temp-result'>{convert(values)}</p>

      </form>
    </div>
  )
}

export default TempForm