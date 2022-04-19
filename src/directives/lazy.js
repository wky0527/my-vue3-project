import defaultImg from '@/static/images/img_fail.png'
const mounted = (el,binding) => {
    //用于指定回调函数执行时被观测元素的的环境。
    const options = ()=>{}
    //相交时的处理函数,每当被观测的元素与指定的根元素或视窗相交时便会被执行。
    const callback = (entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                el.src = binding.value
                observe.unobserve(el)
                el.onerror = () => {
                    el.src = defaultImg
                }
            }
        })
    }
    const observe = new IntersectionObserver(callback,options)
    observe.observe(el)
}
export function setupLazyDirective(app) {
    app.directive('lazy', {mounted})
}
