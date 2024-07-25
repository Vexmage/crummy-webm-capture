import './index.css'
import _hyperscript from 'hyperscript.org'
_hyperscript.browserInit()

const displayMediaOptions: DisplayMediaStreamOptions = {
  //audio: true,
  video: {
    frameRate: 144,
  },
}

let recorder: MediaRecorder
let captureStream: MediaStream

window.startCapture = async (which: string[]) => {
  try {
    captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions)

    captureStream.getTracks()[0].applyConstraints({
      frameRate: 144, // Just 4 testing.
    })

    const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement
    video.srcObject = captureStream
    video.onloadedmetadata = () => video.play()
  } catch (err) {
    console.error(`Error: ${err}`)
  }
  return captureStream
}

window.stopCapture = async () => {
  const video: HTMLVideoElement = document.getElementById('video') as HTMLVideoElement
  video.pause()
  video.srcObject = null

  window.stopRecording()
}

window.startRecording = () => {
  const chunks: BlobPart[] = []
  recorder = new MediaRecorder(captureStream, {
    videoKeyFrameIntervalCount: 144,
  })
  recorder.ondataavailable = (e) => {
    if (e.data.size > 0) {
      chunks.push(e.data)
    }
  }
  recorder.onstop = async () => {
    const path = await window.api.getSavePath()
    const blob = new Blob(chunks, { type: 'video/webm' })
    await window.api.writeFile(path, await blob.arrayBuffer())
  }

  recorder.start()
}

window.stopRecording = () => {
  if (recorder) {
    recorder.stop()
    recorder = null
  }
}

window.isCapturing = () => {
  console.log('oh nooo', recorder, recorder?.state)
  return recorder?.state === 'recording'
}