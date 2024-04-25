import { useEffect, useState } from 'react'
import { Toaster } from 'sonner'
import './App.css'

import SideBar from './SideBar'
import MainContent from './mainContent';


function App() {

  const [currentNotesId, setCurrentNotesId] = useState<number>(-1)
  const [notesDetails, setNotesDetails] = useState<any>([]);
  const [notesData, setNotesData] = useState<any>([])

  useEffect(() => {
    if (localStorage.getItem('notesData')) {
      let a = localStorage.getItem('notesData')
      a && setNotesData(JSON.parse(a))
    }
    if (localStorage.getItem('notesDetails')) {
      let a = localStorage.getItem('notesDetails')
      a && setNotesDetails(JSON.parse(a))
    }
  }, [])

  return (
    <div className='lg:flex lg:flex-row  h-dvh'>
      <Toaster/>
      <SideBar
        setCurrentNotesId={setCurrentNotesId}
        setNotesData={setNotesData}
        notesData={notesData}
        currentNotesId={currentNotesId}
      />

      <MainContent
        data={notesData[currentNotesId]}
        currentNotesId={currentNotesId}
        notesData={notesData}
        setNotesData={setNotesData}
        setCurrentNotesId={setCurrentNotesId}
      />

    </div>
  )
}

export default App
