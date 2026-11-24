import "dotenv/config";
 
import { mastra } from "./mastra";
 
const threadId = "123";
const resourceId = "user-456";
 
const agent = mastra.getAgent("mongodbAgent");
 
const message = await agent.stream("My name is Mastra", {
  memory: {
    thread: threadId,
    resource: resourceId
  }
});
 
await message.textStream.pipeTo(new WritableStream());
 
const stream = await agent.stream("What's my name?", {
  memory: {
    thread: threadId,
    resource: resourceId,
    options: {
      lastMessages: 5
    }
  }
});
 
for await (const chunk of stream.textStream) {
  process.stdout.write(chunk);
}