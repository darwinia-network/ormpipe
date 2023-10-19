import {OrmpOracleAssigned, OrmpRelayerAssigned, QueryNextRelayerAssigned} from "../types/graph";
import {GraphCommon} from "./_common";

export class ThegraphIndexerRelayer extends GraphCommon {

  public async allAssignedList(): Promise<OrmpRelayerAssigned[]> {
    const query = `
    query QueryRelayerAssignedList {
      ormpRelayerAssigneds(
        orderBy: seq
        orderDirection: asc
      ) {
        id
        msgHash
        fee
        params
        blockNumber
        blockTimestamp
        transactionHash
        seq
      }
    }
    `;
    return await super.list({query, schema: 'ormpRelayerAssigneds'});
  }

  public async inspectAssigned(variables: QueryNextRelayerAssigned): Promise<OrmpRelayerAssigned | undefined> {
    const query = `
    query QueryRelayerAssigned($msgHash: Bytes!) {
      ormpRelayerAssigneds(
        first: 1
        orderBy: seq
        orderDirection: asc
        where: {
          msgHash: $msgHash
        }
      ) {
        id
        msgHash
        fee
        params
        blockNumber
        blockTimestamp
        transactionHash
        seq
      }
    }
    `;
    return await super.single({query, variables, schema: 'ormpRelayerAssigneds'});
  }

  public async lastAssignedMessage(): Promise<OrmpRelayerAssigned | undefined> {
    const query = `
    query QueryRelayerAssignedList {
      ormpRelayerAssigneds(
        first: 1
        orderBy: seq
        orderDirection: desc
      ) {
        id
        msgHash
        fee
        params
        blockNumber
        blockTimestamp
        transactionHash
        seq
      }
    }
    `;
    return await super.single({query, schema: 'ormpRelayerAssigneds'});
  }

}
