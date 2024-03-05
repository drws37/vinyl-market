import React from 'react'
import { useSelector } from 'react-redux'
import type { RootState } from '../../../store/store'

export default function Test(): JSX.Element {

  const songs = useSelector((store: RootState) => store.songs.songs)
  console.log(songs, '214124421');
  
  return (
    <div>
      {songs.map((song) => (
        <div key={song.id}>
          <p>{song.songTitle}</p>
          <p>{song.duration}minutes</p>
        </div>
      ))}
    </div>
  )
}
