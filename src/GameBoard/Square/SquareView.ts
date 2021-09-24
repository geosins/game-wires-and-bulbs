import { Shape } from '../../enums';
import { Utils } from '../../Utils';

interface Params {
    rotation: number;
    isActive: boolean;
    shape: Shape;
}

export class SquareView {
    private classNames = {
        root: 'square',
    };

    private elements = {
        root: Utils.createElement('div', this.classNames.root),
    }

    private currentRotation: number;

    public render(params: Params) {
        const { root } = this.elements;

        root.innerHTML = params.shape;
        this.currentRotation = params.rotation;

        this.rotateRoot(params.rotation);
        this.setIsActiveStatus(params.isActive);

        return root;
    }

    public rotateRoot(rotation: number): void {
        const delta = (rotation % 360) - (this.currentRotation % 360);

        if (delta > -180 && delta <= 180) {
            this.currentRotation += delta;
        } else if (delta > 180) {
            this.currentRotation -= (delta - 180);
        } else { // if delta <= -180
            this.currentRotation += (delta + 360);
        }

        this.elements.root.style.transform = `rotate(${this.currentRotation}deg)`;
    }

    public setIsActiveStatus(isActive: boolean): void {
        this.elements.root.style.color = isActive ? 'red' : 'black';
    }
}
