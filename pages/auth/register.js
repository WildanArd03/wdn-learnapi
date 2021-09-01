import Router from 'next/router'
import React, { useState } from 'react'

import { unauthPage } from '../../middlewares/authorizationPage'

export async function getServerSideProps(ctx) {
    await unauthPage(ctx)
    return { props: {} }
}

export default function Register() {
    const [fields, setfields] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState('normal')
    async function registerHandler(e) {
        setLoading('loading . . . .')
        e.preventDefault()
        const registerReq = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'content-type': 'application/json'
            }
        })
        if (!registerReq.ok) return setLoading('erorr' + registerReq.status)
        const registerRes = await registerReq.json()
        setLoading('')
        Router.push('login')
    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name')
        setfields({
            ...fields,
            [name]: e.target.value
        })
    }
    return (
        <div>
            <h1>Register</h1>
            <form onSubmit={registerHandler}>
                <label htmlFor="email">Email</label>
                <input onChange={fieldHandler} type="text" name="email" />
                <br />
                <label htmlFor="password">Password</label>
                <input onChange={fieldHandler} type="password" name="password" />
                <button type="submit">Register</button>
                <br />
                <div>{loading}</div>
            </form>
        </div>
    )
}
