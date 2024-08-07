interface Window {
  startRecording: () => void
  stopRecording: () => void
  isRecording: () => boolean
  startCapture: () => Promise<MediaStream>
  stopCapture: () => Promise<void>
  setFPS: (fps: number) => void
  setBitrate: (bitrate: number) => void
  setVideoCodec: (codec: string) => void
  videoTypes: Record<string, string>
  setGifOption: (option: string, value: string | number) => void
  setGif(b: boolean): void
  setWebmOption: (option: string, value: string | number) => void
  setWebm(b: boolean): void
  GifRecorder: GifRecorder
  api: {
    getSources: () => Promise<DesktopCapturerSource[]>
    setSource: (id: string) => void
    getSavePath: (type: string) => Promise<string>
    writeFile: (path: string, data: ArrayBuffer) => Promise<void>
  }
}

type CaptureTarget = {
  name: string
  id: string
  thumbnail: string
}

interface GifRecorder {
  new (stream: MediaStream, options: unknown): MediaRecorder
}
