import { createAnimation, Animation } from '@ionic/core';

export function translateEnterTransition(rootElement: HTMLElement): Animation {

    const backdropAnimation = createAnimation()
        .addElement(rootElement.querySelector('ion-backdrop')!)
        .fromTo('opacity', '0.01', '1');

    const wrapperAnimation = createAnimation()
        .addElement(rootElement.querySelector('.modal-wrapper')!)
        .fromTo('opacity', '0.01', '1')
        .fromTo('transform', 'translateX(100vh)', 'translateX(0vh)');

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