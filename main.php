<?php
// Вывести данные из формы для отладки
var_dump($_POST);

// Получите данные из формы
$name = $_POST['name'];
$marka = $_POST['marka'];

// Вывести данные после получения из формы
var_dump($name);
var_dump($marka);

// Замените 'YOUR_BOT_TOKEN' и 'YOUR_CHAT_ID' на реальные значения
$botToken = '6522153995:AAFFVQikaxXzspeDy8iszZXTSTN_-t08lq8';
$chatId = '-1002026333828';

// Создайте сообщение для отправки в Telegram
$telegramMessage = "Новая форма:\n\nИмя: $name\nМарка: $marka";

// Формируем URL для отправки сообщения через API бота Telegram
$telegramApiUrl = "https://api.telegram.org/bot$botToken/sendMessage?chat_id=$chatId&text=" . urlencode($telegramMessage);

// Отправляем запрос к Telegram API
$ch = curl_init($telegramApiUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Проверяем успешность отправки
if (!$response) {
    die('Ошибка при отправке сообщения в Telegram');
}

// Выводим JavaScript для отображения модального окна
echo '<script>
    alert("Ваша форма успешно отправлена. Мы свяжемся с вами в ближайшее время.");
</script>';
?>
