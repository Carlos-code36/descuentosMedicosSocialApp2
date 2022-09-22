import { createAnimation, Animation } from '@ionic/core';

export function Enter(rootElement: HTMLElement): Animation {
    const backdropAnimation = createAnimation()
        .addElement(rootElement.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.0', '0.6');

    const wrapperAnimation = createAnimation()
        .addElement(rootElement.querySelector('.modal-wrapper')!)
        .fromTo('transform', `translateY(${rootElement.clientHeight}px)`, `translateY(0px)`)
        .fromTo('opacity', 0.02, 1);

    return createAnimation()
        .addElement(rootElement)
        .easing('cubic-bezier(0.17, 0.75, 0.51, 1.09)')
        .duration(300)
        .beforeAddClass('show-modal')
        .addAnimation([backdropAnimation, wrapperAnimation]
        );
}

export function Leave(rootElement: HTMLElement): Animation {
    return Enter(rootElement)
        .easing('cubic-bezier(0.18, 0.89, 0.32, 1.28)')
        .duration(300)
        .direction('reverse');
}