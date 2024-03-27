/* Nav icon */
const navBtn = document.querySelector('.nav-icon-btn');
const navIcon = document.querySelector('.nav-icon');
const nav = document.querySelector('.header__top-row');

navBtn.onclick = function () {
    navIcon.classList.toggle('nav-icon--active');
    nav.classList.toggle('header__top-row--mobile');
    document.body.classList.toggle('no-scroll');
}

/* Phone Mask */
mask('[data-tel-input]');

// Удаляем '+' если больше ничего не введено, чтобы показать placeholder
const phoneInputs = document.querySelectorAll('[data-tel-input]');
phoneInputs.forEach((input)=>{
	input.addEventListener('input', ()=>{
		if (input.value == '+') input.value = '';
	})
	input.addEventListener('blur', ()=>{
		if (input.value == '+') input.value = '';
	})
});

/* Yandex Map */

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
	// Создание карты.
	var map = new ymaps.Map('map', {
		// Координаты центра карты.
		// Порядок по умолчанию: «широта, долгота».
		// Чтобы не определять координаты центра карты вручную,
		// воспользуйтесь инструментом Определение координат.
		center: [55.855994, 37.575708],
		// Уровень масштабирования. Допустимые значения:
		// от 0 (весь мир) до 19.
		zoom: 16,
	});

	var myPlacemark = new ymaps.Placemark(
		[55.855994, 37.575708],
		{
			balloonContent: `
				<div class="balloon">
					<div class="balloon__address">Город Москва</div>
					<div class="balloon__contacts">
						<a href="tel:+79651254410">8 (965) 125-44-10</a>
					</div>
				</div>
			`,
		},
		{
			iconLayout: 'default#image',
			iconImageHref: './img/map/location-pin.svg',
			iconImageSize: [40, 40],
			iconImageOffset: [-20, -40],
		}
	);

	map.controls.remove('geolocationControl'); // удаляем геолокацию
	map.controls.remove('searchControl'); // удаляем поиск
	map.controls.remove('trafficControl'); // удаляем контроль трафика
	map.controls.remove('typeSelector'); // удаляем тип

	// map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	// map.controls.remove('zoomControl'); // удаляем контрол зуммирования
	map.controls.remove('rulerControl'); // удаляем контрол правил
	map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

	map.geoObjects.add(myPlacemark);
    myPlacemark.balloon.open();

}






document.getElementById('myForm').addEventListener('submit', function (event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get form data
    var formData = new FormData(this);
    var name = formData.get('name');
    var marka = formData.get('marka');

    // Validate form data
    if (name.trim() === '' || marka.trim() === '') {
        // Display an error message (you can modify this part according to your UI structure)
        alert('Please fill out all fields');
        return;
    }

    // Create message for Telegram
    var telegramMessage = "Новая форма:\n\nИмя: " + name + "\nМарка: " + marka;

    // Replace 'YOUR_BOT_TOKEN' and 'YOUR_CHAT_ID' with your actual values
    var botToken = '6522153995:AAFFVQikaxXzspeDy8iszZXTSTN_-t08lq8';
    var chatId = '-1002026333828';

    // Form URL for sending message through Telegram Bot API
    var telegramApiUrl = "https://api.telegram.org/bot" + botToken + "/sendMessage?chat_id=" + chatId + "&text=" + encodeURIComponent(telegramMessage);

    // Reference to the success div
    var successDiv = document.querySelector('.success');

    // Send message to Telegram
    fetch(telegramApiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Ошибка при отправке сообщения в Telegram');
            }
            return response.json(); // assuming your Telegram API returns JSON
        })
        .then(data => {
            // Handle success
            console.log(data);
            successDiv.innerHTML = 'Ваша форма успешно отправлена. Мы свяжемся с вами в ближайшее время.';
        })
        .catch(error => {
            // Handle error
            console.error(error);
            successDiv.innerHTML = 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.';
        });
});


