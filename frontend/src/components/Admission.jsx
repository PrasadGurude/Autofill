import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Admission() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        dob: "",
        collegeName: "",
        age: "",
        percentage10: "",
        percentage12: "",
        cgpa: "",
        phone: "",
    });

    const navigate = useNavigate();

    useEffect(()=>{
        const fetchFormData = async () => {
            const userData = localStorage.getItem("user");
            if (userData) {
                const user = JSON.parse(userData);
                setFormData({
                    username: user.username || "",
                    email: user.email || "",
                    dob: user.dob || "",
                    collegeName: user.collegeName || "",
                    age: user.age || "",
                    percentage10: user.percentage10 || "",
                    percentage12: user.percentage12 || "",
                    cgpa: user.cgpa || "",
                    phone: user.phone || "",
                });
            }
        }
        fetchFormData();
    },[])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit =async (e) => {
        e.preventDefault();
        const res =await fetch("http://localhost:5000/api/form/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                formData: formData,
            }),
        })
        const admissionData = await res.json();
        if (!res.ok) {
            console.error("Error submitting form:", admissionData);
            alert("Failed to submit form: " + admissionData.message);
            return;
        }


        console.log("Admission Data:", admissionData);
        navigate("/dashboard");
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Admission Form
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Please fill in your academic and personal details
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <InputField label="Username" name="username" value={formData.username} onChange={handleChange} required />
                                <InputField label="Email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                <InputField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                                <InputField label="Date of Birth" name="dob" type="date" value={formData.dob ? new Date(formData.dob).toISOString().split('T')[0] : ""} onChange={handleChange} required />
                                <InputField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required min="16" max="100" />
                            </div>
                        </div>

                        {/* Educational Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Educational Information</h3>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <InputField label="College Name" name="collegeName" value={formData.collegeName} onChange={handleChange} required full />
                                <InputField label="10th Grade Percentage" name="percentage10" type="number" value={formData.percentage10} onChange={handleChange} required step="0.01" />
                                <InputField label="12th Grade Percentage" name="percentage12" type="number" value={formData.percentage12} onChange={handleChange} required step="0.01" />
                                <InputField label="CGPA" name="cgpa" type="number" value={formData.cgpa} onChange={handleChange} required step="0.01" max="10" />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit Admission
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

// ✅ Reusable input component
const InputField = ({
    label,
    name,
    type = "text",
    value,
    onChange,
    required = false,
    min,
    max,
    step,
    full = false,
}) => (
    <div className={full ? "sm:col-span-2" : ""}>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
            {label} {required ? "*" : ""}
        </label>
        <input
            type={type}
            name={name}
            id={name}
            required={required}
            value={value}
            onChange={onChange}
            min={min}
            max={max}
            step={step}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder={`Enter ${label.toLowerCase()}`}
        />
    </div>
);
