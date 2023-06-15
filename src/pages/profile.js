import { useState } from 'react';
import { Stack, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { deepOrange } from '@mui/material/colors';

export default function LetterAvatars() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    // Add more fields as needed
  });

  const handleClick = () => {
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSave = () => {
    // Save the updated user information
    // You can perform any validation or API calls here
    // For this example, we'll just update the state
    setDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
  };

  return (
    <Stack direction="row" spacing={2}>
      <Avatar sx={{ bgcolor: deepOrange[500], marginTop: '8px' }} onClick={handleClick}>
        N
      </Avatar>

      <Dialog open={isDialogOpen} onClose={handleClose}>
        <DialogTitle>User Information</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            name="name"
            value={userInfo.name}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Email"
            name="email"
            value={userInfo.email}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Location"
            name="location"
            value={userInfo.location}
            onChange={handleInputChange}
            fullWidth
          />
          {/* Add more fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">Save</Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
}
