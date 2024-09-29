import { Navbar } from "../components/fragments/navbar"
import { HeroSection } from "../components/fragments/HeroSection"
function Page() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <div className="h-[100vh]"></div>
    </>
  )
}

export default Page
