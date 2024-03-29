import {ContractConfig} from "@darwinia/ormpipe-common";
import {ethers} from "ethers";


const abi = require("../abis/OrmpOracle.json");

export interface BuildImportMessageRootOptions {
  sourceChainId: number
  blockNumber: number
  messageRoot: string
}

export class OracleContractClient {

  private readonly config: ContractConfig;
  private readonly contract: ethers.Contract;

  constructor(config: ContractConfig) {
    this.config = config;
    const wallet = new ethers.Wallet(config.signer, config.evm);
    this.contract = new ethers.Contract(config.address, abi, wallet);
  }


  public buildImportMessageRoot(options: BuildImportMessageRootOptions): string {
    return this.contract.interface.encodeFunctionData('importMessageRoot', [
      options.sourceChainId, // chainId
      options.blockNumber, // messageIndex
      options.messageRoot, // messageRoot
    ]);
  }

}
