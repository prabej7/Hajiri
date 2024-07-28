export const checkFields = (noOfField) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length == noOfField) {
      next();
    } else {
      return res.status(404).json({ error: "Please provide all the fields." });
    }
  };
};
