/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../../store/store';
import { recordUpdate } from '../recordsSlice';
import {Chart as ChartJs} from "chart.js/auto"
import {Bar, Doughnut, Line} from 'react-chartjs-2'
import { recordRemove, recordUpdate } from '../recordsSlice';

import '../styles/recordsPage.scss';

function RecordPage(): JSX.Element {
  const { recordId } = useParams();
  const records = useSelector((store: RootState) => store.records.records);
  const currentRecord = recordId ? records.find((record) => record.id === +recordId) : undefined;

  const [title, setTitle] = useState<string | undefined>(undefined);
  const [artist, setArtist] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [img, setImg] = useState<FileList | null | undefined>(null);
  const [price, setPrice] = useState<string | undefined>(undefined);
  const [quality, setQuality] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (currentRecord) {
      setTitle(currentRecord.title || '');
      setArtist(currentRecord.artist || '');
      setDescription(currentRecord.description || '');
      setPrice(currentRecord.price !== undefined ? String(currentRecord.price) : '');
      setQuality(currentRecord.quality || '');
    }
  }, [currentRecord]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const updateRecordFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const imgFile = img?.[0];
    const formData = new FormData();
    formData.append('title', title || '');
    formData.append('artist', artist || '');
    formData.append('description', description || '');
    formData.append('price', String(price || ''));
    formData.append('img', imgFile !== null && imgFile !== undefined ? imgFile : '');
    formData.append('quality', quality || '');
    const data = {
      id: currentRecord?.id,
      obj: formData,
    };
    dispatch(recordUpdate(data)).catch(console.log);
  };

  const onHandleDelete = () : void => {
    dispatch(recordRemove(currentRecord?.id)).catch(console.log)
    navigate('/')
  }

  return (
    <div>
      {currentRecord && (
        <>
          <div className="update__form__container">
            <form className="update__form" onSubmit={updateRecordFetch}>
              <input
                value={title}
                placeholder="title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                value={artist}
                placeholder="artist"
                onChange={(e) => setArtist(e.target.value)}
              />
              <input
                value={description}
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                value={price}
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input placeholder="img" type="file" onChange={(e) => setImg(e.target.files)} />
              <select
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option value="Empty">Не выбрано</option>
                <option value="Mint">Mint</option>
                <option value="Near Mint">Near mint</option>
                <option value="Very Good">Very good</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Poor">Poor</option>
                <option value="Bad">Bad</option>
              </select>
              <button className='button__update' type="submit">Изменить</button>
              <button onClick={onHandleDelete} className='button__delete' type='button'>Удалить</button>
            </form>
          </div>
          <div className="record-page">
            <div className="record-card_main">
              <div className="card_img">
                <img src={currentRecord?.img} alt="" />
              </div>
              <div className="record-card_info">
                <h1>{currentRecord?.artist}</h1>
                <h2>{currentRecord?.title}</h2>
                <div className="tags">
                  <div className="quality">{currentRecord?.quality}</div>
                  <div className="price">{`${currentRecord?.price} ₽`}</div>
                </div>
                <p>Описание: {currentRecord.description}</p>
              </div>
              <div className="records-page_widget">
                <iframe
                  title={currentRecord.title}
                  style={{ borderRadius: '12px' }}
                  src={`https://open.spotify.com/embed/album/${currentRecord?.spotifyId}?utm_source=generator`}
                  width="100%"
                  height="100%"
                  frameBorder="0"
                  allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                />
              </div>
              <div className="same_artist">
                <h2>От того же исполнителя:</h2>
              </div>
              <div className="same_artist">
                <h2>От того же исполнителя:</h2>
              </div>
              <div>
                <h2>У других продавцов:</h2>
              </div>
              <div>
                <h2>Комментарии</h2>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RecordPage;
