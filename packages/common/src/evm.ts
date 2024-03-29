import {ethers} from "ethers";
import chalk = require('chalk');
import {logger} from "./logger/winston";

export interface RelayClientConfig {
  chainName: string
  endpoint: string
  signer: string
}

export interface TransactionResponse {
  from: string
  to: string
  hash: string
  blockHash: string
  blockNumber: string
}

export interface ContractConfig {
  chainName: string
  signer: string
  address: string
  evm: ethers.JsonRpcProvider
}

export class RelayEVMClient {

  private readonly _config: RelayClientConfig;
  private readonly _evm: ethers.JsonRpcProvider;

  constructor(config: RelayClientConfig) {
    this._config = config
    this._evm = new ethers.JsonRpcProvider(config.endpoint);
    this._evm.on('debug', info => {
      const {action, payload, result} = info;
      if (!action) return;
      const logLevel = process.env.ORMPIPE_LOG_LEVEL ?? 'info';
      if (logLevel != 'debug') return;
      let logText = '';
      if (action.indexOf('receive') != -1) {
        logText = JSON.stringify(result);
      } else {
        logText = JSON.stringify(payload);
      }
      logger.debug(
        chalk.gray(logText),
        {
          target: 'ormpipe',
          breads: [`ethers:${this._config.chainName}`, `${action}`]
        }
      );
    });
  }

  public get config(): RelayClientConfig {
    return this._config;
  }

  public get evm(): ethers.JsonRpcProvider {
    return this._evm
  }

  public wallet(privateKey: string): ethers.Wallet {
    return new ethers.Wallet(privateKey, this.evm);
  }


}

