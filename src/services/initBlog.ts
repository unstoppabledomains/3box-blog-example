import Box from "3box";

export const initThread = async (address: string, domain: string) => {
  const box = await Box.open(address, (window as any).ethereum);
  const space = await box.openSpace(`unstoppable-domains-${domain}`);
  await space.syncDone;
  const thread = await space.joinThread("blog", {
    members: true,
  });
  return thread.address;
};
