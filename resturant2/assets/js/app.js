document.addEventListener("DOMContentLoaded", async () => {
    initializeSidebar();

    await loadMenuComponent();

    initializeMenu();
    initializeMenuButtons();
    initializeSidebarCategories();
});


/*
|--------------------------------------------------------------------------
| Sidebar
|--------------------------------------------------------------------------
*/

function initializeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    const openButton = document.getElementById("open-sidebar");
    const closeButton = document.getElementById("close-sidebar");

    if (!sidebar) {
        console.error("Sidebar element was not found.");
        return;
    }

    openButton?.addEventListener("click", () => {
        openSidebar();
    });

    closeButton?.addEventListener("click", () => {
        closeSidebar();
    });

    overlay?.addEventListener("click", () => {
        closeSidebar();
    });
}


function openSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (!sidebar) {
        return;
    }

    sidebar.classList.remove("translate-x-full");

    if (overlay) {
        overlay.classList.remove("hidden");
    }

    document.body.classList.add("overflow-hidden");
}


function closeSidebar() {
    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebar-overlay");

    if (!sidebar) {
        return;
    }

    sidebar.classList.add("translate-x-full");

    if (overlay) {
        overlay.classList.add("hidden");
    }

    document.body.classList.remove("overflow-hidden");
}


/*
|--------------------------------------------------------------------------
| Sidebar Main Categories
|--------------------------------------------------------------------------
*/

function initializeSidebarCategories() {

    const categoryButtons = document.querySelectorAll(".sidebar-category");

    categoryButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const categoryId = Number(button.dataset.categoryId);

            if (!categoryId) {
                return;
            }

            openCategory(categoryId);

            closeSidebar();
        });

    });
}


/*
|--------------------------------------------------------------------------
| Menu Navigation
|--------------------------------------------------------------------------
*/

function initializeMenuButtons() {
    const menuButton = document.getElementById("menu-nav-link");
    const backButton = document.getElementById("menu-back-button");

    menuButton?.addEventListener("click", () => {
        showRootCategories();

        closeSidebar();

        scrollToMenu();
    });

    backButton?.addEventListener("click", () => {
        goBack();
    });
}


/*
|--------------------------------------------------------------------------
| Load Menu Component
|--------------------------------------------------------------------------
*/

async function loadMenuComponent() {
    const menuContainer = document.getElementById("menu-container");

    if (!menuContainer) {
        console.error("Menu container was not found.");
        return;
    }

    try {
        const response = await fetch("components/menu.html");

        if (!response.ok) {
            throw new Error(
                `Failed to load menu component: ${response.status}`
            );
        }

        const html = await response.text();

        menuContainer.innerHTML = html;
    } catch (error) {
        console.error("Failed to load menu component:", error);

        menuContainer.innerHTML = `
            <div class="min-h-screen flex items-center justify-center p-6">
                <div class="text-center">

                    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                        <i class="fa-solid fa-triangle-exclamation text-2xl text-gray-400"></i>
                    </div>

                    <h2 class="text-xl font-bold text-gray-800">
                        تعذر تحميل القائمة
                    </h2>

                    <p class="text-gray-500 mt-2">
                        يرجى إعادة تحميل الصفحة والمحاولة مرة أخرى.
                    </p>

                </div>
            </div>
        `;
    }
}

/*
|--------------------------------------------------------------------------
| Scroll To Menu
|--------------------------------------------------------------------------
*/

function scrollToMenu() {

    const menu = document.getElementById("menu");

    if (!menu) {
        return;
    }


    const mobileHeader = document.querySelector("header");

    const headerHeight =
        window.innerWidth < 1024 && mobileHeader
            ? mobileHeader.offsetHeight
            : 0;


    const menuPosition =
        menu.getBoundingClientRect().top + window.scrollY;


    window.scrollTo({
        top: Math.max(0, menuPosition - headerHeight),
        behavior: "smooth"
    });
}