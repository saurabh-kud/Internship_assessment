import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    gender: "man",
    address: "",
  });

  const [isError, setError] = useState("");

  const { name, phone, address, gender } = formData;

  //geting inputed data when change happen
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handlesubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !phone || !address || !gender) {
      toast.error("all field is required");
    }
    if (name && phone && address && gender) {
      if (name.length < 3) {
        toast.error("name should be atleast 3 char");
      } else if (phone.length < 10 || phone.length > 10) {
        toast.error("phone number should be 10 digits");
      } else if (address.length < 10) {
        toast.error("address should be atleaset 10 char");
      } else {
        //call to firebase for storing form data
        try {
          const res = await fetch(process.env.REACT_APP_FIREBASE_URL, {
            method: "post",
            mode: "no-cors",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify(formData),
          });

          if (res) {
            toast.success("sucess");
            setFormData({ name: "", phone: "", gender: "man", address: "" });
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setError("");
    }, 2000);
  }, [isError]);

  return (
    <>
      <div className="container1">
        <div className="innerform">
          <form onSubmit={handleSubmit}>
            <h3>Fill this form</h3>
            <span className="error">{isError}</span>
            <label>Name</label>
            <input
              placeholder="Xyz  kumar"
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
            />

            <label>Phone </label>
            <input
              placeholder="9999999999"
              type="number"
              name="phone"
              value={phone}
              onChange={handleChange}
            />
            <label>Gender</label>
            <div>
              <select
                style={{ width: "150px", height: "30px" }}
                onChange={handleChange}
                value={gender}
                name="gender"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Transgender</option>
              </select>
            </div>
            <label>Address</label>
            <textarea
              rows="2"
              name="address"
              value={address}
              onChange={handleChange}
            ></textarea>
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default App;
