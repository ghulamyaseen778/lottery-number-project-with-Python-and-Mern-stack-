import axios from 'axios'
import React, { useEffect, useState } from 'react'

const App = () => {
  const [takeInput, setTakeInput] = useState("")
  const [takeData, setTakeData] = useState([])
  const [data, setData] = useState([])
  const [date, setDate] = useState("")
  useEffect(() => {
    axios.get("http://localhost:5500/")
      .then(response => setTakeData(response.data.data))
      .catch(error => console.log(error))
  }, [])
  const onSubmit = (e) => {
    e.preventDefault()
    for (let i = 0; i < takeData?.length; i++) {
      const element = takeData[i];
      if (String(takeInput).trim() == element.number) {
        const obj = {
          ...element,
          bool: true
        }
        setData([obj, ...data])
        setTakeInput("")
        return
      }
    }
    if (String(takeInput).trim() != "") {
      setData([{
        id: null,
        number: String(takeInput),
        year: date.split(" ")[3],
        status: date.split(" ")[1],
        paper: null,
        bool: false
      }, ...data])
    }
    console.log(takeInput)
  }
  setInterval(() => {
    setDate(String(new Date))
  }, 1000)
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name='NumberField'
          type="number"
          value={takeInput}
          onChange={(e) => setTakeInput(e.target.value)}
          autoFocus
        />
        <input
          type="submit" />
      </form>
      {/* <h3>Chance</h3> */}
      <h3>{date}</h3>
      <table
        border={"2px"}>
        <tr>
          <th>Sno.</th>
          <th>ID</th>
          <th>Number</th>
          <th>Year</th>
          <th>Month</th>
          <th>Chance</th>
          <th>Price</th>
        </tr>
        {
          data?.map((e, ind) => {
            return (
              <tr
                key={ind}>
                <td>{ind + 1}</td>
                <td>{e.id}</td>
                <td>{e.number}</td>
                <td>{e.year}</td>
                <td>{e.status}</td>
                <td
                  style={e.bool ? { color: "green" } : { color: "red" }}>
                  {e.bool ? "Yes" : "No"}</td>
                <td>{e.paper}</td>
              </tr>
            )
          })
        }
      </table>
    </>
  )
}

export default App