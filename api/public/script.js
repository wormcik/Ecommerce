document.addEventListener('DOMContentLoaded', () => {
    const userForm = document.getElementById('userForm');
    const userList = document.getElementById('userList');

    // Kullanıcıları Listele
    async function fetchUsers() {
        userList.innerHTML = '';
        const res = await fetch('/api/users');
        const users = await res.json();

        users.forEach(user => {
            const li = document.createElement('li');
            li.innerHTML = `${user.name} (${user.age}) 
                <button class="delete-btn" data-id="${user._id}">Sil</button>`;
            userList.appendChild(li);
        });

        // Silme butonlarına event ekleme
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteUser);
        });
    }

    // Yeni Kullanıcı Ekle
    userForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;

        const res = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, age })
        });

        if (res.ok) {
            userForm.reset();
            fetchUsers();
        }
    });

    // Kullanıcı Silme
    async function deleteUser(event) {
        const id = event.target.getAttribute('data-id');
        await fetch(`/api/users/${id}`, { method: 'DELETE' });
        fetchUsers();
    }

    fetchUsers();
});
