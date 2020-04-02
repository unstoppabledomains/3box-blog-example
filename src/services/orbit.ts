import ipfs from "ipfs";
import OrbitDB from "orbit-db";
import { practiceIpfs } from "./config";
import CustomAccessController from "./CustomAccessController";

let orbitInstance: any;
let isLoading: boolean = false;
const resolverQueue: any[] = [];

const initOrbit = async () => {
  console.log("Starting IPFS");
  isLoading = true;

  // May Change in browser
  const ipfsNode = await ipfs.create(practiceIpfs);
  //   TODO open existing address logic | in docstore/posts
  const orbitdb = await OrbitDB.createInstance(ipfsNode, {
    AccessControllers: CustomAccessController
  });

  orbitInstance = { db: orbitdb, node: ipfsNode };
  console.log("Finished Creating Orbit DB Instance & IPFS Node");
  consumeQueue(null, orbitInstance);
};

const consumeQueue = (e: any, instance: any) => {
  for (const resolver of resolverQueue) {
    resolver(e, instance);
  }
};

const createOrbit = async (callBack: any) => {
  if (orbitInstance) callBack(null, orbitInstance);
  if (!isLoading) initOrbit();
  resolverQueue.push(callBack);
};

const getOrbit = () =>
  new Promise((resolve, reject) =>
    createOrbit((e: any, instance: any) => (e ? reject(e) : resolve(instance)))
  );

export default getOrbit;
