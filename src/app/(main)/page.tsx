/**
 * @file page.tsx
 * @description The main page component for the password generator application.
 * It renders the core PasswordGenerator component within a ClientOnly wrapper to ensure client-side execution.
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