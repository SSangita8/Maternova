const mongoose = require('mongoose');

const dietarySchema = new mongoose.Schema({
  first_trimester: {
    vegetarian: {
      what_to_eat_drink: [String],
      what_to_avoid: [String],
    },
    non_vegetarian: {
      what_to_eat_drink: [String],
      what_to_avoid: [String],
    },
  },
  second_trimester: {
    vegetarian: {
      what_to_eat_drink: [String],
      what_to_avoid: [String],
    },
    non_vegetarian: {
      what_to_eat_drink: [String],
      what_to_avoid: [String],
    },
  },
  third_trimester: {
    vegetarian: {
      what_to_eat_drink: [String],
      what_to_avoid: [String],
    },
    non_vegetarian: {
      what_to_eat_drink: [String],
      what_to_avoid: [String],
    },
  },
  foods_to_avoid: [
    {
      category: String,
      foods: [String],
      reason: String,
    },
  ],
  skincare_products_to_avoid: {
    Retinoids: {
      Ingredients_to_Avoid: [String],
      Examples_of_Products: [String],
    },
    Salicylic_Acid: {
      Ingredients_to_Avoid: [String],
      Examples_of_Products: [String],
    },
    "Hydroquinone": [
            "Hydroquinone"
        ],
        "Phthalates": [
            "Diethyl phthalate (DEP)",
            "Dimethyl phthalate (DMP)",
            "Diethylhexyl phthalate (DEHP)"
        ],
        "Formaldehyde": [
            "Formaldehyde",
            "Formaldehyde-releasing preservatives"
        ],
        "Chemical Sunscreens": [
            "Oxybenzone",
            "Avobenzone",
            "Octocrylene",
            "Homosalate",
            "Octinoxate",
            "Octisalate"
        ],
        "Essential Oils (in high concentration)": [
            "Tea tree oil",
            "Rosemary oil",
            "Clary sage oil",
            "Jasmine oil",
            "Juniper oil"
        ],
        "Benzoyl Peroxide": [
            "Benzoyl peroxide"
        ],
        "Tetracycline": [
            "Tetracycline",
            "Doxycycline",
            "Minocycline"
        ],
        "Parabens": [
            "Methylparaben",
            "Propylparaben",
            "Butylparaben",
            "Ethylparaben"
        ],
        "Diethanolamine (DEA) and Triethanolamine (TEA)": [
            "Diethanolamine (DEA)",
            "Triethanolamine (TEA)"
        ],
        "High-dose Vitamin A": [
            "Retinoic acid",
            "Retinol"
        ]
    // Add the rest of the categories here
  },
  trimester_guidelines: {
    first_trimester: {
      dos: Object,
      donts: Object,
    },
    second_trimester: {
      dos: Object,
      donts: Object,
    },
    third_trimester: {
      dos: Object,
      donts: Object,
    },
  },
});

const DietaryModel = mongoose.model('Dietary', dietarySchema);

module.exports = DietaryModel;
