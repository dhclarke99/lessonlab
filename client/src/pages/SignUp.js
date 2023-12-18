import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_USER, LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    });
    const [createUser, { error, data }] = useMutation(CREATE_USER);
const [loginUser] = useMutation(LOGIN_USER);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log(formData)
          const { data } = await createUser({
            variables: { input: { ...formData, } },
          });
    console.log(data)
          Auth.login(data.createUser.token);
        } catch (e) {
          console.error(e);
        }
    
    
      };

      
    const handleLogin = async (event) => {
        event.preventDefault();
        console.log(formData)
        const {firstname, lastname, ...cleanedFormData} = {...formData}
        console.log(cleanedFormData)
        try {
            
          const { data } = await loginUser({
            variables: { ...cleanedFormData, },
          });
    console.log(data)
    localStorage.setItem("userId", data.login.user._id)
          Auth.login(data.login.token);
        } catch (e) {
          console.error(e);
        }
    
    
      };
    return (
        <div>
        <form onSubmit={handleFormSubmit}>
            <input 
                type="text" 
                name="firstname" 
                value={formData.firstname} 
                onChange={handleChange} 
                placeholder="First Name" 
                required 
            />
            <input 
                type="text" 
                name="lastname" 
                value={formData.lastname} 
                onChange={handleChange} 
                placeholder="Last Name" 
                required 
            />
            <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                required 
            />
            <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Password" 
                required 
            />
            <button type="submit">Sign Up</button>
        </form>
        <h1>Login</h1>
        <form onSubmit={handleLogin}> 
            <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Email" 
                required 
            />
            <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                placeholder="Password" 
                required 
            />
            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default SignUp;
