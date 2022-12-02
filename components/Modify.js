import React, { useRef, useState } from 'react'
import {MdOutlineRestaurantMenu} from "react-icons/md"

function Modify({onClose, open}) {
  const datePickerId = new Date().toISOString().split("T")[0];
  const [people, setPeople] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")
  const peopleRef = useRef(null)
  const dateRef = useRef(null)
  const timeRef = useRef(null)
    if(!open) return null
  return (
    <div onClick={onClose} className='overlay'>
        <div onClick={(e)=>{
            e.stopPropagation()
        }} className='modalContainer'>
            <img src='https://axwwgrkdco.cloudimg.io/v7/__gmpics__/87b28e10e190462dab6104cfcc9acd5a?width=1000'/>
            <div className='modalRight'>
                <MdOutlineRestaurantMenu className='closeBtn' onClick={onClose} fontSize={27}/>
                <div className='content'>
                    <h1 className='headtext__cormorant'>Modify Reservation</h1>
                    <div className='app__newsletter-input flex__center reservation'>
                      <input ref={peopleRef} type="number" onChange={(e) => setPeople(e.target.value)} value={people} placeholder="Guests" min="1"/>
                      <input ref={dateRef} type="date" min={datePickerId} onChange={(e) => setDate(e.target.value)} value={date}/>
                      <select ref={timeRef} onChange={(e) => setTime(e.target.value)} value={time}>
                        <option  value="">Time</option>
                        <option value="6:00 PM">6:00 PM</option>
                        <option value="7:00 PM">7:00 PM</option>
                        <option value="8:00 PM">8:00 PM</option>
                        <option value="9:00 PM">9:00 PM</option>
                        <option value="10:00 PM">10:00 PM</option>
                        <option value="11:00 PM">11:00 PM</option>
                      </select>
                    </div>
                    <div className='modify-btn'>
                      <button>Modify</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Modify