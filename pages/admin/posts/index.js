import { useState } from "react"
import { authPage } from "../../../middlewares/authorizationPage"
import Router from "next/router"
import Nav from "../../../components/Nav"
export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx)
    const postReq = await fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/posts')
    const posts = await postReq.json()
    return {
        props: {
            token,
            posts: posts.data
        }
    }
}
export default function index(props) {
    const [posts, setPosts] = useState(props.posts)
    async function deleteHandler(id, e) {
        e.preventDefault()
        const { token } = props

        const ask = confirm('Data mau di hapus?')
        if (ask) {
            const deletePost = await fetch('/api/posts/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'authorization': 'Bearer ' + token
                }
            })

            const res = await deletePost.json()
            const postsFiltered = posts.filter(post => {
                return post.id !== id && post
            })
            setPosts(postsFiltered)
        }
    }

    function editHandler(id) {
        Router.push('/admin/posts/edit/' + id)
    }

    return (
        <div>
            <Nav />
            <h1>Posts</h1>
            {
                posts.map((post, i) => (
                    <ul key={i}>
                        <li>{post.id}</li>
                        <li>{post.title}</li>
                        <li>{post.content}</li>
                        <li>
                            <button onClick={editHandler.bind(this, post.id)}>Edit</button>
                            <button onClick={deleteHandler.bind(this, post.id)}>Hapus</button>
                        </li>
                        <hr />
                    </ul>
                ))
            }
        </div>
    )
}
