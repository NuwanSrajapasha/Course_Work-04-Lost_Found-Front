    import React, { useState } from 'react';
    import DatePicker from 'react-datepicker';
    import 'react-datepicker/dist/react-datepicker.css';
    import 'bootstrap/dist/css/bootstrap.min.css';

const Datepic: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

      return (
        <div className="form-group">
          <label htmlFor="datePicker">Select Date:</label>
          <DatePicker
            id="datePicker"
            selected={selectedDate}
            onChange={(date: Date | null) => setSelectedDate(date)}
            className="form-control" // Apply Bootstrap form-control class
            dateFormat="yyyy/MM/dd"
            placeholderText="Click to select a date"
          />
        </div>
      );
    };

    export default Datepic;