import { useCallback, useEffect, useRef } from "react";
import { TrackSource } from "@mux/spaces-web";

const Participant = ({ participant }) => {
  const mediaEl = useRef(null);

  const attachTrack = useCallback((track) => {
    track.attach(mediaEl.current);
  }, []);

  useEffect(() => {
    if (!mediaEl.current) return;

    const microphoneTrack = participant
      .getAudioTracks()
      .find((audioTrack) => audioTrack.source === TrackSource.Microphone);

    const cameraTrack = participant
      .getVideoTracks()
      .find((videoTrack) => videoTrack.source === TrackSource.Camera);

    attachTrack(microphoneTrack);
    attachTrack(cameraTrack);
  }, [participant, attachTrack]);

  return (
    <div>
      <h2>{participant.connectionId}</h2>
      <video
        ref={mediaEl}
        autoPlay
        playsInline
        muted
        style={{ width: `400px` }}
      />
    </div>
  );
};

export default Participant;