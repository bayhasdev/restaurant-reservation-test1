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

    initializeBookingModal();

    initializeSidebar();

}


/*
|--------------------------------------------------------------------------
| Select Table
|--------------------------------------------------------------------------
*/

function selectTable(table) {

    if (!table) {
        return;
    }


    selectedTable = table;

    openBookingModal(table);
}


/*
|--------------------------------------------------------------------------
| Open Booking Modal
|--------------------------------------------------------------------------
*/

function openBookingModal(table) {

    const modal =
        document.getElementById("booking-modal");

    const tableText =
        document.getElementById("selected-table-text");

    const guestCount =
        document.getElementById("guest-count");

    const dateInput =
        document.getElementById("booking-date");


    if (!modal || !tableText) {
        return;
    }


    tableText.textContent =
        `طاولة رقم ${table.number} - ${table.seats} أشخاص`;


    /*
    |--------------------------------------------------------------------------
    | Set Minimum Booking Date
    |--------------------------------------------------------------------------
    */

    if (dateInput) {

        const today =
            new Date().toISOString().split("T")[0];

        dateInput.min = today;
    }


    /*
    |--------------------------------------------------------------------------
    | Limit Guest Count To Table Capacity
    |--------------------------------------------------------------------------
    */

    if (guestCount) {

        guestCount.innerHTML = `
            <option value="">
                اختر عدد الأشخاص
            </option>
        `;


        for (
            let i = 1;
            i <= table.seats;
            i++
        ) {

            guestCount.innerHTML += `
                <option value="${i}">
                    ${getGuestLabel(i)}
                </option>
            `;
        }
    }


    modal.classList.remove("hidden");

    document.body.classList.add("overflow-hidden");


    /*
    |--------------------------------------------------------------------------
    | Focus Customer Name
    |--------------------------------------------------------------------------
    */

    setTimeout(() => {

        document
            .getElementById("customer-name")
            ?.focus();

    }, 100);
}


/*
|--------------------------------------------------------------------------
| Guest Label
|--------------------------------------------------------------------------
*/

function getGuestLabel(count) {

    if (count === 1) {
        return "شخص واحد";
    }

    if (count === 2) {
        return "شخصان";
    }

    return `${count} أشخاص`;
}


/*
|--------------------------------------------------------------------------
| Close Booking Modal
|--------------------------------------------------------------------------
*/

function closeBookingModal() {

    const modal =
        document.getElementById("booking-modal");

    const form =
        document.getElementById("booking-form");


    if (!modal) {
        return;
    }


    modal.classList.add("hidden");

    document.body.classList.remove("overflow-hidden");


    if (form) {
        form.reset();
    }


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


    closeButton?.addEventListener(
        "click",
        closeBookingModal
    );


    overlay?.addEventListener(
        "click",
        closeBookingModal
    );


    form?.addEventListener(
        "submit",
        handleBookingSubmit
    );
}


/*
|--------------------------------------------------------------------------
| Handle Booking Submit
|--------------------------------------------------------------------------
*/

function handleBookingSubmit(event) {

    event.preventDefault();


    if (!selectedTable) {
        return;
    }


    const bookingData = {

        tableId:
            selectedTable.id,

        tableNumber:
            selectedTable.number,

        customerName:
            document
                .getElementById("customer-name")
                .value
                .trim(),

        customerPhone:
            document
                .getElementById("customer-phone")
                .value
                .trim(),

        date:
            document
                .getElementById("booking-date")
                .value,

        time:
            document
                .getElementById("booking-time")
                .value,

        guests:
            document
                .getElementById("guest-count")
                .value
    };


    /*
    |--------------------------------------------------------------------------
    | Validate Booking
    |--------------------------------------------------------------------------
    */

    if (
        !bookingData.customerName ||
        !bookingData.customerPhone ||
        !bookingData.date ||
        !bookingData.time ||
        !bookingData.guests
    ) {

        alert("Please complete all booking fields.");

        return;
    }


    console.log(
        "Booking request:",
        bookingData
    );


    alert(
        `تم إرسال طلب حجز الطاولة رقم ${selectedTable.number}`
    );


    closeBookingModal();
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

        sidebar.classList.remove(
            "translate-x-full"
        );

        overlay.classList.remove(
            "hidden"
        );

        document.body.classList.add(
            "overflow-hidden"
        );
    }


    function closeSidebar() {

        sidebar.classList.add(
            "translate-x-full"
        );

        overlay.classList.add(
            "hidden"
        );

        document.body.classList.remove(
            "overflow-hidden"
        );
    }


    openButton?.addEventListener(
        "click",
        openSidebar
    );


    closeButton?.addEventListener(
        "click",
        closeSidebar
    );


    overlay.addEventListener(
        "click",
        closeSidebar
    );


    document
        .querySelectorAll("#sidebar a")
        .forEach(link => {

            link.addEventListener(
                "click",
                closeSidebar
            );

        });
}