"use client"

import { useRef } from "react"

const LIVE_AVATAR_EMBED_URL = "https://embed.liveavatar.com/v1/80dfe0d3-2db0-4546-92e7-ce878b5e7785"

interface HeygenAvatarProps {
  avatarShareURL?: string
  onTranscript?: (entry: { speaker: "ai"; text: string }) => void
}

export default function HeygenAvatar({ avatarShareURL, onTranscript }: HeygenAvatarProps) {
  const onTranscriptRef = useRef(onTranscript)
  onTranscriptRef.current = onTranscript

  // Use provided URL or default to the Live Avatar embed
  const embedURL = avatarShareURL?.trim() || LIVE_AVATAR_EMBED_URL

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        background: "#000",
      }}
    >
      <iframe
        src={embedURL}
        allow="microphone; camera; autoplay"
        title="Live Avatar"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  )
}
