const User = require('../models/user-model');

const addressController = {
  addAddress: async (req, res) => {
    const { email, address } = req.body;

    try {
      const user = await User.findOne({email});

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      user.addresses.push(address);
      await user.save();

      return res.status(200).json({ message: 'Address added successfully', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  getAddressesByEmail: async (req, res) => {
    const { email } = req.params;

    try {
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json({ addresses: user.addresses });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },



  editAddress: async (req, res) => {
    const { email, addressId, updatedAddress } = req.body;

    try {
      const user = await User.findOne({email});

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const addressIndex = user.addresses.findIndex((addr) => addr._id.toString() === addressId);

      if (addressIndex === -1) {
        return res.status(404).json({ message: 'Address not found' });
      }

      // Update the address at the found index
      user.addresses[addressIndex] = updatedAddress;

      await user.save();

      return res.status(200).json({ message: 'Address updated successfully', user });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Add more methods for address-related operations if needed
};

module.exports = addressController;


