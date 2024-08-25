import { useState, useEffect } from 'react';
import carData from '../data/taladrod-cars.min.json';
import CarRemovalConfirmation from '../components/CarRemovalConfirmation ';
import SlideBar from '../components/SlideBar';

const HighlightedCars = () => {
  // const location = useLocation();
  // const { likedCars } = location.state;
  const [likedCars,setLikedCars] = useState([]);
  const [isConfirmationVisible, setIsConfirmationVisible] = useState(false);
  const [carToRemove, setCarToRemove] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() =>{
    const highlightedCars = JSON.parse(localStorage.getItem('likedCars')) || [];
    setLikedCars(highlightedCars);
  },[]);

  const handleHighlight = (carId) => {
    setIsConfirmationVisible(true);
    setCarToRemove(carId);
    console.log('isConfirmationVisible:', isConfirmationVisible);
  };

  const handleConfirmRemove = () => {
    const newLikedCars = likedCars.filter(item => item !== carToRemove);
    setLikedCars(newLikedCars);
    localStorage.setItem('likedCars', JSON.stringify(newLikedCars));
    setIsConfirmationVisible(false);
    setCarToRemove(null);
  };

  console.log(likedCars)

  const filteredCars = likedCars.filter(carId => {
    const car = carData.Cars.find(car => car.Cid === carId);
    if (!car) return false;
    const carBrand = car.NameMMT.split(' ')[0];
    const searchquery = searchTerm.toLowerCase();
    return carBrand.toLowerCase().includes(searchquery) || car.Model.toLowerCase().includes(searchquery);
  });
  

  return (
    <div style={{ marginLeft: '250px' }}> 
      <SlideBar sidebarWidth="250px" carCount={likedCars.length}/> 
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <h2>Highlighted Cars</h2>
          <div className="input-group mb-3" style={{ maxWidth: '300px',padding:'10px' }}>
              <span className="input-group-text">
                <i className="fas fa-search"></i> {/* Font Awesome search icon */}
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search by brand"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>

        </div>
        
      <div className='row'>
        {filteredCars.map(carId => {
          const car = carData.Cars.find(car => car.Cid === carId);
          if(car){
            const carBrand = car.NameMMT.split(' ')[0];
            return (
            <div className='col-md-4' key={carId}>
                <div className="card">
                  <img src={car.Img300} className="card-img-top" alt={car.Model} />
                  <div className="card-body">
                    <h5 className="card-title">{carBrand}~{car.Model} model
                    <i className="bi bi-heart-fill" style={{color: 'red', float:'right'}}></i>
                    </h5>
                    <p className="card-text">Price: {car.Prc} Baht</p>
                    <p className="card-text">Year: {car.Yr}</p>
                    <p className='card-text'>Status: {car.Status}</p>
                    <p className="card-text">Details: {car.NameMMT}</p>
                    <button onClick={() => handleHighlight(carId)}>
                      {likedCars.includes(carId)? "Remove": ""} 
                    </button>
                  </div>
                </div>
            </div>
            );
          };
          return null;
        })}
      </div>
      {isConfirmationVisible && (
        <CarRemovalConfirmation 
        carId= {carToRemove}
        onCancel= {()=> setIsConfirmationVisible(false)}
        onConfirm={handleConfirmRemove}
        />
      )}

      </div>
    </div>
  );
};

export default HighlightedCars;