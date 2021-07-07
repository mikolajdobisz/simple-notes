import React, { useEffect, useState } from 'react'
import {v4 as uuidv4} from 'uuid'
import NotesContainer from './NotesContainer'
import NoteboardsList from './NoteboardsList'
import CircleIconButton from './CircleIconButton'
import styles from '../styles/modules/Noteboards.module.scss'

const Noteboards = ({noteboard_id}) => {

  const [noteboards, setNoteboards] = useState([]);
  const [currentNoteboard, setCurrentNoteboard] = useState(null);

  useEffect(() => {
    getNodeBoards();
  }, [])

  useEffect(() => {
    if(noteboard_id){
      const current = noteboards.find(el => el.id === noteboard_id);
      setCurrentNoteboard(current);
    }
  }, [noteboards])

  const getNodeBoards = () => {
    const currentNoteboards = localStorage.getItem("noteboards")
    if(currentNoteboards != null){
      setNoteboards(JSON.parse(currentNoteboards))
    }
  }

  const addNodeBoard = (title) => {
    const newNoteboards = [...noteboards]
    newNoteboards.push({
      id: uuidv4(),
      title: title,
      notes: []
    })
    localStorage.setItem("noteboards", JSON.stringify(newNoteboards));
    setNoteboards(newNoteboards);
  }

  return (
    <div className={styles.noteboards}>
      <NoteboardsList add={addNodeBoard} noteboards={noteboards}/>
      <NotesContainer noteboard={currentNoteboard}/>
      <div className={styles.notesControls}>
        <CircleIconButton icon="add"/>
      </div>
    </div>
  )
}

export default Noteboards
