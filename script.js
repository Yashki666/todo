let background_dark = document.querySelector('.background-dark-theme-menu');
let menu = document.querySelector('.div-menu-add-note');
let menu_edit = document.querySelector('.div-menu-edit-note');
let option = document.querySelector('.option-edit-note-list1');
option.addEventListener('click', () => {
    console.log(1);
})
let select = document.querySelector('.select-all');
let temp_i = document.querySelector('.div-note-and-hr').children.length + 1;
let temp_index;

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
    document.querySelector('.div-menu-edit-note').classList.toggle('div-menu-edit-note-dark');
    document.querySelector('.input-add-note').classList.toggle('input-add-note-dark');
    document.querySelector('.input-edit-note').classList.toggle('input-edit-note-dark');
    document.querySelector('.detective').classList.toggle('detective-dark');
})

function checked_checkbox(index) {
    if (document.querySelector(`#checkbox-${index}`).checked) {
        document.querySelector(`#label_note_${index}`).style.textDecoration = 'line-through';
    } else {
        document.querySelector(`#label_note_${index}`).style.textDecoration = 'none';
    }
}

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
        <hr class="hr-${temp_i}">
        <div class="div-note-and-actions">
            <div class="div-note" onclick="checked_checkbox(${temp_i})">
                <input id="checkbox-${temp_i}" type="checkbox" class="input-checkbox" value="">
                <label for="checkbox-${temp_i}" id="label_note_${temp_i}" class="label-text"></label>
            </div>
            <div class="div-edit-and-delete">
                <button class="btn-edit" onclick="edit_note(${temp_i})"></button>
                <button class="btn-delete" onclick="delete_note(${temp_i})"></button>
            </div>
        </div>
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
    timer_undo();
}
function edit_note(index) {
    console.log(index);
    background_dark.style.display = 'flex';
    background_dark.style.opacity = '0';
    menu_edit.style.display = 'block';
    menu_edit.style.opacity = '0';
    setTimeout(() => {
        menu_edit.style.opacity = '1';
        background_dark.style.opacity = '0.7';
    }, 10);
    temp_index = index;
}
document.querySelector('.btn-apply-edit').addEventListener('click', () => {
    document.querySelector(`#label_note_${temp_index}`).textContent = document.querySelector('.input-edit-note').value;
    menu_edit.style.opacity = '0';
    background_dark.style.opacity = '0';
    setTimeout(() => {
        background_dark.style.display = 'none';
        menu_edit.style.display = 'none';
    }, 300);
    document.querySelector('.input-edit-note').value = '';
})

function btn_search() {
    document.querySelectorAll('.div-note-and-hr').forEach((elem, i) => {
        let temp_text_label = document.querySelector(`#label_note_${i}`).textContent.toUpperCase();
        let temp_search_input = document.querySelector('.input-search-note').value.toUpperCase();
        console.log(temp_text_label);
        console.log(temp_search_input);
        if (temp_search_input == '') {
            document.querySelector(`#div-note-${i}`).style.display = 'flex';
        } else if (temp_text_label.includes(temp_search_input)) {
            document.querySelector(`#div-note-${i}`).style.display = 'flex';
        } else {
            document.querySelector(`#div-note-${i}`).style.display = 'none';
        }
    })
}

select.addEventListener('change', () => {
    console.log(select.value);
    document.querySelectorAll('.input-checkbox').forEach((element, i) => {
        if (select.value == 'complete' && !element.checked) {
            document.querySelector(`#div-note-${i}`).style.display = 'none';
        } else if (select.value == 'incomplete' && element.checked) {
            document.querySelector(`#div-note-${i}`).style.display = 'none';
        } else if (select.value == 'all') {
            document.querySelector(`#div-note-${i}`).style.display = 'flex';
        }
    });
})
function timer_undo() {
    let i = 2;
    document.querySelector('.timer').textContent = i;
    document.querySelector('.div-undo').style.display = 'flex';
    document.querySelector('.loader').style.animation = 'l1 2s infinite linear';
    const timer = setInterval(() => {
        i--;
        document.querySelector('.timer').textContent = i;

        if (i <= -1) {
            document.querySelector('.loader').style.animation = 'none';
            document.querySelector('.div-undo').style.display = 'none';
            clearInterval(timer);
        }
    }, 650);
}