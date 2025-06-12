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


    
        // if(target) {
            // target.setAttribute('title', 'Copied!');
            // target.title = 'Hello';

            const icon = button.querySelector('i');

            if (!target || !icon) return;

            navigator.clipboard.writeText(target.innerText)
            .then(()=> {
                // checkBtn.classList.add('showCheckIcon');
                // copyBtn.classList.add('hideCopyIcon');
                
                

                document.querySelectorAll('.btn-copy i').forEach(i => {
                    i.className = 'fas fa-copy fa-lg';
                })




                icon.className = 'fas fa-check fa-lg';

                setTimeout(() => {
                    // copyBtn.classList.add('showCopyIcon');
                    // copyBtn.classList.remove('hideCopyIcon');

                    // checkBtn.classList.remove('showCheckIcon');
                    // target.setAttribute('title', 'Copy');
                    // target.title = 'Copy';

                    icon.className = 'fas fa-copy fa-lg';
                }, 5000);
            
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
            })
        // }
    })
})