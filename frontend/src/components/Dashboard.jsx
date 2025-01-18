import { useState, useEffect } from "react";
import { getUsers } from "../utils/api";



const Dashboard = () => {

    const [users, setUsers] = useState([])
    const [err, setError] = useState("");

    useEffect(() => {

        const retrieveUsers = async () => {
            try {

                const users = await getUsers()
                setUsers(users)

            } catch (error) {
                setError("Failed to fetch users");
                console.error("Error fetching users:", error);
            }
        };

        retrieveUsers();

    }, []);

    async function handleDelete(userId) {
        try {
            await deleteUser(userId);
            setUsers(users.filter(user => user.id !== userId)); // ✅ Remove user from UI  //better performance than refetchign with dependency array in useEffect
            alert("User deleted successfully!");
        } catch (err) {
            alert("Error deleting user: " + err.message);
        }
    }

    return (

        <div>
            <h2> Dashboard</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.name} (@{user.username})
                        <button onClick={() => handleDelete(user.id)}>🗑️ Delete</button> 
                        </li>
                ))}
            </ul>
        </div>
    )
};


export default Dashboard