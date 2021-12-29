import createTimeline from "@src/controllers/create-timeline";
import timelineRepo from "@src/ports/repo/timeline";
import UserParams from "@src/types/user-params";
import { expect } from "chai";
import { restore, SinonStub, stub } from "sinon";

let insertTimeline: SinonStub;

describe("Create timeline", () => {
  beforeEach(() => {
    insertTimeline = stub(timelineRepo, "insert");
  });

  afterEach(() => restore());

  it("Persist timeline in the database", async () => {
    const userParams: UserParams = {
      userId: "some-user-id",
      fullName: "Some Body"
    };

    await createTimeline(userParams);

    expect(insertTimeline).to.have.been.calledOnce;
  });

  it("Return a timeline with all events inside", async () => {
    const userParams: UserParams = {
      userId: "some-user-id",
      fullName: "Some Body"
    };

    const timeline = await createTimeline(userParams);

    expect(timeline.events).to.be.an("array").that.has.length(1);
    expect(timeline.events[0].description).to.be.equal("Welcome Some Body!");
  });
});
