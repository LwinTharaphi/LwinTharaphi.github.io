// CarRemovalConfirmation.js

import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';

const CarRemovalConfirmation = ({ carId, onCancel, onConfirm }) => {
  return (
    <Dialog
      visible={true} // Set this based on your state (isConfirmationVisible)
      onHide={onCancel}
      header="Confirm Removal"
      style={{ 
        width: '400px',
        backgroundColor: '#ffffff',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        border: '1px solid #ccc',
        borderRadius: '4px',
    }}
    >
      <p>Are you sure you want to remove this car from highlighted view?</p>
      <div className="p-d-flex p-jc-between">
        <Button label="Cancel" onClick={onCancel} />
        <Button label="Confirm" onClick={() => onConfirm(carId)} />
      </div>
    </Dialog>
  );
};

export default CarRemovalConfirmation;
