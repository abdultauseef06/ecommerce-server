const validate = (schema) => async (req, res, next) => {
    try {
      const parsedBody = await schema.parseAsync(req.body);
      req.body = parsedBody;
      next();
    } catch (error) {
      const status =422;
      const extraDetails = error.errors.map((err) => err.message)
      const message="fill input fields properly"
      const errorMessages = {extraDetails,status, message}
      console.log(errorMessages);
      //res.status(400).json({ msg: errorMessages });
      next(errorMessages);
    }
  };
  
  module.exports = validate;
  