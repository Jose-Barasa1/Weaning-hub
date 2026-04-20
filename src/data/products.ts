import siliconeSet from "@/assets/products/silicone-set.jpg";
import cup4in1 from "@/assets/products/4in1-cup.jpg";
import cup2in1 from "@/assets/products/2in1-cup.jpg";
import siliconeSpoon from "@/assets/products/silicone-spoon.jpg";
import softTipSpoon from "@/assets/products/soft-tip-spoon.jpg";
import spoonForkSet from "@/assets/products/spoon-fork-set.jpg";
import snackCup from "@/assets/products/snack-cup.jpg";
import siliconePlate from "@/assets/products/silicone-plate.jpg";
import siliconeBib from "@/assets/products/silicone-bib.jpg";
import siliconeBowlSet from "@/assets/products/silicone-bowl-set.jpg";
import mashServeBowl from "@/assets/products/mash-serve-bowl.jpg";
import fruitFeeder from "@/assets/products/fruit-feeder.jpg";
import squeezeFeeder from "@/assets/products/squeeze-feeder.jpg";
import bottleBrushSet from "@/assets/products/bottle-brush-set.jpg";
import munchkinBrush from "@/assets/products/munchkin-brush.jpg";
import travelBrush from "@/assets/products/travel-brush.jpg";
import containers4 from "@/assets/products/4pack-containers.jpg";
import containers6 from "@/assets/products/6pack-containers.jpg";
import oralCareKit from "@/assets/products/oral-care-kit.jpg";
import munchkinStraw from "@/assets/products/munchkin-straw.jpg";
import munchkinTumbler from "@/assets/products/munchkin-tumbler.jpg";
import munchkinMultiplates from "@/assets/products/munchkin-multiplates.jpg";
import suctionBowl from "@/assets/products/suction-bowl.jpg";
import smockBib from "@/assets/products/smock-bib.jpg";
import gyroBowl from "@/assets/products/gyro-bowl.jpg";
import wheatStrawBowl from "@/assets/products/wheat-straw-bowl.jpg";
import pacifierClip from "@/assets/products/pacifier-clip.jpg";
import braceletTeether from "@/assets/products/bracelet-teether.jpg";
import lionBracelet from "@/assets/products/lion-bracelet.jpg";
import siliconePacifier from "@/assets/products/silicone-pacifier.jpg";
import pacifierHolder from "@/assets/products/pacifier-holder.jpg";
import teetherRing from "@/assets/products/teether-ring.jpg";
import fingerTeether from "@/assets/products/finger-teether.jpg";
import squirrelTeether from "@/assets/products/squirrel-teether.jpg";
import rainbowTeether from "@/assets/products/rainbow-teether.jpg";
import foxTeether from "@/assets/products/fox-teether.jpg";

export type Category = "Feeding" | "Cups & Bowls" | "Bibs" | "Storage" | "Cleaning" | "Teethers & Soothers";

export type Product = {
  slug: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  highlights: string[];
};

export const products: Product[] = [
  { slug: "silicone-set", name: "Silicone Feeding Set", price: 3500, category: "Feeding", image: siliconeSet,
    description: "Includes a suction bowl, suction grid plate, fork, spoon, and a 2-in-1 cup with interchangeable lids. Everything baby needs to start solids.",
    highlights: ["Food-grade silicone", "BPA-free", "Suction base", "5 pieces"] },
  { slug: "4in1-silicone-cup", name: "4-in-1 Silicone Cup", price: 1400, category: "Cups & Bowls", image: cup4in1,
    description: "A multifunctional silicone cup that converts between a straw cup, sippy cup, snack cup, and open training cup.",
    highlights: ["4 functions", "Spill-proof", "Soft silicone", "Easy clean"] },
  { slug: "2in1-silicone-cup", name: "2-in-1 Silicone Cup", price: 800, category: "Cups & Bowls", image: cup2in1,
    description: "Versatile cup usable as a straw cup or snack cup. Comes with a soft silicone straw lid and snack lid.",
    highlights: ["2 lids included", "Soft silicone straw", "Toddler grip"] },
  { slug: "silicone-spoon", name: "Silicone Spoon", price: 250, category: "Feeding", image: siliconeSpoon,
    description: "Soft silicone feeding spoons designed for gentle contact with baby gums. Heat-safe, flexible, and sized for first foods.",
    highlights: ["Soft on gums", "Heat-safe", "First foods"] },
  { slug: "soft-tip-spoon", name: "Soft Tip Silicone Spoon", price: 250, category: "Feeding", image: softTipSpoon,
    description: "An extra-soft tipped spoon perfect for early weaning. Ergonomic handle for tiny hands.",
    highlights: ["Extra soft tip", "Ergonomic", "Self-feeding"] },
  { slug: "spoon-fork-set", name: "Spoon & Fork Set", price: 400, category: "Feeding", image: spoonForkSet,
    description: "Baby-safe fork and spoon designed to support independent feeding.",
    highlights: ["Toddler-safe fork", "Easy grip", "Set of 2"] },
  { slug: "silicone-snack-cup", name: "Silicone Snack Cup", price: 700, category: "Cups & Bowls", image: snackCup,
    description: "Spill-proof silicone snack cup with soft flaps that allow easy access while containing messes. Perfect for travel.",
    highlights: ["Spill-proof flaps", "Travel-friendly", "Easy clean"] },
  { slug: "silicone-plate", name: "Divided Silicone Plate", price: 1100, category: "Cups & Bowls", image: siliconePlate,
    description: "Durable, food-grade silicone plate with divided sections. Heat-resistant, non-slip, and dishwasher safe.",
    highlights: ["Divided sections", "Non-slip base", "Dishwasher safe"] },
  { slug: "silicone-bib", name: "Silicone Bib", price: 600, category: "Bibs", image: siliconeBib,
    description: "Adjustable silicone bibs with a deep food-catcher pocket. Waterproof, stain-resistant, and easy to wipe.",
    highlights: ["Deep catch pocket", "Waterproof", "Adjustable"] },
  { slug: "silicone-bowl-set", name: "Silicone Bowl Set", price: 1100, category: "Cups & Bowls", image: siliconeBowlSet,
    description: "A silicone bowl with strong suction to prevent tipping. Comes with a matching soft-tip spoon.",
    highlights: ["Strong suction", "Includes spoon", "Soft silicone"] },
  { slug: "mash-serve-bowl", name: "Mash & Serve Bowl", price: 600, category: "Feeding", image: mashServeBowl,
    description: "Manual mashing bowl for preparing fresh baby food. Includes a masher and textured base for different consistencies.",
    highlights: ["Mash + serve", "Textured base", "Fresh purees"] },
  { slug: "fruit-feeder", name: "Silicone Fruit Feeder", price: 550, category: "Feeding", image: fruitFeeder,
    description: "A feeder to introduce babies to fresh fruits safely. Features a silicone nipple that reduces choking risk.",
    highlights: ["Reduces choking risk", "Silicone nipple", "Easy grip"] },
  { slug: "squeeze-feeder", name: "Squeeze Feeder", price: 900, category: "Feeding", image: squeezeFeeder,
    description: "One-hand feeding tool combining a squeeze bottle and soft spoon. Ideal for purees and semi-solids.",
    highlights: ["One-hand feeding", "Soft spoon tip", "On the go"] },
  { slug: "bottle-brush-set", name: "Bottle Brush Set", price: 750, category: "Cleaning", image: bottleBrushSet,
    description: "Complete brush set for thorough bottle and accessory cleaning. Includes nipple brush.",
    highlights: ["Complete set", "Firm bristles", "Nipple brush"] },
  { slug: "munchkin-bottle-brush", name: "Munchkin Bottle Brush", price: 600, category: "Cleaning", image: munchkinBrush,
    description: "Brand-specific full-size bottle brush with firm bristles and a soft rubber tip for thorough cleaning.",
    highlights: ["Munchkin brand", "Firm bristles", "Soft rubber tip"] },
  { slug: "travel-bottle-brush", name: "Travel Bottle Brush", price: 500, category: "Cleaning", image: travelBrush,
    description: "Compact, foldable bottle brush ideal for travel. Includes built-in nipple cleaning attachment.",
    highlights: ["Foldable", "Travel-ready", "Built-in nipple brush"] },
  { slug: "4-pack-food-containers", name: "4-Pack Food Containers (120ml)", price: 1200, category: "Storage", image: containers4,
    description: "Leak-proof 120ml food containers with measurement markings and silicone bottoms for easy removal.",
    highlights: ["Leak-proof", "Measurement marks", "120ml × 4"] },
  { slug: "6-pack-food-containers", name: "6-Pack Food Containers (60ml)", price: 1500, category: "Storage", image: containers6,
    description: "Portion-sized 60ml containers for early weaning meals. Comes with an organizing tray, multicolored.",
    highlights: ["60ml × 6", "Organizer tray", "Multicolored"] },
  { slug: "oral-care-kit", name: "Baby Oral Care Kit", price: 500, category: "Cleaning", image: oralCareKit,
    description: "Includes a gum cleaner, toothbrush, and tongue scraper. Designed for early oral hygiene and safe for infants.",
    highlights: ["Gum cleaner", "Toothbrush", "Tongue scraper"] },
  { slug: "munchkin-straw-cup-3pk", name: "Munchkin Straw Cup Set (3 pack)", price: 500, category: "Cups & Bowls", image: munchkinStraw,
    description: "Spill-proof straw cups designed for training toddlers. Made from BPA-free materials and easy to clean.",
    highlights: ["Spill-proof", "BPA-free", "3 pack"] },
  { slug: "munchkin-tumbler-5pk", name: "Munchkin Tumbler Set (5 pack)", price: 500, category: "Cups & Bowls", image: munchkinTumbler,
    description: "Durable, colorful, lightweight tumblers suitable for toddlers. Stackable and dishwasher safe.",
    highlights: ["5 colors", "Stackable", "Dishwasher safe"] },
  { slug: "munchkin-multiplates-5pk", name: "Munchkin Multi-Plates (5 pack)", price: 500, category: "Cups & Bowls", image: munchkinMultiplates,
    description: "5 colorful stackable matching plates. Well-sized for toddler meals and high chair trays.",
    highlights: ["5 plates", "Stackable", "Toddler-sized"] },
  { slug: "suction-bowl", name: "Suction Bowl", price: 500, category: "Cups & Bowls", image: suctionBowl,
    description: "Lightweight plastic suction bowl that adheres securely to surfaces to prevent spills. BPA free.",
    highlights: ["Strong suction", "BPA-free", "Lightweight"] },
  { slug: "smock-bib", name: "Smock Long-Sleeve Bib", price: 750, category: "Bibs", image: smockBib,
    description: "Full-coverage long-sleeve smock bib for messy meals and art. Easy to wipe and machine washable.",
    highlights: ["Full coverage", "Long sleeves", "Wipe clean"] },
  { slug: "gyro-bowl", name: "Gyro-Magic Anti-Spill Bowl", price: 700, category: "Cups & Bowls", image: gyroBowl,
    description: "Anti-spill rotating bowl designed to stay upright even when tilted. Ideal for snacks and toddlers on the move.",
    highlights: ["360° rotation", "Anti-spill", "Toddler favorite"] },
  { slug: "wheat-straw-bowl-set", name: "Wheat Straw Bowl Set", price: 800, category: "Cups & Bowls", image: wheatStrawBowl,
    description: "Eco-friendly, lightweight bowls made from wheat straw material. Durable and biodegradable.",
    highlights: ["Eco-friendly", "Biodegradable", "Lightweight"] },
  { slug: "pacifier-clip", name: "Customized Pacifier Clip", price: 750, category: "Teethers & Soothers", image: pacifierClip,
    description: "Personalised silicone pacifier clip to keep soothers within reach and off the floor.",
    highlights: ["Personalised", "Silicone beads", "Secure clip"] },
  { slug: "bracelet-teether", name: "Bracelet Teether", price: 600, category: "Teethers & Soothers", image: braceletTeether,
    description: "Wearable silicone teether in colorful bracelet form for easy baby grip and teething relief.",
    highlights: ["Wearable", "Easy grip", "Sensory textures"] },
  { slug: "lion-bracelet-teether", name: "Lion Bracelet Teether", price: 800, category: "Teethers & Soothers", image: lionBracelet,
    description: "Lion-themed silicone teether worn as a bracelet. Offers sensory textures and easy handling.",
    highlights: ["Lion design", "Sensory play", "Easy grip"] },
  { slug: "silicone-pacifier", name: "Silicone Pacifier", price: 500, category: "Teethers & Soothers", image: siliconePacifier,
    description: "Soft, flexible pacifier made from BPA-free 100% food-grade silicone. Designed to soothe babies safely.",
    highlights: ["100% silicone", "BPA-free", "Soft & soothing"] },
  { slug: "pacifier-holder", name: "Silicone Pacifier Holder", price: 700, category: "Teethers & Soothers", image: pacifierHolder,
    description: "Compact case for storing pacifiers in a hygienic and portable way. Made from durable food-grade silicone.",
    highlights: ["Hygienic case", "Portable", "Food-grade"] },
  { slug: "teether-ring", name: "Silicone Teether Ring", price: 800, category: "Teethers & Soothers", image: teetherRing,
    description: "Circular teether designed to soothe sore gums. Flexible, chew-safe, and great for sensory stimulation.",
    highlights: ["Soothes gums", "Sensory ring", "Chew-safe"] },
  { slug: "finger-teether", name: "Finger Teether", price: 650, category: "Teethers & Soothers", image: fingerTeether,
    description: "Teether shaped for natural finger-chewing motion. Provides targeted gum relief and safe exploration.",
    highlights: ["Natural shape", "Targeted relief", "Safe"] },
  { slug: "squirrel-teether", name: "Squirrel Teether", price: 500, category: "Teethers & Soothers", image: squirrelTeether,
    description: "Colorful silicone teether designed to stimulate sensory development and soothe gums.",
    highlights: ["Squirrel design", "Soothes gums", "Sensory play"] },
  { slug: "rainbow-teether", name: "Rainbow Teether", price: 650, category: "Teethers & Soothers", image: rainbowTeether,
    description: "Colorful silicone rainbow teether designed to stimulate sensory development and soothe gums.",
    highlights: ["Rainbow colors", "Sensory dev.", "Soothes gums"] },
  { slug: "fox-teether", name: "Fox Teether", price: 790, category: "Teethers & Soothers", image: foxTeether,
    description: "Fox-shaped teether made from soft silicone and bamboo for multiple textures and effective teething relief.",
    highlights: ["Silicone + bamboo", "Multi-texture", "Fox design"] },
];

export const categories: Category[] = [
  "Feeding",
  "Cups & Bowls",
  "Bibs",
  "Storage",
  "Cleaning",
  "Teethers & Soothers",
];

export function formatKsh(price: number): string {
  return `Ksh ${price.toLocaleString("en-KE")}`;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
