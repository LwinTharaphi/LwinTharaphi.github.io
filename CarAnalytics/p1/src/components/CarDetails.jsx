import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SlideBar from '../components/SlideBar';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const CarDetails = ({ cars }) => {
  const { brand } = useParams();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const model = searchParams.get('model'); //carbrand's model
  
  const [carsByYear, setCarsByYear] = useState([]);
  const [likedCars, setLikedCars] = useState(JSON.parse(localStorage.getItem('likedCars')) || []);
  // const navigate = useNavigate();

  useEffect(() => {
    if (brand) { // Filter only when brand is {available
      const filteredCars = cars.filter(car =>{
        const carBrand = car.NameMMT.split(' ')[0];
        return carBrand === brand && (!model || car.Model === model)
      });
    //   const sortedCars = filteredCars.sort((a, b) => b.Yr - a.Yr);
      const carsByYearTemp = filteredCars.reduce((acc, car) => {
          const year = car.Yr;
          acc[year] = acc[year] || [];
          acc[year].push(car);
          return acc;
      }, {});

      const sortedKeys = Object.keys(carsByYearTemp).sort().reverse();
      const sortedCars = new Map();
      sortedKeys.forEach(key=>{
          sortedCars.set(key,carsByYearTemp[key]);
      });
      console.log(sortedCars);
      
      setCarsByYear(sortedCars);
    }
  },[brand]);

  const handleLoveClick = (carId)=>{
    const newLikedCars = [...likedCars];
    const index = newLikedCars.indexOf(carId);
    if (index !== -1){
        newLikedCars.splice(index,1);
    }else{
        newLikedCars.push(carId);
    }
    // console.log(newLikedCars);
    setLikedCars(newLikedCars);
    localStorage.setItem('likedCars',JSON.stringify(newLikedCars));
    console.log(likedCars);
    // console.log(newLikedCars);
  };

  const isLiked = (carId)=> likedCars.includes(carId);
  console.log(likedCars)

  return (
    <div style={{ marginLeft: '250px' }}> 
      <SlideBar sidebarWidth="250px" carCount={likedCars.length} />
      <div className="container-fluid">
      <h3>{brand} Cars {model && ` - ${model}`}</h3>
      <div className="row">
      {Array.from(carsByYear).map(([year, Cars],index) => (
        <div key={index}>
            <div className="row">
                <h3>{year}</h3>
                <br></br>
                {Cars.map((car, index) => (
                    <div className="col-md-4" key={index}>
                        <div className="card">
                            <img src={car.Img300} className="card-img-top" alt={car.Model} />
                            <div className="card-body">
                                <h5 className="card-title">{car.Model}
                                <button style={{float: 'right',backgroundColor:'white'}} onClick={() => handleLoveClick(car.Cid)}>
                                    {isLiked(car.Cid)? (
                                        <i className="bi bi-heart-fill" style={{color: 'red'}}></i>
                                    ): (
                                        <i className="bi bi-heart" style={{color: 'black'}}></i>
                                    )}
                                    
                                </button>
                                </h5>
                                <p className="card-text">Price: {car.Prc} Baht</p>
                                <p className="card-text">Status: {car.Status}</p>
                                <p className="card-text">Details: {car.NameMMT}</p>
                                {/* <button onClick={() => handleLoveClick(car.Cid)}>
                                    {isLiked(car.Cid)? (
                                        <i className="bi bi-heart-fill"></i>
                                    ): (
                                        <i className="bi bi-heart"></i>
                                    )}
                                    
                                </button> */}
                            </div>
                        </div>
                    </div>
                ))}
                <br></br>
            </div>
        </div>
        ))}
      </div>
    </div>

    </div>
  
  );
};

export default CarDetails;
