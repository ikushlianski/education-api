// we assume we get role information from token
// to simulate this we just pass a user role string as a Bearer token
const getRoleFromToken = (token) => {
  const [_, role] = token.split('Bearer ');

  return role;
};

const restrictToRoles = (roles) => (req, res, next) => {
  const role = getRoleFromToken(req.headers.authorization);

  if (roles.includes(role)) {
    return next();
  }

  return res.sendStatus(403);
};

exports.getRoleFromToken = getRoleFromToken;
exports.restrictToRoles = restrictToRoles;
