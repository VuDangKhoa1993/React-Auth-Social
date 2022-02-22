import React, { useState } from 'react'
import '../Login/style.css'
import { loginWithPhoneNumber } from '../../firebase'
import { useNavigate } from "react-router-dom";

export const LoginBySms = () => {
    const [step, setStep] = useState('INPUT_PHONE_NUMBER')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [otpCode, setOtpCode] = useState('')
    const [confirmationResult, setConfirmationResult] = useState('')
    const navigate = useNavigate()
    
    const handleLogin = async () => {
        // check valid phone number
        if (!phoneNumber) return
        // verify phone number here
        const result = await loginWithPhoneNumber(phoneNumber)
        if (result) {
            setStep('VERIFY_OTP')
            setConfirmationResult(result)
        }
    }

    const handleVerifyOTP = async () => {
        // check valid otp
        if (!otpCode) return
        // verify otp code
        const credential = await confirmationResult.confirm(otpCode)
        if (credential) {
            setStep('VALID_OTP')
            navigate('/dashboard')
        } else {
            setStep('INVALID_OTP')
        }
    }

    const handleSteps = (step) => {
        if (step === 'INPUT_PHONE_NUMBER') {
            return (
                <>
                    <input
                        className='login__textbox'
                        value={phoneNumber}
                        placeholder="Enter a phone number"
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <br />
                    <div id="recaptcha-container"
                        data-sitekey="6LcsaxsdAAAAAEBn0sPDCEncnU9564MisyRuDzD_"
                        data-callback="sendForm"
                        data-size="invisible">
                    </div>
                    <button
                        className='login__btn_sms'
                        onClick={handleLogin}
                    >Sign In</button>
                </>
            )
        } else if (step === 'VERIFY_OTP' || step === 'INVALID_OTP') {
            return (
                <>
                    <input
                        className='login__textbox'
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                    />
                    <br />
                    <button
                        className='login__btn_sms'
                        onClick={handleVerifyOTP}
                    >Verify OTP</button>
                </>
            )
        }
        return null
    }

    return (
        <>
            <div className='login'>
                <div className='login__container'>
                    {handleSteps(step)}
                </div>
            </div>
        </>
    )
}
