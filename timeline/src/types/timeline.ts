export interface Event {
  readonly description: string;
  readonly dateTime: Date;
}

export default interface Timeline {
  readonly userId: string;
  readonly events: Event[];
}