import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import api from '../../services/api'

export default function Login () {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('userLogged')
    if (token) {
      router.push('/admin')
    }
  })

  const handleSubimit = async (e) => {
    e.preventDefault()
    const { email, password } = e.target.elements
    try {
      const { data } = await api.post('/user', {
        email: email.value,
        password: password.value,
      })
      localStorage.setItem('userLogged', data)
      router.push('/admin')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div id="loginDiv">
      <form onSubmit={handleSubimit}>

        <h1>Acessar Conta</h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
