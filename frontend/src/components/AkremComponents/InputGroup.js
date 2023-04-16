import React from 'react'
import classnames from 'classnames'

function InputGroup({label, type, name, onChangeHandler, errors, value, placeHOLDER}) {
  return (
    <div className="mb-3">
    <label for="Nom" className="form-label">
      {label}
    </label>
    <input type={type} value={value} className={(classnames("form-control", {"is-invalid": errors}))}  name={name} onChange={onChangeHandler} placeholder={placeHOLDER}/>
    {
      errors && (<div class="invalid-feedback">
      {errors}
    </div>)
    }
  </div>
  )
}
function InputGroupCandidat({label, type, name, onChangeHandler, errors, value, placeHOLDER}) {
  return (
    <div className="mb-3">
    <label for="email" className="form-label">
      {label}
    </label>
    <input type={type} value={value} className={(classnames("form-control", {"is-invalid": errors}))}  name={name} onChange={onChangeHandler} placeholder={placeHOLDER}/>
    {
      errors && (<div class="invalid-feedback">
      {errors}
    </div>)
    }
  </div>
  )
}
export default InputGroup 