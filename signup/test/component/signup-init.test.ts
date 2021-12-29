import signupInit from "@src/controllers/signup-init";
import signupRepo from "@src/ports/repo/signup";
import { SignupInitParams } from "@src/types/signup";
import { expect } from "chai";
import { restore, SinonStub, stub } from "sinon";

let insertSignup: SinonStub;

describe("Signup initialization", () => {
  beforeEach(() => {
    insertSignup = stub(signupRepo, "insert").resolves();
  });

  afterEach(() => restore());

  const signupParams: SignupInitParams = {
    fullName: "Some Body",
    dateOfBirth: "1990-01-01",
    address: "av. Some Street, 123"
  };

  it("return a signup token as as response to signup initialization", async () => {
    const signup = await signupInit(signupParams);

    expect(signup.token).to.be.a("string").that.has.length(36);
  });

  it("return a signup with init params that sent to the function", async () => {
    const signup = await signupInit(signupParams);

    expect(signup.initParams).to.be.deep.equal(signupParams);
  });

  it("persist signup in the database", async () => {
    const signup = await signupInit(signupParams);

    expect(insertSignup).to.have.been.calledOnce;
    expect(insertSignup).to.have.been.calledWith(signup);
  });
});