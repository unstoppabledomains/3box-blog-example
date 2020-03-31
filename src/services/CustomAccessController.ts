import AccessControllers from "orbit-db-access-controllers";
import AccessController from "orbit-db-access-controllers/src/access-controller-interface";

class CustomAccessController extends AccessController {
  static get type() {
    return "wallet-auth";
  }

  async canAppend(entry: any, identityProvider: any) {
    // logic to determine if entry can be added, for example:
    if (entry && identityProvider) {
      return true;
    } else {
      return false;
    }
  }

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
