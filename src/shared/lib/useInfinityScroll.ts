import {useEffect} from 'react'

interface UseInfinityScrollParams {
    triggerRef: React.RefObject<Element | null>;
    onLoadMore: () => void;
    canLoad: boolean;
}

export const useInfinityScroll = ({
    triggerRef,
    onLoadMore,
    canLoad,
}: UseInfinityScrollParams) => {
    useEffect(() => {
        const target = triggerRef.current;

        if (!target || !canLoad) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];

                if (firstEntry?.isIntersecting) {
                    onLoadMore();
                }
            },
            {
                root: null,
                rootMargin: '1px',
                threshold: 1,
            }
        );

        observer.observe(target);

        return () => {
            observer.disconnect();
        }
    }, [triggerRef, onLoadMore, canLoad]);
}