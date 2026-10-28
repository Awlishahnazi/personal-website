function openCertModal(imageSrc) {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');
    if(modal && modalImg) {
        modalImg.src = imageSrc;
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    }
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    if(modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }
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

                const title = item.getAttribute('data-title').toLowerCase();
                const issuer = item.getAttribute('data-issuer');
                
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
                    if (sort === 'alpha') return a.getAttribute('data-title').localeCompare(b.getAttribute('data-title'));
                    const da = new Date(a.getAttribute('data-date'));
                    const db = new Date(b.getAttribute('data-date'));
                    return sort === 'newest' ? db - da : da - db;
                });
                visibleItems.forEach(i => grid.appendChild(i));
            }


            group.style.display = visibleInGroup > 0 ? '' : 'none';
        });


        if (noResult) {
            if (totalVisible === 0) {
                noResult.classList.add('show');
            } else {
                noResult.classList.remove('show');
            }
        }
    }

    applyFilters();

    searchInput.addEventListener('input', applyFilters);
    filterSelect.addEventListener('change', applyFilters);
    sortSelect.addEventListener('change', applyFilters);
});