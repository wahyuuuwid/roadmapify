import { Link } from "react-router-dom"

function NotFound() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-gray-400">Page Not Found</p>

      <Link to="/">
        <button className="mt-4 px-4 py-2 bg-blue-500 rounded">
          Balik ke Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound