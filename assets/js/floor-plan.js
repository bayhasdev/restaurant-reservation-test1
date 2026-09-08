let floorPlanStage = null;
let floorPlanLayer = null;

const FLOOR_PLAN_WIDTH = 300;
const FLOOR_PLAN_HEIGHT = 1100;

const MIN_SCALE = 0.45;
const MAX_SCALE = 2.5;
const SCALE_STEP = 1.2;


/*
|--------------------------------------------------------------------------
| Initialize Floor Plan
|--------------------------------------------------------------------------
*/

function initializeFloorPlan() {

    const container = document.getElementById("floor-plan");

    if (!container) {
        console.error("Floor plan container was not found.");
        return;
    }

    container.innerHTML = "";

    const width = Math.max(container.clientWidth, 280);
    const height = Math.max(container.clientHeight, 320);

    floorPlanStage = new Konva.Stage({
        container: "floor-plan",
        width: width,
        height: height,
        draggable: true
    });

    floorPlanLayer = new Konva.Layer();

    floorPlanStage.add(floorPlanLayer);

    renderFloorPlan();

    initializeZoomControls();

    initializeFloorPlanResize();

    centerFloorPlan();
}


/*
|--------------------------------------------------------------------------
| Render Floor Plan
|--------------------------------------------------------------------------
*/

function renderFloorPlan() {

    if (!floorPlanLayer || !Array.isArray(restaurantTables)) {
        return;
    }

    floorPlanLayer.destroyChildren();

    const tables = restaurantTables;

    tables.forEach((table, index) => {

        const position = getTablePosition(
            index,
            tables.length,
            table
        );

        const tableGroup = createTable(
            table,
            position
        );

        floorPlanLayer.add(tableGroup);
    });

    floorPlanLayer.batchDraw();
}


/*
|--------------------------------------------------------------------------
| Calculate Table Position
|--------------------------------------------------------------------------
*/

function getTablePosition(index, total, table) {

    const width = Number(table.width) || 80;
    const height = Number(table.height) || 65;

    return {
        x: Number(table.x) || 0,
        y: Number(table.y) || 0
    };
}


/*
|--------------------------------------------------------------------------
| Generate Floor Plan Positions
|--------------------------------------------------------------------------
*/

function generateFloorPlanPositions(total) {

    const positions = [];

    if (total <= 0) {
        return positions;
    }


    /*
    |--------------------------------------------------------------------------
    | Layout Configuration
    |--------------------------------------------------------------------------
    */

    const left = 75;
    const right = FLOOR_PLAN_WIDTH - 75;

    const top = 65;
    const bottom = FLOOR_PLAN_HEIGHT - 65;

    const centerX = FLOOR_PLAN_WIDTH / 2;
    const centerY = FLOOR_PLAN_HEIGHT / 2;


    /*
    |--------------------------------------------------------------------------
    | Very Small Layouts
    |--------------------------------------------------------------------------
    */

    if (total <= 6) {

        const columns = 3;

        const rows = Math.ceil(total / columns);

        for (let i = 0; i < total; i++) {

            const row = Math.floor(i / columns);
            const column = i % columns;

            const x =
                left +
                ((right - left) / (columns - 1)) * column;

            const y =
                top +
                ((bottom - top) / Math.max(rows - 1, 1)) * row;

            positions.push({
                x,
                y
            });
        }

        return positions;
    }


    /*
    |--------------------------------------------------------------------------
    | Top Row
    |--------------------------------------------------------------------------
    */

    const topCount = Math.max(
        4,
        Math.ceil(total * 0.30)
    );

    const topSpacing =
        (right - left) /
        Math.max(topCount - 1, 1);

    for (let i = 0; i < topCount && positions.length < total; i++) {

        positions.push({
            x: left + i * topSpacing,
            y: top
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Side Tables
    |--------------------------------------------------------------------------
    */

    const remainingAfterTop =
        total - positions.length;

    const sideCount = Math.min(
        Math.ceil(remainingAfterTop * 0.55),
        4
    );

    const sideRows = Math.max(
        sideCount,
        1
    );

    for (let i = 0; i < sideCount && positions.length < total; i++) {

        const y =
            150 +
            ((bottom - 150) / Math.max(sideRows - 1, 1)) * i;

        positions.push({
            x: left,
            y
        });

        if (positions.length >= total) {
            break;
        }

        positions.push({
            x: right,
            y
        });
    }


    /*
    |--------------------------------------------------------------------------
    | Center Tables
    |--------------------------------------------------------------------------
    */

    const centerCandidates = [

        {
            x: centerX - 145,
            y: centerY - 55
        },

        {
            x: centerX + 145,
            y: centerY - 55
        },

        {
            x: centerX - 145,
            y: centerY + 75
        },

        {
            x: centerX + 145,
            y: centerY + 75
        },

        {
            x: centerX,
            y: centerY - 125
        },

        {
            x: centerX,
            y: centerY + 145
        },

        {
            x: centerX - 70,
            y: centerY + 10
        },

        {
            x: centerX + 70,
            y: centerY + 10
        }
    ];


    let centerIndex = 0;

    while (
        positions.length < total &&
        centerIndex < centerCandidates.length
    ) {

        positions.push(
            centerCandidates[centerIndex]
        );

        centerIndex++;
    }


    /*
    |--------------------------------------------------------------------------
    | Bottom Row
    |--------------------------------------------------------------------------
    */

    while (positions.length < total) {

        const bottomIndex =
            positions.length -
            (
                topCount +
                sideCount * 2
            );

        const bottomCount =
            Math.max(
                4,
                total -
                (
                    topCount +
                    sideCount * 2 +
                    centerCandidates.length
                )
            );

        const spacing =
            (right - left) /
            Math.max(bottomCount - 1, 1);

        positions.push({
            x: left + bottomIndex * spacing,
            y: bottom
        });
    }


    return positions;
}


/*
|--------------------------------------------------------------------------
| Create Table
|--------------------------------------------------------------------------
*/

function createTable(table, position) {

    const width = Number(table.width) || 80;
    const height = Number(table.height) || 65;

    const group = new Konva.Group({
        x: position.x,
        y: position.y,
        width: width,
        height: height,
        name: `table-${table.id}`
    });


    /*
    |--------------------------------------------------------------------------
    | Table Status
    |--------------------------------------------------------------------------
    */

    const isReserved =
        table.is_reserved === true ||
        table.isReserved === true ||
        table.status === "reserved" ||
        table.status === "booked";


    const availableFill = "#22c55e";
    const availableStroke = "#15803d";

    const reservedFill = "#ef4444";
    const reservedStroke = "#b91c1c";

    const fill =
        isReserved
            ? reservedFill
            : availableFill;

    const stroke =
        isReserved
            ? reservedStroke
            : availableStroke;


    /*
    |--------------------------------------------------------------------------
    | Table Surface
    |--------------------------------------------------------------------------
    */

    const isRound =
        table.shape === "round";


    const surface = isRound

        ? new Konva.Circle({
            x: width / 2,
            y: height / 2,
            radius: Math.min(width, height) / 2,
            fill: fill,
            stroke: stroke,
            strokeWidth: 3,
            shadowColor: "#000000",
            shadowBlur: 8,
            shadowOpacity: 0.15
        })

        : new Konva.Rect({
            x: 0,
            y: 0,
            width: width,
            height: height,
            cornerRadius: 16,
            fill: fill,
            stroke: stroke,
            strokeWidth: 3,
            shadowColor: "#000000",
            shadowBlur: 8,
            shadowOpacity: 0.15
        });


    /*
    |--------------------------------------------------------------------------
    | Table Number
    |--------------------------------------------------------------------------
    */

    const number = new Konva.Text({
        x: 0,
        y: height / 2 - 15,
        width: width,
        text: String(table.number ?? ""),
        fontSize: 21,
        fontStyle: "bold",
        fill: "#ffffff",
        align: "center"
    });


    /*
    |--------------------------------------------------------------------------
    | Seat Count
    |--------------------------------------------------------------------------
    */

    const seats = new Konva.Text({
        x: 0,
        y: height / 2 + 10,
        width: width,
        text: `${Number(table.seats) || 4} seats`,
        fontSize: 11,
        fill: "#ffffff",
        align: "center"
    });


    group.add(surface);
    group.add(number);
    group.add(seats);


    /*
    |--------------------------------------------------------------------------
    | Chairs
    |--------------------------------------------------------------------------
    */

    addChairs(
        group,
        table,
        isReserved
    );


    /*
    |--------------------------------------------------------------------------
    | Table Interaction
    |--------------------------------------------------------------------------
    */

    group.on("mouseenter", () => {

        document.body.style.cursor = "pointer";

        surface.shadowOpacity(0.30);

        surface.to({
            scaleX: 1.04,
            scaleY: 1.04,
            duration: 0.08
        });

        floorPlanLayer.batchDraw();
    });


    group.on("mouseleave", () => {

        document.body.style.cursor = "default";

        surface.shadowOpacity(0.15);

        surface.to({
            scaleX: 1,
            scaleY: 1,
            duration: 0.08
        });

        floorPlanLayer.batchDraw();
    });


    group.on("click tap", () => {

        if (typeof selectTable === "function") {
            selectTable(table);
        }
    });


    return group;
}


/*
|--------------------------------------------------------------------------
| Add Chairs
|--------------------------------------------------------------------------
*/

function addChairs(group, table, isReserved) {

    const chairSize = 17;
    const gap = 9;

    const positions = getChairPositions(
        table,
        chairSize,
        gap
    );

    const chairFill =
        isReserved
            ? "#991b1b"
            : "#78716c";


    positions.forEach(position => {

        const chair = new Konva.Rect({
            x: position.x,
            y: position.y,
            width: chairSize,
            height: chairSize,
            cornerRadius: 5,
            fill: chairFill,
            shadowColor: "#000000",
            shadowBlur: 3,
            shadowOpacity: 0.15
        });

        group.add(chair);
    });
}


/*
|--------------------------------------------------------------------------
| Calculate Chair Positions
|--------------------------------------------------------------------------
*/

function getChairPositions(table, chairSize, gap) {

    const positions = [];

    const count = Number(table.seats) || 4;

    const width = Number(table.width) || 80;
    const height = Number(table.height) || 65;

    const centerX = width / 2;
    const centerY = height / 2;


    /*
    |--------------------------------------------------------------------------
    | Two Seats
    |--------------------------------------------------------------------------
    */

    if (count === 2) {

        positions.push({
            x: centerX - chairSize / 2,
            y: -gap - chairSize
        });

        positions.push({
            x: centerX - chairSize / 2,
            y: height + gap
        });

        return positions;
    }


    /*
    |--------------------------------------------------------------------------
    | Four Seats
    |--------------------------------------------------------------------------
    */

    if (count === 4) {

        positions.push({
            x: centerX - chairSize / 2,
            y: -gap - chairSize
        });

        positions.push({
            x: width + gap,
            y: centerY - chairSize / 2
        });

        positions.push({
            x: centerX - chairSize / 2,
            y: height + gap
        });

        positions.push({
            x: -gap - chairSize,
            y: centerY - chairSize / 2
        });

        return positions;
    }


    /*
    |--------------------------------------------------------------------------
    | Six Seats
    |--------------------------------------------------------------------------
    */

    if (count === 6) {

        positions.push({
            x: centerX - chairSize / 2,
            y: -gap - chairSize
        });

        positions.push({
            x: width + gap,
            y: centerY - chairSize / 2
        });

        positions.push({
            x: centerX - chairSize / 2,
            y: height + gap
        });

        positions.push({
            x: -gap - chairSize,
            y: centerY - chairSize / 2
        });

        positions.push({
            x: width * 0.25 - chairSize / 2,
            y: -gap - chairSize
        });

        positions.push({
            x: width * 0.75 - chairSize / 2,
            y: height + gap
        });

        return positions;
    }


    /*
    |--------------------------------------------------------------------------
    | Eight Seats
    |--------------------------------------------------------------------------
    */

    if (count === 8) {

        positions.push({
            x: width * 0.25 - chairSize / 2,
            y: -gap - chairSize
        });

        positions.push({
            x: width * 0.75 - chairSize / 2,
            y: -gap - chairSize
        });

        positions.push({
            x: width + gap,
            y: height * 0.25 - chairSize / 2
        });

        positions.push({
            x: width + gap,
            y: height * 0.75 - chairSize / 2
        });

        positions.push({
            x: width * 0.25 - chairSize / 2,
            y: height + gap
        });

        positions.push({
            x: width * 0.75 - chairSize / 2,
            y: height + gap
        });

        positions.push({
            x: -gap - chairSize,
            y: height * 0.25 - chairSize / 2
        });

        positions.push({
            x: -gap - chairSize,
            y: height * 0.75 - chairSize / 2
        });

        return positions;
    }


    /*
    |--------------------------------------------------------------------------
    | Generic Seat Layout
    |--------------------------------------------------------------------------
    */

    const radius =
        Math.max(width, height) / 2 +
        gap +
        chairSize / 2;


    for (let i = 0; i < count; i++) {

        const angle =
            (Math.PI * 2 * i) /
            count -
            Math.PI / 2;

        positions.push({
            x:
                centerX +
                Math.cos(angle) * radius -
                chairSize / 2,

            y:
                centerY +
                Math.sin(angle) * radius -
                chairSize / 2
        });
    }


    return positions;
}


/*
|--------------------------------------------------------------------------
| Initialize Zoom Controls
|--------------------------------------------------------------------------
*/

function initializeZoomControls() {

    const zoomInButton =
        document.getElementById("zoom-in");

    const zoomOutButton =
        document.getElementById("zoom-out");

    const zoomResetButton =
        document.getElementById("zoom-reset");


    zoomInButton?.addEventListener(
        "click",
        () => zoomStage(SCALE_STEP)
    );


    zoomOutButton?.addEventListener(
        "click",
        () => zoomStage(1 / SCALE_STEP)
    );


    zoomResetButton?.addEventListener(
        "click",
        () => centerFloorPlan()
    );


    /*
    |--------------------------------------------------------------------------
    | Mouse Wheel Zoom
    |--------------------------------------------------------------------------
    */

    floorPlanStage.on("wheel", event => {

        event.evt.preventDefault();

        const oldScale =
            floorPlanStage.scaleX();

        const pointer =
            floorPlanStage.getPointerPosition();

        const direction =
            event.evt.deltaY > 0
                ? 1 / SCALE_STEP
                : SCALE_STEP;

        const newScale =
            clampScale(
                oldScale * direction
            );

        zoomAtPoint(
            pointer,
            newScale
        );
    });
}


/*
|--------------------------------------------------------------------------
| Zoom Stage
|--------------------------------------------------------------------------
*/

function zoomStage(factor) {

    if (!floorPlanStage) {
        return;
    }

    const oldScale =
        floorPlanStage.scaleX();

    const newScale =
        clampScale(
            oldScale * factor
        );


    const center = {
        x: floorPlanStage.width() / 2,
        y: floorPlanStage.height() / 2
    };


    zoomAtPoint(
        center,
        newScale
    );
}


/*
|--------------------------------------------------------------------------
| Zoom At Point
|--------------------------------------------------------------------------
*/

function zoomAtPoint(point, newScale) {

    if (!floorPlanStage) {
        return;
    }

    const oldScale =
        floorPlanStage.scaleX();


    const mousePointTo = {
        x:
            (point.x - floorPlanStage.x()) /
            oldScale,

        y:
            (point.y - floorPlanStage.y()) /
            oldScale
    };


    floorPlanStage.scale({
        x: newScale,
        y: newScale
    });


    floorPlanStage.position({
        x:
            point.x -
            mousePointTo.x *
            newScale,

        y:
            point.y -
            mousePointTo.y *
            newScale
    });


    floorPlanStage.batchDraw();
}


/*
|--------------------------------------------------------------------------
| Clamp Scale
|--------------------------------------------------------------------------
*/

function clampScale(scale) {

    return Math.max(
        MIN_SCALE,
        Math.min(
            MAX_SCALE,
            scale
        )
    );
}


/*
|--------------------------------------------------------------------------
| Center Floor Plan
|--------------------------------------------------------------------------
*/

function centerFloorPlan() {

    if (!floorPlanStage) {
        return;
    }


    const stageWidth =
        floorPlanStage.width();

    const stageHeight =
        floorPlanStage.height();


    const scaleX =
        stageWidth /
        FLOOR_PLAN_WIDTH;

    const scaleY =
        stageHeight /
        FLOOR_PLAN_HEIGHT;


    let scale =
        Math.min(
            scaleX,
            scaleY
        );


    /*
    |--------------------------------------------------------------------------
    | Mobile Scaling
    |--------------------------------------------------------------------------
    */

    if (stageWidth < 600) {

        scale =
            Math.min(
                scale,
                stageWidth /
                (FLOOR_PLAN_WIDTH * 0.92)
            );
    }


    scale =
        Math.max(
            scale,
            MIN_SCALE
        );


    floorPlanStage.scale({
        x: scale,
        y: scale
    });


    const x =
        (
            stageWidth -
            FLOOR_PLAN_WIDTH * scale
        ) / 2;


    const y =
        (
            stageHeight -
            FLOOR_PLAN_HEIGHT * scale
        ) / 2;


    floorPlanStage.position({
        x,
        y
    });


    floorPlanStage.batchDraw();
}


/*
|--------------------------------------------------------------------------
| Resize Floor Plan
|--------------------------------------------------------------------------
*/

function initializeFloorPlanResize() {

    let resizeTimeout = null;


    window.addEventListener("resize", () => {

        clearTimeout(resizeTimeout);


        resizeTimeout = setTimeout(() => {

            if (!floorPlanStage) {
                return;
            }


            const container =
                document.getElementById(
                    "floor-plan"
                );


            if (!container) {
                return;
            }


            floorPlanStage.width(
                Math.max(
                    container.clientWidth,
                    280
                )
            );


            floorPlanStage.height(
                Math.max(
                    container.clientHeight,
                    320
                )
            );


            centerFloorPlan();

        }, 150);
    });
}


/*
|--------------------------------------------------------------------------
| Touch / Mobile Improvements
|--------------------------------------------------------------------------
*/

function initializeMobileInteraction() {

    if (!floorPlanStage) {
        return;
    }


    floorPlanStage.on(
        "touchmove",
        event => {

            if (event.evt.touches.length > 1) {
                return;
            }
        }
    );
}


/*
|--------------------------------------------------------------------------
| Initialize When DOM Is Ready
|--------------------------------------------------------------------------
*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeFloorPlan();

        initializeMobileInteraction();

    }
);