// Doc store settings **accessController
export const docStoreOptions = {
  indexBy: "id",
  accessController: {
    type: "web3-auth"
    // write: ["*"] // Make write access public
  }
};

// IPFS Configs
export const practiceIpfs = {
  preload: { enabled: false },
  relay: { enabled: true, hop: { enabled: true, active: true } },
  EXPERIMENTAL: { pubsub: true },
  repo: "./ipfs",
  config: { Bootstrap: [], Addresses: { Swarm: [] } }
};

export const globalIpfs = {
  relay: { enabled: true, hop: { enabled: true, active: true } },
  EXPERIMENTAL: { pubsub: true },
  repo: "./ipfs"
};
