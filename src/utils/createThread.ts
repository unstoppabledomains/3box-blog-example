import Box from "3box";
import getSpaceName from "utils/getSpaceName";

export default async (domain: string, address?: string) => {
  const spaceName = getSpaceName(domain);
  if (!address) {
    address = (await (window as any).ethereum.enable())[0];
  }

  const provider = await Box.get3idConnectProvider();
  const box = await Box.create(provider);
  await box.auth([spaceName], { address });
  await box.syncDone;

  const space = await box.openSpace(spaceName);
  await space.syncDone;

  const thread = await space.joinThread("blog-posts", {
    members: true,
  });
  return thread.address;
};
