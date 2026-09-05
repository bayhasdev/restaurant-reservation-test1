let selectedTable = null;


/*
|--------------------------------------------------------------------------
| Initialize Booking
|--------------------------------------------------------------------------
*/

document.addEventListener("DOMContentLoaded", () => {

    initializeBooking();

});


/*
|--------------------------------------------------------------------------
| Initialize
|--------------------------------------------------------------------------
*/

function initializeBooking() {

    renderTables();

    initializeBookingModal();

    initializeSidebar();

}


/*
|--------------------------------------------------------------------------
| Render Tables
|--------------------------------------------------------------------------
*/

function renderTables() {

    const floorPlan = document.getElementById("floor-plan");

    if (!floorPlan) {
        return;
    }


    floorPlan.innerHTML = "";


    restaurantTables.forEach(table => {

        const tableElement = document.createElement("button");

        tableElement.type = "button";

        tableElement.className = `
            restaurant-table
            available
        `;


        tableElement.style.left = `${table.x}px`;
        tableElement.style.top = `${table.y}px`;

        tableElement.style.width = `${table.width}px`;
        tableElement.style.height = `${table.height}px`;


        tableElement.innerHTML = `

            <div class="table-surface">

                <span class="table-number">
                    ${table.number}
                </span>

            </div>

            ${renderChairs(table)}

        `;


        tableElement.addEventListener("click", () => {

            selectTable(table);

        });


        floorPlan.appendChild(tableElement);
    });
}


/*
|--------------------------------------------------------------------------
| Render Chairs
|--------------------------------------------------------------------------
*/

function renderChairs(table) {

    const chairs = [];


    const chairCount = table.seats;


    for (let i = 0; i < chairCount; i++) {

        let positionClass = "";


        if (chairCount === 2) {

            positionClass =
                i === 0
                    ? "chair-left"
                    : "chair-right";

        } else if (chairCount === 4) {

            const positions = [
                "chair-top",
                "chair-right",
                "chair-bottom",
                "chair-left"
            ];

            positionClass = positions[i];

        } else {

            const positions = [
                "chair-top-left",
                "chair-top-right",
                "chair-right",
                "chair-bottom-right",
                "chair-bottom-left",
                "chair-left"
            ];

            positionClass = positions[i];
        }


        chairs.push(`
            <span class="chair ${positionClass}"></span>
        `);
    }


    return chairs.join("");
}


/*
|--------------------------------------------------------------------------
| Select Table
|--------------------------------------------------------------------------
*/

function selectTable(table) {

    const date = document.getElementById("booking-date");
    const time = document.getElementById("booking-time");


    if (!date.value || !time.value) {

        alert("Please select the date and time first.");

        return;
    }


    selectedTable = table;


    openBookingModal(table);
}


/*
|--------------------------------------------------------------------------
| Open Modal
|--------------------------------------------------------------------------
*/

function openBookingModal(table) {

    const modal = document.getElementById("booking-modal");
    const tableText = document.getElementById("selected-table-text");


    if (!modal || !tableText) {
        return;
    }


    tableText.textContent =
        `طاولة رقم ${table.number} - ${table.seats} أشخاص`;


    modal.classList.remove("hidden");
}


/*
|--------------------------------------------------------------------------
| Close Modal
|--------------------------------------------------------------------------
*/

function closeBookingModal() {

    const modal = document.getElementById("booking-modal");

    if (!modal) {
        return;
    }


    modal.classList.add("hidden");

    selectedTable = null;
}


/*
|--------------------------------------------------------------------------
| Booking Modal Events
|--------------------------------------------------------------------------
*/

function initializeBookingModal() {

    const closeButton =
        document.getElementById("close-booking-modal");

    const overlay =
        document.getElementById("booking-modal-overlay");

    const form =
        document.getElementById("booking-form");


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeBookingModal
        );
    }


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeBookingModal
        );
    }


    if (form) {

        form.addEventListener("submit", event => {

            event.preventDefault();


            if (!selectedTable) {
                return;
            }


            const bookingData = {

                tableId: selectedTable.id,

                tableNumber: selectedTable.number,

                date: document.getElementById("booking-date").value,

                time: document.getElementById("booking-time").value,

                customerName:
                    document.getElementById("customer-name").value,

                customerPhone:
                    document.getElementById("customer-phone").value,

                guests:
                    document.getElementById("guest-count").value
            };


            console.log("Booking request:", bookingData);


            alert(
                `تم إرسال طلب حجز الطاولة رقم ${selectedTable.number}`
            );


            form.reset();

            closeBookingModal();

        });
    }
}


/*
|--------------------------------------------------------------------------
| Sidebar
|--------------------------------------------------------------------------
*/

function initializeSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebar-overlay");

    const openButton =
        document.getElementById("open-sidebar");

    const closeButton =
        document.getElementById("close-sidebar");


    if (!sidebar || !overlay) {
        return;
    }


    function openSidebar() {

        sidebar.classList.remove("translate-x-full");

        overlay.classList.remove("hidden");

        document.body.classList.add("overflow-hidden");
    }


    function closeSidebar() {

        sidebar.classList.add("translate-x-full");

        overlay.classList.add("hidden");

        document.body.classList.remove("overflow-hidden");
    }


    if (openButton) {

        openButton.addEventListener(
            "click",
            openSidebar
        );
    }


    if (closeButton) {

        closeButton.addEventListener(
            "click",
            closeSidebar
        );
    }


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    document.querySelectorAll("#sidebar a").forEach(link => {

        link.addEventListener(
            "click",
            closeSidebar
        );

    });
}