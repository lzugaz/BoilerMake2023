import { useCallback, useEffect, useRef, useState } from "react";
import { Space, SpaceEvent, getUserMedia } from "@mux/spaces-web";

import Participant from "./Participant";

// 🚨 Don’t forget to add your own JWT here!
const JWT = "PUT_YOUR_JWT_HERE";

function App() {
  const spaceRef = useRef(null);
  const [localParticipant, setLocalParticipant] = useState(null);
  const joined = !!localParticipant;

  useEffect(() => {
    const space = new Space(JWT);
    spaceRef.current = space;
  }, []);

  const join = useCallback(async () => {
    // Join the Space
    let localParticipant = await spaceRef.current.join();

    // Get and publish our local tracks
    let localTracks = await getUserMedia({
      audio: true,
      video: true,
    });
    await localParticipant.publishTracks(localTracks);

    // Set the local participant so it will be rendered
    setLocalParticipant(localParticipant);
  }, []);

  return (
    <div className="App">
      <button onClick={join} disabled={joined}>
        Join Space
      </button>

      {localParticipant && (
        <Participant
          key={localParticipant.connectionId}
          participant={localParticipant}
        />
      )}
    </div>
  );
}

export default App;