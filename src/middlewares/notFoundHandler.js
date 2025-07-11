const notFoundHandler = (req, res) => {
  res.status(404).send("Sorry, the page you are looking for does not exist.");
};

export default notFoundHandler;
