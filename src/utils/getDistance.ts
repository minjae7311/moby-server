const degreesToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const getDistance = (
  from: { lat: number; lng: number },
  to: { lat: number; lng: number }
) => {
  const RADIUS = 6371;

  const fromLatRads = degreesToRadians(from.lat);
  const fromLngRads = degreesToRadians(from.lng);
  const toLatRads = degreesToRadians(to.lat);
  const toLngRads = degreesToRadians(to.lng);

  const distance =
    Math.acos(
      Math.sin(fromLatRads) * Math.sin(toLatRads) +
        Math.cos(toLatRads) *
          Math.cos(fromLatRads) *
          Math.cos(fromLngRads - toLngRads)
    ) * RADIUS;

    return distance;
};
