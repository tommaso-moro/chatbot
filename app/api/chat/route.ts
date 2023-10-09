import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";

// Create a new Hugging Face Inference instance
const Hf = new HfInference(process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  // format messages as per docs: https://huggingface.co/mistralai/Mistral-7B-Instruct-v0.1)
  for (var i = 0; i < messages.length; i++) {
    if (messages[i].role === "user") {
      messages[i].content =
        (i === 0 ? "<s>" : "") + `[INST] ${messages[i].content} [/INST]`;
    } else if (messages[i].role === "assistant") {
      messages[i].content = `${messages[i].content}</s>`;
    }
  }

  // Initialize a text-generation stream using the Hugging Face Inference SDK
  const response = await Hf.textGenerationStream({
    model: "mistralai/Mistral-7B-Instruct-v0.1",
    inputs: experimental_buildOpenAssistantPrompt(messages),
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      // typical_p: 0.2,
      temperature: 0.8,
      repetition_penalty: 1,
      truncate: 1000,
      //@ts-ignore
      //stop: ["<"], // required for Mistral models
      return_full_text: false,
    },
  });

  // Convert the async generator into a friendly text-stream
  const stream = HuggingFaceStream(response);

  // Respond with the stream, enabling the client to consume the response
  return new StreamingTextResponse(stream);
}
