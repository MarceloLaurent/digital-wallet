import Signup, { SignupStatus } from "@src/types/signup";

const insert = async (_signup: Signup): Promise<void> => {
  throw new Error ("not implemented");
};

const getByToken = async (_token: string): Promise<Signup> => {
  throw new Error ("not implemented");
};

const updateStatus = async (_signup: Signup, _newStatus: SignupStatus): Promise<Signup> => {
  throw new Error ("not implemented");
};

export default {
  insert,
  getByToken,
  updateStatus
};
