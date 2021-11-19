export const handleResponse = (itemRes, history)=>{
    if (itemRes.statusCodeValue === 401) {
        history.push(`/login`);
      }
}