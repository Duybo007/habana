import React, { useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import SubHeading from '../components/SubHeading'
import { doc, getDoc, deleteDoc } from "firebase/firestore"; 
import { db } from '../components/Firebase';
import Cancel from '../components/Cancel';
import { useRouter } from 'next/router';
import Modify from '../components/Modify';

function confirm() {
    const router = useRouter()
    const codeRef = useRef(null)
    const [info, setInfo] = useState(false)
    const [notFind, setNotFind] = useState(false)
    const [code, setCode] = useState("")
    const [openCancel, setOpenCancel] = useState(false)
    const [openModify, setOpenModify] = useState(false)


    const check = async(e) => {
        e.preventDefault()
        const docRef = doc(db, "booking", `${codeRef.current.value.trim()}`)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setInfo(docSnap.data())
            
            } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            setNotFind("Reservation not found")
            }
    }
    const cancel = async(e) => {
        e.preventDefault()
        await deleteDoc(doc(db, "booking",  `${code}`));
        setOpenCancel(true)
    }
    const modify = (e) => {
        e.preventDefault()
        setOpenModify(true)
    }

    const onClose = ()=>{
        setOpenCancel(false)
        router.push('/')
    }
  return (
    <div className='app__check'>
        <img 
        className='bg-confirm-img'
        src='https://images.unsplash.com/photo-1623800330578-2cd67efaec75?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80' alt='bg-img'/>
        <Navbar/>
        { info ? (
        <div className='app__confirm section__padding'>
            <form className='app__newsletter reserve'>
                <div className='app__newsletter-heading'>
                    <SubHeading title="Table For"/>
                    <h1 className='headtext__cormorant'>{info?.name}</h1>
                </div>

                <div className='app__newsletter-input flex__center infos'>
                    <div className='rev-info'>
                        <p className='p__opensans'>Guests</p>
                        <p className='p__cormorant'>{info?.people}</p>
                    </div>

                    <div className='rev-info'>
                        <p className='p__opensans'>Date</p>
                        <p className='p__cormorant'>{info?.date}</p>
                    </div>

                    <div className='rev-info'>
                        <p className='p__opensans'>Time</p>
                        <p className='p__cormorant'>{info?.time}</p>
                    </div>
                </div>
                <div className='flex__center rev-btns'>
                    <button onClick={cancel}  className='custom__button check-btn'>Cancel Reservation</button>
                    <button onClick={modify}  className='modify'>Modify Reservation</button>
                </div>
            </form>
        </div>
        ) : (

        <div className='app__confirm section__padding'>
            <form className='app__newsletter reserve'>
            <div className='app__newsletter-heading'>
                <SubHeading title="Reservations"/>
                <h1 className='headtext__cormorant'>Check Reservation</h1>
            </div>

            <div className='app__newsletter-input flex__center confirmation'>
                <input ref={codeRef} type="text" placeholder="Your Reservation" onChange={(e) => setCode(e.target.value)}/>
            </div>
            <div className='flex__center rev-btns'>
                <button onClick={check} className='custom__button check-btn'>Check</button>
            </div>
            {notFind && (<p className='p__cormorant flex__center not-find'>{notFind}</p>)}
            </form>
        </div>)}
        <Cancel open={openCancel} onClose={onClose}/>
        <Modify code={code} open={openModify} onClose={()=>setOpenModify(false)} info={info}/>
        </div>
        
  )
}

export default confirm