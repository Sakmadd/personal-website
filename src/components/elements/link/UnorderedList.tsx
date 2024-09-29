import { ListItem } from "./ListItem"

export interface UnorderedListProps {
  listItems: Array<{ text: string; href: string }>
}

export const UnorderedList = ({ listItems }: UnorderedListProps) => {
  return (
    <ul className="flex gap-16 items-center text-[var(--link)] font-thin text-xl tracking-tight">
      {listItems.map((item, index) => (
        <ListItem key={index} href={item.href} text={item.text} />
      ))}
    </ul>
  )
}
