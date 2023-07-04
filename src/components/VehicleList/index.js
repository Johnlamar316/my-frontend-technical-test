import React, { useState, useEffect } from "react";
import useData from "./useData";
import "./style.scss";

export default function VehicleList() {
    // eslint-disable-next-line no-unused-vars
    const [loading, error, vehicles] = useData();

    if (loading) {
        return <div data-testid="loading">Loading...</div>;
    }

    if (error) {
        return <div data-testid="error">{error}</div>;
    }

    if (!Array.isArray(vehicles) || vehicles.length === 0) {
        console.log("No vehicles found");
    }

    return (
        <div data-testid="results" className="results-container">
            {Array.isArray(vehicles) &&
                vehicles.length > 0 &&
                vehicles.map((vehicle) => (
                    <div key={vehicle.id} className="vehicle-item">
                        <img src={vehicle.media[0].url} alt={vehicle.id} />
                        <div className="details-container">
                            <h2>{vehicle.media[0].name}</h2>
                            <p>From {vehicle.price}</p>
                            <p className="p-description">
                                {vehicle.description}
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
}
