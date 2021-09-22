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

    public render(params: Params) {
        const { root } = this.elements;

        root.innerHTML = params.shape;

        this.rotateRoot(params.rotation);
        this.setIsActiveStatus(params.isActive);

        return root;
    }

    public rotateRoot(rotation: number): void {
        this.elements.root.style.transform = `rotate(${rotation}deg)`;
    }

    public setIsActiveStatus(isActive: boolean): void {
        this.elements.root.style.color = isActive ? 'red' : 'black';
    }
}
