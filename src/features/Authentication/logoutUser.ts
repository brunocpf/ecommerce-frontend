const logoutUser = async () => {
  const response = await fetch('/api/auth/logout', {
    method: 'POST',
  });

  if (!response.ok) {
    var errorResponse = await response.json();
    throw Error(errorResponse.id);
  }
};

export default logoutUser;
