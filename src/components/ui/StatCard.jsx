import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({ title, value, subtitle, icon: Icon, iconBg, iconColor, trend, trendLabel }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-gray-400'

  return (
    /* Reduced padding + icon on mobile, full-size on sm+ */
    <div className="card p-3 sm:p-5 flex items-start gap-2.5 sm:gap-4">
      <div className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={18} className={`sm:hidden ${iconColor}`} />
        <Icon size={22} className={`hidden sm:block ${iconColor}`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] sm:text-xs font-medium text-gray-500 mb-0.5 leading-tight">{title}</p>
        <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-none mb-1">{value}</p>
        {(subtitle || trendLabel) && (
          <div className="flex items-center gap-1">
            {trend && <TrendIcon size={11} className={trendColor} />}
            <p className={`text-[10px] sm:text-xs leading-tight ${trend ? trendColor : 'text-gray-400'}`}>
              {trendLabel || subtitle}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
