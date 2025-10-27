const btn_theme = document.querySelector('.btn_theme');

btn_theme.addEventListener('click', function (event) {
    event.preventDefault();
    document.body.classList.toggle('body-dark')
})

function checkbox_change(index) {
    let label = document.querySelector(`#label_${index}`)
    if (document.querySelector(`#checkbox_${index}`).checked) {
        label.style.textDecoration = 'line-through';
        label.style.color = '#252525';
        label.style.opacity = '50%';
    } else {
        label.style.textDecoration = 'none';
        label.style.color = 'black';
        label.style.opacity = '100%';
    }
}