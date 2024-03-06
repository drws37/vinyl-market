/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
// @ts-check
import type { ChartOptions } from 'chart.js';
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement, // x axis
  LinearScale, // y axis
  PointElement,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../../store/store';
import { recordRemove, recordUpdate } from '../recordsSlice';
import { songsAdd, songsDelete, songsLoad } from '../songsSlice';
import '../styles/recordsPage.scss';
import type { Song, SongId, SongWithoutUser } from '../type';
import RecordPageSameItem from './RecordPageSameItem';


ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function RecordPage(): JSX.Element {
  const { recordId } = useParams();
  const user = useSelector((store: RootState) => store.auth.user)
  console.log(user?.id, '-----user-----');
  
  console.log(user, '------0--------0--------');
 
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
  const navigate = useNavigate();

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

  const onHandleDelete = (): void => {
    dispatch(recordRemove(currentRecord?.id)).catch(console.log);
    navigate('/');
  };

  function getAlbumData(): [number[], string[]] | [] {
    if (currentRecord) {
      const resPrices = currentRecord?.RecordPrices.map((item) => item?.price);
      const resDates = currentRecord?.RecordPrices.map((item) => item?.createdAt.slice(0, 10));
      const sortedDates = resDates.sort((a, b) => a.localeCompare(b));
      return [resPrices, sortedDates];
    }
    return [];
  }

  // ChartJS
  const chartData = {
    labels: getAlbumData()[1],
    datasets: [
      {
        labels: 'Месяц',
        data: getAlbumData()[0],
        backgroundColor: '#242424',
        borderColor: 'pink',
        pointBorderColor: '#242424',
        tension: 0.3,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const [songs, setSongs] = useState<SongWithoutUser[]>([]);
  const [currentSong, setCurrentSong] = useState<SongWithoutUser>({
    id: 0,
    songTitle: '',
    duration: '',
    record_id: 0,
  });

  const handleInputChange = (key: string, value: string): void => {
    setCurrentSong((prevSong) => ({ ...prevSong, [key]: value }));
  };

  const addSong = (): void => {
    setSongs((prevSongs) => [...prevSongs, currentSong]);
    setCurrentSong({ id: 0, songTitle: '', duration: '', record_id: 0 });
  };

  const removeSong = (index: number): void => {
    setSongs((prevSongs) => prevSongs.filter((_, i) => i !== index));
  };

  const addAllSongs = (): void => {
    const formattedSongs = songs.map((song) => ({
      songTitle: song.songTitle,
      duration: song.duration,
      record_id: currentRecord?.id || 0,
      user_id: currentRecord?.user_id
    }));

    dispatch(songsAdd({ songs: formattedSongs })).catch(console.log);
  };

  const sameRecords = records.filter((item) =>
    item.id !== currentRecord?.id && item.title === currentRecord?.title ? item : '',
  );
  const sameArtist = records.filter((item) =>
    item.id !== currentRecord?.id && item.artist === currentRecord?.artist ? item : '',
  );

  const allSongs = useSelector((store: RootState) => store.songs.songs);
  const currentSongs = allSongs.filter((song) => song.record_id === currentRecord?.id); 

  const deleteSong = (id: SongId): void=> {
    dispatch(songsDelete(id)).catch(console.log)
  }

  return (
    <div>
      {currentRecord && (
        <>
        {(user?.role === 'admin' || user?.role === 'seller' && user.id === currentRecord.user_id) && (
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
              <input value={price} placeholder="price" onChange={(e) => setPrice(e.target.value)} />
              <input placeholder="img" type="file" onChange={(e) => setImg(e.target.files)} />
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
              <button className="button__update" type="submit">
                Изменить
              </button>
              <button onClick={onHandleDelete} className="button__delete" type="button">
                Удалить
              </button>
            </form>
          </div>
          <div>
            <input
              value={currentSong.songTitle}
              placeholder="songTitle"
              required
              onChange={(e) => handleInputChange('songTitle', e.target.value)}
            />
            <input
              value={currentSong.duration}
              placeholder="duration"
              required
              onChange={(e) => handleInputChange('duration', e.target.value)}
            />
            <button type="button" onClick={addSong}>
              Добавить еще одну песню
            </button>

            {songs?.map((song, index) => (
              <div key={index}>
                <p>
                  {`Песня ${index + 1}: ${song.songTitle}, ${song.duration}`}
                  <button type="button" onClick={() => removeSong(index)}>
                    Удалить
                  </button>
                </p>
              </div>
            ))}

            <button type="button" onClick={addAllSongs}>
              Добавить все песни
            </button>
          </div>
          </>
        )}
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
                  <Link to={`/magazine/${currentRecord?.user_id}`}>Перейти в магазин</Link>
                  <div className="songs">
                    <h4>Трек-лист</h4>
                      {currentSongs.map((song, index) => (
                        <div style={{display: 'flex'}}>
                       <p key={index}>{`${index + 1}: ${song.songTitle}, ${song.duration}`}</p>
                       {(user?.id === song.user_id || user?.role === 'admin') && (
                        <>
                         <button onClick={() => deleteSong(song.id)} type='button'>Удалить</button>
                         <button type='button'>Изменить</button>
                         </>
                       )}
                       </div>
                      ))}
                    </div>
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
                {sameArtist?.map((record) => (
                  <RecordPageSameItem key={record.id} sameRecord={record} />
                ))}
              </div>
              <div className="chart">
                <h3>Изменение цены</h3>
                <Line data={chartData} options={options} />
              </div>
              <div className="same_records">
                <h2>Похожие товары:</h2>
                {sameRecords?.map((record) => (
                  <RecordPageSameItem key={record.id} sameRecord={record} />
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default RecordPage;
