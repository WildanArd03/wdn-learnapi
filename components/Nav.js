import Link from "next/link"
import Cookie from 'js-cookie'
import Router from "next/router"

export default function Nav() {
    function logoutHandler(e) {
        e.preventDefault()
        Cookie.remove('token')
        Router.replace('/login')
    }
    return (
        <>
            <Link href="/admin/posts/create">
                Create Post
            </Link>
            &nbsp; | &nbsp;
            <a href="#" onClick={logoutHandler.bind(this)}>Logout</a>
        </>
    )
}
