import { useParams } from "react-router-dom"

function Detail() {
  const { id } = useParams()

  return (
    <div className="flex-1 min-h-screen bg-gray-950 text-white flex items-center justify-center px-4 pt-16">
      <h1>Detail {id}</h1>
    </div>
  )
}

export default Detail