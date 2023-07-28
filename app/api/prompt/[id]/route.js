import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompts = await Prompt.findById(params.id).populate("creator");

    if (!prompts) {
      return new Response("prompt not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompts), {
      status: 200,
    });
  } catch (error) {
    return new Response("failed to fetch prompt", {
      status: 500,
    });
  }
};

// PATHCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const exstingPrompts = await Prompt.findById(params.id);

    if (!exstingPrompts) {
      return new Response("prompt not found", {
        status: 404,
      });
    }

    exstingPrompts.prompt = prompt;
    exstingPrompts.tag = tag;

    await exstingPrompts.save();

    return new Response("Successfully updated the Prompts", {
      status: 200,
    });
  } catch (error) {
    return new Response("Error Updating Prompt", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt Deleted sucessfully", { status: 200 });
  } catch (error) {
    return new Response("failed to fetch prompt", {
      status: 500,
    });
  }
};
