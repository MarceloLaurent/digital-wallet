import bankPartner from "@src/ports/bank-partner";
import userBankAccountNotifier from "@src/ports/notifiers/user-bank-account";
import userRepo from "@src/ports/repo/user";
import userBankAccountRepo from "@src/ports/repo/user-bank-account";
import User, { UserBankAccount, UserParams } from "@src/types/user";
import { uuid } from "uuidv4";

export default async (userParams: UserParams): Promise<UserBankAccount> => {
  const user: User = {
    id: uuid(),
    fullName: userParams.fullName
  };

  await userRepo.insert(user);
  const bankAccount = await bankPartner.createAccount(user);

  const userBankAccount: UserBankAccount = {
    id: uuid(),
    userId: user.id,
    bankCode: bankAccount.bankCode,
    accountBank: bankAccount.accountBranch,
    accountNumber: bankAccount.accountNumber
  };

  await userBankAccountRepo.insert(userBankAccount);
  await userBankAccountNotifier.created(userBankAccount);
  return userBankAccount;
};