export const badRequestHandler = (err, req, res, next) => {
  // 400
  // if(responsibility of that kind of error is mine) send the error back to the client as response
  // else send the error to the next error handler
  if (err.status === 400) {
    res
      .status(400)
      .send({ message: err.message, list: err.errorsList.map((e) => e.msg) });
  } else {
    next(err);
  }
};

export const unauthorisedHandler = (err, req, res, next) => {
  //401
  if (err.status === 401) {
    res.status(401).send({
      message: err.msg,
    });
  } else {
    next(err);
  }
};

export const notFoundHandler = (err, req, res, next) => {
  //404
  if (err.status === 404) {
    res.status(404).send({ message: err.message });
  } else {
    next(err);
  }
};

export const genericErrorHandler = (err, req, res, next) => {
  //500 - server errors
  console.log("Error received from up above: ", err);
  res.status(500).send({ message: "An error occured from the server side" });
};
