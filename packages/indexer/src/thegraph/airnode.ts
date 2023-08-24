import {GraphCommon} from "./_common";
import {
  AirnodeAggregatedMessageRoot,
  AirnodeBeacon,
  AirnodeBeaconBase,
  AirnodeBeaconCompletedDistruibution,
  AirnodeComplted,
  QueryNextAirnodeCompleted
} from "../types/graph";

export class ThegraphIndexerAirnode extends GraphCommon {

  public async beacons(): Promise<AirnodeBeacon[]> {
    const query = `
    query QueryBeacons {
      addBeacons(
        orderBy: blockNumber
        orderDirection: asc
      ) {
        id
        blockNumber
        blockTimestamp
        transactionHash

        beaconId
        beacon_airnode
        beacon_endpointId
        beacon_sponsor
        beacon_sponsorWallet

      }
      removeBeacons(
        orderBy: blockNumber
        orderDirection: asc
      ) {
        id
        blockNumber
        blockTimestamp
        transactionHash

        beaconId
      }
    }
    `;
    const gdata = await super.query({query});
    const addeds: AirnodeBeacon[] = gdata.list('addBeacons');
    const removeds: AirnodeBeaconBase[] = gdata.list('removeBeacons');
    return addeds.filter(ai => removeds.findIndex(ri => ri.beaconId == ai.beaconId) == -1);
  }

  public async lastAirnodeCompleted(variables: QueryNextAirnodeCompleted): Promise<AirnodeComplted | undefined> {
    const query = `
    query QueryNextAirnodeCompleted($beaconId: Bytes!) {
      airnodeRrpCompleteds(
        first: 1
        orderBy: blockNumber
        orderDirection: desc
        where: {
          beaconId: $beaconId
        }
      ) {
        id
        blockNumber
        blockTimestamp
        transactionHash

        beaconId
        requestId
        data
      }
    }
    `;
    return await super.single({query, variables, schema: 'airnodeRrpCompleteds'})
  }

  public async beaconAirnodeCompletedDistribution(beacons: string[]): Promise<AirnodeBeaconCompletedDistruibution[]> {
    const completeds = [] as AirnodeBeaconCompletedDistruibution[];
    for (const beaconId of beacons) {
      const c = await this.lastAirnodeCompleted({beaconId});
      if (!c) continue;
      completeds.push(c);
    }
    return completeds;
  }

  public async lastAggregatedMessageRoot(): Promise<AirnodeAggregatedMessageRoot | undefined> {
    const query = `
    query QueryLastAggregatedMessageRoot {
      aggregatedMessageRoots(
        first: 1
        orderBy: blockNumber
        orderDirection: desc
      ) {
        id
        blockNumber
        blockTimestamp
        transactionHash

        msgRoot
      }
    }
    `;
    return await super.single({query, schema: 'aggregatedMessageRoots'});
  }

}
