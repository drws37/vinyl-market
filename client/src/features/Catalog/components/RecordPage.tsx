/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useAppDispatch, type RootState } from '../../../store/store';
import { recordRemove, recordUpdate, recordsLoad } from '../recordsSlice';
import '../styles/recordsPage.scss';
import type { Song } from '../type';
import { songsAdd } from '../songsSlice';
import { shopLoad } from '../shopSlice';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function RecordPage(): JSX.Element {
  const { recordId } = useParams();
  const records = useSelector((store: RootState) => store.records.records);
  const currentRecord = recordId ? records.find((record) => record.id === +recordId) : undefined;  
  console.log(currentRecord, 'CURRENT RECORD');

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

  useEffect(() => {
    dispatch(recordsLoad()).catch(console.log);
  }, []);

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
      console.log(resPrices, 'RES PRICES');
      const resDates = currentRecord?.RecordPrices.map((item) => item?.createdAt.slice(0, 10));
      const sortedDates = resDates.sort((a, b) => a.localeCompare(b));
      console.log(resDates, 'RES DATES');
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

  const options = {
    plugins: {
      legend: true,
      tooltip: {
        label: 'Цена',
      },
    },
  };

  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song>({
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
    }));

    dispatch(songsAdd({ songs: formattedSongs })).catch(console.log);
  };

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
                  <div className='songs'>
                    <h4>Трек-лист</h4>
                    {currentRecord.Songs.map((song, index) => (
                    <p key={index}>{`${index + 1}: ${song.title}, ${song.duration}`}</p>
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
              </div>
              <div className="chart">
                <h3>Изменение цены</h3>
                <Line data={chartData} options={options} />
              </div>
              <div className="same_records">
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
