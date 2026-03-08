import { Skeleton } from '@/components/ui/skeleton';

const SkeletonCard = ({ className = '' }: { className?: string }) => (
  <div className={`bento-item space-y-4 ${className}`}>
    <Skeleton className="w-full h-48 rounded-xl bg-primary/10" />
    <Skeleton className="h-5 w-3/4 bg-primary/8" />
    <Skeleton className="h-4 w-1/2 bg-primary/5" />
    <div className="flex gap-2 pt-2">
      <Skeleton className="h-6 w-16 rounded-full bg-primary/8" />
      <Skeleton className="h-6 w-20 rounded-full bg-primary/8" />
      <Skeleton className="h-6 w-14 rounded-full bg-primary/8" />
    </div>
  </div>
);

export default SkeletonCard;
