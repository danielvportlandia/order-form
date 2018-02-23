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

checkContacts();
contactInfo.addEventListener('submit', submitContactList);
productList.addEventListener('change', selectProduct);
