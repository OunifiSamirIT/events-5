import React, { useState, useRef } from 'react';
import { useEffect } from 'react';
import Dropzone from 'react-dropzone';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
function MusicMixer() {
    const [files, setFiles] = useState([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioPlayerRef = useRef(null);
    const audioContextRef = useRef(null);
    const sourceNodes = useRef([]);
  
    const handleFileUpload = (event) => {
      const selectedFiles = event.target.files;
      const filesArray = [];
      for (let i = 0; i < selectedFiles.length; i++) {
        filesArray.push(selectedFiles[i]);
      }
      setFiles(filesArray);
      setIsPlaying(false);
    };
  
    const handlePlayPause = () => {
      if (isPlaying) {
        audioPlayerRef.current.pause();
        sourceNodes.current.forEach((sourceNode) => sourceNode.stop());
      } else {
        audioContextRef.current = new AudioContext();
        const destination = audioContextRef.current.destination;
  
        const audioBuffers = [];
        const audioSources = [];
        for (let i = 0; i < files.length; i++) {
          const fileReader = new FileReader();
          fileReader.readAsArrayBuffer(files[i]);
          fileReader.onload = () => {
            audioContextRef.current.decodeAudioData(fileReader.result, (audioBuffer) => {
              audioBuffers.push(audioBuffer);
              if (audioBuffers.length === files.length) {
                const maxLength = Math.max(...audioBuffers.map((audioBuffer) => audioBuffer.length));
                const mixedBuffer = audioContextRef.current.createBuffer(audioBuffers[0].numberOfChannels, maxLength, audioBuffers[0].sampleRate);
                for (let i = 0; i < audioBuffers.length; i++) {
                  const audioBuffer = audioBuffers[i];
                  const sourceNode = audioContextRef.current.createBufferSource();
                  sourceNode.buffer = audioBuffer;
                  sourceNode.connect(destination);
                  audioSources.push(sourceNode);
                  sourceNodes.current.push(sourceNode);
                  const channelCount = audioBuffer.numberOfChannels;
                  for (let j = 0; j < channelCount; j++) {
                    const sourceChannelData = audioBuffer.getChannelData(j);
                    const mixedChannelData = mixedBuffer.getChannelData(j);
                    for (let k = 0; k < sourceChannelData.length; k++) {
                      mixedChannelData[k] += sourceChannelData[k];
                    }
                  }
                }
                const mixedSourceNode = audioContextRef.current.createBufferSource();
                mixedSourceNode.buffer = mixedBuffer;
                mixedSourceNode.connect(destination);
                audioSources.push(mixedSourceNode);
                sourceNodes.current.push(mixedSourceNode);
                mixedSourceNode.start();
              }
            });
          };
        }
      }
      setIsPlaying(!isPlaying);
    };
  
    return (
      <div className="audio-uploader">
        <input type="file" accept="audio/mp3" onChange={handleFileUpload} multiple />
        {files.length > 0 ? (
          <div className="file-info">
            {files.map((file, index) => (
              <div key={index}>
                <p>{file.name}</p>
                <AudioPlayer
                  src={URL.createObjectURL(file)}
                  ref={audioPlayerRef}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            ))}
            <button onClick={handlePlayPause}>
              {isPlaying ? 'Pause' : 'Play'}
            </button>
          </div>
        ) : (
          <p>Choose one or more MP3 files to upload</p>
        )}
      </div>
    );
}export default MusicMixer;
