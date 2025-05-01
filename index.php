<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سایت شخصی محمد حمزه</title>
    <link rel="preconnect" href="https://cdn.jsdelivr.net">
    <link rel="preconnect" href="https://cdnjs.cloudflare.com">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font/dist/font-face.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary-color: #3a7bd5;
            --secondary-color: #00d2ff;
            --dark-color: #2d3436;
            --light-color: #f8f9fa;
            --accent-color: #00cec9;
            --text-color: #2d3436;
            --box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
            --hover-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
            --gradient: linear-gradient(120deg, var(--primary-color), var(--secondary-color));
        }
        
        body {
            font-family: 'Vazir', sans-serif;
            margin: 0;
            padding: 0;
            background-color: var(--light-color);
            color: var(--text-color);
            line-height: 1.7;
        }
        
        .container {
            max-width: 95%;
            margin: 0 auto;
            padding: 0 15px;
        }
        
        @media (min-width: 768px) {
            .container {
                max-width: 85%;
            }
        }
        
        /* Header */
        #main-info {
            position: relative;
            background: #fff;
            border-radius: 20px;
            padding: 35px 25px;
            margin-top: 25px;
            box-shadow: var(--box-shadow);
            overflow: hidden;
            text-align: center;
            transition: all 0.3s ease;
        }
        
        #main-info::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 8px;
            background: var(--gradient);
        }
        
        #main-info:hover {
            transform: translateY(-5px);
            box-shadow: var(--hover-shadow);
        }
        
        #main-info img {
            width: 150px;
            height: 150px;
            object-fit: cover;
            border-radius: 50%;
            border: 4px solid #fff;
            box-shadow: 0 0 20px rgba(58, 123, 213, 0.3);
            transition: all 0.3s ease;
        }
        
        #main-info img:hover {
            transform: scale(1.05);
        }
        
        #main-info h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-top: 20px;
            color: var(--dark-color);
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
        
        #main-info p {
            font-size: 1rem;
            color: #636e72;
            margin: 10px 0 20px;
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        
        /* Social Links */
        .social-links {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 10px;
            margin-top: 20px;
        }
        
        .social-btn {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            background: var(--gradient);
            transition: all 0.3s ease;
            text-decoration: none;
            font-size: 18px;
        }
        
        .social-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
            margin-top: 20px;
        }
        
        .contact-btn {
            display: flex;
            align-items: center;
            padding: 8px 20px;
            background: #fff;
            border: 1px solid #e0e0e0;
            border-radius: 50px;
            box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
            color: var(--dark-color);
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 0.9rem;
        }
        
        .contact-btn i {
            margin-left: 8px;
            color: var(--primary-color);
        }
        
        .contact-btn:hover {
            background: var(--gradient);
            color: #fff;
            border-color: transparent;
        }
        
        .contact-btn:hover i {
            color: #fff;
        }
        
        /* Sites Section */
        #sites-list {
            padding: 40px 0;
        }
        
        #sites-list h2 {
            text-align: center;
            margin-bottom: 30px;
            position: relative;
            padding-bottom: 15px;
            color: var(--dark-color);
        }
        
        #sites-list h2::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 4px;
            background: var(--gradient);
            border-radius: 2px;
        }
        
        #siteList {
            display: grid;
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 0;
        }
        
        @media (min-width: 768px) {
            #siteList {
                grid-template-columns: repeat(2, 1fr);
            }
        }
        
        @media (min-width: 992px) {
            #siteList {
                grid-template-columns: repeat(3, 1fr);
            }
        }
        
        .site-item {
            background: #fff;
            border-radius: 15px;
            box-shadow: var(--box-shadow);
            padding: 25px;
            text-align: right;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            border: 1px solid rgba(0,0,0,0.05);
        }
        
        .site-item::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 6px;
            height: 100%;
            background: var(--gradient);
            border-radius: 4px 0 0 4px;
        }
        
        .site-item:hover {
            transform: translateY(-5px);
            box-shadow: var(--hover-shadow);
        }
        
        .site-item h3 {
            font-size: 1.2rem;
            margin: 0 0 10px;
            color: var(--dark-color);
            padding-right: 10px;
        }
        
        .site-item-preview {
            position: absolute;
            bottom: 10px;
            left: 10px;
            background: var(--gradient);
            color: #fff;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: all 0.3s ease;
        }
        
        .site-item:hover .site-item-preview {
            opacity: 1;
        }
        
        /* Buttons */
        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin: 40px 0;
        }
        
        .action-btn {
            padding: 10px 25px;
            background: #fff;
            border: none;
            border-radius: 50px;
            box-shadow: var(--box-shadow);
            color: var(--dark-color);
            font-weight: 500;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            z-index: 1;
        }
        
        .action-btn::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 0%;
            height: 100%;
            background: var(--gradient);
            transition: all 0.4s ease;
            z-index: -1;
            border-radius: 50px;
        }
        
        .action-btn:hover {
            color: #fff;
        }
        
        .action-btn:hover::before {
            width: 100%;
            right: auto;
            left: 0;
        }
        
        .action-btn i {
            margin-left: 8px;
        }
        
        /* Modal Styling */
        .modal-content {
            border: none;
            border-radius: 15px;
            overflow: hidden;
        }
        
        .modal-header {
            background: var(--gradient);
            color: #fff;
            border: none;
            padding: 15px 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-title {
            font-weight: 600;
        }
        
        .modal-body {
            padding: 25px;
            color: var(--text-color);
        }
        
        .modal-footer {
            border-top: 1px solid #f1f1f1;
            padding: 15px 20px;
        }
        
        .modal-btn {
            padding: 8px 25px;
            border-radius: 50px;
            background: var(--gradient);
            color: #fff;
            border: none;
            transition: all 0.3s ease;
            text-decoration: none;
        }
        
        .modal-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 5px 15px rgba(58, 123, 213, 0.3);
            color: #fff;
        }
        
        .btn-close {
            background-color: #fff;
            border-radius: 50%;
            opacity: 1;
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
        }
        
        /* Animation with reduced intensity for better performance */
        @keyframes fadeIn {
            from { opacity: 0.7; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        #main-info, #sites-list, .action-buttons {
            animation: fadeIn 0.5s ease-out forwards;
        }
        
        #sites-list {
            animation-delay: 0.1s;
        }
        
        .action-buttons {
            animation-delay: 0.2s;
        }
        
        /* Footer */
        footer {
            text-align: center;
            padding: 20px 0;
            margin-top: 20px;
            color: #b2bec3;
            font-size: 0.9rem;
        }
        
        /* Responsive Design */
        @media (max-width: 576px) {
            #main-info {
                padding: 25px 15px;
            }
            
            #main-info h1 {
                font-size: 1.8rem;
            }
            
            .action-buttons {
                flex-direction: column;
                align-items: center;
                gap: 10px;
            }
            
            .action-btn {
                width: 100%;
                max-width: 250px;
            }
        }
        
        /* Dark mode toggle */
        .theme-toggle {
            position: fixed;
            bottom: 30px;
            left: 30px;
            width: 50px;
            height: 50px;
            background: var(--gradient);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #fff;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            z-index: 999;
            border: none;
            transition: all 0.3s ease;
        }
        
        .theme-toggle:hover {
            transform: scale(1.1);
        }
        
        /* Contact Items in Modal */
        .contact-item {
            display: flex;
            align-items: center;
            margin-bottom: 15px;
            padding: 10px 15px;
            background: #f8f9fa;
            border-radius: 10px;
            transition: all 0.3s ease;
        }
        
        .contact-item:hover {
            transform: translateX(-5px);
            background: #edf2f7;
        }
        
        .contact-item i {
            margin-left: 15px;
            color: var(--primary-color);
            font-size: 1.2rem;
        }
        
        .contact-item span {
            font-weight: 500;
        }
        
        /* Lazy Loading for Images */
        .lazy-load {
            opacity: 0;
            transition: opacity 0.3s;
        }
        
        .lazy-load.loaded {
            opacity: 1;
        }
        
        /* Loading Indicator */
        .loading {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #fff;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
            transition: opacity 0.5s, visibility 0.5s;
        }
        
        .loading.hidden {
            opacity: 0;
            visibility: hidden;
        }
        
        .loading-spinner {
            width: 50px;
            height: 50px;
            border: 5px solid #f3f3f3;
            border-top: 5px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Dark Mode Styles */
        .dark-mode {
            --light-color: #1a1a2e;
            --text-color: #e6e6e6;
        }
        
        .dark-mode #main-info,
        .dark-mode .site-item,
        .dark-mode .action-btn,
        .dark-mode .modal-content {
            background-color: #16213e;
            color: #e6e6e6;
        }
        
        .dark-mode #main-info h1,
        .dark-mode .site-item h3 {
            color: #e6e6e6;
        }
        
        .dark-mode #main-info p {
            color: #a7a7a7;
        }
        
        .dark-mode .contact-btn {
            background: #16213e;
            border-color: #2c3e50;
            color: #e6e6e6;
        }
        
        .dark-mode .modal-body {
            color: #e6e6e6;
        }
        
        .dark-mode .modal-footer {
            border-top-color: #2c3e50;
        }
        
        .dark-mode footer {
            color: #8395a7;
        }
        
        .dark-mode .contact-item {
            background: #1e293b;
        }
        
        .dark-mode .contact-item:hover {
            background: #2d3748;
        }
        
        .dark-mode .loading {
            background: #1a1a2e;
        }
        
        .dark-mode .loading-spinner {
            border-color: #2d3748;
            border-top-color: var(--primary-color);
        }
    </style>
</head>
<body>
    <!-- Loading Indicator -->
    <div class="loading" id="loadingIndicator">
        <div class="loading-spinner"></div>
    </div>

    <div class="container">
        <section id="main-info">
            <img src="gibli.jpg" alt="عکس محمد حمزه" class="profile-image lazy-load" loading="lazy">
            <h1 id="name"></h1>
            <p id="description"></p>
            
            <div class="contact-info">
                <a href="#" id="phone" class="contact-btn">
                    <i class="fas fa-phone-alt"></i>
                    <span id="phoneText"></span>
                </a>
                <a href="#" id="email" class="contact-btn">
                    <i class="fas fa-envelope"></i>
                    <span id="emailText"></span>
                </a>
            </div>
            
            <div class="social-links" id="socialLinks"></div>
        </section>

        <section id="sites-list">
            <h2>پروژه‌های من</h2>
            <div id="siteList"></div>
        </section>

        <div class="action-buttons">
            <button class="action-btn" id="aboutBtn" data-bs-toggle="modal" data-bs-target="#infoModal">
                <i class="fas fa-user"></i> درباره من
            </button>
            <button class="action-btn" id="contactBtn" data-bs-toggle="modal" data-bs-target="#infoModal">
                <i class="fas fa-envelope"></i> تماس با من
            </button>
        </div>
        
        <footer>
            <p>© <span id="currentYear"></span> - تمامی حقوق محفوظ است</p>
        </footer>
    </div>
    
    <button class="theme-toggle" id="themeToggle">
        <i class="fas fa-moon"></i>
    </button>

    <!-- مودال سایت‌ها -->
    <div class="modal fade" id="siteModal" tabindex="-1" aria-labelledby="siteModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="siteModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="siteModalBody"></div>
                <div class="modal-footer">
                    <a href="#" id="siteLink" class="modal-btn" target="_blank">
                        <i class="fas fa-external-link-alt"></i>
                        ورود به سایت
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- مودال درباره من و تماس با من -->
    <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="infoModalLabel"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="infoModalBody"></div>
                <div class="modal-footer">
                    <a href="http://cv.m-hamza.ir" class="modal-btn" target="_blank">
                        <i class="fas fa-file-alt"></i>
                        مشاهده رزومه
                    </a>
                </div>
            </div>
        </div>
    </div>

    <script>
        // ابتدا فقط کد ضروری برای لود سریع را اجرا می‌کنیم
        document.getElementById('currentYear').textContent = new Date().getFullYear();
        
        // نمایش لودینگ
        const loadingIndicator = document.getElementById('loadingIndicator');
        
        // تنظیم دارک مود از قبل ذخیره شده
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
            document.querySelector('.theme-toggle i').classList.replace('fa-moon', 'fa-sun');
        }
        
        // بارگذاری لیزی لود تصاویر
        const lazyLoadObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.classList.contains('lazy-load')) {
                        setTimeout(() => {
                            img.classList.add('loaded');
                        }, 100);
                        lazyLoadObserver.unobserve(img);
                    }
                }
            });
        });
        
        document.querySelectorAll('.lazy-load').forEach(img => {
            lazyLoadObserver.observe(img);
        });
        
        // لود بوتسترپ به صورت آسنکرون
        const loadBootstrap = () => {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js';
                script.async = true;
                script.onload = resolve;
                document.body.appendChild(script);
            });
        };
        
        // بارگذاری اطلاعات از فایل JSON و اعمال به DOM
        const loadData = async () => {
            try {
                // بارگذاری همزمان فایل JSON و بوتسترپ
                const [data] = await Promise.all([
                    fetch('fa.json').then(response => response.json()),
                    loadBootstrap()
                ]);
                
                // اطلاعات اصلی صفحه
                document.getElementById('name').textContent = data.name;
                document.getElementById('description').textContent = data.description;
                
                // تلفن
                const phone = document.getElementById('phone');
                phone.href = `tel:${data.contact.phone}`;
                document.getElementById('phoneText').textContent = data.contact.phone;
                
                // ایمیل
                const email = document.getElementById('email');
                email.href = `mailto:${data.contact.email}`;
                document.getElementById('emailText').textContent = data.contact.email;

                // شبکه‌های اجتماعی
                const socialLinks = document.getElementById('socialLinks');
                const fragment = document.createDocumentFragment();
                
                data.social_links.forEach(social => {
                    const a = document.createElement('a');
                    a.href = social.link;
                    a.className = 'social-btn';
                    a.target = '_blank';
                    a.rel = 'noopener noreferrer';
                    a.innerHTML = `<i class="${social.icon}"></i>`;
                    a.setAttribute('aria-label', social.name);
                    fragment.appendChild(a);
                });
                
                socialLinks.appendChild(fragment);

                // لیست سایت‌ها
                const siteList = document.getElementById('siteList');
                const sitesFragment = document.createDocumentFragment();
                
                data.sites.forEach(site => {
                    const siteItem = document.createElement('div');
                    siteItem.className = 'site-item';
                    
                    const siteTitle = document.createElement('h3');
                    siteTitle.textContent = site.name;
                    
                    const sitePreview = document.createElement('div');
                    sitePreview.className = 'site-item-preview';
                    sitePreview.innerHTML = '<i class="fas fa-eye"></i>';
                    
                    siteItem.appendChild(siteTitle);
                    siteItem.appendChild(sitePreview);
                    
                    siteItem.addEventListener('click', () => {
                        document.getElementById('siteModalLabel').textContent = site.name;
                        document.getElementById('siteModalBody').textContent = site.description;
                        document.getElementById('siteLink').href = site.link;
                        const siteModal = new bootstrap.Modal(document.getElementById('siteModal'));
                        siteModal.show();
                    });
                    
                    sitesFragment.appendChild(siteItem);
                });
                
                siteList.appendChild(sitesFragment);

                // درباره من و تماس با من
                document.getElementById('aboutBtn').addEventListener('click', () => {
                    document.getElementById('infoModalLabel').textContent = 'درباره من';
                    document.getElementById('infoModalBody').textContent = data.about;
                });

                document.getElementById('contactBtn').addEventListener('click', () => {
                    document.getElementById('infoModalLabel').textContent = 'تماس با من';
                    
                    const contactHTML = document.createElement('div');
                    contactHTML.innerHTML = `
                        <div class="contact-item">
                            <i class="fas fa-phone-alt"></i>
                            <span>تلفن: ${data.contact.phone}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>ایمیل: ${data.contact.email}</span>
                        </div>
                    `;
                    
                    document.getElementById('infoModalBody').innerHTML = '';
                    document.getElementById('infoModalBody').appendChild(contactHTML);
                });
                
                // تنظیم دکمه تغییر تم
                const themeToggle = document.getElementById('themeToggle');
                const icon = themeToggle.querySelector('i');
                
                themeToggle.addEventListener('click', () => {
                    const isDarkMode = document.body.classList.toggle('dark-mode');
                    localStorage.setItem('darkMode', isDarkMode);
                    
                    if (isDarkMode) {
                        icon.classList.replace('fa-moon', 'fa-sun');
                    } else {
                        icon.classList.replace('fa-sun', 'fa-moon');
                    }
                });
                
                // پنهان کردن لودینگ
                setTimeout(() => {
                    loadingIndicator.classList.add('hidden');
                }, 500);
                
            } catch (error) {
                console.error('Error loading data:', error);
                loadingIndicator.classList.add('hidden');
            }
        };
        
        // بهینه‌سازی نمایش صفحه
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', loadData);
        } else {
            loadData();
        }
    </script>
</body>
</html>