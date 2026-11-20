import {
  BarChart3,
  BookOpen,
  ClipboardCheck,
  Home,
  Trophy,
  User,
  type LucideIcon,
} from 'lucide-react';
import type { AudienceId } from '../../../types/audience';

export type AgeTier = 'playful' | 'bright' | 'pro';
export type AppTab = 'today' | 'learn' | 'practice' | 'progress' | 'me';

export const AUDIENCE_TIER: Record<AudienceId, AgeTier> = {
  preschool: 'playful',
  kids: 'playful',
  teen: 'bright',
  university: 'pro',
  worker: 'pro',
  exam: 'pro',
};

export function getTier(aud: AudienceId): AgeTier {
  return AUDIENCE_TIER[aud] || 'pro';
}

export interface NavItem {
  id: AppTab;
  label: string;
  icon: LucideIcon;
}

export function getNavItems(aud: AudienceId): NavItem[] {
  if (aud === 'kids') {
    return [
      { id: 'today', label: 'Trang chủ', icon: Home },
      { id: 'practice', label: 'Bài tập', icon: ClipboardCheck },
      { id: 'me', label: 'Của bé', icon: User },
    ];
  }
  return [
    { id: 'today', label: 'Trang chủ', icon: Home },
    { id: 'practice', label: 'Bài tập', icon: ClipboardCheck },
    { id: 'me', label: 'Tôi', icon: User },
  ];
}

/** Title shown in the header for each tab */
export function getTabTitle(aud: AudienceId, tab: AppTab): string {
  const item = getNavItems(aud).find((n) => n.id === tab);
  if (tab === 'progress') return aud === 'kids' ? 'Thành tích của bé' : 'Tiến độ';
  if (tab === 'learn' && !item) return 'Trang chủ';
  return item?.label || '';
}

export const STATS_ICON = BarChart3;

/** Pastel tiles shared with the preschool design (same order as KIDS_PASTEL_TILES) */
export const TILE_PALETTE = [
  { bg: '#FFE4EF', border: '#FFC2DA', ink: '#9D174D' },
  { bg: '#E3F7D0', border: '#C2EBA0', ink: '#3F6212' },
  { bg: '#DBF1FF', border: '#AEDDFF', ink: '#075985' },
  { bg: '#FFF4C2', border: '#FFE58A', ink: '#854D0E' },
  { bg: '#D5F5F9', border: '#A5E6EF', ink: '#155E75' },
  { bg: '#FFE7D1', border: '#FFC999', ink: '#9A3412' },
] as const;
