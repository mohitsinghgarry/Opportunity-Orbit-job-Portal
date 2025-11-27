// API utility functions
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const apiEndpoints = {
    getAllJobs: `${API_BASE_URL}/all-jobs`,
    getJobById: (id) => `${API_BASE_URL}/all-jobs/${id}`,
    getMyJobs: (email) => `${API_BASE_URL}/myJobs/${email}`,
    postJob: `${API_BASE_URL}/post-job`,
    updateJob: (id) => `${API_BASE_URL}/update-job/${id}`,
    deleteJob: (id) => `${API_BASE_URL}/job/${id}`,
    applyToJob: (id) => `${API_BASE_URL}/job/${id}/apply`
};

// Generic API call function with error handling
export const apiCall = async (url, options = {}) => {
    try {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};