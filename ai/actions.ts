import { generateObject } from "ai";
import { z } from "zod";

import { geminiFlashModel } from ".";

// Function to generate sustainable product options
export async function generateSustainableProductOptions({
  category,
}: {
  category: string; // e.g., "eco-friendly bags", "sustainable shoes"
}) {
  const { object: productOptions } = await generateObject({
    model: geminiFlashModel,
    prompt: `Generate a list of sustainable product options for the category: ${category}`,
    output: "array",
    schema: z.array(
      z.object({
        productId: z.string().describe("Unique identifier for the product"),
        name: z.string().describe("Name of the sustainable product"),
        description: z.string().describe("Description of the product"),
        material: z.string().describe("Material used in the product"),
        priceInUSD: z.number().describe("Price of the product in USD"),
        sustainabilityImpact: z.string().describe("Sustainability impact of the product"),
      })
    ),
  });

  return { products: productOptions };
}

// Function to generate sustainable product details
export async function generateSustainableProductDetails({
  productId,
}: {
  productId: string; // e.g., "eco-bag-001"
}): Promise<{
  productId: string;
  name: string;
  description: string;
  material: string;
  priceInUSD: number;
  sustainabilityImpact: string;
  ecoCertification: string;
  manufacturingProcess: string;
}> {
  const { object: productDetails } = await generateObject({
    model: geminiFlashModel,
    prompt: `Provide detailed information about the sustainable product with ID: ${productId}`,
    schema: z.object({
      productId: z.string().describe("Unique identifier for the product"),
      name: z.string().describe("Name of the sustainable product"),
      description: z.string().describe("Description of the product"),
      material: z.string().describe("Material used in the product"),
      priceInUSD: z.number().describe("Price of the product in USD"),
      sustainabilityImpact: z.string().describe("Sustainability impact of the product"),
      ecoCertification: z.string().describe("Eco-certifications the product holds"),
      manufacturingProcess: z.string().describe("Sustainable manufacturing process used"),
    }),
  });

  return productDetails;
}

// Function to calculate the price of a sustainable product based on selected features
export async function generateSustainableProductPrice({
  productId,
  selectedFeatures,
}: {
  productId: string; // e.g., "eco-bag-001"
  selectedFeatures: string[]; // e.g., ["recycled material", "biodegradable packaging"]
}) {
  const { object: priceDetails } = await generateObject({
    model: geminiFlashModel,
    prompt: `Calculate the price for the sustainable product with ID: ${productId} and the following selected features: ${selectedFeatures.join(", ")}`,
    schema: z.object({
      totalPriceInUSD: z
        .number()
        .describe("Total price of the sustainable product in USD"),
    }),
  });

  return priceDetails;
}
