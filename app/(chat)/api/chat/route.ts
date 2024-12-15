import { convertToCoreMessages, Message, streamText } from "ai";
import { z } from "zod";

import { geminiProModel } from "@/ai";
import {
  generateSustainableProductOptions,
  generateSustainableProductDetails,
  generateSustainableProductPrice,
} from "@/ai/actions";
import { auth } from "@/app/(auth)/auth";
import {
  
  deleteChatById,
  getChatById,
  
  saveChat,
} from "@/db/queries";
import { generateUUID } from "@/lib/utils";

export async function POST(request: Request) {
  const { id, messages }: { id: string; messages: Array<Message> } =
    await request.json();

  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const coreMessages = convertToCoreMessages(messages).filter(
    (message) => message.content.length > 0,
  );

  // Modify the user prompt here for sustainable alternatives
  const userMessage = coreMessages[coreMessages.length - 1].content;
  const modifiedPrompt = `What are some sustainable alternatives to ${userMessage}?`;

  // Include the modified prompt in the system's message
  const result = await streamText({
    model: geminiProModel,
    system: `\n
        - You help users find sustainable alternatives to products.
        - Keep your responses limited to a sentence.
        - DO NOT output lists.
        - Today's date is ${new Date().toLocaleDateString()}.
        - Ask follow-up questions to nudge the user into the optimal flow.
        - Ask for any details you don't know, like product specifications, etc.
        - Here is the modified prompt: ${modifiedPrompt}
      `,
    messages: [
      ...coreMessages,
      { role: 'user', content: modifiedPrompt }, // Send the modified prompt as a user message
    ],
    tools: {
      // Your tools here (no changes needed for this part)
    },
    onFinish: async ({ responseMessages }) => {
      if (session.user && session.user.id) {
        try {
          await saveChat({
            id,
            messages: [...coreMessages, ...responseMessages],
            userId: session.user.id,
          });
        } catch (error) {
          console.error("Failed to save chat");
        }
      }
    },
    experimental_telemetry: {
      isEnabled: true,
      functionId: "stream-text",
    },
  });

  return result.toDataStreamResponse({});
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return new Response("Not Found", { status: 404 });
  }

  const session = await auth();

  if (!session || !session.user) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const chat = await getChatById({ id });

    if (chat.userId !== session.user.id) {
      return new Response("Unauthorized", { status: 401 });
    }

    await deleteChatById({ id });

    return new Response("Chat deleted", { status: 200 });
  } catch (error) {
    return new Response("An error occurred while processing your request", {
      status: 500,
    });
  }
}
