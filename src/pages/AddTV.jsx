import { useContext, useEffect, useState } from "react";
import useSpeechToText from "../hooks/useSpeechToText";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { TVsStore } from "../context/TVsContext";


const AddTV = () => {
    // Color palette from the image
    const bgColor = "#F5E6C5";
    const cardColor = "#FFF8DC";
    const borderColor = "#A87C55";
    const buttonColor = "#D46233";
    const accentColor = "#E1BA7E";

    const [formData, setFormData] = useState({
        customerName: '',
        contact: '',
        brand: '',
        size: '',
        problem: '',
    });

    const [error, setError] = useState({
        customerName: '',
        contact: '',
        brand: '',
        size: '',
        problem: '',
    });

    const navigate = useNavigate();
    const { tvData, fetchData, handleUpdate, updateId } = useContext(TVsStore)
    const { text, isListening, startListening, stopListening } = useSpeechToText();

    useEffect(() => {
        if (text) {
            setFormData((prev) => ({ ...prev, customerName: text }));
        }
    }, [text]);

    useEffect(() => {
        if (updateId) {
            setFormData(updateId);
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setError({ ...error, [name]: "" });
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!formData.customerName.trim()) {
            formErrors.customerName = "Customer name is required.";
            isValid = false;
        }

        if (!formData.contact.trim()) {
            formErrors.contact = "Contact number is required.";
            isValid = false;
        } else if (!/^[6-9]\d{9}$/.test(formData.contact)) {
            formErrors.contact = "Enter a valid 10-digit number.";
            isValid = false;
        }

        if (!formData.brand.trim()) {
            formErrors.brand = "TV Brand is required.";
            isValid = false;
        }

        if (!formData.size.trim()) {
            formErrors.size = "TV size is required.";
            isValid = false;
        } else if (isNaN(formData.size) || formData.size < 10 || formData.size > 120) {
            formErrors.size = "Enter a valid TV size (10-120 inches).";
            isValid = false;
        }

        if (!formData.problem) {
            formErrors.problem = "Please select a problem.";
            isValid = false;
        }

        setError(formErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fill the form before submitting.", { position: "top-right" });
            return;
        }

        try {
            await addDoc(collection(db, "TVs"), { ...formData, date: new Date(), isWorkDone: false, isdelivered: false });
            setFormData({
                customerName: '',
                contact: '',
                brand: '',
                size: '',
                problem: '',
            });
            fetchData();
            toast.success("Request submitted successfully!", { position: "top-center" });
            navigate("/")
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Try again!", { position: "top-right" });
        }
    };

    return (
        <section
            className="min-h-screen flex items-center justify-center px-4 sm:px-6"
            style={{ background: bgColor }}
        >
            <div
                className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-4 sm:p-8 lg:p-10 flex flex-col md:flex-row gap-8"
                style={{ background: cardColor, border: `2px solid ${borderColor}` }}
            >
                {/* Image Section */}
                <div className="md:w-1/2 my-auto">
                    <div className="">
                        <img
                            src={"/images/customer-service.png"}
                            alt="Customer at Service Center"
                            className="w-full rounded-xl border"
                            style={{ borderColor: borderColor, borderWidth: 3 }}
                        />
                    </div>
                    <button
                        onClick={() => navigate("/")}
                        type="button"
                        className="w-full mt-5 font-semibold py-2 rounded-xl shadow-lg transition-colors duration-300 ease-in-out"
                        style={{
                            background: buttonColor,
                            color: "#fff",
                            fontSize: "1.05rem"
                        }}
                    >
                        Dashboard
                    </button>
                </div>
                {/* Form Section */}
                <div className="md:w-1/2">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: borderColor }}>
                        📋 {updateId ? "Update" : "Add"} TV Service Request
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4 text-gray-700"
                    >
                        {/* Customer Name */}
                        <div>
                            <div className="relative">
                                <label htmlFor="customerName" className="text-sm font-medium">
                                    Customer Name
                                </label>
                                <input
                                    type="text"
                                    name="customerName"
                                    id="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className={`w-full ps-4 pe-10 py-2 mt-1 outline-0 rounded-md border ${error.customerName ? "border-red-400" : "border-gray-300"
                                        } focus:ring-2 focus:ring-yellow-300`}
                                    style={{ borderColor: error.customerName ? buttonColor : accentColor }}
                                />
                                {/* Speech Button */}
                                <button
                                    type="button"
                                    className={`mic-btn absolute top-8 right-2 ${isListening ? "listening" : ""}`}
                                    title="Speech to text"
                                    onClick={() => {
                                        isListening ? stopListening() : startListening();
                                    }}
                                    style={{ color: buttonColor }}
                                >
                                    <span className="mic-wave"></span>
                                    <span className="mic-icon">🎙️</span>
                                </button>
                            </div>
                            {error.customerName && <p className="text-xs text-red-500 mt-1">{error.customerName}</p>}
                        </div>

                        {/* Contact */}
                        <div>
                            <label htmlFor="contact" className="text-sm font-medium">
                                Contact
                            </label>
                            <input
                                type="number"
                                name="contact"
                                id="contact"
                                value={formData.contact}
                                onChange={handleChange}
                                placeholder="9876543210"
                                className={`w-full px-4 py-2 mt-1 outline-0 rounded-md border ${error.contact ? "border-red-400" : "border-gray-300"
                                    } focus:ring-2 focus:ring-yellow-300`}
                                style={{ borderColor: error.contact ? buttonColor : accentColor }}
                            />
                            {error.contact && <p className="text-xs text-red-500 mt-1">{error.contact}</p>}
                        </div>

                        {/* Brand */}
                        <div>
                            <label htmlFor="brand" className="text-sm font-medium">
                                Brand Name
                            </label>
                            <input
                                type="text"
                                name="brand"
                                id="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="Samsung, LG, Sony"
                                className={`w-full px-4 py-2 mt-1 outline-0 rounded-md border ${error.brand ? "border-red-400" : "border-gray-300"
                                    } focus:ring-2 focus:ring-yellow-300`}
                                style={{ borderColor: error.brand ? buttonColor : accentColor }}
                            />
                            {error.brand && <p className="text-xs text-red-500 mt-1">{error.brand}</p>}
                        </div>

                        {/* TV Size */}
                        <div>
                            <label htmlFor="size" className="text-sm font-medium">
                                TV Size (inches)
                            </label>
                            <input
                                type="number"
                                name="size"
                                id="size"
                                value={formData.size}
                                onChange={handleChange}
                                placeholder="32, 43, 55"
                                className={`w-full px-4 py-2 mt-1 outline-0 rounded-md border ${error.size ? "border-red-400" : "border-gray-300"
                                    } focus:ring-2 focus:ring-yellow-300`}
                                style={{ borderColor: error.size ? buttonColor : accentColor }}
                            />
                            {error.size && <p className="text-xs text-red-500 mt-1">{error.size}</p>}
                        </div>

                        {/* Problem */}
                        <div>
                            <label htmlFor="problem" className="text-sm font-medium">
                                Problem
                            </label>
                            <select
                                name="problem"
                                id="problem"
                                value={formData.problem}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 mt-1 outline-0 rounded-md border ${error.problem ? "border-red-400" : "border-gray-300"
                                    } focus:ring-2 focus:ring-yellow-300`}
                                style={{ borderColor: error.problem ? buttonColor : accentColor }}
                            >
                                <option value="" disabled>-- Select Problem --</option>
                                <option value="Motherboard">Motherboard</option>
                                <option value="Power Supply">Power Supply</option>
                                <option value="Back Light">Back Light</option>
                                <option value="Display">Display</option>
                                <option value="Audio">Audio</option>
                                <option value="Complete Dead">Complete Dead</option>
                            </select>
                            {error.problem && <p className="text-xs text-red-500 mt-1">{error.problem}</p>}
                        </div>

                        {/* Submit Button */}
                        <div className="pt-2">
                            {updateId ? <button
                                type="button"
                                onClick={() => {
                                    if (!validateForm()) {
                                        toast.error("Please fix the errors before submitting.", { position: "top-right" });
                                        return;
                                    }
                                    handleUpdate(updateId, formData);
                                    setFormData(
                                        {
                                            customerName: '',
                                            contact: '',
                                            brand: '',
                                            size: '',
                                            problem: '',
                                        }
                                    )
                                    navigate("/")
                                }}
                                className="w-full font-semibold py-3 bg-blue-500 rounded-xl shadow-lg transition-colors duration-300 ease-in-out"
                                style={{
                                    color: "#fff",
                                    border: `1px solid ${borderColor}`,
                                    fontSize: "1.05rem"
                                }}
                            >
                                Update Request
                            </button> : <button
                                type="submit"
                                className="w-full font-semibold py-3 rounded-xl shadow-lg transition-colors duration-300 ease-in-out"
                                style={{
                                    background: buttonColor,
                                    color: "#fff",
                                    fontSize: "1.05rem"
                                }}
                            >
                                Submit Request
                            </button>}
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default AddTV;
