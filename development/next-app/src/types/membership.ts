export interface TMembership {
  id: string
  name: string
  address: string
  description?: string
  price: number
  expirationDuration?: any
}
/* network: number;
    __typename?: "Lock" | undefined;
    id: string;
    address: any;
    name?: string | null | undefined;
    expirationDuration?: any;
    tokenAddress: any;
    price: any;
    lockManagers: any[];
    version: any;
    createdAtBlock?: any;
    totalKeys: any; */