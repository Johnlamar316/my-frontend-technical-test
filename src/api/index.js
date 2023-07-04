// eslint-disable-next-line no-unused-vars
import { request } from "./helpers";

/**
 * Pull vehicles information
 *
 * @return {Promise<Array.<vehicleSummaryPayload>>} 
 */
// TODO: All API related logic should be made inside this function.
export default async function getData() {
    try {
        const vehicles = await request("/api/vehicles.json");
        const vehicleDetailsPromises = vehicles.map(async (vehicle) => {
            try {
                const details = await request(vehicle.apiUrl);
                if (!details || !details.price) {
                    return null; // Ignore vehicles without valid price
                }
                return {
                    ...vehicle,
                    ...details,
                };
            } catch (error) {
                return null; // Ignore failed API calls during traversing
            }
        });
        const vehicleDetails = await Promise.all(vehicleDetailsPromises);
        return vehicleDetails.filter((vehicle) => vehicle !== null);
    } catch (error) {
        throw new Error("An error occurred");
    }
}
