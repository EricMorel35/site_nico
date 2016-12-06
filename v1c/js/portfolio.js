var data;
var categories;
var carouselSize;

$.ajax({
  async: false,
  type: "GET",
  url: "json/categories.json",
  dataType: "json",
  success : function(data) {
    processJSONdata(data);
  },
  error: function(event) {
    alert('Erreur dans le fichier json !');
  }
});


function processJSONdata(data) {
  console.log('JSON data received:', data);
  slideDuration = data.slideDuration;
  this.data = data;
  var items = "";
  var itemsMenu = "";
  var arrayOfCategories = [];
  for(var i = 0; i<data.length; i++) {
    if(arrayOfCategories.indexOf(data[i].category) === -1) {
      var htmlMenu = '<li><span class="menuCategories">'+data[i].category+'</span></li>';
      itemsMenu += htmlMenu;
      arrayOfCategories.push(data[i].category);
    }
    items += buildCategoryHtmlNode(data, i);
  }
  items += '<div class="footer"></div>';
  $('.menuCategories').html(itemsMenu);
  $('.contentCategories').html(items);
  //$('.parent').append('<div class="footer"></div>');

  $('.menuCategories').bind("click", function(event) {
    event.stopPropagation();
    filterItems(data, event.target.innerHTML);

    $('[class^=categoryItem]').bind('click' ,function(event){
      processShowDesription($(this));
    });

  });

}

function buildCategoryHtmlNode(data, i) {
  var htmlNode = '<div class="category '+data[i].category+'" id="category'+i+'"><div class="title2" style="background: url('+data[i].banner+') no-repeat;">';
  htmlNode += '<div class="categoryContainer">';
  htmlNode += '<div class="categoryDetails">';
  htmlNode += '<p class="bold categoryTitle categoryItem">'+ data[i].display +'</p>';
  htmlNode += '<p class="totoCategory categoryItem">'+data[i].category+'</p>';
  htmlNode += '<a href="#" class="categoryItem bold categoryAction '+i+'" button">En savoir plus</a>' 
  htmlNode += '</div></div></div></div>';
  return htmlNode;
}

function filterItems(data, category) {
  this.categories = $('.categories .contentCategories').html();
  var filterCategories = "";

  for(var i = 0; i<data.length; i++) {
    if(data[i].category === category) {
      filterCategories += buildCategoryHtmlNode(data, i);
    }
  }

  filterCategories += '<div class="footer"></div>';
  $('.categories .contentCategories').html("");
  $('.categories .contentCategories').html(filterCategories);
}

function processShowDesription(element) {
  this.categories = $('.categories').html();
  $('.contentCategories').addClass("hidden");

  var currentId = element.attr("class");
  currentId = currentId.substring(currentId.length-2).trim();

  showDescription(currentId);
}

$('[class^=categoryItem]').bind('click' ,function(event){
  this.categories = $('.categories').html();
  $('.contentCategories').addClass("hidden");

  processShowDesription($(this));
});

function showDescription(currentId) {
  var htmlNode = '<div class="return2list">< Retour &agrave; la liste </div><div class="divDescription"><img class="imgDescription"></img></div><div class="textDescription"><h3 class="descriptionTitle bold"></h3><p class="description"></p></div><div class="carousel"><ul></ul></div><div class="footer"></div>'; 
  $('.descriptionToShow').html(htmlNode);
  var images = buildCarrousel(this.data[currentId].images);
  $('.carousel' +' ul').html(images);

  $('.categoriesTitle').html("");
  $('.categoriesTitle').html(this.data[currentId].display);
  $('.categoriesSecondTitle').html("");
  $('.categoriesSecondTitle').html(this.data[currentId].category);

  $('.imgDescription').attr('src', this.data[currentId].banner);
  $('.descriptionTitle').html(this.data[currentId].title);
  $('.description').html(this.data[currentId].descriptionSummary);

  $('.descriptionToShow').removeClass('hidden');
  $('.return2list').bind("click", function(event) {
    event.stopPropagation();
    $('.categoriesTitle').html("Portfolio");
    $('.categoriesSecondTitle').html("Mes r&eacute;alisations");
    $('.descriptionToShow').html("");
    $('.descriptionToShow').addClass('hidden');
    $('.contentCategories').removeClass("hidden");
  });

  initiateCarrousel(currentId);
}

function buildCarrousel(images) {
  var htmlNode = '';
  for (var i=0;i<images.length;i++) {
    var htmlTag = '<li><img class="carousel" src="'+images[i].url+'" style="display: none"/></li>';
    htmlNode += htmlTag;
  }
  return htmlNode;
}

function initiateCarrousel(index) {
  images = $('.carousel img');
  currentIndex = 0;
  carouselSize = images.length;
  var currentImg = images[currentIndex];
  $(currentImg).css('display', 'block');
}

function processNextImage() {
  $('.carousel img').eq(currentIndex).css('display', 'none');
  currentIndex++;

  if(currentIndex <= images.length-1){
    $('.carousel img').eq(currentIndex).css('display', 'block');
  }
  else{
    currentIndex = 0;
    $('.carousel img').eq(0).css('display', 'block');
  }
}

function slideImg(){

  setTimeout(function() {
    if (carouselSize>0) {
      processNextImage();
    }

    slideImg();
  }, 3000);

}

slideImg();