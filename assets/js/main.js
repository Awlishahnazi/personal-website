const themeToggleBtn = document.getElementById('theme-toggle');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        if (document.documentElement.getAttribute('data-theme') === 'light') {
            document.documentElement.removeAttribute('data-theme');
            themeToggleBtn.textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            themeToggleBtn.textContent = '☀️';
        }
    });
}


const projectsGrid = document.getElementById('projects-grid');
if (projectsGrid) {
    const projects = [
        {
            title: "سیستم مدیریت پایگاه داده",
            description: "پیاده‌سازی یک ساختار بهینه برای ذخیره‌سازی و بازیابی اطلاعات با کنترل تراکنش‌ها.",
            tech: "Python / SQL"
        },
        {
            title: "سیستم اتوماسیون با Docker",
            description: "کانتینری کردن سرویس‌ها و راه‌اندازی فرآیند پشتیبان‌گیری خودکار روزانه.",
            tech: "Docker / Linux / Bash"
        },
        {
            title: "وب‌سایت نمونه کار شخصی",
            description: "طراحی و توسعه وب‌سایت شخصی با HTML5، CSS3 و جاوااسکریپت خالص بدون فریم‌ورک.",
            tech: "HTML / CSS / JS"
        }
    ];
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <span class="skill-tag">${project.tech}</span>
        `;
        projectsGrid.appendChild(card);
    });
}


const terminalInput = document.getElementById('terminal-input');
const terminalBody = document.getElementById('terminal-body');

if (terminalInput && terminalBody) {
    terminalInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            const command = terminalInput.value.trim().toLowerCase();
            const userLine = document.createElement('p');
            userLine.textContent = `$ ${command}`;
            terminalBody.appendChild(userLine);

            const responseLine = document.createElement('p');
            
            switch(command) {
                case 'help':
                    responseLine.innerHTML = "دستورات موجود:<br>- <span class='cmd-highlight'>about</span>: درباره من<br>- <span class='cmd-highlight'>skills</span>: مهارت‌ها<br>- <span class='cmd-highlight'>clear</span>: پاک کردن صفحه";
                    break;
                case 'about':
                    responseLine.textContent = "من علی هستم، مهندس کامپیوتر و عاشق توسعه نرم‌افزار.";
                    break;
                case 'skills':
                    responseLine.textContent = "مهارت‌ها: HTML, CSS, JavaScript, Git, Docker, Python";
                    break;
                case 'clear':
                    terminalBody.innerHTML = '';
                    responseLine.textContent = '';
                    break;
                default:
                    responseLine.textContent = `دستور ناشناخته: ${command}. عبارت help را تایپ کنید.`;
            }

            if (command !== 'clear') {
                terminalBody.appendChild(responseLine);
            }

            terminalInput.value = '';
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    });
}


const chatToggleBtn = document.getElementById('chat-toggle-btn');
const chatWindow = document.getElementById('chat-window');
const chatCloseBtn = document.getElementById('chat-close-btn');
const chatBody = document.getElementById('chat-body');
const chatInput = document.getElementById('chat-input');
const chatSendBtn = document.getElementById('chat-send-btn');

if (chatToggleBtn && chatWindow) {
    chatToggleBtn.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
    });

    chatCloseBtn.addEventListener('click', () => {
        chatWindow.classList.add('hidden');
    });

    function sendUserMessage() {
        const text = chatInput.value.trim();
        if (!text) return;

        const userMsg = document.createElement('div');
        userMsg.className = 'message user-message';
        userMsg.textContent = text;
        chatBody.appendChild(userMsg);
        chatInput.value = '';
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            const botMsg = document.createElement('div');
            botMsg.className = 'message bot-message';
            botMsg.textContent = "پاسخ دریافت شد! (این نسخه نمایشی چت‌بات است. می‌توانید آن را به بک‌اند یا API ربات تلگرامتان متصل کنید).";
            chatBody.appendChild(botMsg);
            chatBody.scrollTop = chatBody.scrollHeight;
        }, 1000);
    }

    chatSendBtn.addEventListener('click', sendUserMessage);
    chatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            sendUserMessage();
        }
    });
}