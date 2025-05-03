import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/students')
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container-fluid bg-primary vh-100 vw-100 text-white">
      <h3 className="pt-4">Students</h3>
      <div className="d-flex justify-content-end">
        <Link className='btn btn-success' to='/create'>Add Student</Link>
      </div>
      <table className="table table-bordered bg-white mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">No students found.</td>
            </tr>
          ) : (
            data.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>
                  <Link className='btn mx-2 btn-success' to={`/read/${student.id}`}>Read</Link>
                  <Link className='btn mx-2 btn-warning' to={`/edit/${student.id}`}>Edit</Link>
                  <button className="btn mx-2 btn-danger">Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
