interface OpenGraphProps {
  title: string
  description: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export default function OpenGraph({ title, description, image, url, type = 'website' }: OpenGraphProps) {
  const siteUrl = 'https://reaepita.top'
  const fullUrl = url ? `${siteUrl}${url}` : siteUrl
  const ogImage = image || `${siteUrl}/images/og-default.jpg`

  return (
    <>
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  )
}
