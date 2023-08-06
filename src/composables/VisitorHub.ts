import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from "@microsoft/signalr";
import { MessagePackHubProtocol } from "@microsoft/signalr-protocol-msgpack";
import Mouse from "../assets/img/mouse.png";
import { ref } from "vue";

export type SenderType = "system" | "chat" | "admin";

export interface TerminalMessage {
  sender: string;
  message: string;
  isAdmin: boolean;
  type: SenderType;
  level: LogLevel;
}

let hub: HubConnection | undefined = undefined;
const mouseMap: Map<string, HTMLImageElement> = new Map();

export async function initHub() {
  if (hub) return;
  hub = new HubConnectionBuilder()
    .configureLogging(LogLevel.Information)
    .withUrl("http://localhost:5000/visitor")
    .withHubProtocol(new MessagePackHubProtocol())
    .withAutomaticReconnect()
    .build();

  hub.on("SpawnMouse", (id: string, image: string) => {
    // Create a new mouse img div.
    const mouse = document.createElement("img");
    mouse.id = "mouse-" + id;
    mouse.src = Mouse;
    mouse.style.position = "absolute";
    mouse.style.left = "0px";
    mouse.style.top = "0px";
    mouse.style.width = "13px";
    mouse.draggable = false;
    mouse.style.transition = "transform 0.1s ease";
    // Add mouse to the document.
    document.body.appendChild(mouse);
    mouseMap.set(id, mouse);
  });

  hub.on("ChangeMouseImage", (id: string, image: string) => {});

  hub.on("MoveMouse", (id: string, x: number, y: number) => {
    const mouse = mouseMap.get(id);
    if (mouse) {
      // If x or y are outtside of the window, hide the mouse.
      if (x < 0 || x > window.innerWidth) {
        mouse.style.display = "none";
        return;
      }
      mouse.style.display = "block";
      mouse.style.transform = `translate(${x}px, ${y}px)`;
      return;
    }
  });

  hub.on("DestroyMouse", (id: string) => {
    const mouse = mouseMap.get(id);
    if (!mouse) return;
    mouse.remove();
    mouseMap.delete(id);
  });

  hub.on("ReceiveSystemMessage", (message: string, level: LogLevel) => {
    messages.value.push({
      sender: "System",
      message: message,
      isAdmin: false,
      type: "system",
      level: level,
    });
  });

  hub.on(
    "ReceiveChatMessage",
    (sender: string, message: string, isAdmin: boolean) => {
      messages.value.push({
        sender: sender,
        message: message,
        isAdmin: isAdmin,
        type: "chat",
        level: LogLevel.Information,
      });
    }
  );

  hub.on("ChangeVideo", (video: number, startTime: Date) => {
    currentVideo.value = video;
    currentVideoStartTime.value = startTime;
  });

  await hub.start();

  // Send mouse position to server.
  let lastDate = new Date().getTime();
  document.addEventListener("mousemove", (e) => {
    // Only run if lastDate is older than 20ms.
    if (new Date().getTime() - lastDate < 20) return;
    lastDate = new Date().getTime();
    hub?.invoke("MoveMouse", e.pageX, e.pageY);
  });
}

export async function sendTerminalMessage(message: string) {
  console.log(message);
  // await hub?.invoke("ReceiveTerminalInput", message);
}

// Export reactive variables.
export const messages = ref<TerminalMessage[]>([]);
export const currentVideo = ref<number>(-1);
export const currentVideoStartTime = ref<Date>(new Date());
