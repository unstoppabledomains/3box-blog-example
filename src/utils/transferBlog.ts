import Box from "3box";

export const joinSpace = async (
  threadAddress: string,
  spaceName: string,
  address?: string
) => {
  if (!address) {
    address = (await (window as any).ethereum.enable())[0];
  }
  const provider = await Box.get3idConnectProvider();
  const box = await Box.create(provider);
  await box.auth([spaceName], { address });
  await box.syncDone;

  const space = await box.openSpace(spaceName);
  await space.syncDone;
  await space.joinThreadByAddress(threadAddress);
};

export const addModerator = async (
  threadAddress: string,
  spaceName: string,
  newModeratorAddress: string
) => {
  console.log("start add moderator");

  try {
    const adminAddress = (await (window as any).ethereum.enable())[0];
    //   const adminAddress = "0x47b0FdE4622577cb10ED2c79108D79CBb582eE5C";

    const provider = await Box.get3idConnectProvider();
    const box = await Box.create(provider);

    await box.auth([spaceName], { adminAddress });
    await box.syncDone;

    const space = await box.openSpace(spaceName);
    await space.syncDone;

    const thread = await space.joinThreadByAddress(threadAddress);
    await thread.addModerator(newModeratorAddress);

    const moderators = await thread.listModerators();
    console.log("Moderators");
    console.log(moderators);
  } catch (error) {
    console.log("error");

    console.error(error);
  }
};
