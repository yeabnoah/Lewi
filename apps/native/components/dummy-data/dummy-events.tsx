const dummyEvents = [
  {
    id: 1,
    title: "Team Meeting",
    time: "Today · 2:00 PM",
    location: "Office Conference Room",
    icon: "briefcase",
    aiSuggestion: {
      label: "Business Casual",
      match: 92,
      description: "Navy Blazer · White Shirt · Dark Jeans",
      image: require("../../assets/images/shirt.jpg"),
      weather: {
        temperature: "72°F",
        condition: "Sunny",
      },
    },
  },
  {
    id: 2,
    title: "Dinner Date",
    time: "Tomorrow · 7:00 PM",
    location: "The Garden Restaurant",
    icon: "utensils",
    aiSuggestion: {
      label: "Smart Casual",
      match: 88,
      description: "Black Dress · Heels · Statement Jewelry",
      image: require("../../assets/images/shoes1.jpg"),
      weather: {
        temperature: "68°F",
        condition: "Clear",
      },
    },
  },
  {
    id: 3,
    title: "Gym Session",
    time: "Tomorrow · 6:00 AM",
    location: "Titan Fitness Center",
    icon: "dumbbell",
    aiSuggestion: {
      label: "Athleisure",
      match: 94,
      description: "Tank Top · Leggings · Running Shoes",
      image: require("../../assets/images/shoes2.jpg"),
      weather: {
        temperature: "65°F",
        condition: "Cool",
      },
    },
  },
  {
    id: 4,
    title: "Wedding Ceremony",
    time: "Saturday · 3:00 PM",
    location: "Lakeside Hall",
    icon: "rings",
    aiSuggestion: {
      label: "Formal",
      match: 90,
      description: "Navy Suit · Tie · Oxford Shoes",
      image: require("../../assets/images/jeans1.jpg"),
      weather: {
        temperature: "75°F",
        condition: "Partly Cloudy",
      },
    },
  },
];

export default dummyEvents;
