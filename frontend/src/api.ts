import axios from "axios";

// Post with form data as body

export type LoginResponse = {
    token: string;
    };
export const logIn = async (url: string, username: string, password: string) => {
  if (username === "" || password === "") {
    throw new Error("Username or password is empty");
  }
  const formData = new FormData();
  formData.append("username", username);
  formData.append("password", password);
  const response = await axios.postForm(
    process.env.REACT_APP_API_ENDPOINT + url, 
    formData);
  return response;
}