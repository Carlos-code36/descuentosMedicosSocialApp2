import { createAnimation, Animation } from '@ionic/core';

export function scaleLeaveTransition(rootElement: HTMLElement): Animation {

    const backdropAnimation = createAnimation()
        .addElement(rootElement.querySelector('ion-backdrop')!)
        .fromTo('opacity', '1', '0');

    const wrapperAnimation = createAnimation()
        .addElement(rootElement.querySelector('.modal-wrapper')!)
        .fromTo('opacity', '1', '0')
        .fromTo('transform', 'scale(1)', 'scale(0)');

    return createAnimation()
        .addElement(rootElement)
        .easing('ease-in')
        .duration(250)
        .beforeAddClass('show-modal')
        .addAnimation([
            backdropAnimation,
            wrapperAnimation]
        );
}