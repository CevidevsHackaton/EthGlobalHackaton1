// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { TRaffle } from '@/types'

import { raffles } from '@/mocks/raffles'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TRaffle[]>
) {
  res.status(200).json(raffles)
}
