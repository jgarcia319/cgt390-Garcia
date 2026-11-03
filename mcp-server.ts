import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { searchProductsTool } from "./lib/mcp/search-products";

const server = new McpServer({
  name: "nova-street-catalog",
  version: "1.0.0"
});

server.registerTool(
  searchProductsTool.name,
  {
    description: searchProductsTool.description,
    inputSchema: {
      query: z.string().min(1).optional(),
      line: z
        .enum(["After Hours Drop", "Voltage Pack", "Transit Uniform", "Velocity Series"])
        .optional(),
      category: z
        .enum(["Tees", "Hoodies", "Bottoms", "Leggings", "Outerwear", "Accessories"])
        .optional(),
      audience: z.enum(["Men", "Women", "Unisex"]).optional(),
      maxPrice: z.number().min(0).optional(),
      sort: z.enum(["recommended", "price-asc", "price-desc"]).optional()
    }
  },
  async (input) => {
    const result = await searchProductsTool.handler(input);

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(result)
        }
      ]
    };
  }
);

const transport = new StdioServerTransport();

async function main() {
  await server.connect(transport);
}

void main();
