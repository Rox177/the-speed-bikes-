import { Metadata } from "next"

interface GenerateMetadataProps {
  title: string
  description: string
  image?: string
  noIndex?: boolean
}

export function generateMetadata({
  title,
  description,
  image,
  noIndex = false,
}: GenerateMetadataProps): Metadata {
  return {
    title: `${title} | VoltTrail`,
    description,
    openGraph: {
      title,
      description,
      images: image ? [{ url: image }] : [],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
  }
}
 
