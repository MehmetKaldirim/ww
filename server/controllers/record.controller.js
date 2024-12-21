const errorHendler = require("../utils/errorHandler");

const Record = require("../models/Record");

module.exports.getAll = async (req, res) => {
  try {
    const records = await Record.find({ user: req.user.id });
    res.status(200).json(records);
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.newRecord = async (req, res) => {
  const { user, body, file } = req;

  try {
    const existingRecord = await Record.findOne({
      user: user.id,
      date: { $gte: new Date().setHours(0, 0, 0, 0) },
    });

    if (existingRecord) {
      existingRecord.imgSrc = file?.path || "";
      existingRecord.description = body.description;
      existingRecord.mintemp = body.mintemp;
      existingRecord.maxtemp = body.maxtemp;
      existingRecord.wind = body.wind;
      existingRecord.weatherData = body.weatherData;

      await existingRecord.save();
      return res.status(200).json({
        data: existingRecord,
        message: "Record was updated!",
      });
    }

    const record = new Record({
      user: user.id,
      imgSrc: file?.path || "",
      description: body.description,
      mintemp: body.mintemp,
      maxtemp: body.maxtemp,
      wind: body.wind,
      weatherData: body.weatherData,
    });

    await record.save();
    return res.status(201).json({
      data: record,
      message: "Record was created!",
    });
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const record = await Record.findById(req.params.id);
    res.status(200).json(record);
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.updRecord = async (req, res) => {
  const updated = {
    user: req.user.id,
    description: req.body.description,
  };

  if (req.file) {
    updated[imgSrc] = req.file.path;
  }

  try {
    const record = await Record.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: updated },
      { new: true }
    );
    res.status(201).json(record);
  } catch (e) {
    errorHendler(res, e);
  }
};

module.exports.deleteRecord = async (req, res) => {
  try {
    await Record.remove({ _id: req.params.id });
    res.status(200).json("Record was removed");
  } catch (e) {
    errorHendler(res, e);
  }
};
