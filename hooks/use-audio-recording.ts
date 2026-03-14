import { Audio } from "expo-av";
import { useCallback, useEffect, useRef, useState } from "react";

const AUDIO_MODE = {
  allowsRecordingIOS: true,
  playsInSilentModeIOS: true,
  staysActiveInBackground: false,
  shouldDuckAndroid: true,
  playThroughEarpieceAndroid: false,
} as const;

async function prepareAudio() {
  const { granted } = await Audio.requestPermissionsAsync();
  if (!granted) return false;
  await Audio.setAudioModeAsync(AUDIO_MODE);
  return true;
}

export function useAudioRecording() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const recordingRef = useRef<Audio.Recording | null>(null);

  useEffect(() => {
    prepareAudio();
  }, []);

  const startRecording = useCallback(async () => {
    if (!(await prepareAudio())) return;
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      recordingRef.current = recording;
      await recording.startAsync();
      setIsRecording(true);
    } catch (e) {
      console.warn("Start recording error", e);
    }
  }, []);

  const stopRecording = useCallback(async () => {
    try {
      const recording = recordingRef.current;
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        if (uri) setRecordedUri(uri);
        recordingRef.current = null;
      }
    } catch (e) {
      console.warn("Stop recording error", e);
    }
    setIsRecording(false);
  }, []);

  const toggleRecording = useCallback(async () => {
    if (isRecording) await stopRecording();
    else await startRecording();
  }, [isRecording, startRecording, stopRecording]);

  const playRecording = useCallback(async () => {
    if (!recordedUri) return;
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: recordedUri });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (e) {
      console.warn("Play recording error", e);
    }
  }, [recordedUri]);

  const playAudioUrl = useCallback(async (audioUrl: string) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) sound.unloadAsync();
      });
    } catch (e) {
      console.warn("Play audio url error", e);
    }
  }, []);

  const clearRecording = useCallback(() => {
    setRecordedUri(null);
  }, []);

  return {
    isRecording,
    recordedUri,
    startRecording,
    stopRecording,
    toggleRecording,
    playRecording,
    playAudioUrl,
    clearRecording,
  };
}
