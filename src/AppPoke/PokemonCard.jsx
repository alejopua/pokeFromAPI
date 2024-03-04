import React from 'react'

export const PokemonCard = ({ id, name, sprites = [] }) => {
  return (
    <section className="alert alert-info" style={{ height: "auto" }}>
      <h2 className="text-capitalize">#{id} - {name}</h2>
      <div className='d-flex justify-content-center align-items-center'>
        {
          sprites.map( sprite => (
            <img style={{ width: 200 }} key={sprite} src={sprite} alt={name} />
          ))
        }
      </div>
    </section>
  )
}