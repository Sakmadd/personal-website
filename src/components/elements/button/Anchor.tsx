import React from "react"

export interface AnchorProps {
  href: string
  children: React.ReactNode
}

export const Anchor = (props: AnchorProps) => {
  return <a href={props.href}> {props.children} </a>
}
