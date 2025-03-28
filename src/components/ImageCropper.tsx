import React, { useState, useRef } from 'react';
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { ArrowLeft, RotateCw, ZoomIn, Save } from 'lucide-react';

interface ImageCropperProps {
  image: File;
  onCancel: () => void;
  onSave: (croppedImage: Blob) => void;
}

export function ImageCropper({ image, onCancel, onSave }: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);

  const getCroppedImg = (image: HTMLImageElement, crop: PixelCrop, rotation = 0) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('No 2d context');
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const pixelRatio = window.devicePixelRatio;
    canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
    canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

    ctx.scale(pixelRatio, pixelRatio);
    ctx.imageSmoothingQuality = 'high';

    const cropX = crop.x * scaleX;
    const cropY = crop.y * scaleY;

    const rotRad = (rotation * Math.PI) / 180;
    const centerX = image.naturalWidth / 2;
    const centerY = image.naturalHeight / 2;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotRad);
    ctx.translate(-centerX, -centerY);

    ctx.drawImage(
      image,
      cropX,
      cropY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    ctx.restore();

    return new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          }
        },
        'image/jpeg',
        1
      );
    });
  };

  const handleSave = async () => {
    if (imageRef.current && crop) {
      const croppedImage = await getCroppedImg(
        imageRef.current,
        crop as PixelCrop,
        rotation
      );
      onSave(croppedImage);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg max-w-4xl w-full mx-4">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={20} />
            <span>ย้อนกลับ</span>
          </button>
          <div className="flex items-center gap-4">
            <button
              onClick={handleRotate}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <RotateCw size={20} />
            </button>
            <input
              type="range"
              min="0.1"
              max="2"
              step="0.1"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              className="w-24"
            />
            <ZoomIn size={20} className="text-gray-400" />
          </div>
        </div>

        <div className="p-4 flex justify-center bg-gray-50" style={{ minHeight: '400px' }}>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            aspect={3/4}
            className="max-h-[600px]"
          >
            <img
              ref={imageRef}
              src={URL.createObjectURL(image)}
              alt="Crop preview"
              style={{
                transform: `scale(${zoom}) rotate(${rotation}deg)`,
                maxHeight: '600px',
                width: 'auto'
              }}
            />
          </ReactCrop>
        </div>

        <div className="p-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={onCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-black/90 flex items-center gap-2"
          >
            <Save size={20} />
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
}