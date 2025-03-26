import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Search, Home, FileText, PenSquare, Settings, Plus, LogOut, Info, Copy, Download } from 'lucide-react';

export function UploadProjectPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('การสร้างไฟล์เสียง');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* User Profile */}
        <div className="p-4 border-b border-gray-100">
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
          <div className="mt-2">
            <div className="px-4 py-2 flex items-center justify-between">
              <span className="text-xs text-gray-400">การตั้งค่าอื่นๆ</span>
              <span className="text-xs text-gray-400">เพิ่มเติม</span>
            </div>
            <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-500 hover:bg-gray-50">
              <Settings size={18} />
              <span className="text-sm">ตั้งค่า</span>
            </a>
          </div>
        </nav>

        <div className="p-4 mt-auto border-t border-gray-100">
          <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700">
            <LogOut size={16} />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-indigo-500" />
            <span className="font-semibold">VOICE</span>
          </div>
          <button className="text-gray-500 hover:text-gray-700">
            <Search size={20} />
          </button>
        </header>

        {/* Content */}
        <div className="p-6">
          {/* Tabs */}
          <div className="flex items-center gap-2 mb-6">
            <button
              className={`px-4 py-1.5 rounded-full text-sm ${
                activeTab === 'การสร้างไฟล์เสียง'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              การสร้างไฟล์เสียง
            </button>
            <button className="px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600">
              การเผยแพร่เนื้อหา
            </button>
            <button className="px-4 py-1.5 rounded-full text-sm bg-gray-100 text-gray-600">
              การจัดการ
            </button>
            <div className="ml-auto text-xs text-gray-400">ดูเพิ่มเติม</div>
          </div>

          {/* Tutorial Card */}
          <div className="bg-white rounded-2xl overflow-hidden mb-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1516542076529-1ea3854896f2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
                alt="Tutorial"
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                  <h2 className="text-xl font-bold mb-2">เรียนรู้ไปพร้อมกับ readAwrite</h2>
                  <p className="text-sm">หลัก "Profile" แล้วคลิก "เพิ่มงานเขียน"</p>
                </div>
              </div>
            </div>
            <div className="p-4 flex items-center justify-between text-sm text-gray-500">
              <span>สร้างผลงาน Botinoi Voice</span>
              <div className="flex items-center gap-4">
                <Download size={16} className="text-gray-400" />
                <Copy size={16} className="text-gray-400" />
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-medium">นำเข้าไฟล์จาก Botnoivoice</h3>
                <Info size={14} className="text-gray-400" />
              </div>
            </div>
            
            <div className="border border-dashed border-gray-200 rounded-lg p-8 text-center mb-6">
              <div className="max-w-sm mx-auto">
                <p className="text-sm text-gray-600 mb-2">วางไฟล์ของคุณที่นี่</p>
                <button className="px-4 py-1.5 bg-black text-white rounded-full text-sm">
                  อัปโหลด
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button className="px-4 py-1.5 text-sm text-gray-500">ยกเลิก</button>
              <button className="px-4 py-1.5 bg-gray-100 text-gray-400 rounded-full text-sm">
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}