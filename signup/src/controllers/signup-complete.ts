import signupNotifier from "@src/ports/notifiers/signup";
import signupRepo from "@src/ports/repo/signup";

export default async (token: string): Promise<void> => {
  const signup = await signupRepo.getByToken(token);
  await signupRepo.updateStatus(signup, "COMPLETE");
  await signupNotifier.complete(signup);
}