import { useState } from "react";
import { NewEntry, EditEntry } from "../services/JournalServices"
import IconButton from '@mui/material/IconButton'
import SendIcon from '@mui/icons-material/Send'
import BackspaceIcon from '@mui/icons-material/Backspace'
import TextField from '@mui/material/TextField'
import moment from 'moment'
import '../styles/App.css'

const JournalEntry = ({ edit, targetEntry, journalEntry, setjournalEntry, setParentChange }) => {

  //INPUT HANDLERS

  //Replaces empty inputs with selected entry values on edit
  const handleChange = (e) => {
    if (edit) {
			setjournalEntry({ ...targetEntry, [e.target.name]: e.target.value})
		} else {
			setjournalEntry({ ...journalEntry, [e.target.name]: e.target.value })
		}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
		if (edit) {
			await EditEntry(targetEntry.id, {
				date: date,
				title: journalEntry.title,
				content: journalEntry.content,
				userId: localStorage.getItem('hero-id')
			})
		} else if (!edit) {
			await NewEntry({
				date: date,
				title: journalEntry.title,
				content: journalEntry.content,
				userId: localStorage.getItem('hero-id')
			})
		}
    setjournalEntry({
      date: '',
      title: '',
      content: '',
			userId: localStorage.getItem('hero-id')
    })
		setParentChange(true)
    console.log(journalEntry)
  }

	const handleClear = () => {
		setjournalEntry({
			date: '',
      title: '',
      content: '',
			userId: localStorage.getItem('hero-id')
		})
	}
  //---------------------------------------*

  const classes = { root: 'formInput' }
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"))

 // handles when user changes input in date inputfield
  const handleChangeDate = (e) => {
    setDate(e.target.value)
  }

	return (
		<div>
		<form className="j-form">
			<div className="button-wrapper j-button">
        <IconButton 
						onClick={()=>handleClear()}>
          <BackspaceIcon className="mui-icon"></BackspaceIcon>
        </IconButton>
				<IconButton
            onClick={(e)=>handleSubmit(e)}>
          <SendIcon className="mui-icon"></SendIcon>
        </IconButton>
			</div>
			<div className="input-wrapper j-date">
        <TextField
          onChange={handleChangeDate}
          classes={classes}
          id="date"
          variant="outlined"
          type="date"
          value={date}
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true
          }}
        />
      </div>
      <div className="j-title">
        <input
          onChange={handleChange}
          className="entry-name"
          name="title"
          type="text"
          placeholder="title"
          value={journalEntry.title}
          required
        />
      </div>
      <div className="input-wrapper j-body">
        <textarea
					className="entry-body"
          onChange={handleChange}
          type="content"
          name="content"
          placeholder='********'
          value={journalEntry.content}
          required
        />
      </div>
		</form>
		</div>
	)
}

export default JournalEntry