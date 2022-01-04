import "source-map-support/register";
import { Context, APIGatewayEvent, APIGatewayProxyResultV2 } from "aws-lambda";

export const serve = async (event: APIGatewayEvent, _context: Context): Promise<APIGatewayProxyResultV2> => {
  try {
    const render = (await import("./src/server/render")).default;
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/html",
      },
      body: await render(event),
    };
  } catch (error) {
    console.error(`SERVER ERROR: ${error}`);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "text/html",
      },
      body: `<html><body>${error.toString()}</body></html>`,
    };
  }
};
