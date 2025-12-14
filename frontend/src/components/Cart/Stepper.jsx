import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Stepper = ({ activeStep, children }) => {

    const [steps] = useState([
        {
            stepNo: 1,
            label: "Login",
        },
        {
            stepNo: 2,
            label: "Shipping",
        },
        {
            stepNo: 3,
            label: "Payment",
        },
        {
            stepNo: 4,
            label: "Confirm Order",
        },
    ]);

    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        setCurrentStep(activeStep);
    }, [activeStep]);

    return (
        <div className="flex flex-col w-full">
            {/* Stepper */}
            <div className="flex items-center justify-center bg-gradient-to-r from-blue-500 to-primary-blue shadow-lg py-8">
                <div className="flex items-center w-full sm:w-4/6">
                    {steps.map((step, index) => (
                        <div key={step.stepNo} className="flex items-center w-full relative">
                            <div className="flex flex-col items-center w-full">
                                <div className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${currentStep >= step.stepNo ? 'bg-white text-primary-blue border-white' : 'bg-primary-blue text-white border-gray-300'} transition duration-200`}>
                                    <span className="font-medium text-sm">{step.stepNo}</span>
                                </div>
                                <span className={`mt-2 text-xs font-medium ${currentStep >= step.stepNo ? 'text-white' : 'text-gray-200'} hidden sm:block`}>
                                    {step.label}
                                </span>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`h-1 w-full ${currentStep > step.stepNo ? 'bg-white' : 'bg-gray-300'} transition duration-200`}></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="w-full">
                {children}
            </div>
        </div>
    );
};

export default Stepper;
