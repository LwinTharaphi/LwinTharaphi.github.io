import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome

const CarTable = ({ cars }) => {
  const [selectedModels, setSelectedModels] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleModelChange = (brand, model) => {
    setSelectedModels(prev => ({ ...prev, [brand]: model }));
  };

  const brands = cars.reduce((acc, car) => {
    const { NameMMT, Prc, Model } = car;
    const brand = NameMMT.split(' ')[0]; 

    if (!acc[brand]) {
      acc[brand] = { totalValue: 0, models: {} };
    }
    acc[brand].totalValue += parseInt(Prc.replace(/,/g, ''), 10);
    acc[brand].models[Model] = (acc[brand].models[Model] || 0) + 1;
    return acc;
  }, {});

  const filteredBrands = Object.entries(brands).filter(([brand]) =>
    brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewClick = (brand) => {
    const selectedModel = selectedModels[brand] || '';
    navigate(`/view/${brand}${selectedModel ? `?model=${selectedModel}` : ''}`);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4>Brand and Model Table</h4>
        <div className="input-group mb-3" style={{ maxWidth: '300px' }}>
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
      <table className="table table-striped table-hover">
        <thead class="table-dark">
          <tr>
            <th>Brand</th>
            <th>Model</th>
            <th>Value (Baht)</th>
            <th>Number of Cars</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredBrands.map(([brand, { totalValue, models }]) => {
            const selectedModel = selectedModels[brand] || '';
            const selectedModelCount = selectedModel ? models[selectedModel] || 0 : 0;
            const selectedModelValue = selectedModel
              ? cars
                  .filter(car => car.NameMMT.startsWith(brand) && car.Model === selectedModel)
                  .reduce((acc, car) => acc + parseInt(car.Prc.replace(/,/g, ''), 10), 0)
              : totalValue;

            return (
              <React.Fragment key={brand}>
                <tr>
                  <td>{brand}</td>
                  <td>
                    <select
                      className="form-select"
                      value={selectedModel}
                      onChange={e => handleModelChange(brand, e.target.value)}
                    >
                      <option value="">Select Model</option>
                      {Object.keys(models).map(model => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{selectedModel ? selectedModelValue.toLocaleString() : totalValue.toLocaleString()}</td>
                  <td>{selectedModel ? selectedModelCount : Object.values(models).reduce((acc, count) => acc + count, 0)}</td>
                  <td>
                    <button onClick={() => handleViewClick(brand)} className="btn btn-info">
                      <i className="fas fa-eye"></i> View
                    </button>
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <div className="text-center mt-3">
        <Link to="/highlighted-cars" className="btn btn-primary">
          View Highlighted Cars
        </Link>
      </div>
    </div>
  );
};

export default CarTable;
