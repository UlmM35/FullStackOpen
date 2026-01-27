import React, { useState, useEffect } from "react";
import axios from "axios";
import { Visibility, Weather, type DiaryEntry } from "./types";
import { createNewDiary, getAllDiaries } from "./services/diaryService";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('')
  const [visibility, setVisibility] = useState<Visibility | string>('');
  const [weather, setWeather] = useState<Weather | string>('');
  const [comment, setComment] = useState('')
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    try {
      createNewDiary({ date: date, weather: weather as Weather, visibility: visibility as Visibility, comment: comment }).then(data =>
        setDiaries(diaries.concat(data)))
        .catch(error => {
          if (axios.isAxiosError(error)) {
            setError(error.response?.data as string);
          } else {
            setError("An error  occured, try again.")
          }
        })
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data as string)
      } else {
        setError("An error occured, try again.")
      }
    }
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  return (
    <>
      <h1>Add a new entry</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={diaryCreation}>
        <div>
          date: <input type="date" value={date} onChange={(event) => setDate(event.target.value)}/>
        </div>
        <div>
          visibility 
          <input type="radio" id="great" name="great" value="great" checked={visibility === "great"} onChange={(event) => setVisibility(event.target.value)}/>
          <label htmlFor="great">great</label>
          <input type="radio" id="good" name="good" value="good" checked={visibility === "good"} onChange={(event) => setVisibility(event.target.value)}/>
          <label htmlFor="good">good</label>
          <input type="radio" id="ok" name="ok" value="ok" checked={visibility === "ok"} onChange={(event) => setVisibility(event.target.value)}/>
          <label htmlFor="ok">ok</label>
          <input type="radio" id="poor" name="poor" value="poor" checked={visibility === "poor"} onChange={(event) => setVisibility(event.target.value)}/>
          <label htmlFor="poor">poor</label>
        </div>
        <div>
          weather
          <input type="radio" id="sunny" name="sunny" value="sunny" checked={weather === "sunny"} onChange={(event) => setWeather(event.target.value)}/>
          <label htmlFor="sunny">sunny</label>
          <input type="radio" id="rainy" name="rainy" value="rainy" checked={weather === "rainy"} onChange={(event) => setWeather(event.target.value)}/>
          <label htmlFor="good">rainy</label>
          <input type="radio" id="cloudy" name="cloudy" value="cloudy" checked={weather === "cloudy"} onChange={(event) => setWeather(event.target.value)}/>
          <label htmlFor="cloudy">cloudy</label>
          <input type="radio" id="stormy" name="stormy" value="stormy" checked={weather === "stormy"} onChange={(event) => setWeather(event.target.value)}/>
          <label htmlFor="stormy">stormy</label>
          <input type="radio" id="windy" name="windy" value="windy" checked={weather === "windy"} onChange={(event) => setWeather(event.target.value)}/>
          <label htmlFor="windy">windy</label>
        </div>
        <div>
          comment: <input value={comment} onChange={(event) => setComment(event.target.value)}/>
        </div>
        <button type='submit'>add</button>
      </form>
      <h1>Diary entries</h1>
      {diaries.map(d => (
        <div key={d.id}>
          <h2>{d.date}</h2>
          <div>visibility: {d.visibility}</div>
          <div>weather: {d.weather}</div>
        </div>
      ))}
    </>
  )
}

export default App
