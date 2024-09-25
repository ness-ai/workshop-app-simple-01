const Replicate = require("replicate");

exports.handler = async function(event, context) {
  console.log("Function invoked with body:", event.body);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt, model, num_outputs } = JSON.parse(event.body);
    console.log("Parsed input:", { prompt, model, num_outputs });

    const apiKey = process.env.REPLICATE_API_TOKEN;
    if (!apiKey) {
      throw new Error("REPLICATE_API_TOKEN is not set");
    }

    const replicate = new Replicate({ auth: apiKey });
    console.log("Replicate instance created");

    console.log("Calling Replicate API with:", model.modelId);
    const output = await replicate.run(
      model.modelId,
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: `${prompt} ${model.modelTrigger}`,
          refine: "no_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.8,
          num_outputs: num_outputs || 1,
          guidance_scale: 7.5,
          apply_watermark: true,
          high_noise_frac: 0.8,
          negative_prompt: "",
          prompt_strength: 0.8,
          num_inference_steps: 30
        }
      }
    );

    console.log("Replicate API response:", JSON.stringify(output, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify(output)
    };
  } catch (error) {
    console.error("Detailed error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Failed to process the request",
        details: error.message,
        stack: error.stack
      })
    };
  }
};