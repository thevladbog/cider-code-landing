#!/usr/bin/env node

/**
 * Локальный тест SMTP подключения для Яндекс.Почты
 * Использование: node smtp-yandex-test.js
 */

const nodemailer = require('nodemailer');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => {
    rl.question(question, resolve);
  });
}

async function testSmtpConnection() {
  console.log('🔧 Тест SMTP подключения к Яндекс.Почте\n');

  try {
    // Получаем credentials от пользователя
    const smtpUser = await ask('Введите email (example@yandex.ru): ');
    const smtpPass = await ask('Введите пароль приложения: ');

    console.log('\n📋 Анализ credentials:');
    console.log(`Email: ${smtpUser}`);
    console.log(`Email длина: ${smtpUser.length}`);
    console.log(`Email домен: ${smtpUser.includes('@') ? smtpUser.split('@')[1] : 'НЕТ ДОМЕНА'}`);
    console.log(`Email - Яндекс: ${smtpUser.includes('@yandex.') || smtpUser.includes('@ya.ru') ? 'ДА' : 'НЕТ'}`);
    console.log(`Пароль длина: ${smtpPass.length}`);
    console.log(`Пароль содержит пробелы: ${smtpPass.includes(' ') ? 'ДА (ПРОБЛЕМА!)' : 'НЕТ'}`);
    console.log(`Пароль начинается с "app": ${smtpPass.startsWith('app') ? 'ДА' : 'НЕТ'}`);

    // Проверки
    const warnings = [];
    if (!smtpUser.includes('@')) warnings.push('❌ Email не содержит @');
    if (!(smtpUser.includes('@yandex.') || smtpUser.includes('@ya.ru'))) {
      warnings.push('❌ Email не принадлежит Яндексу');
    }
    if (smtpPass.includes(' ')) warnings.push('❌ Пароль содержит пробелы');
    if (smtpPass.length < 10) warnings.push('❌ Пароль слишком короткий');

    if (warnings.length > 0) {
      console.log('\n⚠️  Предупреждения:');
      warnings.forEach(w => console.log(w));
    }

    console.log('\n🔄 Подключение к smtp.yandex.ru:465...');

    // Создаём транспорт
    const transporter = nodemailer.createTransport({
      host: 'smtp.yandex.ru',
      port: 465,
      secure: true,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      debug: false,
      logger: false,
    });

    // Тестируем подключение
    await transporter.verify();

    console.log('✅ УСПЕХ! SMTP подключение работает');
    console.log('\n📧 Отправляем тестовое письмо...');

    // Отправляем тестовое письмо
    const testEmail = {
      from: smtpUser,
      to: smtpUser, // отправляем самому себе
      subject: '🧪 Тест SMTP - BOTTLE CODE',
      text: `Тестовое письмо отправлено ${new Date().toLocaleString()}`,
      html: `
        <h2>✅ Тест SMTP успешен!</h2>
        <p>Это тестовое письмо подтверждает, что SMTP настроен корректно.</p>
        <p><strong>Время отправки:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Отправлено от:</strong> BOTTLE CODE Landing Test</p>
      `
    };

    const result = await transporter.sendMail(testEmail);
    console.log('📬 Письмо отправлено успешно!');
    console.log(`Message ID: ${result.messageId}`);

    console.log('\n🎉 ВСЁ РАБОТАЕТ! Можете использовать эти credentials в production');

  } catch (error) {
    console.log('\n❌ ОШИБКА SMTP подключения:');
    console.log(`Сообщение: ${error.message}`);
    
    if (error.code) console.log(`Код ошибки: ${error.code}`);
    if (error.response) console.log(`Ответ сервера: ${error.response}`);

    console.log('\n🔧 Возможные решения:');
    
    if (error.message.includes('authentication failed') || error.message.includes('Invalid user or password')) {
      console.log('1. 🔑 Создайте новый пароль приложения для "Почта" в Яндекс.Паспорт');
      console.log('2. ✅ Убедитесь что включена двухфакторная аутентификация');
      console.log('3. 📧 Проверьте правильность email адреса');
      console.log('4. 🌐 Попробуйте зайти в Яндекс.Почту через браузер');
      console.log('5. 🚫 Проверьте что аккаунт не заблокирован');
    } else if (error.message.includes('ENOTFOUND') || error.message.includes('ECONNREFUSED')) {
      console.log('1. 🌐 Проверьте интернет соединение');
      console.log('2. 🛡️  Проверьте настройки файрвола/антивируса');
      console.log('3. 🔌 Убедитесь что порт 465 не заблокирован');
    } else {
      console.log('1. 🔄 Попробуйте через несколько минут');
      console.log('2. 📞 Обратитесь в поддержку Яндекс');
    }

    console.log('\n📚 Подробная инструкция: docs/YANDEX-SMTP-TROUBLESHOOTING.md');
  } finally {
    rl.close();
  }
}

// Запуск теста
testSmtpConnection().catch(console.error);
