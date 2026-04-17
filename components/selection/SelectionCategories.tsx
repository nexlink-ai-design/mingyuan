'use client';

export default function SelectionCategories() {
  const categories = [
    { icon: '🎮', label: '端游', bg: 'bg-blue-100' },
    { icon: '📱', label: '手游', bg: 'bg-green-100' },
    { icon: '🎙️', label: '声优', bg: 'bg-pink-100' },
    { icon: '🤝', label: '扩列', bg: 'bg-orange-100' },
    { icon: '☕', label: '线下', bg: 'bg-purple-100' },
  ];

  return (
    <section className="px-4 py-2 grid grid-cols-5 gap-2 text-center">
      {categories.map((item, idx) => (
        <div key={idx} className="flex flex-col items-center gap-1.5">
          <div className={`${item.bg} w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm text-xl`}>
            {item.icon}
          </div>
          <span className="text-xs font-medium text-gray-900">{item.label}</span>
        </div>
      ))}
    </section>
  );
}
