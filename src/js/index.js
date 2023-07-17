// Import required functions
import generateAndAddProductCard from "./templates.js";
import { discountedPrice, fetchData } from "./utils.js";

// Select body
const body = document.body;


// Header section
const header = document.createElement('header');
header.style.cssText = `
    position: sticky;
    top: 0px;
    z-index: 99;
    background-color: skyblue;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    border-bottom: 1px solid grey;
`;
body.append(header);


// Creating Searchbar with buttons
const searchBox = document.createElement('div');
searchBox.classList.add('search');
const search = `
    <input type="search" placeholder="Search...">
    <button class="searchBtn">Search</button>
    <button class="clearBtn">Clear</button>
`;
searchBox.innerHTML = search;
header.append(searchBox);

// Searching products
searchBox.addEventListener('click', (e) => {
    // select elements
    const selectedCategory = document.querySelector("input[type='radio']:checked");
    const input = e.target.parentNode.children[0];

    if (e.target.textContent === "Search" && input.value) {
        fetchData(`https://dummyjson.com/products/search?q=${input.value}`, ({products}) => {
            // save for filter use
            window.products = products;
        
            // Sort Products as Price-Low-To-High
            products = products.sort((a, b) => {
                return discountedPrice(a.price, a.discountPercentage) - discountedPrice(b.price, b.discountPercentage);
            })

            // Clear checked category
            if (selectedCategory)
                selectedCategory.checked = false;

            // Auto Select filter as Price-Low-To-High
            filter.value = "priceLowToHigh";
        
            // Convert all product cards into template string
            const productCards = products.reduce((cards, card) => cards + generateAndAddProductCard(card), "");

            // Change all product cards 
            productSection.innerHTML = productCards;
        })
    }
    else if (e.target.textContent === "Clear" && (input.value || selectedCategory)) {
        // Clear search result
        input.value = "";

        // Clear checked category
        if (selectedCategory)
            selectedCategory.checked = false;

        // Fetch Initial products
        initialCardRender();
    }
})


// Creating Topbar filter element
const filter = document.createElement("select");
filter.style.padding = "0.2rem 0.5rem";
filter.style.outline = "none";
header.append(filter);

// Price Low to High option 
const priceLowToHigh = document.createElement('option');
priceLowToHigh.textContent = "Price Low to High";
priceLowToHigh.value = "priceLowToHigh";
filter.append(priceLowToHigh);

// Price High to Low option
const priceHighToLow = document.createElement('option');
priceHighToLow.textContent = "Price High to Low";
priceHighToLow.value = "priceHighToLow";
filter.append(priceHighToLow);

// Rating High to Low option
const ratingHighToLow = document.createElement('option');
ratingHighToLow.textContent = "Rating High to Low";
ratingHighToLow.value = "ratingHighToLow";
filter.append(ratingHighToLow);

// Adding event listener for filter
filter.addEventListener("change", (e) => {
    if (e.target.value === "priceLowToHigh") {
        products = products.sort((a, b) => {
            return discountedPrice(a.price, a.discountPercentage) - discountedPrice(b.price, b.discountPercentage);
        })
    }
    else if (e.target.value === "priceHighToLow") {
        products = products.sort((a, b) => {
            return discountedPrice(b.price, b.discountPercentage) - discountedPrice(a.price, a.discountPercentage);
        })
    }
    else if (e.target.value === "ratingHighToLow") {
        products = products.sort((a, b) => {
            return b.rating - a.rating;
        })
    }

    const productCards = products.reduce((cards, card) => cards + generateAndAddProductCard(card), "");
    productSection.innerHTML = productCards;
})


// Creating main secion
const main = document.createElement('div');
main.style.cssText = `
    background-color: lightblue;
    padding: 1.5rem 1rem;
    display: flex;
    justify-content: space-around;
`;
body.append(main);


// Creating Sidebar category filter options
const sidebar = document.createElement('aside');
sidebar.style.cssText = `
    min-width: 12rem;
    max-height: 38rem;
    background-color: skyblue;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    border-radius: 0.5rem;
    padding: 1rem;
    gap: 0.5rem;
`;
main.append(sidebar);

const categoryTitle = document.createElement('h2');
categoryTitle.innerText = "Categories"
categoryTitle.style.cssText = `
    text-align: center;
    padding: 0.5rem 0rem;
`;
sidebar.append(categoryTitle);

// Render all categories
fetchData("https://dummyjson.com/products/categories", (categoryList) => {
    categoryList.forEach(category => {
        const container = document.createElement('div');
        container.style.cssText = `
            display: flex;
            gap: 0.5rem;
        `;
        const item = `
            <input type=radio value=${category} id=${category} name="category" />
            <label for=${category}>${category.toUpperCase()}</label>
        `;

        container.innerHTML = item;
        sidebar.append(container);
    });
});

// Adding event listener for selecting categories
sidebar.addEventListener('click', (e) => {
    if (e.target.value) {
        fetchData(`https://dummyjson.com/products/category/${e.target.value}`, ({products}) => {
            // Clear searchbar text
            const search = document.querySelector('input[type="search"]');
            search.value = "";

            // save for filter use
            window.products = products;

            // Sort Products as Price-Low-To-High
            products = products.sort((a, b) => {
                return discountedPrice(a.price, a.discountPercentage) - discountedPrice(b.price, b.discountPercentage);
            })

            // Auto Select filter as Price-Low-To-High
            filter.value = "priceLowToHigh";

            const productCards = products.reduce((cards, card) => cards + generateAndAddProductCard(card), "");
            productSection.innerHTML = productCards;
        })
    }
});


// Product Cards Section
const productSection = document.createElement('section');
productSection.style.cssText = `
    max-width: 70%;
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: space-evenly;
    // background-color: grey;
    // border-radius: 0.5rem;
`;
main.append(productSection);

// Add event listener for showing and hiding details
productSection.addEventListener('click', (e) => {
    if (e.target.value === 'hide') {
        e.target.parentNode.style.cssText = `
            position: fixed;
            visibility: hidden;
        `;

        e.target.parentNode.nextElementSibling.style.cssText = `
            position: static;
            visibility: visible;
        `;
    }
    else if (e.target.value === 'show') {
        e.target.previousElementSibling.style.cssText = `
            position: static;
            visibility: visible;
        `;
        e.target.style.cssText = `
            position: fixed;
            visibility: hidden;
        `;
    }
});


// Render default home pages products
const initialCardRender = () => {
    fetchData("https://dummyjson.com/products?limit=15", ({products}) => {
        // save for filter use
        window.products = products;
    
        products = products.sort((a, b) => {
            return discountedPrice(a.price, a.discountPercentage) - discountedPrice(b.price, b.discountPercentage);
        })
    
        const productCards = products.reduce((cards, card) => cards + generateAndAddProductCard(card), "");
        productSection.innerHTML = productCards;
    });
};

// Initial product render
initialCardRender();