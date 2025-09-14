// src/utils/authUtils.js
export const getAuthHeaders = () => {
  const token = localStorage.getItem("jwtToken");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    "Content-Type": "application/json",
  };
};

export const handleAuthError = (response, navigate) => {
  if (response.status === 401) {
    // Token expired or invalid
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    alert("Session expired. Please login again.");
    navigate("/login");
    return true;
  } else if (response.status === 403) {
    alert("Access denied. You do not have permission to perform this action.");
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("jwtToken");
};

export const getUserRole = () => {
  const user = localStorage.getItem("user");
  if (user) {
    try {
      const userData = JSON.parse(user);
      return userData.role?.roleName;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  }
  return null;
};

export const isAdmin = () => {
  return getUserRole() === "Admin";
};
