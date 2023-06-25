import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/VendorProfilePage.css'; // Import the CSS file for styling

const VendorProfilePage = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState({
    vendor_name: '',
    mobile_number: '',
    address: '',
    email: '' // Added email field
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchVendorProfile();
  }, []);

  const fetchVendorProfile = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/vendors/1/`);
      setVendor(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setVendor((prevVendor) => ({ ...prevVendor, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/update_vendor/1/`, vendor);
      console.log('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      console.log('Error:', error);
      // Handle the error, such as displaying an error message
    }
  };

  return (
    <div className="vendor-profile-container">
      <h1 className="vendor-profile-title">Vendor Profile</h1>
      <table className="vendor-profile-table">
        <tbody>
          <tr>
            <th className="vendor-profile-label">Vendor Name</th>
            {isEditing ? (
              <td className="vendor-profile-value">
                <input
                  type="text"
                  name="vendor_name"
                  value={vendor.vendor_name}
                  onChange={handleInputChange}
                />
              </td>
            ) : (
              <td className="vendor-profile-value">{vendor.vendor_name}</td>
            )}
          </tr>
          <tr>
            <th className="vendor-profile-label">Mobile Number</th>
            {isEditing ? (
              <td className="vendor-profile-value">
                <input
                  type="text"
                  name="mobile_number"
                  value={vendor.mobile_number}
                  onChange={handleInputChange}
                />
              </td>
            ) : (
              <td className="vendor-profile-value">{vendor.mobile_number}</td>
            )}
          </tr>
          <tr>
            <th className="vendor-profile-label">Address</th>
            {isEditing ? (
              <td className="vendor-profile-value">
                <input
                  type="text"
                  name="address"
                  value={vendor.address}
                  onChange={handleInputChange}
                />
              </td>
            ) : (
              <td className="vendor-profile-value">{vendor.address}</td>
            )}
          </tr>
          <tr>
            <th className="vendor-profile-label">Email</th>
            {isEditing ? (
              <td className="vendor-profile-value">
                <input
                  type="text"
                  name="email"
                  value={vendor.email}
                  onChange={handleInputChange}
                />
              </td>
            ) : (
              <td className="vendor-profile-value">{vendor.email}</td>
            )}
          </tr>
        </tbody>
      </table>
      {!isEditing && (
        <button className="edit-button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
      {isEditing && (
        <button className="save-button" onClick={handleUpdateProfile}>
          Save
        </button>
      )}
    </div>
  );
};

export default VendorProfilePage;
