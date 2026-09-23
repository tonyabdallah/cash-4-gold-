import { sparkPath } from '@/lib/metals';

export default function Sparkline({ data, height = 36 }: { data: number[]; height?: number }) {
  return (
    <svg className="sparkline" viewBox="0 0 120 36" preserveAspectRatio="none" style={{ height }} aria-hidden="true">
      <path d={sparkPath(data)} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}
