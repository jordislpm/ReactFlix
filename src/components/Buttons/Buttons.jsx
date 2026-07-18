import React from 'react'
import ButtonFavorite from '../ButtonFavorite/ButtonFavorite'
import ButtonPlay from '../ButtonPlay/ButtonPlay'
import "./buttons.css"

const Buttons = ({ movie }) => {
  return (
    <div className='buttons_content'>
        <div>
            <ButtonPlay movie={movie} />
        </div>
        <div>
            <ButtonFavorite movie={movie} text={true} />
        </div>
    </div>
  )
}

export default Buttons