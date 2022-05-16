import { useState } from 'react'
import { RegisterUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  let navigate = useNavigate()
  
  const [selectedIcon, setSelectedIcon] = useState('https://i.imgur.com/OuOVYdk.png')
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    avatar: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleIcon = (e) => {
    setSelectedIcon(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      avatar: selectedIcon
    })
    setFormValues({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      avatar: ''
    })
    navigate('/signin')
    console.log(formValues)
  }

  return (
    <div className="register-wrapper">
			<h3>Register For An Account</h3>
      <div className="register-form">
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label>Username</label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              placeholder="Username"
              value={formValues.username}
              required
            />
          </div>
          <div className="input-wrapper">
            <label>Email</label>
            <input
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
              required
            />
          </div>
          <div className="input-wrapper">
            <label>Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder='********'
              value={formValues.password}
              required
            />
          </div>
          <div className="input-wrapper">
            <label>Confirm Password</label>
            <input
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder='********'
              value={formValues.confirmPassword}
              required
            />
          <div className="input-wrapper">
            <label>Avatar Link</label>
              <select 
            onChange={handleIcon}
            defaultValue='star'
            >
              <option value='https://i.imgur.com/OuOVYdk.png'>star</option>
              <option value='https://i.imgur.com/LuUhUKv.png'>pizza</option>
              <option value='https://i.imgur.com/iv5cGyH.png'>bread</option>
              <option value='https://i.imgur.com/arm7Miy.png'>ice cream</option>
              <option value='https://i.imgur.com/tUGZiL0.png'>fox</option>
              <option value='https://i.imgur.com/4EhVNi7.png'>clouds</option>
              <option value='https://i.imgur.com/7OUcihH.png'>helmet</option>
              <option value='https://i.imgur.com/L5awY2H.png'>tarot</option>
              <option value='https://i.imgur.com/09GLix6.png'>rook</option>
              <option value='https://i.imgur.com/OZQTBfQ.png'>skull heart</option>
            </select>
            <img src={selectedIcon} />
          </div>
          </div>
          <button className="button-2 button-2B"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }>
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
