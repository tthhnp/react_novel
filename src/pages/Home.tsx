import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Search, Bell, LogOut } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

export function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Logo />
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                  หน้าแรก
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  ตั้งค่าโปรไฟล์
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  ผลงานของฉัน
                </a>
                <a href="#" className="text-gray-500 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  ตั้งค่า
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                + โพสต์ผลงาน
              </button>
              <button className="text-gray-500 hover:text-gray-700">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-700">
                  {user.displayName ? user.displayName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-700">{user.displayName || user.email}</span>
              </div>
              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner */}
        <div className="relative rounded-2xl overflow-hidden mb-8">
          <img 
            src="https://images.unsplash.com/photo-1614583225154-5fcdda07019e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="Banner"
            className="w-full h-[300px] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/50 to-purple-500/50 flex items-center px-12">
            <div className="text-white">
              <h1 className="text-4xl font-bold mb-4">New episode</h1>
              <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-6 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all">
                <Play size={16} />
                อ่านเลย
              </button>
            </div>
          </div>
          {/* Pagination dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="relative rounded-xl overflow-hidden h-48">
            <img 
              src="https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="นิยายเรื่อง"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-xl font-medium">นิยายเรื่อง</span>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden h-48">
            <img 
              src="https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="พอดแคสต์"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-xl font-medium">พอดแคสต์</span>
            </div>
          </div>
          <div className="relative rounded-xl overflow-hidden h-48">
            <img 
              src="https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
              alt="เข้าใจ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white text-xl font-medium">เข้าใจ</span>
            </div>
          </div>
        </div>

        {/* Novel Grid */}
        <div className="mb-8">
          <h2 className="text-xl font-medium mb-4">แนะนำ</h2>
          <div className="grid grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-2">
                  <img
                    src="https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="Novel cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <h3 className="text-sm font-medium text-gray-900 line-clamp-2">เมื่อคุณครูที่รักมาเป็นนักเรียน</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-gray-500">32</span>
                  <span className="text-xs text-gray-500">57%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Section */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-xl font-medium">ยอดนิยม</h2>
            <div className="flex gap-2">
              <button className="px-4 py-1 rounded-full bg-black text-white text-sm">ทั้งหมด</button>
              <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">นิยาย</button>
              <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">การ์ตูน</button>
              <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">พอดแคสต์</button>
              <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">ซีรีส์</button>
              <button className="px-4 py-1 rounded-full bg-gray-100 text-gray-600 text-sm hover:bg-gray-200">อื่นๆ</button>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="aspect-[3/4] rounded-lg overflow-hidden mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1516486392848-8b67ef89f113?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                    alt="Novel cover"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">{item}</span>
                  <h3 className="text-sm font-medium text-gray-900">เมื่อคุณครูที่รักมาเป็นนักเรียน</h3>
                </div>
                <button className="w-full py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                  อ่านเลย
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}