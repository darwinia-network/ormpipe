
export enum StartTask {
  oracle = 'oracle',
  relayer = 'relayer',
}

export interface RelayConfig {
  sourceName: string
  sourceEndpoint: string

  targetName: string
  targetEndpoint: string

  sourceIndexerEndpoint: string
  sourceIndexerOracleEndpoint: string
  sourceIndexerRelayerEndpoint: string
  sourceIndexerOrmpEndpoint: string
  sourceIndexerAirnodeEndpoint: string

  targetIndexerEndpoint: string
  targetIndexerOracleEndpoint: string
  targetIndexerRelayerEndpoint: string
  targetIndexerOrmpEndpoint: string
  targetIndexerAirnodeEndpoint: string

  sourceSigner: string
  sourceSignerOracle: string
  targetSigner: string
  targetSignerOracle: string

}

export interface StartRelayFlag extends RelayConfig {
  sourceSignerEnv: string
  targetSignerEnv: string
  sourceSignerOracleEnv: string
  targetSignerOracleEnv: string
}

export interface StartInput {
  task: StartTask
}
