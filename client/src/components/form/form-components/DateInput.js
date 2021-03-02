import React, { Fragment, useState } from 'react';
import { getDateString } from '../../../utils/helperFunctions';

const DateInput = ({ selectedDate, setSelectedDate }) => {
  const getCurrentDateString = () => {
    const d = new Date();
    return getDateString(d.getTime());
  };

  const getFutureDateString = () => {
    const d = new Date();
    const dFuture = new Date();
    dFuture.setDate(d.getDate() + 15);
    return getDateString(dFuture.getTime());
  };

  const handleSelectedDate = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <input
      required
      min={getCurrentDateString()}
      max={getFutureDateString()}
      type="date"
      name="date"
      value={selectedDate}
      id="date"
      form="usrform"
      placeholder="date"
      onChange={(e) => handleSelectedDate(e)}
    />
  );
};

export default DateInput;
