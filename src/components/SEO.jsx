import { Helmet } from 'react-helmet-async'

const defaultSEO = {
  title: 'Portofolio Fahri Andrian Saputra — Web Developer',
  description: 'Web Developer dari Tanggamus, Lampung. Spesialisasi React, JavaScript, dan pengembangan web modern.',
  image: 'https://fahriandriansaputra-portofolio.vercel.app/og-image.jpg',
  url: 'https://fahriandriansaputra-portofolio.vercel.app',
  type: 'website',
  keywords: 'web developer, react developer, frontend developer, tanggamus, lampung, kotaagung timur, kotim, smk kotim, marketing, fahri, sukabanjar,  pemasaran, bisnis, digital, web, jasa, toko, tata surya, portofolio'
}

export default function SEO({
  title = defaultSEO.title,
  description = defaultSEO.description,
  image = defaultSEO.image,
  url = defaultSEO.url,
  type = defaultSEO.type,
  keywords = defaultSEO.keywords,
  noindex = false
}) {
  const fullTitle = title === defaultSEO.title ? title : `${title} | Portofolio Fahri`

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Helmet>
  )
}
