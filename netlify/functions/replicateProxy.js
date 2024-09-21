const Replicate = require("replicate");

exports.handler = async function(event, context) {
  // POSTリクエストのみを許可
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 環境変数からAPIキーを取得
    const apiKey = process.env.REPLICATE_API_TOKEN;
    if (!apiKey) {
      throw new Error("REPLICATE_API_TOKEN is not set");
    }

    const replicate = new Replicate({
      auth: apiKey,
    });

    // リクエストボディをパース
    const { prompt, model } = JSON.parse(event.body);

    const output = await replicate.run(
      model.modelId,
      {
        input: {
          width: 1024,
          height: 1024,
          prompt: `${prompt} ${model.modelTrigger}`,
          refine: "no_refiner",
          scheduler: "K_EULER",
          lora_scale: 0.6,
          num_outputs: 1,
          guidance_scale: 7.5,
          apply_watermark: true,
          high_noise_frac: 0.8,
          negative_prompt: "",
          prompt_strength: 0.8,
          num_inference_steps: 50
        }
      }
    );

    // 成功レスポンス
    return {
      statusCode: 200,
      body: JSON.stringify(output)
    };
  } catch (error) {
    console.error("Error:", error);
    // エラーレスポンス
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to process the request" })
    };
  }
};