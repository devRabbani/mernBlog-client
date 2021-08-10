import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Nav from './nav'
import { authinticate, getUser } from './helper'
import { withRouter } from 'react-router-dom'

const Login = ({ history }) => {
  const [state, setState] = useState({
    name: '',
    password: '',
  })

  const { name, password } = state

  const handleChange = (e) => {
    const { value, name } = e.target
    setState({
      ...state,
      [name]: value,
    })
  }

  const handleSubmit = (e) => {
    const { name, password } = state
    e.preventDefault()

    axios
      .post(`${process.env.REACT_APP_API}/login`, {
        name,
        password,
      })
      .then((res) => {
        authinticate(res, () => history.push('/create'))
      })
      .catch((error) => {
        alert(error.response.data.error)
      })
  }

  useEffect(() => {
    getUser() && history.push('/')
  }, [])

  return (
    <div className='container pb-5'>
      <Nav />
      <br />
      <h1>LOGIN</h1>
      <br />
      <form>
        <div className='form-group'>
          <label className='text-muted'>Name</label>
          <input
            onChange={handleChange}
            value={name}
            type='text'
            name='name'
            placeholder='Enter Name'
            required
            className='form-control'
          />
        </div>
        <div className='form-group'>
          <label className='text-muted'>Password</label>
          <input
            type='password'
            onChange={handleChange}
            value={password}
            name='password'
            placeholder='Enter password'
            required
            className='form-control'
          />
        </div>

        <div>
          <button className='btn btn-primary' onClick={handleSubmit}>
            Signin
          </button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Login)