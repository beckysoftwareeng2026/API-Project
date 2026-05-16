function openMenu() {
    document.body.classList += " menu--open"
}

function closeMenu() {
    document.body.classList.remove('menu--open')
}

function searchCoffee(event) {
    const searchTerm = event.target.value.toLowerCase();
    const coffeeItems = document.querySelectorAll('.coffee');

    coffeeItems.forEach(item => {
        const coffeeName = item.querySelector('.coffee__title').textContent.toLowerCase();
        if (coffeeName.includes(searchTerm)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}