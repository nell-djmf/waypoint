
import { NewQuest, EditQuest } from "../services/QuestServices"

const Quest = ({ edit, targetQuest, questEntry, setQuestEntry, setParentChange }) => {

  const handleChange = (e) => {
    if (edit) {
			setQuestEntry({ ...targetQuest, [e.target.name]: e.target.value})
		} else {
			setQuestEntry({ ...questEntry, [e.target.name]: e.target.value })
		}
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
		if (edit) {
			await EditQuest(targetQuest.id, {
				name: questEntry.name,
				desc: questEntry.desc,
				skillAffinity: questEntry.skillAffinity,
				type: questEntry.type,
				icon: questEntry.icon,
				userId: localStorage.getItem('hero-id')
			})
		} else if (!edit) {
			await NewQuest({
				name: questEntry.name,
				desc: questEntry.desc,
				skillAffinity: questEntry.skillAffinity,
				type: questEntry.type,
				icon: questEntry.icon,
				userId: localStorage.getItem('hero-id')
			})
		}
    setQuestEntry({
      name: '',
      desc: '',
      skillAffinity: '',
			type: '',
			icon: '',
			userId: localStorage.getItem('hero-id')
    })
		setParentChange(true)
    console.log(questEntry)
  }

	const handleClear = () => {
		setQuestEntry({
			name: '',
      desc: '',
      skillAffinity: '',
			type: '',
			icon: '',
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
			<div className="input-wrapper">
				<label>name</label>
				<input
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="name"
          value={questEntry.name}
          required
        />
      </div>
      <div className="input-wrapper">
        <label>desc</label>
        <textarea
          onChange={handleChange}
					className="journal-body"
          name="desc"
          type="text"
          placeholder="desc"
          value={questEntry.desc}
          required
        />
      </div>
			<div className="input-wrapper">
        <label>skill affinity</label>
        <input
          onChange={handleChange}
          name="skillAffinity"
          type="text"
          placeholder="skill"
          value={questEntry.skillAffinity}
          required
        />
      </div>
      <div className="input-wrapper">
        <label>type</label>
        <input
          onChange={handleChange}
          type="text"
          name="type"
          placeholder='type'
          value={questEntry.type}
          required
        />
      </div>
			<div className="input-wrapper">
        <label>icon</label>
        <input
          onChange={handleChange}
          type="text"
          name="icon"
          placeholder='icon.url'
          value={questEntry.icon}
          required
        />
      </div>
		</form>
		</div>
	)
}

export default Quest