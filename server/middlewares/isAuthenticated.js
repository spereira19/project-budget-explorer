import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
  //! Get the token from the header
  const headerObj = req.headers;
  const token = headerObj?.authorization?.split(" ")[1];
  //!Verify the token
  console.log("In isAuthenticated")
  console.log(token)

  const verifyToken = jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) {
      console.log(err)
      return false;
    } 
    else {
      return decoded;
    }
  });
  if (verifyToken) {
    //!Save the user req obj
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Session expired");
    next(err);
  }
};

export default isAuthenticated;