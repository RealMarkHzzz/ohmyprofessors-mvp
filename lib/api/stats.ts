/**
 * Stats API - Real-time statistics for Social Proof Bar
 */

import { createClient } from '@/lib/supabase/server'

export interface SiteStats {
  totalReviews: number
  totalStudents: number
}

/**
 * Get real-time site statistics
 */
export async function getStats(): Promise<SiteStats> {
  const supabase = await createClient()

  try {
    // 评价总数（仅已批准的评价）
    const { count: totalReviews } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'approved')
      .is('deleted_at', null)

    // 学生总数（通过 analytics_events 去重 user_id）
    const { data: uniqueUsers } = await supabase
      .from('analytics_events')
      .select('user_id')
      .not('user_id', 'is', null)

    // 去重计算
    const totalStudents = uniqueUsers 
      ? new Set(uniqueUsers.map((u: { user_id: string }) => u.user_id)).size 
      : 0

    return {
      totalReviews: totalReviews || 0,
      totalStudents: totalStudents || 0,
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      totalReviews: 0,
      totalStudents: 0,
    }
  }
}
