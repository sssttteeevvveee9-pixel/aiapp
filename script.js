import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai";

// ★★★ 請將下面這行引號內的文字換成你的 API Key ★★★
const API_KEY = "AIzaSyDvWhhjHmRqNOdAUfd0i16qaUL8MaSg0Uc";

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

window.sendMessage = async function() {
    const inputField = document.getElementById('user-input');
    const historyDiv = document.getElementById('chat-history');
    const userText = inputField.value;

    if (!userText) return;

    // 顯示使用者訊息
    historyDiv.innerHTML += `<div class="message user">${userText}</div>`;
    inputField.value = '';

    try {
        const result = await model.generateContent(userText);
        const response = await result.response;
        const text = response.text();
        
        // 顯示 AI 回應
        historyDiv.innerHTML += `<div class="message ai">${text}</div>`;
    } catch (error) {
        historyDiv.innerHTML += `<div class="message ai">發生錯誤，請檢查 API Key 或網路。</div>`;
        console.error(error);
    }
    
    // 捲動到底部
    historyDiv.scrollTop = historyDiv.scrollHeight;
}