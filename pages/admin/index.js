import Link from 'next/link'
import { authPage } from '../../middlewares/authorizationPage'
export async function getServerSideProps(ctx) {
    const { token } = await authPage(ctx)
    return { props: {} }
}
export default function index() {
    return (
        <div>
            <h1>ADMIN</h1>
            <Link href="/admin/posts">posts</Link>
        </div >
    )
}
