import signupComplete from "@src/controllers/signup-complete";
import signupNotifier from "@src/ports/notifiers/signup";
import signupRepo from "@src/ports/repo/signup";
import Signup from "@src/types/signup";
import { expect } from "chai";
import { restore, SinonStub, stub } from "sinon";

let getByTokenSignup: SinonStub;
let updateStatusSignup: SinonStub;
let completeNotificationSignup: SinonStub;

describe("Signup complete", () => {
  beforeEach(() => {
    getByTokenSignup = stub(signupRepo, "getByToken");
    updateStatusSignup = stub(signupRepo, "updateStatus");
    completeNotificationSignup = stub(signupNotifier, "complete");
  });

  afterEach(() => restore());

  it("Update signup status to complete",async () => {
    const token = "some-token";
    getByTokenSignup.resolves(signup);

    await signupComplete(token);

    expect(updateStatusSignup).to.have.been.calledWith(signup, "COMPLETE");
  });

  it("Send a notification when a signup is completed",async () => {
    const token = "some-token";
    getByTokenSignup.resolves(signup);

    await signupComplete(token);

    expect(completeNotificationSignup).to.have.been.calledOnce;
  });
});

const signup: Signup = {
  token: "some-token",
  initParams: {
    fullName: "Some Body",
    dateOfBirth: "1990-01-01",
    address: "av. Some Street, 123"
  },
  status: "IN_PROGRESS"
};