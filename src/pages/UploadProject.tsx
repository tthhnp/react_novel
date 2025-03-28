import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Search, Home, FileText, PenSquare, Settings, Plus, LogOut, Info, Copy, Download, ChevronDown, ChevronUp, ArrowRight, Menu, X, Check, Loader2 } from 'lucide-react';

export function UploadProjectPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('การสร้างไฟล์เสียง');
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const tutorialSteps = [
    {
      title: 'เข้าสู่ระบบ',
      description: 'เข้าสู่ระบบด้วยบัญชีของคุณ'
    },
    {
      title: 'เลือกโปรไฟล์',
      description: 'คลิกที่โปรไฟล์ของคุณ'
    },
    {
      title: 'เพิ่มงานเขียน',
      description: 'คลิกปุ่ม "เพิ่มงานเขียน" เพื่อเริ่มต้น'
    }
  ];

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const simulateUpload = () => {
    if (!selectedFile) return;

    setUploadStatus('uploading');
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus('success');
          setTimeout(() => {
            navigate('/project-form'); // Navigate to form page after success
          }, 1500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30
        transform transition-transform duration-200 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* User Profile */}
        <div className="p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=128&q=80"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Amily inthai</h3>
              <p className="text-xs text-gray-500">My Profile</p>
            </div>
          </div>

          <button 
            className="w-full bg-black text-white rounded-full py-2 text-sm font-medium hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
          >
            <Plus size={16} />
            โปรเจคใหม่
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-50">
            <Home size={18} />
            <span className="text-sm">หน้าหลัก</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-50">
            <FileText size={18} />
            <span className="text-sm">ส่งผลงานของฉัน</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-50">
            <PenSquare size={18} />
            <span className="text-sm">ผลงานของฉัน</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-50">
            <Settings size={18} />
            <span className="text-sm">ตั้งค่า</span>
          </a>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <LogOut size={16} />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3">
          <div className="flex items-center gap-4">
            <button 
              onClick={toggleSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-medium">ผู้ช่วยนำเข้าการสร้างผลงานของคุณ!</h1>
              <button className="text-sm text-gray-500 mt-1">ดูเพิ่มเติม</button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab('การสร้างไฟล์เสียง')}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeTab === 'การสร้างไฟล์เสียง'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              การสร้างไฟล์เสียง
            </button>
            <button
              onClick={() => setActiveTab('การเผยแพร่เนื้อหา')}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeTab === 'การเผยแพร่เนื้อหา'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              การเผยแพร่เนื้อหา
            </button>
            <button
              onClick={() => setActiveTab('การจัดการ')}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                activeTab === 'การจัดการ'
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              การจัดการ
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Guide Section */}
          <div className="bg-white rounded-xl overflow-hidden mb-6">
            <div className="relative">
              {!isDropdownOpen ? (
                <div className="p-4 sm:p-6 flex flex-col items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-blue-500" />
                  </div>
                  <h2 className="text-xl font-bold text-center mb-2">คู่มือแนะนำในการสร้างผลงานเสียง!</h2>
                  <p className="text-sm text-gray-500 text-center mb-4">
                    เรียนรู้ไปพร้อมกับ readAwrite คลิก "Profile" แล้วคลิก "เพิ่มงานเขียน"
                  </p>
                  <button
                    onClick={() => setIsDropdownOpen(true)}
                    className="flex items-center justify-center gap-2 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors w-full sm:w-auto"
                  >
                    สร้างเสียงด้วย Botnoi Voice
                    <ChevronDown size={16} />
                  </button>
                </div>
              ) : (
                <div className="p-4 sm:p-6">
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                      alt="Tutorial"
                      className="w-full h-32 sm:h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-lg font-medium mb-2">เริ่มต้นใช้งานแอปพลิเคชัน readAwrite</h3>
                    <p className="text-sm text-gray-600">คลิก "Profile" แล้วคลิก "เพิ่มงานเขียน"</p>
                  </div>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                  >
                    <ChevronUp size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">นำเข้าไฟล์จาก Botnoivoice</h3>
                <Info size={14} className="text-gray-400" />
              </div>
            </div>
            
            <div 
              className={`border-2 border-dashed ${selectedFile ? 'border-blue-500 bg-blue-50' : 'border-gray-200'} 
                rounded-xl p-4 sm:p-8 text-center mb-6 transition-colors duration-200`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="max-w-sm mx-auto space-y-4">
                {uploadStatus === 'uploading' ? (
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                      <Loader2 size={24} className="text-blue-500 animate-spin" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">กำลังอัพโหลด...</p>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{uploadProgress}%</p>
                    </div>
                  </div>
                ) : uploadStatus === 'success' ? (
                  <div className="space-y-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <Check size={24} className="text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">อัพโหลดสำเร็จ!</p>
                      <p className="text-xs text-gray-500 mt-1">กำลังนำคุณไปยังหน้ากรอกข้อมูล...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                      <Download size={24} className="text-gray-400" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">
                        {selectedFile ? selectedFile.name : 'วางไฟล์ของคุณที่นี่'}
                      </p>
                      <p className="text-xs text-gray-400">PNG, JPEG, Type: Transparent</p>
                    </div>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="inline-block px-6 py-2 bg-black text-white rounded-full text-sm hover:bg-black/90 transition-colors cursor-pointer"
                    >
                      เลือกไฟล์
                    </label>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="w-full sm:w-auto order-2 sm:order-1 px-4 py-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                ยกเลิก
              </button>
              <button 
                onClick={simulateUpload}
                disabled={!selectedFile || uploadStatus === 'uploading' || uploadStatus === 'success'}
                className={`w-full sm:w-auto order-1 sm:order-2 px-6 py-2 rounded-full text-sm
                  ${selectedFile && uploadStatus === 'idle'
                    ? 'bg-black text-white hover:bg-black/90'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  } transition-colors`}
              >
                {uploadStatus === 'uploading' ? 'กำลังอัพโหลด...' : 'ถัดไป'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}