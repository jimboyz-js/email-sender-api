//fa-bounce

const arrow = document.querySelector('.arrow-down');

arrow.addEventListener('mouseenter', ()=> {
    arrow.classList.add('fa-bounce');
})

const text = document.getElementById('code');
const copyBtn = document.querySelector('.fa-icon-copy');
const checkBtn = document.querySelector('.fa-icon-check');

document.querySelectorAll('.btn-copy').forEach(button => {
    button.addEventListener('click', ()=> {
        const targetId = button.getAttribute('data-copy-target');
        const target = document.getElementById(targetId);
        
        if(target) {
            navigator.clipboard.writeText(target.innerText)
            .then(()=> {
                alert('Text Copied!');
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            })
        }
    })
})