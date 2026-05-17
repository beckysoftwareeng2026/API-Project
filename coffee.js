let coffee;

async function renderCoffee(filter) {
    const coffeeWrapper = document.querySelector(".coffee");
    const coffeeLoading = document.querySelector(".coffee__loading");

    coffeeLoading.style.display = "block";

    if (!coffee) {
        coffee = await getCoffee();
    }
    coffeeLoading.style.display = "none";


    if (filter === "LOW_TO_HIGH") {
        coffee.sort(
            (a, b) =>
                (a.salePrice || a.originalPrice) - (b.salePrice || b.originalPrice)
        );
    } else if (filter === "HIGH_TO_LOW") {
        coffee.sort(
            (a, b) =>
                (b.salePrice || b.originalPrice) - (a.salePrice || a.originalPrice)
        );
    } else if (filter === "RATING") {
        coffee.sort((a, b) => b.rating - a.rating);
    }

    const coffeeHtml = coffee
        .map((coffee) => {
            return `<div class="coffee">
    <figure class="coffee__img--wrapper">
      <img class="coffee__img" src="${coffee.url}" alt="">
    </figure>
    <div class="coffee__title">
      ${coffee.title}
    </div>
    <div class="coffee__ratings">
      ${ratingsHTML(coffee.rating)}
    </div>
    <div class="coffee__price">
      ${priceHTML(coffee.originalPrice, coffee.salePrice)}
    </div>
  </div>`;
        })
        .join("");

    coffeeWrapper.innerHTML = coffeeHtml;
}


function priceHTML(originalPrice, salePrice) {
    if (!salePrice) {
        return `$${originalPrice.toFixed(2)}`;
    }
    return `<span class="coffee__price--normal">$${originalPrice.toFixed(
        2
    )}</span>$${salePrice.toFixed(2)}`;
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

setTimeout(() => {
    renderCoffee();
});

// FAKE DATA
function getCoffee() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: "Blonde Roast",
                    url: "blonde roast.webp",
                    originalPrice: 29.99,
                    salePrice: 14.95,
                    rating: 4.5,
                },
                {
                    id: 2,
                    title: "Medium Roast",
                    url: "medium_roast_coffee.webp",
                    originalPrice: 24.99,
                    salePrice: 11.99,
                    rating: 5,
                },
                {
                    id: 3,
                    title: "Dark Roast",
                    url: "dark roast coffee.webp",
                    originalPrice: 27.99,
                    salePrice: 14.99,
                    rating: 5,
                },
                {
                    id: 4,
                    title: "French Roast",
                    url: "frenchroast.webp",
                    originalPrice: 24.99,
                    salePrice: 14.99,
                    rating: 4.5,
                },
                {
                    id: 5,
                    title: "Italian Roast",
                    url: "Italian Roast.jpeg",
                    originalPrice: 26.99,
                    salePrice: 14.99,
                    rating: 4,
                },
                {
                    id: 6,
                    title: "Rocky Mountain Blend",
                    url: "Rocky_Moun_Blend.webp",
                    originalPrice: 29.99,
                    salePrice: 14.99,
                    rating: 5,
                },
                {
                    id: 7,
                    title: "Espresso Roast",
                    url: "espresso_roast.jpg",
                    originalPrice: 29.99,
                    salePrice: 14.99,
                    rating: 4,
                },
                {
                    id: 8,
                    title: "Americano Roast",
                    url: "Americano_roast.jpg",
                    originalPrice: 29.99,
                    salePrice: 14.99,
                    rating: 4,
                },


            ]);
        }, 1000);
    });
}
