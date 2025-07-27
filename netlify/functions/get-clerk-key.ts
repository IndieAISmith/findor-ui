import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ key: process.env.VITE_CLERK_PUBLISHABLE_KEY }),
  };
};

export { handler };
