import React, { useEffect, useRef } from "react";

const HOST = "https://labs.heygen.com";
const FALLBACK_URL =
  HOST +
  "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJKdWR5X0RvY3Rvcl9TdGFuZGluZzJfcHVi%0D%0AbGljIiwicHJldmlld0ltZyI6Imh0dHBzOi8vZmlsZXMyLmhleWdlbi5haS9hdmF0YXIvdjMvMTNi%0D%0AYzBlZDM5NjI3NDkzZGE4NDA0YTRiZWIzNzNmM2FfNDU2NTAvcHJldmlld190YWxrXzMud2VicCIs%0D%0AIm5lZWRSZW1vdmVCYWNrZ3JvdW5kIjpmYWxzZSwia25vd2xlZGdlQmFzZUlkIjoiODFkNzY3NjE3%0D%0AMDMxNDlhNmI3OTdjYjdiM2Y0ZjI2YjAiLCJ1c2VybmFtZSI6ImU1N2IyMTUxMDI5YzRjNzM5NWE0%0D%0ANTQzNjM0Mjk4OWFlIn0%3D&inIFrame=1";

const getEmbedStyles = (clientWidth: number) => `
  #heygen-streaming-embed {
    z-index: 1;
    width: 100%;
    height: 100%;
    border: 0;
    transition: all linear 0.1s;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
  }
  #heygen-streaming-embed.show {
    opacity: 1;
    visibility: visible;
    height: 60vh; //manually added
  }
  #heygen-streaming-embed.expand {
    ${
      clientWidth < 540
        ? "height: 266px; width: 96%; left: 50%; transform: translateX(-50%);"
        : "height: 366px; width: calc(366px * 16 / 9);"
    }
    border: 0;
    border-radius: 15px;
  }
  #heygen-streaming-container {
    width: 100%;
    height: 100%;
  }
  #heygen-streaming-container iframe {
    width: 100%;
    height: 100%;
    border: 0;
    object-fit: contain;
    background: #fff;
  }
`;

interface HeygenStreamingEmbedProps {
  shareURL?: string;
}

export default function HeygenStreamingEmbed({ shareURL }: HeygenStreamingEmbedProps) {
  const wrapDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clientWidth = document.body.clientWidth;
    const wrapDiv = wrapDivRef.current;
    if (!wrapDiv) return;

    // Inject stylesheet
    // Remove any previous style tags injected by this component
    Array.from(wrapDiv.querySelectorAll("style")).forEach(tag => wrapDiv.removeChild(tag));
    const styleTag = document.createElement("style");
    styleTag.innerHTML = getEmbedStyles(clientWidth);
    wrapDiv.appendChild(styleTag);

    // Remove any previous embed containers injected by this component
    Array.from(wrapDiv.querySelectorAll("#heygen-streaming-container")).forEach(tag => wrapDiv.removeChild(tag));
    // Create container and iframe
    const container = document.createElement("div");
    container.id = "heygen-streaming-container";
    const iframe = document.createElement("iframe");
    iframe.allowFullscreen = false;
    iframe.title = "Streaming Embed";
    iframe.role = "dialog";
    iframe.allow = "microphone";
    let finalURL = FALLBACK_URL;
    if (shareURL && shareURL.trim()) {
      finalURL = shareURL.startsWith("http") ? shareURL : HOST + shareURL;
    }
    iframe.src = finalURL;
    container.appendChild(iframe);
    wrapDiv.appendChild(container);

    let visible = false;
    let initial = false;

    function handleMessage(e: MessageEvent) {
      if (
        e.origin === HOST &&
        e.data &&
        e.data.type === "streaming-embed"
      ) {
        if (e.data.action === "init") {
          initial = true;
          if (wrapDiv) {
            wrapDiv.classList.toggle("show", initial);
          }
        } else if (e.data.action === "show") {
          visible = true;
          if (wrapDiv) {
            wrapDiv.classList.toggle("expand", visible);
          }
        } else if (e.data.action === "hide") {
          visible = false;
          if (wrapDiv) {
            wrapDiv.classList.toggle("expand", visible);
          }
        }
      }
    }

    window.addEventListener("message", handleMessage);

    // Cleanup
    return () => {
      window.removeEventListener("message", handleMessage);
      // Remove all children and style tags on unmount
      if (wrapDiv) {
        while (wrapDiv.firstChild) {
          wrapDiv.removeChild(wrapDiv.firstChild);
        }
      }
    };
  }, [shareURL]);

  return <div id="heygen-streaming-embed" ref={wrapDivRef} />;
}
