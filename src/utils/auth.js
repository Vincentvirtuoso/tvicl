export const clearUser = () => {
  setUser(null);
  localStorage.removeItem("tvicl_user");
  delete axios.defaults.headers.common["Authorization"];
};
