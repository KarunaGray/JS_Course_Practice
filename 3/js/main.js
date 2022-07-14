
const list = [ ];

const $ul = document.querySelector('ul#list');
//Удаление элемента
const removeItem = ($element) => {
    $ul.removeChild($element);
};

//Добавление элемента
const addItem = (item) => {
    const $li = document.createElement('li');
    $li.innerText = item;
    $li.addEventListener('click', (event) => {
        removeItem(event.target);
    });
    $ul.appendChild($li);
};

//Добавление сообщения о ошибке
const $ParentDiv = document.querySelector('div#app');
const addErrorItem = (item) => {
    const $small = document.createElement('small');
    $small.innerText = item;
    $small.innerHTML += "<br>";
    setTimeout(() => {
        $ParentDiv.removeChild($small);
    }, 5000);
    $ParentDiv.insertBefore($small,$ul);
};

//Вывод элементов
list.forEach((el, index) => {
    addItem(el);
});

const $form = document.querySelector('form#user');
const $input = $form.querySelector('input[name="user_name"]');
const $button = $form.querySelector('button[name="submit_button"]');

//Проверка на количество ошибок и элементов
isUnableToEnter = () => {
    const $listOfItems = document.querySelectorAll('li');
    const $listOfError = document.querySelectorAll('small');
    return (($listOfItems.length > 9)||($listOfError.length > 3)) ? true : false;
}

//Ивент на кнопку (Добавление элемента\блокировка кнопки)
$form.addEventListener('submit', (event) => {
    event.preventDefault();
    const value = $input.value;

    if (value.length >= 2) {
        addItem(value);
        $input.value = '';
    } else {
        addErrorItem("Введено недостаточное количество символов");
    }
    
    if(isUnableToEnter())
    {
        $button.disabled = true;
        $button.classList.add("disable");
    }
});

//Ивент на поле ввода(Разблокировка кнопки)
$input.addEventListener('input', () => {
    const $listOfItems = document.querySelectorAll('li');
    const $listOfError = document.querySelectorAll('small');

    if(!(isUnableToEnter()))
    {
        $button.disabled = false;
        $button.classList.remove("disable");
    }
});








