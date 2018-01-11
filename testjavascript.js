var content = []; // Массив для начального заполнения страницы
// Каждый элемент - это объект со свойствами: author, name, year, img
var content = [];
content[0] = {};
content[0].author = "Л. Н. Толстой";
content[0].name = "Анна Каренина";
content[0].year = 2017;
content[0].img = "https://static.my-shop.ru/product/2/134/1339490.jpg";
content[1] = {};
content[1].author = "А. С. Пушкин";
content[1].name = "Евгений Онегин";
content[1].year = 1837;
content[1].img = "https://static.my-shop.ru/product/2/70/696651.jpg";
content[2] = {};
content[2].author = "Д. Остин";
content[2].name = "Гордость и предубеждение";
content[2].year = 2017;
content[2].img = "https://static.my-shop.ru/product/2/65/645843.jpg";
content[3] = {};
content[3].author = " P. Gregory";
content[3].name = "The Other Boleyn Girl";
content[3].year = 2001;
content[3].img = "http://t3.gstatic.com/images?q=tbn:ANd9GcQIqNDk76_T7sDtcomTlTWylrC_nSZP6GtEjZYLSMoy3cUcBHVN";
// Глобальная переменная, в которой хранится номер редактируемой строки и выбор режима редактирования или добавления
var oper = 0;

// Инициализация. Заполняет таблицу из массива content
function initialize() {
  for (j = 0; j <= content.length - 1; j++) {
    createRow(j, content[j]);
  }
}

// Создаёт TR
// b - параметр, в который передаётся номер строки
// obj_param - параметр, в который передаётся объект со свойствами Img, Author, Name, Year
function createRow(b, obj_param) {
  var button_delete = '<input class="button_del" type= "button" onclick="delRow(this);" value="Удалить"/>';
  var button_ed = '<input class="button_edit" type= "button" onclick="sectionAdd(this);" value="Редактировать"/>';
  list.insertRow(b);
  list.rows[b].insertCell(0);
  list.rows[b].insertCell(1);
  list.rows[b].insertCell(2);
  list.rows[b].cells[0].innerHTML = '<img class="td_img" src="' + obj_param.img + '" alt="' + obj_param.name + '">';
  list.rows[b].cells[1].innerHTML = '<span class="td_name">' + obj_param.name + '</span>' +
          '<br/><span class="td_author">' + obj_param.author + '</span>' +
          '<br/><span class="td_year">' + obj_param.year + '</span>';
  list.rows[b].cells[2].innerHTML = button_ed + '<br/>' + button_delete;
}

// Удаляет строку в контексте нажатия кнопки
function delRow(a) {
  $(a).closest('tr').remove();
}

// Сохраняет значения введённые пользователем в новый объект для вызова функции создания строки
function addRow() {
  var saveObj = {};  
  saveObj.name = $('.form_text_name').val();
  saveObj.author = $('.form_text_author').val();
  saveObj.year = $('.form_text_year').val();
  saveObj.img = $('.form_text_img').val();
  var tr_count = list.rows.length;
  createRow(tr_count, saveObj);   
}

// Редактирует строку
function editRow() {
  $(".td_img")[oper].src = $('.form_text_img').val();
  $(".td_name")[oper].textContent = $('.form_text_name').val();
  $(".td_author")[oper].textContent = $('.form_text_author').val();
  $(".td_year")[oper].textContent = $('.form_text_year').val();
}

// Выбор режима редактирования/добавления
// В a передаётся либо "-1" либо контекст нажатия кнопки "Редактировать"
function sectionAdd(a) {
  if (a === -1) {
    // Режим добавления
    oper = a;
    $('.form_text_name')[0].value = "";
    $('.form_text_author')[0].value = "";
    $('.form_text_year')[0].value = "";
    $('.form_text_img')[0].value = "";    
    $('.form_edit_list_span')[0].textContent = "Добавление книги";
  } else {
    // Режим редактирования
    // В oper записываем порядковый номер редактируемой строки
    oper = $(a).closest('tr').index();
    $('.form_text_img')[0].value = $(".td_img")[oper].src;
    $('.form_text_name')[0].value = $(".td_name")[oper].textContent;
    $('.form_text_author')[0].value = $(".td_author")[oper].textContent;
    $('.form_text_year')[0].value = $(".td_year")[oper].textContent;
    $('.form_edit_list_span')[0].textContent = "Редактирование книги";
  }
  // Скрываем/отображаем, то что нужно
  $('.form_edit_list')[0].style.display = "block";  
  $('#list').css('display', 'none');
  $('.form_add').css('display', 'none');  
  // Ставим фокус
  $(".form_text_author").focus();
 
}

// Валидация и сохранение введённых данных в зависимости от выбранного режима
function saveChanges() {
  var val = $(".form_text_year")[0].value;
  if (val >= 2018) {
    alert("Введенное значение не может быть больше 2017");
  } else {
    if (oper === -1) {
      addRow();
    } else {
      editRow();
    }
    // Скрываем форму после использования
    sectionCancel();
  }
}

// Кнопка отмены + очистка формы
function sectionCancel() {
  $(".form_text_author")[0].value = "";
  $(".form_text_name")[0].value = "";
  $(".form_text_year")[0].value = "";
  $(".form_text_img")[0].value = "";
  // Скрываем/отображаем, то что нужно
  $(".form_edit_list")[0].style.display = "none";
  $('#list')[0].style.display = "table";
  $('.form_add').css('display', 'block'); 
}