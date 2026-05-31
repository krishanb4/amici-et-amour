'use client';

import Image from 'next/image';
import { Mail } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-4 md:p-8">
      {/* Background accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-12">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Image
            src="/amici-et-amour-logo.png"
            alt="Amici et Amour Logo"
            width={300}
            height={300}
            className="drop-shadow-lg"
          />
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-pretty">
            Welcome
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light">
            Now Open
          </p>
        </div>

        {/* Description */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
          Experience an exceptional dining destination celebrating the finest in Italian and French cuisine. Join us for an unforgettable journey blending tradition with innovation.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col items-center gap-4 pt-8 border-t border-border/30">
          <Mail className="w-6 h-6 text-primary" />
          <a 
            href="mailto:contact@amicietamour.fr"
            className="text-lg text-primary hover:opacity-80 transition-opacity"
          >
            contact@amicietamour.fr
          </a>
        </div>

        {/* Footer Text */}
        <p className="text-sm text-muted-foreground pt-8">
          © 2026 Amici et Amour. All rights reserved.
        </p>
      </div>
    </main>
  );
}
