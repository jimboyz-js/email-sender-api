const arrow = document.querySelector('.arrow-down');

arrow.addEventListener('mouseenter', ()=> {
    arrow.classList.add('fa-bounce');
})

document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', ()=> {
        const targetId = button.getAttribute('data-copy-target');
        const target = document.getElementById(targetId);
        const icon = button.querySelector('.btn-copy i');

        if (!target || !icon) return;

        navigator.clipboard.writeText(target.innerText)
        .then(()=> {
            document.querySelectorAll('.btn-copy i').forEach(i => {
                i.className = 'fas fa-copy fa-lg';
            })

            icon.className = 'fas fa-check fa-lg';
            button.setAttribute('title', 'Copied!');

            setTimeout(() => {
                icon.className = 'fas fa-copy fa-lg';
                button.title = 'Copy';
            }, 3000);
        })
        .catch(err => {
            console.error('Failed to copy: ', err);
        })
    })
})

document.querySelector('.btn-container button').addEventListener('click', ()=> {
    const cdn = document.getElementById('code-1');
    navigator.clipboard.writeText(cdn.innerText)
    .then(()=> {
        alert('CDN Copied!');
    })
    .catch(err => {
        console.error('Failed to copy cdn: ', err);
    })
})