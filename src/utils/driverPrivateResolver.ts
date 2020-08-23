const driverPrivateResolver = (resolverFunction) => async (
  parent,
  argument,
  context,
  info
) => {
  if (!context.req.driver) {
    // if user not exist
    throw new Error("No JWT. I refuse to proceed.");
  }

  const resolved = await resolverFunction(parent, argument, context, info);

  return resolved;
};

export default driverPrivateResolver;
