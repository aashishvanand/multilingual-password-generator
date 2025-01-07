/**
 * Main page component that renders the password generator
 * Handles client-side functionality
 */
'use client'

import { ClientOnly } from '@/components/ClientOnly'
import { PasswordGenerator } from '@/components/password/Generator'

export default function Page() {
  return (
    <ClientOnly>
      <PasswordGenerator />
    </ClientOnly>
  )
}