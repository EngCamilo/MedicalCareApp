import { useState } from 'react'
import '../assets/css/global.css'
import '../assets/css/registroAfiliado.css'
import Layout from '../components/Layout'

function RegistroAfiliado() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      
    </Layout>
  )
}

export default RegistroAfiliado