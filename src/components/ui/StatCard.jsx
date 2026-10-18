import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function StatCard({ title, value, subtitle, icon: Icon, iconBg, iconColor, trend, trendLabel }) {
  const TrendIcon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-500' : 'text-gray-400'

  return (
    <div className="card p-5 flex items-start gap-4">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconBg}`}>
        <Icon size={22} className={iconColor} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-500 mb-0.5">{title}</p>
        <p className="text-2xl font-bold text-gray-900 leading-none mb-1">{value}</p>
        {(subtitle || trendLabel) && (
          <div className="flex items-center gap-1.5">
            {trend && <TrendIcon size={12} className={trendColor} />}
            <p className={`text-xs ${trend ? trendColor : 'text-gray-400'}`}>{trendLabel || subtitle}</p>
          </div>
        )}
      </div>
    </div>
  )
}
