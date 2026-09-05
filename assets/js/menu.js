let currentCategoryId = null;
let categoryPath = [];


/*
|--------------------------------------------------------------------------
| Initialize Menu
|--------------------------------------------------------------------------
*/

function initializeMenu() {

    currentCategoryId = null;
    categoryPath = [];

    renderCurrentLevel();
}


/*
|--------------------------------------------------------------------------
| Get Category
|--------------------------------------------------------------------------
*/

function getCategoryById(categoryId) {

    return categories.find(category => category.id === categoryId);
}


/*
|--------------------------------------------------------------------------
| Get Child Categories
|--------------------------------------------------------------------------
*/

function getChildCategories(parentId) {

    return categories.filter(category => category.parentId === parentId);
}


/*
|--------------------------------------------------------------------------
| Get Products
|--------------------------------------------------------------------------
*/

function getProductsByCategory(categoryId) {

    return menuItems.filter(item => item.categoryId === categoryId);
}


/*
|--------------------------------------------------------------------------
| Render Current Level
|--------------------------------------------------------------------------
*/

function renderCurrentLevel() {

    const categoryContainer = document.getElementById("menu-categories");
    const productContainer = document.getElementById("menu-products");
    const emptyState = document.getElementById("menu-empty");

    if (!categoryContainer || !productContainer || !emptyState) {
        return;
    }


    const childCategories = getChildCategories(currentCategoryId);


    // Hide everything first
    categoryContainer.classList.add("hidden");
    productContainer.classList.add("hidden");
    emptyState.classList.add("hidden");


    if (childCategories.length > 0) {

        renderCategoryLevel(childCategories);

        categoryContainer.classList.remove("hidden");

    } else if (currentCategoryId !== null) {

        renderProducts();

    } else {

        renderCategoryLevel(
            getChildCategories(null)
        );

        categoryContainer.classList.remove("hidden");
    }


    updateMenuHeader();
    renderBreadcrumb();
    updateBackButton();
}


/*
|--------------------------------------------------------------------------
| Render Categories
|--------------------------------------------------------------------------
*/

function renderCategoryLevel(categoryList) {

    const container = document.getElementById("menu-categories");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (categoryList.length === 0) {

        container.innerHTML = `
            <div class="col-span-full text-center py-12 text-gray-500">
                No categories found.
            </div>
        `;

        return;
    }


    categoryList.forEach(category => {

        const card = document.createElement("button");

        card.type = "button";

        card.className = `
            group
            text-right
            bg-white
            rounded-3xl
            overflow-hidden
            border
            border-gray-200
            hover:border-amber-300
            hover:shadow-xl
            transition
            duration-300
            focus:outline-none
            focus:ring-2
            focus:ring-amber-500
        `;


        card.innerHTML = `

            <div class="relative h-44 sm:h-52 overflow-hidden">

                <img
                    src="${category.image}"
                    alt="${category.name}"
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                >

                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>

                <div class="absolute bottom-4 right-4 left-4 flex items-end justify-between">

                    <div>
                        <h4 class="text-white text-xl font-bold">
                            ${category.name}
                        </h4>
                    </div>

                    <div class="w-11 h-11 rounded-full bg-white/90 text-amber-600 flex items-center justify-center shadow-lg">
                        <i class="fa-solid ${category.icon}"></i>
                    </div>

                </div>

            </div>


            <div class="p-5">

                <p class="text-gray-500 text-sm leading-6">
                    ${category.description || ""}
                </p>

                <div class="flex items-center justify-between mt-4">

                    <span class="text-sm font-semibold text-amber-600">
                        عرض القسم
                    </span>

                    <i class="fa-solid fa-arrow-left text-amber-600 group-hover:-translate-x-1 transition"></i>

                </div>

            </div>
        `;


        card.addEventListener("click", () => {
            openCategory(category.id);
        });


        container.appendChild(card);
    });
}


/*
|--------------------------------------------------------------------------
| Open Category
|--------------------------------------------------------------------------
*/

function openCategory(categoryId) {

    const category = getCategoryById(categoryId);

    if (!category) {
        return;
    }


    currentCategoryId = categoryId;


    // Build the category path
    categoryPath = getCategoryPath(categoryId);


    renderCurrentLevel();


    scrollToMenu();
}


/*
|--------------------------------------------------------------------------
| Get Category Path
|--------------------------------------------------------------------------
*/

function getCategoryPath(categoryId) {

    const path = [];

    let current = getCategoryById(categoryId);


    while (current) {

        path.unshift(current);

        if (current.parentId === null) {
            break;
        }

        current = getCategoryById(current.parentId);
    }


    return path;
}


/*
|--------------------------------------------------------------------------
| Render Products
|--------------------------------------------------------------------------
*/

function renderProducts() {
    const productsContainer = document.getElementById("menu-products");
    const categoriesContainer = document.getElementById("menu-categories");
    const emptyState = document.getElementById("menu-empty");

    if (!productsContainer) {
        return;
    }

    const products = getProductsByCategory(currentCategoryId);

    categoriesContainer?.classList.add("hidden");
    productsContainer.classList.remove("hidden");
    emptyState?.classList.add("hidden");

    if (products.length === 0) {
        productsContainer.classList.add("hidden");
        emptyState?.classList.remove("hidden");
        return;
    }

    productsContainer.innerHTML = products.map((product) => `
        <button
            type="button"
            class="group text-right bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition"
            onclick="openMealModal(${product.id})"
        >

            <!-- Product Image -->
            <div class="relative aspect-square overflow-hidden bg-gray-100">

                <!-- Unit -->
                <div class="absolute top-2 right-2 z-10">
                    <span class="inline-flex items-center px-2 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-[10px] sm:text-xs font-medium text-gray-600 shadow-sm">
                        ${product.unit || ""}
                    </span>
                </div>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    class="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    loading="lazy"
                >

                <!-- Price At Bottom Of Image -->
                <div class="absolute bottom-2 right-2 z-10">
                    <span class="inline-flex items-center px-2 py-1 rounded-lg bg-white/95 backdrop-blur-sm text-xs sm:text-sm font-bold text-amber-700 shadow-sm">
                        ${formatPrice(product.price)}
                    </span>
                </div>

            </div>


            <!-- Product Name -->
            <div class="p-3">
                <h3 class="text-sm sm:text-base font-bold text-gray-900 line-clamp-2">
                    ${product.name}
                </h3>
            </div>

        </button>
    `).join("");
}


/*
|--------------------------------------------------------------------------
| Format Price
|--------------------------------------------------------------------------
*/

function formatPrice(price) {

    return new Intl.NumberFormat("en-US").format(price) + " ل.س";
}


/*
|--------------------------------------------------------------------------
| Update Header
|--------------------------------------------------------------------------
*/

function updateMenuHeader() {

    const title = document.getElementById("menu-current-title");
    const description = document.getElementById("menu-current-description");


    if (!title || !description) {
        return;
    }


    if (currentCategoryId === null) {

        title.textContent = "الأقسام";

        description.textContent =
            "اختر القسم الذي تريد تصفحه";

        return;
    }


    const category = getCategoryById(currentCategoryId);

    if (!category) {
        return;
    }


    const children = getChildCategories(currentCategoryId);


    title.textContent = category.name;


    if (children.length > 0) {

        description.textContent =
            "اختر القسم الذي تريد تصفحه";

    } else {

        const products = getProductsByCategory(currentCategoryId);

        description.textContent =
            `${products.length} أصناف ضمن هذا القسم`;
    }
}


/*
|--------------------------------------------------------------------------
| Render Breadcrumb
|--------------------------------------------------------------------------
*/

function renderBreadcrumb() {

    const container = document.getElementById("menu-breadcrumb");

    if (!container) {
        return;
    }


    container.innerHTML = "";


    // Root
    const rootButton = document.createElement("button");

    rootButton.type = "button";

    rootButton.className = `
        text-amber-600
        hover:text-amber-800
        font-semibold
        transition
    `;

    rootButton.textContent = "القائمة";


    rootButton.addEventListener("click", () => {
        showRootCategories();
    });


    container.appendChild(rootButton);


    categoryPath.forEach((category, index) => {

        const separator = document.createElement("span");

        separator.className = "text-gray-400";

        separator.innerHTML = `
            <i class="fa-solid fa-chevron-left text-xs"></i>
        `;

        container.appendChild(separator);


        const button = document.createElement("button");

        button.type = "button";

        button.className = `
            font-semibold
            transition
            ${index === categoryPath.length - 1
                ? "text-gray-800 cursor-default"
                : "text-amber-600 hover:text-amber-800"
            }
        `;

        button.textContent = category.name;


        if (index !== categoryPath.length - 1) {

            button.addEventListener("click", () => {

                openCategory(category.id);

            });
        }


        container.appendChild(button);
    });
}


/*
|--------------------------------------------------------------------------
| Update Back Button
|--------------------------------------------------------------------------
*/

function updateBackButton() {

    const button = document.getElementById("menu-back-button");

    if (!button) {
        return;
    }


    if (currentCategoryId === null) {

        button.classList.add("hidden");

        return;
    }


    button.classList.remove("hidden");
}


/*
|--------------------------------------------------------------------------
| Go Back
|--------------------------------------------------------------------------
*/

function goBack() {

    if (currentCategoryId === null) {
        return;
    }


    const currentCategory = getCategoryById(currentCategoryId);

    if (!currentCategory) {
        return;
    }


    if (currentCategory.parentId === null) {

        showRootCategories();

        return;
    }


    openCategory(currentCategory.parentId);
}


/*
|--------------------------------------------------------------------------
| Show Root Categories
|--------------------------------------------------------------------------
*/

function showRootCategories() {

    currentCategoryId = null;
    categoryPath = [];

    renderCurrentLevel();


    scrollToMenu();
}


/*
|--------------------------------------------------------------------------
| Product Modal
|--------------------------------------------------------------------------
*/

/*
|--------------------------------------------------------------------------
| Product Modal
|--------------------------------------------------------------------------
*/

function openMealModal(productId) {

    const product = menuItems.find(item => item.id === Number(productId));

    if (!product) {
        console.error("Product was not found:", productId);
        return;
    }


    const modal = document.getElementById("meal-modal");
    const content = document.getElementById("meal-modal-content");

    if (!modal || !content) {
        return;
    }


    content.innerHTML = `

        <div class="relative">

            <img
                src="${product.image}"
                alt="${product.name}"
                class="w-full h-64 object-cover"
            >

            <button
                type="button"
                data-close-modal
                class="absolute top-4 left-4 w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>

        </div>


        <div class="p-6">

            <div class="flex items-start justify-between gap-4">

                <div>

                    <h3 class="text-2xl font-black text-gray-900">
                        ${product.name}
                    </h3>

                    <p class="text-gray-500 mt-2">
                        ${product.unit || ""}
                    </p>

                </div>


                <div class="text-left">

                    <div class="text-xl font-black text-amber-600">
                        ${formatPrice(product.price)}
                    </div>

                </div>

            </div>


            <div class="mt-6 p-4 bg-gray-50 rounded-2xl">

                <p class="text-gray-600 leading-7">
                    ${product.description || ""}
                </p>

            </div>


            <button
                type="button"
                data-close-modal
                class="w-full mt-6 py-3.5 rounded-xl bg-gray-900 text-white font-semibold hover:bg-amber-600 transition"
            >
                إغلاق
            </button>

        </div>
    `;


    modal.classList.remove("hidden");


    content.querySelectorAll("[data-close-modal]").forEach(element => {

        element.addEventListener("click", closeMealModal);

    });
}


/*
|--------------------------------------------------------------------------
| Close Product Modal
|--------------------------------------------------------------------------
*/

function closeMealModal() {

    const modal = document.getElementById("meal-modal");

    if (!modal) {
        return;
    }

    modal.classList.add("hidden");
}