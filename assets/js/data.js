const restaurant = {
    name: "الأربع نواعير",
    type: "مطعم ومقهى"
};


/*
|--------------------------------------------------------------------------
| Categories
|--------------------------------------------------------------------------
| parentId = null means that this is a root category.
| Other categories use the parent category ID.
*/

const categories = [

    // Root categories
    {
        id: 1,
        name: "فطور",
        description: "وجبات الفطور الصباحية",
        parentId: null,
        icon: "fa-egg",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 2,
        name: "غداء",
        description: "وجبات الغداء",
        parentId: null,
        icon: "fa-bowl-food",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 3,
        name: "مشاوي",
        description: "أشهى المشاوي على الفحم",
        parentId: null,
        icon: "fa-drumstick-bite",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 4,
        name: "أركيلة",
        description: "نكهات متنوعة",
        parentId: null,
        icon: "fa-smoking",
        image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 5,
        name: "مشروبات",
        description: "مشروبات ساخنة وباردة",
        parentId: null,
        icon: "fa-mug-hot",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80"
    },


    // Breakfast children
    {
        id: 11,
        name: "بيض",
        description: "أطباق البيض",
        parentId: 1,
        icon: "fa-egg",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 12,
        name: "فطور شرقي",
        description: "أطباق الفطور الشرقية",
        parentId: 1,
        icon: "fa-bowl-food",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
    },


    // Lunch children
    {
        id: 21,
        name: "وجبات رئيسية",
        description: "وجبات الغداء الرئيسية",
        parentId: 2,
        icon: "fa-utensils",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 22,
        name: "فتات",
        description: "أطباق الفتة",
        parentId: 2,
        icon: "fa-bowl-food",
        image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=900&q=80"
    },


    // Grill children
    {
        id: 31,
        name: "مشاوي مشكلة",
        description: "تشكيلة من المشاوي",
        parentId: 3,
        icon: "fa-fire",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 32,
        name: "دجاج مشوي",
        description: "أطباق الدجاج المشوي",
        parentId: 3,
        icon: "fa-drumstick-bite",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 33,
        name: "لحمة مشوية",
        description: "أطباق اللحمة المشوية",
        parentId: 3,
        icon: "fa-fire-flame-curved",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
    },


    // Hookah children
    {
        id: 41,
        name: "نكهات تقليدية",
        description: "نكهات أركيلة تقليدية",
        parentId: 4,
        icon: "fa-smoking",
        image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 42,
        name: "نكهات خاصة",
        description: "نكهات مميزة",
        parentId: 4,
        icon: "fa-wand-magic-sparkles",
        image: "https://images.unsplash.com/photo-1561542320-9a18cd340469?auto=format&fit=crop&w=900&q=80"
    },


    // Drinks children
    {
        id: 51,
        name: "مشروبات ساخنة",
        description: "قهوة وشاي ومشروبات ساخنة",
        parentId: 5,
        icon: "fa-mug-hot",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 52,
        name: "مشروبات باردة",
        description: "عصائر ومشروبات باردة",
        parentId: 5,
        icon: "fa-glass-water",
        image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80"
    },


    // Hot drinks children
    {
        id: 511,
        name: "قهوة",
        description: "أنواع القهوة",
        parentId: 51,
        icon: "fa-coffee",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 512,
        name: "شاي",
        description: "أنواع الشاي",
        parentId: 51,
        icon: "fa-mug-hot",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 513,
        name: "مشروبات ساخنة أخرى",
        description: "مشروبات ساخنة متنوعة",
        parentId: 51,
        icon: "fa-mug-saucer",
        image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=900&q=80"
    },


    // Cold drinks children
    {
        id: 521,
        name: "عصائر",
        description: "عصائر طبيعية",
        parentId: 52,
        icon: "fa-glass-water",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 522,
        name: "كوكتيلات",
        description: "كوكتيلات وفواكه",
        parentId: 52,
        icon: "fa-martini-glass-citrus",
        image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 523,
        name: "مشروبات غازية",
        description: "مشروبات غازية متنوعة",
        parentId: 52,
        icon: "fa-bottle-water",
        image: "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=900&q=80"
    }
];


/*
|--------------------------------------------------------------------------
| Menu Items
|--------------------------------------------------------------------------
*/

const menuItems = [

    // Eggs
    {
        id: 1,
        categoryId: 11,
        name: "بيض عيون",
        description: "بيض طازج يقدم مع الخضار والخبز",
        price: 45000,
        unit: "صحن",
        image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 2,
        categoryId: 11,
        name: "بيض مع سجق",
        description: "بيض مع سجق شرقي وخضار",
        price: 65000,
        unit: "صحن",
        image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=900&q=80"
    },


    // Oriental breakfast
    {
        id: 3,
        categoryId: 12,
        name: "فطور الأربع نواعير",
        description: "بيض، لبنة، جبنة، زيتون، خضار ومربى",
        price: 85000,
        unit: "صحن",
        image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 4,
        categoryId: 12,
        name: "فول مدمس",
        description: "فول مدمس مع زيت الزيتون والليمون",
        price: 45000,
        unit: "زبدية",
        image: "https://images.unsplash.com/photo-1626509653291-18d8d6e6c4f3?auto=format&fit=crop&w=900&q=80"
    },


    // Main lunch meals
    {
        id: 5,
        categoryId: 21,
        name: "كباب حلبي",
        description: "كباب حلبي مشوي على الفحم",
        price: 120000,
        unit: "صحن",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 6,
        categoryId: 21,
        name: "شيش طاووق",
        description: "قطع دجاج متبلة ومشوية على الفحم",
        price: 105000,
        unit: "صحن",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80"
    },


    // Fattah
    {
        id: 7,
        categoryId: 22,
        name: "فتة دجاج",
        description: "فتة خبز مع الدجاج واللبن والصنوبر",
        price: 90000,
        unit: "صحن",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=900&q=80"
    },


    // Mixed grills
    {
        id: 8,
        categoryId: 31,
        name: "مشاوي مشكلة",
        description: "كباب، شيش طاووق، ريش ودجاج مشوي",
        price: 180000,
        unit: "500 غرام",
        image: "https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=900&q=80"
    },


    // Chicken
    {
        id: 9,
        categoryId: 32,
        name: "شيش طاووق",
        description: "قطع دجاج متبلة ومشوية على الفحم",
        price: 105000,
        unit: "صحن",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 10,
        categoryId: 32,
        name: "نصف فروج مشوي",
        description: "نصف فروج مشوي على الفحم",
        price: 120000,
        unit: "صحن",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=900&q=80"
    },


    // Beef
    {
        id: 11,
        categoryId: 33,
        name: "كباب حلبي",
        description: "كباب حلبي أصلي مشوي على الفحم",
        price: 120000,
        unit: "صحن",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 12,
        categoryId: 33,
        name: "ريش غنم",
        description: "ريش غنم مشوية على الفحم",
        price: 190000,
        unit: "500 غرام",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80"
    },


    // Hookah
    {
        id: 13,
        categoryId: 41,
        name: "أركيلة تفاحتين",
        description: "نكهة تفاحتين كلاسيكية",
        price: 80000,
        unit: "أركيلة",
        image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 14,
        categoryId: 41,
        name: "أركيلة نعنع",
        description: "نكهة نعنع منعشة",
        price: 80000,
        unit: "أركيلة",
        image: "https://images.unsplash.com/photo-1579208575657-c595a05383b7?auto=format&fit=crop&w=900&q=80"
    },


    // Coffee
    {
        id: 15,
        categoryId: 511,
        name: "قهوة عربية",
        description: "قهوة عربية محضرة على الطريقة التقليدية",
        price: 30000,
        unit: "فنجان",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80"
    },


    // Tea
    {
        id: 16,
        categoryId: 512,
        name: "شاي",
        description: "شاي أسود يقدم ساخناً",
        price: 25000,
        unit: "كأس",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=900&q=80"
    },


    // Other hot drinks
    {
        id: 17,
        categoryId: 513,
        name: "نسكافيه",
        description: "نسكافيه بالحليب",
        price: 35000,
        unit: "كأس",
        image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?auto=format&fit=crop&w=900&q=80"
    },


    // Juices
    {
        id: 18,
        categoryId: 521,
        name: "عصير برتقال طبيعي",
        description: "عصير برتقال طبيعي طازج",
        price: 45000,
        unit: "كأس",
        image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=900&q=80"
    },

    {
        id: 19,
        categoryId: 521,
        name: "ليمون ونعنع",
        description: "عصير ليمون طازج مع النعنع",
        price: 50000,
        unit: "كأس",
        image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=900&q=80"
    },


    // Cocktails
    {
        id: 20,
        categoryId: 522,
        name: "كوكتيل فواكه",
        description: "تشكيلة فواكه طازجة مع العصير",
        price: 65000,
        unit: "كأس",
        image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?auto=format&fit=crop&w=900&q=80"
    },


    // Soft drinks
    {
        id: 21,
        categoryId: 523,
        name: "مشروب غازي",
        description: "اختيارك من المشروبات الغازية",
        price: 25000,
        unit: "عبوة",
        image: "https://images.unsplash.com/photo-1629203849820-fdd70d49c38e?auto=format&fit=crop&w=900&q=80"
    }
];


/*
|--------------------------------------------------------------------------
| Tables
|--------------------------------------------------------------------------
| These will be used by the separate booking page. 
مثلاً x أصغر = تروح لليسار، وy أصغر = تروح لفوق.
*/ 
/*
|--------------------------------------------------------------------------
| Table Positions
|--------------------------------------------------------------------------
|
| x and y are the exact table positions.
| The table position is not calculated automatically.
|
*/

const restaurantTables = [

    // ================================================================
    // LONG CORRIDOR - LEFT SIDE
    // ================================================================

    {
        id: 1,
        number: 1,
        seats: 2,
        x: 55,
        y: 45,
        width: 85,
        height: 60,
        shape: "rectangle"
    },

    {
        id: 3,
        number: 3,
        seats: 4,
        x: 45,
        y: 170,
        width: 100,
        height: 65,
        shape: "rectangle"
    },

    {
        id: 5,
        number: 5,
        seats: 4,
        x: 45,
        y: 300,
        width: 100,
        height: 65,
        shape: "round"
    },

    {
        id: 7,
        number: 7,
        seats: 4,
        x: 45,
        y: 430,
        width: 100,
        height: 65,
        shape: "rectangle"
    },

    {
        id: 9,
        number: 9,
        seats: 2,
        x: 55,
        y: 560,
        width: 85,
        height: 60,
        shape: "rectangle"
    },


    // ================================================================
    // LONG CORRIDOR - RIGHT SIDE
    // ================================================================

    {
        id: 2,
        number: 2,
        seats: 2,
        x: 560,
        y: 45,
        width: 85,
        height: 60,
        shape: "rectangle"
    },

    {
        id: 4,
        number: 4,
        seats: 4,
        x: 555,
        y: 170,
        width: 100,
        height: 65,
        shape: "rectangle"
    },

    {
        id: 6,
        number: 6,
        seats: 4,
        x: 555,
        y: 300,
        width: 100,
        height: 65,
        shape: "round"
    },

    {
        id: 8,
        number: 8,
        seats: 4,
        x: 555,
        y: 430,
        width: 100,
        height: 65,
        shape: "rectangle"
    },

    {
        id: 10,
        number: 10,
        seats: 2,
        x: 560,
        y: 560,
        width: 85,
        height: 60,
        shape: "rectangle"
    },


    // ================================================================
    // WIDE BACK AREA
    // ================================================================

    {
        id: 11,
        number: 11,
        seats: 4,
        x: 45,
        y: 750,
        width: 110,
        height: 70,
        shape: "rectangle"
    },

    {
        id: 12,
        number: 12,
        seats: 4,
        x: 295,
        y: 750,
        width: 110,
        height: 70,
        shape: "round"
    },

    {
        id: 13,
        number: 13,
        seats: 4,
        x: 545,
        y: 750,
        width: 110,
        height: 70,
        shape: "rectangle"
    },


    {
        id: 14,
        number: 14,
        seats: 4,
        x: 45,
        y: 890,
        width: 110,
        height: 70,
        shape: "round"
    },

    {
        id: 15,
        number: 15,
        seats: 4,
        x: 295,
        y: 890,
        width: 110,
        height: 70,
        shape: "rectangle"
    },

    {
        id: 16,
        number: 16,
        seats: 4,
        x: 545,
        y: 890,
        width: 110,
        height: 70,
        shape: "round"
    },


    {
        id: 17,
        number: 17,
        seats: 4,
        x: 45,
        y: 1030,
        width: 110,
        height: 70,
        shape: "rectangle"
    },

    {
        id: 18,
        number: 18,
        seats: 4,
        x: 225,
        y: 1030,
        width: 110,
        height: 70,
        shape: "round"
    },

    {
        id: 19,
        number: 19,
        seats: 4,
        x: 405,
        y: 1030,
        width: 110,
        height: 70,
        shape: "rectangle"
    },

    {
        id: 20,
        number: 20,
        seats: 4,
        x: 585,
        y: 1030,
        width: 110,
        height: 70,
        shape: "round"
    }
];