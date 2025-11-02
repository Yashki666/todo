let background_dark = document.querySelector('.background-dark-theme-menu');
let menu = document.querySelector('.div-menu-add-note');
let menu_edit = document.querySelector('.div-menu-edit-note');
let option = document.querySelector('.option-edit-note-list1');
let select = document.querySelector('.select-all');
let temp_i = document.querySelector('.div-note-and-hr').children.length - 1;
let temp_index;
let remote_note;
let searchInput = document.querySelector('.input-search-note');
let filterBtn = document.getElementById('filterBtn');
let dropdown = document.getElementById('filterDropdown');
let btnDropdown = document.querySelector('.btn-dropdown');
let textDropdown = document.querySelector('.textDropdown');
let noteList = document.querySelector('.div-note-list');

// Добавления нового пункта.
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

// Смена темы на темную и наоборот.
document.querySelector('.btn-change-theme').addEventListener('click', () => {
    document.body.classList.toggle('body-dark');
    document.querySelector('.btn-change-theme').classList.toggle('btn-change-theme-dark');
    searchInput.classList.toggle('input-search-note-dark');
    document.querySelector('.btn-search-note').classList.toggle('btn-search-note-dark');
    document.querySelector('.div-menu-add-note').classList.toggle('div-menu-add-note-dark');
    document.querySelector('.div-menu-edit-note').classList.toggle('div-menu-edit-note-dark');
    document.querySelector('.input-add-note').classList.toggle('input-add-note-dark');
    document.querySelector('.input-edit-note').classList.toggle('input-edit-note-dark');
    document.querySelector('.detective').classList.toggle('detective-dark');
})

// Зачеркивание пункта при активированном флажке.
function checked_checkbox(index) {
    if (document.querySelector(`#checkbox-${index}`).checked) {
        document.querySelector(`#label_note_${index}`).style.textDecoration = 'line-through';
        document.querySelector(`#checkbox-${index}`).setAttribute('checked', 'checked');
    } else {
        document.querySelector(`#label_note_${index}`).style.textDecoration = 'none';
        document.querySelector(`#checkbox-${index}`).removeAttribute('checked');
    }
}

// Функция кнопки отмены при добавлении или изменения пункта.
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

// Кнопка подверждения для создания нового пункта в лист.
document.querySelector('.btn-apply').addEventListener('click', () => {
    let length_list = noteList.children.length;
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
        noteList.insertAdjacentHTML('beforeend', clone);
        document.querySelector(`#label_note_${temp_i}`).textContent = value_input;
        temp_i++;
    } else {
        alert('Много заметок!');
    }
    if (noteList.children.length != 1) {
        document.querySelector('.div-detective-empty').style.display = 'none';
        noteList.style.display = 'block';
    }

    menu.style.opacity = '0';
    background_dark.style.opacity = '0';
    setTimeout(() => {
        background_dark.style.display = 'none';
        menu.style.display = 'none';
    }, 300);
})

// Удаления пункта
function delete_note(index) {
    remote_note = document.querySelector(`#div-note-${index}`).outerHTML;
    document.querySelector(`.hr-${index}`).style.display = 'none';
    document.querySelector(`#div-note-${index}`).remove();
    let undo = `
    <div class="div-undo" id="div-indo-${index}" onclick="returnNote()">
        <div class="loader-div">
            <div class="loader"></div>
            <p class="timer">2</p>
        </div>
        <div>
            <p>UNDO <img src="files/undo.svg"></p>
        </div>
    </div>
    `
    noteList.insertAdjacentHTML('beforeend', undo);
    timer_undo();
    setTimeout(() => {
        if (document.querySelector('.div-note-and-hr') == null) {
            document.querySelector('.div-detective-empty').style.display = 'flex';
            noteList.style.display = 'flex';
            console.log(1);
        }
        document.querySelector(`#div-indo-${index}`).remove();
    }, 2000);
    temp_i--;
}

// Изменение пункта.
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

// Кнопка подверждение на изменение пункта.
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

// Кнопка поиска пункта по названию.
function btn_search() {
    document.querySelectorAll('.div-note-and-hr').forEach((elem, i) => {
        let temp_text_label = document.querySelector(`#label_note_${i}`).textContent.toUpperCase();
        let temp_search_input = searchInput.value.toUpperCase();
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

// Фильтрация списка на выполненные и невыполненные. 
filterBtn.onclick = function () {
    dropdown.classList.toggle("open");
    btnDropdown.classList.toggle('actived');
}
function filterDropdown(valueDropdown) {
    textDropdown.textContent = valueDropdown.toUpperCase();
    dropdown.classList.remove("open");
    btnDropdown.classList.remove('actived');
    document.querySelectorAll('.input-checkbox').forEach((element, i) => {
        if (valueDropdown == 'complete') {
            if (element.checked) {
                document.querySelector(`#div-note-${i}`).style.display = 'flex';
            } else {
                document.querySelector(`#div-note-${i}`).style.display = 'none';
            }
            btnDropdown.style.width = "120px";
            searchInput.style.width = "569px";
        } else if (valueDropdown == 'incomplete') {
            if (element.checked) {
                document.querySelector(`#div-note-${i}`).style.display = 'none';
            } else {
                document.querySelector(`#div-note-${i}`).style.display = 'flex';
            }
            btnDropdown.style.width = "130px";
            searchInput.style.width = "559px";
        } else {
            document.querySelector(`#div-note-${i}`).style.display = 'flex';
            btnDropdown.style.width = "94px";
            searchInput.style.width = "595px";
        }
    })
}

// Функция таймера для отмены удаления.
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
        console.log(2);

    }, 650);
}

// Кнопка отмены удаления.
function returnNote() {
    if (remote_note) {
        noteList.insertAdjacentHTML('beforeend', remote_note);
        temp_i++;
        document.querySelector('.loader').style.animation = 'none';
        document.querySelector('.div-undo').style.display = 'none';
    }
}

// document.querySelector('.div-undo').addEventListener('click', () => {
//     if (remote_note) {
//         noteList.insertAdjacentHTML('beforeend', remote_note);
//         temp_i++;
//         document.querySelector('.loader').style.animation = 'none';
//         document.querySelector('.div-undo').style.display = 'none';
//     }
// })