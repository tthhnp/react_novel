import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, Upload, Trash2, FileText } from 'lucide-react';

export function ProjectDetailsPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    category: 'รักโรแมนติก',
    tags: [] as string[],
    coverImage: null as File | null,
    audioFile: null as File | null,
    publishType: '' as 'draft' | 'publish' | '',
  });
  const [characterCount, setCharacterCount] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'description') {
      setCharacterCount(value.length);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, coverImage: file }));
    }
  };

  const handleAudioFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, audioFile: file }));
    }
  };

  const handleDeleteImage = () => {
    setFormData(prev => ({ ...prev, coverImage: null }));
  };

  const handleDeleteAudioFile = () => {
    setFormData(prev => ({ ...prev, audioFile: null }));
  };

  const handleAddTag = () => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, '']
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission based on publishType
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="ml-2 text-lg font-medium">อัปโหลดไฟล์</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Cover Image Upload */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="aspect-[3/4] max-w-[240px] mx-auto bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center relative">
              {formData.coverImage ? (
                <>
                  <img
                    src={URL.createObjectURL(formData.coverImage)}
                    alt="Cover preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={handleDeleteImage}
                    className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm hover:bg-gray-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <span className="text-sm text-gray-500">อัปโหลดรูปปก</span>
                  <span className="text-xs text-gray-400 mt-1">(800 x 1,280 px)</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Title and Details */}
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อเรื่อง <span className="text-red-500">*จำเป็น</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="กรอกชื่อเรื่อง"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ชื่อบทเขียน <span className="text-red-500">*จำเป็น</span>
              </label>
              <input
                type="text"
                name="subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
                placeholder="กรอกชื่อบทเขียน"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                รายละเอียดนิยาย
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="กรอกรายละเอียดนิยาย"
                rows={4}
                maxLength={250}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
              />
              <div className="text-right text-sm text-gray-400">
                {characterCount}/250
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                หมวดหมู่
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none bg-white"
              >
                <option value="รักโรแมนติก">รักโรแมนติก</option>
                <option value="แฟนตาซี">แฟนตาซี</option>
                <option value="สยองขวัญ">สยองขวัญ</option>
                <option value="ดราม่า">ดราม่า</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                แฮชแท็ก <span className="text-xs text-gray-400">(0/12)</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => {
                        const newTags = [...formData.tags];
                        newTags[index] = e.target.value;
                        setFormData(prev => ({ ...prev, tags: newTags }));
                      }}
                      className="bg-transparent border-none focus:outline-none text-sm w-20"
                      placeholder="แฮชแท็ก"
                    />
                  </div>
                ))}
                {formData.tags.length < 12 && (
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="text-sm text-blue-500 hover:text-blue-600"
                  >
                    + เพิ่มแฮชแท็ก
                  </button>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                เรทของเนื้อหา <span className="text-red-500">*จำเป็น</span>
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="px-4 py-1.5 border border-gray-200 rounded-full text-sm hover:bg-gray-50"
                >
                  ทั่วไปทุก 18 ปี
                </button>
                <button
                  type="button"
                  className="px-4 py-1.5 border border-gray-200 rounded-full text-sm hover:bg-gray-50"
                >
                  มากกว่า 18 ปี
                </button>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="space-y-4 pt-4 border-t border-gray-200">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium text-gray-700">นำเข้าไฟล์จาก Botnoivoice</h3>
                    <Info size={14} className="text-gray-400" />
                  </div>
                </div>
                {formData.audioFile ? (
                  <div className="flex items-center gap-2 p-4 bg-gray-50 rounded-lg mt-2">
                    <FileText size={16} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{formData.audioFile.name}</span>
                    <button
                      type="button"
                      onClick={handleDeleteAudioFile}
                      className="ml-auto hover:bg-gray-100 p-1 rounded-full"
                    >
                      <Trash2 size={16} className="text-gray-400 hover:text-gray-600" />
                    </button>
                  </div>
                ) : (
                  <div className="mt-2">
                    <label className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <FileText size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-600">filename1.Botnoivoice</span>
                      <input
                        type="file"
                        onChange={handleAudioFileUpload}
                        className="hidden"
                        accept=".botnoivoice"
                      />
                    </label>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-2">การตั้งค่าเผยแพร่</h3>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, publishType: 'draft' }))}
                    className={`flex-1 py-2 text-center rounded-lg border text-sm transition-colors ${
                      formData.publishType === 'draft'
                        ? 'bg-gray-100 border-gray-300 text-gray-900'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    บันทึกแบบร่าง
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, publishType: 'publish' }))}
                    className={`flex-1 py-2 text-center rounded-lg border text-sm transition-colors ${
                      formData.publishType === 'publish'
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    เผยแพร่
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 text-gray-600 hover:text-gray-800"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className={`px-6 py-2 rounded-lg ${
                formData.publishType === 'publish'
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
            >
              {formData.publishType === 'publish' ? 'เผยแพร่' : 'บันทึกแบบร่าง'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}