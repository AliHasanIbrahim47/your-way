import React from 'react'

const EditBrand = ({data, updateBrands}) => {
  return (
    <div>
      EditBrand
      {data.map((a) => (
        <div>
          <p>{a.id}</p>
          <p>{a.DeparturePlace}</p>
          <p>{a.ArrivalPlace}</p>
        </div>
      ))}
    </div>
  )
}

export default EditBrand
