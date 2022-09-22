import { createAnimation, Animation } from '@ionic/core';

export function translateLeaveTransition(rootElement: HTMLElement): Animation {

    const backdropAnimation = createAnimation()
        .addElement(rootElement.querySelector('ion-backdrop')!)
        .fromTo('opacity', '1', '0');

    const wrapperAnimation = createAnimation()
        .addElement(rootElement.querySelector('.modal-wrapper')!)
        .fromTo('opacity', '1', '0')
        .fromTo('transform', 'translateX(0vh)', 'translateX(100vh)');

    return createAnimation()
        .addElement(rootElement)
        .easing('ease-out')
        .duration(250)
        .beforeAddClass('show-modal')
        .addAnimation([
            backdropAnimation,
            wrapperAnimation]
        );
}