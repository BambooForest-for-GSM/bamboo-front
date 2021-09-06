import { verifyController } from "../libs/requestUrls";
import RequestApiV2 from "../libs/requestApi";

class Verify {
  async getQuestion() {
    try {
      return await RequestApiV2({
        url: verifyController.getQuestion(),
      });
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }
}

export default new Verify();
