const Replicate = require("replicate");

exports.handler = async function(event, context) {
  const { id } = event.queryStringParameters;
  if (!id) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing prediction ID" }) };
  }

  const apiKey = process.env.REPLICATE_API_TOKEN;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "REPLICATE_API_TOKEN is not set" }) };
  }

  const replicate = new Replicate({ auth: apiKey });

  try {
    const prediction = await replicate.predictions.get(id);
    return {
      statusCode: 200,
      body: JSON.stringify({
        status: prediction.status,
        output: prediction.output
      })
    };
  } catch (error) {
    console.error("Error checking prediction status:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to check prediction status" })
    };
  }
};