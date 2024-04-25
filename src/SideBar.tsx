import * as React from 'react';
import Box from '@mui/material/Box';

import Modal from '@mui/material/Modal';
import "./sidebar.css"

import { toast } from 'sonner';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "50%",
    borderRadius: "5px",
    bgcolor: 'background.paper',
  
    padding: 4,
};

export default function BasicModal(props: any) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setCurrentColor(null);
        setGroupName(null);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);
    const [currentColor, setCurrentColor] = React.useState<any>(null)
    const [groupName, setGroupName] = React.useState<string | null>(null)

    const colors = ["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"]

    const handleCreate = () => {
        if (!currentColor) { toast.error("Select Color") }
        if (!groupName) { toast.error("Enter Group Name") }
        if (currentColor && groupName) {
            let a = JSON.parse(JSON.stringify(props.notesData))
            let data = { name: groupName, color: currentColor, notes: [] }
            a?.push(data)
            localStorage.setItem('notesData', JSON.stringify(a))
            props.setNotesData(a)
            setOpen(false)
            setCurrentColor(null)
            setGroupName(null)
        }
    }

    return (

        <div
            className={props.currentNotesId == -1 ? "sideBar" : "sideBar mainContentMobile"}        
        >
            <p className='text-2xl font-medium text-center mt-10 font-sans cursor-pointer' onClick={() => { props.setCurrentNotesId("Home") }}>Pocket Notes</p>


            <ul className='listContainer overflow-y-scroll no-scrollbar h-full'>
                {props.notesData?.map?.((x: any, index: number) => <li className='listNotes' key={x.name} onClick={() => { props.setCurrentNotesId(index) }}>
                    <div style={{ backgroundColor: x.color }} className='rounded-full  w-12 h-12 text-center pt-2 text-xl font-bold font-sans text-white'>
                        {(x.name[0] + x.name[1]).toString().toUpperCase()}
                    </div>
                    &nbsp;&nbsp;
                    <div className='font-medium  ' style={{ marginTop: "12px" }}>{x.name}</div>
                </li>)}
                <button style={{ backgroundColor: "#16008B" }} className=' text-3xl  absolute rounded-full bg-red-500 w-12 h-12  pb-2 text-center   font-bold font-sans text-white bottom-3 right-5' onClick={handleOpen}>+</button>
            </ul>



            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"

            >
                <Box sx={style}>


                    <label className='modalHeading'>  Create New Group </label><br />
                    <label className='modalHeading'>  Group Name </label> <input value={groupName ? groupName : ""} style={{ width: "70%", height: "30px" }} type="text" onChange={(e) => setGroupName(e.target.value)} className='groupNameInput' />
                    <br></br>
                    <div style={{ display: "flex" }}> <label className='modalHeading'>   Choose Color</label>

                        <div style={{ display: "flex", justifyContent: "space-between", width: "50%", padding: "10px" }}> {colors.map((color) => <button
                            key={color}
                            style={{ backgroundColor: color, width: "30px", height: "30px", borderRadius: "30px" }}
                            onClick={() => setCurrentColor(color)}
                            className={currentColor == color ? "selectedColor" : ""}
                        ></button>)}
                        </div>

                    </div>

                    <div style={{ display: "flex", justifyContent: "right", padding: 10 }}>  <button className='createButton' onClick={handleCreate}>Create</button></div>
                </Box>
            </Modal>
        </div>
    );
}