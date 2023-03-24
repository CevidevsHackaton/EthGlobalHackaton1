// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { TMembership } from '@/types/membership'
import { memberships } from '@/mocks/memberships'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TMembership[]>
) {
  res.status(200).json(memberships)
}
