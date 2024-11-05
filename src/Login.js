import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setError('Email is required');
            return;
        } else if (!password) {
            setError('Password is required');
            return;
        } else if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch('https://bec5-121-200-51-234.ngrok-free.app/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Store email and password in local storage
                localStorage.setItem('email', email);
                localStorage.setItem('password', password);

                navigate('/OtpAuth');
            } else {
                setError(data.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <section className="h-100 gradient-form" style={{ backgroundColor: '#eee' }}>
            <div className="h-100">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img
                                                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style={{ width: '185px' }}
                                                alt="logo"
                                            />
                                            <h4 className="mt-1 mb-5 pb-1">We are The Lotus Team</h4>
                                        </div>
                                        <form onSubmit={handleSubmit}>
                                            <p className="text-start fw-bold">Please login to your account</p>
                                            <div className="form-floating mb-4">
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="floatingEmail"
                                                    placeholder="Enter your Email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="floatingEmail">Email</label>
                                            </div>
                                            <div className="form-floating mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="floatingPassword"
                                                    placeholder="Password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                                <label htmlFor="floatingPassword">Password</label>
                                            </div>
                                            {error && <p className="text-danger">{error}</p>}
                                            <div className="text-center mb-5 pb-5">
                                                <button type="submit" className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 mt-5 w-100">
                                                    Log in
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
