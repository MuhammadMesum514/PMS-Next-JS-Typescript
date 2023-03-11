export const fetcher = async({url,method,body,json=true}) => {
    const res = await fetch(url, {
        method,
        ...(body && {body:JSON.stringify(body)}),
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    });
    if (!res.ok) {
        throw new Error("An error occurred while fetching the data.");
    }
    else if (json) {
    const data = await res.json();
    return data.data;
}

}

export const register = async (user) => {
    return await fetcher({
        url: '/api/register',
        method: 'POST',
        body: user,
    });
}

export const login = async (user) => {
    return await fetcher({
        url: '/api/login',
        method: 'POST',
        body: user,
    });
}

export const createNewProject = (name) => {
  return fetcher({
    url: "/api/project",
    method: "POST",
    body: { name },
  });
};