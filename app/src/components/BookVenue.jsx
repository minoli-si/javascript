import { useState } from "react";
import axios from "axios";

const BookVenue = (props) => {
  const [Venue, setVenue] = useState('');
  const [Sports, setSports] = useState('');
  const [Date, setDate] = useState('');
  const [Time, setTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [Sport, setSport] = useState('');
  const [Equipment, setEquipment] = useState('');
  const[Quantity,setQuantity]=useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a data object to send to the server
    const data = {
      venue: Venue,
      sports: Sports,
      event_date: Date,
      event_time: Time, 
      sport: Sport,
      equipment: Equipment,
      quantity: Quantity,
      end_time: EndTime,
    };

    try {
      // Send a POST request to your Express.js server
      const response = await axios.post('http://localhost:4000/addsport', data);
      console.log(response.data); // Server response
    } catch (error) {
      console.error(error);
    }
  }
    return <div className="container">
                <h1>Welcome!!!</h1>
                <h2>Enter the details</h2>
                <hr />
                <form onSubmit={handleSubmit} action="#" method="get">
                    <div className="bookclass">
                        <label htmlFor="Venue" className="form-label">Add Venue</label>
                        <input onChange={(e) => setVenue(e.target.value)} name="Venue" value={Venue} className="form-control" id="Venue" />
                    </div>
                    <div className="bookclass">
                        <label htmlFor="Sports" className="form-label">Add Sports </label>
                        <input onChange={(e) => setSports(e.target.value)} name="Sports" value={Sports} className="form-control" id="Sports" />
                    </div>
                    <div className="bookclass">
                        <label htmlFor="Date" className="form-label">Date </label>
                        <input type="date" onChange={(e) => setDate(e.target.value)} name="Date" value={Date} className="form-control" id="Date" />
                    </div>
                    <div className="bookclass">
                        <label htmlFor="Time" className="form-label">Start Time </label>
                        <input type="time" onChange={(e) => setTime(e.target.value)} name="Time" value={Time} className="form-control" id="Time" />
                    </div>
                    <div className="bookclass">
                        <label htmlFor="Time" className="form-label">End Time </label>
                        <input type="time" onChange={(e) => setEndTime(e.target.value)} name="Time" value={EndTime} className="form-control" id="Time" />
                    </div>
                    
                <h2>Add the Equipment Details</h2>
                    <div className="mb-3">
                        <label htmlFor="Sports" className="form-label">Sport</label>
                        <input onChange={(e) => setSport(e.target.value)} name="Sports" value={Sport} className="form-control" id="Sports" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Equipment" className="form-label">Equipment</label>
                        <input onChange={(e) => setEquipment(e.target.value)} name="Equipment" value={Equipment} className="form-control" id="Equipment" />
                    </div>
                    
                    <div className="mb-3">
                        <label htmlFor="Quantity" className="form-label">Quantity</label>
                        <input type="quantity" onChange={(e) => setQuantity(e.target.value)} name="Quantity" value={Quantity} className="form-control" id="Quantity" />
                    </div>
                    
                    <div className="button">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                    </form>
            <hr/>
            <ul>
                <li>Venue: { Venue}</li>
                <li>Sport : { Sports }</li>
                <li>Date : { Date}</li>
                <li>Time : { Time}</li>
                <li>End Time : {EndTime}</li>
                <li>Sport :{ Sports }</li>
                <li>Equipment :{ Equipment }</li>
                <li>Quantity :{ Quantity }</li>

                
                
               
            </ul>
            </div>
}

export  default BookVenue ;
