let dark_theme = false;
document.querySelector('.btn_theme').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.label_text').classList.toggle('label-dark');
    document.body.classList.toggle('body-dark');
    dark_theme = document.body.classList.contains('body-dark') == true ? true : false;
})
function checkbox_change(index) {
    let label = document.querySelector(`#label_${index}`)
    if (document.querySelector(`#checkbox_${index}`).checked) {
        label.style.textDecoration = 'line-through';
        label.style.opacity = '50%';
    } else {
        label.style.textDecoration = 'none';
        label.style.opacity = '100%';
    }
    if (dark_theme) {
        document.querySelector('.label_text').classList.add('label-dark');
    } else {
        document.querySelector('.label_text').classList.remove('label-dark');
    }
}
