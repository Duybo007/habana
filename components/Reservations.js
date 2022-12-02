import React, {  useRef, useState } from 'react'
import SubHeading from './SubHeading'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from './Firebase';
import { useRouter } from 'next/router'

function Reservations() {
    const datePickerId = new Date().toISOString().split("T")[0];
    const peopleRef = useRef(null)
    const dateRef = useRef(null)
    const timeRef = useRef(null)
    const router = useRouter()
    const [code, setCode] = useState(null)

    const [people, setPeople] = useState("")
    const [date, setDate] = useState("")
    const [time, setTime] = useState("")


    const handleClick = async (e) => {
        e.preventDefault()
        
        try {
            const docRef = await addDoc(collection(db, "booking"), {
              people: peopleRef.current.value,
              date: dateRef.current.value,
              time: timeRef.current.value
            });
            setCode(docRef.id)
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    const check = (e) => {
        e.preventDefault()
        router.push('/confirm')
    }


  return (
    <div className='app__footer section__padding ' id='reservation'>
    <form className='app__newsletter reserve'>
        <div className='app__newsletter-heading'>
            <SubHeading title="Reservations"/>
            <h1 className='headtext__cormorant'>Book A Table</h1>
        </div>

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
        <div className='flex__center rev-btns'>
            {people !="" && date!="" && time != "" ? (
                <button onClick={handleClick} className='custom__button rev-btn'>Book Now</button>
            ) : (
                <button onClick={(e) => e.preventDefault()} className='custom__button_empty rev-btn' >Book Now</button>
            )}
            <button onClick={check} className='check rev-btn'>Check My Reservations</button>
        </div>
        {code && (
            <div className='code-num'>
            <p className='p__opensans '>Your confirmation code is: <span className='p__cormorant'>{code}</span></p>
            </div>
        )}
        
    </form>
    </div>
  )
}

export default Reservations