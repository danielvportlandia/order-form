'use strict';

var contactTitle = document.getElementById('contactTitle');
var contactInfo = document.getElementById('contactInfo');
var productList = document.getElementById('productList');
ContactList.all = [];
Product.all = [];
var names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
var cost = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

//Product constructor
function Product(name) {
  this.name = name;
  this.filepath = 'img/' + name + '.jpg';
  Product.all.push(this);
}

for (var i = 0; i < names.length; i++) {
  new Product(names[i]);
}

function ContactList(userName, street, city, state, zipcode, phoneNumber) {
  this.userName = userName;
  this.street = street;
  this.city = city;
  this.state = state;
  this.zipcode = 0;
  this.phoneNumber = phoneNumber;
  ContactList.all.push(this);
}

//checks local storage upon page load.
function checkContacts() {
  if (localStorage && localStorage.getItem('ContactList')) {
    ContactList = JSON.parse(localStorage.getItem('ContactList'));
    contactTitle.style.display = 'none';
    contactInfo.style.display = 'none';
  }
}

function submitContactList(e) {
  e.preventDefault();
  new ContactList(contactInfo.userName.value, contactInfo.street.value, contactInfo.city.value,contactInfo.state.value, parseInt(contactInfo.zipcode.value), contactInfo.phoneNumber.value);
  localStorage.setItem('ContactList', JSON.stringify(ContactList.all));
  e.target.reset();
  contactTitle.style.display = 'none';
  contactInfo.style.display = 'none';
  ContactList;
}

function selectProduct(e) {
  var innerShoppingList = document.getElementById('innerShoppingList');
  for (var i = 0; i < Product.all.length; i++) {
    if (e.target.value === names[i]) {
      var fig = document.createElement('figure');
      innerShoppingList.appendChild(fig);
      var figImage = document.createElement('img');
      fig.appendChild(figImage);
      var figCaption = document.createElement('caption');
      fig.appendChild(figCaption);
      figImage.src = Product.all[i].filepath;
      figCaption.textContent = Product.all[i].name + ' $' + cost[i];
    }
  }
}

/* This function displays the images on the page by creating an array to hold each displayed image (3 total), if the displayed image of index 1 matches index 0, it logs it as duplicate and generates a new random number for that index. The displayed image of index 2 does the same thing but compares to the result of both index 0 and 1.
*/
// function displayImages() {
//   var displayed = [];
//   displayed[0] = getRandomNumber();
//   while (Product.all[displayed[0]].previous) {
//     displayed[0] = getRandomNumber();
//   }
//   displayed[1] = getRandomNumber();
//   while (displayed[1] === displayed[0] || Product.all[displayed[1]].previous) {
//     console.log('duplicate image.');
//     displayed[1] = getRandomNumber();
//   }
//   displayed[2] = getRandomNumber();
//   while (displayed[2] === displayed[0] || displayed[2] === displayed[1] || Product.all[displayed[2]].previous) {
//     console.log('duplicate image.');
//     displayed[2] = getRandomNumber();
//   }
//   Product.all[displayed[0]].views += 1;
//   Product.all[displayed[1]].views += 1;
//   Product.all[displayed[2]].views += 1;
//   Product.all[displayed[0]].previous = true;
//   Product.all[displayed[1]].previous = true;
//   Product.all[displayed[2]].previous = true;
//   productOne.src = Product.all[displayed[0]].filepath;
//   productTwo.src = Product.all[displayed[1]].filepath;
//   productThree.src = Product.all[displayed[2]].filepath;
//   productOne.id = Product.all[displayed[0]].name;
//   productTwo.id = Product.all[displayed[1]].name;
//   productThree.id = Product.all[displayed[2]].name;
//   for (var i = 0; i < Product.all.length; i++){
//     if (!(displayed.includes(i))) {
//       Product.all[i].previous = false;
//     }
//   }
// }

// //redisplays images once an image is clicked on.
// function handleClick(e) {
//   console.log(e.target.id);
//   if (e.target.id === 'imageList') { // invalid selection indicator.
//     alert('Invalid selection.');
//     return;
//   }
//   totalClicks += 1;
//   for (var i = 0; i < Product.all.length; i++) { //increments the votes property on the clicked image.
//     if (e.target.id === Product.all[i].name) {
//       Product.all[i].votes += 1;
//       console.log(Product.all[i].votes);
//     }
//   }
//   if (totalClicks >= 25) { //Ends click EventListener and hides image display w/ header.
//     imageList.removeEventListener('click', handleClick);
//     localStorage.setItem('Product.all', JSON.stringify(Product.all));
//     imageList.style.display = 'none';
//     contactTitle.style.display = 'none';
//     resultsTitle.style.display = 'block';
//     productChart.style.display = 'block';
//     makeChart();
//   }
//   console.log('total clicks is ' + totalClicks);
//   displayImages();
// }

checkContacts();
// displayImages();
contactInfo.addEventListener('submit', submitContactList);
productList.addEventListener('change', selectProduct);
