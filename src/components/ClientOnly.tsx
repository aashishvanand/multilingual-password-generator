/**
 * @file ClientOnly.tsx
 * @description A component that ensures its children are only rendered on the client-side.
 * This is useful for avoiding hydration errors with components that rely on browser-specific APIs.
 */
'use client'

import { useEffect, useState, type ReactNode } from 'react'

export function ClientOnly({ children }: { children: ReactNode }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return mounted ? <>{children}</> : null
}