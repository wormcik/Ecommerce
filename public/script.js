const API_URL = window.location.origin.includes("localhost")
    ? "http://localhost:3000/api"
    : "/api"; // Vercel will handle it

document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    // Fetch users
    async function fetchUsers() {
        userList.innerHTML = '';
        const res = await fetch(`${API_URL}/users`);
        const users = await res.json();

        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `${user.name} (${user.age}) 
                <button class="delete-btn" data-id="${user._id}">Sil</button>`;
            userList.appendChild(li);
        });

        // Attach delete event
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteUser);
        });
    }

    // Add new user
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;

        const res = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age })
        });

        if (res.ok) {
            userForm.reset();
            fetchUsers();
        }
    });

    // Delete user
    async function deleteUser(event) {
        const id = event.target.getAttribute('data-id');
        await fetch(`${API_URL}/users/${id}`, { method: 'DELETE' });
        fetchUsers();
    }

    fetchUsers();
});
