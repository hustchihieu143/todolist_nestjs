import * as StakingABI from '../../../abis/staking.json';

export const stakingPoolContract = {
  abi: StakingABI.abi,
  contract_address: '0x5d4E8b69CfD9Ad20Eb4d078fE636D7b271c387A8',
  rpc: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  first_crawl_block: 17345008,
  contractName: 'stakingPoolContract',
};

export const maxRange = 1999; // MaxRange 3500 for mumbai
