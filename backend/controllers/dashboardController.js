const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Subscription = require('../models/Subscription');

const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments();

    const totalAppointments = await Appointment.countDocuments();

    const activeSubscriptions = await Subscription.countDocuments({
      subscriptionStatus: 'Active'
    });

    const paidSubscriptions = await Subscription.find({
      paymentStatus: 'Paid'
    });

    const monthlyRevenue = paidSubscriptions.reduce((total, item) => {
      return total + item.monthlyFee;
    }, 0);

    const upcomingAppointments = await Appointment.find({
      status: 'Scheduled'
    })
      .populate('patient', 'firstName lastName phone')
      .sort({ appointmentDate: 1 })
      .limit(5);

    res.status(200).json({
      success: true,
      data: {
        totalPatients,
        totalAppointments,
        activeSubscriptions,
        monthlyRevenue,
        upcomingAppointments
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to load dashboard statistics',
      error: error.message
    });
  }
};

module.exports = {
  getDashboardStats
};