// Custom GET http request function
export const fetchData = (url, callback) => {
    const sendRequest = async () => {
        try {
            const res = await fetch(url);
        
            if (!res.ok) {
                // Hanlding errors
                return console.log("Error!")
            }
        
            const data = await res.json();
            callback(data);
        } catch (error) {
            // Handling errors
            console.log("Error!")
        }
    }

    sendRequest();
}


// Calculate discounted Price
export const discountedPrice = (price, discountPercentage) => {
    return ((price - (price * (discountPercentage/100))).toFixed(2));
}