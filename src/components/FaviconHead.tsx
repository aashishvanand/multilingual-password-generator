/**
 * @file FaviconHead.tsx
 * @description Renders the necessary <link> and <meta> tags for favicons and theme colors in the document head.
 */

import { Fragment } from 'react'

export default function FaviconHead() {
  return (
    <Fragment>
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#ffffff" />
      <meta name="background-color" content="#ffffff" />
    </Fragment>
  )
}