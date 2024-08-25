import React, { useState, useEffect } from 'react';
import CarTable from '../components/CarTable';
import PieChart from '../components/PieChart';
import BarChart from '../components/BarChart';
import SlideBar from '../components/SlideBar';
import carData from '../data/taladrod-cars.min.json';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const likedCars = JSON.parse(localStorage.getItem('likedCars')) || [];

  useEffect(() => {
    console.log(carData.Cars);
    setCars(carData.Cars);
  }, []);

  return (
    <div style={{ marginLeft: '250px' }}> 
      <SlideBar sidebarWidth="250px" carCount={likedCars.length} /> 
      <div className="container-fluid">
        <h3 className="my-4">Welcome back!</h3>
        <p>Task and manage the car analysis</p>
        
        <CarTable cars={cars} />
      </div>
      <br></br>
      <div className="row">
          <div className="col-md-12 mb-4 d-flex align-items-stretch"> {/* Spanning full width */}
            <div className="card w-100">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Pie Chart</h5>
                <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                  <PieChart cars={cars} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 mb-4 d-flex align-items-stretch"> {/* Spanning full width */}
            <div className="card w-100 style={{ height: '500px' }}">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">Bar Chart</h5>
                <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                  <BarChart cars={cars} />
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    
  );
};

export default Dashboard;
