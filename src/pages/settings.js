import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/settings.css'

function UserProfilePage() {
    const [isEditing, setIsEditing] = useState(false);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setIsEditing(false);
        // Reset any changes made in the form
        // You can add code here to reset the form fields if needed
    };

    return (
        <>
            <div className="">
                {/* <div class="d-flex justify-content-center">
                    <img className="rounded-circle mx-auto" width="150px" alt="avatar2" src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" />
                </div> */}
                
                <div className="row">
                    <div className="col-md-6 mx-auto">
                    <h2>Manage Your Profile</h2>
                        <h2 className="section-title">Vendor Information</h2>

                        <div className="card">

                            <div className="card-body">


                                <div className="form-group">
                                    <label htmlFor="vendorName">Vendor Name</label>
                                    {isEditing ? (
                                        <input type="text" id="vendorName" className="form-control" defaultValue="John Doe" />
                                    ) : (
                                        <p className="card-text">John Doe</p>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="vendorName">Profile image</label>
                                    {isEditing ? (
                                        <input type="text" id="vendorName" className="form-control" defaultValue="John Doe" />
                                    ) : (
                                        <p className="card-text">image</p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ownerName">Owner Name</label>
                                    {isEditing ? (
                                        <input type="text" id="ownerName" className="form-control" defaultValue="John Doe" />
                                    ) : (
                                        <p className="card-text">John Doe</p>
                                    )}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="nidNumber">NID Number</label>
                                    {isEditing ? (
                                        <input type="text" id="nidNumber" className="form-control" defaultValue="1234567890" />
                                    ) : (
                                        <p className="card-text">1234567890</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <h2 className="section-title">Contact Information</h2>
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone:</label>
                                        {isEditing ? (
                                            <input type="text" id="phone" className="form-control" defaultValue="(555) 123-4567" />
                                        ) : (
                                            <p className="card-text">Phone: (555) 123-4567</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email:</label>
                                        {isEditing ? (
                                            <input type="text" id="email" className="form-control" defaultValue="john.doe@example.com" />
                                        ) : (
                                            <p className="card-text">Email: john.doe@example.com</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Address:</label>
                                        {isEditing ? (
                                            <input type="text" id="address" className="form-control" defaultValue="123 Main St, New York, USA" />
                                        ) : (
                                            <p className="card-text">Address: 123 Main St, New York, USA</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            <h2 className="section-title">Social Media</h2>
                            <div className="card">
                                <div className="card-body">
                                    <div className="form-group">
                                        <label htmlFor="facebook">Facebook:</label>
                                        {isEditing ? (
                                            <input type="text" id="facebook" className="form-control" defaultValue="facebook.com/yourpage" />
                                        ) : (
                                            <p className="card-text">Facebook: facebook.com/yourpage</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="amazon">Amazon:</label>
                                        {isEditing ? (
                                            <input type="text" id="amazon" className="form-control" defaultValue="amazon.com/shop/yourstore" />
                                        ) : (
                                            <p className="card-text">Amazon: amazon.com/shop/yourstore</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="twitter">Twitter:</label>
                                        {isEditing ? (
                                            <input type="text" id="twitter" className="form-control" defaultValue="twitter.com/yourhandle" />
                                        ) : (
                                            <p className="card-text">Twitter: twitter.com/yourhandle</p>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="youtube">YouTube:</label>
                                        {isEditing ? (
                                            <input type="text" id="youtube" className="form-control" defaultValue="youtube.com/yourchannel" />
                                        ) : (
                                            <p className="card-text">YouTube: youtube.com/yourchannel</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mx-auto">
                            {isEditing ? (
                                <div>
                                    <button className="btn btn-primary" onClick={handleSaveClick}>Save</button>
                                    <button className="btn btn-secondary" onClick={handleCancelClick}>Cancel</button>
                                </div>
                            ) : (
                                <button className="btn btn-primary" onClick={handleEditClick}>Edit</button>
                            )}
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default UserProfilePage;
