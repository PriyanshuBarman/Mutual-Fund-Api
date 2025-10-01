const notFoundHandler = (req, res) => {
  res.status(404).send("Endpoint not found, please check the URL.");
};

export default notFoundHandler;
