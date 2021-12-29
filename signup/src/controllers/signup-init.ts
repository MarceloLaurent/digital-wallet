import signupRepo from "@src/ports/repo/signup";
import Signup, { SignupInitParams } from "@src/types/signup";
import { uuid } from "uuidv4";

export default async (signupInitParams: SignupInitParams): Promise<Signup> => {
  const signup: Signup = {
    token: uuid(),
    initParams: signupInitParams,
    status: "IN_PROGRESS"
  };

  await signupRepo.insert(signup);
  return signup;
}