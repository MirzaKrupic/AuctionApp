export const handleResponse = (itemRes) => {
  if (itemRes.status === 401) {
    window.location = "/login";
  }
};
