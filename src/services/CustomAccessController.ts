import AccessControllers from "orbit-db-access-controllers";
import AccessController from "orbit-db-access-controllers/src/access-controller-interface";

class CustomAccessController extends AccessController {
  static get type() {
    return "web3-auth";
  }

  async canAppend(entry: any, identityProvider: any) {
    // logic to determine if entry can be added
    // Check if wallet matches admin
    return true;
    // FIXME Can't read/load/sync db without append
    // console.log("entry", entry);
    // console.log("idprovider", identityProvider.keystore);

    // try {
    //   const [userWallet] = await (window as any).ethereum.enable();
    //   const adminWallet = "0x47b0FdE4622577cb10ED2c79108D79CBb582eE5C";
    //   if (userWallet.toLowerCase() === adminWallet.toLowerCase()) {
    //     const result = await new Promise((res, rej) => {
    //       (window as any).web3.personal.sign(
    //         (window as any).web3.fromUtf8("Append Blog DB"),
    //         adminWallet,
    //         this.authWrap(res, rej)
    //       );
    //     });
    //     return result;
    //   } else {
    //     console.log("Active user wallet is not admin");
    //     return false;
    //   }
    // } catch (error) {
    //   console.error(error);
    // }
    // return false;
  }

  authWrap = (resolve: any, reject: any) => async (err: any, msg: any) => {
    if (err) {
      console.error(err);
      reject(false);
    } else {
      // Do anything with msg?
      resolve(true);
    }
  };

  // Logic for granting access to identity
  //   async grant(access, identity) {}

  async save() {
    // Return parameters needed for loading
    console.log("save");
    return { parameter: "parameters-needed-for-loading" };
  }

  static async create(orbitDb: any, options: any) {
    return new CustomAccessController();
  }
}

export default AccessControllers.addAccessController({
  AccessController: CustomAccessController
});
