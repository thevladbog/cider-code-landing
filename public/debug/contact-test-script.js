/**
 * Быстрый тест формы обратной связи для использования в browser console
 * Скопируйте и вставьте этот код в DevTools Console на странице сайта
 */

(function() {
  console.log("🧪 BOTTLE [CODE] Contact Form Quick Test");
  
  // Функция для тестирования API
  window.testContactAPI = async function() {
    console.group("🔧 API Environment Test");
    
    try {
      const response = await fetch("/api/debug/contact-test");
      const data = await response.json();
      
      console.log("✅ Debug endpoint response:", data);
      
      // Анализ результатов
      const env = data.debug?.environment;
      if (env) {
        console.log("📊 Environment Status:");
        Object.entries(env).forEach(([key, value]) => {
          console.log(`  ${key}: ${value}`);
        });
      }
      
      const smtp = data.debug?.smtp;
      if (smtp) {
        console.log("📧 SMTP Status:", smtp);
      }
      
      return data;
    } catch (error) {
      console.error("❌ Failed to test API:", error);
      return null;
    } finally {
      console.groupEnd();
    }
  };
  
  // Функция для тестирования отправки формы
  window.testContactForm = async function(email = "test@example.com") {
    console.group("📧 Contact Form Test");
    
    const testData = {
      email: email,
      company: "Debug Test Company",
      message: `Test message from browser console at ${new Date().toISOString()}`
    };
    
    console.log("📤 Sending test data:", testData);
    
    try {
      const startTime = performance.now();
      
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(testData),
      });
      
      const endTime = performance.now();
      const duration = Math.round(endTime - startTime);
      
      console.log(`⏱️ Request completed in ${duration}ms`);
      console.log("📥 Response status:", response.status, response.statusText);
      
      const responseData = await response.json();
      console.log("📊 Response data:", responseData);
      
      if (response.ok) {
        console.log("✅ Test successful!");
        if (responseData.taskId) {
          console.log("🎫 Tracker task ID:", responseData.taskId);
        }
      } else {
        console.error("❌ Test failed with error:", responseData.message);
      }
      
      return responseData;
    } catch (error) {
      console.error("💥 Network error:", error);
      return null;
    } finally {
      console.groupEnd();
    }
  };
  
  // Функция для проверки переменных окружения (client-side)
  window.checkClientEnvironment = function() {
    console.group("🌍 Client Environment Check");
    
    console.log("📱 User Agent:", navigator.userAgent);
    console.log("🌐 Online Status:", navigator.onLine ? "Online" : "Offline");
    console.log("📍 Current URL:", window.location.href);
    console.log("🔒 Protocol:", window.location.protocol);
    console.log("🏠 Hostname:", window.location.hostname);
    console.log("🚪 Port:", window.location.port || "default");
    console.log("⏰ Current Time:", new Date().toISOString());
    console.log("🌏 Timezone:", Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log("💾 LocalStorage available:", typeof Storage !== "undefined");
    console.log("🍪 Cookies enabled:", navigator.cookieEnabled);
    
    // Проверка fetch API
    console.log("🔄 Fetch API available:", typeof fetch !== "undefined");
    
    // Проверка доступности console методов
    console.log("🔧 Console methods:", {
      log: typeof console.log,
      error: typeof console.error,
      group: typeof console.group,
      groupEnd: typeof console.groupEnd,
    });
    
    console.groupEnd();
  };
  
  console.log("🎯 Available test functions:");
  console.log("  - testContactAPI() - Test debug endpoint");
  console.log("  - testContactForm('your@email.com') - Test form submission");
  console.log("  - checkClientEnvironment() - Check browser environment");
  console.log("");
  console.log("💡 Example usage:");
  console.log("  await testContactAPI();");
  console.log("  await testContactForm('test@example.com');");
  console.log("  checkClientEnvironment();");
})();
