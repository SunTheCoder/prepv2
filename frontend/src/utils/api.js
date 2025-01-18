const USER_URL = import.meta.env.VITE_BACKEND_USER_URL?.replace(/['"]/g, ""); // ✅ Remove extra quotes

export async function signup(userData) {
    const response = await fetch(`${USER_URL}/signup`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData),
        credentials: "include" //include cookies/JWT!
    });

    return response.json()
} 

export async function login(userData) {
    const response = await fetch(`${USER_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(userData), 
        credentials: "include"
    });

    return response.json()
}

export async function getUsers() {
    const response = await fetch(`${USER_URL}`, { credentials: "include" })

    return response.json()
}

export async function deleteUser(userId) {
    const response = await fetch(`${USER_URL}/${userId}`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(userData),
        credentials: "include"
    })

    if (!response.ok) {
        throw new Error(`Failed to delete user. Status: ${response.status}`)
    }

    return response.json()
}