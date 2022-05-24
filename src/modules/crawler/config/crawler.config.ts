import * as StakingABI from '../../../abis/staking.json';
import * as dotenv from 'dotenv';
dotenv.config();

export const stakingPoolContract = {
  abi: StakingABI.abi,
  contract_address: process.env.STAKING_POOL_CONTRACT,
  rpc: process.env.RPC,
  first_crawl_block: Number(process.env.BLOCK_START),
  contractName: 'stakingPoolContract',
};

export const maxRange = 1999; // MaxRange 3500 for mumbai
