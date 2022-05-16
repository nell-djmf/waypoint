import { useState } from 'react'
import { SignInUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'

const Signin = (props) => {

  let navigate = useNavigate()

  
  const [formValues, setFormValues] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({
      email: '',
      password: ''
    })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    localStorage.setItem('hero', payload.email)
    localStorage.setItem('hero-id', payload.id)
    navigate('/user_profile')
  }


  return (
    <div className="signin-wrapper">
      <img className='logo-icon' src='https://i.imgur.com/SOJ050x.png' alt='logo'/>
			<h3 className='title'>SignIn</h3>
      <div className="signin-form">
        <form className="form">
          <div className="input-wrapper">
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
            <input
              onChange={handleChange}
              type="password"
              name="password"
              placeholder='Password'
              value={formValues.password}
              required
            />
          </div>
            <Button variant="contained" component="span" size='small' disabled={!formValues.email || !formValues.password}
            onClick={(e)=> handleSubmit(e)}
            style={{
              borderRadius: "5px",
              backgroundColor: "#5fa7cd",
              marginLeft: "10px",
              marginTop: "5px"
            }}
            >Sign In
            </Button>
        </form>
      </div>
    </div>
  )
}

export default Signin
