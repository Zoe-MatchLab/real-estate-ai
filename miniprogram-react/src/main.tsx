import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './App.tsx'
import { initRem } from './utils/rem'

// 初始化 rem 适配
function RemInit() {
  useEffect(() => {
    initRem()
  }, [])
  return null
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RemInit />
    <App />
  </StrictMode>,
)
