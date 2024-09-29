export type ListItemProps = {
  text: string
  href: string
}

export const ListItem: React.FC<ListItemProps> = (props) => {
  const { text, href } = props
  return (
    <li>
      <a
        href={href}
        className="hover:text-white hover:tracking-widest hover:opacity-90 transition-all duration-500 ease-in-out group"
      >
        {text}
        <span className="block h-[2px] w-0 bg-white group-hover:w-full transition-all duration-500 ease-in-out"></span>
      </a>
    </li>
  )
}
