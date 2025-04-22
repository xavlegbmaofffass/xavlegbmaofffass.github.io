// Получаем текущего пользователя (в реальном приложении это может быть из системы аутентификации)
const currentUser = 'user1'; // Замените на реальный идентификатор пользователя

// Функция для загрузки данных пользователя
function loadUserData() {
  const userData = JSON.parse(localStorage.getItem(`userData_${currentUser}`)) || {};
  
  // Устанавливаем аватар
  if (userData.avatar) {
    document.getElementById('avatar-image').src = userData.avatar;
  }
  
  // Устанавливаем текстовые данные
  const fields = ['name', 'email', 'birthday', 'phone'];
  fields.forEach(field => {
    if (userData[field]) {
      document.getElementById(`${field}-value`).textContent = userData[field];
    }
  });
}

// Функция для сохранения данных пользователя
function saveUserData() {
  const userData = {
    avatar: document.getElementById('avatar-image').src,
    name: document.getElementById('name-value').textContent,
    email: document.getElementById('email-value').textContent,
    birthday: document.getElementById('birthday-value').textContent,
    phone: document.getElementById('phone-value').textContent
  };
  
  localStorage.setItem(`userData_${currentUser}`, JSON.stringify(userData));
}

// Загружаем данные при загрузке страницы
document.addEventListener('DOMContentLoaded', loadUserData);

// Обработчик кнопки смены аватара
document.getElementById('change-avatar-btn').addEventListener('click', function() {
  document.getElementById('avatar-upload').click();
});

// Обработчик загрузки аватара
document.getElementById('avatar-upload').addEventListener('change', function(e) {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    
    reader.onload = function(event) {
      const avatar = document.getElementById('avatar-image');
      avatar.src = event.target.result;
      
      const tempImg = new Image();
      tempImg.onload = function() {
        console.log("Загруженное изображение:", tempImg.width, "x", tempImg.height);
      };
      tempImg.src = event.target.result;
      
      // Сохраняем данные после изменения аватара
      saveUserData();
    };
    
    reader.readAsDataURL(e.target.files[0]);
  }
});

let isEditMode = false;
const settingsBtn = document.getElementById('settings-btn');
const saveBtn = document.getElementById('save-btn');
const inputs = document.querySelectorAll('.edit-input');
const values = document.querySelectorAll('.field-value');

settingsBtn.addEventListener('click', function() {
  isEditMode = !isEditMode;
  
  if (isEditMode) {
    settingsBtn.textContent = 'Отменить';
    saveBtn.style.display = 'block';
    document.getElementById('name-input').value = document.getElementById('name-value').textContent;
    document.getElementById('email-input').value = document.getElementById('email-value').textContent;
    document.getElementById('birthday-input').value = document.getElementById('birthday-value').textContent;
    document.getElementById('phone-input').value = document.getElementById('phone-value').textContent;
    inputs.forEach(input => input.style.display = 'inline-block');
    values.forEach(value => value.style.display = 'none');
  } else {
    cancelEdit();
  }
});

saveBtn.addEventListener('click', function() {
  document.getElementById('name-value').textContent = document.getElementById('name-input').value;
  document.getElementById('email-value').textContent = document.getElementById('email-input').value;
  document.getElementById('birthday-value').textContent = document.getElementById('birthday-input').value;
  document.getElementById('phone-value').textContent = document.getElementById('phone-input').value;
  
  // Сохраняем данные после редактирования
  saveUserData();
  cancelEdit();
});

function cancelEdit() {
  isEditMode = false;
  settingsBtn.textContent = 'Настройки';
  saveBtn.style.display = 'none';
  inputs.forEach(input => input.style.display = 'none');
  values.forEach(value => value.style.display = 'inline');
}