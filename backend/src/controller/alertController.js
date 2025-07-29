import { alert } from "../model/alert.js";

export const getAlert = async (req, res) => {
  const alerts = await alert.find().sort({ timestamp: -1 });

  return res.status(200).json({ alerts });
};
