import AccessControllers from "orbit-db-access-controllers";
import AccessController from "orbit-db-access-controllers/src/access-controller-interface";

class CustomAccessController extends AccessController {
  static get type() {
    return "wallet-auth";
  }

  async canAppend(entry: any, identityProvider: any) {
    // logic to determine if entry can be added
    // Check if wallet matches admin
    try {
      const [userWallet] = await (window as any).ethereum.enable();
      const adminWallet = "0x47b0FdE4622577cb10ED2c79108D79CBb582eE5C";
      if (userWallet.toLowerCase() === adminWallet.toLowerCase()) {
        // TODO sign?
        const result = await new Promise((res, rej) => {
          const authTester = this.authWrap(res, rej);
          (window as any).web3.personal.sign(
            (window as any).web3.fromUtf8("Hello from UD!"),
            adminWallet,
            authTester
          );
        });
        return result;
      } else {
        console.log("Active user wallet is not admin");
        return false;
      }
    } catch (error) {
      console.error(error);
    }
    return false;
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
    return { parameter: "parameters-needed-for-loading" };
  }

  static async create(orbitDb: any, options: any) {
    return new CustomAccessController();
  }
}

export default AccessControllers.addAccessController({
  AccessController: CustomAccessController
});
