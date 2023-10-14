export const getUserLocation = () => new Promise((resolve, reject) => {
    return navigator.geolocation.getCurrentPosition(
        location => resolve(location),
        error => reject(error),
    )
})