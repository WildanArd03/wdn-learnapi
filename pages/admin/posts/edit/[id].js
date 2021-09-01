import { useState } from "react"
import Router from 'next/router'
import { authPage } from "../../../../middlewares/authorizationPage"

export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx)
    const { id } = ctx.query
    const postReq = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/posts/detail/' + id)

    const res = await postReq.json()
    return {
        props: {
            token,
            post: res.data
        }
    }
}

export default function edit(props) {
    const { post } = props

    const [fields, setFields] = useState({
        title: post.title,
        content: post.content,
    })

    async function updateHandler(e) {
        e.preventDefault()
        const { token } = props
        const update = await fetch('/api/posts/update/' + post.id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + token
            },
            body: JSON.stringify(fields)
        })
        const res = await update.json()
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
            <h1>Edit Post</h1>
            <p>Post id : {post.id}</p>
            <form onSubmit={updateHandler}>
                <input
                    defaultValue={post.title}
                    onChange={fieldHandler}
                    name="title"
                    placeholder="Title"
                    type="text"
                />
                <br />
                <textarea
                    defaultValue={post.content}
                    onChange={fieldHandler}
                    name="content"
                    placeholder="Content"
                ></textarea>
                <br />
                <button type="submit">
                    Update
                </button>
            </form>
        </div>
    )
}
