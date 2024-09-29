import { Button } from "../elements/button/button"
import { UnorderedList } from "../elements/link/UnorderedList"
import { Logo } from "../elements/logo/logo"

export const Navbar = () => {
  return (
    <nav className="flex items-center justify-between space-x-6 w-full fixed z-50 p-5">
      <Logo />
      <UnorderedList
        listItems={[
          { href: "/", text: "Home" },
          { href: "/credibility", text: "Credibility" },
          { href: "/works", text: "Works" },
          { href: "/testimonials", text: "Testimonials" },
        ]}
      />
      <Button href="/contact">Contact</Button>
    </nav>
  )
}
