
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
