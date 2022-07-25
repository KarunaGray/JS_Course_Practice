
const list = [ ];

const $form = document.querySelector('form#user');
const $input = $form.querySelector('input[name="user_name"]');
const $button = $form.querySelector('button[name="submit_button"]');

const $ul = document.querySelector('ul#list');
//Удаление элемента
const removeItem = ($element) => {
    $ul.removeChild($element);
};

//Разблокировка кнопки
const UnlockSubmit = () => {
    $button.disabled = false;
    $button.classList.remove("disable");
}

//Проверка на количество ошибок и элементов
isUnableToEnter = (key) => {
    const $listOfItems = document.querySelectorAll('li');
    const $listOfError = document.querySelectorAll('small');
    if(key){
        return ($listOfItems.length < 9) ? true : false;
    }
    else{
        return (($listOfItems.length > 9)||($listOfError.length > 3)) ? true : false;
    }
}

//Добавление элемента
const addItem = (item) => {
    const $li = document.createElement('li');
    $li.innerText = item;
    $li.addEventListener('click', (event) => {
        removeItem(event.target);UnlockSubmit();
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
        if(isUnableToEnter(true)){
        UnlockSubmit();}
    }, 5000);
    $ParentDiv.insertBefore($small,$ul);
};

//Вывод элементов
list.forEach((el, index) => {
    addItem(el);
});

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
    
    if(isUnableToEnter(false))
    {
        $button.disabled = true;
        $button.classList.add("disable");
    }
});
