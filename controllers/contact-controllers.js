const Contact = require("../models/contact-model");

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error('Error in contactForm route:', error);
    return res.status(500).json({ message: "Message not delivered", error: error.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ message: { $exists: true }, email: { $exists: true }, username: { $exists: true } });
    return res.status(200).json({ contacts });
  } catch (error) {
    console.error('Error in getContacts route:', error);
    return res.status(500).json({ message: "Error fetching contacts", error: error.message });
  }
};





module.exports = {getContacts,contactForm};
