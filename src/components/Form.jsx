import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Country, State, City } from 'country-state-city';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import './form.css';

const Form = () => {
  console.log('Form component rendered');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    phoneNo: '',
    country: '',
    state: '',
    city: '',
    panNo: '',
    aadharNo: '',
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First Name is required';
    if (!formData.lastName) newErrors.lastName = 'Last Name is required';
    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.phoneNo) newErrors.phoneNo = 'Phone Number is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    // if (!formData.city) newErrors.city = 'City is required';
    if (!formData.panNo) newErrors.panNo = 'Pan Number is required';
    if (!formData.aadharNo) newErrors.aadharNo = 'Aadhar Number is required';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === 'country') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        state: '',
        city: '',
      }));
      const statesData = State.getStatesOfCountry(value);
      setStates(statesData);
      console.log('States Data:', statesData);
      setCities([]);
    }

    if (name === 'state') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        city: '',
      }));
      const citiesData = City.getCitiesOfState(formData.country, value);
      setCities(citiesData);
      console.log('Cities Data:', citiesData);
    }
  };

  const handlePhoneChange = (value) => {
    setFormData({
      ...formData,
      phoneNo: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      navigate('/success', { state: { formData } });
    }
  };

  const countryOptions = Country.getAllCountries().map((country) => (
    <option key={country.isoCode} value={country.isoCode}>
      {country.name}
    </option>
  ));

  const stateOptions =
    formData.country &&
    states.map((state) => (
      <option key={state.isoCode} value={state.isoCode}>
        {state.name}
      </option>
    ));

  const cityOptions =
    formData.state &&
    (cities.length > 0
      ? cities.map((city) => {
          return (
            <option key={city.name} value={city.name}>
              {city.name}
            </option>
          );
        })
      : [<option key="no-cities" value="">No cities available</option>]);

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="input"
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>

        <div className="field">
          <label className="label">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="input"
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>

        <div className="field">
          <label className="label">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="input"
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="field">
          <label className="label">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="input"
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="field">
          <label className="label">Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="input"
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="button">
            {showPassword ? 'Hide' : 'Show'}
          </button>
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="field">
          <label className="label">Phone No.</label>
          <PhoneInput
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handlePhoneChange}
            className="input"
            defaultCountry="US"
          />
          {errors.phoneNo && <p className="error">{errors.phoneNo}</p>}
        </div>

        <div className="field">
          <label className="label">Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="select"
          >
            <option value="">Select Country</option>
            {countryOptions}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>

        <div className="field">
          <label className="label">State</label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="select"
            disabled={!formData.country}
          >
            <option value="">Select State</option>
            {stateOptions}
          </select>
          {errors.state && <p className="error">{errors.state}</p>}
        </div>

        <div className="field">
          <label className="label">City</label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="select"
            disabled={!formData.state}
          >
            <option value="">Select City</option>
            {cityOptions}
          </select>
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div className="field">
          <label className="label">PAN No.</label>
          <input
            type="text"
            name="panNo"
            value={formData.panNo}
            onChange={handleChange}
            className="input"
          />
          {errors.panNo && <p className="error">{errors.panNo}</p>}
        </div>

        <div className="field">
          <label className="label">Aadhar No.</label>
          <input
            type="text"
            name="aadharNo"
            value={formData.aadharNo}
            onChange={handleChange}
            className="input"
          />
          {errors.aadharNo && <p className="error">{errors.aadharNo}</p>}
        </div>

        <button type="submit" disabled={Object.keys(errors).length > 0} className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
