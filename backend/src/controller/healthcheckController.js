const healthcheck = async (req, res) => {
  try {
    return res
      .status(200)
      .json({ status: "OK", message: "Health check passed" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "ERROR", message: "Health check failed" });
  }
};

export default healthcheck;
