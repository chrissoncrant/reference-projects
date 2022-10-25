const crumbs = document.querySelectorAll('.crumb');

console.log(crumbs[1])

crumbs.forEach(crumb => {
    crumb.addEventListener('click', () => {
        let currentPage = Array.from(crumbs).find(crumb => {
            return crumb.ariaCurrent;
        });

        if (currentPage) {
            currentPage.removeAttribute('aria-current');
        };

        crumb.setAttribute('aria-current', 'page');
    })
})