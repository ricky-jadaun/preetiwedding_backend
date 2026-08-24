const Rsvp = require('../models/Rsvp');
const sendEmail = require('../utils/sendEmail');

// @desc    Submit RSVP
// @route   POST /api/rsvp
// @access  Public
const submitRsvp = async (req, res) => {
  const {
    firstName,
    lastName,
    adultsCount,
    childrenCount,
    childrenAge,
    email,
    whatsapp,
    attending,
    datesInIndia,
    dietary,
    specialNeeds
  } = req.body;

  if (!firstName || !lastName || !email || !whatsapp || !attending) {
    return res.status(400).json({
      success: false,
      message: 'Please provide all required fields (First Name, Last Name, Email, WhatsApp, Attendance)'
    });
  }

  try {
    const rsvp = await Rsvp.create({
      firstName,
      lastName,
      adultsCount,
      childrenCount,
      childrenAge,
      email,
      whatsapp,
      attending,
      datesInIndia,
      dietary,
      specialNeeds
    });

    // Send email notifications
    try {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (adminEmail) {
        const isAttending = attending === 'accept' ? 'Accept / Attending' : 'Decline / Not Attending';
        const attendanceColor = attending === 'accept' ? '#2ec4b6' : '#e71d36';
        const subject = `New RSVP: ${firstName} ${lastName} (${attending === 'accept' ? 'Attending' : 'Not Attending'})`;
        
        const html = `
          <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
            <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #f0f0f0;">
              <h2 style="color: #4a4e69; margin: 0; font-size: 24px; font-weight: 600;">Wedding RSVP Notification</h2>
              <p style="color: #777777; margin: 5px 0 0 0; font-size: 14px;">Preeti & Harpreet's Wedding</p>
            </div>
            
            <div style="background-color: ${attendanceColor}; color: white; padding: 12px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 6px; margin: 20px 0;">
              Status: ${isAttending}
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555555; width: 40%;">Guest Name:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333333;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555555;">Email Address:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333333;"><a href="mailto:${email}" style="color: #4a4e69; text-decoration: none;">${email}</a></td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555555;">WhatsApp Number:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333333;">${whatsapp}</td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555555;">Adults Count:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333333;">${adultsCount || 0}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555555;">Children Count:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333333;">${childrenCount || 0}</td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555555;">Children Age:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333333;">${childrenAge || 'N/A'}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555555;">Travel Dates (India):</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333333;">${datesInIndia || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555555;">Dietary Info:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333333;">${dietary || 'None'}</td>
              </tr>
              <tr style="background-color: #f9f9f9;">
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; font-weight: 600; color: #555555;">Special Needs:</td>
                <td style="padding: 12px 15px; border-bottom: 1px solid #f0f0f0; color: #333333;">${specialNeeds || 'None'}</td>
              </tr>
            </table>
            
            <div style="text-align: center; border-top: 2px solid #f0f0f0; padding-top: 15px; margin-top: 20px;">
              <p style="font-size: 12px; color: #888888; margin: 0;">
                This notification was generated automatically by the Wedding RSVP System.
              </p>
            </div>
          </div>
        `;
        
        const text = `
New Wedding RSVP Received!
===================================
Guest Name: ${firstName} ${lastName}
Status: ${isAttending}
Email Address: ${email}
WhatsApp Number: ${whatsapp}
Adults Count: ${adultsCount || 0}
Children Count: ${childrenCount || 0}
Children Age: ${childrenAge || 'N/A'}
Travel Dates (India): ${datesInIndia || 'N/A'}
Dietary Info: ${dietary || 'None'}
Special Needs: ${specialNeeds || 'None'}
===================================
This notification was generated automatically by the Wedding RSVP System.
        `;

        await sendEmail({
          to: adminEmail,
          subject,
          html,
          text
        });
      }
    } catch (emailError) {
      console.error('Error sending RSVP email notification to admin:', emailError);
    }

    res.status(201).json({
      success: true,
      message: 'RSVP submitted successfully',
      rsvp
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all RSVP submissions
// @route   GET /api/rsvp
// @access  Protected
const listRsvps = async (req, res) => {
  try {
    const rsvps = await Rsvp.find({}).sort({ createdAt: -1 });
    res.json({
      success: true,
      count: rsvps.length,
      rsvps
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete RSVP submission
// @route   DELETE /api/rsvp/:id
// @access  Protected
const deleteRsvp = async (req, res) => {
  try {
    const rsvp = await Rsvp.findById(req.params.id);

    if (!rsvp) {
      return res.status(404).json({ success: false, message: 'RSVP entry not found' });
    }

    await rsvp.deleteOne();

    res.json({
      success: true,
      message: 'RSVP entry deleted successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  submitRsvp,
  listRsvps,
  deleteRsvp
};
