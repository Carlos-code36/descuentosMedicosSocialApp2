export { }

declare global {
    interface String {
        /**
         * Función del prototipo String de Javascript para dar formato a un fecha retornando "Año-Mes-Dia"
         */
        formatDate(): string;

        /**
         * Función del prototipo String de Javascript para retornar la primera cadena de un texto"
         */
        getFirstWord(): string;

        /**
         * Convierte un string con caracteres numéricos a tipo moneda separando por miles, millones, etc
         * 1200000 => $ 1.200.000
         */
        setCurrency(): string;

        /**
         * Retorna hora normal dada una hora militar
         */
        getNormalHour(): string;

        /**
         * Retorna texto con la primera letra en mayuscula
         */
        getCapitalizeText(): string;

    }

    interface Array<T> {
        flat(): Array<T>;
        flatMap(func: (x: T) => T): Array<T>;
    }
}

String.prototype.getCapitalizeText = function () {
    return `${this[0].toUpperCase()}${this.slice(1).toLowerCase()}`
}

String.prototype.formatDate = function () {
    return new Date(this).toISOString().split('T')[0];
}

String.prototype.getFirstWord = function () {
    return this.split(' ')[0];
}

String.prototype.setCurrency = function () {
    let entry = this.replace(/^[$ 0]+/, '$').match(/([0-9]+)/gm);

    let output = entry
        ? entry.join('').split('').reverse().join("")
            .replace(/(?=\d*\.?)(\d{3})/g, `$1.`)
            .split("").reverse().join("").replace(/^[.]/, "")
        : '0';

    return output

}

String.prototype.getNormalHour = function () {
    let output = this.split(' ');

    return output[0] > 12 ? `${output[0] - 12} ${output[1]}` : `${output[0]} ${output[1]}`;
}
