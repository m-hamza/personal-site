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
            a.className = 'btn btn-outline-secondary';
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
            const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
            infoModal.show();
        });

        document.getElementById('contactBtn').addEventListener('click', () => {
            document.getElementById('infoModalLabel').textContent = 'تماس با من';
            document.getElementById('infoModalBody').innerHTML = `
                <p>تلفن: ${data.contact.phone}</p>
                <p>ایمیل: ${data.contact.email}</p>
            `;
            const infoModal = new bootstrap.Modal(document.getElementById('infoModal'));
            infoModal.show();
        });
    })
    .catch(error => console.error('Error loading JSON:', error));
