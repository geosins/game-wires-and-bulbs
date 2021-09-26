import './Square.scss';
import { Shape } from '../../enums';
import { Utils } from '../../Utils';

interface Params {
    rotation: number;
    isActive: boolean;
    shape: Shape;
}

const ROOT_CLASS_NAME = 'square';

export class SquareView {
    private classNames = {
        root: ROOT_CLASS_NAME,
        active: `${ROOT_CLASS_NAME}_active`,
    };

    private elements;

    private currentRotation: number;

    constructor(shape: Shape) {
        this.elements = {
            root: Utils.createElement('div', this.classNames.root, [], this.getImage(shape)),
        };
    }

    public render(params: Params) {
        const { root } = this.elements;

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
        if (isActive) {
            this.elements.root.classList.add(this.classNames.active);
        } else {
            this.elements.root.classList.remove(this.classNames.active);
        }
    }

    private getImage(shape: Shape): string {
        switch (shape) {
            case Shape.Line:
                return `
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <line x1="50" y1="0" x2="50" y2="100" stroke-width="10" />
                    </svg>`;
            case Shape.Angle:
                return `
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="100" cy="0" r="50" stroke-width="10" fill="none"/>
                    </svg>`;
            case Shape.Tack:
                return `
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="50" x2="100" y2="50" stroke-width="10" />
                        <circle cx="0" cy="100" r="50" stroke-width="10" fill="none"/>
                    </svg>`;
            case Shape.Cross:
                return `
                    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                        <line x1="0" y1="50" x2="100" y2="50" stroke-width="10" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke-width="10" />
                    </svg>`;
            case Shape.Rosette:
                return `
                    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                        <path d="M400,175c-1-3-4-5-8-5h-101l100-157c1-2,1-6,0-9C390,1,387,0,384,0H247c-3,0-6,2-8,5l-128,256c-1,
                        3-1,6,0,8c1,2,4,4,7,4h88l-95,227c-1,4-0,8,3,10c1,0,3,1,4,1c2,0,5-1,6-3l273-324C401,182,401,178,400,175z"/>
                    </svg>`;
            case Shape.Bulb:
                return `
                    <svg viewBox="0 0 485 485" xmlns="http://www.w3.org/2000/svg">
                        <path d="M242.606,60.651c-66.989,0-121.302,54.315-121.302,121.304c0,60.651,60.651,122.25,60.651,181.951h121.3
                        c0-61.596,60.653-121.3,60.653-181.951C363.908,114.966,309.598,60.651,242.606,60.651z M306.662,258.625
                        c-12.083,24.021-24.433,48.664-30.266,74.959h-67.729c-5.834-25.497-17.917-49.752-29.734-73.446
                        c-14.039-28.222-27.305-54.875-27.305-78.183c0-50.167,40.812-90.978,90.978-90.978c50.166,0,91,40.811,90.979,91
                        C333.586,204.997,320.49,231.058,306.662,258.625z M303.255,439.727c0,8.378-6.776,15.159-15.158,15.159h-2.786
                        c-6.245,17.65-22.925,30.326-42.704,30.326c-19.784,0-36.457-12.676-42.706-30.326h-2.784c-8.38,0-15-6.781-15-15
                        c0-8.382,6.781-15.168,15.161-15.168h90.98C296.479,424.559,303.255,431.345,303.255,439.727z M303.255,394.237
                        c0,8.383-6.776,15.159-15.158,15.159h-90.98c-8.38,0-15-6.776-15.161-15.159c0-8.382,6.781-15.163,15-15h90.98
                        C296.479,379.074,303.255,385.855,303.255,394.237z M92.606,77.831l27.305,15.781c-5.922,8.205-11.045,17-15.25,26.21
                        l-27.219-15.698L92.606,77.831z M242.606,30.327c-5.211,0-10.098,1.008-15.164,1.54V0h30.327v31.867
                        C252.706,31.334,247.819,30.327,242.606,30.327z M154.263,59.26l-15.782-27.305l26.297-15.166l15.697,27.216
                        C171.174,48.213,162.47,53.337,154.263,59.26z M380.584,119.822c-4.21-9.299-9.357-18.005-15.28-26.206l27.303-15.786
                        l15.163,26.299L380.584,119.822z M330.945,59.232c-8.173-5.895-16.909-11.019-26.174-15.226l15.695-27.216l26.238,15.166
                        L330.945,59.232z M92.576,197.119H60.651v-30.324h31.867c-0.532,5.063-1.54,9.948-1.54,15.161
                        C90.978,187.108,91.986,192.085,92.576,197.119z M424.562,166.794v30.324h-31.923c0.588-5.034,1.597-10.011,1.597-15.164
                        c0-5.213-1.009-10.097-1.54-15.161H424.562z M380.229,243.911l27.54,15.873l-15.163,26.271l-24.819-14.332
                        C372.258,262.565,376.406,253.329,380.229,243.911z M105,243.967c3.762,9.422,7.909,18.719,12.349,27.9l-24.609,14.188
                        l-15.164-26.271L104.867,243.967z"/>
                </svg>`;
            case Shape.Wall:
                return '';
            default:
                return shape;
        }
    }
}
