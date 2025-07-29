import { monitorDestination } from "../model/monitoredDestination.js";

export const createDestination = async (req, res) => {
  try {
    const { location, riskLevel } = req.body;

    const newDestination = await monitorDestination({ location, riskLevel });
    const savedDestination = await newDestination.save();

    return res.status(201).json({
      message: "Destination created successfully",
      savedDestination,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error creating destination", error: error.message });
  }
};

export const getAllDestination = async (req, res) => {
  try {
    const destination = await monitorDestination.find();
    if (!destination)
      return res.status(400).json({ message: "Could not found destinations" });

    return res
      .status(200)
      .json({ message: "Destinations successfully fetched" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching destinations", error: error.message });
  }
};

export const getDestinationById = async (req, res) => {
  try {
    const destination = await monitorDestination.findById(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    return res
      .status(200)
      .json({ message: "Destination fetched successfully", destination });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching destination", error: error.message });
  }
};

export const updateDestination = async (req, res) => {
  try {
    const updated = await monitorDestination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Destination not found" });

    return res
      .status(200)
      .json({ message: "Successfully updated destination", updated });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Failed to update destination", error: error.message });
  }
};

export const deleteDestination = async (req, res) => {
  try {
    await monitorDestination.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json({ message: "Destination deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete destination", error: error.message });
  }
};
