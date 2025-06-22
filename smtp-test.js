// Быстрый тест SMTP подключения
// Запуск: node smtp-test.js

const nodemailer = require('nodemailer');

async function testSMTPConnection() {
  console.log('🔧 Тестирование SMTP подключения...\n');
  
  // Проверяем переменные окружения
  const requiredEnvVars = ['SMTP_USER', 'SMTP_PASS'];
  const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('❌ Отсутствуют переменные окружения:', missingVars.join(', '));
    return;
  }
  
  console.log('✅ Переменные окружения найдены');
  console.log(`📧 SMTP_USER: ${process.env.SMTP_USER}`);
  console.log(`🔐 SMTP_PASS: ${process.env.SMTP_PASS ? '***установлен***' : '***отсутствует***'}\n`);
  
  // Создаем транспорт
  const transporter = nodemailer.createTransporter({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
  
  try {
    console.log('🔄 Проверяем подключение к SMTP...');
    await transporter.verify();
    console.log('✅ SMTP подключение успешно!');
    
    // Опционально: отправляем тестовое письмо
    if (process.argv.includes('--send-test')) {
      console.log('\n📤 Отправляем тестовое письмо...');
      const info = await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: process.env.SMTP_USER, // отправляем себе
        subject: 'BOTTLE CODE SMTP Test',
        text: 'Тестовое письмо для проверки SMTP настроек.',
        html: '<p>Тестовое письмо для проверки SMTP настроек.</p>'
      });
      
      console.log('✅ Письмо отправлено:', info.messageId);
    }
    
  } catch (error) {
    console.error('❌ Ошибка SMTP подключения:');
    console.error('Код ошибки:', error.code);
    console.error('Сообщение:', error.message);
    
    if (error.message.includes('authentication failed')) {
      console.log('\n💡 Возможные решения:');
      console.log('1. Проверьте правильность email и пароля');
      console.log('2. Используйте пароль приложения вместо обычного пароля');
      console.log('3. Убедитесь что включена двухфакторная аутентификация');
      console.log('4. См. инструкцию: docs/YANDEX-MAIL-SETUP.md');
    }
  }
}

// Запускаем тест
testSMTPConnection().catch(console.error);
