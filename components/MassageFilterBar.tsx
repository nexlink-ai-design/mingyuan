'use client';

export default function MassageFilterBar() {
  return (
    <div className="rounded-xl bg-card p-4 mb-4 space-y-3">
      <div>
        <p className="text-sm font-medium text-foreground mb-2">城市</p>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all gradient-accent text-primary-foreground">全部</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">上海</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">北京</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">广州</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">深圳</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">杭州</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">南京</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">成都</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">武汉</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">西安</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">重庆</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">天津</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">苏州</button>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground mb-2">服务类型</p>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all gradient-accent text-primary-foreground">全部</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">精油SPA</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">中式推拿</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">泰式按摩</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">足疗养生</button>
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-foreground mb-2">价格区间</p>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all gradient-accent text-primary-foreground">全部</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">¥300以下</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">¥300-400</button>
          <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-muted/50 text-muted-foreground hover:text-foreground border border-border">¥400以上</button>
        </div>
      </div>
    </div>
  );
}
