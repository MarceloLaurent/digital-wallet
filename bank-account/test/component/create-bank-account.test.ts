import createBankAccount from "@src/controllers/create-bank-account";
import bankPartner from "@src/ports/bank-partner";
import userBankAccountNotifier from "@src/ports/notifiers/user-bank-account";
import userRepo from "@src/ports/repo/user";
import userBankAccountRepo from "@src/ports/repo/user-bank-account";
import BankAccount from "@src/types/bank-account";
import User, { UserBankAccount, UserParams } from "@src/types/user";
import { expect } from "chai";
import { restore, SinonStub, stub } from "sinon";

let createAccountBankPartner: SinonStub;
let insertUser: SinonStub;
let insertUserBankAccount: SinonStub;
let userBankAccountNotification: SinonStub;

describe("Create bank account", () => {
  beforeEach(() => {
    createAccountBankPartner = stub(bankPartner, "createAccount").resolves(givenBankAccount);
    insertUser = stub(userRepo, "insert");
    insertUserBankAccount = stub(userBankAccountRepo, "insert");
    userBankAccountNotification = stub(userBankAccountNotifier, "created")
  });

  afterEach(() => restore());

  it("Call a bank partner to create a bank account", async () => {
    const userParams: UserParams = {
      fullName: "Some Body"
    };

    await createBankAccount(userParams);

    expect(createAccountBankPartner).to.have.been.calledOnce;
  });

  it("Persist user in the database", async () => {
    const userParams: UserParams = {
      fullName: "Some Body"
    };

    await createBankAccount(userParams);

    expect(insertUser).to.have.been.calledOnce;

    const insertedUser = insertUser.getCall(0).args[0] as User;

    expect(insertedUser.id).to.be.a("string").that.has.length(36);
    expect(insertedUser.fullName).to.be.equal("Some Body");
  });

  it("Persist user bank account in the database", async () => {
    const userParams: UserParams = {
      fullName: "Some Body"
    };

    await createBankAccount(userParams);

    expect(insertUserBankAccount).to.have.been.calledOnce;

    const insertedUserBankAccount = insertUserBankAccount.getCall(0).args[0] as UserBankAccount;

    expect(insertedUserBankAccount.id).to.be.a("string").that.has.length(36);
    expect(insertedUserBankAccount.bankCode).to.be.equal("123");
    expect(insertedUserBankAccount.accountBank).to.be.equal("0001");
    expect(insertedUserBankAccount.accountNumber).to.be.equal("1234567");
  });

  it("Return an user bank account", async () => {
    const userParams: UserParams = {
      fullName: "Some Body"
    };

    const userBankAccount = await createBankAccount(userParams);

    expect(userBankAccount.id).to.be.a("string").that.has.length(36);
    expect(userBankAccount.bankCode).to.be.equal("123");
    expect(userBankAccount.accountBank).to.be.equal("0001");
    expect(userBankAccount.accountNumber).to.be.equal("1234567");
  });

  it("Send a notification when a user bank account is created", async () => {
    const userParams: UserParams = {
      fullName: "Some Body"
    };

    await createBankAccount(userParams);

    expect(userBankAccountNotification).to.have.been.calledOnce;
  });
});

const givenBankAccount: BankAccount = {
  bankCode: "123",
  accountBranch: "0001",
  accountNumber: "1234567"
}