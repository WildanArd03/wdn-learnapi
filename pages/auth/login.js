import { useState } from 'react'
import Link from 'next/link'
import Cookie from 'js-cookie'
import Router from 'next/router'
import { unauthPage } from '../../middlewares/authorizationPage'

export async function getServerSideProps(ctx) {
    await unauthPage(ctx)
    return { props: {} }
}

export default function login() {
    const [fields, setfields] = useState()

    async function loginHandler(e) {
        e.preventDefault()
        const loginReq = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(fields),
            headers: {
                'content-type': 'application/json',
            }
        })
        const loginRes = await loginReq.json()
        Cookie.set('token', loginRes.token)
        Router.push('/admin')
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
            <Link href="/register">
                register
            </Link>
            <br />
            <br />
            <h1>login</h1>
            <form onSubmit={loginHandler}>
                <input onChange={fieldHandler} placeholder="Email" type="text" name="email" />
                <br />
                <input onChange={fieldHandler} placeholder="Password" type="password" name="password" />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
