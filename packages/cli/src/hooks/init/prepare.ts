import {Hook} from '@oclif/core'

const hook: Hook<'init'> = async function (opts) {
  process.stdout.write(`prepare for ${opts.id}\n`)
}

export default hook
