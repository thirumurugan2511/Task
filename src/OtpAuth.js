import React, { useEffect, useState, useRef } from 'react';
import './OtpAuth.css';
import { InputOtp } from 'primereact/inputotp';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpAuth = () => {
    const [otp, setOtp] = useState('');
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const notify = () => toast("OTP sent successfully to your email id");
    const buttonRef = useRef(null);

    useEffect(() => {
        if (buttonRef.current) {
            buttonRef.current.click();
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        const email = localStorage.getItem('email'); // Retrieve email from local storage

        if (!otp || otp.length !== 4) {
            setError('OTP must be exactly 4 digits');
            return;
        }

        try {
            const response = await fetch("https://bec5-121-200-51-234.ngrok-free.app/api/verify-otp", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, otp })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("OTP Verified:", data);
                navigate('/Dashboard');
            } else {
                const errorData = await response.json();
                setError(errorData.message || "OTP verification failed.");
            }
        } catch (error) {
            console.error("Error verifying OTP:", error);
            setError("An error occurred while verifying OTP. Please try again.");
        }
    };

    return (
        <>
        <section className="h-100 gradient-form" style={{ backgroundColor: "#eee" }}>
            <div className="h-100">
                <div className="d-flex justify-content-center align-items-center h-100">
                    <div className="">
                        <div className="card rounded-3 text-black">
                            <div className="row g-0">
                                <div className="col-lg-6">
                                    <div className="card-body p-md-5 mx-md-4">
                                        <div className="text-center">
                                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                style={{ width: "185px" }} alt="logo" />
                                            <h4 className="mt-1 mb-5 pb-4">We are The Lotus Team</h4>
                                        </div>
                                        <form>
                                            <p className='text-center mb-5'>Login with OTP</p>
                                            <div className="mb-5">
                                                <InputOtp className='row' value={otp} onChange={(e) => setOtp(e.value)} />
                                            </div>
                                            {error && <p className="text-danger">{error}</p>}
                                            <div className="text-center pt-2 mb-5 pb-5">
                                                <button data-mdb-button-init data-mdb-ripple-init onClick={handleSubmit} className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3 w-75" type='button'>Submit</button> <br />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                                        <h4 className="mb-4">We are more than just a company</h4>
                                        <p className="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className='d-none' id='btn' ref={buttonRef} onClick={notify}>Notify!</button>
                    <ToastContainer />
                </div>
            </div>
        </section>
        </>
    );
};

export default OtpAuth;
