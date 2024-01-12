import React, { PropsWithChildren } from "react"

export default function PageTitle({ children }: PropsWithChildren<{}>) {
  return <h1 className="text-4xl font-bold text-center mb-10">{children}</h1>
}
