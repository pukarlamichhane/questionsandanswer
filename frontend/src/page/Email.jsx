import  { useState, useEffect, useRef } from 'react';

const Email = () => {
  const [verificationCodes, setVerificationCodes] = useState(['', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isResendActive, setIsResendActive] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!isVerified && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !isVerified) {
      setIsResendActive(true);
    }
  }, [isVerified, timer]);

  const handleVerify = () => {
    setIsVerified(true);
  };

  const handleResend = () => {
    setTimer(60);
    setIsVerified(false);
    setIsResendActive(false);
    // Reset all input fields
    setVerificationCodes(['', '', '', '']);
    // Focus on the first input field
    inputRefs.current[0].focus();
  };

  const handleChange = (e, index) => {
    const newCodes = [...verificationCodes];
    newCodes[index] = e.target.value;
    setVerificationCodes(newCodes);
    // Move focus to the next input field if available
    if (e.target.value.length === 1 && index < verificationCodes.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        {isVerified ? (
          <>
            <p className="text-green-500">Email Verified Successfully!</p>
            <p className="text-gray-700 mt-2">{`Your email: `}</p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
            <div className="mb-4">
              <p className="text-gray-700 mb-2">Enter the verification codes sent to your email:</p>
              <div className="flex space-x-2">
                {verificationCodes.map((code, index) => (
                  <input
                    key={index}
                    type="text"
                    className="border rounded w-10 py-2 px-3"
                    value={code}
                    onChange={(e) => handleChange(e, index)}
                    ref={(input) => (inputRefs.current[index] = input)}
                  />
                ))}
              </div>
            </div>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleVerify}
            >
              Verify
            </button>
            <p className="text-gray-700 mt-2">{`Time remaining: ${timer} seconds`}</p>
            {isResendActive && (
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 mt-2"
                onClick={handleResend}
              >
                Resend
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Email;
