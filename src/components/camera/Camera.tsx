import { usePermission } from "@/hooks/usePermissions";
import { Camera, X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function CameraPage() {
  return (
    <div className="flex flex-col gap-6 max-w-[600px]">
      <div className="font-semibold text-xl">Camera</div>
      <CameraPermission />
      <CameraFeature />
    </div>
  );
}

const CameraPermission = () => {
  const permission = usePermission("camera");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Permesso di webcam</CardTitle>
        <CardDescription>Gestisci il permesso di utilizzo della webcam</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-2">
          <div>Stato del permesso:</div>
          {permission.isLoading && <div>Caricamento...</div>}
          {permission.state === "granted" && <pre className="font-medium text-green-500">Garantito</pre>}
          {permission.state === "prompt" && <pre className="font-medium text-yellow-500">Richiesta in corso</pre>}
          {permission.state === "denied" && <pre className="font-medium text-destructive">Rifiutato</pre>}
        </div>
      </CardContent>
    </Card>
  );
};

const CameraFeature = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setMediaStream(stream);
    } catch (error) {
      console.error("Error accessing webcam", error);
    }
  };

  const stopWebcam = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => {
        track.stop();
      });
      setMediaStream(null);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context && video.videoWidth && video.videoHeight) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageDataUrl = canvas.toDataURL("image/jpeg");

        setCapturedImage(imageDataUrl);

        stopWebcam();
      }
    }
  };

  const resetState = () => {
    stopWebcam();
    setCapturedImage(null);
  };

  return (
    <div className="flex flex-col gap-6">
      {capturedImage ? (
        <>
          <img src={capturedImage} alt="Immagine scattata" className="rounded-lg" />
          <Button onClick={resetState}>
            <X />
            Riprova
          </Button>
        </>
      ) : (
        <>
          {!videoRef.current && <Button onClick={startWebcam}>Apri webcam</Button>}
          <video ref={videoRef} autoPlay muted className="rounded-lg" />
          <canvas ref={canvasRef} className="hidden" />
          {videoRef.current && (
            <Button onClick={captureImage}>
              <Camera />
              Scatta
            </Button>
          )}
        </>
      )}
    </div>
  );
};
