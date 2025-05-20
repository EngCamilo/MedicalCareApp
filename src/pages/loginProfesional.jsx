import { useState } from 'react'
import '../assets/css/global.css'
import '../assets/css/loginProfesional.css'
import Layout from '../components/Layout'

function LoginProfesional() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <Layout menuOpen={menuOpen} setMenuOpen={setMenuOpen}>
      
    </Layout>
  )
}

export default LoginProfesional