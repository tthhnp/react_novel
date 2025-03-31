import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, Home, FileText, PenSquare, Settings, Menu, X, LogOut, ChevronLeft, ChevronRight, Volume2, Play, Search } from 'lucide-react';
import { auth } from '../lib/firebase';
import { User } from 'firebase/auth';

export function HomePage() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentNovelSlide, setCurrentNovelSlide] = useState(0);
  const [currentPopularSlide, setCurrentPopularSlide] = useState(0);
  const [currentNewSectionSlide, setCurrentNewSectionSlide] = useState(0);
  const [playingAudio, setPlayingAudio] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Add the missing toggleSidebar function
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Categories
  const categories = [
    { id: 'All', name: 'All' },
    { id: 'romance', name: 'โรแมนซ์' },
    { id: 'drama', name: 'ดราม่า' },
    { id: 'fantasy', name: 'แฟนตาซี' },
    { id: 'comedy', name: 'คอมเมดี้' },
    { id: 'action', name: 'แอคชั่น' },
    { id: 'horror', name: 'สยองขวัญ' },
    { id: 'mystery', name: 'ลึกลับ' }
  ];

  // Banner carousel data
  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      title: "อัปเดตตอนใหม่",
      buttonText: "สร้างผลงาน"
    },
    {
      image: "https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "เรื่องราวใหม่",
      buttonText: "อ่านเลย"
    },
    {
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      title: "แนะนำสำหรับคุณ",
      buttonText: "ดูเพิ่มเติม"
    }
  ];

  // Novel data
  const novels = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    title: "แม่มดสาวกับนายจอมมาร",
    author: "นักเขียนนิรนาม",
    reads: 33,
    rating: 67,
    cover: "https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }));

  // Popular novels data
  const popularNovels = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 100,
    title: "แด่คุณคนที่หลับหายไปคืออะไร",
    author: "นักเขียนนิรนาม",
    episode: i + 1,
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }));

  // Add new data array for the new section
  const newSectionNovels = Array.from({ length: 12 }).map((_, i) => ({
    id: i + 200,
    title: "เมื่อคุณหนูกลายเป็นแมว",
    author: "นักเขียนนิรนาม",
    reads: 28,
    rating: 92,
    cover: "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }));

  // Calculate items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 2; // Mobile: 2 items
      if (window.innerWidth < 768) return 3; // Tablet: 3 items
      if (window.innerWidth < 1024) return 4; // Small desktop: 4 items
      return 6; // Large desktop: 6 items
    }
    return 6;
  };

  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  // Update items per slide on window resize
  useEffect(() => {
    const handleResize = () => {
      setItemsPerSlide(getItemsPerSlide());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalNovelSlides = Math.ceil(novels.length / itemsPerSlide);
  const totalPopularSlides = Math.ceil(popularNovels.length / itemsPerSlide);
  const totalNewSectionSlides = Math.ceil(newSectionNovels.length / itemsPerSlide);

  // Function to handle audio playback
  const toggleAudio = (novelId: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setPlayingAudio(playingAudio === novelId ? null : novelId);
  };

  // Auto slide effects
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNovelSlide((prev) => (prev + 1) % totalNovelSlides);
    }, 7000);
    return () => clearInterval(timer);
  }, [totalNovelSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPopularSlide((prev) => (prev + 1) % totalPopularSlides);
    }, 8000);
    return () => clearInterval(timer);
  }, [totalPopularSlides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentNewSectionSlide((prev) => (prev + 1) % totalNewSectionSlides);
    }, 9000);
    return () => clearInterval(timer);
  }, [totalNewSectionSlides]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToNovelSlide = (index: number) => {
    setCurrentNovelSlide(index);
  };

  const goToPopularSlide = (index: number) => {
    setCurrentPopularSlide(index);
  };

  const goToNewSectionSlide = (index: number) => {
    setCurrentNewSectionSlide(index);
  };

  const nextNovelSlide = () => {
    setCurrentNovelSlide((prev) => (prev + 1) % totalNovelSlides);
  };

  const prevNovelSlide = () => {
    setCurrentNovelSlide((prev) => (prev - 1 + totalNovelSlides) % totalNovelSlides);
  };

  const nextPopularSlide = () => {
    setCurrentPopularSlide((prev) => (prev + 1) % totalPopularSlides);
  };

  const prevPopularSlide = () => {
    setCurrentPopularSlide((prev) => (prev - 1 + totalPopularSlides) % totalPopularSlides);
  };

  const nextNewSectionSlide = () => {
    setCurrentNewSectionSlide((prev) => (prev + 1) % totalNewSectionSlides);
  };

  const prevNewSectionSlide = () => {
    setCurrentNewSectionSlide((prev) => (prev - 1 + totalNewSectionSlides) % totalNewSectionSlides);
  };

  // Filter novels based on search query
  const filteredNovels = [...novels, ...popularNovels, ...newSectionNovels].filter(novel => 
    novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    novel.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Basic Novel Card Component
  const BasicNovelCard = ({ novel }: { novel: any }) => (
    <div className="group cursor-pointer">
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-gray-100">
        <img
          src={novel.cover}
          alt={novel.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
        />
      </div>
      <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
        {novel.title}
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        โดย {novel.author}
      </p>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-xs text-gray-500">{novel.reads}</span>
        <span className="text-xs text-gray-500">{novel.rating}%</span>
      </div>
    </div>
  );

  // Novel Card with Audio Component
  const NovelCardWithAudio = ({ novel, isPlaying }: { novel: any, isPlaying: boolean }) => (
    <div className="group cursor-pointer">
      <div className="relative">
        <div className="absolute top-2 right-2 z-10">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
            จบ
          </span>
        </div>
        <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2 bg-gray-100">
          <img
            src={novel.cover}
            alt={novel.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">{novel.episode}</span>
          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
            {novel.title}
          </h3>
        </div>
        <p className="text-xs text-gray-500">
          By {novel.author}
        </p>
        <button
          onClick={(e) => toggleAudio(novel.id, e)}
          className="w-full bg-black text-white py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-black/90 transition-colors"
        >
          {isPlaying ? (
            <div className="flex items-center gap-0.5">
              <div className="w-1 h-3 bg-white animate-[soundbar_0.5s_ease-in-out_infinite] delay-0"></div>
              <div className="w-1 h-4 bg-white animate-[soundbar_0.5s_ease-in-out_infinite] delay-150"></div>
              <div className="w-1 h-2 bg-white animate-[soundbar_0.5s_ease-in-out_infinite] delay-300"></div>
            </div>
          ) : (
            <>
              <Play size={16} />
              <span className="text-sm font-medium">ฟังเลย</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  // Carousel Section Component
  const CarouselSection = ({ 
    title, 
    items, 
    currentSlideIndex, 
    totalSlides,
    onPrev,
    onNext,
    onSlideChange,
    renderItem,
  }: {
    title: string;
    items: any[];
    currentSlideIndex: number;
    totalSlides: number;
    onPrev: () => void;
    onNext: () => void;
    onSlideChange: (index: number) => void;
    renderItem: (item: any) => React.ReactNode;
  }) => (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={`Previous ${title}`}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={onNext}
            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={`Next ${title}`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentSlideIndex * 100}%)`,
          }}
        >
          {Array.from({ length: totalSlides }).map((_, slideIndex) => (
            <div
              key={slideIndex}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-w-full"
            >
              {items
                .slice(
                  slideIndex * itemsPerSlide,
                  (slideIndex + 1) * itemsPerSlide
                )
                .map(renderItem)}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => onSlideChange(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlideIndex === index
                  ? 'bg-gray-800 w-4'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to ${title} slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white flex">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 w-64 bg-white border-r border-gray-200 
        transform transition-transform duration-200 ease-in-out z-30
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Bot className="w-8 h-8 text-indigo-500" />
              <span className="font-semibold text-xl">VOICE</span>
            </div>
          </div>

          {/* User Profile Section */}
          <div className="p-4">
            {!user && (
              <button 
                onClick={handleLoginClick}
                className="w-full bg-black text-white rounded-full py-2 text-sm font-medium hover:bg-black/90 transition-colors"
              >
                เข้าสู่ระบบ/สร้างบัญชี
              </button>
            )}
            {user && (
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  {user.photoURL ? (
                    <img 
                      src={user.photoURL} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium text-gray-600">
                      {user.displayName?.[0] || user.email?.[0] || 'U'}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {user.displayName || user.email?.split('@')[0]}
                  </h3>
                  <p className="text-sm text-gray-500">My Profile</p>
                </div>
              </div>
            )}
          </div>

          {/* Upload Button - Only show when logged in */}
          {user && (
            <div className="px-4 mb-4">
              <button 
                onClick={() => navigate('/upload')}
                className="w-full bg-black text-white rounded-full py-2 text-sm font-medium hover:bg-black/90 transition-colors flex items-center justify-center gap-2"
              >
                <FileText size={16} />
                โปรเจคใหม่
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 px-2">
            <a href="#" className="flex items-center gap-3 text-gray-900 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <Home size={20} />
              <span className="text-sm">หน้าหลัก</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-500 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <FileText size={20} />
              <span className="text-sm">ส่งผลงานของฉัน</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-500 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <PenSquare size={20} />
              <span className="text-sm">ผลงานของฉัน</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-gray-500 hover:bg-gray-50 px-4 py-2 rounded-lg transition-colors">
              <Settings size={20} />
              <span className="text-sm">ตั้งค่า</span>
            </a>
          </nav>

          {/* Logout Button */}
          {user && (
            <div className="p-4 border-t border-gray-200">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm"
              >
                <LogOut size={16} />
                ออกจากระบบ
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4 px-8 flex items-center justify-between">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Search Bar */}
          {user && (
            <div className="relative ml-auto">
              {isSearchOpen ? (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="ค้นหานิยาย..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-[300px] pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                    autoFocus
                    onBlur={() => {
                      if (!searchQuery) {
                        setIsSearchOpen(false);
                      }
                    }}
                  />
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  {searchQuery && (
                    <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
                      {filteredNovels.length > 0 ? (
                        <div className="p-2 grid grid-cols-1 gap-4">
                          {filteredNovels.map(novel => (
                            <div key={novel.id} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                              <div className="w-16 h-20 rounded-lg overflow-hidden bg-gray-100">
                                <img src={novel.cover} alt={novel.title} className="w-full h-full object-cover" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{novel.title}</h3>
                                <p className="text-sm text-gray-500">โดย {novel.author}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          ไม่พบผลการค้นหา
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <Search size={20} />
                </button>
              )}
            </div>
          )}

          {/* Login Button for non-authenticated users */}
          {!user && (
            <button
              onClick={handleLoginClick}
              className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-black/90 transition-colors"
            >
              เข้าสู่ระบบ
            </button>
          )}
        </header>

        {/* Main Content Area */}
        <main className="p-4 lg:p-8">
          {/* Only show main content if not searching */}
          {!searchQuery ? (
            <>
              {/* Banner Carousel */}
              <div className="relative rounded-xl overflow-hidden mb-8">
                <div className="relative w-full h-[200px] lg:h-[280px]">
                  {carouselItems.map((item, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-500 ${
                        currentSlide === index ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <img 
                        src={item.image}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center px-6 lg:px-12">
                        <div className="text-white">
                          <h1 className="text-2xl lg:text-3xl font-bold mb-4">{item.title}</h1>
                          <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all">
                            {item.buttonText}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Carousel Navigation */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {carouselItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? 'bg-white w-4' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>

              {/* Category Cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="relative h-24 rounded-xl overflow-hidden bg-gradient-to-r from-orange-400 to-orange-500 hover:shadow-lg transition-shadow duration-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">นิยายเสียง</span>
                  </div>
                </div>
                <div className="relative h-24 rounded-xl overflow-hidden bg-gradient-to-r from-blue-400 to-blue-500 hover:shadow-lg transition-shadow duration-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">พอดแคสต์</span>
                  </div>
                </div>
                <div className="relative h-24 rounded-xl overflow-hidden bg-gradient-to-r from-purple-400 to-purple-500 hover:shadow-lg transition-shadow duration-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-lg font-medium">นิทานเสียง</span>
                  </div>
                </div>
              </div>

              {/* Recommended Section */}
              <CarouselSection
                title="แนะนำ"
                items={novels}
                currentSlideIndex={currentNovelSlide}
                totalSlides={totalNovelSlides}
                onPrev={prevNovelSlide}
                onNext={nextNovelSlide}
                onSlideChange={goToNovelSlide}
                renderItem={(novel) => <BasicNovelCard key={novel.id} novel={novel} />}
              />

              {/* Popular Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">ยอดนิยม</h2>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={prevPopularSlide}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={nextPopularSlide}
                      className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Categories */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>

                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{
                      transform: `translateX(-${currentPopularSlide * 100}%)`,
                    }}
                  >
                    {Array.from({ length: totalPopularSlides }).map((_, slideIndex) => (
                      <div
                        key={slideIndex}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 min-w-full"
                      >
                        {popularNovels
                          .slice(
                            slideIndex * itemsPerSlide,
                            (slideIndex + 1) * itemsPerSlide
                          )
                          .map((novel) => (
                            <NovelCardWithAudio
                              key={novel.id}
                              novel={novel}
                              isPlaying={playingAudio === novel.id}
                            />
                          ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-2 mt-4">
                    {Array.from({ length: totalPopularSlides }).map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToPopularSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          currentPopularSlide === index
                            ? 'bg-gray-800 w-4'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                        aria-label={`Go to popular slide ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* New Section */}
              <CarouselSection
                title="โปรโมท"
                items={newSectionNovels}
                currentSlideIndex={currentNewSectionSlide}
                totalSlides={totalNewSectionSlides}
                onPrev={prevNewSectionSlide}
                onNext={nextNewSectionSlide}
                onSlideChange={goToNewSectionSlide}
                renderItem={(novel) => <BasicNovelCard key={novel.id} novel={novel} />}
              />
            </>
          ) : null}
        </main>
      </div>
    </div>
  );
}