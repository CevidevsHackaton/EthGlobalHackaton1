export interface SiteType {
  name: string
  logo: string
  title: string
  description: string
  image?: string
  video?: string
  features: FeatureType[]
  highlights: HighlightType[]
  faqs: FAQType[]
  twitterHandle: string
}

export interface FeatureType {
  title: string
  description: string
  image: string
}

export interface HighlightType {
  icon: string
  title: string
  description: string
}

export interface FAQType {
  q: string
  a: string
}

export interface CTAType {
  name: string
  link: string
}


export interface TRequirements {
  monthsOfMembership: number
  isActiveMembership: boolean
  costRaffle: number
}

export interface TRaffle {
  id: string
  name: string
  description: string
  dateStar: Date
  dateEnd: Date
  membersCount: number
  membershipName: string
  membershipId: number,
  requirements: TRequirements
}
