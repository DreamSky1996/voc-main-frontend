import VOCImg from "../assets/tokens/VOC.png";

function toUrl(tokenPath: string): string {
    const host = window.location.origin;
    return `${host}/${tokenPath}`;
}

export function getTokenUrl(name: string) {

    if (name === "voc") {
        return toUrl(VOCImg);
    }

    throw Error(`Token url doesn't support: ${name}`);
}
