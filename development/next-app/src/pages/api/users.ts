// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { TUser } from '@/types/user'
import { users } from '@/mocks/users'


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<TUser[]>
) {
  res.status(200).json(users)
}
