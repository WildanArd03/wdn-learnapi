import { useState } from "react"
import { authPage } from "../../../middlewares/authorizationPage"
import Router from 'next/router'

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx)
    return {
        props: {
            token
        }
    }
}

export default function create(props) {
    const [fields, setFields] = useState({
        title: '',
        content: '',
    })

    async function createHandler(e) {
        e.preventDefault()
        const { token } = props
        const create = await fetch('/api/posts/create', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        })
        const res = await create.json()
        Router.push('/admin/posts')
    }

    function fieldHandler(e) {
        const name = e.target.getAttribute('name')
        setFields({
            ...fields,
            [name]: e.target.value
        })
    }

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={createHandler}>
                <input onChange={fieldHandler} name="title" placeholder="Title" type="text" />
                <br />
                <textarea onChange={fieldHandler} name="content" placeholder="Content"></textarea>
                <br />
                <button type="submit">
                    Create
                </button>
            </form>
        </div>
    )
}
