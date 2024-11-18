import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card, Grid, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Charts from '../../components/admin-view/Charts';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  
  const getUsers = async () => {
    try {
      const usersData = await axios.get("http://localhost:3000/admin");
      setUsers(usersData.data.users);
      console.log(usersData.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handledelete=(id)=>{
    axios.delete(`http://localhost:3000/admin/${id}`)
    .then((res)=>{
      console.log(res.data);
      getUsers();
    })
    .catch((error)=>{
      console.log(error);
    });
  }
  
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      {/* Dashboard Stats Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#1976d2', color: 'white', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5">Total Users</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#212121', color: 'white', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5">Active Users</Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ backgroundColor: '#212121', color: 'white', height: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h5">Inactive Users</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Users List Table */}
      <div style={{ marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Users List
        </Typography>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>User Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Created At</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.userName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button onClick={()=>handledelete(user._id)} variant="contained" color="error" size="small">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Charts Section */}
      <Charts />
    </div>
  );
};

export default AdminDashboard;
