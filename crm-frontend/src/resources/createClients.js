const SERVER_URL = "http://localhost:4000";
//добавления нового клиента на сервер
async function serverAddClients(newClient) {
  // try {
    const response = await fetch(SERVER_URL + '/api/clients', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClient)
    });

    const responseData = await response.json();
    serverData.push(responseData);
    return responseData;

  //   // обновляем таблицу после успешного добавления на сервер
    // addClientsTable(serverData);
  // } catch (error) {
  //   console.error('Error:', error);
  // }
}
//получение объектов с сервера (список клиентов)
async function serverGetClients() {
  let response = await fetch(SERVER_URL + '/api/clients', {
    method: "GET",
    headers: { 'Content-Type': 'application/json' },
  })

  let data = await response.json();
  return data
}
let serverData = await serverGetClients();
//удаление студента с сервера
async function serverDeleteClients(id) {
  let response = await fetch(SERVER_URL + '/api/clients/' + id, {
    method: "DELETE",
  })

  let data = await response.json();
  return data
}
//массив для храненияя клиентов
let clients = [];
//Переменные для сортировки
let sortColumnFlag = 'fio',
    sortDirFlag = true,
    copyClients,
    userId,
    idUserDelete,
    newClientsDelete

//находим инпут ПОИСКА по таблице
const $headerSearch = document.getElementById('headerSearch')
//находим значения инпутов в дом НОВЫЙ КЛИЕНТ
const $formAddSurname = document.querySelector('.graph-modal__surname')
const $formAddName = document.querySelector('.graph-modal__name')
const $formAddLastname = document.querySelector('.graph-modal__lastname')
//нашли элементы мод окна ИЗМЕНИТЬ КОНТАКТ
const $spanId = document.querySelector('.correct-id'),
      $inputSurName = document.querySelector('.graph-modal__surname-correct'),
      $inputName = document.querySelector('.graph-modal__name-correct'),
      $inputLastName = document.querySelector('.graph-modal__lastname-correct');
//находим кнопки модального окна "ДОБАВИТЬ НОВОГО КЛИЕНТА"
const $BtnAddContacts = document.getElementById('BtnAddContacts') //кнопка ДОБАВЛЕНИЯ НОВОЙ КОНТАКТНОЙ ИНФОРИМАЦИИ
const $BtnSaveNewClients = document.getElementById('BtnSaveNewClients') // кнопка СОХРАНИТЬ НОВОГО КЛИЕНТА
const $BtnCanselClients = document.getElementById('BtnCanselClients') //кнопка ОТМЕНИТЬ
//нашли DIV модального окна "Добавить нового клиента"
const $formAddNewClients = document.querySelector('.graph-modal__btn-block')
const $formAddNewClients1 = document.querySelector('.graph-modal__btn-block1')
//нашли DIV модального окна "Изменить данные клиента"
const $formAddNewClientsCorrect = document.querySelector('.graph-modal__btn-blockCorrect')
const $formAddNewClientsCorrect1 = document.querySelector('.graph-modal__btn-blockCorrect1')
//находим кнопки модального окна "ИЗМЕНИТЬ ДАННЫЕ"
const $BtnAddContactsCorrect = document.getElementById('BtnAddContactsCorrect') //кнопка ДОБАВЛЕНИЯ НОВОЙ КОНТАКТНОЙ ИНФОРИМАЦИИ
const $BtnSaveCorrectClients = document.getElementById('BtnSaveCorrectClients') //кнопка СОХРАНИТЬ ИЗМЕНЕНИЯ
const $BtnCanselClientsCorrect = document.getElementById('BtnCanselClientsCorrect') //кнопка ОТМЕНИТЬ
//находим кнопки модального окна "УДАЛИТЬ КЛИЕНТА"
const $BtnDeleteClients = document.getElementById('BtnDeleteClients') //кнопка УДАЛИТЬ
const $BtnCanselClientsDelete = document.getElementById('BtnCanselClientsDelete') // кнопка ОТМЕНИТЬ
let formCount = 0; // количество созданных форм
let formCountCorrect = 0; // количество созданных форм
//добавляем форму для заполнения контакта по клику на кнопку ДОБАВИТЬ КОНТАКТ
$BtnAddContacts.addEventListener('click', function (e) {
  e.preventDefault();

  // Проверяем количество созданных форм
  if (formCount >= 10) {
   $BtnAddContacts.style.display = 'none';
   return;
  }

  //добавляем padding блоку с контактами
  $formAddNewClients.style.padding = '25px 0 25px 0'
  //создал форму и элементы формы
  const $formContacts = document.createElement('form')
  //создаем select
  const $castomSelect = document.createElement('div')
  const $castomSelectBtn = document.createElement('select')
  const $castomSelectOption0 = document.createElement('option')
  const $castomSelectOption1 = document.createElement('option')
  const $castomSelectOption2 = document.createElement('option')
  const $castomSelectOption3 = document.createElement('option')
  const $castomSelectOption4 = document.createElement('option')
  const $inputContacts = document.createElement('input')
  const $btnContacts = document.createElement('button')
  //добавляем классы для стилизации формы и элементов
  $formContacts.classList.add('d-flex', 'form-contacts')
  //добавляем классы  селекту
  $castomSelect.classList.add('custom-select')
  $castomSelect.setAttribute('tabindex', '0')
  $castomSelectOption0.setAttribute('value', '0')
  $castomSelectOption1.setAttribute('value', '1')
  $castomSelectOption2.setAttribute('value', '2')
  $castomSelectOption3.setAttribute('value', '3')
  $castomSelectOption4.setAttribute('value', '4')
  $inputContacts.classList.add('form-contacts__input')
  $inputContacts.setAttribute('placeholder', 'Введите данные контакта')
  $btnContacts.classList.add('btn-reset', 'form-contacts__btn')
  //добавляем текст селекту
  $castomSelectOption0.textContent = 'Телефон'
  $castomSelectOption1.textContent = 'Email'
  $castomSelectOption2.textContent = 'VK'
  $castomSelectOption3.textContent = 'Facebook'
  $castomSelectOption4.textContent = 'Другое'
  //добавил всё в дом
  $formAddNewClients1.prepend($formContacts)
  // Счетчик созданных форм увеличиваем на 1
  formCount++;
  //вкладываем все элементы в селект
  $castomSelect.append($castomSelectBtn)
  $castomSelectBtn.append($castomSelectOption0, $castomSelectOption1, $castomSelectOption2, $castomSelectOption3, $castomSelectOption4)
  $formContacts.append($castomSelect, $inputContacts, $btnContacts);

  //скрипт для работы кастомного селекта
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    // Add check if there is already a select element with a select-selected div
    if (x[i].querySelector('.select-selected')) {
      continue; // skip to the next element in the loop
    }

    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  document.addEventListener("click", closeAllSelect);

  //удаляем форму по нажатия на кнопку с крестиком
  $btnContacts.addEventListener('click', function() {
    $formContacts.remove();
    const forms = document.querySelectorAll('.form-contacts');
    if (forms.length === 0) {
      $formAddNewClients.style.padding = '0';
    }
    $BtnAddContacts.style.display = 'flex';
    formCount --
  })
})
//событие по кнопке ДОБАВИТЬ КОНТАКТ в мод окне ИЗМЕНИТЬ КОНТАКТ
$BtnAddContactsCorrect.addEventListener('click', function (e) {
  e.preventDefault();
  // Проверяем количество созданных форм
  if (formCountCorrect >= 10) {
   $BtnAddContactsCorrect.style.display = 'none';
   return;
  }

  //добавляем padding блоку с контактами
  $formAddNewClientsCorrect.style.padding = '25px 0 25px 0'
  //создал форму и элементы формы
  const $formContacts = document.createElement('form')
  //создаем select
  const $castomSelect = document.createElement('div')
  const $castomSelectBtn = document.createElement('select')
  const $castomSelectOption0 = document.createElement('option')
  const $castomSelectOption1 = document.createElement('option')
  const $castomSelectOption2 = document.createElement('option')
  const $castomSelectOption3 = document.createElement('option')
  const $castomSelectOption4 = document.createElement('option')
  const $inputContacts = document.createElement('input')
  const $btnContacts = document.createElement('button')
  //добавляем классы для стилизации формы и элементов
  $formContacts.classList.add('d-flex', 'form-contacts')
  //добавляем классы  селекту
  $castomSelect.classList.add('custom-select')
  $castomSelect.setAttribute('tabindex', '0')
  $castomSelectOption0.setAttribute('value', '0')
  $castomSelectOption1.setAttribute('value', '1')
  $castomSelectOption2.setAttribute('value', '2')
  $castomSelectOption3.setAttribute('value', '3')
  $castomSelectOption4.setAttribute('value', '4')
  $inputContacts.classList.add('form-contacts__input')
  $inputContacts.setAttribute('placeholder', 'Введите данные контакта')
  $btnContacts.classList.add('btn-reset', 'form-contacts__btn')
  //добавляем текст селекту
  $castomSelectOption0.textContent = 'Телефон'
  $castomSelectOption1.textContent = 'Email'
  $castomSelectOption2.textContent = 'VK'
  $castomSelectOption3.textContent = 'Facebook'
  $castomSelectOption4.textContent = 'Другое'
  //добавил всё в дом
  $formAddNewClientsCorrect1.prepend($formContacts)
  // Счетчик созданных форм увеличиваем на 1
  formCountCorrect++;
  //вкладываем все элементы в селект
  $castomSelect.append($castomSelectBtn)
  $castomSelectBtn.append($castomSelectOption0, $castomSelectOption1, $castomSelectOption2, $castomSelectOption3, $castomSelectOption4)
  $formContacts.append($castomSelect, $inputContacts, $btnContacts);

  //скрипт для работы кастомного селекта
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "custom-select": */
  x = document.getElementsByClassName("custom-select");
  l = x.length;
  for (i = 0; i < l; i++) {
    // Add check if there is already a select element with a select-selected div
    if (x[i].querySelector('.select-selected')) {
      continue; // skip to the next element in the loop
    }

    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    /* For each element, create a new DIV that will contain the option list: */
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
      /* For each option in the original select element,
      create a new DIV that will act as an option item: */
      c = document.createElement("DIV");
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener("click", function(e) {
          /* When an item is clicked, update the original select box,
          and the selected item: */
          var y, i, k, s, h, sl, yl;
          s = this.parentNode.parentNode.getElementsByTagName("select")[0];
          sl = s.length;
          h = this.parentNode.previousSibling;
          for (i = 0; i < sl; i++) {
            if (s.options[i].innerHTML == this.innerHTML) {
              s.selectedIndex = i;
              h.innerHTML = this.innerHTML;
              y = this.parentNode.getElementsByClassName("same-as-selected");
              yl = y.length;
              for (k = 0; k < yl; k++) {
                y[k].removeAttribute("class");
              }
              this.setAttribute("class", "same-as-selected");
              break;
            }
          }
          h.click();
      });
      b.appendChild(c);
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
      /* When the select box is clicked, close any other select boxes,
      and open/close the current select box: */
      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
    });
  }

  function closeAllSelect(elmnt) {
    /* A function that will close all select boxes in the document,
    except the current select box: */
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
      if (elmnt == y[i]) {
        arrNo.push(i)
      } else {
        y[i].classList.remove("select-arrow-active");
      }
    }
    for (i = 0; i < xl; i++) {
      if (arrNo.indexOf(i)) {
        x[i].classList.add("select-hide");
      }
    }
  }

  document.addEventListener("click", closeAllSelect);

  //удаляем форму по нажатия на кнопку с крестиком
  $btnContacts.addEventListener('click', function() {
    $formContacts.remove();
    const forms = document.querySelectorAll('.form-contacts');
    if (forms.length === 0) {
      $formAddNewClientsCorrect.style.padding = '0';
    }
    $BtnAddContactsCorrect.style.display = 'flex';
    formCountCorrect --
  })
})
// нашел в дом дереве кнопку закрытия модального окна
let graphModalClose = document.querySelector('.graph-modal__close');
// нашел в дом дереве кнопку закрытия модального окна ИЗМЕНИТЬ КЛИЕНТА
let graphModalCloseCorrect = document.querySelector('.graph-modal__close-correct');
//нашли Body таблицы в дом дереве
const $tabletBody = document.getElementById('tabletBody')

//создаем нового клиента
function createNewClients(oneUser) {
  //создали строку для нового клиента
  const $newClients = document.createElement('ul')
  //создали ячейки для информации о новом клиенте
  const $newClientsID = document.createElement('li')
  const $newClientsFio = document.createElement('li')
  const $newClientsCreate = document.createElement('li')
  const $newClientsCorrect = document.createElement('li')
  const $newClientsContacts = document.createElement('li')
  const $newClientsAction = document.createElement('li')
  //создаем две кнопки для редактирования и удаления контакта
  const $newClientsBtnCorrect = document.createElement('button')
  const $newClientsBtnDelete = document.createElement('button')
  //привел дату и время к читабельному виду
  const dateCreatedAt = new Date(oneUser.createdAt).toLocaleDateString();
  const timeCreatedAt = new Date(oneUser.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const dateUpdatedAt = new Date(oneUser.updatedAt).toLocaleDateString();
  const timeUpdatedAt = new Date(oneUser.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  //добавляем классы элементам
  $newClients.classList.add('tablet__body--clients', 'list-reset', 'd-flex', 'jf-start', 'al-i-center')
  $newClientsID.classList.add('tablet__body--id')
  $newClientsFio.classList.add('tablet__body--fio')
  $newClientsCreate.classList.add('tablet__body--create')
  $newClientsCreate.setAttribute('data-time', `${timeCreatedAt}`)
  $newClientsCorrect.classList.add('tablet__body--correct')
  $newClientsCorrect.setAttribute('data-time', `${timeUpdatedAt}`)
  $newClientsContacts.classList.add('tablet__body--contacts')
  $newClientsAction.classList.add('tablet__body--action')
  //добавляем классы кнопкам
  $newClientsBtnCorrect.classList.add('tablet__body--btn', 'newClientsBtnCorrect', 'btn-reset', 'd-flex', 'al-i-center')
  $newClientsBtnDelete.classList.add('tablet__body--btn', 'newClientsBtnDelete', 'btn-reset', 'd-flex', 'al-i-center')
  //добавляем id элементам
  $newClients.setAttribute('id', 'newClients')
  $newClientsID.setAttribute('id', 'newClientsID')
  $newClientsFio.setAttribute('id', 'newClientsFio')
  $newClientsCreate.setAttribute('id', 'newClientsCreate')
  $newClientsCorrect.setAttribute('id', 'newClientsCorrect')
  $newClientsContacts.setAttribute('id', 'newClientsContacts')
  $newClientsAction.setAttribute('id', 'newClientsAction')
  //добавляем id и data-id кнопкам
  $newClientsBtnCorrect.setAttribute('id', `btn-correct-${oneUser.id}`)
  $newClientsBtnDelete.setAttribute('id', `btn-delete-${oneUser.id}`)
  $newClientsBtnDelete.setAttribute('data-id', oneUser.id)
  //добавляем data для модального окна 'изменить данные'(чтобы можно было открыть окно)
  $newClientsBtnCorrect.setAttribute('data-graph-path', 'correctInform')
  //добавляем data для модального окна 'удалить клиента'(чтобы можно было открыть окно)
  $newClientsBtnDelete.setAttribute('data-graph-path', 'deleteClients')
  //добавляем подпись кнопкам
  $newClientsBtnCorrect.textContent = 'Изменить'
  $newClientsBtnDelete.textContent = 'Удалить'
  // Извлекаем последние 6 цифр id
  const lastSixDigits = oneUser.id.slice(-6);
  //добавляем контент в ячейки таблицы
  $newClientsID.textContent = lastSixDigits;
  $newClientsFio.textContent = oneUser.fio;
  $newClientsCreate.textContent = dateCreatedAt;
  $newClientsCorrect.textContent = dateUpdatedAt;
  $newClientsContacts.textContent = "";
  oneUser.contacts.forEach((obj) => {
    const $div = document.createElement('div');
    $div.classList.add('tooltip');
    $div.setAttribute('data-text', `${obj.type}: ${obj.value}`)
    const $img = document.createElement("img");
    $img.classList.add('contacts-icon');
    switch (obj.type) {
      case "Email":
        $img.src = "img/email-icon.png";
        break;
      case "Телефон":
        $img.src = "img/phone-icon.png";
        break;
      case "VK":
        $img.src = "img/vk-icon.png";
        break;
      case "Facebook":
        $img.src = "img/fb-icon.png";
        break;
      case "Другое":
        $img.src = "img/other-icon.png";
        break;
      default:
        break;
    }
    $div.appendChild($img);
    $newClientsContacts.appendChild($div);
  });
  //обработчик события удалить клиента
  $newClientsBtnDelete.addEventListener('click', function () {
    idUserDelete = oneUser.id
    newClientsDelete = $newClients
  });
  //СОБЫТИЕ ПО КНОПКЕ ИЗМЕНИТЬ
  $newClientsBtnCorrect.addEventListener('click', function (e) {
    e.preventDefault();
    userId = oneUser.id
    //подставляем значения в инпуты и id
    $spanId.textContent = "ID:" + " " + lastSixDigits
    $inputSurName.value = oneUser.surname
    $inputName.value = oneUser.name
    $inputLastName.value = oneUser.lastName
    // Получаем список контактов из oneUser.contacts
    const contacts = oneUser.contacts;
    // добавляем кол-во форм соответствующее кол-ву контактов клиента
    for (let i = 0; i < contacts.length; i++) {
      $BtnAddContactsCorrect.click();
    }
    // выбираем все формы контактов
    const contactInputs = document.querySelectorAll('.form-contacts__input');
    const contactSelects = document.querySelectorAll('.select-selected');
    // заполняем формы контактов данными из списка контактов
    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];
      let type = contact.type;
      let value = contact.value;
      let select = contactSelects[i];
      let input = contactInputs[i];

      select.innerHTML = type;
      input.value = value;
    }
  })
  //добавляем кнопки в элемент Action
  $newClientsAction.append($newClientsBtnCorrect, $newClientsBtnDelete)
  //добавляем элементы в строку
  $newClients.append($newClientsID, $newClientsFio, $newClientsCreate, $newClientsCorrect, $newClientsContacts, $newClientsAction)
  //добавляем в таблицу строку с новым клиентом
  $tabletBody.append($newClients)
  //показываем кнопку добавления формы если она была скрыта
  $BtnAddContacts.style.display = 'flex';
  return $newClients
}

//подтверждение удаления клиента из таблицы и с сервера
$BtnDeleteClients.addEventListener('click', async function () {
  await serverDeleteClients(idUserDelete)
  newClientsDelete.remove()
  graphModalClose.click()
});
// записал обработчик в переменную
const saveHandler = async function(e) {
  e.preventDefault();
  let clientId = userId
  const contacts = updateContacts();
  const correctClients = {
    surname: $inputSurName.value.trim(),
    name: $inputName.value.trim(),
    lastName: $inputLastName.value.trim(),
    contacts: contacts
  };
  //отправляем изменения на сервер
  async function serverPATCHclients(id) {
    try {
      const response = await fetch(SERVER_URL + '/api/clients/' + id, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(correctClients)
      });
      if (!response.ok) {
        // Обрабатываем ошибку
        console.error('Ошибка сохранения данных на сервере');
        return null;
      }
      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Ошибка сохранения данных на сервере:', error);
      return null;
    }
  }
  const responseData = await serverPATCHclients(clientId);
  if (responseData) {
    // обновляем данные в массиве serverData
    const updatedIndex = serverData.findIndex(item => item.id === clientId);
    serverData[updatedIndex] = { ...serverData[updatedIndex], ...correctClients };
    // перерисовываем таблицу после внесения изменений
    addClientsTable(serverData);

    //очистка формы после добавления нового клиента
    $inputSurName.value = '';
    $inputName.value = '';
    $inputLastName.value = '';
    //удаляем все формы для контактов
    const contactForms = document.querySelectorAll('.form-contacts');
    contactForms.forEach((form) => {
      form.remove();
    });
    //обнулили счетчик форм
    formCountCorrect = 0;
    //удаляем паддинги у блока
    document.querySelector('.graph-modal__btn-blockCorrect').style.padding = '0';
    //закрываем модальное окно
    graphModalClose.click();
  }
}
//событие отправить на сервер измененные данные
$BtnSaveCorrectClients.addEventListener('click', saveHandler);

//отрисовка таблицы
function addClientsTable(arrData) {
  $tabletBody.innerHTML = '';
  copyClients = [...arrData]
  //подготовка
  for (const oneUser of copyClients) {
    oneUser.id = oneUser.id;
    oneUser.fio = oneUser.surname + ' ' + oneUser.name + ' ' + oneUser.lastName;
    oneUser.createdAt = oneUser.createdAt;
    oneUser.updatedAt = oneUser.updatedAt;
    oneUser.contacts = oneUser.contacts;
    oneUser.create = new Date(oneUser.createdAt).toLocaleString();
    oneUser.correct = new Date(oneUser.updatedAt).toLocaleString();
  }
  // сортировка
  copyClients = copyClients.sort(function(a, b) {
    let sort = a[sortColumnFlag] < b[sortColumnFlag]
    if (sortDirFlag == false) sort = a[sortColumnFlag] > b[sortColumnFlag]
    return sort ? -1 : 1;
  })
  //цикл добаления нового студента
  if (copyClients !== null) {
    for (const oneUserServ of copyClients) {
      const newTr = createNewClients(oneUserServ)
      $tabletBody.append(newTr)
    }
  }
}
addClientsTable(serverData);

//функция поиска клиентов
function search(value) {
  const filteredClients = serverData.filter((oneUser) => {
    return (
      oneUser.id.toLowerCase().includes(value.toLowerCase()) ||
      oneUser.fio.toLowerCase().includes(value.toLowerCase()) ||
      oneUser.create.toLowerCase().includes(value.toLowerCase()) ||
      oneUser.correct.toLowerCase().includes(value.toLowerCase())
    );
  });

  addClientsTable(filteredClients);
}

//добавить нового клиента на сервер и в таблицу
$BtnSaveNewClients.addEventListener('click', async function(e) {
  e.preventDefault();

  const contactForms = document.querySelectorAll('.form-contacts');
  const contacts = [];

  contactForms.forEach((form) => {
    const contact = {
      type: form.querySelector('.select-selected').textContent,
      value: form.querySelector('.form-contacts__input').value
    };
    contacts.push(contact);
  });

  let newClients =
  {
    surname: $formAddSurname.value.trim(),
    name: $formAddName.value.trim(),
    lastName: $formAddLastname.value.trim(),
    contacts: contacts
  }
  clients.push(newClients)

  //добавляем нового клиента на сервер
  await serverAddClients(newClients);
  //перерисовываем таблицу после внесения изменений
  addClientsTable(serverData);

  //очистка формы после добавления нового клиента
  $formAddSurname.value = '';
  $formAddName.value = '';
  $formAddLastname.value = '';
  //удаляем все формы для контактов
  contactForms.forEach((form) => {
    form.remove();
  });
  //обнулили счетчик форм
  formCount = 0;
  //удаляем паддинги у блока
  document.querySelector('.graph-modal__btn-block').style.padding = '0';
});
//обновляем данные клиента
function updateContacts() {
  const contactForms = document.querySelectorAll('.form-contacts');
  const contacts = [];
  contactForms.forEach((form) => {
    const contact = {
      type: form.querySelector('.select-selected').textContent,
      value: form.querySelector('.form-contacts__input').value
    };
    contacts.push(contact);
  });
  return contacts;
}
//при закрытии модального окна ДОБАВИТЬ НОВОГО КЛИЕНТА очищаем инпуты и удаляем формы
graphModalClose.addEventListener('click', () => {
  //нашли все формы с контактами
  const contactForms = document.querySelectorAll('.form-contacts');
  //очистка формы после добавления нового клиента
  $formAddSurname.value = '';
  $formAddName.value = '';
  $formAddLastname.value = '';
  //удаляем все формы для контактов
  contactForms.forEach((form) => {
    form.remove();
  });
  //показываем кнопку добавления форм контактов
  $BtnAddContacts.style.display = 'flex';
  //обнулили счетчик форм
  formCount = 0;
  //удаляем паддинги у блока
  document.querySelector('.graph-modal__btn-block').style.padding = '0';
})
//при закрытии модального окна ИЗМЕНИТЬ КЛИЕНТА удаляем формы
graphModalCloseCorrect.addEventListener('click', () => {
  //нашли все формы с контактами
  const contactForms = document.querySelectorAll('.form-contacts');
  //удаляем все формы для контактов
  contactForms.forEach((form) => {
    form.remove();
  });
  //показываем кнопку добавления форм контактов
  $BtnAddContactsCorrect.style.display = 'flex';
  //обнулили счетчик форм
  formCountCorrect = 0;
  //удаляем паддинги у блока
  document.querySelector('.graph-modal__btn-blockCorrect').style.padding = '0';
})
//По нажатию на кнопку ОТМЕНИТЬ модального окна ДОБАВИТЬ НОВОГО КЛИЕНТА очищаем инпуты,
//удаляем формы, закрываем модальное окно.
$BtnCanselClients.addEventListener('click', function(e) {
  e.preventDefault();
  const contactForms = document.querySelectorAll('.form-contacts');
  //очистка формы
  $formAddSurname.value = '';
  $formAddName.value = '';
  $formAddLastname.value = '';
  //удаляем все формы для контактов
  contactForms.forEach((form) => {
    form.remove();
  });
  //удаляем паддинги у блока
  document.querySelector('.graph-modal__btn-block').style.padding = '0';
  //показываем кнопку добавления форм контактов
  $BtnAddContacts.style.display = 'flex';
  //обнулили счетчик форм
  formCount = 0;
  graphModalClose.click();
})
//По нажатию на кнопку ОТМЕНИТЬ модального окна ИЗМЕНИТЬ КЛИЕНТА очищаем инпуты,
//удаляем формы, закрываем модальное окно.
$BtnCanselClientsCorrect.addEventListener('click', async function(e) {
  e.preventDefault();
  const contactForms = document.querySelectorAll('.form-contacts');
  //очищаем инпуты
  $spanId.textContent = ""
  $inputSurName.value = ""
  $inputName.value = ""
  $inputLastName.value = ""
  //удаляем все формы для контактов
  contactForms.forEach((form) => {
    form.remove();
  });
  //удаляем паддинги у блока
  document.querySelector('.graph-modal__btn-blockCorrect').style.padding = '0';
  //показываем кнопку добавления форм контактов
  $BtnAddContactsCorrect.style.display = 'flex';
  //обнулили счетчик форм
  formCountCorrect = 0;
  //закрываем модальное окно
  graphModalClose.click();
})
//По нажатию на кнопку ОТМЕНИТЬ модального окна (удаление контакта),
//закрываем модальное окно.
$BtnCanselClientsDelete.addEventListener('click', function(e) {
  e.preventDefault();
  //закрываем модальное окно
  graphModalClose.click();
})
//сортировка массива по клику
const $tabletHeadId = document.querySelector('.tablet__head--id'),
      $tabletHeadFio = document.querySelector('.tablet__head--fio'),
      $tabletHeadCreate = document.querySelector('.tablet__head--create'),
      $tabletHeadCorrect = document.querySelector('.tablet__head--correct');
//нашли стрелки
const $arrowId = document.querySelector('.arrow-id'),
      $arrowFio = document.querySelector('.arrow-fio'),
      $arrowCreate = document.querySelector('.arrow-create'),
      $arrowCorrect = document.querySelector('.arrow-correct')
//сортируем и поворачиваем стрелку по клику на ID
$tabletHeadId.addEventListener('click', function() {
  sortColumnFlag = 'id'
  sortDirFlag = !sortDirFlag
  addClientsTable(copyClients)
  $arrowId.style.transform = !sortDirFlag ? 'rotate(-180deg)' : 'rotate(0deg)';
})
//сортируем и поворачиваем стрелку по клику на Fio
$tabletHeadFio.addEventListener('click', function() {
  sortColumnFlag = 'fio'
  sortDirFlag = !sortDirFlag
  addClientsTable(copyClients)
  $arrowFio.style.transform = !sortDirFlag ? 'rotate(-180deg)' : 'rotate(0deg)';
})
//сортируем и поворачиваем стрелку по клику на Create
$tabletHeadCreate.addEventListener('click', function() {
  sortColumnFlag = 'createdAt';
  sortDirFlag = !sortDirFlag;
  addClientsTable(copyClients);
  $arrowCreate.style.transform = !sortDirFlag ? 'rotate(-180deg)' : 'rotate(0deg)';
});
//сортируем и поворачиваем стрелку по клику на Correct
$tabletHeadCorrect.addEventListener('click', function() {
  sortColumnFlag = 'updatedAt';
  sortDirFlag = !sortDirFlag;
  addClientsTable(copyClients);
  $arrowCorrect.style.transform = !sortDirFlag ? 'rotate(-180deg)' : 'rotate(0deg)';
});

//обработчик события фильтрация
//функция для создания задержки
function debounce(fn, delay) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

// вызываем функцию search с задержкой в 300 миллисекунд
$headerSearch.addEventListener(
  "input",
  debounce(function () {
    search(this.value.trim());
  }, 300)
);
