import Ride from "../entities/Ride";
import { PubSub } from "graphql-yoga";
import { cancelPayment } from "./functions.payment";

const WAIT_TIME = 10000; // 10 sec
const LOOP_LIMIT = 3;
/**
 * @static
 */
const FIND_DRIVER_DISTANCE = 10;

const delay = () => {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve();
    }, WAIT_TIME)
  );
};

/**
 * @todo CancelMyRide와 코드 중복되지 않도록 리팩토링?
 *
 * @param {Ride} ride
 * @param {PubSub} pubSub
 */
export const handleFindingDistance = async (ride: Ride, pubSub: PubSub) => {
  let first = true;

  for (let i = 0; i < LOOP_LIMIT; ++i) {
    await delay();

    if (first) {
      first = false;
    } else {
      await ride.reload();

      if (ride.status == "REQUESTING") {
        ride.findingDistance += FIND_DRIVER_DISTANCE;
        ride.save();

        pubSub.publish("rideRequesting", { SubscribeNewRide: ride });
      } else {
        return;
      }
    }
  }

  await delay();
  const rideReloaded = await Ride.findOne(
    {
      id: ride.id,
    },
    { relations: ["payment", "passenger", "driver"] }
  );

  if (!rideReloaded) {
    return;
  }

  if (rideReloaded.status != "REQUESTING") {

    return;
  } else {
    rideReloaded.status = "CANCELED";
    rideReloaded.cancelledDate = new Date().toLocaleString();

    rideReloaded.passenger.isRiding = false;
    await rideReloaded.passenger.save();

    pubSub.publish("rideStatusUpdating", {
      SubscribeMyRide: rideReloaded,
    });

    rideReloaded.save();

    await cancelPayment(rideReloaded.payment[0]);
  }
};
