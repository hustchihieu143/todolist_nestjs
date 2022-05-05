import * as StakingABI from '../../../abis/staking.json';

export const mLandTokenContract = {
  abi: StakingABI.abi,
  contract_address: process.env.MLANDTOKEN_CONTRACT_ADDRESS,
  rpc: process.env.RPC,
  first_crawl_block: Number(process.env.FIRST_BLOCK),
  contractName: 'stable_contract',
};

export const maxRange = 1999; // MaxRange 3500 for mumbai
