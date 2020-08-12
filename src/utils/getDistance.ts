const degreesToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const getDistance = (
  fromLat: number,
  fromLng: number,
  toLat: number,
  toLng: number
) => {
  const RADIUS = 6371;

  const fromLatRads = degreesToRadians(fromLat);
  const fromLngRads = degreesToRadians(fromLng);
  const toLatRads = degreesToRadians(toLat);
  const toLngRads = degreesToRadians(toLng);

  const distance =
    Math.acos(
      Math.sin(fromLatRads) * Math.sin(toLatRads) +
        Math.cos(toLatRads) *
          Math.cos(fromLatRads) *
          Math.cos(fromLngRads - toLngRads)
    ) * RADIUS;

  console.log(`\n\ninput..\n
    fromLatRads : ${fromLatRads}\n
    fromLngRads : ${fromLngRads}\n
    toLatRads : ${toLatRads}\n
    toLngRads : ${toLngRads}\n
    \n\n
    distance: ${distance}
    `);

  return distance;
};
