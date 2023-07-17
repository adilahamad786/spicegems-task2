import { discountedPrice } from "./utils.js"

// Creating Product cart
function generateAndAddProductCard(data) {
    let productCard = `
    <div class="productCard">
        <div class="productImage">
            <img src=${data.thumbnail} alt="productImage">
        </div>
        <div class="productThumbnails">
            ${
                data.images.reduce((elements, url) => {
                    return elements + `
                    <div class="productThumbnail">
                        <img src=${url} alt="thumbnail">
                    </div>
                    `;
                }, '')
            }
        </div>
        <h3 class="title">${data.title}</h3>
        <div class="prices">
            <span class="discountPrice">Rs. ${discountedPrice(data.price, data.discountPercentage)}</span>
            <div class="price">
                <span class="oldPrice">Rs.${data.price}</span>
                <span class="discount">save ${data.discountPercentage}%</span>
            </div>
        </div>
        <div class="rating">
            <i class="fa-solid fa-star fa-xs" style="color: ${ 1 <= Math.round(data.rating) ? "#ffc800" : "#444029"};"></i>
            <i class="fa-solid fa-star fa-xs" style="color: ${ 2 <= Math.round(data.rating) ? "#ffc800" : "#444029"};"></i>
            <i class="fa-solid fa-star fa-xs" style="color: ${ 3 <= Math.round(data.rating) ? "#ffc800" : "#444029"};"></i>
            <i class="fa-solid fa-star fa-xs" style="color: ${ 4 <= Math.round(data.rating) ? "#ffc800" : "#444029"};"></i>
            <i class="fa-solid fa-star fa-xs" style="color: ${ 5 <= Math.round(data.rating) ? "#ffc800" : "#444029"};"></i>
        </div>
        <span class="stock">InStock : ${data.stock}</span>
        <div class="details">
            <div class="item">
                <span>Brand</span>
                <span>${data.brand}</span>
            </div>
            <div class="item">
                <span>Category</span>
                <span>${data.category}</span>
            </div>
            <div class="item">
                <span>Description</span>
                <span>${data.description}</span>
            </div>
            <button class="btn" value="hide">Less Description</button>
        </div>
        <button class="btn" value="show">Show Description</button>
        <button class="btn">Add to cart</button>
    </div>
    `;

    // productCard.innerHTML = template;
    return productCard;
}

export default generateAndAddProductCard;