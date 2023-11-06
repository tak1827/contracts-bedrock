import { EventLog } from "ethers";

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const findEventByName = (events: EventLog[], ename: string): EventLog => {
  const e = events.find((e: EventLog) => e.eventName === ename)
  if (!e) throw new Error('No event found');
  return e;
};
