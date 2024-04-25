import React, { useState } from 'react'
import mainImage from "./assets/pocketNotesmain.svg"
import lockImage from "./assets/lock.svg"
import rightArrow from "./assets/rightArrow.svg"
import rightArrowInactive from "./assets/rightArrowInactive.svg"
import backArrow from "./assets/backArrow.svg"
const MainContent = (props: any) => {
    const [newMessage, setNewMessage] = useState<string>("")

    const handleCreate = () => {
        const date = new Date();


        const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
        const timeOptions: Intl.DateTimeFormatOptions = {
            hour: 'numeric',  // Display the hour as a number
            minute: 'numeric',
            hour12: true,      // Use 12-hour format (AM/PM)
        };
        const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(date);


        if (newMessage.length > 0) {
            let a = JSON.parse(JSON.stringify(props.notesData))
            a[props.currentNotesId].notes ? a[props.currentNotesId].notes.push({ message: newMessage, date: formattedDate, time: formattedTime }) : a[props.currentNotesId].notes = [newMessage]

            localStorage.setItem('notesData', JSON.stringify(a))
            props.setNotesData(a)
            setNewMessage("")
        }
    }
    return (
        <div className={props.currentNotesId == -1 ? "mainContent mainContentMobile" : " mainContent mainContentWeb"}
        //  style={{ display: props.currentNotesId == -1 ? "none" : "inline", backgroundColor: "#DAE5F5" }} 

        >

            {!props.data ? < ><img src={mainImage} className='h-1/2 w-1/2 m-auto' alt="lockImage" />
                <p className='text-5xl text-center font-bold'>Pocket Notes</p>
                <p className='text-center font-bold'>Send and receive messages without keeping your phone online. <br />Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>

                <div className='basis-1/2 relative'>
                    <div className='absolute bottom-5 w-full flex justify-center'>
                        <img src={lockImage} alt="LockImage" /> &nbsp; end-to-end encrypted</div>
                </div>
            </> : <>
                <div className='basis-3/4 notesContainer relative'>
                    <div className='headBar'>
                        <button className="showDiv" onClick={() => props.setCurrentNotesId(-1)}><img src={backArrow} /></button>
                        <div
                            style={{ backgroundColor: props.data.color }}
                            className='rounded-full  w-12 h-12 text-left pt-2 pl-3 text-xl font-bold font-sans text-white'
                        >
                            {(props.data.name[0] + props.data.name[1]).toString().toUpperCase()}
                        </div>
                        &nbsp;&nbsp;

                        <div className='font-bold font-sans pt-3 text-white'>
                            <p>  {props.data.name}</p>
                        </div>

                    </div>
                    <ul className=''>
                        {props.notesData[props.currentNotesId].notes?.map((data: any) => <li key={data.time} style={{ padding: "10px" }}>
                            <div className='notesDisplay'>
                                <div className='messageDiv'>  {data.message}</div>
                                <div className='timeDiv'>{data.date}.{data.time}</div>
                            </div>
                        </li>)}
                    </ul>
                </div>
                <div className='basis-1/4 relative'>
                    <div className='  w-full flex justify-center'>
                        <textarea
                            value={newMessage}
                            rows={5}
                            cols={130}
                            className='textBox'
                            placeholder='Enter your text here...'
                            onChange={(e) => setNewMessage(e.target.value)}

                        ></textarea>
                        <img src={newMessage.length > 0 ? rightArrow : rightArrowInactive}
                            className="rightArrow"
                            alt="rightArrow"
                            onClick={handleCreate}
                        />
                    </div>
                </div>


            </>

            }

        </div>
    )
}

export default MainContent