// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ReturnValues {}

export interface LogEventDto {
  address: string;
  blockNumber: number;
  transactionHash: string;
  transactionIndex: number;
  blockHash: string;
  logIndex: number;
  removed: boolean;
  id: string;
  returnValues: ReturnValues;
  event: string;
  signature: string;
}
