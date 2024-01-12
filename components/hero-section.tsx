import React from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

export default function HeroSection() {
  return (
    <section className="rounded-lg aspect-square md:aspect-[2.4/1] overflow-hidden bg-hero-image bg-cover flex items-center justify-center">
      <div className="flex flex-col gap-2 max-w-sm sm:max-w-xl p-4 rounded-lg bg-secondary/70">
        <h2 className="font-bold text-3xl sm:text-5xl text-center">
          Become a Better React Developper
        </h2>
        <Input placeholder="Email" />
        <Button>Subscribe to our Newsletter</Button>
      </div>
    </section>
  )
}
