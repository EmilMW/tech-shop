export const fetcher = async (url, method = "GET", body) => {
  // stringify body
  const bodyOption = { body: body ? JSON.stringify(body) : undefined };
  const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  const res = await fetch(url, {
    method,
    ...(body ? headers : {}),
    ...(body ? bodyOption : {}),
  });
  return res.json();
};
