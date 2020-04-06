import getOrbit from "./orbit";
import ipfs from "ipfs";

export const getIpfsPeers = async () => {
  const orbit: any = await getOrbit();
  const peers = await orbit.node.swarm.peers();
  return peers;
};

export const connectToPeer = async (
  multiaddr: string,
  protocol = "/p2p-circuit/ipfs/"
) => {
  try {
    const orbit: any = await getOrbit();
    await orbit.node.swarm.connect(protocol + multiaddr);
  } catch (e) {
    console.error(e);
  }
};

export const sendMessage = async (topic: any, message: any) => {
  try {
    const msgString = JSON.stringify(message);
    const messageBuffer = ipfs.Buffer(msgString);
    await ((await getOrbit()) as any).node.pubsub.publish(topic, messageBuffer);
    console.log("sendMessage");
  } catch (e) {
    console.error(e);
  }
};
