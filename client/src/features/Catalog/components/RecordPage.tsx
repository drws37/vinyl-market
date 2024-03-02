/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, type RootState } from '../../../store/store';
import { recordUpdate } from '../recordsSlice';

function RecordPage(): JSX.Element {
  const { recordId } = useParams();
  const records = useSelector((store: RootState) => store.records.records);
  const currentRecord = recordId ? records.find((record) => record.id === +recordId) : undefined;

  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [description, setDescription] = useState('');
  const [img, setImg] = useState<FileList | null | undefined>(null);
  const [price, setPrice] = useState('');
  const [quality, setQuality] = useState('');

  const dispatch = useAppDispatch();

  const updateRecordFetch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const imgFile = img?.[0];
    const formData = new FormData();
    formData.append('title', title);
    formData.append('artist', artist);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('img', imgFile !== null && imgFile !== undefined ? imgFile : '');
    formData.append('quality', quality);
    const data = {
      id: currentRecord?.id,
      obj: formData,
    };
    dispatch(recordUpdate(data)).catch(console.log);
  };

  return (
    <div>
      {currentRecord && (
        <>
          <div className="update__form__container">
            <form className="update__form" onSubmit={updateRecordFetch}>
              <input
                defaultValue={currentRecord?.title}
                value={title}
                placeholder="title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                defaultValue={currentRecord?.artist}
                value={artist}
                placeholder="artist"
                onChange={(e) => setArtist(e.target.value)}
              />
              <input
                defaultValue={currentRecord?.description}
                value={description}
                placeholder="description"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                defaultValue={currentRecord?.price}
                value={price}
                placeholder="price"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input placeholder="img" type="file" onChange={(e) => setImg(e.target.files)} />
              <select
                defaultValue={currentRecord?.quality}
                value={quality}
                onChange={(e) => setQuality(e.target.value)}
              >
                <option value="empty">Не выбрано</option>
                <option value="mint">Mint</option>
                <option value="near-mint">Near mint</option>
                <option value="very-good">Very good</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
                <option value="poor">Poor</option>
                <option value="bad">Bad</option>
              </select>
              <button type="submit">Изменить</button>
            </form>
          </div>
          <div className="record-page_main">
            <div className="record-card_main">
              <div className="record-card_img">
                <img src={currentRecord?.img} alt="" />
              </div>
              <div className="record-card_info">{currentRecord?.artist}</div>
            </div>
          </div>
          <div className="records-page_same-artist">
            <iframe
              title={currentRecord.title}
              style={{ borderRadius: '12px' }}
              src={`https://open.spotify.com/embed/album/${currentRecord?.spotifyId}?utm_source=generator`}
              width="50%"
              height="500"
              frameBorder="0"
              allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default RecordPage;
