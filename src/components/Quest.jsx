
import { NewQuest, EditQuest } from "../services/QuestServices"
import { useState } from "react"

const Quest = ({ edit, targetQuest, questEntry, setQuestEntry, setParentChange }) => {

  const [selectedIcon, setSelectedIcon] = useState('https://i.imgur.com/hpS4yRI.png')
  const [skillAff, setSkillAff] = useState('con')
  const [questType, setQuestType] = useState('task')

  const handleChange = (e) => {
    if (edit) {
			setQuestEntry({ ...targetQuest, [e.target.name]: e.target.value})
		} else {
			setQuestEntry({ ...questEntry, [e.target.name]: e.target.value })
		}
  }

  const handleIcon = (e) => {
    setSelectedIcon(e.target.value)
  }

  const handleSkill = (e) => {
    setSkillAff(e.target.value)
  }

  const handleType = (e) => {
    setQuestType(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
		if (edit) {
			await EditQuest(targetQuest.id, {
				name: questEntry.name,
				desc: questEntry.desc,
				skillAffinity: skillAff,
				type: questType,
				icon: selectedIcon,
				userId: localStorage.getItem('hero-id')
			})
		} else if (!edit) {
			await NewQuest({
				name: questEntry.name,
				desc: questEntry.desc,
				skillAffinity: skillAff,
				type: questType,
				icon: selectedIcon,
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
        <select 
          onChange={handleSkill}
          defaultValue='con'>
            <option value='con'>constitution</option>
            <option value='str'>strength</option>
            <option value='dex'>dexterity</option>
            <option value='int'>intelligence</option>
            <option value='wis'>wisdom</option>
            <option value='cha'>charisma</option>
          </select>
      </div>
      <div className="input-wrapper">
        <label>type</label>
        <select 
          onChange={handleType}
          defaultValue='task'>
            <option value='primary'>primary</option>
            <option value='secondary'>secondary</option>
            <option value='task'>task</option>
          </select>
      </div>
			<div className="input-wrapper">
        <label>icon</label>
          <select 
          onChange={handleIcon}
          defaultValue=''>
            <option value='https://i.imgur.com/hpS4yRI.png'>star</option>
            <option value='https://i.imgur.com/7w3K5Nw.png'>potion</option>
            <option value='https://i.imgur.com/hxuwLMH.png'>dice</option>
            <option value='https://i.imgur.com/ggxcECj.png'>cat</option>
            <option value='https://i.imgur.com/efIKOxV.png'>heart</option>
            <option value='https://i.imgur.com/5cKJjkB.png'>rook</option>
            <option value='https://i.imgur.com/M7Zb2Q3.png'>treasure</option>
          </select>
      </div>
		</form>
		</div>
	)
}

export default Quest