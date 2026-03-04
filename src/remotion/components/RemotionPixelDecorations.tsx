
import React from 'react';

export const RemotionPixelDecorations: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 font-console text-console-phosphor-dim opacity-30 text-xs select-none">
      {/* Top-left corner stars */}
      <div className="absolute top-16 left-2">✦</div>
      <div className="absolute top-20 left-5">·</div>
      <div className="absolute top-24 left-1">·</div>
      <div className="absolute top-[72px] left-8">·</div>

      {/* Top-right corner */}
      <div className="absolute top-16 right-2">✦</div>
      <div className="absolute top-20 right-6">·</div>
      <div className="absolute top-[76px] right-3">·</div>

      {/* Bottom-left */}
      <div className="absolute bottom-[104px] left-2">·</div>
      <div className="absolute bottom-[112px] left-5">✦</div>
      <div className="absolute bottom-[120px] left-1">·</div>

      {/* Bottom-right */}
      <div className="absolute bottom-[104px] right-2">·</div>
      <div className="absolute bottom-[112px] right-6">✦</div>
    </div>
  );
};
