// Product catalogue. To add a new Erdich product, add an entry to PRODUCTS.
// Entries with `placeholder: true` show as "Coming soon" cards — replace them with real products.

const YOGURT_FLAVORS = [
  { id: "apple", name: "Apple", color: "#059B78", note: "Crisp red apple folded into creamy, probiotic yogurt." },
  { id: "strawberry", name: "Strawberry", color: "#FFB5D8", note: "Sweet, sun-ripened strawberry in every sip." },
  { id: "mango", name: "Mango", color: "#FCEB53", note: "Juicy tropical mango — a true taste of Ghana." },
  { id: "vanilla", name: "Vanilla", color: "#8BC24A", note: "Smooth, mellow vanilla for a classic creamy treat." },
];

const PRODUCTS = [
  {
    id: "dcleo-yogurt",
    name: "D-cleo Yogurt",
    category: "Dairy",
    badge: "Bestseller",
    image: "assets/img/yogurt-strawberry.jpg",
    bg: "#FFB5D8",
    description: "Creamy drinking yogurt with live probiotic cultures, made from whole milk from grass-fed cows. 330ml.",
    swatches: YOGURT_FLAVORS.map((f) => f.color),
    href: "dcleo-yogurt.html",
  },
  {
    id: "dcleo-yogurt-wheat",
    name: "D-cleo Yogurt with Wheat Berries",
    category: "Dairy",
    badge: "Light meal",
    image: "assets/img/yogurt-apple-wheat.jpg",
    bg: "#059B78",
    description: "Our yogurt blended with wholesome wheat berries — a filling light meal for full day glory. 330ml.",
    swatches: YOGURT_FLAVORS.map((f) => f.color),
    href: "dcleo-yogurt.html?line=wheat",
  },
  { id: "coming-1", placeholder: true, name: "New product", category: "Coming soon", description: "Something delicious is on the way from the Erdich kitchen." },
  { id: "coming-2", placeholder: true, name: "New product", category: "Coming soon", description: "Something delicious is on the way from the Erdich kitchen." },
  { id: "coming-3", placeholder: true, name: "New product", category: "Coming soon", description: "Something delicious is on the way from the Erdich kitchen." },
];
