/* eslint-disable react/function-component-definition */
import React, { useState } from 'react'
import { useAppDispatch } from '../../../store/store'
import { recordAdd } from '../recordsSlice'

const FormAddRecord = (): JSX.Element => {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState<FileList | null | undefined>(undefined)
  const [price, setPrice] = useState('')
  const [quality, setQuality] = useState('')

  const dispatch = useAppDispatch()

  const addRecordFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('title', title)
    formData.append('artist', artist)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('img', img.files[0])
    formData.append('quality', quality)
    dispatch(recordAdd(formData)).catch(console.log)
    setTitle('')
    setArtist('')
    setDescription('')
    setPrice('')
    setQuality('')
  }

  return (
    <div className='add__form__container'>
      <form className='add__form' onSubmit={addRecordFetch}>
            <input value={title} placeholder='title' required onChange={(e)=>setTitle(e.target.value)} />
            <input value={artist} placeholder='artist' onChange={(e)=>setArtist(e.target.value)}/>
            <input value={description} placeholder='description' onChange={(e)=>setDescription(e.target.value)}/>
            <input value={price} placeholder='price' onChange={(e)=>setPrice(e.target.value)}/>
            <input  placeholder='img' type='file' onChange={(e)=>setImg(e.target.files)}/>
            <select value={quality} onChange={(e) => setQuality(e.target.value)}>
              <option value="empty">Не выбрано</option>
              <option value="mint">Mint</option>
              <option value="near-mint">Near mint</option>
              <option value="very-good">Very good</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
              <option value="bad">Bad</option>
            </select>
            <button type='submit'>add<img className='icons' src='/img/add.gif' alt='...'/></button>
        </form>
    </div>
  )
}

export default FormAddRecord