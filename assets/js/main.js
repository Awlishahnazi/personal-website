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
                responseLine.innerHTML = `
                    <div>دستورات موجود:</div>
                    <div>- <span class='cmd-highlight'>about</span>: درباره من</div>
                    <div>- <span class='cmd-highlight'>skills</span>: مهارت‌ها</div>
                    <div>- <span class='cmd-highlight'>projects</span>: لیست پروژه‌ها</div>
                    <div>- <span class='cmd-highlight'>contact</span>: راه‌های ارتباطی</div>
                    <div>- <span class='cmd-highlight'>whoami</span>: نمایش نام کاربر</div>
                    <div>- <span class='cmd-highlight'>date</span>: نمایش تاریخ و زمان</div>
                    <div>- <span class='cmd-highlight'>echo [متن]</span>: تکرار متن شما</div>
                    <div>- <span class='cmd-highlight'>clear</span>: پاک کردن صفحه</div>
                `;
                break;
                
            case 'about':
                responseLine.textContent = "من علی هستم، مهندس کامپیوتر و عاشق توسعه نرم‌افزار.";
                break;
                
            case 'skills':
                responseLine.textContent = "مهارت‌ها: Python, HTML/CSS, JavaScript, Git, Docker, Database Design";
                break;

            case 'projects':
                responseLine.innerHTML = `
                    <div>پروژه‌های من:</div>
                    <div>1. چت‌بات هوش مصنوعی (ربات تلگرام)</div>
                    <div>2. وب‌سایت نمونه کار شخصی (همین سایت!)</div>
                    <div>3. سیستم مدیریت پایگاه داده</div>
                `;
                break;

            case 'contact':
                responseLine.innerHTML = `
                    <div>ایمیل: alishahnazi83@gmail.com</div>
                    <div>لینکدین: linkedin.com/in/ali-shahnazi-678bba342</div>
                    <div>گیت‌هاب: github.com/Awlishahnazi</div>
                `;
                break;

            case 'whoami':
                responseLine.textContent = "guest (کاربر مهمان)";
                break;

            case 'date':
                responseLine.textContent = new Date().toLocaleString('fa-IR');
                break;

            case 'sudo':
                responseLine.textContent = "bash: sudo: Permission denied. You are not root!";
                break;

            case 'clear':
                terminalBody.innerHTML = '';
                responseLine.textContent = '';
                break;

            default:
                // پشتیبانی از دستور echo (مثلاً: echo Hello World)
                if (command.startsWith('echo ')) {
                    responseLine.textContent = command.substring(5);
                } else {
                    responseLine.textContent = `bash: command not found: ${command}. Type 'help' for a list of commands.`;
                }
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