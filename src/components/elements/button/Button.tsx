import { Anchor, AnchorProps } from "./anchor"

export const Button = (props: AnchorProps) => {
  const { children, href } = props
  return (
    <Anchor href={href}>
      <button className="bn632-hover bn25 ">{children}</button>
    </Anchor>
  )
}
