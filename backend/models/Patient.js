const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    gender: {
      type: String,
      enum: ['Male', 'Female', 'Other'],
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    email: {
      type: String,
      trim: true
    },
    address: {
      type: String,
      required: true
    },
    medicalHistory: {
      type: String,
      default: ''
    },
    emergencyContact: {
      name: String,
      phone: String,
      relationship: String
    },
    status: {
      type: String,
      enum: ['Active', 'Inactive'],
      default: 'Active'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Patient', patientSchema);