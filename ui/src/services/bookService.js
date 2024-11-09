import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}/books`

export const getBooks = async (page = 1, limit = 10, title = "", year = "") => {
  try {
    const response = await axios.get(`${API_URL}`, {
      params: { page, limit, title, year },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const createBook = async (bookData) => {
  const response = await axios.post(`${API_URL}`, bookData);
  return response.data;
};

export const deleteBook = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    throw new Error("Error deleting book");
  }
};
