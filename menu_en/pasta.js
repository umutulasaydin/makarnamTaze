// menu.js
fetch('/menu_en/pasta.txt')
  .then(response => response.text())
  .then(data => {
    const menuContainer = document.getElementById('pasta');
    const items = data.split('\n').filter(item => item.trim() !== ''); // Ignore empty lines

    // Loop through all the items and create HTML structure
    items.forEach(item => {
      const parts = item.split(';');

      const name = parts[0];
      const sizesList = document.createElement('div');  // This will contain size and price
      sizesList.classList.add('size-price');
      
      // Add size and price pairs on the same line
      for (let i = 2; i < parts.length - 1; i += 2) {
        const size = parts[i];
        const price = parts[i + 1];

        const sizePricePair = document.createElement('div');
        sizePricePair.classList.add('size-price-pair');

        const sizeLabel = document.createElement('span');
        sizeLabel.textContent = size;  // Size name (Small, Medium, Large)

        const priceLabel = document.createElement('span');
        priceLabel.textContent = `₺${price}`;  // Price value

        sizePricePair.appendChild(sizeLabel);
        sizePricePair.appendChild(priceLabel);
        sizesList.appendChild(sizePricePair);
      }

      // The last part is the description
      const description = parts[parts.length - 1];

      // Create the container for the item
      const itemContainer = document.createElement('div');
      itemContainer.classList.add('menu-item');

      if (parts[1]) {
        const itemImage = document.createElement('img');
        itemImage.src = parts[1];
        itemImage.alt = `${name} image`;
        itemImage.classList.add('item-image'); // Add class for styling if needed
        itemContainer.appendChild(itemImage);
      }

      const itemName = document.createElement('h2');
      itemName.textContent = name;
      itemContainer.appendChild(itemName);

      itemContainer.appendChild(sizesList);

      const itemDescription = document.createElement('p');
      itemDescription.textContent = description;
      itemContainer.appendChild(itemDescription);

      // Append item to menu container
      menuContainer.appendChild(itemContainer);
    });
  })
  .catch(error => {
    console.error('Error loading menu:', error);
  });