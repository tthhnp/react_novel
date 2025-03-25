import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Search, Upload, X } from 'lucide-react';

export function UploadProjectPage() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState<'upload' | 'share'>('upload');
  const [uploadType, setUploadType] = useState<'file' | 'text'>('file');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-500" />
            <span className="font-semibold text-lg">VOICE</span>
          </div>
        </div>
        <button className="text-gray-500 hover:text-gray-700">
          <Search size={20} />
        </button>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <h1 className="text-xl font-semibold mb-6">ผู้ช่วยแนะนำในการสร้างผลงานเสียง!</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedTab('upload')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedTab === 'upload'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            การสร้างไฟล์เสียง
          </button>
          <button
            onClick={() => setSelectedTab('share')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
              selectedTab === 'share'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            การเผยแพร่เนื้อหา
          </button>
          <button
            className="px-4 py-2 rounded-full text-sm whitespace-nowrap bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            การจัดการ
          </button>
        </div>

        {/* Upload Options */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setUploadType('file')}
            className={`flex items-center gap-2 p-4 rounded-lg border ${
              uploadType === 'file'
                ? 'border-black bg-black/5'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Upload size={20} />
            <span className="text-sm font-medium">อัปโหลดไฟล์</span>
          </button>
          <button
            onClick={() => setUploadType('text')}
            className={`flex items-center gap-2 p-4 rounded-lg border ${
              uploadType === 'text'
                ? 'border-black bg-black/5'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <Bot size={20} />
            <span className="text-sm font-medium">กรอกข้อมูล</span>
          </button>
        </div>

        {/* Upload Area */}
        <div className="border border-dashed border-gray-300 rounded-lg p-6 text-center">
          <h2 className="text-lg font-medium mb-2">นำเข้าไฟล์จาก Botnoivoice</h2>
          <p className="text-sm text-gray-500 mb-6">
            *การนำเข้าไฟล์เสียง สร้างผลงานที่มีเนื้อหาเสียง การแบ่งfix ให้ง่ายต่อการแบ่งเป็นตอนๆได้
          </p>
          
          <div className="max-w-sm mx-auto border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm">วางไฟล์ของคุณที่นี่</span>
              <Upload size={16} className="text-gray-400" />
            </div>
            <div className="text-xs text-gray-500">
              จำกัด: 50MB Type: Botnoivoice
            </div>
          </div>

          <button className="w-full sm:w-auto bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-black/90 transition-colors mb-4">
            อัปโหลด
          </button>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 transition-colors"
          >
            ยกเลิก
          </button>
          <button className="px-6 py-2 bg-gray-100 text-gray-400 rounded-lg text-sm cursor-not-allowed">
            ถัดไป
          </button>
        </div>
      </div>
    </div>
  );
}