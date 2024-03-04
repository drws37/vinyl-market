/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { type RootState, useAppDispatch } from '../../../store/store';
import { recordAdd } from '../recordsSlice';


const FormAddRecord = (): JSX.Element => {

  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [description, setDescription] = useState('')
  const [img, setImg] = useState<FileList | null | undefined>(null)
  const [price, setPrice] = useState('')
  const [quality, setQuality] = useState('')
  const [category, setCategory] = useState('')

  const categories = useSelector((store: RootState) => store.categories.categories)
  const dispatch = useAppDispatch();

  const addRecordFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const imgFile = img?.[0]
    const formData = new FormData()
    formData.append('title', title)
    formData.append('artist', artist)
    formData.append('description', description)
    formData.append('price', price)
    formData.append('img', imgFile !== null && imgFile !== undefined ? imgFile : '')
    formData.append('quality', quality)
    formData.append('category', category)
    dispatch(recordAdd(formData)).catch(console.log)
    setTitle('')
    setArtist('')
    setDescription('')
    setPrice('')
    setQuality('')
    setCategory('')
  }

  return (
    <div className='add__form__container'>
      <form className='add__form' onSubmit={addRecordFetch}>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value= ''>Выберите жанр</option>
              {categories.map((genre) => (
                <option key={genre.id} value={genre.id}>{genre.title}</option>
              ))}
            </select>
            <input value={title} placeholder='title' required onChange={(e)=>setTitle(e.target.value)} />
            <input value={artist} placeholder='artist' onChange={(e)=>setArtist(e.target.value)}/>
            <input value={description} placeholder='description' onChange={(e)=>setDescription(e.target.value)}/>
            <input value={price} placeholder='price' type='number' onChange={(e)=>setPrice(e.target.value)}/>
            <input  placeholder='img' type='file' onChange={(e)=>setImg(e.target.files)}/>
            <select value={quality} onChange={(e) => setQuality(e.target.value)}>
              <option value="Empty">Не выбрано</option>
              <option value="Mint">Mint</option>
              <option value="Near Mint">Near mint</option>
              <option value="Very Good">Very good</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
              <option value="Bad">Bad</option>
            </select>
            <button type='submit'>Добавить</button>
        </form>
    </div>
  );
};

export default FormAddRecord;
