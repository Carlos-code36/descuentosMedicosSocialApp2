import { createAnimation, Animation } from '@ionic/core';

export function scaleEnterTransition(rootElement: HTMLElement): Animation {

    const backdropAnimation = createAnimation()
        .addElement(rootElement.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', '1');

    const wrapperAnimation = createAnimation()
        .addElement(rootElement.querySelector('.modal-wrapper')!)
        .fromTo('opacity', '0.01', '1')
        .fromTo('transform', 'scale(0)', 'scale(1)');

    return createAnimation()
        .addElement(rootElement)
        .easing('ease-in')
        .duration(200)
        .beforeAddClass('show-modal')
        .addAnimation([
            backdropAnimation,
            wrapperAnimation]
        );
}