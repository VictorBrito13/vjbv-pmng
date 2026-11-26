const API = `https://victorbrito.duckdns.org/pmng-api/people`;

const input = document.getElementById('inputName');
const btn = document.getElementById('btnSend');
const list = document.getElementById('names');

async function load() {
    try {
        const res = await fetch(API);
        if (!res.ok) throw new Error('HTTP ' + res.status);
        const data = await res.json();
        list.innerHTML = '';
        if (!data.length) {
            list.innerHTML = '<li>(sin registros)</li>';
            return;
        }
        data.forEach(p => {
            const li = document.createElement('li');
            li.textContent = p.id + ' - ' + p.name;
            list.appendChild(li);
        });
    } catch (e) {
        list.innerHTML = '<li>Error al cargar: ' + e.message + '</li>';
    }
}

async function save() {
    const name = input.value.trim();
    if (!name) return;
    try {
        const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name })
        });
        if (!res.ok) throw new Error('HTTP ' + res.status);
        input.value = '';
        await load();
    } catch (e) {
        alert('Error al guardar: ' + e.message);
    }
}

btn.addEventListener('click', save);
input.addEventListener('keydown', e => { if (e.key === 'Enter') save(); });

load();
