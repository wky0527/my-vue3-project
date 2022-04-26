import {ref}from 'vue';
import {useIntersectionObserver} from '@vueuse/core';;

export function useIntersectionObserve(){
    const target = ref(null);
    const targetIsVisible = ref(false)
    const { stop } = useIntersectionObserver(
        target,
        ([{ isIntersecting }], observerElement) => {
            targetIsVisible.value = isIntersecting
            console.log(isIntersecting.value)
        },
    )
    return {
        target,
        targetIsVisible
    }
}
