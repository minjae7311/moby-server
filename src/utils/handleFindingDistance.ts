import Ride from "../entities/Ride";
import { PubSub } from "graphql-yoga";

/**
 * @todo test when accepted ride
 * @param {Ride} ride
 */
const WAIT_TIME = 10000; // 10 sec
const LOOP_LIMIT = 3;

const delay = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, WAIT_TIME)
  );
};

export const handleFindingDistance = async (ride: Ride, pubSub: PubSub) => {
  let first = true;

  for (let i = 0; i < LOOP_LIMIT; ++i) {
    console.log("\n\n\n\n", i, "\n\n\n\n\n");
    await delay();

    if (first) {
      first = false;
    } else {
      await ride.reload();

      if (ride.status == "REQUESTING") {
        ride.findingDistance += 10;
        ride.save();

        pubSub.publish("rideRequesting", { SubscribeNewRide: ride });
      } else {
        return;
      }
    }
  }
};
