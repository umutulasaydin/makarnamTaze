// menu.js
fetch('/menu/ilave.txt')
  .then(response => response.text())
  .then(data => {
    const menuContainer = document.getElementById('ilave');
    const items = data.split('\n').filter(item => item.trim() !== ''); // Ignore empty lines

    // Loop through all the items and create HTML structure
    items.forEach(item => {
      const parts = item.split(';');

      const name = parts[0];
      const sizesList = document.createElement('div');  // This will contain size and price
      sizesList.classList.add('size-price');
      

        const sizePricePair = document.createElement('div');
        sizePricePair.classList.add('size-price-pair');


        const priceLabel = document.createElement('span');
        priceLabel.textContent = `₺${parts[2]}`;  // Price value
        sizePricePair.appendChild(priceLabel);
        sizesList.appendChild(sizePricePair);




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

      // Append item to menu container
      menuContainer.appendChild(itemContainer);
    });
  })
  .catch(error => {
    console.error('Error loading menu:', error);
  });