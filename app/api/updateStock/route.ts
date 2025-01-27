import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

export async function POST(request: Request) {
  try {
    // Parse the request body
    const { productId, quantity } = await request.json();

    // Validate the input
    if (!productId || quantity === undefined) {
      console.log("Invalid request payload:", { productId, quantity });
      return NextResponse.json(
        { message: "Product ID and quantity are required" },
        { status: 400 }
      );
    }

    // Fetch the current product stock level from Sanity
    const product = await client.fetch(
      `*[_type == "product" && _id == $id][0]{_id, stockLevel}`,
      { id: productId }
    );

    // If product doesn't exist, return a 404 error
    if (!product) {
      console.log("Product not found:", { productId });
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    // Debug log for fetched product
    console.log("Fetched product:", product);

    // Calculate updated stock level
    const updatedStockLevel = product.stockLevel - quantity;

    // Ensure stock doesn't go below 0
    if (updatedStockLevel < 0) {
      console.log("Stock level too low:", {
        stockLevel: product.stockLevel,
        quantity,
        updatedStockLevel,
      });
      return NextResponse.json(
        { message: "Not enough stock" },
        { status: 400 }
      );
    }

    // Update the stock level in Sanity
    await client
      .patch(product._id)
      .set({ stockLevel: updatedStockLevel })
      .commit();

    console.log("Stock updated successfully:", {
      productId: product._id,
      updatedStockLevel,
    });

    // Return a success response
    return NextResponse.json({
      message: "Stock updated successfully",
      updatedStockLevel,
    });
  } catch (error: unknown) {
    // Adding type assertion here
    if (error instanceof Error) {
      // Check if it's an instance of Error
      console.error("Error updating stock:", error.message);
      console.error("Error stack trace:", error.stack);

      // Return an error response
      return NextResponse.json(
        { message: "Internal server error", error: error.message },
        { status: 500 }
      );
    }
    // Handle cases where the error is not an instance of Error
    console.error("Unknown error:", error);
    return NextResponse.json(
      { message: "Internal server error", error: "Unknown error" },
      { status: 500 }
    );
  }
}
