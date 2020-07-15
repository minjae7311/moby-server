const privateResolver = (resolverFunction) => async (
  parent,
  argument,
  context,
  info
) => {
  if (!context.req.user) {
    // if user not exist
    throw new Error("No JWT. I refuse to proceed.");
  }

  const resolved = await resolverFunction(parent, argument, context, info);

  return resolved;
};

export default privateResolver;
