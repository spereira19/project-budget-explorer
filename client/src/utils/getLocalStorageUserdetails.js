/*
export const getLocalStorageUserdetails = () => {
    const token = JSON.parse(localStorage.getItem("userInfo") || null);
    console.log('Getting local storage details')
    console.log(token)
    return token?.token;
  };*/

  export const getLocalStorageUserdetails = () => {
    try {
        // Get userInfo from localStorage
        const userInfoString = localStorage.getItem("userInfo");
        
        // If no userInfo exists, return null
        if (!userInfoString) {
            console.log('No userInfo found in localStorage');
            return null;
        }

        // Parse the JSON string
        const userInfo = JSON.parse(userInfoString);
        console.log('Parsed userInfo:', userInfo);

        // Check if token exists in userInfo
        if (!userInfo?.token) {
            console.log('No token found in userInfo');
            return null;
        }

        return userInfo.token;
    } catch (error) {
        console.error('Error getting token from localStorage:', error);
        return null;
    }
};