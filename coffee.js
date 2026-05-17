let coffee;

async function renderCoffee(filter) {
    const coffeeWrapper = document.querySelector(".coffees");
    const coffeeLoading = document.querySelector(".coffee__loading");

    coffeeLoading.style.display = "block";
    coffee = await getCoffee();
    coffeeLoading.style.display = "none";

    if (filter === "A_TO_Z") {
        coffee.sort((a, b) => (a.title || b.title) - (b.title || a.title));
    } else if (filter === "Z_TO_A") {
        coffee.sort((a, b) => (b.title || a.title) - (a.title || b.title));
    } else if (filter === "RATING") {
        coffee.sort((a, b) => b.rating - a.rating);
    }

    const coffeeHtml = coffee.map((coffee) => {
        return `<div class="coffee">
            <figure class="coffee__img--wrapper">
                <img class="coffee__img" src="${coffee.url}" alt="">
            </figure>
            <div class="coffee__title">${coffee.title}</div>
            <div class="coffee__ratings">${ratingsHTML(coffee.rating)}</div>
            <div class="coffee__price">${priceHTML(coffee.originalPrice, coffee.salePrice)}</div>
        </div>`;
    }).join("");

    coffeeWrapper.innerHTML = coffeeHtml;
}

function priceHTML(originalPrice, salePrice) {
    if (!salePrice) {
        return `$${originalPrice.toFixed(2)}`;
    }
    return `<span class="coffee__price--normal">$${originalPrice.toFixed(2)}</span>$${salePrice.toFixed(2)}`;
}

function ratingsHTML(rating) {
    let ratingHTML = "";
    for (let i = 0; i < Math.floor(rating); ++i) {
        ratingHTML += '<i class="fas fa-star"></i>\n';
    }
    if (!Number.isInteger(rating)) {
        ratingHTML += '<i class="fas fa-star-half-alt"></i>\n';
    }
    return ratingHTML;
}

function filterCoffee(event) {
    renderCoffee(event.target.value);
}

function searchCoffee(event) {
    const searchTerm = event.target.value.toLowerCase();
    const coffeeItems = document.querySelectorAll('.coffee');
    coffeeItems.forEach(item => {
        const coffeeName = item.querySelector('.coffee__title').textContent.toLowerCase();
        item.style.display = coffeeName.includes(searchTerm) ? 'block' : 'none';
    });
}

renderCoffee();

async function getCoffee() {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '90273038afmshde2b2f4a176cf81p1e3d74jsn4ced151642ae',
            'x-rapidapi-host': 'tasty.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.results.map((item, index) => ({
            id: index + 1,
            title: item.name,
            url: item.thumbnail_url,
            originalPrice: 29.99,
            salePrice: 14.99,
            rating: item.user_ratings?.score ? item.user_ratings.score * 5 : 4
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}
async function getCoffee() {
    const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '90273038afmshde2b2f4a176cf81p1e3d74jsn4ced151642ae',
            'x-rapidapi-host': 'tasty.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.results.map((item, index) => ({
            id: index + 1,
            title: item.name,
            url: item.thumbnail_url,
            originalPrice: 29.99,
            salePrice: 14.99,
            rating: item.user_ratings?.score ? item.user_ratings.score * 5 : 4
        }));
    } catch (error) {
        console.error(error);
        return [];
    }
}