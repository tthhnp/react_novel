import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Info, Trash2, Volume2, FileText, Image, Upload } from 'lucide-react';

export function ProjectFormPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    format: '', // 'single' or 'multiple'
    type: '', // 'novel', 'podcast', or 'story'
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDeleteFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleFormatSelect = (format: string) => {
    setFormData(prev => ({ ...prev, format }));
  };

  const handleTypeSelect = (type: string) => {
    setFormData(prev => ({ ...prev, type }));
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to project details page after form submission
    navigate('/project-details');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-900">ผู้ช่วยแนะนำในการสร้างผลงานเสียง!</h1>
          <div className="flex gap-2 mt-4">
            <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm">การสร้างไฟล์เสียง</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">การเผยแพร่เนื้อหา</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">การเพิ่มตอนใหม่</button>
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-sm">การลงผลงาน</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto py-8 px-4">
        {/* File Upload Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-medium">นำเข้าไฟล์จาก Botnoivoice</h2>
              <Info size={14} className="text-gray-400" />
            </div>
          </div>

          {selectedFile ? (
            <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg mb-4">
              <FileText size={16} className="text-gray-400" />
              <span className="text-sm text-gray-600">{selectedFile.name}</span>
              <button 
                onClick={handleDeleteFile}
                className="ml-auto hover:bg-gray-100 p-1 rounded-full transition-colors"
              >
                <Trash2 size={16} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>
          ) : (
            <div
              className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-gray-300 transition-colors"
              onDrop={handleFileDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept=".botnoivoice"
              />
              <Upload size={24} className="mx-auto mb-2 text-gray-400" />
              <p className="text-sm text-gray-600">ลากไฟล์มาวางที่นี่ หรือ คลิกเพื่อเลือกไฟล์</p>
              <p className="text-xs text-gray-400 mt-1">รองรับไฟล์ .botnoivoice เท่านั้น</p>
            </div>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="font-medium mb-4">รูปแบบผลงาน</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <button
              type="button"
              onClick={() => handleFormatSelect('single')}
              className={`p-4 rounded-lg border text-left transition-colors ${
                formData.format === 'single'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium mb-1">ตอนเดียว</div>
              <div className="text-sm text-gray-500">สำหรับผลงานที่มีตอนเดียวจบ</div>
            </button>
            <button
              type="button"
              onClick={() => handleFormatSelect('multiple')}
              className={`p-4 rounded-lg border text-left transition-colors ${
                formData.format === 'multiple'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <div className="font-medium mb-1">หลายตอน</div>
              <div className="text-sm text-gray-500">สำหรับผลงานที่มีหลายตอน</div>
            </button>
          </div>

          <h3 className="font-medium mb-4">ประเภทผลงาน</h3>
          
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => handleTypeSelect('novel')}
              className={`w-full p-4 rounded-lg border flex items-center gap-3 transition-colors ${
                formData.type === 'novel'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Volume2 size={20} className={formData.type === 'novel' ? 'text-blue-500' : 'text-gray-400'} />
              <div className="text-left">
                <div className="font-medium">นิยายเสียง</div>
                <div className="text-sm text-gray-500">เรื่องราวที่ถ่ายทอดผ่านเสียง</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleTypeSelect('podcast')}
              className={`w-full p-4 rounded-lg border flex items-center gap-3 transition-colors ${
                formData.type === 'podcast'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Bot size={20} className={formData.type === 'podcast' ? 'text-blue-500' : 'text-gray-400'} />
              <div className="text-left">
                <div className="font-medium">พอดแคสต์</div>
                <div className="text-sm text-gray-500">รายการพูดคุยหลากหลายหัวข้อ</div>
              </div>
            </button>

            <button
              type="button"
              onClick={() => handleTypeSelect('story')}
              className={`w-full p-4 rounded-lg border flex items-center gap-3 transition-colors ${
                formData.type === 'story'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Image size={20} className={formData.type === 'story' ? 'text-blue-500' : 'text-gray-400'} />
              <div className="text-left">
                <div className="font-medium">นิทานเสียง</div>
                <div className="text-sm text-gray-500">เรื่องราวที่ถ่ายทอดผ่านเสียง</div>
              </div>
            </button>
          </div>

          <div className="flex justify-between mt-8">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
            >
              ถัดไป
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}