import React, { useState } from "react"
import { Link } from "react-router-dom"

export default function Signup() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        dob: "",
        collegeName: "",
        age: "",
        percentage10: "",
        percentage12: "",
        cgpa: "",
        phone: "",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!")
            return
        }

        const response= fetch("http://localhost:5000/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                dob: formData.dob,
                collegeName: formData.collegeName,
                age: Number.parseInt(formData.age),
                percentage10: Number.parseFloat(formData.percentage10),
                percentage12: Number.parseFloat(formData.percentage12),
                cgpa: Number.parseFloat(formData.cgpa),
                phone: formData.phone,
            }),
        })
        if (!response.ok) {
            const errorData = await response.json()
            console.error("Signup failed:", errorData)
            alert("Signup failed: " + errorData.message)
            return
        }
        const newUser = await response.json()
        localStorage.setItem("user", JSON.stringify(newUser.user))
        localStorage.setItem("token", newUser.token)
        window.location.href = "/dashboard"

        console.log("New User:", newUser)
        // Handle signup logic here
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign in here
                    </Link>
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        {/* Personal Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username *
                                    </label>
                                    <input
                                        type="text"
                                        name="username"
                                        id="username"
                                        required
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter username"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter email"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        id="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                                        Date of Birth *
                                    </label>
                                    <input
                                        type="date"
                                        name="dob"
                                        id="dob"
                                        required
                                        value={formData.dob}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                                        Age *
                                    </label>
                                    <input
                                        type="number"
                                        name="age"
                                        id="age"
                                        required
                                        min="16"
                                        max="100"
                                        value={formData.age}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter age"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Educational Information */}
                        <div className="border-b border-gray-200 pb-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Educational Information</h3>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">
                                        College Name *
                                    </label>
                                    <input
                                        type="text"
                                        name="collegeName"
                                        id="collegeName"
                                        required
                                        value={formData.collegeName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter college name"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="percentage10" className="block text-sm font-medium text-gray-700">
                                        10th Grade Percentage *
                                    </label>
                                    <input
                                        type="number"
                                        name="percentage10"
                                        id="percentage10"
                                        required
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={formData.percentage10}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter 10th percentage"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="percentage12" className="block text-sm font-medium text-gray-700">
                                        12th Grade Percentage *
                                    </label>
                                    <input
                                        type="number"
                                        name="percentage12"
                                        id="percentage12"
                                        required
                                        min="0"
                                        max="100"
                                        step="0.01"
                                        value={formData.percentage12}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter 12th percentage"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">
                                        CGPA *
                                    </label>
                                    <input
                                        type="number"
                                        name="cgpa"
                                        id="cgpa"
                                        required
                                        min="0"
                                        max="10"
                                        step="0.01"
                                        value={formData.cgpa}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter CGPA"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Password Section */}
                        <div>
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Security</h3>

                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Enter password"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                        Confirm Password *
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        required
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>
                        </div>                        

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
