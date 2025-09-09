const lodedAllCategoriesBtn = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllCategoriesData(data.categories));
};

const lodedAllPlants = () => {
  const url = "https://openapi.programming-hero.com/api/plants";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllPlants(data.plants));
};

const removeActive = () => {
  const categorieBtn = document.querySelectorAll(".categorie-btn");
  categorieBtn.forEach((btn) => btn.classList.remove("active"));
};

const loadeCategoryBtn = (id) => {
  const url = `https://openapi.programming-hero.com/api/category/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      removeActive();
      const clickBtn = document.getElementById(`categoriesBtn-${id}`);
      clickBtn.classList.add("active");
      displayAllPlants(data.plants);
    });
};

const loadPlantsDetails = async (id) => {
  const url = `https://openapi.programming-hero.com/api/plant/${id}`;
  const res = await fetch(url);
  const details = await res.json();
  displayPlantDetails(details.plants);
};

const displayPlantDetails = (plants) => {
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
        <div class="space-y-2">
          <h2 class="text-lg font-semibold">${plants.name}</h2>
          <img class="rounded-md h-[250px] w-full object-cover" src="${plants.image}" alt="">
          <p class="font-semibold">Category: <span class="font-normal text-gray-700
          <p class="font-semibold"><i class="fa-solid fa-bangladeshi-taka-sign"></i> Price: <span class="font-normal text-gray-700">${plants.price}</span></p>
          <p class="font-semibold">Description: <span class="font-normal text-gray-700">${plants.description}</span></p>
        </div>
  `;
  document.getElementById("plant_modal").showModal();
};

const displayAllPlants = (plants) => {
  const allPlantsContainer = document.getElementById("all-plants-container");
  allPlantsContainer.innerHTML = "";
  plants.forEach((plant) => {
    const divEle = document.createElement("div");
    divEle.innerHTML = `
          <div class="bg-white p-4 rounded-md h-full">
            <img class="rounded-md w-full h-[300px] object-cover" src="${plant.image}" alt="">
            <div>
              <h2 onclick="loadPlantsDetails(${plant.id})" class="text-lg text-[#1F2937] font-medium my-2">${plant.name}</h2>
              <p class="text-gray-500">${plant.description}</p>
              <div class="flex justify-between items-center my-5">
                <h2 class="bg-green-200 text-green-900 font-medium py-1 px-3 rounded-full">${plant.category}</h2>
                <h3 class="text-[#1F2937] font-medium"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${plant.price}</span></h3>
              </div>
              <button class="bg-green-900 text-white w-full py-2 rounded-full cursor-pointer border-2 border-green-900 hover:bg-transparent hover:text-green-900 add-btn">Add to card</button>
            </div>
          </div>
    `;

    allPlantsContainer.appendChild(divEle);
    const cartAddBtns = divEle.querySelector(".add-btn");
    const cardContainer = document.getElementById("card-container");
    // cardContainer.innerHTML = "";
    cartAddBtns.addEventListener("click", function () {
      const divElem = document.createElement("div");
      divElem.innerHTML = `
            <div class="flex justify-between items-center bg-[#F0FDF4] p-2 rounded">
              <div>
                <h4 class="font-medium text-[#1F2937]">${plant.name}</h4>
                <p id="price-${plant.id}" class="text-gray-500"><i class="fa-solid fa-bangladeshi-taka-sign"></i><span>${plant.price}</span></p>
              </div>
              <i class="fa-solid fa-xmark text-gray-500 remove-btn"></i>
            </div>
        `;

      cardContainer.append(divElem);

      // const price = document.getElementById(`price-${plant.id}`).innerText;
      // const totalPrice = document.getElementById("total-price").innerText;
      // let currentTotalPrice = Number(price) + Number(totalPrice);
      // document.getElementById("total-price").innerText = currentTotalPrice;

      // document.querySelector(".remove-btn").addEventListener("click", function () {
      //   divElem.remove();
      //   let currentTotalPrice = Number(totalPrice) - Number(price);
      //   document.getElementById("total-price").innerText = currentTotalPrice;
      // });


      let total = Number(document.getElementById("total-price").innerText);
      total = total + Number(plant.price)
      document.getElementById("total-price").innerText = total;


      const removeBtn = divElem.querySelector(".remove-btn");
      removeBtn.addEventListener("click", function() {
        divElem.remove()

        let total = Number(document.getElementById("total-price").innerText)
        total = total - Number(plant.price)
        document.getElementById("total-price").innerText = total
      })

    });
  });
};
lodedAllPlants();

const displayAllCategoriesData = (categories) => {
  const categorieContainer = document.getElementById("categories-container");
  categorieContainer.innerHTML = "";
  categories.forEach((categorie) => {
    const categorieBtnDiv = document.createElement("div");
    categorieBtnDiv.innerHTML = `
      <button id="categoriesBtn-${categorie.id}" onclick="loadeCategoryBtn(${categorie.id})" class="w-full text-left font-medium text-green-900 hover:bg-green-900 hover:text-white py-2 px-5 rounded-md categorie-btn">${categorie.category_name}</button>
    `;
    categorieContainer.appendChild(categorieBtnDiv);
  });
};
lodedAllCategoriesBtn();
