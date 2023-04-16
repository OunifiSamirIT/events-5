import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import "./akremeventCss.css"
function RowDetails({Nom, Date, Artistes, Lien, Id, OnDelete}) {
 
  return (
    <tr>
    <th>{Nom}</th>
    <td>{Date}</td>
    <td>{Artistes}</td>
    <td>{Lien}</td>
    <td className="gap__actions">
      
     


      <button class="button-85" role="button">   <Link to={`/${Id}`} className="text-white">
          <i className="fas fa-edit"></i>
        </Link>        </button>
        <span style={{marginRight: 8}}>                                   </span>
        <span>                                   </span>
        <button class="button-85" role="button" onClick={()=>OnDelete(Id)}>    <Link to={`/${Id}`} className="text-white">
        <i className="fas fa-trash-alt"></i>
        </Link>        </button>

      
    </td>
  </tr>
  )
}

export default RowDetails