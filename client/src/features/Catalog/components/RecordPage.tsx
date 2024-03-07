/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-floating-promises */
// @ts-check
import type { ChartOptions } from 'chart.js';
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, type RootState } from '../../../store/store';
import { fetchOrderAdd } from '../api';
import { favoriteAdd } from '../favoriteSlice';
import { recordRemove, recordUpdate } from '../recordsSlice';
import { songsAdd, songsDelete } from '../songsSlice';
import '../styles/recordsPage.scss';
import type { SongId, SongWithoutUser } from '../type';
import RecordPageSameItem from './RecordPageSameItem';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

function RecordPage(): JSX.Element {
  const { recordId } = useParams();
  const user = useSelector((store: RootState) => store.auth.user);

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
      user_id: currentRecord?.user_id,
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

  const deleteSong = (id: SongId): void => {
    dispatch(songsDelete(id)).catch(console.log);
  };

  const AddItemInOrder = async (): Promise<void> => {
    await fetchOrderAdd({ status: 'Корзина', id: currentRecord?.id }).catch(console.log);
  };

  const AddFavoritre = async (id: number): Promise<void> => {
    dispatch(favoriteAdd(id)).catch(console.log);
  };

  return (
    <div>
      {currentRecord && (
        <>
          {(user?.role === 'admin' ||
            (user?.role === 'seller' && user.id === currentRecord.user_id)) && (
            <>
              <div className="update__form__container">
                <form className="update__form" onSubmit={updateRecordFetch}>
                  <input
                  className='input-order'
                    value={title}
                    placeholder="Название"
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <input
                  required
                  className='input-order'

                    value={artist}
                    placeholder="Артист"
                    onChange={(e) => setArtist(e.target.value)}
                  />
                  <input
                  required
                  className='input-order'

                    value={description}
                    placeholder="Описание"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <input
                  required
                  className='input-order'

                    value={price}
                    placeholder="Цена"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <input
                  className='input-order'
                  required placeholder="img" type="file" onChange={(e) => setImg(e.target.files)} />
                  <select
                  className='input-order'
                  required   value={quality} onChange={(e) => setQuality(e.target.value)}>
                    <option  value="Empty">Не выбрано</option>
                    <option value="Mint">Mint</option>
                    <option value="Near Mint">Near mint</option>
                    <option value="Very Good">Very good</option>
                    <option value="Good">Good</option>
                    <option value="Fair">Fair</option>
                    <option value="Poor">Poor</option>
                    <option value="Bad">Bad</option>
                  </select>
                  <button className="button1" type="submit">
                    Изменить
                  </button>
                  <button onClick={onHandleDelete} className="button1 deletee" type="button">
                    Удалить
                  </button>
                </form>
              </div>
              <div>
                <input
                  value={currentSong.songTitle}
                  className='input-order'

                  placeholder="Название трека"
                  required
                  onChange={(e) => handleInputChange('songTitle', e.target.value)}
                />
                <input
                  value={currentSong.duration}
                  className='input-order'

                  placeholder="Длительность трека"
                  required
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                />
                <button  type="button" className='button1' onClick={addSong}>
                  Добавить еще одну песню
                </button>

                {songs?.map((song, index) => (
                  <div key={index}>
                    <p>
                      {`Песня ${index + 1}: ${song.songTitle}, ${song.duration}`}
                      <button type="button" className='button1' onClick={() => removeSong(index)}>
                        Удалить
                      </button>
                    </p>
                  </div>
                ))}

                <button type="button" className='button1 add-song' onClick={addAllSongs}>
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
                  <div>
                    {user?.role === 'buyer' && (
                      <>
                        <button
                          style={{ border: 'none', background: 'white' }}
                          type="button"
                          onClick={() => {
                            AddFavoritre(currentRecord?.id);
                          }}
                          className="btn__favorite"
                        >
                          <svg
                            width="30px"
                            height="30px"
                            className="svg-favorite"
                            fill='none'
                            viewBox="0 0 64 64"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="img"
                            preserveAspectRatio="xMidYMid meet"
                          >
                            <path
                              d="M46.1 2C39.8 2 34.5 5.6 32 10.8C29.5 5.6 24.2 2 17.9 2C9.2 2 2 9.4 2 17.9C2 32.4 32 62 32 62s30-29.6 30-44.1C62 9.4 54.8 2 46.1 2z"
                              fill="#ff5a79"
                            />
                          </svg>
                        </button>
                        <button
                          style={{ border: 'none', background: 'white' }}
                          type="button"
                          className="btn__cart"
                          onClick={AddItemInOrder}
                        >
                          <svg
                            width="30px"
                            height="30px"
                            viewBox="0 0 24 24"
                            className='svg-order'
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M3.5 4.5H5.05848C5.7542 4.5 6.10206 4.5 6.36395 4.68876C6.62584 4.87752 6.73584 5.20753 6.95585 5.86754L7.5 7.5"
                              stroke="#222222"
                              strokeLinecap="round"
                            />
                            <path
                              d="M17.5 17.5H8.05091C7.90471 17.5 7.83162 17.5 7.77616 17.4938C7.18857 17.428 6.78605 16.8695 6.90945 16.2913C6.92109 16.2367 6.94421 16.1674 6.99044 16.0287V16.0287C7.04177 15.8747 7.06743 15.7977 7.09579 15.7298C7.38607 15.0342 8.04277 14.5608 8.79448 14.5054C8.8679 14.5 8.94906 14.5 9.11137 14.5H14.5"
                              stroke="#222222"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M14.1787 14.5H11.1376C9.85836 14.5 9.21875 14.5 8.71781 14.1697C8.21687 13.8394 7.96492 13.2515 7.461 12.0757L7.29218 11.6818C6.48269 9.79294 6.07794 8.84853 6.52255 8.17426C6.96715 7.5 7.99464 7.5 10.0496 7.5H15.3305C17.6295 7.5 18.779 7.5 19.2126 8.24711C19.6462 8.99422 19.0758 9.99229 17.9352 11.9884L17.6517 12.4846C17.0897 13.4679 16.8088 13.9596 16.3432 14.2298C15.8776 14.5 15.3113 14.5 14.1787 14.5Z"
                              stroke="#222222"
                              strokeLinecap="round"
                            />
                            <circle cx="17" cy="20" r="1" fill="#222222" />
                            <circle cx="9" cy="20" r="1" fill="#222222" />
                          </svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <Link className="button-shop" to={`/magazine/${currentRecord?.user_id}`}>
                  Перейти в магазин
                </Link>
                <p>Описание: {currentRecord.description}</p>

                <div className="songs">
                  {currentSongs.length > 0 && (
                    <>
                      <h4>Трек-лист</h4>
                      {currentSongs.map((song, index) => (
                        <div style={{ display: 'flex' }}>
                          <p key={index}>{`${index + 1}: ${song.songTitle}, ${song.duration}`}</p>
                          {(user?.id === song.user_id || user?.role === 'admin') && (
                            <button onClick={() => deleteSong(song.id)} type="button">
                              Удалить
                            </button>
                          )}
                        </div>
                      ))}
                    </>
                  )}
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
