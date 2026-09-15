'use client';

import React from "react";
import HeroAsciiOne from "@/components/ui/hero-ascii-one";
import { ModernLandingHero } from "@/components/ui/modern-landing-hero";

export function DemoAscii() {
  return (
    <div className="w-screen h-screen">
      <HeroAsciiOne />
    </div>
  );
}

export function DemoModern() {
  return <ModernLandingHero />;
}

export default function DemoOne() {
  return <ModernLandingHero />;
}
