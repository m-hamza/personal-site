<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>سایت شخصی محمد حمزه</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link href="https://cdn.jsdelivr.net/gh/rastikerdar/vazir-font/dist/font-face.css" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
    <style>
        body {
            font-family: 'Vazir', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f9;
            color: #333;
        }
        #main-info {
            border: 2px solid #0078d7;
            border-radius: 10px;
            padding: 40px;
            background-color: #fff;
            text-align: center;
            margin-top: 40px;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
        }
        #main-info img {
            border: 5px solid #0078d7;
            box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
        }
        #main-info h1 {
            font-size: 2.5rem;
            margin-top: 20px;
        }
        #main-info p {
            font-size: 1.2rem;
            margin: 15px 0;
        }
        #sites-list {
            padding: 40px 0;
        }
        #sites-list ul {
            display: block;
            padding: 0;
            list-style: none;
        }
        #sites-list ul li {
            background: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            padding: 20px;
            text-align: right;
            cursor: pointer;
            transition: all 0.3s ease;
            width: 100%;
            margin-bottom: 10px;
        }
        #sites-list ul li:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
        }
        .btn-primary, .btn-outline-secondary {
            margin: 5px;
            transition: all 0.3s;
        }
        .btn-primary:hover, .btn-outline-secondary:hover {
            transform: scale(1.1);
        }
        .btn-outline-dark {
            color: #333;
            border-color: #333;
            margin-right: 10px;
        }
        .btn-outline-dark:hover {
            background-color: #333;
            color: #fff;
        }
        .modal-body p {
            margin-bottom: 1rem;
        }
    </style>
</head>
<body>
    <div class="container">
        <section id="main-info" class="my-5">
            <img src="gibli.jpg" alt="عکس محمد حمزه" class="img-fluid rounded-circle" width="150">
            <h1 id="name"></h1>
            <p id="description"></p>
            <div class="contact mt-3">
                <a href="#" id="phone" class="btn btn-primary"><i class="fas fa-phone-alt"></i></a>
                <div class="social-links mt-3" id="socialLinks"></div>
            </div>
        </section>

        <section id="sites-list" class="my-5">
            <h2 class="text-center">سایت‌های من</h2>
            <ul class="list-group" id="siteList"></ul>
        </section>

        <div class="text-center my-5">
            <button class="btn btn-info" id="aboutBtn" data-bs-toggle="modal" data-bs-target="#infoModal">درباره من</button>
            <button class="btn btn-info" id="contactBtn" data-bs-toggle="modal" data-bs-target="#infoModal">تماس با من</button>
        </div>

        <!-- مودال سایت‌ها -->
        <div class="modal fade" id="siteModal" tabindex="-1" aria-labelledby="siteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="siteModalLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="siteModalBody"></div>
                    <div class="modal-footer">
                        <a href="#" id="siteLink" class="btn btn-primary" target="_blank">ورود به سایت</a>
                    </div>
                </div>
            </div>
        </div>

        <!-- مودال درباره من و تماس با من -->
        <div class="modal fade" id="infoModal" tabindex="-1" aria-labelledby="infoModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="infoModalLabel"></h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" id="infoModalBody"></div>
                    <div class="modal-footer">
                        <a href="http://cv.m-hamza.ir" class="btn btn-primary" target="_blank">مشاهده رزومه</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        // بارگذاری اطلاعات از فایل JSON
        fetch('fa.json')
            .then(response => response.json())
            .then(data => {
                // اطلاعات اصلی صفحه
                document.getElementById('name').textContent = data.name;
                document.getElementById('description').textContent = data.description;
                const phone = document.getElementById('phone');
                phone.href = `tel:${data.contact.phone}`;
                phone.textContent = data.contact.phone;

                // شبکه‌های اجتماعی
                const socialLinks = document.getElementById('socialLinks');
                data.social_links.forEach(social => {
                    const a = document.createElement('a');
                    a.href = social.link;
                    a.className = 'btn btn-outline-dark';
                    a.innerHTML = `<i class="${social.icon}"></i> ${social.name}`;
                    socialLinks.appendChild(a);
                });

                // لیست سایت‌ها
                const siteList = document.getElementById('siteList');
                data.sites.forEach(site => {
                    const li = document.createElement('li');
                    li.className = 'list-group-item list-group-item-action';
                    li.textContent = site.name;
                    li.addEventListener('click', () => {
                        document.getElementById('siteModalLabel').textContent = site.name;
                        document.getElementById('siteModalBody').textContent = site.description;
                        document.getElementById('siteLink').href = site.link;
                        const siteModal = new bootstrap.Modal(document.getElementById('siteModal'));
                        siteModal.show();
                    });
                    siteList.appendChild(li);
                });

                // درباره من و تماس با من
                document.getElementById('aboutBtn').addEventListener('click', () => {
                    document.getElementById('infoModalLabel').textContent = 'درباره من';
                    document.getElementById('infoModalBody').textContent = data.about;
                });

                document.getElementById('contactBtn').addEventListener('click', () => {
                    document.getElementById('infoModalLabel').textContent = 'تماس با من';
                    document.getElementById('infoModalBody').innerHTML = `
                        <p>تلفن: ${data.contact.phone}</p>
                        <p>ایمیل: ${data.contact.email}</p>
                    `;
                });
            })
            .catch(error => console.error('Error loading JSON:', error));
    </script>
</body>
</html>
