const Appointment = require('../models/Appointment');

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate('patient', 'firstName lastName phone email')
      .sort({ appointmentDate: 1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointments'
    });
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'firstName lastName phone email');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      data: appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch appointment'
    });
  }
};

const createAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create appointment',
      error: error.message
    });
  }
};

const updateAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update appointment',
      error: error.message
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete appointment'
    });
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
};