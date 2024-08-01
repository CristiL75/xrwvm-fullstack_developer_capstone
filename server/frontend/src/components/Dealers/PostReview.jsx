import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';

const PostReview = () => {
  const [dealer, setDealer] = useState({});
  const [review, setReview] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [date, setDate] = useState("");
  const [carmodels, setCarmodels] = useState([]);
  const [error, setError] = useState(null);

  let curr_url = window.location.href;
  let root_url = curr_url.substring(0, curr_url.indexOf("postreview"));
  let params = useParams();
  let id = params.id;
  let dealer_url = `${root_url}djangoapp/dealer/${id}`;
  let review_url = `${root_url}djangoapp/add_review`;
  let carmodels_url = `${root_url}djangoapp/get_cars`;

  const postReview = async () => {
    let name = sessionStorage.getItem("firstname") + " " + sessionStorage.getItem("lastname");
    if (name.includes("null")) {
      name = sessionStorage.getItem("username");
    }

    if (!model || review === "" || date === "" || year === "") {
      alert("All details are mandatory");
      return;
    }

    let model_split = model.split(" ");
    let make_chosen = model_split[0];
    let model_chosen = model_split[1];

    let jsoninput = JSON.stringify({
      name: name,
      dealership: id,
      review: review,
      purchase: true,
      purchase_date: date,
      car_make: make_chosen,
      car_model: model_chosen,
      car_year: year,
    });

    try {
      const res = await fetch(review_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsoninput,
      });

      const json = await res.json();
      if (json.status === 200) {
        window.location.href = window.location.origin + "/dealer/" + id;
      } else {
        setError("Failed to post review");
      }
    } catch (error) {
      setError("An error occurred while posting the review");
    }
  };

  const getDealer = async () => {
    try {
      const res = await fetch(dealer_url, { method: "GET" });
      const retobj = await res.json();

      if (retobj.status === 200) {
        let dealerobjs = Array.from(retobj.dealer);
        if (dealerobjs.length > 0) setDealer(dealerobjs[0]);
      }
    } catch (error) {
      setError("An error occurred while fetching dealer information");
    }
  };

  const getCars = async () => {
    try {
      const res = await fetch(carmodels_url, { method: "GET" });
      const retobj = await res.json();

      let carmodelsarr = Array.from(retobj.CarModels);
      setCarmodels(carmodelsarr);
    } catch (error) {
      setError("An error occurred while fetching car models");
    }
  };

  useEffect(() => {
    getDealer();
    getCars();
  }, []);

  return (
    <div>
      <Header />
      <div style={{ margin: "5%" }}>
        <h1 style={{ color: "darkblue" }}>{dealer.full_name}</h1>
        {error && <div className="error">{error}</div>}
        <textarea
          id='review'
          cols='50'
          rows='7'
          placeholder="Write your review here..."
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <div className='input_field'>
          <label htmlFor="purchase_date">Purchase Date:</label>
          <input
            type="date"
            id="purchase_date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className='input_field'>
          <label htmlFor="car_model">Car Make and Model:</label>
          <select
            id="car_model"
            onChange={(e) => setModel(e.target.value)}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Choose Car Make and Model
            </option>
            {carmodels.map((carmodel) => (
              <option key={carmodel.CarModel} value={`${carmodel.CarMake} ${carmodel.CarModel}`}>
                {carmodel.CarMake} {carmodel.CarModel}
              </option>
            ))}
          </select>
        </div>
        <div className='input_field'>
          <label htmlFor="car_year">Car Year:</label>
          <input
            type="number"
            id="car_year"
            onChange={(e) => setYear(e.target.value)}
            max={new Date().getFullYear()}
            min={2015}
          />
        </div>
        <div>
          <button className='postreview' onClick={postReview}>Post Review</button>
        </div>
      </div>
    </div>
  );
};

export default PostReview;

