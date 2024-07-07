import React, { useState } from "react";
import "./BMIForm.css";

const BMIForm = () => {
  const genders = {
    male: "M",
    female: "F",
  };

  const [formData, setFormData] = useState({
    gender: "M",
    age: "",
    height: "",
    weight: "",
    result: null,
  });

  const [bmi, setBmi] = useState(null);
  const [bmiCategory, setBmicategory] = useState(null);
  let numRegex = /^[0-9 ]+$/;

  const [error, setError] = useState({
    gender: false,
    age: false,
    height: false,
    weight: false,
  });

  const onFormChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "gender" ||
      numRegex.test(e.target.value) ||
      e.target.value === ""
    ) {
      setFormData({ ...formData, [name]: value });
      setError({ ...error, [name]: false });
    } else {
      console.log(`invalid value: in ${name}: `, value);
      const newError = { ...error, [name]: true };
      setError({ ...newError });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const BMIResult = (
      (formData.weight / (formData.height * formData.height)) *
      10000
    ).toFixed(2);
    setBmi(BMIResult);
    console.log(checkCalled());
    setBmicategory(getBMICategory(BMIResult));
    setFormData({ ...formData, result: BMIResult });
  };

  const getBMICategory = (bmi) => {
    console.log("BMI value is ", bmi);
    if (bmi < 18.5) return "Underweight";
    if (bmi < 24.9) return "Normal weight";
    if (bmi < 29.9) return "Overweight";
    return "Obesity";
  };

  const checkCalled = () => {
    return "called ";
  };

  const resetFormData = () => {
    setFormData({
      gender: "M",
      age: "",
      height: "",
      weight: "",
      result: "",
    });
    setError({ gender: false, age: false, height: false, weight: false });
  };
  return (
    <div className="bmi-main-div">
      <h2>BMI Calculator </h2>
      <form className="bmi-form" onSubmit={submitForm}>
        <div>
          <label>Gender:</label>
          <input
            type="radio"
            id="male"
            name="gender"
            value="M"
            checked={genders.male === formData.gender}
            onChange={onFormChange}
          />
          <label>Male</label>
          <input
            type="radio"
            id="female"
            name="gender"
            value="F"
            checked={genders.female === formData.gender}
            onChange={onFormChange}
          />
          <label>Female</label>
        </div>
        <div>
          <label>Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={onFormChange}
            maxLength={2}
            style={{ marginLeft: "32px", width: "60px" }}
          ></input>
          {error.age && (
            <span
              style={{ marginLeft: "5px", color: "red", fontSize: "12px" }}
            >{`Incorrect age`}</span>
          )}
        </div>
        <div>
          <label>Height:</label>
          <input
            type="text"
            id="height"
            name="height"
            value={formData.height}
            onChange={onFormChange}
            maxLength={3}
            style={{ marginLeft: "12px", width: "60px" }}
          ></input>
          <label
            style={{
              marginLeft: "2px",
              fontFamily: "cursive",
              fontSize: "10px",
            }}
          >
            cm
          </label>
          {error.height && (
            <span
              style={{ marginLeft: "5px", color: "red", fontSize: "12px" }}
            >{`Incorrect height`}</span>
          )}
        </div>
        <div>
          <label>Weight:</label>
          <input
            type="text"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={onFormChange}
            maxLength={3}
            style={{ marginLeft: "10px", width: "60px" }}
          ></input>
          <label
            style={{
              marginLeft: "2px",
              fontFamily: "cursive",
              fontSize: "10px",
            }}
          >
            kg
          </label>
          {error.weight && (
            <span
              style={{ marginLeft: "5px", color: "red", fontSize: "12px" }}
            >{`Incorrect weight`}</span>
          )}
        </div>
        <button type="submit" style={{ background: "steelBlue" }}>
          Submit
        </button>
        <button style={{ marginLeft: "30px" }} onClick={resetFormData}>
          Reset
        </button>
        <div>
          <label>BMI:</label>
          <input
            type="text"
            id="result"
            name="result"
            value={formData.result || ""}
            onChange={onFormChange}
            maxLength={3}
            style={{ marginLeft: "10px", width: "100px" }}
          ></input>
          {bmi && <h3>Category: {bmiCategory}</h3>}
        </div>
      </form>
    </div>
  );
};

export default BMIForm;
