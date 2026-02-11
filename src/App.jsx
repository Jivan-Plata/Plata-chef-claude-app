import Header from "./Header"
import MainContent from "./MainContent"

export default function App() {
  return (

    <div className = "w-full max-w-3xl flex flex-col justify-center items-center min-h-screen mx-auto">
      <Header />
      <MainContent />
    </div>
    
  )
}
