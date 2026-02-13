import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { JourneyProvider } from '@/contexts/JourneyContext'
import { HomePage } from '@/pages/HomePage'
import { JourneySimulator } from '@/features/simulator'
import { ExecutivePage } from '@/pages/ExecutivePage'

function App() {
  return (
    <BrowserRouter>
      <JourneyProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/journey" element={<JourneySimulator />} />
          <Route path="/executive" element={<ExecutivePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </JourneyProvider>
    </BrowserRouter>
  )
}

export default App
