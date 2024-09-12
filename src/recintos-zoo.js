class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, biomas: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, biomas: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, biomas: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, biomas: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false }
        };
    }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal]) {
            return { erro: "Animal inválido" };
        }

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const { tamanho, biomas, carnivoro } = this.animais[animal];
        const tamanhoTotal = tamanho * quantidade;
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            let espacoUsado = recinto.animais.reduce((acc, a) => acc + (this.animais[a.especie].tamanho * a.quantidade), 0);

            if (!biomas.includes(recinto.bioma) && recinto.bioma !== 'savana e rio') continue;

            if (carnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== animal) continue;

            if (carnivoro && recinto.animais.some(a => a.especie !== animal)) continue;

            let espacoExtra = 0;

            if (recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === animal)) {
                espacoExtra = 1;
            }

            if (recinto.tamanhoTotal - espacoUsado - (tamanhoTotal + espacoExtra) >= 0) {
                recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.tamanhoTotal - (espacoUsado + tamanhoTotal + espacoExtra)} total: ${recinto.tamanhoTotal})`);
            }
        }

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável" };
        }

        return { recintosViaveis };
    }
}

export { RecintosZoo as RecintosZoo };
