import { useState } from "react"
import { NewEntry } from "../services/JournalServices"

const JournalEntry = () => {

	const [journalEntry, setjournalEntry] = useState({
    date: '',
    title: '',
    content: '',
		userId: localStorage.getItem('hero-id')
  })

  const handleChange = (e) => {
    setjournalEntry({ ...journalEntry, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await NewEntry({
      date: journalEntry.date,
      title: journalEntry.title,
      content: journalEntry.content,
      userId: localStorage.getItem('hero-id')
    })
    setjournalEntry({
      date: '',
      title: '',
      content: '',
			userId: localStorage.getItem('hero-id')
    })
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


	return (
		<div>
		<form onSubmit={handleSubmit}>
			<div className="button-wrapper">
				<button type="reset" onClick={()=>handleClear()}>clear</button>
				<button type="submit">submit</button>
			</div>
			<div classdate="input-wrapper">
				<label>date</label>
				<input
          onChange={handleChange}
          name="date"
          type="text"
          placeholder="date"
          value={journalEntry.date}
          required
        />
      </div>
      <div classdate="input-wrapper">
        <label>title</label>
        <input
          onChange={handleChange}
          name="title"
          type="text"
          placeholder="title"
          value={journalEntry.title}
          required
        />
      </div>
      <div classdate="input-wrapper">
        <label>content</label>
        <textarea
					className="journal-body"
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