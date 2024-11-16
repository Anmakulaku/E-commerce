import { IoArrowBackCircle } from "react-icons/io5";

import { useNavigate } from "react-router-dom";
import React from "react";
import "./BackButton.css"

const BackButton: React.FC = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };
    return (
        <button className="back__button" onClick={handleBack}>
            <IoArrowBackCircle size={30} />
        </button>
    )
}

export default BackButton;