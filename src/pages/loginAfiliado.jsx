import { useState } from 'react'
import '../assets/css/global.css'
import '../assets/css/loginAfiliado.css'
import Layout from '../components/Layout'

function LoginAfiliado() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      
    </Layout>
  )
}

export default LoginAfiliado