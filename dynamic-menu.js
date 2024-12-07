// Load JSON dynamically
const jsonPath = "./data.json";

const languageLinks = document.querySelectorAll('.language');

languageLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        // Allow the link to scroll to the anchor (navigate to the hash)
        const targetHash = link.getAttribute('href');

        // Delay the reload to ensure the browser scrolls to the anchor first
        setTimeout(function() {
            location.reload();
        }, 100); // Adjust the delay as needed
    });
});

fetch(jsonPath)
    .then(response => response.json())
    .then(data => {
        const hash = window.location.hash;
        const hashValue = hash.slice(1);
        if (!hashValue) {
            renderPage(data, "tr");
            console.log("No hash value found, defaulting to Turkish.");
        }
        else {
            renderPage(data, hashValue);
            console.log(`Hash value found: ${hashValue}`);
        }
    })
    .catch(error => console.error("Failed to load JSON:", error));

function renderPage(data, lang) {
    const translations = data[lang];
    if (!translations) {
        console.error(`Language "${lang}" not found.`);
        return;
    }

    // Update header info
    document.getElementById("header-info").textContent = translations["header-info"];



    // Update footer info
    document.getElementById("info").innerHTML = `
        <img src="${translations["footer-img-url"]}" alt="Yerli üretim" class="info">
        <div>
            <p> ${translations["footer-info"]}</p>
            <p> ${translations["footer-info2"]}</p>
        </div>
    `;

    // Update address and contact
    const address = data.address;
    document.getElementById("address").innerHTML = `
        <p>${address.street}</p>
    `;
    document.getElementById("contact").innerHTML = `
        <p>${address.phone}</p>
    `;

    // Render menu sections dynamically
    const menuContainer = document.getElementById("container");
    const sections = translations.sections;

    Object.keys(sections).forEach(sectionKey => {

        const section = sections[sectionKey];
        const scrollContent = document.createElement("a");
        scrollContent.href = "#" + section.href;
        scrollContent.textContent = section.name;
        document.getElementById("scrollmenu").appendChild(scrollContent);
        // Section Header
        const sectionHeader = document.createElement("div");
        sectionHeader.id = "menu-header";
        sectionHeader.innerHTML = `
            <h1>${section.name}</h1>
        `;

        // Append to menu container
        menuContainer.appendChild(sectionHeader);

        // Section Content
        const sectionContent = document.createElement("div");
        sectionContent.className = "menu-container";
        sectionContent.id = section.href;

        if (section.info) {
            const info = document.createElement("div");
            info.id = "info2";
            info.innerHTML = `
                <h3>${section.info}</h3>
            `;
            menuContainer.appendChild(info);
        }



        if (section.products) {
            Object.keys(section.products).forEach(productKey => {
                const product = section.products[productKey];

                const productDiv = document.createElement("div");
                productDiv.className = "menu-item";

                sizesContent = document.createElement("div");
                sizesContent.className = "size-price";

                
                const priceContent = document.createElement("div");
                priceContent.className = "size-price";

                Object.keys(section.sizes).forEach(sizeKey => {
                    sizePriceContent = document.createElement("div");
                    sizePriceContent.className = "size-price-pair";
                    sizePriceContent.innerHTML = `
                        <span>${section.sizes[sizeKey].name} ${section.sizes[sizeKey].size}</span>
                        <span>₺${data.prices[product[sizeKey]]}</span>
                    `;
                    priceContent.appendChild(sizePriceContent);
                });

                if (product.image != ""){
                    const imageProduct = document.createElement("img")
                    imageProduct.src = product.image
                    imageProduct.alt = product.name
                    imageProduct.className = "item-image"
                    productDiv.appendChild(imageProduct)
                }

                productDiv.innerHTML += `
                    <h2>${product.name}</h2>
                    ${priceContent.outerHTML}
                    <p>${product.description}</p>
                `;
                sectionContent.appendChild(productDiv);
            });
        }

        


        
        menuContainer.appendChild(sectionContent);

        menuContainer.appendChild(document.createElement("hr"));
        
    });
}
