const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');
const Subscription = require('../models/Subscription');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding');

    await Patient.deleteMany();
    await Appointment.deleteMany();
    await Subscription.deleteMany();

    const patients = await Patient.insertMany([
      {
        firstName: 'John',
        lastName: 'Doe',
        dateOfBirth: '1990-05-15',
        gender: 'Male',
        phone: '0400123456',
        email: 'john.doe@example.com',
        address: '12 King Street, Canberra ACT',
        medicalHistory: 'Hypertension'
      },
      {
        firstName: 'Mary',
        lastName: 'Smith',
        dateOfBirth: '1988-09-22',
        gender: 'Female',
        phone: '0400987654',
        email: 'mary.smith@example.com',
        address: '45 Lake Road, Queanbeyan NSW',
        medicalHistory: 'Asthma'
      },
      {
        firstName: 'Alex',
        lastName: 'Brown',
        dateOfBirth: '1995-02-10',
        gender: 'Other',
        phone: '0411222333',
        email: 'alex.brown@example.com',
        address: '78 City Avenue, Canberra ACT',
        medicalHistory: 'No major history'
      }
    ]);

    await Appointment.insertMany([
      {
        patient: patients[0]._id,
        doctorName: 'Dr Sarah Williams',
        department: 'General Medicine',
        appointmentDate: '2026-05-20',
        appointmentTime: '10:30 AM',
        reason: 'Regular health checkup',
        status: 'Scheduled',
        notes: 'First appointment'
      },
      {
        patient: patients[1]._id,
        doctorName: 'Dr James Carter',
        department: 'Cardiology',
        appointmentDate: '2026-05-21',
        appointmentTime: '12:00 PM',
        reason: 'Heart health review',
        status: 'Completed',
        notes: 'Follow-up required'
      },
      {
        patient: patients[2]._id,
        doctorName: 'Dr Emily White',
        department: 'Pathology',
        appointmentDate: '2026-05-22',
        appointmentTime: '02:15 PM',
        reason: 'Blood test consultation',
        status: 'Scheduled',
        notes: 'Bring previous reports'
      }
    ]);

    await Subscription.insertMany([
      {
        patient: patients[0]._id,
        planName: 'Premium Care',
        monthlyFee: 89.99,
        billingCycle: 'Monthly',
        startDate: '2026-05-01',
        paymentStatus: 'Paid',
        subscriptionStatus: 'Active',
        notes: 'Priority appointments included'
      },
      {
        patient: patients[1]._id,
        planName: 'Basic Care',
        monthlyFee: 49.99,
        billingCycle: 'Monthly',
        startDate: '2026-05-01',
        paymentStatus: 'Paid',
        subscriptionStatus: 'Active',
        notes: 'Basic care plan'
      },
      {
        patient: patients[2]._id,
        planName: 'Family Care',
        monthlyFee: 129.99,
        billingCycle: 'Monthly',
        startDate: '2026-05-01',
        paymentStatus: 'Pending',
        subscriptionStatus: 'Active',
        notes: 'Family plan pending payment'
      }
    ]);

    console.log('Sample data inserted successfully');
    process.exit();
  } catch (error) {
    console.error('Seeding failed:', error.message);
    process.exit(1);
  }
};

seedData();