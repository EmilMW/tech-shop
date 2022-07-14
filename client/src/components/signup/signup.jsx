import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import "./signup.scss";
import Button from "@mui/material/Button";
import { fetcher } from "../../helpers/fetcher";
import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const loginSubmit = async (e) => {
    navigate("/login");
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const result = await fetcher(`/auth/signup`, "POST", {
      username,
      password,
      userType,
      address,
      phone,
    });
    console.log("result", result);
    if (result.status !== 500) {
      alert("Added successfully");
    } else {
      alert("Error: " + result.message);
    }
  };

  return (
    <div id="signup">
      <form className="form">
        <div className="title">SIGN UP</div>
        <TextField
          label="Username"
          InputProps={{
            name: "username",
            id: "username",
            value: username,
            autoComplete: "on",
            onChange: (e) => setUsername(e.target.value),
          }}
        />
        <br />
        <TextField
          label="Password"
          InputProps={{
            name: "password",
            id: "password",
            type: "password",
            value: password,
            autoComplete: "on",
            onChange: (e) => setPassword(e.target.value),
          }}
        />
        <br />
        <TextField
          label="Address"
          InputProps={{
            name: "address",
            id: "address",
            type: "address",
            value: address,
            autoComplete: "on",
            onChange: (e) => setAddress(e.target.value),
          }}
        />
        <br />
        <TextField
          label="Phone"
          InputProps={{
            name: "phone",
            id: "phone",
            type: "phone",
            value: phone,
            autoComplete: "on",
            onChange: (e) => setPhone(e.target.value),
          }}
        />
        <br />

        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">Type:</FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <FormControlLabel value="user" control={<Radio />} label="User" />
            <FormControlLabel
              value="premium-user"
              control={<Radio />}
              label="Premium User"
            />
          </RadioGroup>
        </FormControl>

        <br />
        <Button
          className="button"
          type="submit"
          variant="contained"
          onClick={handleCreate}
        >
          Sign Up
        </Button>
        <br />
        <div>
          <div className="text">Do you already have an account?</div>
          <Button className="button" variant="contained" onClick={loginSubmit}>
            Login
          </Button>
        </div>
        <br />
      </form>
    </div>
  );
};

export default SignUp;
