const Replicate = require("replicate");

exports.handler = async function(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { prompt, model, num_outputs } = JSON.parse(event.body);
    const apiKey = process.env.REPLICATE_API_TOKEN;

    if (!apiKey) {
      throw new Error("REPLICATE_API_TOKEN is not set");
    }

    const replicate = new Replicate({
      auth: apiKey,
    });

    const output = await replicate.run(
      model.modelId,
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: `${prompt} ,${model.modelTrigger}`,
          refine: "no_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.6,
          num_outputs: num_outputs || 1,
          guidance_scale: 7.5,
          apply_watermark: true,
          high_noise_frac: 0.8,
          negative_prompt: "",
          prompt_strength: 0.8,
          num_inference_steps: 50
        }
      }
    );

    console.log("Replicate API response:", output);

    return {
      statusCode: 200,
      body: JSON.stringify(output)
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process the request" })
    };
  }
};