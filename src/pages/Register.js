import { useState } from 'react'
import { RegisterUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  let navigate = useNavigate()
  
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      username: formValues.username,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
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
