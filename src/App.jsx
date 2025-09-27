import { useState } from 'react'
import Layout from './components/Layout/Layout'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Layout>
        <h1 class="text-3xl font-bold underline bg-amber-700 text-blue-600">
          Hello world!
        </h1>
      </Layout>
    </>
  )
}

export default App
