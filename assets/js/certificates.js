function openCertModal(imageSrc) {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');
    modalImg.src = imageSrc;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    modal.classList.remove('open');
    document.body.style.overflow = '';
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('cert-modal');
        if (modal && modal.classList.contains('open')) closeCertModal();
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const certModalImg = document.getElementById('cert-modal-img');
    if (certModalImg) {
        certModalImg.addEventListener('click', (e) => e.stopPropagation());
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('certSearch');
    const filterSelect = document.getElementById('certFilter');
    const sortSelect = document.getElementById('certSort');
    const noResult = document.getElementById('noResult');

    if (!searchInput) return; 

    function applyFilters() {
        const query = searchInput.value.trim().toLowerCase();
        const filter = filterSelect.value;
        const sort = sortSelect.value;

        let totalVisible = 0;

        document.querySelectorAll('.cert-year-group').forEach(group => {
            let visibleInGroup = 0;
            const grid = group.querySelector('.cert-grid-inner');
            const items = Array.from(grid.querySelectorAll('.cert-card-big'));

            items.forEach(item => {
                const title = item.dataset.title.toLowerCase();
                const issuer = item.dataset.issuer;
                const matchQuery = !query || title.includes(query);
                const matchFilter = filter === 'all' || issuer === filter;

                if (matchQuery && matchFilter) {
                    item.style.display = '';
                    visibleInGroup++;
                    totalVisible++;
                } else {
                    item.style.display = 'none';
                }
            });


            if (sort !== 'default' && visibleInGroup > 0) {
                const visibleItems = items.filter(i => i.style.display !== 'none');
                visibleItems.sort((a, b) => {
                    if (sort === 'alpha') return a.dataset.title.localeCompare(b.dataset.title);
                    const da = new Date(a.dataset.date);
                    const db = new Date(b.dataset.date);
                    return sort === 'newest' ? db - da : da - db;
                });
                visibleItems.forEach(i => grid.appendChild(i));
            }


            group.style.display = visibleInGroup > 0 ? '' : 'none';
        });


        if (noResult) noResult.classList.toggle('show', totalVisible === 0);
    }

    searchInput.addEventListener('input', applyFilters);
    filterSelect.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
});