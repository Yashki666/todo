let background_dark = document.querySelector('.background-dark-theme-menu');
let menu = document.querySelector('.div-menu-add-note');
let menu_edit = document.querySelector('.div-menu-edit-note');
let temp_i = 3;

document.querySelector('.btn-add-note').addEventListener('click', () => {
    background_dark.style.display = 'flex';
    background_dark.style.opacity = '0';
    menu.style.display = 'block';
    menu.style.opacity = '0';
    setTimeout(() => {
        menu.style.opacity = '1';
        background_dark.style.opacity = '0.7';
    }, 10);
})

document.querySelector('.btn-change-theme').addEventListener('click', () => {
    document.body.classList.toggle('body-dark');
    document.querySelector('.btn-change-theme').classList.toggle('btn-change-theme-dark');
    document.querySelector('.input-search-note').classList.toggle('input-search-note-dark');
    document.querySelector('.btn-search-note').classList.toggle('btn-search-note-dark');
    document.querySelector('.div-menu-add-note').classList.toggle('div-menu-add-note-dark');
    document.querySelector('.input-add-note').classList.toggle('input-add-note-dark');
    document.querySelector('.detective').classList.toggle('detective-dark');
})

function btn_cancel() {
    menu.style.opacity = '0';
    menu_edit.style.opacity = '0';
    background_dark.style.opacity = '0';
    setTimeout(() => {
        background_dark.style.display = 'none';
        menu.style.display = 'none';
        menu_edit.style.display = 'none';
    }, 300);
}


document.querySelector('.btn-apply').addEventListener('click', () => {
    let length_list = document.querySelector('.div-note-list').children.length;
    let value_input = document.querySelector('.input-add-note').value;
    let clone = `
    <div class="div-note-and-hr" id="div-note-${temp_i}">
        <div class="div-note-and-actions">
            <div class="div-note">
                <input id="checkbox-${temp_i}" type="checkbox" class="input-checkbox" value="">
                <label for="checkbox-${temp_i}" id="label_note_${temp_i}" class="label-text"></label>
            </div>
            <div class="div-edit-and-delete">
                <button class="btn-edit" onclick="edit_note(${temp_i})"></button>
                <button class="btn-delete" onclick="delete_note(${temp_i})"></button>
            </div>
        </div>
        <hr>
    </div>
    `
    if (length_list > 0 && length_list < 7) {
        document.querySelector('.div-note-list').insertAdjacentHTML('beforeend', clone);
        document.querySelector(`#label_note_${temp_i}`).textContent = value_input;
        temp_i++;
    } else {
        alert('Много заметок!');
    }
    if (document.querySelector('.div-note-list').children.length != 1) {
        document.querySelector('.div-detective-empty').style.display = 'none';
        document.querySelector('.div-note-list').style.display = 'block';
    }

    menu.style.opacity = '0';
    background_dark.style.opacity = '0';
    setTimeout(() => {
        background_dark.style.display = 'none';
        menu.style.display = 'none';
    }, 300);
})
function delete_note(index) {
    document.querySelector(`#div-note-${index}`).remove();
    if (document.querySelector('.div-note-list').children.length == 1) {
        document.querySelector('.div-detective-empty').style.display = 'flex';
        document.querySelector('.div-note-list').style.display = 'flex';
    }
    temp_i--;
}
function edit_note(index1) {
    console.log(index1);
    background_dark.style.display = 'flex';
    background_dark.style.opacity = '0';
    menu_edit.style.display = 'block';
    menu_edit.style.opacity = '0';
    setTimeout(() => {
        menu_edit.style.opacity = '1';
        background_dark.style.opacity = '0.7';
    }, 10);
    document.querySelector(`#label_note_${index1}`).textContent = document.querySelector('.input-edit-note').value
}
document.querySelector('.btn-apply-edit').addEventListener('click', () => {
    menu_edit.style.opacity = '0';
    background_dark.style.opacity = '0';
    setTimeout(() => {
        background_dark.style.display = 'none';
        menu_edit.style.display = 'none';
    }, 300);
})
