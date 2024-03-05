import React from 'react'
import type { Record } from '../type'

function ShopItem({record}:{record:Record}):JSX.Element {
  return (
    <div>
            <div className="product-item">
    <div className="product-list">
      <h3>{record.artist}</h3>
        <img src={record.img} alt="" />
        <span className="price">{record.description}</span>
    </div>
  </div>
    </div>
  )
}

export default ShopItem